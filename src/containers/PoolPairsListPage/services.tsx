import { QUICK_STATS_BASE_ENDPOINT } from '../../constants';
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
