import React, { useContext } from 'react';
import { MainApplicationStateSetter, IMainApplicationState } from '../types';
import { GlobalStateContext } from '../globalStateContext';

/**
 * Returns a wrapped component with the global state get/set props.
 */
export function wrapState<
  TProps extends {
    state: IMainApplicationState;
    setState: MainApplicationStateSetter;
  },
>(Component: React.ComponentType<TProps>) {
  return (props: Omit<Omit<TProps, 'state'>, 'setState'>) => {
    const globalState = useContext(GlobalStateContext);
    const newProps = { ...props, ...globalState } as TProps;
    return <Component {...newProps} />;
  };
}
