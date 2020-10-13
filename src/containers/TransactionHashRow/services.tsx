import { GET_TX, COINS } from '../../constants/endpoint';
import ApiRequest from '../../utils/apiRequest';

export const getInsAndOutsFromTxId = async (txid: string) => {
  const apiRequest = new ApiRequest();
  const resp = await apiRequest.get(`${GET_TX}/${txid}/${COINS}`);
  return resp;
};
