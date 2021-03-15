/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-quotes */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { Row, Col, Card, CardBody, ButtonGroup, Button } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import styles from '../../PoolPairsListPage.module.scss';
import { fetchPoolPairGraphStartedRequest } from '../../reducer';
import {
  getDateRangeForPoolPairGraph,
  getDatasetForGraph,
  getOptionsForGraph,
} from '../../services';
import { numberWithCommas } from '../../../../utils/utility';
import {
  DEFAULT_DECIMAL_PLACE,
  GRANULARITY_DAY,
  GRANULARITY_MONTH,
  GRANULARITY_WEEK,
  GRANULARITY_YTD,
} from '../../../../constants';
import 'chartjs-plugin-zoom';

interface PoolPairsGraphProps {
  fetchPoolPairGraphStarted: (
    poolPairId?: string | number,
    type?: string,
    start?: Date | string,
    end?: Date | string
  ) => void;
  isLoading: boolean;
  data: any;
  isError: string;
  poolPairId?: string | number;
}

const PoolPairGraph = (props: PoolPairsGraphProps) => {
  const {
    fetchPoolPairGraphStarted,
    isLoading,
    data,
    isError,
    poolPairId,
  } = props;
  const [graphType, setGraphType] = useState<string>(GRANULARITY_YTD);
  const [graphData, setGraphData] = useState({
    labels: [],
    values: [],
  });

  useEffect(() => {
    fetchPoolPairGraphStarted(poolPairId, graphType);
  }, []);

  useEffect(() => {
    if (!isLoading && !!data.labels && !!data.values) {
      setGraphData(data);
    } else {
      setGraphData({
        labels: [],
        values: [],
      });
    }
  }, [isLoading, data]);

  const toggleSearch = (type) => {
    setGraphType(type);
    fetchPoolPairGraphStarted(poolPairId, type);
  };

  const lineData = getDatasetForGraph(graphData, graphType);

  const { zoom, scales, legend, pan } = getOptionsForGraph(isLoading);

  const options = {
    onClick(e) {
      const xLabel = this.scales['x-axis-0'].getValueForPixel(e.x);
      const { start, end, nextType } = getDateRangeForPoolPairGraph(
        graphData,
        graphType,
        xLabel
      );
      if (start && end) {
        fetchPoolPairGraphStarted(poolPairId, nextType, start, end);
        setGraphType(nextType);
      }
    },
    tooltips: {
      callbacks: {
        label: (tooltipItems) =>
          ` ${numberWithCommas(tooltipItems.yLabel, DEFAULT_DECIMAL_PLACE)}`,
      },
    },
    zoom,
    legend,
    pan,
    scales,
  };

  return (
    <Row className='mt-5'>
      <Col xs='12'>
        <Card className={styles.card}>
          <CardBody>
            <Row>
              <Col xs='6'>
                <Button
                  color='primary'
                  onClick={() => toggleSearch(GRANULARITY_YTD)}
                >
                  {I18n.t('containers.poolPairGraph.liquidity')}
                </Button>
              </Col>
              <Col xs='6'>
                <ButtonGroup className={styles.buttonGroup}>
                  <Button
                    className={
                      graphType === GRANULARITY_YTD ? styles.buttonActive : ''
                    }
                    color='link'
                    onClick={() => toggleSearch(GRANULARITY_YTD)}
                  >
                    {I18n.t('containers.poolPairGraph.y')}
                  </Button>
                  <Button
                    className={
                      graphType === GRANULARITY_MONTH ? styles.buttonActive : ''
                    }
                    color='link'
                    onClick={() => toggleSearch(GRANULARITY_MONTH)}
                  >
                    {I18n.t('containers.poolPairGraph.m')}
                  </Button>
                  <Button
                    className={
                      graphType === GRANULARITY_WEEK ? styles.buttonActive : ''
                    }
                    color='link'
                    onClick={() => toggleSearch(GRANULARITY_WEEK)}
                  >
                    {I18n.t('containers.poolPairGraph.w')}
                  </Button>
                  <Button
                    className={
                      graphType === GRANULARITY_DAY ? styles.buttonActive : ''
                    }
                    color='link'
                    onClick={() => toggleSearch(GRANULARITY_DAY)}
                  >
                    {I18n.t('containers.poolPairGraph.d')}
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
            <Row className='mt-4'>
              <Line height={50} data={lineData} options={options} />
            </Row>
            {isError && <>{isError}</>}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  const {
    poolPairsListPage: {
      poolPairGraph: { isLoading, isError, data },
    },
  } = state;
  return {
    isLoading,
    isError,
    data,
  };
};

const mapDispatchToProps = {
  fetchPoolPairGraphStarted: (
    poolPairId?: string | number,
    type?: string,
    start?: any,
    end?: any
  ) =>
    fetchPoolPairGraphStartedRequest({
      poolPairId,
      type,
      start,
      end,
    }),
};

export default connect(mapStateToProps, mapDispatchToProps)(PoolPairGraph);
