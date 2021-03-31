import { ADDRESS_BASE_PATH, GET_ADDRESS, GET_BLOCK } from '../../constants';
import ApiRequest from '../../utils/apiRequest';

export const getAddressService = async (address: string) => {
  const apiRequest = new ApiRequest();
  const resp = await apiRequest.get(`${ADDRESS_BASE_PATH}/${address}/balance`);
  return resp.data;
};

export const getTransactionsFromAddressService = async (
  address: string,
  query: any = {}
) => {
  const apiRequest = new ApiRequest();
  const { data } = await apiRequest.get(
    `${ADDRESS_BASE_PATH}/${address}/transactions`,
    {
      params: query,
    }
  );
  return data;
};

export const getTotalTransactionFromAddressCount = async (address: string) => {
  const apiRequest = new ApiRequest();
  const { data } = await apiRequest.get(
    `${GET_ADDRESS}/${address}/newtxs/total`
  );
  return data;
};

export const getConfirmations = async () => {
  const apiRequest = new ApiRequest();
  const { data } = await apiRequest.get(`${GET_BLOCK}/tip`);
  return data.height;
};
