import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export class MobileTokenManager {
  private static ACCESS_TOKEN_KEY = 'access_token'
  private static REFRESH_TOKEN_KEY = 'refresh_token'

  // 获取访问令牌
  async getToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(MobileTokenManager.ACCESS_TOKEN_KEY);
    } catch (error) {
      console.warn('获取访问令牌失败:', error);
      return null;
    }
  }

  // 获取刷新令牌
  async getRefreshToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(MobileTokenManager.REFRESH_TOKEN_KEY);
    } catch (error) {
      console.warn('获取刷新令牌失败:', error);
      return null;
    }
  }

  // 设置访问令牌
  async setToken(token: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(MobileTokenManager.ACCESS_TOKEN_KEY, token);
    } catch (error) {
      console.warn('设置访问令牌失败:', error);
      throw new Error('存储访问令牌失败');
    }
  }

  // 设置令牌对
  async setTokens(tokens: { accessToken: string; refreshToken?: string }): Promise<void> {
    try {
      await this.setToken(tokens.accessToken);
      if (tokens.refreshToken) {
        await SecureStore.setItemAsync(MobileTokenManager.REFRESH_TOKEN_KEY, tokens.refreshToken);
      }
    } catch (error) {
      console.warn('设置令牌对失败:', error);
      throw new Error('存储令牌失败');
    }
  }

  // 清除所有令牌
  async clearToken(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(MobileTokenManager.ACCESS_TOKEN_KEY);
      await SecureStore.deleteItemAsync(MobileTokenManager.REFRESH_TOKEN_KEY);
      // 同时清除用户相关信息
      await AsyncStorage.multiRemove([
        'user_info',
        'login_status',
        'last_login_time'
      ]);
    } catch (error) {
      console.warn('清除令牌失败:', error);
    }
  }

  // 检查令牌是否即将过期（提前5分钟刷新）
  async shouldRefreshToken(): Promise<boolean> {
    const token = await this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      const now = Date.now();
      const fiveMinutes = 5 * 60 * 1000;

      return (exp - now) < fiveMinutes;
    } catch (error) {
      console.warn('解析令牌失败:', error);
      return true; // 解析失败时认为需要刷新
    }
  }

  // 确保令牌有效
  async ensureValidToken(baseURL: string): Promise<boolean> {
    const shouldRefresh = await this.shouldRefreshToken();

    if (shouldRefresh) {
      const result = await this.refreshAccessToken(baseURL);
      return result.success;
    }

    return true;
  }

  // 刷新访问令牌 - 完全兼容Web端逻辑
  async refreshAccessToken(baseURL: string): Promise<{ success: boolean; reason?: string }> {
    const refreshToken = await this.getRefreshToken();
    if (!refreshToken) {
      return { success: false, reason: 'no_refresh_token' };
    }

    try {
      const response = await fetch(`${baseURL}/admin/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await response.json();

      if (response.ok && data?.data) {
        const { accessToken, refreshToken: newRefreshToken } = data.data;
        await this.setTokens({ accessToken, refreshToken: newRefreshToken });
        return { success: true };
      } else {
        return { success: false, reason: 'refresh_token_invalid' };
      }
    } catch (error) {
      console.error('刷新令牌失败:', error);
      return { success: false, reason: 'network_error' };
    }
  }

  // 检查登录状态
  async checkLoginStatus(baseURL: string): Promise<{
    isLoggedIn: boolean;
    needsRefresh: boolean;
  }> {
    const refreshToken = await this.getRefreshToken();
    const accessToken = await this.getToken();

    if (!refreshToken) {
      return { isLoggedIn: false, needsRefresh: false };
    }

    if (!accessToken || await this.shouldRefreshToken()) {
      const refreshResult = await this.refreshAccessToken(baseURL);
      return {
        isLoggedIn: refreshResult.success,
        needsRefresh: !refreshResult.success
      };
    }

    return { isLoggedIn: true, needsRefresh: false };
  }

  // 跳转到登录页面
  toLogin(): void {
    // 清除所有认证相关数据
    this.clearToken();

    // 这里可以添加导航逻辑，跳转到登录页面
    // 由于这是在工具函数中，我们通过抛出错误让上层处理
    throw new Error('NEED_LOGIN');
  }
}
