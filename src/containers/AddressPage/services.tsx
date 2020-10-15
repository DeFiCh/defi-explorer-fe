import { ADDRESS_BASE_PATH } from '../../constants';
import ApiRequest from '../../utils/apiRequest';

export const getAddressService = async (address: string) => {
  const apiRequest = new ApiRequest();
  const resp = await apiRequest.get(`${ADDRESS_BASE_PATH}/${address}/balance`);
  return resp.data;
};

export const getTransactionsFromAddressService = async (address: string) => {
  const apiRequest = new ApiRequest();
  const { data } = await apiRequest.get(`address/${address}/txs`, {
    params: {
      limit: 10,
    },
  });
  return data;
};
