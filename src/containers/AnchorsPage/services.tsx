import { I18n } from 'react-redux-i18n';
import moment from 'moment';
import {
  QUICK_STATS_BASE_ENDPOINT,
  BLOCK_PAGE_BASE_PATH,
} from '../../constants';
import ApiRequest from '../../utils/apiRequest';

export const getBlockDetailService = async (blockHeight: string) => {
  const apiRequest = new ApiRequest();
  const { data } = await apiRequest.get(
    `${BLOCK_PAGE_BASE_PATH}/${blockHeight}`
  );
  return data;
};

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
