import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Modal, PhotoCapture } from '../components/ui';
import {
  colors,
  combineStyles,
  commonStyles,
  iconVariants
} from '../styles/commonStyles';

const Sign = () => {
  const [isScan, setIsScan] = useState(false);
  const [isPhoto, setIsPhoto] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <View style={commonStyles.container}>
      <SafeAreaView style={commonStyles.safeArea} edges={['left', 'right']}>
        {/* 内容区域 */}
        <View style={styles.content}>
          {/* 扫码签到,拍照打卡卡片 */}
          {!isScan ? (<View style={commonStyles.card}>
            <View style={commonStyles.cardHeader}>
              <View style={combineStyles(commonStyles.iconContainer, iconVariants.primary)}>
                <Ionicons name="qr-code" size={24} color={colors.primary} />
              </View>
              <View style={commonStyles.cardTitleContainer}>
                <Text style={commonStyles.cardTitle}>扫码签到</Text>
                <Text style={commonStyles.cardDescription}>扫描二维码确认到达服务地点</Text>
              </View>
            </View>
            <TouchableOpacity style={commonStyles.primaryButton} onPress={() => { setIsScan(true) }}>
              <Ionicons name="camera" size={20} color="white" />
              <Text style={commonStyles.primaryButtonText}>扫码签到</Text>
            </TouchableOpacity>
          </View>) : (
          <PhotoCapture
            hasPhoto={isPhoto}
            onTakePhoto={() => setIsPhoto(true)}
            onRetakePhoto={() => setIsPhoto(false)}
            title="拍照打卡"
            description="拍照记录服务过程"
            takePhotoText="拍照打卡"
            retakePhotoText="重新拍照"
          />
          )}
          {/* 位置信息卡片 */}
          <View style={commonStyles.card}>
            <View style={commonStyles.cardHeader}>
              <View style={combineStyles(commonStyles.iconContainer, iconVariants.success)}>
                <Ionicons name="location" size={24} color={colors.success} />
              </View>
              <View style={commonStyles.cardTitleContainer}>
                <Text style={commonStyles.cardTitle}>当前位置</Text>
                <Text style={commonStyles.cardDescription}>系统自动获取的位置信息</Text>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                南京市玄武区玄武湖街道10号院10号楼10号单元10号室
              </Text>
            </View>
          </View>

          {/* 服务信息卡片 */}
          <View style={commonStyles.card}>
            <View style={commonStyles.cardHeader}>
              <View style={combineStyles(commonStyles.iconContainer, iconVariants.warning)}>
                <Ionicons name="time" size={24} color={colors.warning} />
              </View>
              <View style={commonStyles.cardTitleContainer}>
                <Text style={commonStyles.cardTitle}>服务信息</Text>
                <Text style={commonStyles.cardDescription}>本次服务的详细信息</Text>
              </View>
            </View>

            <View style={styles.serviceInfoContainer}>
              <View style={styles.serviceInfoRow}>
                <Text style={styles.serviceInfoLabel}>服务时间</Text>
                <Text style={styles.serviceInfoValue}>2025-09-24 10:00:00</Text>
              </View>

              <View style={styles.serviceInfoRow}>
                <Text style={styles.serviceInfoLabel}>服务时长</Text>
                <Text style={styles.serviceInfoValue}>1小时</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 底部开始服务按钮 */}
        <View style={commonStyles.bottomButtonContainer}>
          <TouchableOpacity style={combineStyles(commonStyles.successButton, { paddingVertical: 16, borderRadius: 12, gap: 8 })} onPress={() => { setIsModalVisible(true) }}>
            <Ionicons name="play" size={20} color="white" />
            <Text style={combineStyles(commonStyles.primaryButtonText, { fontSize: 18 })}>开始服务</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Modal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="开始服务"
        content="拍照打卡成功！确认开始本次护理服务吗？"
        buttons={[
          {
            text: '稍后再说',
            onPress: () => setIsModalVisible(false),
            style: 'secondary',
          },
          {
            text: '立即开始',
            onPress: () => {
              setIsModalVisible(false);
              router.replace('/care/service');
            },
            style: 'primary',
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...(Platform.OS === 'ios' ? {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
    } : {
      elevation: 4,
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    backgroundColor: '#DBEAFE',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  locationIcon: {
    backgroundColor: '#D1FAE5',
  },
  serviceIcon: {
    backgroundColor: '#FED7AA',
  },
  cameraIcon: {
    backgroundColor: '#EDE9FE',
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    ...(Platform.OS === 'ios' ? {
      shadowColor: '#3B82F6',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    } : {
      elevation: 3,
    }),
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  infoText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  serviceInfoContainer: {
    gap: 12,
  },
  serviceInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  serviceInfoLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  serviceInfoValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  bottomButtonContainer: {
    padding: 20,
    paddingTop: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    ...(Platform.OS === 'ios' ? {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    } : {
      elevation: 8,
    }),
  },
  startServiceButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    ...(Platform.OS === 'ios' ? {
      shadowColor: '#10B981',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    } : {
      elevation: 3,
    }),
  },
  startServiceButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Sign;
