import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { BACKEND_BASE_URL, BACKEND_BASE_PORT } from "../constants";

export default class ApiRequest {
  client: AxiosInstance;
  constructor() {
    this.client = axios.create({
      baseURL: `http://${BACKEND_BASE_URL}:${BACKEND_BASE_PORT}/api`,
      headers: {
        "cache-control": "no-cache",
      },
    });
  }

  post = async (path: string, data: any, config?: AxiosRequestConfig) => this.client.post(path, data, config);

  get = async (path: string, config?: AxiosRequestConfig) => this.client.get(path, config);

  put = async (path: string, data: any, config?: AxiosRequestConfig) => this.client.put(path, data, config);

  delete = async (path: string, config?: AxiosRequestConfig) => this.client.delete(path, config);
}
