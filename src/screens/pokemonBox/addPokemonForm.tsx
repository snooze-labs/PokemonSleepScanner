import * as React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { ScreenNavigatorType } from '../../shell/routes';
import { wrapNavigation } from '../../common/navigation';
import { GlobalStateContext } from '../../globalStateContext';

interface IAddPokemonFormProps {}

/**
 * Form for adding a new pokemon.
 */
class AddPokemonForm extends React.PureComponent<
  IAddPokemonFormProps & {
    navigation: ScreenNavigatorType;
  }
> {
  render() {
    const { navigation } = this.props;
    return (
      <View>
        <GlobalStateContext.Consumer>
          {({ setState }) => (
            <Button
              onPress={() => {
                setState({ pokemonList: [{ id: 'bulbasaur' }] });
                navigation.goBack();
              }}>
              Submit form
            </Button>
          )}
        </GlobalStateContext.Consumer>
      </View>
    );
  }
}

export default wrapNavigation(AddPokemonForm);
