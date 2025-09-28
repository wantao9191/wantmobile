import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAuthGuard } from '../hooks/useAuthOptimized';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedRoles?: ('nurse' | 'insured')[];
}

// 自定义比较函数，优化React.memo性能
const arePropsEqual = (prevProps: AuthGuardProps, nextProps: AuthGuardProps): boolean => {
  // 比较requireAuth
  if (prevProps.requireAuth !== nextProps.requireAuth) {
    return false;
  }

  // 比较allowedRoles数组内容
  if (prevProps.allowedRoles?.length !== nextProps.allowedRoles?.length) {
    return false;
  }

  if (prevProps.allowedRoles && nextProps.allowedRoles) {
    const prevSorted = [...prevProps.allowedRoles].sort();
    const nextSorted = [...nextProps.allowedRoles].sort();
    if (prevSorted.some((role, index) => role !== nextSorted[index])) {
      return false;
    }
  }

  return true;
};

export const AuthGuard: React.FC<AuthGuardProps> = React.memo(({
  children,
  requireAuth = true,
  allowedRoles = ['nurse', 'insured']
}) => {
  const router = useRouter();

  // 使用优化的认证检查hook
  const { isLoading, canAccess, reason, user } = useAuthGuard(requireAuth, allowedRoles);

  // 使用useCallback优化路由跳转函数
  const handleAuthRedirect = useCallback((path: string) => {
    router.replace(path as any);
  }, [router]);

  useEffect(() => {
    // 如果还在加载中，不执行跳转
    if (isLoading) return;

    // 根据权限检查结果执行相应操作
    switch (reason) {
      case 'not_authenticated':
        // 需要登录但未登录，跳转到登录页
        handleAuthRedirect('/login');
        break;

      case 'insufficient_permissions':
        // 用户角色不符合要求，跳转到默认页面
        handleAuthRedirect('/(tabs)');
        break;
      // 其他情况不需要跳转（已授权或不需要授权）
    }
  }, [isLoading, canAccess, reason, user?.role, handleAuthRedirect]);

  // 使用useMemo缓存渲染结果，避免不必要的重复计算
  const renderContent = useMemo(() => {
    // 加载中显示加载器
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      );
    }

    // 如果可以访问，显示内容
    if (canAccess) {
      return <>{children}</>;
    }

    // 其他情况（未登录或权限不足）显示加载器（因为会跳转）
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }, [isLoading, canAccess, children]);

  return renderContent;
}, arePropsEqual);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
});

export default AuthGuard;
