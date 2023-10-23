import React from 'react';
import {
  IngredientID,
  Ingredients,
} from '../../gameData/ingredients/ingredients';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Avatar,
  Button,
  Chip,
  FAB,
  IconButton,
  Portal,
  Surface,
  TextInput,
  TextInputProps,
} from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';
import { RecipeList } from './recipeList';
import { RecipeType } from '../../gameData/recipes/types';
import { NativeModules, Modal } from 'react-native';
import { getRecipeData } from '../../gameData/recipes/recipes';
import { CurryRecipeID } from '../../gameData/recipes/curries/curries';
import { DessertRecipeID } from '../../gameData/recipes/desserts/desserts';
import { SaladRecipeID } from '../../gameData/recipes/salads/salads';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../common/store/reduxStore';
import { Dispatch } from '@reduxjs/toolkit';
import {
  clearIngredients,
  updateIngredients,
  updatePotSize,
  updateRecipeType,
} from '../../common/store/cookingSlice';
import { IngredientCounter } from '../../common/store/types';
import { IngredientCountControl } from './ingredientCountControl';

interface ICookingScreenProps extends PropsFromRedux {}
interface ICookingScreenState {
  isRecipeListVisible: boolean;
  isFloatingActionButtonMenuExpanded: boolean;
}

/**
 * Screen for the cooking functionality.
 */
class CookingScreen extends React.PureComponent<
  ICookingScreenProps,
  ICookingScreenState
> {
  state: ICookingScreenState = {
    isRecipeListVisible: false,
    isFloatingActionButtonMenuExpanded: false,
  };

  renderFloatingActionButton() {
    const { clearIngredients } = this.props;
    const { isFloatingActionButtonMenuExpanded } = this.state;
    return (
      <FAB.Group
        open={isFloatingActionButtonMenuExpanded}
        visible={true}
        icon={isFloatingActionButtonMenuExpanded ? 'ramen-dining' : 'add'}
        actions={[
          {
            icon: 'location-searching',
            label: 'Scan',
            onPress: () => NativeModules.Scanner.startOverlay(),
          },
          {
            icon: 'restart-alt',
            label: 'Reset',
            onPress: () => clearIngredients(),
          },
        ]}
        onStateChange={({ open }) => {
          this.setState({
            isFloatingActionButtonMenuExpanded: open,
          });
        }}
      />
    );
  }

  renderRecipeTypeChip(indicatorType: RecipeType) {
    const { recipeType, updateRecipeType } = this.props;
    const mixedRecipeData =
      indicatorType === RecipeType.Curry
        ? getRecipeData(CurryRecipeID.Mixed)
        : indicatorType === RecipeType.Dessert
        ? getRecipeData(DessertRecipeID.MixedJuice)
        : getRecipeData(SaladRecipeID.MixedSalad);

    const displayText =
      indicatorType === RecipeType.Curry
        ? 'Curries'
        : indicatorType === RecipeType.Dessert
        ? 'Desserts'
        : 'Salads';

    return (
      <Chip
        selected={recipeType === indicatorType}
        elevation={recipeType === indicatorType ? 0 : 1}
        style={styles.recipeTypeChip}
        avatar={<Avatar.Image size={24} source={mixedRecipeData.imageSrc} />}
        onPress={() =>
          updateRecipeType(recipeType !== indicatorType ? indicatorType : null)
        }>
        {displayText}
      </Chip>
    );
  }

  renderRecipeModal() {
    const { ingredients, potSize, recipeType } = this.props;
    const { isRecipeListVisible } = this.state;
    return (
      <Modal presentationStyle="overFullScreen" visible={isRecipeListVisible}>
        <Surface style={styles.modalLayout}>
          <View style={styles.modalToolbar}>
            <Button
              icon="arrow-back"
              style={styles.modalBackButton}
              mode="contained"
              onPress={() => {
                this.setState({
                  isRecipeListVisible: false,
                });
              }}>
              Back
            </Button>
            <TextInput
              label="Pot size"
              value={String(potSize)}
              underlineColor="transparent"
              style={styles.potSizeField}
              render={(renderProps: TextInputProps) => (
                <TextInputMask
                  {...renderProps}
                  selectTextOnFocus={true}
                  keyboardType={'numeric'}
                  onChangeText={formatted => {
                    const num = Number(formatted);
                    if (!isNaN(num)) {
                      updatePotSize(num);
                    }
                  }}
                />
              )}
            />
          </View>
          <IconButton icon={'menu'} onPress={() => {}} />
        </Surface>
        <View style={styles.recipeTypeContainer}>
          {[RecipeType.Curry, RecipeType.Dessert, RecipeType.Salad].map(
            type => (
              <React.Fragment key={type}>
                {this.renderRecipeTypeChip(type)}
              </React.Fragment>
            ),
          )}
        </View>
        <RecipeList
          ingredientConstraint={ingredients}
          typeConstraint={recipeType ?? undefined}
          potSizeConstraint={potSize}
        />
      </Modal>
    );
  }

  render() {
    const { ingredients, updateIngredients } = this.props;
    const ingredientIDs = Object.keys(Ingredients) as IngredientID[];
    return (
      <React.Fragment>
        <View style={styles.mainLayout}>
          <View style={styles.ingredientContentPane}>
            <ScrollView>
              <View style={styles.ingredientCountGrid}>
                {ingredientIDs.map(ingredientID => {
                  return (
                    <IngredientCountControl
                      key={ingredientID}
                      ingredientID={ingredientID}
                      count={ingredients[ingredientID] ?? 0}
                      updateCount={count => {
                        updateIngredients({
                          ...ingredients,
                          [ingredientID]: count,
                        });
                      }}
                    />
                  );
                })}
              </View>
            </ScrollView>
            <Portal.Host>
              <Portal>{this.renderFloatingActionButton()}</Portal>
            </Portal.Host>
          </View>
          <Surface style={styles.showRecipeButtonContainer} elevation={5}>
            <Button
              icon="soup-kitchen"
              style={styles.showRecipeButton}
              mode="elevated"
              onPress={() => {
                this.setState({
                  isRecipeListVisible: true,
                });
              }}>
              Show recipes
            </Button>
          </Surface>
        </View>
        <Portal>{this.renderRecipeModal()}</Portal>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  mainLayout: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  ingredientContentPane: {
    flex: 1,
  },
  ingredientCountGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    padding: 20,
    justifyContent: 'center',
  },
  showRecipeButtonContainer: {
    flexShrink: 0,
  },
  showRecipeButton: {
    padding: 15,
    margin: 20,
    marginTop: 10,
  },
  modalLayout: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalBackButton: {
    width: 80,
    marginLeft: 5,
  },
  modalToolbar: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  recipeTypeContainer: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  recipeTypeChip: {
    padding: 5,
  },
  potSizeField: {
    alignSelf: 'center',
    marginLeft: -5,
    backgroundColor: 'transparent',
    width: 50,
  },
});

const connector = connect(
  (state: RootState) => ({
    ingredients: state.cooking.ingredients,
    potSize: state.cooking.potSize,
    recipeType: state.cooking.recipeType,
  }),
  (dispatch: Dispatch) => ({
    updateIngredients: (ingredients: IngredientCounter) =>
      dispatch(updateIngredients(ingredients)),
    clearIngredients: () => dispatch(clearIngredients()),
    updatePotSize: (potSize: number) => dispatch(updatePotSize(potSize)),
    updateRecipeType: (recipeType: RecipeType | null) =>
      dispatch(updateRecipeType(recipeType)),
  }),
);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(CookingScreen);
