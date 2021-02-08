import {
  BLOCK_PAGE_BASE_PATH,
  COIN_GECKO_BASE_ENDPOINT,
  QUICK_STATS_BASE_ENDPOINT,
  VS_CURRENCIES,
  DEFAULT_BILLION,
  DEFAULT_MILLION,
  DEFAULT_THOUSANDS,
} from '../../constants';
import ApiRequest from '../../utils/apiRequest';
import moment from 'moment';

export const handlePoolPairList = async (query: { network: string }) => {
  const apiRequest = new ApiRequest();

  const { data } = await apiRequest.get('/v1/listyieldfarming', {
    baseURL: QUICK_STATS_BASE_ENDPOINT,
    params: query,
  });
  return data;
};

export const handleGetPoolPair = async (query: {
  network: string;
  id: string | number;
}) => {
  const { id } = query;
  const apiRequest = new ApiRequest();
  const { data } = await apiRequest.get('/v1/getpoolpair', {
    baseURL: QUICK_STATS_BASE_ENDPOINT,
    params: query,
  });
  return {
    ...data,
    poolPairId: id,
  };
};

export const fetchCoinGeckoCoinsList = async (list: any[]) => {
  const queryParams = {
    vs_currencies: VS_CURRENCIES,
    ids: list.map((item) => item.value).join(','),
  };
  const apiRequest = new ApiRequest();
  const { data } = await apiRequest.get('/simple/price', {
    baseURL: COIN_GECKO_BASE_ENDPOINT,
    params: queryParams,
  });

  const result = list.map((item) => {
    const fiatCurrencyData = data[item.value] || {};
    return { value: fiatCurrencyData[VS_CURRENCIES] || 0, label: item.label };
  });
  return result;
};

export const fetchGetGov = async (queryParams: {
  name: string;
  network: string;
}) => {
  const { name } = queryParams;
  const apiRequest = new ApiRequest();
  const { data } = await apiRequest.get('/v1/getgov', {
    baseURL: QUICK_STATS_BASE_ENDPOINT,
    params: queryParams,
  });
  return data[name];
};

export const getSwapTransaction = async (queryParams: {
  id: string;
  network: string;
  limit: number;
  skip: number;
  sort: any;
}) => {
  const apiRequest = new ApiRequest();
  const data = await apiRequest.get('v1/getswaptransaction', {
    baseURL: QUICK_STATS_BASE_ENDPOINT,
    params: queryParams,
  });
  return data;
};

export const getPoolPairGraph = async (queryParams: {
  id: string;
  network: string;
  type: string;
  start: string;
  end: string;
}) => {
  const apiRequest = new ApiRequest();
  const data = await apiRequest.get('v1/gettotalvolumestats', {
    baseURL: QUICK_STATS_BASE_ENDPOINT,
    params: queryParams,
  });
  return data;
};

export const getBlockDetailService = async (blockHeight: string) => {
  const apiRequest = new ApiRequest();
  const { data } = await apiRequest.get(
    `${BLOCK_PAGE_BASE_PATH}/${blockHeight}`
  );
  return data;
};

export const getLabelsForPoolPairGraph = (graphData: any, type: string) => {
  switch (type) {
    case 'year':
      return Object.values(graphData).map((val: any) => val.year);
    case 'month':
      return Object.values(graphData).map(
        (val: any) => `${val.month}, (${val.year})`
      );
    case 'week':
      return Object.values(graphData).map(
        (val: any) => `Week ${val.week}, ${val.year}`
      );
    case 'day':
      return Object.values(graphData).map(
        (val: any) => `${val.day}/${val.month}/${val.year}`
      );
    default:
      return null;
  }
};

export const getDateRangeForPoolPairGraph = (
  graphData: any,
  type: string,
  index: number
) => {
  const eachGraphData = Object.values(graphData)[index];
  if (eachGraphData) {
    if (type === 'year') {
      const { year }: any = eachGraphData;
      const date = moment.utc([year]).clone();
      const start = date.startOf('year').format();
      const end = date.endOf('year').format();
      return { start, end, nextType: 'month' };
    } else if (type === 'month') {
      const { year, monthId }: any = eachGraphData;
      const date = moment.utc([year, monthId - 1]).clone();
      const start = date.startOf('month').format();
      const end = date.endOf('month').format();
      return { start, end, nextType: 'day' };
    }
  }
  return { start: null, end: null, nextType: type };
};

export const getFormatedNumber = (num) => {
  if (num >= DEFAULT_BILLION) {
    return `${num / DEFAULT_BILLION} b`;
  } else if (num >= DEFAULT_MILLION) {
    return `${num / DEFAULT_MILLION} m`;
  } else if (num >= DEFAULT_THOUSANDS) {
    return `${num / DEFAULT_THOUSANDS} k`;
  }
  return num;
};

export const getDatasetForGraph = (isLoading, graphData, type) => {
  const style = getComputedStyle(document.body);
  const primary = style.getPropertyValue('--primary');
  return {
    labels: isLoading
      ? ['', 'Loading', '']
      : getLabelsForPoolPairGraph(graphData, type),
    datasets: [
      {
        fill: false,
        lineTension: 0.2,
        backgroundColor: primary,
        borderColor: primary,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        borderWidth: '2',
        pointBorderColor: primary,
        pointBackgroundColor: primary,
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: primary,
        pointHoverBorderColor: primary,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: isLoading
          ? []
          : Object.values(
              Object.values(graphData).map((val: any) => val.totalVolume)
            ),
      },
    ],
  };
};

export const getScalesForGraph = (isLoading) => {
  return {
    xAxes: [{ gridLines: { display: false } }],
    yAxes: [
      {
        position: 'right',
        ticks: {
          display: !isLoading,
          callback: (value) => getFormatedNumber(value),
        },
      },
    ],
  };
};

export const getOptionsForGraph = (isLoading) => {
  return {
    scales: getScalesForGraph(isLoading),
    legend: {
      display: false,
    },
    zoom: {
      enabled: true,
      mode: 'x',
    },
    pan: {
      enabled: true,
      mode: 'x',
    },
  };
};
