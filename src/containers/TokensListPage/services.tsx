import { QUICK_STATS_BASE_ENDPOINT } from '../../constants';
import ApiRequest from '../../utils/apiRequest';
import { ITokenPoolPairListParams } from '../../utils/interfaces';

export const getCategory = (item) => {
  let category = 'DCT';
  if (item.isDAT) {
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
      name: data[item].name || data[item].symbol,
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

  return {
    ...data[id],
    tokenId: id,
    category: getCategory(data[id]),
    name: data[id].name || data[id].symbol,
  };
};