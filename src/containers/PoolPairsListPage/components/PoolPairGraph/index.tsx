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
import { DEFAULT_DECIMAL_PLACE } from '../../../../constants';
import 'chartjs-plugin-zoom';

interface PoolPairsGraphProps {
  fetchPoolPairGraphStarted: (
    poolPairId?: string | number,
    type?: string,
    start?: Date | String,
    end?: Date | String
  ) => void;
  isLoading: boolean;
  data: any[];
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

  const [graphData, setGraphData] = useState<any[]>([]);
  const [graphType, setGraphType] = useState<string>('year');

  useEffect(() => {
    fetchPoolPairGraphStarted(poolPairId, graphType);
  }, []);

  useEffect(() => {
    setGraphData(data);
  }, [data]);

  const toggleSearch = (type) => {
    setGraphType(type);
    fetchPoolPairGraphStarted(poolPairId, type);
  };

  const lineData = getDatasetForGraph(isLoading, graphData, graphType);

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
                <Button color='primary'>
                  {I18n.t('containers.poolPairGraph.liquidity')}
                </Button>
              </Col>
              <Col xs='6'>
                <ButtonGroup className={styles.buttonGroup}>
                  <Button
                    className={graphType === 'year' ? styles.buttonActive : ''}
                    color='link'
                    onClick={() => toggleSearch('year')}
                  >
                    {I18n.t('containers.poolPairGraph.year')}
                  </Button>
                  <Button
                    className={graphType === 'month' ? styles.buttonActive : ''}
                    color='link'
                    onClick={() => toggleSearch('month')}
                  >
                    {I18n.t('containers.poolPairGraph.month')}
                  </Button>
                  <Button
                    className={graphType === 'week' ? styles.buttonActive : ''}
                    color='link'
                    onClick={() => toggleSearch('week')}
                  >
                    {I18n.t('containers.poolPairGraph.week')}
                  </Button>
                  <Button
                    className={graphType === 'day' ? styles.buttonActive : ''}
                    color='link'
                    onClick={() => toggleSearch('day')}
                  >
                    {I18n.t('containers.poolPairGraph.day')}
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
            <Row className='mt-4'>
              <Line data={lineData} height={50} options={options} />
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
    poolPairsListPage: { poolPairGraph },
  } = state;
  return {
    isLoading: poolPairGraph.isLoading,
    data: poolPairGraph.data,
    isError: poolPairGraph.isError,
  };
};

const mapDispatchToProps = {
  fetchPoolPairGraphStarted: (
    poolPairId?: string | number,
    type?: string,
    start?: any,
    end?: any
  ) => fetchPoolPairGraphStartedRequest({ poolPairId, type, start, end }),
};

export default connect(mapStateToProps, mapDispatchToProps)(PoolPairGraph);
