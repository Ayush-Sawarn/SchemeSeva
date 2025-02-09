import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#000000',
    secondary: '#404040',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#000000',
    onBackground: '#000000',
    onSurface: '#000000',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#FFFFFF',
    secondary: '#CCCCCC',
    background: '#000000',
    surface: '#121212',
    text: '#FFFFFF',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
  },
}; 