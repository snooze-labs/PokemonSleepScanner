import { TextBlock } from '@react-native-ml-kit/text-recognition';

export function extractText(textBlock: TextBlock) {
  return textBlock.text.trim().replaceAll('\n', ' ');
}

export function sortTextBlocksIntoRows(
  textBlocks: TextBlock[],
  options?: {
    offset?: number;
  },
): Array<{ blocks: TextBlock[]; top: number }> {
  let sortedTextBlocksByTop = textBlocks.sort((a, b) => {
    return a.frame!.top - b.frame!.top;
  });

  let rows: Array<{ blocks: TextBlock[]; top: number }> = [];
  let currentRow: TextBlock[] = [];
  let currentTop = -1;

  for (const block of sortedTextBlocksByTop) {
    if (block.frame!.top > currentTop + (options?.offset ?? 50)) {
      currentRow = [block];
      currentTop = block.frame!.top;
      rows.push({
        blocks: currentRow,
        top: currentTop,
      });
    } else {
      currentRow.push(block);
    }
  }

  return rows.map(row => ({
    ...row,
    blocks: row.blocks.sort((a, b) => a.frame!.left - b.frame!.left),
  }));
}
