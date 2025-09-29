import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type GreetingCardProps = {
  userName: string;
  to: () => void;
  userPlan: any;
};

export default function GreetingCard({ userName, to, userPlan }: GreetingCardProps) {
  const totalTasks = useMemo(() => userPlan?.length, [userPlan]);
  const completedTasks = useMemo(() => userPlan?.filter((plan: any) => plan.status === '已开始').length, [userPlan]);
  return (
    <LinearGradient
      colors={['#3B82F6', '#2563EB']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>{`您好，${userName}`}</Text>
          <Text style={styles.subtitle}>
            今日有{totalTasks - completedTasks}个服务计划待完成
          </Text>
        </View>
        <View style={styles.roleBadge}>
          <Ionicons name="person-circle" size={16} color="#FFFFFF" />
          <Text style={styles.roleText}>护理员</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <TouchableOpacity style={styles.statCard} onPress={to}>
          <Text style={styles.statNumber}>{totalTasks}</Text>
          <Text style={styles.statLabel}>
            总任务
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statCard} onPress={to}>
          <Text style={[styles.statNumber, styles.completedNumber]}>{completedTasks}</Text>
          <Text style={styles.statLabel}>
            已完成
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    ...(Platform.OS === 'ios' ? {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
    } : {
      elevation: 8,
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  headerContent: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#DBEAFE',
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    gap: 6,
  },
  roleText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    ...(Platform.OS === 'ios' ? {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    } : {
      elevation: 2,
    }),
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 6,
  },
  completedNumber: {
    color: '#10B981',
  },
  statLabel: {
    fontSize: 13,
    color: '#E0F2FE',
    textAlign: 'center',
    fontWeight: '500',
  },
});
