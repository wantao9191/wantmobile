import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

export type PackageInfoCardProps = {
  name: string;
  usedHours: number;
  totalHours: number;
  remainingHours: number;
  expiryDate: string;
  status: string;
  onViewDetails?: () => void;
};

export default function PackageInfoCard({
  name,
  usedHours,
  totalHours,
  remainingHours,
  expiryDate,
  status,
  onViewDetails,
}: PackageInfoCardProps) {
  const progressPercentage = (usedHours / totalHours) * 100;
  
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginBottom: 24,
        ...(Platform.OS === 'ios' ? {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
        } : {
          elevation: 6,
        }),
      }}
    >
      {/* 头部信息 */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <View style={{ 
              backgroundColor: '#3B82F6', 
              padding: 8, 
              borderRadius: 12, 
              marginRight: 12 
            }}>
              <Ionicons name="medical" size={20} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 4 }}>
                {name}
              </Text>
              <Text style={{ fontSize: 14, color: '#6B7280' }}>
                护理服务套餐
              </Text>
            </View>
          </View>
        </View>
        
        <View style={{ 
          backgroundColor: status === '进行中' ? '#D1FAE5' : '#FEF3C7',
          paddingHorizontal: 12, 
          paddingVertical: 6, 
          borderRadius: 20, 
          borderWidth: 1, 
          borderColor: status === '进行中' ? '#10B981' : '#F59E0B'
        }}>
          <Text style={{ 
            fontSize: 12, 
            fontWeight: '600', 
            color: status === '进行中' ? '#059669' : '#D97706'
          }}>
            {status}
          </Text>
        </View>
      </View>

      {/* 使用情况统计 */}
      <View style={{ marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827' }}>使用情况</Text>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#3B82F6' }}>
            {usedHours}/{totalHours}小时
          </Text>
        </View>
        
        {/* 进度条 */}
        <View style={{ 
          backgroundColor: '#F3F4F6', 
          height: 12, 
          borderRadius: 6, 
          overflow: 'hidden',
          marginBottom: 12
        }}>
          <View style={{ 
            backgroundColor: '#3B82F6', 
            height: '100%', 
            width: `${progressPercentage}%`, 
            borderRadius: 6,
            position: 'relative'
          }}>
            {/* 进度条光泽效果 */}
            <View style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '50%',
              backgroundColor: 'rgba(255,255,255,0.3)',
              borderRadius: 6
            }} />
          </View>
        </View>
        
        {/* 详细信息 */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="time" size={16} color="#6B7280" />
            <Text style={{ fontSize: 14, color: '#6B7280', marginLeft: 6 }}>
              剩余 {remainingHours} 小时
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="calendar" size={16} color="#6B7280" />
            <Text style={{ fontSize: 14, color: '#6B7280', marginLeft: 6 }}>
              有效期至 {expiryDate}
            </Text>
          </View>
        </View>
      </View>

      {/* 操作按钮 */}
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <TouchableOpacity 
          onPress={onViewDetails}
          style={{ 
            flex: 1, 
            backgroundColor: '#3B82F6', 
            paddingVertical: 14, 
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Ionicons name="eye" size={16} color="#FFFFFF" />
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600', marginLeft: 6 }}>
            查看详情
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={{ 
            backgroundColor: '#F3F4F6', 
            paddingVertical: 14, 
            paddingHorizontal: 20,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Ionicons name="refresh" size={16} color="#6B7280" />
          <Text style={{ color: '#6B7280', textAlign: 'center', fontWeight: '600', marginLeft: 6 }}>
            续费
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
