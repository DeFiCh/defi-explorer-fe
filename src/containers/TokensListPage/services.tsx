import { QUICK_STATS_BASE_ENDPOINT } from '../../constants';
import ApiRequest from '../../utils/apiRequest';
import {
  IAddressTokenListParams,
  ITokenPoolPairListParams,
} from '../../utils/interfaces';

export const getCategory = (item) => {
  let category = 'DCT';
  if (item && item.isDAT) {
    category = 'DAT';
  }
  return category;
};

export const handleTokenList = async (query: ITokenPoolPairListParams) => {
  const apiRequest = new ApiRequest();

  const { data } = await apiRequest.get('/v1/listtokens', {
    baseURL: QUICK_STATS_BASE_ENDPOINT,
    params: query,
  });
  return Object.keys(data).map((item) => {
    const category = getCategory(data[item]);
    return {
      tokenId: item,
      ...data[item],
      name: data[item].name || data[item].symbolKey,
      category,
    };
  });
  // .filter((item) => item.tradeable); // TODO: Disable filtering of data based on tradeable
};

export const handleGetToken = async (query: {
  network: string;
  id: string | number;
}) => {
  const { id } = query;
  const apiRequest = new ApiRequest();
  const { data } = await apiRequest.get('/v1/gettoken', {
    baseURL: QUICK_STATS_BASE_ENDPOINT,
    params: query,
  });
  const newIds = Object.keys(data);
  if (newIds.length) {
    const newId = newIds[0];
    return {
      ...data[newId],
      tokenId: newId,
      category: getCategory(data[newId]),
      name: data[newId].name || data[newId].symbolKey,
    };
  }
  return {};
};

export const handleAddressTokenList = async (
  query: IAddressTokenListParams
) => {
  const apiRequest = new ApiRequest();

  const { data } = await apiRequest.get('/v1/getaccount', {
    baseURL: QUICK_STATS_BASE_ENDPOINT,
    params: query,
  });
  if (Array.isArray(data)) {
    return data.map((item) => {
      const [balance, name] = item.split('@');
      return {
        balance,
        name,
        id: name,
        key: item,
      };
    });
  }
  return [];
};

export const handleUtxoBalance = async (address: string) => {
  const apiRequest = new ApiRequest();
  const {
    data: { balance },
  } = await apiRequest.get(`/address/${address}/balance`);
  return balance;
};

export const handleTokenRichList = async (query: {
  network: string;
  id: string | number;
}) => {
  const apiRequest = new ApiRequest();
  const { data } = await apiRequest.get('/v1/gettokenrichlist', {
    baseURL: QUICK_STATS_BASE_ENDPOINT,
    params: query,
  });
  return data;
};
