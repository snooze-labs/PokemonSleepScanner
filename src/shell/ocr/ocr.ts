import TextRecognition from '@react-native-ml-kit/text-recognition';
import { ScanResult } from './types';
import { parseIngredients } from './ingredients';
import { parsePokemon } from './pokemon';

/**
 * Given a path to an image, returns the corresponding OCR results as an intent.
 */
export async function getOCRResults(
  filePath: string,
): Promise<ScanResult | undefined> {
  const result = await TextRecognition.recognize('file://' + filePath);

  const ingredientResult = parseIngredients(result);
  if (ingredientResult) {
    return ingredientResult;
  }

  const pokemonResult = parsePokemon(result);
  if (pokemonResult) {
    return pokemonResult;
  }
}
