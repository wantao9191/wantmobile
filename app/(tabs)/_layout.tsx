import { Ionicons } from '@expo/vector-icons';
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
      <Tabs screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#F1F5F9',
          borderBottomWidth: 1,
          borderBottomColor: '#CBD5E1',
        },
        headerTintColor: '#111827',
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 17,
        },
        headerShadowVisible: false,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          height: 60,
          paddingTop: 6,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 0,
          marginBottom: 2,
        },
        tabBarHideOnKeyboard: true,
      }}>
        <Tabs.Screen name='index' options={{
          title: '服务首页', tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          )
        }}></Tabs.Screen>
        <Tabs.Screen name="user" options={{
          title: '我的', tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
          )
        }}></Tabs.Screen>
      </Tabs>
  )
}
