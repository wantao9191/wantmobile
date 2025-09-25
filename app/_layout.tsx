import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack screenOptions={{
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
      <Stack.Screen name="(tabs)" options={{ headerShown: false, title: '' }} />
      <Stack.Screen name="care" options={{
        headerShown: false,
        title: '服务计划'
      }} />
    </Stack>
  )
}
