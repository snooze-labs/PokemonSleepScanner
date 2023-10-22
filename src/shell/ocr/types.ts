import { IngredientID } from '../../gameData/ingredients/ingredients';
import { TabbedScreen } from '../routes';

/**
 * Action to take after receiving a scan.
 */
export type ScanResult = {
  screen: TabbedScreen.Cooking;
  ingredients: { [key in IngredientID]?: number };
};
