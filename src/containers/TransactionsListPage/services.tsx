import ApiRequest from '../../utils/apiRequest';

export const handleTransactionsList = (query: any) => {
  const apiRequest = new ApiRequest();
  return apiRequest.get(`/tx/txs-list`, {
    params: query,
  });
};

export const handleGetTotalTransactions = async () => {
  const apiRequest = new ApiRequest();
  const { data } = await apiRequest.get(`/tx/txs/total`);
  return data;
};
