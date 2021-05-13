import { I18n } from 'react-redux-i18n';
import moment from 'moment';
import { QUICK_STATS_BASE_ENDPOINT } from '../../constants';
import ApiRequest from '../../utils/apiRequest';

export const handleGetTxInfo = async (query: {
  network: string;
  txid: string;
}) => {
  const apiRequest = new ApiRequest();
  const { data } = await apiRequest.get('/v1/getcustomtx', {
    baseURL: QUICK_STATS_BASE_ENDPOINT,
    params: query,
  });
  return {
    ...data,
  };
};
