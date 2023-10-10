import * as React from 'react';
import { MainApplicationStateSetter, IMainApplicationState } from './types';

const initialState: IMainApplicationState = {
  pokemonList: [],
};

export const GlobalStateContext = React.createContext<{
  state: IMainApplicationState;
  setState: MainApplicationStateSetter;
}>({
  state: initialState,
  setState: () => {},
});

interface IGlobalStateContextProviderProps {
  children: JSX.Element;
}

interface IGlobalStateContextProviderState {
  appState: IMainApplicationState;
}

/**
 * Provides global state.
 */
export class GlobalStateContextProvider extends React.PureComponent<
  IGlobalStateContextProviderProps,
  IGlobalStateContextProviderState
> {
  state: IGlobalStateContextProviderState = {
    appState: initialState,
  };

  render() {
    const { children } = this.props;
    const { appState } = this.state;
    return (
      <GlobalStateContext.Provider
        value={{
          state: appState,
          setState: state => {
            this.setState({
              appState: { ...appState, ...state },
            });
          },
        }}>
        {children}
      </GlobalStateContext.Provider>
    );
  }
}
