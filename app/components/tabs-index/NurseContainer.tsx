import { router } from "expo-router";
import { Text, View } from "react-native";
import GreetingCard from './GreetingCard';
import QuickActions from './QuickActions';
import ServicePlanCard from './ServicePlanCard';

const NurseContainer = () => {
  const to = () => {
    router.push('/care/plan');
  }
  const onServiceChange = () => {
    router.push('/care/exchange');
  }
  return (<View className="p-4">
    <GreetingCard userName="刘丽娜" totalTasks={8} completedTasks={5} to={to} />
    {/* 今日服务计划标题 */}
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827' }}>今日服务计划</Text>
    </View>

    {/* 服务计划卡片列表 */}
    <View style={{ gap: 16, marginBottom: 32 }}>
      <ServicePlanCard title="居家护理服务" time="09:00-11:00" insuredName="张奶奶" address="朝阳区建国路88号" status="待服务" items={["生活护理", "健康检测", "康复训练"]} onServiceChange={onServiceChange} />
      <ServicePlanCard title="居家护理服务" time="14:00-16:00" insuredName="李爷爷" address="海淀区中关村大街1号" status="待服务" items={["生活护理", "健康检测", "康复训练"]} onServiceChange={onServiceChange} />
    </View>
    {/* 快捷功能标题 */}
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827' }}>快捷功能</Text>
    </View>

    {/* 快捷功能网格 */}
    <QuickActions />
  </View>)
}
export default NurseContainer