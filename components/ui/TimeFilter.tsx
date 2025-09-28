import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import { colors, createShadow } from '../../styles/commonStyles';

export interface TimeFilterOption {
  label: string;
  value: string | number;
}

interface TimeFilterProps {
  options: TimeFilterOption[];
  selectedValue: string | number;
  onSelect: (value: string | number) => void;
  containerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  activeButtonStyle?: ViewStyle;
  textStyle?: TextStyle;
  activeTextStyle?: TextStyle;
}

/**
 * 通用时间筛选组件
 * @param options 筛选选项数组
 * @param selectedValue 当前选中的值
 * @param onSelect 选择回调函数
 * @param containerStyle 容器自定义样式
 * @param buttonStyle 按钮自定义样式
 * @param activeButtonStyle 激活按钮自定义样式
 * @param textStyle 文本自定义样式
 * @param activeTextStyle 激活文本自定义样式
 */
export const TimeFilter: React.FC<TimeFilterProps> = ({
  options,
  selectedValue,
  onSelect,
  containerStyle,
  buttonStyle,
  activeButtonStyle,
  textStyle,
  activeTextStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {options.map((option, index) => {
        const isActive = selectedValue === option.value as string | number;
        
        return (
          <TouchableOpacity
            key={option.value as string | number}
            style={[
              styles.button,
              buttonStyle,
              isActive && [styles.activeButton, activeButtonStyle]
            ]}
            onPress={() => onSelect(option.value as string | number)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.buttonText,
                textStyle,
                isActive && [styles.activeButtonText, activeTextStyle]
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
    width: '100%',
    alignSelf: 'stretch',
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: colors.white,
    ...createShadow('#000', 1, 0.1),
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  activeButtonText: {
    color: colors.primary,
    fontWeight: '600',
  },
});

// 预定义的常用筛选选项
export const commonTimeFilters = {
  // 总计、本月、本周
  basic: [
    { label: '总计', value: 'total' },
    { label: '本月', value: 'month' },
    { label: '本周', value: 'week' },
  ],
  
  // 今日、本周、本月、全部
  extended: [
    { label: '今日', value: 'today' },
    { label: '本周', value: 'week' },
    { label: '本月', value: 'month' },
    { label: '全部', value: 'all' },
  ],
  
  // 最近7天、最近30天、全部
  period: [
    { label: '7天', value: '7days' },
    { label: '30天', value: '30days' },
    { label: '全部', value: 'all' },
  ],

  // 年、月、周
  hierarchy: [
    { label: '年', value: 'year' },
    { label: '月', value: 'month' },
    { label: '周', value: 'week' },
  ],
};

export default TimeFilter;
