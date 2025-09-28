import { router } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { Text, View } from "react-native";
import GreetingCard from './GreetingCard';
import QuickActions from './QuickActions';
import ServicePlanCard from './ServicePlanCard';

const NurseContainer = React.memo(() => {
  // 使用 useCallback 优化函数引用
  const to = useCallback(() => {
    router.push('/care/plan');
  }, []);

  const onServiceChange = useCallback(() => {
    router.push('/care/exchange');
  }, []);

  // 模拟数据，实际应该从 props 或状态管理中获取
  const userData = useMemo(() => ({
    userName: "刘丽娜",
    totalTasks: 8,
    completedTasks: 5
  }), []);

  const servicePlans = useMemo(() => [
    {
      id: '1',
      title: "居家护理服务",
      time: "09:00-11:00",
      insuredName: "张奶奶",
      address: "朝阳区建国路88号",
      status: "待服务",
      items: ["生活护理", "健康检测", "康复训练"]
    },
    {
      id: '2',
      title: "居家护理服务",
      time: "14:00-16:00",
      insuredName: "李爷爷",
      address: "海淀区中关村大街1号",
      status: "待服务",
      items: ["生活护理", "健康检测", "康复训练"]
    }
  ], []);
  return (
    <View style={{ padding: 16 }}>
      <GreetingCard 
        userName={userData.userName} 
        totalTasks={userData.totalTasks} 
        completedTasks={userData.completedTasks} 
        to={to} 
      />
      
      {/* 今日服务计划标题 */}
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827' }}>
          今日服务计划
        </Text>
      </View>

      {/* 服务计划卡片列表 - 使用优化后的数据结构 */}
      <View style={{ gap: 16, marginBottom: 32 }}>
        {servicePlans.map((plan) => (
          <ServicePlanCard 
            key={plan.id}
            title={plan.title}
            time={plan.time}
            insuredName={plan.insuredName}
            address={plan.address}
            status={plan.status}
            items={plan.items}
            onServiceChange={onServiceChange}
          />
        ))}
      </View>
      
      {/* 快捷功能标题 */}
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827' }}>
          快捷功能
        </Text>
      </View>

      {/* 快捷功能网格 */}
      <QuickActions />
    </View>
  );
});

export default NurseContainer;