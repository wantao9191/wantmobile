import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type InsuredGreetingCardProps = {
  userName: string;
  totalServices: number;
  completedServices: number;
  packageInfo: {
    name: string;
    usedHours: number;
    totalHours: number;
    remainingHours: number;
    expiryDate: string;
    status: string;
  };
  onViewPackageDetails?: () => void;
  onRenewPackage?: () => void;
};

export default function InsuredGreetingCard({
  userName,
  totalServices,
  completedServices,
  packageInfo,
  onViewPackageDetails,
  onRenewPackage,
}: InsuredGreetingCardProps) {
  const progressPercentage = (packageInfo.usedHours / packageInfo.totalHours) * 100;

  return (
    <LinearGradient
      colors={['#3B82F6', '#2563EB']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      {/* 头部问候信息 */}
      <View style={styles.headerContainer}>
        <View style={styles.headerRow}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.greetingText}>
              {`早上好，${userName}`}
            </Text>
            <Text style={styles.serviceText}>
              {`今日有${totalServices - completedServices}个服务安排`}
            </Text>
          </View>
          <View style={styles.roleTag}>
            <Ionicons name="person-circle" size={18} color="#FFFFFF" />
            <Text style={styles.roleText}>参保人</Text>
          </View>
        </View>

        {/* 套餐信息 - 整合所有信息 */}
        <View style={styles.packageContainer}>
          {/* 套餐头部 */}
          <View style={styles.packageHeader}>
            <View style={styles.packageInfo}>
              <View style={styles.packageIcon}>
                <Ionicons name="medical" size={22} color="#FFFFFF" />
              </View>
              <View style={styles.packageTextContainer}>
                <Text style={styles.packageName}>
                  {packageInfo.name}
                </Text>
                <Text style={styles.packageExpiry}>
                  有效期至 {packageInfo.expiryDate}
                </Text>
              </View>
            </View>
            
            <View style={[
              styles.statusTag,
              {
                backgroundColor: packageInfo.status === '进行中' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)',
                borderColor: packageInfo.status === '进行中' ? 'rgba(16, 185, 129, 0.5)' : 'rgba(245, 158, 11, 0.5)'
              }
            ]}>
              <Text style={styles.statusText}>
                {packageInfo.status}
              </Text>
            </View>
          </View>

          {/* 使用进度 */}
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>使用进度</Text>
              <Text style={styles.progressPercentage}>
                {Math.round(progressPercentage)}%
              </Text>
            </View>

            {/* 进度条 */}
            <View style={styles.progressBar}>
              <View style={[
                styles.progressFill,
                { width: `${progressPercentage}%` }
              ]} />
            </View>

            {/* 使用统计 */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                <Text style={styles.statText}>
                  已使用 {packageInfo.usedHours} 小时
                </Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="time" size={16} color="#F59E0B" />
                <Text style={styles.statText}>
                  剩余 {packageInfo.remainingHours} 小时
                </Text>
              </View>
            </View>
          </View>

          {/* 操作按钮 */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={onViewPackageDetails}
              style={styles.button}
            >
              <Ionicons name="eye" size={16} color="#FFFFFF" />
              <Text style={styles.buttonText}>
                查看详情
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 24,
    ...(Platform.OS === 'ios' ? {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
    } : {
      elevation: 10,
    }),
  },
  headerContainer: {
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  greetingText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 16,
    color: '#DBEAFE',
  },
  roleTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    gap: 8,
  },
  roleText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  packageContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  packageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  packageIcon: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 10,
    borderRadius: 14,
    marginRight: 12,
  },
  packageTextContainer: {
    flex: 1,
  },
  packageName: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginBottom: 2,
  },
  packageExpiry: {
    fontSize: 14,
    color: '#E0F2FE',
  },
  statusTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E0F2FE',
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  progressBar: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    backgroundColor: '#10B981',
    height: '100%',
    borderRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: '#E0F2FE',
    marginLeft: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    marginLeft: 6,
  },
});
