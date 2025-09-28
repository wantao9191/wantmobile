import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ImageSourcePropType, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { combineStyles, commonStyles, iconVariants } from '../../styles/commonStyles';

interface PhotoCaptureProps {
  /** 是否已拍照 */
  hasPhoto: boolean;
  /** 拍照时的回调 */
  onTakePhoto: () => void;
  /** 重新拍照时的回调 */
  onRetakePhoto: () => void;
  /** 照片源，可选 */
  photoSource?: ImageSourcePropType;
  /** 卡片标题，默认为 '拍照记录' */
  title?: string;
  /** 卡片描述，默认为 '拍照记录相关信息' */
  description?: string;
  /** 拍照按钮文本，默认为 '拍照' */
  takePhotoText?: string;
  /** 重新拍照按钮文本，默认为 '重新拍照' */
  retakePhotoText?: string;
  /** 图标名称，默认为 'camera' */
  iconName?: keyof typeof Ionicons.glyphMap;
  /** 图标颜色，默认为 '#8B5CF6' */
  iconColor?: string;
  /** 图标容器背景色变体，默认为 'purple' */
  iconVariant?: keyof typeof iconVariants;
  /** 照片容器的自定义样式 */
  photoContainerStyle?: any;
  /** 照片的自定义样式 */
  photoStyle?: any;
  /** 是否禁用，默认为 false */
  disabled?: boolean;
}

export const PhotoCapture: React.FC<PhotoCaptureProps> = ({
  hasPhoto,
  onTakePhoto,
  onRetakePhoto,
  photoSource,
  title = '拍照记录',
  description = '拍照记录相关信息',
  takePhotoText = '拍照',
  retakePhotoText = '重新拍照',
  iconName = 'camera',
  iconColor = '#8B5CF6',
  iconVariant = 'purple',
  photoContainerStyle,
  photoStyle,
  disabled = false,
}) => {
  // 如果还没有拍照，显示拍照按钮
  if (!hasPhoto) {
    return (
      <View style={commonStyles.card}>
        <View style={commonStyles.cardHeader}>
          <View style={combineStyles(commonStyles.iconContainer, iconVariants[iconVariant])}>
            <Ionicons name={iconName} size={24} color={iconColor} />
          </View>
          <View style={commonStyles.cardTitleContainer}>
            <Text style={commonStyles.cardTitle}>{title}</Text>
            <Text style={commonStyles.cardDescription}>{description}</Text>
          </View>
        </View>
        <View style={[styles.photoContainer, photoContainerStyle]}>
          <TouchableOpacity 
            style={[styles.addPhotoButton, disabled && styles.disabledButton]} 
            onPress={onTakePhoto}
            disabled={disabled}
          >
            <Ionicons name="add" size={24} color={disabled ? '#9CA3AF' : iconColor} />
            <Text style={[styles.addPhotoText, { color: disabled ? '#9CA3AF' : iconColor }]}>
              {takePhotoText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // 如果已经拍照，显示照片和重新拍照按钮
  return (
    <View style={styles.photoWrapper}>
      <Image 
        source={photoSource || require('@/assets/images/android-icon-background.png')} 
        style={[styles.photo, photoStyle]} 
      />
      {!disabled && (
        <TouchableOpacity style={styles.retakeButton} onPress={onRetakePhoto}>
          <Ionicons name={iconName} size={16} color="white" />
          <Text style={styles.retakeButtonText}>{retakePhotoText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  photoWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  photo: {
    width: 140,
    height: 140,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignSelf: 'center',
    ...(Platform.OS === 'ios' ? {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    } : {
      elevation: 2,
    }),
  },
  retakeButton: {
    position: 'absolute',
    bottom: 8,
    right: '50%',
    marginRight: -40,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    gap: 4,
    ...(Platform.OS === 'ios' ? {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
    } : {
      elevation: 3,
    }),
  },
  retakeButtonText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '500',
  },
  photoContainer: {
    alignItems: 'center',
  },
  addPhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#8B5CF6',
    borderStyle: 'dashed',
    backgroundColor: '#F9FAFB',
    gap: 8,
  },
  addPhotoText: {
    fontSize: 16,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  disabledButton: {
    borderColor: '#D1D5DB',
    backgroundColor: '#F9FAFB',
    opacity: 0.6,
  },
});

export default PhotoCapture;
