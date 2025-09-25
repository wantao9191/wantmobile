import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  commonStyles,
  createShadow
} from '../styles/commonStyles';

export default function User() {
  return (
    <View className="flex-1" style={commonStyles.container}>
      <SafeAreaView
        className="flex-1"
        style={commonStyles.container}
        edges={['left', 'right']}
      >
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          style={commonStyles.container}
          bounces={true}
          alwaysBounceVertical={false}
          automaticallyAdjustContentInsets={false}
          contentInsetAdjustmentBehavior="never"
        >
          <View className="px-4 pt-2 pb-6">
            {/* 用户信息卡片 */}
            <LinearGradient
              colors={['#3B82F6', '#2563EB', '#1D4ED8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.userCard}
            >
              <View style={styles.userInfo}>
                <View style={styles.avatarContainer}>
                  <View style={styles.avatarInner}>
                    <Ionicons name="person" size={36} color="#FFFFFF" />
                  </View>
                  <View style={styles.statusIndicator} />
                </View>
                <View style={styles.userDetails}>
                  <View style={styles.userNameContainer}>
                    <Text style={styles.userName}>
                      李护理员
                    </Text>
                    <View style={styles.verifiedBadge}>
                      <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                    </View>
                  </View>
                  <View style={styles.userStationContainer}>
                    <Ionicons name="business" size={14} color="#DBEAFE" />
                    <Text style={styles.userStation}>
                      龙腾护理站
                    </Text>
                  </View>
                  <View style={styles.roleTag}>
                    <Ionicons name="star" size={14} color="#FCD34D" />
                    <Text style={styles.roleText}>
                      专业护理员
                    </Text>
                    <View style={styles.roleLevel}>
                      <Text style={styles.roleLevelText}>L5</Text>
                    </View>
                  </View>
                </View>
              </View>
            </LinearGradient>

            {/* 服务统计标题 */}
            <View style={styles.sectionTitle}>
              <Text style={styles.sectionTitleText}>服务统计</Text>
            </View>

            {/* 服务统计卡片 */}
            <View style={commonStyles.statsCard}>
              <View style={styles.timeFilterContainer}>
                <TouchableOpacity style={[styles.timeFilterButton, styles.timeFilterActive]}>
                  <Text style={[styles.timeFilterText, styles.timeFilterTextActive]}>总计</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.timeFilterButton}>
                  <Text style={styles.timeFilterText}>本月</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.timeFilterButton}>
                  <Text style={styles.timeFilterText}>本周</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <View style={styles.statIconContainer}>
                    <Ionicons name="medical" size={20} color="#3B82F6" />
                  </View>
                  <Text style={styles.statNumber}>
                    100
                  </Text>
                  <Text style={styles.statLabel}>
                    服务次数
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <View style={[styles.statIconContainer, styles.statIconGreen]}>
                    <Ionicons name="heart" size={20} color="#10B981" />
                  </View>
                  <Text style={[styles.statNumber, styles.statNumberGreen]}>
                    100%
                  </Text>
                  <Text style={styles.statLabel}>
                    好评率
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <View style={[styles.statIconContainer, styles.statIconOrange]}>
                    <Ionicons name="time" size={20} color="#F59E0B" />
                  </View>
                  <Text style={[styles.statNumber, styles.statNumberOrange]}>
                    100h
                  </Text>
                  <Text style={styles.statLabel}>
                    服务时长
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <View style={[styles.statIconContainer, styles.statIconRed]}>
                    <Ionicons name="calendar-clear" size={20} color="#EF4444" />
                  </View>
                  <Text style={[styles.statNumber, styles.statNumberRed]}>
                    0次
                  </Text>
                  <Text style={styles.statLabel}>
                    请假次数
                  </Text>
                </View>
              </View>
            </View>

            {/* 评分统计标题 */}
            <View style={styles.sectionTitle}>
              <Text style={styles.sectionTitleText}>评分统计</Text>
            </View>

            {/* 评分统计卡片 */}
            <View style={commonStyles.statsCard}>
              <View style={styles.ratingHeader}>
                <View style={styles.overallRating}>
                  <Text style={styles.overallRatingNumber}>4.8</Text>
                  <View style={styles.overallStarsContainer}>
                    <Ionicons name="star" size={16} color="#F59E0B" />
                    <Ionicons name="star" size={16} color="#F59E0B" />
                    <Ionicons name="star" size={16} color="#F59E0B" />
                    <Ionicons name="star" size={16} color="#F59E0B" />
                    <Ionicons name="star" size={16} color="#F59E0B" />
                  </View>
                  <Text style={styles.overallRatingText}>综合评分</Text>
                </View>
                <View style={styles.ratingStats}>
                  <Text style={styles.ratingStatsText}>基于 100 条评价</Text>
                </View>
              </View>
              <View style={styles.ratingRow}>
                <View style={styles.ratingItem}>
                  <View style={styles.starsContainer}>
                    <Ionicons name="star" size={18} color="#F59E0B" />
                    <Ionicons name="star" size={18} color="#F59E0B" />
                    <Ionicons name="star" size={18} color="#F59E0B" />
                    <Ionicons name="star" size={18} color="#F59E0B" />
                    <Ionicons name="star" size={18} color="#E5E7EB" />
                  </View>
                  <Text style={[styles.ratingNumber, styles.ratingNumberGreen]}>
                    100条
                  </Text>
                  <Text style={styles.ratingLabel}>
                    4星以上
                  </Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.ratingItem}>
                  <View style={styles.starsContainer}>
                    <Ionicons name="star" size={18} color="#F59E0B" />
                    <Ionicons name="star" size={18} color="#F59E0B" />
                    <Ionicons name="star" size={18} color="#F59E0B" />
                    <Ionicons name="star" size={18} color="#E5E7EB" />
                    <Ionicons name="star" size={18} color="#E5E7EB" />
                  </View>
                  <Text style={[styles.ratingNumber, styles.ratingNumberRed]}>
                    0条
                  </Text>
                  <Text style={styles.ratingLabel}>
                    3星及以下
                  </Text>
                </View>
              </View>
            </View>

            {/* 功能操作标题 */}
            <View style={styles.sectionTitle}>
              <Text style={styles.sectionTitleText}>功能操作</Text>
            </View>

            {/* 功能操作按钮组 */}
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity style={commonStyles.actionButton}>
                <View style={styles.actionButtonContent}>
                  <View style={styles.actionIconContainer}>
                    <Ionicons name="create" size={24} color="#3B82F6" />
                  </View>
                  <View>
                    <Text style={styles.actionTitle}>
                      编辑个人信息
                    </Text>
                    <Text style={styles.actionDescription}>
                      修改个人资料和联系方式
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
              
              <TouchableOpacity style={commonStyles.actionButton}>
                <View style={styles.actionButtonContent}>
                  <View style={[styles.actionIconContainer, styles.actionIconGreen]}>
                    <Ionicons name="settings" size={24} color="#10B981" />
                  </View>
                  <View>
                    <Text style={styles.actionTitle}>
                      账户设置
                    </Text>
                    <Text style={styles.actionDescription}>
                      密码、通知等设置
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
              
              <TouchableOpacity style={commonStyles.actionButton}>
                <View style={styles.actionButtonContent}>
                  <View style={[styles.actionIconContainer, styles.actionIconOrange]}>
                    <Ionicons name="help-circle" size={24} color="#F59E0B" />
                  </View>
                  <View>
                    <Text style={styles.actionTitle}>
                      帮助与反馈
                    </Text>
                    <Text style={styles.actionDescription}>
                      使用帮助和问题反馈
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    paddingTop: 0,
    flexGrow: 1,
  },
  userCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    ...createShadow('#000', 2, 0.08),
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatarInner: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#10B981',
    borderWidth: 3,
    borderColor: 'white',
  },
  userDetails: {
    flex: 1,
  },
  userNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 8,
  },
  verifiedBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderRadius: 12,
    padding: 2,
  },
  userStationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userStation: {
    fontSize: 16,
    color: '#DBEAFE',
    marginLeft: 6,
  },
  roleTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    alignSelf: 'flex-start',
  },
  roleText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 4,
    marginRight: 8,
  },
  roleLevel: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  roleLevelText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  sectionTitle: {
    marginBottom: 16,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
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
  },
  timeFilterContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  timeFilterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  timeFilterActive: {
    backgroundColor: 'white',
    ...(Platform.OS === 'ios' ? {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    } : {
      elevation: 2,
    }),
  },
  timeFilterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  timeFilterTextActive: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  statIconContainer: {
    backgroundColor: '#DBEAFE',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statIconGreen: {
    backgroundColor: '#D1FAE5',
  },
  statIconOrange: {
    backgroundColor: '#FED7AA',
  },
  statIconRed: {
    backgroundColor: '#FEE2E2',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 4,
  },
  statNumberGreen: {
    color: '#10B981',
  },
  statNumberOrange: {
    color: '#F59E0B',
  },
  statNumberRed: {
    color: '#EF4444',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 20,
  },
  ratingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  overallRating: {
    alignItems: 'center',
  },
  overallRatingNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  overallStarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  overallRatingText: {
    fontSize: 14,
    color: '#6B7280',
  },
  ratingStats: {
    alignItems: 'flex-end',
  },
  ratingStatsText: {
    fontSize: 14,
    color: '#6B7280',
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingItem: {
    flex: 1,
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingNumberGreen: {
    color: '#10B981',
  },
  ratingNumberRed: {
    color: '#EF4444',
  },
  ratingLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  actionButtonsContainer: {
    gap: 12,
  },
  actionButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...(Platform.OS === 'ios' ? {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    } : {
      elevation: 4,
    }),
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIconContainer: {
    backgroundColor: '#DBEAFE',
    padding: 12,
    borderRadius: 20,
    marginRight: 16,
  },
  actionIconGreen: {
    backgroundColor: '#D1FAE5',
  },
  actionIconOrange: {
    backgroundColor: '#FED7AA',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  actionDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
});