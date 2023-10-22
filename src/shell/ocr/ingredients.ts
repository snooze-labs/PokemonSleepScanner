import { TabbedScreen } from '../routes';
import { IngredientCounter } from '../../common/store/types';
import {
  IngredientID,
  Ingredients,
} from '../../gameData/ingredients/ingredients';
import { ScanResult } from './types';
import {
  TextRecognitionResult,
  TextBlock,
} from '@react-native-ml-kit/text-recognition';
import { NativeModules } from 'react-native';

function extractCount(textBlock: TextBlock) {
  // the matcher can be flaky on the detection of the 'x' character
  let match = textBlock.text.match('[xX×](\\d+)');
  if (!match) {
    match = textBlock.text.match('\\d+\\/(\\d+)');
  }
  if (match) {
    const result = parseInt(match[1]);
    if (!isNaN(result)) {
      return result;
    }
  }
}

function extractText(textBlock: TextBlock) {
  return textBlock.text.trim().replaceAll('\n', ' ');
}

export function parseIngredients(result: TextRecognitionResult): ScanResult {
  const ingredients: IngredientCounter = {};
  const ingredientNameToIDMap: { [key: string]: IngredientID } = {};

  // build map of ingredient name to ID
  // TODO: handle localization
  for (const key of Object.keys(Ingredients) as IngredientID[]) {
    ingredientNameToIDMap[Ingredients[key].name] = key;
  }

  // pre-process to help cases where the texts are merged together
  // this will clearly fail for other languages but we will worry about it later
  const textBlocks: TextBlock[] = [];
  for (const block of result.blocks) {
    const words = block.text.split(' ');
    if (words.length === 4) {
      const firstBlock: TextBlock = {
        ...block,
        text: words[0] + ' ' + words[1],
      };
      const secondBlock: TextBlock = {
        ...block,
        text: words[2] + ' ' + words[3],
      };
      textBlocks.push(firstBlock, secondBlock);
    } else {
      textBlocks.push(block);
    }
  }

  const validTextBlocks = textBlocks.filter(block => {
    const isValidBlock =
      extractText(block) in ingredientNameToIDMap ||
      extractCount(block) !== undefined;

    return isValidBlock && !!block.frame;
  });

  let sortedTextBlocksByTop = validTextBlocks.sort((a, b) => {
    return a.frame!.top - b.frame!.top;
  });

  // remove the total count in the cooking page - it's generally very far away
  // from the other elements and the first thing that appears
  if (
    sortedTextBlocksByTop.length > 1 &&
    sortedTextBlocksByTop[1].frame!.top - sortedTextBlocksByTop[0].frame!.top >
      300
  ) {
    sortedTextBlocksByTop = sortedTextBlocksByTop.slice(1);
  }

  let rows: Array<{ isCounts: boolean; blocks: TextBlock[]; top: number }> = [];
  let currentRow: TextBlock[] = [];
  let currentTop = -1;

  for (const block of sortedTextBlocksByTop) {
    if (block.frame!.top > currentTop + 50) {
      currentRow = [block];
      currentTop = block.frame!.top;
      rows.push({
        isCounts: extractCount(block) !== undefined,
        blocks: currentRow,
        top: currentTop,
      });
    } else {
      currentRow.push(block);
    }
  }

  // make sure we're starting with counts in case of partial results
  if (rows.length > 0 && !rows[0].isCounts) {
    rows = rows.slice(1);
  }

  for (let i = 0; i < rows.length; i += 2) {
    if (i === rows.length - 1) {
      break;
    }

    const countRow = rows[i];
    const labelRow = rows[i + 1];

    countRow.blocks = countRow.blocks.sort(
      (a, b) => a.frame!.left - b.frame!.left,
    );
    labelRow.blocks = labelRow.blocks.sort(
      (a, b) => a.frame!.left - b.frame!.left,
    );

    for (
      let j = 0;
      j < Math.min(countRow.blocks.length, labelRow.blocks.length);
      j++
    ) {
      const count = extractCount(countRow.blocks[j]);
      const ingredient = extractText(labelRow.blocks[j]);
      ingredients[ingredientNameToIDMap[ingredient]] = count;
    }
  }

  if (Object.keys(ingredients).length > 0) {
    NativeModules.Scanner.showToast('Found ingredients!');
  } else {
    NativeModules.Scanner.showToast('Scan failed...');
  }

  return {
    screen: TabbedScreen.Cooking,
    ingredients,
  };
}
