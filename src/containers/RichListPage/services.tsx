import { GET_ADDRESS } from '../../constants';
import ApiRequest from '../../utils/apiRequest';

export const handleRichList = (query: any) => {
  const apiRequest = new ApiRequest();
  return apiRequest.get(`/${GET_ADDRESS}/stats/rich-list`, {
    params: query,
  });
};
