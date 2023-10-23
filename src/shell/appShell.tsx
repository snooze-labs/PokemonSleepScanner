import * as React from 'react';
import {
  DeviceEventEmitter,
  EmitterSubscription,
  SafeAreaView,
} from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import {
  DefaultTheme,
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { PokemonBoxScreen } from '../screens/pokemonBox/pokemonBoxScreen';
import { PokemonCompareScreen } from '../screens/pokemonCompare/pokemonCompareScreen';
import { SettingsScreen } from '../screens/settings/settingsScreen';

import styles from './styles';
import AddPokemonForm from '../screens/pokemonBox/addPokemonForm';
import { Screen, TabbedScreen } from './routes';
import CookingScreen from '../screens/cooking/cookingScreen';
import {
  INativeEventHandlerMap,
  NativeEventChannelID,
  NativeEvents,
} from './nativeEvents';
import { getOCRResults } from './ocr/ocr';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { replaceIngredients } from '../common/store/cookingSlice';
import { IngredientCounter } from '../common/store/types';
import { initializeStore } from '../common/store/reduxStore';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

/**
 * Tab navigator is used to track page changes from the bottom navigator.
 */
function MainContent() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={TabbedScreen.PokemonBox}
        component={PokemonBoxScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="inbox" color={color} size={26} />
          ),
          tabBarLabel: 'Pokémon',
        }}
      />
      <Tab.Screen
        name={TabbedScreen.PokemonCompare}
        component={PokemonCompareScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="compare" color={color} size={26} />
          ),
          tabBarLabel: 'Compare',
        }}
      />
      <Tab.Screen
        name={TabbedScreen.Cooking}
        component={CookingScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="pot-mix" color={color} size={26} />
          ),
          tabBarLabel: 'Cooking',
        }}
      />
      <Tab.Screen
        name={TabbedScreen.Settings}
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" color={color} size={26} />
          ),
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
}

interface IAppShellProps extends PropsFromRedux {}

/**
 * Main application shell wrapper with navigational components and active app management.
 */
class AppShell extends React.PureComponent<IAppShellProps> {
  private navigationRef =
    React.createRef<NavigationContainerRef<TabbedScreen>>();
  private eventListener: EmitterSubscription | undefined;
  private eventHandlers: INativeEventHandlerMap = {
    [NativeEvents.ScanCompleted]: async payload => {
      const results = await getOCRResults(payload.filePath);
      if (results.screen === TabbedScreen.Cooking) {
        this.props.replaceIngredients(results.ingredients);
        this.navigationRef.current?.navigate(TabbedScreen.Cooking as any);
      }
    },
  };

  componentDidMount(): void {
    // initialize Redux store on mount
    initializeStore(this.props.dispatch);

    this.eventListener = DeviceEventEmitter.addListener(
      NativeEventChannelID,
      (data: { type: NativeEvents; payload: any }) => {
        const { type, payload } = data;
        const eventHandler = this.eventHandlers[type];
        eventHandler(payload);
      },
    );
  }

  componentWillUnmount(): void {
    this.eventListener?.remove();
    this.eventListener = undefined;
  }

  render() {
    return (
      <SafeAreaView style={styles.appRoot}>
        <NavigationContainer theme={navTheme} ref={this.navigationRef}>
          <Stack.Navigator>
            <Stack.Screen
              name={Screen.MainContent}
              component={MainContent}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={Screen.AddPokemonForm}
              component={AddPokemonForm}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}

const connector = connect(null, (dispatch: Dispatch) => ({
  replaceIngredients: (ingredients: IngredientCounter) =>
    dispatch(replaceIngredients(ingredients)),
  dispatch,
}));
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(AppShell);
