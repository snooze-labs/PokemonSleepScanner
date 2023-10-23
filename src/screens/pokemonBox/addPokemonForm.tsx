import * as React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { ScreenNavigatorType } from '../../shell/routes';
import { wrapNavigation } from '../../common/navigation';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { IPokemon } from '../../common/store/types';
import { addPokemonToInventory } from '../../common/store/pokemonSlice';
import { PokemonID } from '../../gameData/pokemon/pokemon';
import { SubSkillID } from '../../gameData/skills/subSkills';
import { NatureID } from '../../gameData/natures/natures';
import { IngredientID } from '../../gameData/ingredients/ingredients';

interface IAddPokemonFormProps extends PropsFromRedux {}

/**
 * Form for adding a new pokemon.
 */
class AddPokemonForm extends React.PureComponent<
  IAddPokemonFormProps & {
    navigation: ScreenNavigatorType;
  }
> {
  render() {
    const { navigation, addPokemonToInventory } = this.props;
    return (
      <View>
        <Button
          onPress={() => {
            addPokemonToInventory({
              speciesID: PokemonID.Bulbasaur,
              level: 5,
              baseMainSkillLevel: 1,
              nature: NatureID.Adamant,
              ingredients: [
                IngredientID.Honey,
                IngredientID.SoftPotato,
                IngredientID.SnoozyTomato,
              ],
              subskills: [
                SubSkillID.BerryFindingS,
                SubSkillID.DreamShardBonus,
                SubSkillID.EnergyRecoveryBonus,
                SubSkillID.HelpingBonus,
                SubSkillID.HelpingSpeedM,
              ],
              isShiny: true,
            });
            navigation.goBack();
          }}>
          Submit form
        </Button>
      </View>
    );
  }
}

const connector = connect(null, (dispatch: Dispatch) => ({
  addPokemonToInventory: (pokemon: IPokemon) =>
    dispatch(addPokemonToInventory([pokemon])),
}));
type PropsFromRedux = ConnectedProps<typeof connector>;
export default wrapNavigation(connector(AddPokemonForm));
