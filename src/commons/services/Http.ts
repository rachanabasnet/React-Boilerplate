import axios, { AxiosResponse } from 'axios';

import { IHttp, IError, IHttpParam } from '../interfaces/IHttp';
import config from '../../config';
import { getToken, removeToken } from '../utils/token';

export default class Http implements IHttp {
  private instance;
  private headers;

  constructor(baseUrl: string = config.apiUrl as string) {
    this.headers = this.getHeaders();

    this.instance = axios.create({
      baseURL: baseUrl,
    });

    this.initialInterceptors();
  }

  private initialInterceptors = () => {
    this.instance.interceptors.response.use(
      this.handleResponse,
      this.handleError,
    );

    this.instance.interceptors.request.use(this.handleRequest);
  };

  private handleRequest = (config: any) => {
    config = {
      ...config,
      headers: {
        ...config.headers,
        ...this.getHeaders(config),
      },
    };

    return config;
  };

  private handleResponse = (response: AxiosResponse) => {
    return response.data;
  };

  private handleError = (err: any): Promise<IError> => {
    if (err.response) {
      const { status, data, headers } = err.response;
      if (status === 401 || data.detail === 'Invalid token.') {
        removeToken({ name: config.tokenName });
        window.location.href = '/';
      }
      return Promise.reject({
        status,
        data,
        headers,
      });
    } else {
      return Promise.reject({
        status: 500,
        headers: null,
        data: err.message,
      });
    }
  };

  getHeaders = (config?: any) => {
    const token = this.token();

    const headers: any = {};

    if (config?.url.endsWith('/file-upload/')) {
      headers['Content-Type'] = 'multipart/form-data';
    } else {
      headers['Content-Type'] = 'application/json';
    }

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }

    return headers;
  };

  token = (): string | null => {
    return getToken({ name: config.tokenName });
  };

  changeHeaders = (headerConfig: any) => {
    this.headers = {
      ...this.headers,
      ...headerConfig,
    };
  };

  get<T>(args: IHttpParam): Promise<T> {
    return this.instance
      .get(args.endpoint, args.payload)
      .then((response: any) => {
        return response as T;
      });
  }

  post<T>(args: IHttpParam): Promise<T> {
    return this.instance
      .post(args.endpoint, args.payload, args.config)
      .then((response: any) => {
        return response as T;
      });
  }

  patch<T>(args: IHttpParam): Promise<T> {
    return this.instance
      .patch(args.endpoint, args.payload)
      .then((response: any) => {
        return response as T;
      });
  }

  put<T>(parameters: IHttpParam): Promise<T> {
    return this.instance
      .put(parameters.endpoint, parameters.payload, parameters.config)
      .then((response: any) => {
        return response as T;
      });
  }

  delete<T>(parameters: any): Promise<T> {
    return this.instance
    .delete(parameters.endpoint)
    .then((response: any) => {
      return response as T;
    });
  }
}
