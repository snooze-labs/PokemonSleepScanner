import TextRecognition from '@react-native-ml-kit/text-recognition';
import { ScanResult } from './types';
import { parseIngredients } from './ingredients';

/**
 * Given a path to an image, returns the corresponding OCR results as an intent.
 */
export async function getOCRResults(filePath: string): Promise<ScanResult> {
  const result = await TextRecognition.recognize('file://' + filePath);

  // TODO: figure out how to distinguish between different screens
  return parseIngredients(result);
}
