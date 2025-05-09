import { SafeText } from './SafeText';
import { SafeView } from './SafeView';
import { Pressable } from 'react-native';
import { Button } from 'react-native-paper';

export { SafeText, SafeView };
export const SafePressable = Pressable;
export const SafeButton = Button;

// Add a default export
const Components = {
  SafeText,
  SafePressable,
  SafeButton,
  SafeView
};

export default Components;