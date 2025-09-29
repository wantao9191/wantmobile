import { router } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { Text, View } from "react-native";
import { Empty } from '../ui';
import GreetingCard from './GreetingCard';
import QuickActions from './QuickActions';
import ServicePlanCard from './ServicePlanCard';
const NurseContainer = React.memo(({ userData, userPlan }: { userData: any, userPlan: any }) => {
  // 使用 useCallback 优化函数引用
  const to = useCallback(() => {
    router.push('/care/plan');
  }, []);

  const onServiceChange = useCallback(() => {
    router.push('/care/exchange');
  }, []);

  // 模拟数据，实际应该从 props 或状态管理中获取

  const servicePlans = useMemo(() => userPlan, [userPlan]);
  return (
    <View style={{ padding: 16 }}>
      <GreetingCard
        userName={userData.name}
        to={to}
        userPlan={userPlan}
      />

      {/* 今日服务计划标题 */}
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827' }}>
          今日服务计划
        </Text>
      </View>

      {/* 服务计划卡片列表 - 使用优化后的数据结构 */}
      <View style={{ gap: 16, marginBottom: 32 }}>
        {servicePlans && servicePlans.length > 0 ? (
          servicePlans.map((plan: any) => (
            <ServicePlanCard
              key={plan.id}
              title={plan.package.name}
              time={plan.startTime + ' - ' + plan.endTime}
              insuredName={plan.insured.name}
              address={plan.insured.address}
              status={plan.status}
              items={plan.package.tasks}
              onServiceChange={onServiceChange}
            />
          ))
        ) : (
          <Empty
            type="no-data"
            icon="calendar-outline"
            title="今日无服务计划"
            description="您今天没有安排的服务计划，可以查看本月计划或联系管理员"
            actionText="查看本月计划"
          />
        )}
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