import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { AppShell } from './src/shell/appShell';
import Icon from 'react-native-vector-icons/MaterialIcons';

function App(): JSX.Element {
  return (
    <PaperProvider
      settings={{
        icon: props => <Icon {...props} />,
      }}>
      <AppShell />
    </PaperProvider>
  );
}

export default App;
