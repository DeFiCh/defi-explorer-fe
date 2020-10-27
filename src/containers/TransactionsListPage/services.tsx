import ApiRequest from '../../utils/apiRequest';

export const handleTransactionsList = (query: any) => {
  const apiRequest = new ApiRequest();
  return apiRequest.get(`/block`, {
    params: query,
  });
};
