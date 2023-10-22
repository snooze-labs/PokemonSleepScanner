import React from 'react';
import { PaperProvider } from 'react-native-paper';
import AppShell from './src/shell/appShell';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Provider as StoreProvider } from 'react-redux';
import store from './src/common/store/reduxStore';

function App(): JSX.Element {
  return (
    <StoreProvider store={store}>
      <PaperProvider
        settings={{
          icon: props => <Icon {...props} />,
        }}>
        <AppShell />
      </PaperProvider>
    </StoreProvider>
  );
}

export default App;
