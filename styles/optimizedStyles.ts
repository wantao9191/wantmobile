import { StyleSheet } from 'react-native';

// 预计算和缓存常用样式，避免运行时重复计算
export const optimizedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  padding16: {
    padding: 16,
  },
  marginBottom16: {
    marginBottom: 16,
  },
  marginBottom32: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  flexGap16: {
    gap: 16,
  },
  scrollContent: {
    paddingBottom: 30,
    paddingTop: 0,
    flexGrow: 1,
  },
  // 常用的卡片样式
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  // 常用的文本样式
  primaryText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryText: {
    color: '#6B7280',
    fontSize: 14,
  },
});

// 性能友好的内联样式常量
export const COLORS = {
  primary: '#3B82F6',
  secondary: '#6B7280',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  background: '#F8FAFC',
  white: '#FFFFFF',
  text: '#111827',
  textSecondary: '#6B7280',
} as const;

// 预定义的间距值
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;
