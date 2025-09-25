import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modal } from '../components/ui/Modal';
import {
  colors,
  combineStyles,
  commonStyles,
  createShadow,
  iconVariants,
  textVariants
} from '../styles/commonStyles';
import { navigationEvents } from './_layout';
const Service = () => {
  const [items, setItems] = useState<any[]>([
    {
      id: 1,
      name: '生活护理',
      status: 0,
      min: 10,
      max: 30,
      duration: 20
    },
    {
      id: 2,
      name: '健康检测',
      status: 0,
      min: 10,
      max: 30,
      duration: 20
    },
    {
      id: 3,
      name: '康复训练',
      status: 0,
      min: 10,
      max: 30,
      duration: 20
    },
  ]);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSpecialModalVisible, setIsSpecialModalVisible] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const beforeRemove = () => {
    setShowExitConfirm(true);
  };
  const onStart = (item: any) => {
    setItems(items.map(i => {
      if (i.id === item.id) {
        return { ...i, status: i.status === 0 ? 1 : 0 }
      }
      return i;
    }));
    setCurrentItem(item);
  }
  const onEnd = (item: any) => {
    setItems(items.map(i => {
      if (i.id === item.id) {
        return { ...i, status: i.status === 1 ? 2 : 0 }
      }
      return i;
    }));
    setCurrentItem(null);
  }
  const onFinish = () => {
    setIsModalVisible(true);
  }
  // 监听来自布局的事件
  useEffect(() => {
    const handleBackPress = () => {
      // 这里调用之前定义的 beforeRemove 方法
      beforeRemove();
    };

    navigationEvents.on('serviceBackPress', handleBackPress);

    return () => {
      navigationEvents.off('serviceBackPress', handleBackPress);
    };
  }, []);
  console.log(router)
  return (
    <View style={commonStyles.container}>
      <SafeAreaView style={commonStyles.safeArea} edges={['left', 'right']}>
        {/* 内容区域 */}
        <ScrollView
          style={commonStyles.scrollView}
          contentContainerStyle={commonStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 服务状态卡片 */}
          <View style={commonStyles.card}>
            <View style={commonStyles.cardHeader}>
              <View style={combineStyles(commonStyles.iconContainer, iconVariants.primary)}>
                <Ionicons name="time" size={24} color={colors.primary} />
              </View>
              <View style={commonStyles.cardTitleContainer}>
                <Text style={commonStyles.cardTitle}>服务进行中</Text>
                <Text style={commonStyles.cardDescription}>当前服务状态</Text>
              </View>
            </View>
            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>00:00:00</Text>
              <Text style={styles.timerLabel}>服务时长</Text>
            </View>
          </View>

          {/* 护理项目卡片 */}
          <View style={commonStyles.card}>
            <View style={commonStyles.cardHeader}>
              <View style={combineStyles(commonStyles.iconContainer, iconVariants.success)}>
                <Ionicons name="medical" size={24} color={colors.success} />
              </View>
              <View style={commonStyles.cardTitleContainer}>
                <Text style={commonStyles.cardTitle}>护理项目</Text>
                <Text style={commonStyles.cardDescription}>本次服务的护理内容</Text>
              </View>
            </View>
            {!currentItem ? (
              <View style={styles.serviceItemsContainer}>
                {items.map((item) => (
                  <View key={item.id} style={styles.serviceItem}>
                    <View style={styles.serviceItemContent}>
                      <Text style={styles.serviceItemText}>{item.name} {item.status}</Text>
                      {item.status === 0 ?
                        (<Text style={styles.serviceItemDuration}>预计 {item.min} - {item.max} 分钟</Text>)
                        : (<Text style={styles.serviceItemDuration}>时长： {item.duration} 分钟</Text>)
                      }
                    </View>
                    {item.status === 0 ? (
                      <TouchableOpacity
                        style={combineStyles(commonStyles.successButton, { paddingHorizontal: 16, paddingVertical: 8 })}
                        onPress={() => { onStart(item) }}
                      >
                        <Ionicons name="play" size={16} color="white" />
                        <Text style={combineStyles(textVariants.buttonPrimary, { fontSize: 14 })}>开始</Text>
                      </TouchableOpacity>
                    ) : (
                      <View style={commonStyles.completedBadge}>
                        <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                        <Text style={commonStyles.completedText}>已完成</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.currentServiceContainer}>
                <View style={styles.currentServiceHeader}>
                  <View style={styles.currentServiceInfo}>
                    <Text style={styles.currentServiceTitle}>{currentItem.name}</Text>
                    <View style={styles.statusContainer}>
                      <View style={styles.statusIndicator} />
                      <Text style={styles.currentServiceSubtitle}>进行中</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.currentServiceTimer}>
                  <Text style={styles.currentServiceTimerText}>00:00:00</Text>
                  <Text style={styles.currentServiceTimerLabel}>服务时长</Text>
                </View>

                <TouchableOpacity
                  style={combineStyles(commonStyles.dangerButton, { paddingVertical: 12, gap: 6 })}
                  onPress={() => { onEnd(currentItem) }}
                >
                  <Ionicons name="stop" size={16} color="white" />
                  <Text style={commonStyles.primaryButtonText}>结束</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>

        {/* 底部按钮区域 */}
        <View style={commonStyles.bottomButtonContainer}>
          <TouchableOpacity style={combineStyles(commonStyles.successButton, { paddingVertical: 16, borderRadius: 12, gap: 8 })} onPress={() => { onFinish() }}>
            <Ionicons name="checkmark-circle" size={20} color="white" />
            <Text style={combineStyles(commonStyles.primaryButtonText, { fontSize: 18 })}>完成本次服务</Text>
          </TouchableOpacity>
        </View>
        <Modal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          title="服务结束"
          content="确认完成本次护理服务吗？"
          buttons={[
            {
              text: '继续服务',
              onPress: () => setIsModalVisible(false),
              style: 'secondary',
            },
            {
              text: '前往签退',
              onPress: () => {
                console.log('前往签退')
                setIsModalVisible(false);
                router.replace('/care/signout');
              },
              style: 'primary',
            },
          ]}
        />
        <Modal
          visible={isSpecialModalVisible}
          onClose={() => setIsSpecialModalVisible(false)}
          title="特情上报"
          content="本次服务中有特殊情况吗，是否需要上报？"
          buttons={[
            {
              text: '结束服务',
              onPress: () => {
                setIsSpecialModalVisible(false);
                router.back();
              },
              style: 'secondary',
            },
            {
              text: '上报',
              onPress: () => {
                setIsSpecialModalVisible(false);
                // router.push('/care/service');
              },
              style: 'primary',
            },
          ]}
        />
        <Modal
          visible={showExitConfirm}
          onClose={() => setShowExitConfirm(false)}
          title="确认退出"
          content="服务正在进行中，确定要退出吗？"
          buttons={[
            {
              text: '取消',
              onPress: () => setShowExitConfirm(false),
              style: 'secondary',
            },
            {
              text: '确定',
              onPress: () => {
                setShowExitConfirm(false);
                router.back();
              },
              style: 'primary',
            },
          ]}
        />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  // 定时器样式
  timerContainer: {
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    padding: 24,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.primary,
    ...createShadow(colors.primary, 2, 0.15),
  },
  timerText: {
    fontSize: 42,
    fontWeight: '800',
    color: '#1D4ED8',
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    textShadowColor: 'rgba(59, 130, 246, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  timerLabel: {
    fontSize: 16,
    color: '#1E40AF',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // 服务项目列表
  serviceItemsContainer: {
    gap: 12,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  serviceItemContent: {
    flex: 1,
  },
  serviceItemText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
    marginBottom: 4,
  },
  serviceItemDuration: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '400',
  },

  // 当前服务容器
  currentServiceContainer: {
    backgroundColor: '#F0F9FF',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  currentServiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  currentServiceInfo: {
    flex: 1,
  },
  currentServiceTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E40AF',
    marginBottom: 8,
  },

  // 状态指示器
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
    ...createShadow(colors.success, 0, 0.8),
  },
  currentServiceSubtitle: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },

  // 当前服务定时器
  currentServiceTimer: {
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.warning,
    borderStyle: 'dashed',
  },
  currentServiceTimerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#D97706',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  currentServiceTimerLabel: {
    fontSize: 12,
    color: '#92400E',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default Service;