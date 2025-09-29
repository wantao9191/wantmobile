import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";
import "../global.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{
        headerShown: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#F1F5F9',
          borderBottomWidth: 1,
          borderBottomColor: '#CBD5E1',
        } as any,
        headerTintColor: '#111827',
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 17,
        },
        headerShadowVisible: false,
      }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false, title: '' }} />
        <Stack.Screen name="care" options={{
          headerShown: false,
          title: '服务计划'
        }} />
      </Stack>
    </AuthProvider>
  )
}
