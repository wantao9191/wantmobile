import constants from 'expo-constants';
import { HttpErrorHandler } from './http-error-handler';
import { ApiResponse, ResponseHandler } from './response-handler';
import { MobileTokenManager } from './token-manager';
export interface RequestConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  showMessage?: boolean;
  messageDuration?: number;
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  timeout?: number;
}

export class MobileHttpClient {
  private config: RequestConfig;
  private baseURL: string;
  private tokenManager: MobileTokenManager;
  private errorHandler: HttpErrorHandler;
  private responseHandler: ResponseHandler;

  constructor(config: RequestConfig = {}) {
    console.log(constants.expoConfig?.extra?.apiUrl,'-----');
    this.config = {
      baseURL: constants.expoConfig?.extra?.apiUrl || 'http://192.168.10.136:3000',
      timeout: config.timeout || 20000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
      showMessage: config.showMessage ?? true,
      messageDuration: config.messageDuration || 3000,
    };
    this.baseURL = this.config.baseURL!;

    this.tokenManager = new MobileTokenManager();
    this.errorHandler = new HttpErrorHandler(this.config.showMessage, this.config.messageDuration);
    this.responseHandler = new ResponseHandler(this.errorHandler);
  }

  private buildQueryString(data: any): string {
    if (!data || typeof data !== 'object') return '';

    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(item => params.append(key, String(item)));
        } else {
          params.append(key, String(value));
        }
      }
    });

    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
  }

  private async buildRequestOptions(options: RequestOptions, data?: any): Promise<RequestInit> {
    const token = await this.tokenManager.getToken();

    const requestOptions: RequestInit = {
      method: options.method || 'GET',
      headers: {
        ...this.config.headers,
        ...options.headers,
      },
    };

    if (token) {
      requestOptions.headers = {
        ...requestOptions.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    if (data && ['POST', 'PUT', 'PATCH'].includes(options.method || 'GET')) {
      if (data instanceof FormData) {
        requestOptions.body = data;
        const headers = requestOptions.headers as Record<string, string>;
        delete headers['Content-Type'];
      } else {
        requestOptions.body = JSON.stringify(data);
      }
    }

    return requestOptions;
  }

  configureMessage(options: { showMessage?: boolean; messageDuration?: number }): void {
    this.errorHandler.updateConfig(options);
    if (options.showMessage !== undefined) {
      this.config.showMessage = options.showMessage;
    }
    if (options.messageDuration !== undefined) {
      this.config.messageDuration = options.messageDuration;
    }
  }

  // Token management methods
  async setToken(token: string): Promise<void> {
    await this.tokenManager.setToken(token);
  }

  async setTokens(tokens: { accessToken: string; refreshToken?: string }): Promise<void> {
    await this.tokenManager.setTokens(tokens);
  }

  async clearToken(): Promise<void> {
    await this.tokenManager.clearToken();
  }

  // 获取基础URL
  getBaseURL(): string {
    return this.baseURL;
  }

  // Main request method
  async request<T = any>(url: string, options: RequestOptions = {}, data?: any): Promise<ApiResponse<T>> {
    return this.requestInternal<T>(url, options, data, false);
  }

  private async requestInternal<T = any>(
    url: string,
    options: RequestOptions = {},
    data?: any,
    isRetry: boolean = false
  ): Promise<ApiResponse<T>> {
    let fullURL = url.startsWith('http') ? url : `${this.baseURL}${url}`;

    if (options.method === 'GET' && data) {
      const queryString = this.buildQueryString(data);
      if (queryString) {
        fullURL += queryString;
      }
    }

    try {
      const controller = new AbortController();
      const timeout: number = options.timeout || this.config.timeout || 10000;
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const requestOptions = await this.buildRequestOptions(options, data);
      requestOptions.signal = controller.signal;

      const response = await fetch(fullURL, requestOptions);
      clearTimeout(timeoutId);

      // Handle 401 errors
      if (response.status === 401 && !isRetry) {
        const isTokenExpired = await this.errorHandler.isTokenExpiredError(response);
        if (isTokenExpired) {
          const refreshResult = await this.tokenManager.refreshAccessToken(this.baseURL);
          if (refreshResult.success) {
            return this.requestInternal<T>(url, options, data, true);
          } else {
            this.errorHandler.showErrorMessage('error', '登录已过期，请重新登录');
            this.tokenManager.toLogin();
          }
        } else {
          this.errorHandler.showErrorMessage('error', '认证失败，请重新登录');
          this.tokenManager.toLogin();
        }
      }

      // Handle business-level 401 errors
      try {
        const contentType = response.headers.get('content-type');
        if (!isRetry && response.ok && contentType?.includes('application/json')) {
          const cloned = response.clone();
          const body = await cloned.json();
          if (typeof body?.code === 'number' && body.code === 401) {
            const isTokenExpired = this.errorHandler.isTokenExpiredFromBody(body);
            if (isTokenExpired) {
              const refreshResult = await this.tokenManager.refreshAccessToken(this.baseURL);
              if (refreshResult.success) {
                return this.requestInternal<T>(url, options, data, true);
              } else {
                this.errorHandler.showErrorMessage('error', '登录已过期，请重新登录');
                this.tokenManager.toLogin();
              }
            } else {
              this.errorHandler.showErrorMessage('error', '认证失败，请重新登录');
              this.tokenManager.toLogin();
            }
          }
        }
      } catch { }

      return this.responseHandler.handleResponse(response);
    } catch (error: any) {
      return this.errorHandler.handleError(error, options.timeout || this.config.timeout);
    }
  }

  // HTTP method shortcuts
  async get<T = any>(url: string, data?: any, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...options, method: 'GET' }, data);
  }

  async post<T = any>(url: string, data?: any, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...options, method: 'POST' }, data);
  }

  async put<T = any>(url: string, data?: any, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...options, method: 'PUT' }, data);
  }

  async delete<T = any>(url: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  }

  async patch<T = any>(url: string, data?: any, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...options, method: 'PATCH' }, data);
  }
}

// 创建默认实例
export const http = new MobileHttpClient();
export default MobileHttpClient;
