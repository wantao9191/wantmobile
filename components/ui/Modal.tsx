import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Platform,
  Modal as RNModal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export interface ModalButton {
  text: string;
  onPress: () => void;
  style?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  content?: string;
  children?: React.ReactNode;
  buttons?: ModalButton[];
  showCloseButton?: boolean;
  animationType?: 'slide' | 'fade' | 'none';
  transparent?: boolean;
  onBackdropPress?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  content,
  children,
  buttons = [],
  showCloseButton = true,
  animationType = 'fade',
  transparent = true,
  onBackdropPress,
}) => {
  const handleBackdropPress = () => {
    if (onBackdropPress) {
      onBackdropPress();
    } else {
      onClose();
    }
  };

  const getButtonStyle = (style: ModalButton['style'] = 'primary') => {
    switch (style) {
      case 'primary':
        return styles.primaryButton;
      case 'secondary':
        return styles.secondaryButton;
      case 'danger':
        return styles.dangerButton;
      default:
        return styles.primaryButton;
    }
  };

  const getButtonTextStyle = (style: ModalButton['style'] = 'primary') => {
    switch (style) {
      case 'primary':
        return styles.primaryButtonText;
      case 'secondary':
        return styles.secondaryButtonText;
      case 'danger':
        return styles.dangerButtonText;
      default:
        return styles.primaryButtonText;
    }
  };

  return (
    <RNModal
      visible={visible}
      transparent={transparent}
      animationType={animationType}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              {/* 标题栏 */}
              {(title || showCloseButton) && (
                <View style={styles.header}>
                  {title && <Text style={styles.title}>{title}</Text>}
                  {showCloseButton && (
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={onClose}
                      accessible={true}
                      accessibilityRole="button"
                      accessibilityLabel="关闭弹窗"
                    >
                      <Ionicons name="close" size={24} color="#6B7280" />
                    </TouchableOpacity>
                  )}
                </View>
              )}

              {/* 内容区域 */}
              <View style={styles.content}>
                {content && <Text style={styles.contentText}>{content}</Text>}
                {children}
              </View>

              {/* 按钮区域 */}
              {buttons.length > 0 && (
                <View style={styles.buttonContainer}>
                  {buttons.map((button, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.button,
                        getButtonStyle(button.style),
                        button.disabled && styles.disabledButton,
                        buttons.length === 1 && styles.singleButton,
                      ]}
                      onPress={button.onPress}
                      disabled={button.disabled}
                      accessible={true}
                      accessibilityRole="button"
                      accessibilityLabel={button.text}
                    >
                      <Text
                        style={[
                          styles.buttonText,
                          getButtonTextStyle(button.style),
                          button.disabled && styles.disabledButtonText,
                        ]}
                      >
                        {button.text}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

// 确认弹窗的便捷组件
export interface ConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmStyle?: 'primary' | 'danger';
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  onClose,
  title = '确认操作',
  content,
  confirmText = '确认',
  cancelText = '取消',
  onConfirm,
  onCancel,
  confirmStyle = 'primary',
}) => {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title={title}
      content={content}
      buttons={[
        {
          text: cancelText,
          onPress: handleCancel,
          style: 'secondary',
        },
        {
          text: confirmText,
          onPress: handleConfirm,
          style: confirmStyle,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
        }
      : {
          elevation: 8,
        }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  closeButton: {
    padding: 4,
    marginLeft: 12,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  contentText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleButton: {
    flex: 1,
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#3B82F6',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }
      : {
          elevation: 3,
        }),
  },
  secondaryButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  dangerButton: {
    backgroundColor: '#EF4444',
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#EF4444',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }
      : {
          elevation: 3,
        }),
  },
  disabledButton: {
    backgroundColor: '#F3F4F6',
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButtonText: {
    color: 'white',
  },
  secondaryButtonText: {
    color: '#374151',
  },
  dangerButtonText: {
    color: 'white',
  },
  disabledButtonText: {
    color: '#9CA3AF',
  },
});
