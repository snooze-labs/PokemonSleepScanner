import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export enum Screen {
  MainContent = 'MainContent',
  AddPokemonForm = 'AddPokemonForm',
}

export type ScreenNavigatorType = NativeStackNavigationProp<{
  [key in Screen]: undefined;
}>;

export enum TabbedScreen {
  PokemonBox = 'PokemonBox',
  PokemonCompare = 'PokemonCompare',
  Cooking = 'Cooking',
  Settings = 'Settings',
}

export type TabbedScreenNavigatorType = NativeStackNavigationProp<{
  [key in TabbedScreen]: undefined;
}>;
