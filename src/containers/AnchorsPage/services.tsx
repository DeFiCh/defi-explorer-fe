import { I18n } from 'react-redux-i18n';
import moment from 'moment';
import {
  QUICK_STATS_BASE_ENDPOINT,
  MAINNET_API_PREFIX,
  TESTNET_API_PREFIX,
} from '../../constants';
import ApiRequest from '../../utils/apiRequest';

export const handleGetAnchorsList = async (query: { network: string }) => {
  const apiRequest = new ApiRequest();
  const { data } = await apiRequest.get('/v1/getanchorlist', {
    baseURL: QUICK_STATS_BASE_ENDPOINT,
    params: query,
  });
  return {
    ...data,
  };
};

export const handleGetTimestamp = async (query: {
  network: string;
  blockHash: string;
}) => {
  const API_PREFIX =
    query.network === 'mainnet' ? MAINNET_API_PREFIX : TESTNET_API_PREFIX;
  const apiRequest = new ApiRequest();
  const { data } = await apiRequest.get(
    `DFI/${query.network}/block/${query.blockHash}`,
    {
      baseURL: API_PREFIX,
    }
  );

  return {
    ...data,
  };
};
