import * as React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './workInProgressPlaceholder.style';

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
