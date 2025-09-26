import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Platform, Text, TouchableOpacity } from "react-native";

// 创建简单的事件管理器（兼容 Web 和 Native）
class SimpleEventEmitter {
  private listeners: { [key: string]: Function[] } = {};

  on(event: string, listener: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  off(event: string, listener: Function) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(l => l !== listener);
  }

  emit(event: string, ...args: any[]) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(listener => listener(...args));
  }
}

export const navigationEvents = new SimpleEventEmitter();

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
      headerBackTitleStyle: {
        fontSize: 14,
      },
      headerShadowVisible: false,
      presentation: 'card'
    }}>
      <Stack.Screen name="plan" options={{
        title: '服务计划',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 8,
              marginLeft: -8
            }}
          >
            <Ionicons name="chevron-back" size={24} color="#007AFF" />
            <Text style={{
              fontSize: 14,
              marginLeft: -2
            }}>服务首页</Text>
          </TouchableOpacity>
        )
      }} />
      <Stack.Screen name="sign" options={{ title: '签到打卡' }} />
      <Stack.Screen
        name="service"
        options={{
          title: '服务进行中',
          presentation: Platform.OS === 'ios' ? 'transparentModal' : 'card',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigationEvents.emit('serviceBackPress')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 8,
                marginLeft: -8
              }}
            >
              <Ionicons name="chevron-back" size={24} color="#007AFF" />
              <Text style={{
                fontSize: 14,
                marginLeft: -2
              }}>返回</Text>
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen name="signout" options={{
        title: '签退',
        presentation: Platform.OS === 'ios' ? 'transparentModal' : 'card',
        headerLeft: () => null
      }} />
      {/* <Stack.Screen name="特情上报" options={{ title: '特情上报' }} />
      <Stack.Screen name="打卡" options={{ title: '打卡' }} />
      <Stack.Screen name="绑定设备" options={{ title: '绑定设备' }} />
      <Stack.Screen name="评价" options={{ title: '评价' }} /> */}
    </Stack>
  )
}
