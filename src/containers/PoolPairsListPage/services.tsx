import {
  COIN_GECKO_BASE_ENDPOINT,
  QUICK_STATS_BASE_ENDPOINT,
  VS_CURRENCIES,
} from '../../constants';
import ApiRequest from '../../utils/apiRequest';
import { ITokenPoolPairListParams } from '../../utils/interfaces';

export const handlePoolPairList = async (query: ITokenPoolPairListParams) => {
  const apiRequest = new ApiRequest();

  const { data } = await apiRequest.get('/v1/listpoolpairs', {
    baseURL: QUICK_STATS_BASE_ENDPOINT,
    params: query,
  });
  return Object.keys(data).map((item) => ({
    ...data[item],
    poolPairId: item,
  }));
  // .filter((item) => item.tradeEnabled); //TODO: Disable filtering based on item.tradeEnabled
};

export const handleGetPoolPair = async (query: {
  network: string;
  id: string | number;
}) => {
  const { id } = query;
  const apiRequest = new ApiRequest();
  const { data } = await apiRequest.get('/v1/getpoolpair', {
    baseURL: QUICK_STATS_BASE_ENDPOINT,
    params: query,
  });
  return {
    ...data[id],
    poolPairId: id,
  };
};

export const fetchCoinGeckoCoinsList = async (list: any[]) => {
  const queryParams = {
    vs_currencies: VS_CURRENCIES,
    ids: list.map((item) => item.value).join(','),
  };
  const apiRequest = new ApiRequest();
  const { data } = await apiRequest.get('/simple/price', {
    baseURL: COIN_GECKO_BASE_ENDPOINT,
    params: queryParams,
  });

  const result = list.map((item) => {
    const fiatCurrencyData = data[item.value] || {};
    return { value: fiatCurrencyData[VS_CURRENCIES] || 0, label: item.label };
  });
  return result;
};

export const fetchGetGov = async (queryParams: {
  name: string;
  network: string;
}) => {
  const { name } = queryParams;
  const apiRequest = new ApiRequest();
  const { data } = await apiRequest.get('/v1/getgov', {
    baseURL: QUICK_STATS_BASE_ENDPOINT,
    params: queryParams,
  });
  return data[name];
};
