import { GET_TX, COINS, GET_BLOCK } from '../../constants/endpoint';
import ApiRequest from '../../utils/apiRequest';

export const getInsAndOutsFromTxId = async (txid: string) => {
  const apiRequest = new ApiRequest();
  const resp = await apiRequest.get(`${GET_TX}/${txid}/${COINS}`);
  return resp;
};

export const getTransactionsFromTxid = async (txId: string) => {
  const apiRequest = new ApiRequest();
  return apiRequest.get(`${GET_TX}/${txId}`);
};

export const getConfirmations = async (blockHeight) => {
  const apiRequest = new ApiRequest();
  const { data } = await apiRequest.get(`${GET_BLOCK}/tip`);
  return blockHeight >= 0 ? data.height - blockHeight : blockHeight;
};
