import React from 'react';
import { View, ViewProps } from 'react-native';

export const SafeView = (props: ViewProps) => {
  try {
    return <View {...props} />;
  } catch (e) {
    console.warn("Safe View caught error:", (e as Error).message);
    return <View {...props} />;
  }
};

export default SafeView;