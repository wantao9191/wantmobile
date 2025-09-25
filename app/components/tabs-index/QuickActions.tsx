import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

export type QuickActionsProps = {
  onScanPress?: () => void;
  onIncidentPress?: () => void;
  onBindDevicePress?: () => void;
  onViewPeoplePress?: () => void;
};

export default function QuickActions({ onScanPress, onIncidentPress, onBindDevicePress, onViewPeoplePress }: QuickActionsProps) {
  const cardStyle = {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
    ...(Platform.OS === 'ios' ? {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    } : {
      elevation: 4,
    }),
  } as const;

  const iconWrap = (bg: string, icon: React.ReactNode, label: string, onPress?: () => void) => (
    <TouchableOpacity onPress={onPress} style={cardStyle}>
      <View style={{ alignItems: 'center' }}>
        <View style={{ backgroundColor: bg, padding: 12, borderRadius: 20, marginBottom: 12 }}>
          {icon}
        </View>
        <Text style={{ fontSize: 14, fontWeight: '500', color: '#111827' }}>{label}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {iconWrap('#DBEAFE', <Ionicons name='qr-code' size={24} color="#3B82F6" />, '扫码服务', onScanPress)}
      {iconWrap('#FEE2E2', <Ionicons name='alert' size={24} color="#EF4444" />, '特情上报', onIncidentPress)}
      {iconWrap('#D1FAE5', <Ionicons name='location' size={24} color="#10B981" />, '绑定设备', onBindDevicePress)}
      {iconWrap('#EDE9FE', <Ionicons name='people' size={24} color="#8B5CF6" />, '查看参保人', onViewPeoplePress)}
    </View>
  );
}
