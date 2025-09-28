// 导出所有HTTP相关类型和接口
export { MobileHttpClient } from './http-client';
export type { RequestConfig, RequestOptions } from './http-client';
export { HttpError, HttpErrorHandler } from './http-error-handler';
export { ResponseHandler } from './response-handler';
export type { ApiResponse } from './response-handler';
export { MobileTokenManager } from './token-manager';

// 导出默认实例，保持向后兼容
export { http, default as HttpRequest } from './http-client';

// 为了完全兼容原来的使用方式，也导出一个默认的http实例
export { http as default } from './http-client';

