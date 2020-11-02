import { QUICK_STATS_BASE_ENDPOINT } from '../../constants';
import ApiRequest from '../../utils/apiRequest';
import { ITokenPoolPairListParams } from '../../utils/interfaces';

export const handleTokenList = async (query: ITokenPoolPairListParams) => {
  const apiRequest = new ApiRequest();

  const { data } = await apiRequest.get('/v1/listtokens', {
    baseURL: QUICK_STATS_BASE_ENDPOINT,
    params: query,
  });
  return Object.keys(data).map((item) => {
    let category = '';
    if (data[item].isDAT) {
      category = category + 'DAT' + ' ';
    }
    if (data[item].isLPS) {
      category = category + 'LPS';
    }
    category.trim();
    return {
      tokenId: item,
      ...data[item],
      category,
    };
  });
};

export const handleGetToken = async (query: {
  network: string;
  id: string | number;
}) => {
  const apiRequest = new ApiRequest();

  return apiRequest.get('/v1/gettoken', {
    baseURL: QUICK_STATS_BASE_ENDPOINT,
    params: query,
  });
};
