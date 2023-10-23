import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

/**
 * Placeholder content.
 */
export class WorkInProgressPlaceholder extends React.PureComponent {
  render() {
    return (
      <View style={styles.workInProgressViewRoot}>
        <Icon name="construction" size={40} />
        <Text>This view is a work in progress.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  workInProgressViewRoot: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
