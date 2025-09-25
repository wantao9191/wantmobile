import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

export type ServicePlanCardProps = {
  title: string;
  time: string;
  insuredName: string;
  address: string;
  status: string; // e.g., 待服务
  items: string[]; // 项目标签
  onScan?: () => void;
  onDelayOrCancel?: () => void;
};

export default function ServicePlanCard({
  title,
  time,
  insuredName,
  address,
  status,
  items,
  onScan,
  onDelayOrCancel,
}: ServicePlanCardProps) {
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        ...(Platform.OS === 'ios' ? {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
        } : {
          elevation: 4,
        }),
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 4 }}>{title}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <Ionicons name="time" size={16} color="#6B7280" />
            <Text style={{ fontSize: 14, color: '#6B7280', marginLeft: 8 }}>{time}</Text>
          </View>
        </View>
        <View style={{ backgroundColor: '#FED7AA', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 16, borderWidth: 1, borderColor: '#F97316' }}>
          <Text style={{ fontSize: 12, fontWeight: '600', color: '#C2410C' }}>{status}</Text>
        </View>
      </View>

      <View style={{ marginBottom: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <Ionicons name="person" size={16} color="#6B7280" />
          <Text style={{ fontSize: 14, color: '#6B7280', marginLeft: 8 }}>{insuredName}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="location" size={16} color="#6B7280" />
          <Text style={{ fontSize: 14, color: '#6B7280', marginLeft: 8 }}>{address}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {items.map((item) => (
          <View key={item} style={{ backgroundColor: '#F3F4F6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}>
            <Text style={{ fontSize: 12, color: '#374151' }}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={{ flexDirection: 'row', gap: 12 }}>
        <TouchableOpacity onPress={onScan} style={{ flex: 1, backgroundColor: '#3B82F6', paddingVertical: 12, borderRadius: 8 }}>
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: '500' }}>扫码服务</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelayOrCancel} style={{ flex: 1, backgroundColor: '#F3F4F6', paddingVertical: 12, borderRadius: 8 }}>
          <Text style={{ color: '#374151', textAlign: 'center', fontWeight: '500' }}>推迟/取消</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
