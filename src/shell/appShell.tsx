import * as React from 'react';
import { SafeAreaView } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { PokemonBoxScreen } from '../screens/pokemonBox/pokemonBoxScreen';
import { PokemonCompareScreen } from '../screens/pokemonCompare/pokemonCompareScreen';
import { SettingsScreen } from '../screens/settings/settingsScreen';

import styles from './styles';
import AddPokemonForm from '../screens/pokemonBox/addPokemonForm';
import { Screen, TabbedScreen } from './routes';
import { GlobalStateContextProvider } from '../globalStateContext';

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

/**
 * Main application shell wrapper with navigational components and active app management.
 */
export class AppShell extends React.PureComponent {
  render() {
    return (
      <SafeAreaView style={styles.appRoot}>
        <GlobalStateContextProvider>
          <NavigationContainer theme={navTheme}>
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
        </GlobalStateContextProvider>
      </SafeAreaView>
    );
  }
}
