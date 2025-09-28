import { Platform, StyleSheet } from 'react-native';

// 通用函数：生成平台特定的阴影样式
export const createShadow = (
  color: string = '#000',
  elevation: number = 2,
  opacity: number = 0.1
) => ({
  ...(Platform.OS === 'ios' ? {
    shadowColor: color,
    shadowOffset: { width: 0, height: elevation },
    shadowOpacity: opacity,
    shadowRadius: elevation * 2,
  } : {
    elevation: elevation * 2,
  }),
});

// 颜色主题
export const colors = {
  // 主要颜色
  primary: '#3B82F6',
  primaryDark: '#2563EB',
  primaryLight: '#DBEAFE',
  
  // 功能颜色
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  warningLight: '#FED7AA',
  danger: '#EF4444',
  dangerLight: '#FEE2E2',
  
  // 中性颜色
  white: '#FFFFFF',
  background: '#F8FAFC',
  cardBackground: '#FFFFFF',
  border: '#E5E7EB',
  text: '#111827',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  
  // 渐变颜色
  gradient: {
    blue: ['#3B82F6', '#2563EB'],
    blueExtended: ['#3B82F6', '#2563EB', '#1D4ED8'],
  }
};

// 基础样式定义
export const baseStyles = {
  // 通用容器样式
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  
  // 卡片样式
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  
  // 通用按钮样式
  button: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 6,
  },
  
  // 图标容器样式
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginRight: 16,
  },
  
  // 通用文本样式
  title: {
    fontWeight: '600' as const,
    color: colors.text,
  },
  
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  
  buttonText: {
    fontWeight: '600' as const,
  },
  
  // 通用定时器文本样式
  timerText: {
    fontWeight: '700' as const,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    marginBottom: 4,
  },
  
  // 卡片头部样式
  cardHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  
  cardTitleContainer: {
    flex: 1,
  },
  
  // 底部按钮容器
  bottomButtonContainer: {
    padding: 20,
    paddingTop: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  
  // 统计项目容器
  statItem: {
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  
  // 过滤按钮基础样式
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: colors.border,
  },
  
  // 操作按钮样式
  actionButton: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
};

// 按钮变体样式
export const buttonVariants = {
  primary: {
    backgroundColor: colors.primary,
    ...createShadow(colors.primary, 1, 0.2),
  },
  
  success: {
    backgroundColor: colors.success,
    ...createShadow(colors.success, 1, 0.2),
  },
  
  warning: {
    backgroundColor: colors.warning,
    ...createShadow(colors.warning, 1, 0.2),
  },
  
  danger: {
    backgroundColor: colors.danger,
    ...createShadow(colors.danger, 1, 0.2),
  },
  
  secondary: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderStyle: 'dashed' as const,
  },
};

// 文本变体样式
export const textVariants = {
  // 按钮文本
  buttonPrimary: {
    color: colors.white,
  },
  
  buttonSecondary: {
    color: '#374151',
  },
  
  buttonDanger: {
    color: colors.white,
  },
  
  // 标题文本
  title18: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: colors.text,
    marginBottom: 4,
  },
  
  title20: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: colors.text,
  },
  
  title24: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: colors.text,
  },
  
  // 描述文本
  description: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  
  // 状态文本
  statusSuccess: {
    fontSize: 14,
    color: colors.success,
    fontWeight: '600' as const,
  },
  
  statusWarning: {
    fontSize: 14,
    color: colors.warning,
    fontWeight: '600' as const,
  },
  
  statusDanger: {
    fontSize: 14,
    color: colors.danger,
    fontWeight: '600' as const,
  },
};

// 图标容器变体
export const iconVariants = {
  primary: {
    backgroundColor: colors.primaryLight,
  },
  
  success: {
    backgroundColor: colors.successLight,
  },
  
  warning: {
    backgroundColor: colors.warningLight,
  },
  
  danger: {
    backgroundColor: colors.dangerLight,
  },
  
  purple: {
    backgroundColor: '#EDE9FE',
  },
};

// 通用样式表
export const commonStyles = StyleSheet.create({
  // 基础布局
  flex1: {
    flex: 1,
  },
  
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  safeArea: {
    flex: 1,
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    padding: 20,
    paddingBottom: 20,
  },
  
  // 基础卡片样式
  card: {
    ...baseStyles.card,
    ...createShadow('#000', 2, 0.08),
  },
  
  cardWithShadow: {
    ...baseStyles.card,
    ...createShadow('#000', 2, 0.08),
  },
  
  // 卡片头部
  cardHeader: baseStyles.cardHeader,
  
  cardTitleContainer: baseStyles.cardTitleContainer,
  
  cardTitle: {
    ...baseStyles.title,
    ...textVariants.title18,
  },
  
  cardDescription: {
    ...baseStyles.subtitle,
    ...textVariants.description,
  },
  
  // 图标容器
  iconContainer: {
    ...baseStyles.iconContainer,
    ...iconVariants.primary,
  },
  
  // 按钮样式
  primaryButton: {
    ...baseStyles.button,
    ...buttonVariants.primary,
  },
  
  secondaryButton: {
    ...baseStyles.button,
    ...buttonVariants.secondary,
  },
  
  successButton: {
    ...baseStyles.button,
    ...buttonVariants.success,
  },
  
  dangerButton: {
    ...baseStyles.button,
    ...buttonVariants.danger,
  },
  
  // 按钮文本
  primaryButtonText: {
    ...baseStyles.buttonText,
    ...textVariants.buttonPrimary,
    fontSize: 16,
  },
  
  secondaryButtonText: {
    ...baseStyles.buttonText,
    ...textVariants.buttonSecondary,
    fontSize: 16,
  },
  
  // 底部容器
  bottomButtonContainer: {
    ...baseStyles.bottomButtonContainer,
    ...createShadow('#000', 4, 0.1),
  },
  
  // 状态样式
  completedBadge: {
    ...baseStyles.button,
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  
  completedText: textVariants.statusSuccess,
  
  // 统计卡片
  statsCard: {
    ...baseStyles.card,
    ...createShadow('#000', 1, 0.08),
  },
  
  // 操作按钮
  actionButton: {
    ...baseStyles.actionButton,
    ...createShadow('#000', 1, 0.08),
  },
  
  // 筛选按钮
  filterButton: baseStyles.filterButton,
  
  filterButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    ...createShadow(colors.primary, 1, 0.2),
  },
  
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  
  filterButtonTextSelected: {
    color: colors.white,
  },
});

// 工具函数
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
};

// 响应式工具
export const getResponsivePadding = () => ({
  paddingHorizontal: Platform.OS === 'ios' ? spacing.xl : spacing.lg,
});

// 组合样式工具函数
export const combineStyles = (...styles: any[]) => {
  return StyleSheet.flatten(styles);
};
