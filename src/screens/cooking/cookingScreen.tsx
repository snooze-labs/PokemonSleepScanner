import React from 'react';
import {
  IngredientID,
  Ingredients,
} from '../../gameData/ingredients/ingredients';
import { ScrollView, View } from 'react-native';
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
  Tooltip,
} from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';
import { RecipeList } from './recipeList';
import { RecipeType } from '../../gameData/recipes/types';
import { NativeModules, Modal } from 'react-native';
import { Recipes } from '../../gameData/recipes/recipes';
import { CurryRecipeID } from '../../gameData/recipes/curries/curries';
import { DessertRecipeID } from '../../gameData/recipes/desserts/desserts';
import { SaladRecipeID } from '../../gameData/recipes/salads/salads';

interface ICookingScreenProps {}
interface ICookingScreenState {
  ingredients: { [key in IngredientID]?: number };
  recipeType?: RecipeType;
  potSize: number;
  isRecipeListVisible: boolean;
  isFloatingActionButtonMenuExpanded: boolean;
}

/**
 * Screen for the cooking functionality.
 */
export class CookingScreen extends React.PureComponent<
  ICookingScreenProps,
  ICookingScreenState
> {
  state: ICookingScreenState = {
    ingredients: {},
    potSize: 999,
    isRecipeListVisible: false,
    isFloatingActionButtonMenuExpanded: false,
  };

  renderIngredientCounter(ingredientId: IngredientID) {
    const { ingredients } = this.state;
    const count = ingredients[ingredientId] ?? 0;
    const ingredient = Ingredients[ingredientId];
    return (
      <Surface
        style={{
          borderRadius: 20,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}>
          <IconButton
            icon="remove"
            style={{ margin: 0 }}
            disabled={!ingredients[ingredientId]}
            onPress={() => {
              const oldValue = ingredients[ingredientId] ?? 0;
              const updatedMap = {
                ...ingredients,
                [ingredientId]: oldValue - 1,
              };
              this.setState({
                ingredients: updatedMap,
              });
            }}
          />
          <Tooltip title={ingredient.name}>
            <Avatar.Image
              style={{ marginLeft: -5 }}
              size={24}
              source={ingredient.imageSrc}
            />
          </Tooltip>
          <TextInput
            value={String(count)}
            underlineColor="transparent"
            style={{
              alignSelf: 'center',
              width: 50,
              backgroundColor: 'transparent',
              marginLeft: -5,
            }}
            render={(renderProps: TextInputProps) => (
              <TextInputMask
                {...renderProps}
                selectTextOnFocus={true}
                keyboardType={'numeric'}
                onChangeText={formatted => {
                  const num = Number(formatted);
                  const updatedMap = { ...ingredients, [ingredientId]: num };
                  if (isNaN(num)) {
                    updatedMap[ingredientId] = 0;
                  }
                  this.setState({
                    ingredients: updatedMap,
                  });
                }}
              />
            )}
          />
          <IconButton
            icon="add"
            style={{ margin: 0 }}
            onPress={() => {
              const oldValue = ingredients[ingredientId] ?? 0;
              const updatedMap = {
                ...ingredients,
                [ingredientId]: oldValue + 1,
              };
              this.setState({
                ingredients: updatedMap,
              });
            }}
          />
        </View>
      </Surface>
    );
  }

  render() {
    const {
      ingredients,
      recipeType,
      potSize,
      isRecipeListVisible,
      isFloatingActionButtonMenuExpanded,
    } = this.state;
    const ingredientIDs = Object.keys(Ingredients) as IngredientID[];
    return (
      <React.Fragment>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}>
          <View
            style={{
              flex: 1,
            }}>
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
                {ingredientIDs.map(ingredientID => {
                  return (
                    <React.Fragment key={ingredientID}>
                      {this.renderIngredientCounter(ingredientID)}
                    </React.Fragment>
                  );
                })}
              </View>
            </ScrollView>
            <Portal.Host>
              <Portal>
                <FAB.Group
                  open={isFloatingActionButtonMenuExpanded}
                  visible={true}
                  icon={
                    isFloatingActionButtonMenuExpanded ? 'ramen-dining' : 'add'
                  }
                  actions={[
                    {
                      icon: 'location-searching',
                      label: 'Scan',
                      onPress: () => NativeModules.Scanner.startOverlay(),
                    },
                    {
                      icon: 'restart-alt',
                      label: 'Reset',
                      onPress: () =>
                        this.setState({
                          ingredients: {},
                        }),
                    },
                  ]}
                  onStateChange={({ open }) => {
                    this.setState({
                      isFloatingActionButtonMenuExpanded: open,
                    });
                  }}
                />
              </Portal>
            </Portal.Host>
          </View>
          <Surface style={{ flexShrink: 0 }} elevation={5}>
            <Button
              icon="soup-kitchen"
              style={{
                padding: 15,
                margin: 20,
                marginTop: 10,
              }}
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
        <Portal>
          <Modal
            presentationStyle="overFullScreen"
            visible={isRecipeListVisible}>
            <Surface
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'center',
                }}>
                <Button
                  icon="arrow-back"
                  style={{
                    width: 80,
                    marginLeft: 5,
                  }}
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
                  style={{
                    alignSelf: 'center',
                    marginLeft: -5,
                    backgroundColor: 'transparent',
                    width: 50,
                  }}
                  render={(renderProps: TextInputProps) => (
                    <TextInputMask
                      {...renderProps}
                      selectTextOnFocus={true}
                      keyboardType={'numeric'}
                      onChangeText={formatted => {
                        const num = Number(formatted);
                        if (!isNaN(num)) {
                          this.setState({
                            potSize: num,
                          });
                        }
                      }}
                    />
                  )}
                />
              </View>
              <IconButton icon={'menu'} onPress={() => {}} />
            </Surface>
            <View
              style={{
                alignSelf: 'center',
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                marginTop: 20,
              }}>
              <Chip
                selected={recipeType === RecipeType.Curry}
                elevation={recipeType === RecipeType.Curry ? 0 : 1}
                style={{
                  padding: 5,
                }}
                avatar={
                  <Avatar.Image
                    size={24}
                    source={Recipes[CurryRecipeID.Mixed].imageSrc}
                  />
                }
                onPress={() =>
                  this.setState({
                    recipeType:
                      recipeType !== RecipeType.Curry
                        ? RecipeType.Curry
                        : undefined,
                  })
                }>
                Curries
              </Chip>
              <Chip
                selected={recipeType === RecipeType.Dessert}
                elevation={recipeType === RecipeType.Dessert ? 0 : 1}
                style={{
                  padding: 5,
                }}
                avatar={
                  <Avatar.Image
                    size={24}
                    source={Recipes[DessertRecipeID.MixedJuice].imageSrc}
                  />
                }
                onPress={() =>
                  this.setState({
                    recipeType:
                      recipeType !== RecipeType.Dessert
                        ? RecipeType.Dessert
                        : undefined,
                  })
                }>
                Desserts
              </Chip>
              <Chip
                selected={recipeType === RecipeType.Salad}
                elevation={recipeType === RecipeType.Salad ? 0 : 1}
                style={{
                  padding: 5,
                }}
                avatar={
                  <Avatar.Image
                    size={24}
                    source={Recipes[SaladRecipeID.MixedSalad].imageSrc}
                  />
                }
                onPress={() =>
                  this.setState({
                    recipeType:
                      recipeType !== RecipeType.Salad
                        ? RecipeType.Salad
                        : undefined,
                  })
                }>
                Salads
              </Chip>
            </View>
            <RecipeList
              ingredientConstraint={ingredients}
              typeConstraint={recipeType}
              potSizeConstraint={potSize}
            />
          </Modal>
        </Portal>
      </React.Fragment>
    );
  }
}
