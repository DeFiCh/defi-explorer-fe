import { GET_TX } from '../../constants/endpoint';
import ApiRequest from '../../utils/apiRequest';

export const handleGetTxFromTxid = async (txId: string) => {
  const apiRequest = new ApiRequest();
  const resp = await apiRequest.get(`${GET_TX}/${txId}`);
  return resp;
};
