import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { WorkInProgressPlaceholder } from '../../common/workInProgressPlaceholder';
import { RootState } from '../../common/store/reduxStore';

interface IPokemonListRendererProps extends PropsFromRedux {}

class PokemonListRenderer extends React.PureComponent<IPokemonListRendererProps> {
  render() {
    const { pokemonInventory } = this.props;
    console.log('rendering: ', pokemonInventory);
    return <WorkInProgressPlaceholder />;
  }
}

const connector = connect((state: RootState) => ({
  pokemonInventory: state.pokemon.pokemonInventory,
}));
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(PokemonListRenderer);
