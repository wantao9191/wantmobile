import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import InsuredGreetingCard from './InsuredGreetingCard';
import ServicePlanCard from './ServicePlanCard';

const InsuredContainer = () => {
  return (<View className="px-4 pt-2 pb-6">
    <InsuredGreetingCard
      userName="张奶奶"
      totalServices={3}
      completedServices={1}
      packageInfo={{
        name: "居家护理套餐",
        usedHours: 32,
        totalHours: 50,
        remainingHours: 18,
        expiryDate: "2025-12-31",
        status: "进行中"
      }}
      onViewPackageDetails={() => {
        // 处理查看套餐详情逻辑
        console.log('查看套餐详情');
      }}
      onRenewPackage={() => {
        // 处理续费逻辑
        console.log('续费套餐');
      }}
    />
    {/* 今日服务计划标题 */}
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827' }}>今日服务计划</Text>
    </View>

    {/* 服务计划卡片列表 */}
    <View style={{ gap: 16, marginBottom: 32 }}>
      <ServicePlanCard title="居家护理服务" time="09:00-11:00" insuredName="张奶奶" address="朝阳区建国路88号" status="待服务" items={["生活护理", "健康检测", "康复训练"]} />
    </View>

    {/* 待评价服务标题 */}
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827' }}>待评价服务</Text>
    </View>
    {/* 待评价服务卡片 */}
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginBottom: 24,
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
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <Ionicons name="checkmark-circle" size={16} color="#10B981" />
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827', marginLeft: 8 }}>已完成未评价</Text>
          </View>
          <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 4 }}>1项服务</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="time" size={16} color="#6B7280" />
            <Text style={{ fontSize: 14, color: '#6B7280', marginLeft: 8 }}>2025-9-10 10:00-12:00</Text>
          </View>
        </View>
        <View style={{ backgroundColor: '#FED7AA', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 16, borderWidth: 1, borderColor: '#F97316' }}>
          <Text style={{ fontSize: 12, fontWeight: '600', color: '#C2410C' }}>待评价</Text>
        </View>
      </View>

      <TouchableOpacity style={{ backgroundColor: '#3B82F6', paddingVertical: 12, borderRadius: 8 }}>
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '500' }}>去评价</Text>
      </TouchableOpacity>
    </View>
  </View>)
}
export default InsuredContainer