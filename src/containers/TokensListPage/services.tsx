import ApiRequest from '../../utils/apiRequest';

export const handleTokenList = (query: any) => {
  const apiRequest = new ApiRequest();
  return apiRequest.get(`/block`, {
    params: query,
  });
};
