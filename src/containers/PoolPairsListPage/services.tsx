import { I18n } from 'react-redux-i18n';
import moment from 'moment';
import {
  BLOCK_PAGE_BASE_PATH,
  COIN_GECKO_BASE_ENDPOINT,
  QUICK_STATS_BASE_ENDPOINT,
  VS_CURRENCIES,
  DEFAULT_BILLION,
  DEFAULT_MILLION,
  DEFAULT_THOUSANDS,
  GRANULARITY_DAY,
  GRANULARITY_MONTH,
  GRANULARITY_WEEK,
  GRANULARITY_YTD,
} from '../../constants';
import ApiRequest from '../../utils/apiRequest';

export const handleBlockCount = async (query: { network: string }) => {
  const apiRequest = new ApiRequest();

  const { data: blockCount } = await apiRequest.get('/v1/getblockcount', {
    baseURL: QUICK_STATS_BASE_ENDPOINT,
    params: query,
  });
  return blockCount.data;
};

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
  const data = await apiRequest.get('v1/getliquiditytotalvolumedata', {
    baseURL: QUICK_STATS_BASE_ENDPOINT,
    params: queryParams,
  });
  return data;
};

export const getPoolPairVolumeGraph = async (queryParams: {
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

export const getPoolPairAddRemoveLP = async (queryParams: {
  id: string;
  network: string;
  skip?: number;
  limit?: number;
  sort?: any;
}) => {
  const apiRequest = new ApiRequest();
  const data = await apiRequest.get('v1/getpoolpairlplist', {
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

export const getMonthById = (monthId) => {
  const months = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return months[monthId - 1];
};

export const getLabelsForPoolPairGraph = (
  graphData: string[],
  type: string
) => {
  switch (type) {
    case GRANULARITY_YTD:
      return graphData.map(
        (val: any) => `${val.day}/${getMonthById(val.monthId)}/${val.year}`
      );
    case GRANULARITY_MONTH:
    case GRANULARITY_WEEK:
      return graphData.map((val: any) => {
        const date = new Date(val.year, val.monthId, val.day, val.hour);
        return `${date.getHours()}:00, ${val.day}/${getMonthById(val.monthId)}`;
      });
    case GRANULARITY_DAY:
      return graphData.map((val: any) => {
        const date = new Date(
          val.year,
          val.monthId,
          val.day,
          val.hour,
          val.minute
        );
        return `${date.getHours()}:${date.getMinutes()}, ${
          val.day
        }/${getMonthById(val.monthId)}`;
      });
    default:
      return null;
  }
};

export const getDateRangeForPoolPairGraph = (
  graphData: any,
  type: string,
  index: number
) => {
  const eachGraphData = graphData.labels[index];
  const { year, monthId, day }: any = eachGraphData;
  if (eachGraphData) {
    if (type === GRANULARITY_YTD) {
      return {
        start: moment
          .utc([year, monthId - 1, day])
          .clone()
          .startOf('day')
          .format(),
        end: moment
          .utc([year, monthId - 1, day])
          .clone()
          .endOf('day')
          .format(),
        nextType: GRANULARITY_MONTH,
      };
    }
    if (type === GRANULARITY_MONTH) {
      const { hour } = eachGraphData;
      return {
        start: moment
          .utc([year, monthId - 1, day, hour])
          .clone()
          .startOf('hour')
          .format(),
        end: moment
          .utc([year, monthId - 1, day, hour])
          .clone()
          .endOf('hour')
          .format(),
        nextType: GRANULARITY_DAY,
      };
    }
    if (type === GRANULARITY_WEEK) {
      const { hour } = eachGraphData;
      return {
        start: moment
          .utc([year, monthId - 1, day, hour])
          .clone()
          .startOf('hour')
          .format(),
        end: moment
          .utc([year, monthId - 1, day, hour])
          .clone()
          .endOf('hour')
          .format(),
        nextType: GRANULARITY_DAY,
      };
    }
  }
  return { start: null, end: null, nextType: type };
};

export const getFormatedNumber = (num) => {
  if (num >= DEFAULT_BILLION) {
    return `${num / DEFAULT_BILLION} b`;
  }
  if (num >= DEFAULT_MILLION) {
    return `${num / DEFAULT_MILLION} m`;
  }
  if (num >= DEFAULT_THOUSANDS) {
    return `${num / DEFAULT_THOUSANDS} k`;
  }
  return num;
};

export const getDatasetForGraph = (
  data,
  type,
  sym1 = '',
  sym2 = '',
  isVolumeGraph = false
) => {
  const style = getComputedStyle(document.body);
  const primary = style.getPropertyValue('--primary');
  const secondary = style.getPropertyValue('--secondary');
  const info = style.getPropertyValue('--info');

  const datasets = [
    {
      label: `${sym1}`,
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
      data: data.values,
    },
  ];
  if (isVolumeGraph) {
    datasets.push({
      fill: false,
      label: `${sym2}`,
      lineTension: 0.2,
      backgroundColor: secondary,
      borderColor: secondary,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      borderWidth: '2',
      pointBorderColor: secondary,
      pointBackgroundColor: secondary,
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: secondary,
      pointHoverBorderColor: secondary,
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: data.values2,
    });

    datasets.push({
      fill: false,
      label: `Total Volume`,
      lineTension: 0.2,
      backgroundColor: info,
      borderColor: info,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      borderWidth: '2',
      pointBorderColor: info,
      pointBackgroundColor: info,
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: info,
      pointHoverBorderColor: info,
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: data.totalVolumes,
    });
  }
  return {
    labels: getLabelsForPoolPairGraph(data.labels, type),
    datasets,
  };
};

export const getScalesForGraph = (isLoading) => ({
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
});

export const getOptionsForGraph = (isLoading, legend = false) => ({
  scales: getScalesForGraph(isLoading),
  legend: {
    display: legend,
  },
  zoom: {
    enabled: true,
    mode: 'x',
  },
  pan: {
    enabled: true,
    mode: 'x',
  },
});
