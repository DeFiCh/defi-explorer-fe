import ApiRequest from '../../utils/apiRequest';

export const handleBlockList = (query: any) => {
  const apiRequest = new ApiRequest();
  return apiRequest.get(`/block`, {
    params: query,
  });
};
