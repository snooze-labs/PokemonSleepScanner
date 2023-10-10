import React from 'react';
import { View } from 'react-native';
import AddPokemonButton from './addPokemonButton';
import PokemonListRenderer from './pokemonListRenderer';

/**
 * Screen for pokemon inventory.
 */
export class PokemonBoxScreen extends React.PureComponent {
  render() {
    return (
      <View>
        <PokemonListRenderer />
        <AddPokemonButton />
      </View>
    );
  }
}
