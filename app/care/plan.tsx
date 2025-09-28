import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ServicePlanCard } from '../../components/tabs-index';
import {
  colors,
  combineStyles,
  commonStyles
} from '../../styles/commonStyles';

const Plan = () => {
  const [selectedFilter, setSelectedFilter] = useState('全部');
  
  const filterOptions = ['全部', '已完成', '待完成', '已取消', '已推迟'];
  const to = () => {
    router.push('/care/sign');
  }
  return (
    <View style={combineStyles(commonStyles.container, { backgroundColor: '#F9FAFB' })}>
      <SafeAreaView style={commonStyles.safeArea} edges={[]}>
        {/* 筛选按钮区域 */}
        <View style={styles.filterContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScrollContent}
            accessible={true}
            accessibilityRole="scrollbar"
            accessibilityLabel="筛选选项列表"
          >
            <View style={styles.filterButtonsContainer}>
              {filterOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => setSelectedFilter(option)}
                  style={[
                    commonStyles.filterButton,
                    selectedFilter === option && commonStyles.filterButtonSelected,
                  ]}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel={`筛选选项：${option}`}
                  accessibilityState={{ selected: selectedFilter === option }}
                >
                  <Text style={[
                    commonStyles.filterButtonText,
                    selectedFilter === option && commonStyles.filterButtonTextSelected
                  ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* 服务卡片列表 */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          accessible={true}
          accessibilityRole="scrollbar"
          accessibilityLabel="服务计划列表"
        >
          <View style={styles.cardsContainer}>
            <ServicePlanCard 
              title="居家护理服务" 
              time="09:00-11:00" 
              insuredName="张奶奶" 
              address="朝阳区建国路88号" 
              status="待服务" 
              items={["生活护理", "健康检测", "康复训练"]} 
              onScan={to}
            />
            <ServicePlanCard 
              title="居家护理服务" 
              time="14:00-16:00" 
              insuredName="李爷爷" 
              address="海淀区中关村大街1号" 
              status="待服务" 
              items={["生活护理", "健康检测", "康复训练"]} 
            />
            <ServicePlanCard 
              title="居家护理服务" 
              time="14:00-16:00" 
              insuredName="李爷爷" 
              address="海淀区中关村大街1号" 
              status="待服务" 
              items={["生活护理", "健康检测", "康复训练"]} 
            />
            <ServicePlanCard 
              title="居家护理服务" 
              time="09:00-11:00" 
              insuredName="张奶奶" 
              address="朝阳区建国路88号" 
              status="待服务" 
              items={["生活护理", "健康检测", "康复训练"]} 
            />
            <ServicePlanCard 
              title="居家护理服务" 
              time="09:00-11:00" 
              insuredName="张奶奶" 
              address="朝阳区建国路88号" 
              status="待服务" 
              items={["生活护理", "健康检测", "康复训练"]} 
            />
            <ServicePlanCard 
              title="居家护理服务" 
              time="09:00-11:00" 
              insuredName="张奶奶" 
              address="朝阳区建国路88号" 
              status="待服务" 
              items={["生活护理", "健康检测", "康复训练"]} 
            />
            <ServicePlanCard 
              title="居家护理服务" 
              time="09:00-11:00" 
              insuredName="张奶奶" 
              address="朝阳区建国路88号" 
              status="待服务" 
              items={["生活护理", "健康检测", "康复训练"]} 
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterScrollContent: {
    paddingRight: 20,
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  cardsContainer: {
    gap: 16,
  },
});

export default Plan;
