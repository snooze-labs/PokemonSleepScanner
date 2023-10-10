import * as React from 'react';
import { WorkInProgressPlaceholder } from '../../common/workInProgressPlaceholder';
import { wrapState } from '../../common/state';
import { MainApplicationStateSetter, IMainApplicationState } from '../../types';

class PokemonListRenderer extends React.PureComponent<{
  state: IMainApplicationState;
  setState: MainApplicationStateSetter;
}> {
  render() {
    const { state } = this.props;
    console.log('rendering: ', state);
    return <WorkInProgressPlaceholder />;
  }
}

export default wrapState(PokemonListRenderer);
