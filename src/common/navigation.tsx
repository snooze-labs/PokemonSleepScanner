import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

/**
 * Returns a wrapped component with the navigation prop.
 */
export function wrapNavigation<
  TProps extends { navigation: TNavType },
  TNavType extends NativeStackNavigationProp<any>,
>(Component: React.ComponentType<TProps>) {
  return (props: Omit<TProps, 'navigation'>) => {
    const navigation = useNavigation<TNavType>();
    const newProps = { ...props, navigation } as TProps;
    return <Component {...newProps} />;
  };
}
