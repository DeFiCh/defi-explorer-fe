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
import { I18n } from 'react-redux-i18n';
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
  const data = await apiRequest.get('v1/getliquiditytotalvolumedata', {
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
    case 'year':
      return graphData.map((val: any) => val.year);
    case 'month':
      return graphData.map(
        (val: any) => `${getMonthById(val.monthId)}, (${val.year})`
      );
    case 'week':
      return graphData.map(
        (val: any) =>
          `${I18n.t('containers.poolPairGraph.week')} ${val.week}, ${val.year}`
      );
    case 'day':
      return graphData.map(
        (val: any) => `${val.day}/${getMonthById(val.monthId)}/${val.year}`
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
  const eachGraphData = graphData.labels[index];
  const { year }: any = eachGraphData;
  if (eachGraphData) {
    if (type === 'year') {
      return {
        start: moment.utc([year]).clone().startOf('year').format(),
        end: moment.utc([year]).clone().endOf('year').format(),
        nextType: 'month',
      };
    } else if (type === 'month') {
      const { monthId }: any = eachGraphData;
      return {
        start: moment
          .utc([year, monthId - 1])
          .clone()
          .startOf('month')
          .format(),
        end: moment
          .utc([year, monthId - 1])
          .clone()
          .endOf('month')
          .format(),
        nextType: 'day',
      };
    } else if (type === 'week') {
      const { week }: any = eachGraphData;
      return {
        start: moment
          .utc(`${year}`)
          .add(week, 'weeks')
          .startOf('week')
          .format(),
        end: moment.utc(`${year}`).add(week, 'weeks').endOf('week').format(),
        nextType: 'day',
      };
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

export const getDatasetForGraph = (data, type) => {
  const style = getComputedStyle(document.body);
  const primary = style.getPropertyValue('--primary');
  return {
    labels: getLabelsForPoolPairGraph(data.labels || [], type),
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
        data: data.values || [],
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
