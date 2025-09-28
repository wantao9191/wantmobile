import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';
import { MobileTokenManager } from '../utils/http/token-manager';

export interface User {
  id: string;
  account: string;
  name: string;
  role: 'nurse' | 'insured';
  avatar?: string;
  phone?: string;
  [key: string]: any;
}

export interface AuthTokens {
  accessToken: string | null;
  refreshToken: string | null;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  tokens: AuthTokens;
  role: 'nurse' | 'insured' | null;
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; tokens: AuthTokens } }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'REFRESH_TOKENS'; payload: AuthTokens };

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  tokens: {
    accessToken: null,
    refreshToken: null,
  },
  role: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
        tokens: action.payload.tokens,
        role: action.payload.user.role,
      };

    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        tokens: { accessToken: null, refreshToken: null },
        role: null,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };

    case 'REFRESH_TOKENS':
      return {
        ...state,
        tokens: action.payload,
      };

    default:
      return state;
  }
};

interface AuthContextType {
  state: AuthState;
  login: (account: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
  baseURL?: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  baseURL = '/api'
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const tokenManager = new MobileTokenManager();

  // 恢复认证状态
  useEffect(() => {
    const restoreAuth = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });

        // 检查本地存储的登录状态
        const loginStatus = await AsyncStorage.getItem('login_status');
        const userInfo = await AsyncStorage.getItem('user_info');

        if (loginStatus === 'logged_in' && userInfo) {
          const user = JSON.parse(userInfo);

          // 验证token有效性
          const tokenStatus = await tokenManager.checkLoginStatus(baseURL);

          if (tokenStatus.isLoggedIn) {
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: {
                user,
                tokens: {
                  accessToken: await tokenManager.getToken(),
                  refreshToken: await tokenManager.getRefreshToken(),
                },
              },
            });
            return;
          }
        }

        // 如果没有有效登录状态，清除所有数据
        await tokenManager.clearToken();
        await AsyncStorage.multiRemove(['login_status', 'user_info', 'last_login_time']);

      } catch (error) {
        console.warn('恢复认证状态失败:', error);
        await tokenManager.clearToken();
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    restoreAuth();
  }, [baseURL]);

  // 登录函数
  const login = async (
    account: string,
    password: string,
    rememberMe: boolean = true
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // 调用登录API
      const response = await fetch(`${baseURL}/admin/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account, password }),
      });

      const data = await response.json();

      if (!response.ok || data.code !== 200) {
        return {
          success: false,
          message: data.message || '登录失败，请检查账号密码',
        };
      }

      const { user, accessToken, refreshToken } = data.data;

      // 保存tokens到SecureStore
      await tokenManager.setTokens({ accessToken, refreshToken });

      // 保存用户信息到AsyncStorage
      await AsyncStorage.setItem('user_info', JSON.stringify(user));
      await AsyncStorage.setItem('login_status', 'logged_in');
      await AsyncStorage.setItem('last_login_time', Date.now().toString());

      // 更新认证状态
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user,
          tokens: { accessToken, refreshToken },
        },
      });

      return { success: true };
    } catch (error: any) {
      console.error('登录失败:', error);
      return {
        success: false,
        message: error.message || '网络连接失败，请稍后重试',
      };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // 登出函数
  const logout = async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // 清除服务器端的登录状态（可选）
      try {
        await fetch(`${baseURL}/admin/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${state.tokens.accessToken}`,
          },
        });
      } catch (error) {
        console.warn('服务器登出失败:', error);
      }

      // 清除本地存储
      await tokenManager.clearToken();
      await AsyncStorage.multiRemove(['login_status', 'user_info', 'last_login_time']);

      // 更新状态
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('登出失败:', error);
      // 即使出错也要清除状态
      dispatch({ type: 'LOGOUT' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // 刷新用户信息
  const refreshUser = async (): Promise<void> => {
    try {
      const response = await fetch(`${baseURL}/admin/user/info`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${state.tokens.accessToken}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.code === 200) {
        const updatedUser = data.data;
        await AsyncStorage.setItem('user_info', JSON.stringify(updatedUser));
        dispatch({ type: 'UPDATE_USER', payload: updatedUser });
      }
    } catch (error) {
      console.warn('刷新用户信息失败:', error);
    }
  };

  // 更新用户信息
  const updateUser = (user: User): void => {
    dispatch({ type: 'UPDATE_USER', payload: user });
    AsyncStorage.setItem('user_info', JSON.stringify(user));
  };

  const contextValue: AuthContextType = {
    state,
    login,
    logout,
    refreshUser,
    updateUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
