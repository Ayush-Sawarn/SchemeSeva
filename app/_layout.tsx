import { Stack } from "expo-router";
import { PaperProvider } from 'react-native-paper';
import { darkTheme } from '../theme';
import { AuthProvider } from '../contexts/auth';

export default function RootLayout() {
  return (
    <AuthProvider>
      <PaperProvider theme={darkTheme}>
        <Stack 
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
      </PaperProvider>
    </AuthProvider>
  );
}
