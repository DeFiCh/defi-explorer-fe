import { QUICK_STATS_ENDPOINT, QUICK_STATS_BASE_ENDPOINT } from "../../constants/endpoint";
import ApiRequest from "../../utils/apiRequest";

export const handleQuickStatus = async () => {
  const apiRequest = new ApiRequest();
  const resp = await apiRequest.get(QUICK_STATS_ENDPOINT, {
    baseURL: QUICK_STATS_BASE_ENDPOINT,
  });
  return processResponse(resp.data)
};

const processResponse: any = (resp: any) => {
  const {
    rewards,
    tokens: { supply },
    blockHeight,
    chain
  } = resp;

  return { rewards, supply, blockHeight, chain };
}
