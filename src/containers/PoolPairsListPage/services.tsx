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

export const fetchCoinGeckoPrice = async (
  _: { label: string; value: string },
  vs_currencies: string = VS_CURRENCIES
) => {
  const { label, value: ids } = _;
  const apiRequest = new ApiRequest();
  const { data } = await apiRequest.get('simple/price', {
    baseURL: COIN_GECKO_BASE_ENDPOINT,
    params: {
      ids,
      vs_currencies,
    },
  });

  return { value: data[ids][vs_currencies], label };
};

export const fetchCoinGeckoCoinsList = async (list: any[]) => {
  return Promise.all(list.map((item) => fetchCoinGeckoPrice(item)));
};
