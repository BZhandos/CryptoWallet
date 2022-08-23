import type { AxiosResponse, AxiosInstance } from "axios";

export interface RESTResponse extends AxiosResponse {
    success: boolean
}

export interface IConfigAPI {
    axios: AxiosInstance;
    serviceUrl: string;
}
