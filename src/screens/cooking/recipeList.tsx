import * as React from 'react';
import { RecipeID, Recipes } from '../../gameData/recipes/recipes';
import { RecipeType } from '../../gameData/recipes/types';
import {
  IngredientID,
  Ingredients,
} from '../../gameData/ingredients/ingredients';
import { Avatar, Card, Chip, Surface, Text } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import {
  ingredientsExceedPotSize,
  ingredientsSatisfied,
  sortRecipes,
} from './helpers';
import { Image } from 'react-native';

interface IRecipeListProps {
  ingredientConstraint?: { [key in IngredientID]?: number };
  typeConstraint?: RecipeType;
  potSizeConstraint?: number;
}

interface IRecipeListState {
  showInvalid: boolean;
}

/**
 * Renders a recipe list.
 */
export class RecipeList extends React.PureComponent<
  IRecipeListProps,
  IRecipeListState
> {
  state: IRecipeListState = {
    showInvalid: false,
  };

  renderRecipe(recipeId: RecipeID, rank: number) {
    const recipe = Recipes[recipeId];
    const ingredients = Object.keys(recipe.ingredients) as IngredientID[];
    return (
      <Card style={{ width: 350 }}>
        <Card.Title
          title={`${recipe.name}`}
          titleVariant="titleMedium"
          subtitle={`Rank ${rank}`}
        />
        <Card.Content>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
            }}>
            <Surface
              elevation={1}
              style={{
                borderRadius: 20,
                display: 'flex',
                justifyContent: 'center',
              }}>
              <Image
                style={{ height: 100, width: 100 }}
                source={recipe.imageSrc}
              />
            </Surface>
            <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <View style={{ display: 'flex', flexDirection: 'column' }}>
                <Text variant="titleSmall">
                  Base Power: {recipe.strengthLevels[0]}
                </Text>
                {ingredients.length > 0 ? (
                  ingredients.map(ingredientId => {
                    const ingredient = Ingredients[ingredientId];
                    return (
                      <View
                        key={ingredientId}
                        style={{ display: 'flex', flexDirection: 'row' }}>
                        <View
                          style={{ display: 'flex', flexDirection: 'column' }}>
                          <Chip
                            style={{
                              margin: 5,
                            }}
                            avatar={
                              <Avatar.Image
                                size={24}
                                source={ingredient.imageSrc}
                              />
                            }>
                            {ingredient.name} x
                            {recipe.ingredients[ingredientId]}
                          </Chip>
                        </View>
                      </View>
                    );
                  })
                ) : (
                  <Text>No ingredients needed</Text>
                )}
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  }

  render() {
    const { ingredientConstraint, typeConstraint, potSizeConstraint } =
      this.props;
    const recipeIDs = Object.keys(Recipes) as RecipeID[];
    const filteredRecipeIDs = recipeIDs.filter(recipeId => {
      const recipe = Recipes[recipeId];
      if (typeConstraint && recipe.type !== typeConstraint) {
        return false;
      }
      if (
        ingredientConstraint &&
        !ingredientsSatisfied(recipe, ingredientConstraint)
      ) {
        return false;
      }
      if (
        potSizeConstraint &&
        ingredientsExceedPotSize(recipe, potSizeConstraint)
      ) {
        return false;
      }
      return true;
    });
    const sortedRecipeIDs = sortRecipes(filteredRecipeIDs);
    return (
      <ScrollView>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 20,
            padding: 20,
            justifyContent: 'center',
          }}>
          {sortedRecipeIDs.map((recipeId, idx) => {
            return (
              <React.Fragment key={recipeId}>
                {this.renderRecipe(recipeId, idx + 1)}
              </React.Fragment>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}
