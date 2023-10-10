import * as React from 'react';
import { FAB } from 'react-native-paper';
import { NativeModules } from 'react-native';

import styles from './styles';
import { Screen, ScreenNavigatorType } from '../../shell/routes';
import { wrapNavigation } from '../../common/navigation';

interface IAddPokemonButtonProps {}
interface IAddPokemonButtonState {
  expanded: boolean;
}

/**
 * Floating action button to add a pokemon to the box.
 */
class AddPokemonButton extends React.PureComponent<
  IAddPokemonButtonProps & {
    navigation: ScreenNavigatorType;
  },
  IAddPokemonButtonState
> {
  state: IAddPokemonButtonState = {
    expanded: false,
  };

  render() {
    const { navigation } = this.props;
    const { expanded } = this.state;
    return (
      <FAB.Group
        open={expanded}
        visible={true}
        icon={expanded ? 'catching-pokemon' : 'add'}
        actions={[
          {
            icon: 'location-searching',
            label: 'Scan',
            onPress: () => NativeModules.Scanner.startOverlay(),
          },
          {
            icon: 'edit-note',
            label: 'Manual',
            onPress: () => navigation.navigate(Screen.AddPokemonForm),
          },
        ]}
        onStateChange={({ open }) => {
          this.setState({
            expanded: open,
          });
        }}
        style={styles.AddPokemonButton}
      />
    );
  }
}

export default wrapNavigation(AddPokemonButton);
