import { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';

// 优化的认证状态选择器，避免不必要的重新渲染
export const useAuthOptimized = () => {
  const { state, login, logout, refreshUser, updateUser } = useAuth();

  // 使用useMemo缓存派生状态，避免不必要的计算
  const authInfo = useMemo(() => ({
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    role: state.user?.role || null,
    hasRole: (roles: string[]) => state.user ? roles.includes(state.user.role) : false,
    isNurse: state.user?.role === 'nurse',
    isInsured: state.user?.role === 'insured',
  }), [state.isLoading, state.isAuthenticated, state.user]);

  return {
    state: authInfo,
    login,
    logout,
    refreshUser,
    updateUser,
  };
};

// 专门用于AuthGuard的优化hook
export const useAuthGuard = (requireAuth: boolean = true, allowedRoles: string[] = []) => {
  const { state } = useAuth();

  // 预计算权限检查结果
  const permissionCheck = useMemo(() => {
    if (!requireAuth) {
      return { canAccess: true, reason: 'no_auth_required' };
    }

    if (state.isLoading) {
      return { canAccess: false, reason: 'loading' };
    }

    if (!state.isAuthenticated) {
      return { canAccess: false, reason: 'not_authenticated' };
    }

    if (!state.user) {
      return { canAccess: false, reason: 'no_user' };
    }

    const hasPermission = allowedRoles.length === 0 || allowedRoles.includes(state.user.role);
    return {
      canAccess: hasPermission,
      reason: hasPermission ? 'authorized' : 'insufficient_permissions'
    };
  }, [state.isLoading, state.isAuthenticated, state.user, requireAuth, allowedRoles]);

  return {
    isLoading: state.isLoading,
    canAccess: permissionCheck.canAccess,
    reason: permissionCheck.reason,
    user: state.user,
  };
};
