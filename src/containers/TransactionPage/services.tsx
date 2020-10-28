import { COINS, GET_BLOCK, GET_TX } from '../../constants';
import ApiRequest from '../../utils/apiRequest';

export const handleGetTxFromTxid = async (txId: string) => {
  const apiRequest = new ApiRequest();
  const resp = await apiRequest.get(`${GET_TX}/${txId}`);
  return resp;
};

export const getInsAndOutsFromTxId = async (txid: string) => {
  const apiRequest = new ApiRequest();
  return apiRequest.get(`${GET_TX}/${txid}/${COINS}`);
};

export const getConfirmations = async (blockHeight) => {
  const apiRequest = new ApiRequest();
  const { data } = await apiRequest.get(`${GET_BLOCK}/tip`);
  return blockHeight >= 0 ? data.height - blockHeight : blockHeight;
};
