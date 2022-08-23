import type {AxiosRequestConfig } from 'axios'
import type { AxiosInstance } from "axios";
import type { IConfigAPI, RESTResponse} from '@/api/@types/common.type'

export class ApiServiceClass {
  private axios: AxiosInstance;
  private serviceUrl: string;

  constructor(config: IConfigAPI) {
    this.axios = config.axios;
    this.serviceUrl = config.serviceUrl;
  }

  protected async GET<T>(
        url: string,
        config?: AxiosRequestConfig,
  ): Promise<RESTResponse> {
    try {
      const response = await this.axios({
        url: `${this.serviceUrl}/${url}`,
        ...config,
        method: 'GET',
      })
      if (response?.status >= 200 && response?.status < 300) {
        return {
          ...response,
          success: true,
        }
      }

      return {
        ...response,
        success: false,
      }
    } catch (error: any) {
    return {
      ...error?.response,
      success: false,
    }
  }
  }

  protected async POST<T>(
        url: string,
        data = {},
        params = {},
  ): Promise<RESTResponse> {
    try {
      const response = await this.axios({
        url: `${this.serviceUrl}/${url}`,
        data,
        params,
        method: 'POST',
      })
      if (response?.status >= 200 && response?.status < 300) {
        return {
          ...response,
          success: true,
        }
      }

      return {
        ...response,
        success: false,
      }
    } catch (error: any) {
    return {
      ...error?.response,
      success: false,
    }
  }
  }
}