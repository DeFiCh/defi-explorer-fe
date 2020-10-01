import ApiRequest from "../../utils/apiRequest";

export const handleLatestBlockService = async (query) => {
  const api = new ApiRequest();
  return api.get("block", {
    params: query,
  });
};

export const handleLatestTransactionsService = async () => {
  const api = new ApiRequest();
  return api.get("tx/latest");
};
