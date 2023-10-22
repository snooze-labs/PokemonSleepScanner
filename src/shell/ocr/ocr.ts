import TextRecognition from '@react-native-ml-kit/text-recognition';
import { ScanResult } from './types';
import { TabbedScreen } from '../routes';
import { IngredientCounter } from '../../common/store/types';
import {
  IngredientID,
  Ingredients,
} from '../../gameData/ingredients/ingredients';

/**
 * Given a path to an image, returns the corresponding OCR results as an intent.
 */
export async function getOCRResults(filePath: string): Promise<ScanResult> {
  const result = await TextRecognition.recognize('file://' + filePath);

  let sortedByBlock;
  let backBlock;
  for (const block of result.blocks) {
    if (block.text.includes('Sorted by')) {
      sortedByBlock = block;
    } else if (block.text.includes('Back')) {
      backBlock = block;
    }
  }

  let counts: number[] = [];
  let labels: string[] = [];

  for (const block of result.blocks) {
    if (
      block.cornerPoints![0].y <= sortedByBlock!.cornerPoints![0].y ||
      block.cornerPoints![0].y >= backBlock!.cornerPoints![0].y
    ) {
      continue;
    }

    const match = block.text.match('[xX×](\\d+)');
    if (match) {
      counts.push(parseInt(match[1]));
    } else {
      labels.push(block.text);
    }
  }

  const ingredients: IngredientCounter = {};
  const ingredientNameToIDMap: { [key: string]: IngredientID } = {};
  for (const key of Object.keys(Ingredients) as IngredientID[]) {
    ingredientNameToIDMap[Ingredients[key].name] = key;
  }
  for (let i = 0; i < labels.length; i++) {
    if (counts.length <= i) {
      break;
    }
    ingredients[ingredientNameToIDMap[labels[i]]] = counts[i];
  }

  return {
    screen: TabbedScreen.Cooking,
    ingredients,
  };
}
