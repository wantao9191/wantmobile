import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

interface AuthGuardMonitorProps {
  enabled?: boolean;
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
}

// 开发环境下的性能监控组件
export const AuthGuardMonitor: React.FC<AuthGuardMonitorProps> = ({
  enabled = __DEV__,
  logLevel = 'info'
}) => {
  const { state } = useAuth();
  const renderCountRef = useRef(0);
  const lastStateRef = useRef<string>('');

  useEffect(() => {
    if (!enabled) return;

    renderCountRef.current += 1;

    const currentState = JSON.stringify({
      isLoading: state.isLoading,
      isAuthenticated: state.isAuthenticated,
      userRole: state.user?.role,
      userId: state.user?.id,
    });

    // 只在状态真正变化时记录
    if (currentState !== lastStateRef.current) {
      const logMessage = `[AuthGuard] 渲染次数: ${renderCountRef.current}, 状态: ${currentState}`;

      switch (logLevel) {
        case 'debug':
          console.debug(logMessage);
          break;
        case 'info':
          console.info(logMessage);
          break;
        case 'warn':
          console.warn(logMessage);
          break;
        case 'error':
          console.error(logMessage);
          break;
      }

      lastStateRef.current = currentState;
    }
  });

  if (!enabled) return null;

  return (
    <View style={styles.monitorContainer}>
      <Text style={styles.monitorText}>
        渲染次数: {renderCountRef.current}
      </Text>
      <Text style={styles.monitorText}>
        状态: {state.isAuthenticated ? '已登录' : '未登录'}
        {state.user?.role && ` (${state.user.role})`}
      </Text>
      <Text style={styles.monitorText}>
        加载中: {state.isLoading ? '是' : '否'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  monitorContainer: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 8,
    borderRadius: 4,
    zIndex: 9999,
  },
  monitorText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'monospace',
  },
});

export default AuthGuardMonitor;
