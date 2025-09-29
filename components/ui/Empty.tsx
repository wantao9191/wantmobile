import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, createShadow, spacing } from '../../styles/commonStyles';

export type EmptyType = 'no-data' | 'no-network' | 'error' | 'search' | 'permission';

export interface EmptyProps {
  /** 空状态类型（预定义类型） */
  type?: EmptyType;
  /** 自定义图标名称 */
  icon?: keyof typeof Ionicons.glyphMap;
  /** 空状态标题 */
  title?: string;
  /** 空状态描述 */
  description?: string;
  /** 操作按钮文本 */
  actionText?: string;
  /** 操作按钮点击事件 */
  onAction?: () => void;
  /** 自定义图标颜色 */
  iconColor?: string;
  /** 自定义图标大小 */
  iconSize?: number;
  /** 是否显示操作按钮 */
  showAction?: boolean;
  /** 自定义样式 */
  style?: any;
  /** 自定义容器样式 */
  containerStyle?: any;
}

// 预定义的空状态配置
const emptyStateConfig = {
  'no-data': {
    icon: 'document-outline' as keyof typeof Ionicons.glyphMap,
    title: '暂无数据',
    description: '当前没有相关数据',
    actionText: '刷新',
  },
  'no-network': {
    icon: 'wifi-outline' as keyof typeof Ionicons.glyphMap,
    title: '网络连接异常',
    description: '请检查网络连接后重试',
    actionText: '重新加载',
  },
  'error': {
    icon: 'alert-circle-outline' as keyof typeof Ionicons.glyphMap,
    title: '加载失败',
    description: '数据加载出现问题，请重试',
    actionText: '重试',
  },
  'search': {
    icon: 'search-outline' as keyof typeof Ionicons.glyphMap,
    title: '未找到相关内容',
    description: '请尝试其他关键词或筛选条件',
    actionText: '清空筛选',
  },
  'permission': {
    icon: 'lock-closed-outline' as keyof typeof Ionicons.glyphMap,
    title: '权限不足',
    description: '您没有权限访问此内容',
    actionText: '联系管理员',
  },
};

const Empty: React.FC<EmptyProps> = ({
  type,
  icon,
  title,
  description,
  actionText,
  onAction,
  iconColor,
  iconSize = 64,
  showAction = true,
  style,
  containerStyle,
}) => {
  // 如果指定了type，使用预定义配置
  const config = type ? emptyStateConfig[type] : null;
  
  const finalIcon = icon || config?.icon || 'document-outline';
  const finalTitle = title || config?.title || '暂无数据';
  const finalDescription = description || config?.description || '当前没有相关数据';
  const finalActionText = actionText || config?.actionText || '刷新';
  const finalIconColor = iconColor || (type === 'error' ? colors.danger : colors.textLight);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.content, style]}>
        {/* 图标 */}
        <View style={[
          styles.iconContainer,
          type === 'error' && styles.errorIconContainer
        ]}>
          <Ionicons 
            name={finalIcon} 
            size={iconSize} 
            color={finalIconColor} 
          />
        </View>

        {/* 标题 */}
        <Text style={[
          styles.title,
          type === 'error' && styles.errorTitle
        ]}>
          {finalTitle}
        </Text>

        {/* 描述 */}
        <Text style={styles.description}>{finalDescription}</Text>

        {/* 操作按钮 */}
        {showAction && onAction && (
          <TouchableOpacity 
            style={[
              styles.actionButton,
              type === 'error' && styles.errorActionButton
            ]} 
            onPress={onAction}
          >
            <Text style={[
              styles.actionButtonText,
              type === 'error' && styles.errorActionButtonText
            ]}>
              {finalActionText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  content: {
    alignItems: 'center',
    maxWidth: 280,
  },
  iconContainer: {
    marginBottom: spacing.lg,
    opacity: 0.6,
  },
  errorIconContainer: {
    opacity: 0.8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  errorTitle: {
    color: colors.danger,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.xl,
  },
  actionButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 8,
    ...createShadow(colors.primary, 1, 0.2),
  },
  errorActionButton: {
    backgroundColor: colors.danger,
    ...createShadow(colors.danger, 1, 0.2),
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  errorActionButtonText: {
    color: colors.white,
  },
});

export default Empty;