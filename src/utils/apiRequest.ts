import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { API_PREFIX } from "../constants";
import store from "../app/rootStore";

export default class ApiRequest {
  client: AxiosInstance;
  constructor() {
    const {
      app: { chain, network },
    } = store.getState();
    this.client = axios.create({
      baseURL: `${API_PREFIX}/${chain}/${network}`,
      headers: {
        "cache-control": "no-cache",
      },
    });
  }

  post = async (path: string, data: any, config?: AxiosRequestConfig) =>
    this.client.post(path, data, config);

  get = async (path: string, config?: AxiosRequestConfig) =>
    this.client.get(path, config);

  put = async (path: string, data: any, config?: AxiosRequestConfig) =>
    this.client.put(path, data, config);

  delete = async (path: string, config?: AxiosRequestConfig) =>
    this.client.delete(path, config);
}