import { Alert } from 'react-native';

export class HttpError extends Error {
  public code: number;
  public data: any;

  constructor(message: string, code: number, data?: any) {
    super(message);
    this.name = 'HttpError';
    this.code = code;
    this.data = data ?? null;
  }
}

export class HttpErrorHandler {
  private showMessage: boolean;
  private messageDuration: number;

  constructor(showMessage: boolean = true, messageDuration: number = 3000) {
    this.showMessage = showMessage;
    this.messageDuration = messageDuration;
  }

  updateConfig(options: { showMessage?: boolean; messageDuration?: number }): void {
    if (options.showMessage !== undefined) {
      this.showMessage = options.showMessage;
    }
    if (options.messageDuration !== undefined) {
      this.messageDuration = options.messageDuration;
    }
  }

  showErrorMessage(type: 'success' | 'error' | 'warning' | 'info', content: string): void {
    if (this.showMessage) {
      switch (type) {
        case 'error':
          Alert.alert('错误', content);
          break;
        case 'warning':
          Alert.alert('警告', content);
          break;
        case 'info':
          Alert.alert('提示', content);
          break;
        case 'success':
          Alert.alert('成功', content);
          break;
      }
    }
  }

  handleError(error: any, timeout?: number): never {
    console.error('HTTP请求错误:', error);

    if (error?.name === 'TypeError' && typeof error?.message === 'string' && error.message.includes('fetch')) {
      this.showErrorMessage('error', '网络连接失败，请检查网络设置');
      throw new HttpError('网络连接失败，请检查网络设置', -1);
    }

    if (error?.name === 'AbortError') {
      const timeoutSeconds = (timeout || 10000) / 1000;
      const errorMsg = `请求超时（${timeoutSeconds}秒），请检查网络连接或稍后重试`;
      this.showErrorMessage('error', errorMsg);
      throw new HttpError(errorMsg, -2);
    }

    if (error instanceof HttpError) {
      this.showErrorMessage('error', error.message);
      throw error;
    }

    const unknownError = error?.message || '未知错误';
    this.showErrorMessage('error', unknownError);
    throw new HttpError(unknownError, -3);
  }

  // 检查响应体中的token过期信息
  isTokenExpiredFromBody(body: any): boolean {
    const errorMessage = body?.message || '';
    return errorMessage.includes('expired') ||
           errorMessage.includes('过期') ||
           errorMessage.includes('Token expired') ||
           errorMessage.includes('JWT expired') ||
           errorMessage.includes('登录已过期');
  }

  // 检查HTTP状态码为401的token过期情况
  async isTokenExpiredError(response: Response): Promise<boolean> {
    try {
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const cloned = response.clone();
        const body = await cloned.json();
        return this.isTokenExpiredFromBody(body);
      }
    } catch (error) {
      console.warn('无法解析401响应内容:', error);
    }
    return true; // 默认认为是token过期
  }
}
