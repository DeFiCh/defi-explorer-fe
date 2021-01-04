import { isEmpty } from 'lodash';
import capitalize from 'lodash/capitalize';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Row, Col } from 'reactstrap';
import KeyValueLi from '../../../../components/KeyValueLi';
import { POOL_LIST_PAGE_URL_NAME } from '../../../../constants';
import { fetchPoolPairPageStartedRequest } from '../../reducer';
import { numberWithCommas, setRoute } from '../../../../utils/utility';
import styles from '../../PoolPairsListPage.module.scss';
import { PoolPairIcon } from '../PoolPairIcon';
import BigNumber from 'bignumber.js';

interface RouteInfo {
  poolPairId: string;
}

interface PoolPairPageProps extends RouteComponentProps<RouteInfo> {
  isLoading: boolean;
  data: any;
  isError: string;
  unit: string;
  fetchPoolPairPageStartedRequest: (poolPairId: string | number) => void;
}

const PoolPairPage = (props: PoolPairPageProps) => {
  const {
    data,
    isError,
    fetchPoolPairPageStartedRequest,
    match: {
      params: { poolPairId },
    },
  } = props;

  useEffect(() => {
    fetchPoolPairPageStartedRequest(poolPairId);
  }, []);

  if (isError) return <>{isError}</>;
  if (!isEmpty(data)) {
    return (
      <>
        <div className='mt-4'>
          <Breadcrumb tag='nav' listTag='div'>
            <BreadcrumbItem
              tag={NavLink}
              to={setRoute(POOL_LIST_PAGE_URL_NAME)}
            >
              {I18n.t('containers.poolPairPage.poolPairListPageBreadCrumb')}
            </BreadcrumbItem>
            {` > `}
            <BreadcrumbItem active tag='span'>
              {data.symbol}
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className='mt-4'>
          <h1>
            <PoolPairIcon data={data} />
            &nbsp;
            <span>
              <div className={styles.iconTitle}>{data.symbol}</div>
            </span>
          </h1>
          <Row>
            <Col xs='12' md='4'>
              <KeyValueLi
                label={I18n.t('containers.poolPairPage.oneCurrencyLabel', {
                  symbol: data.tokenInfo.idTokenA.symbolKey,
                })}
                value={`${numberWithCommas(data['reserveB/reserveA'])}`}
              />
            </Col>
            <Col xs='12' md='4'>
              <KeyValueLi
                label={I18n.t('containers.poolPairPage.oneCurrencyLabel', {
                  symbol: data.tokenInfo.idTokenB.symbolKey,
                })}
                value={`${numberWithCommas(data['reserveA/reserveB'])}`}
              />
            </Col>
            <Col xs='12' md='4'>
              <KeyValueLi
                label={I18n.t('containers.poolPairPage.poolPairId')}
                value={data.poolPairId}
              />
            </Col>
            <Col xs='12' md='4'>
              <KeyValueLi
                label={I18n.t('containers.poolPairPage.totalLiquidityUsd')}
                value={`${numberWithCommas(
                  new BigNumber(data.totalLiquidityUsd).toFixed(2)
                )}`}
              />
            </Col>
            <Col xs='12' md='4'>
              <KeyValueLi
                label={I18n.t('containers.poolPairPage.totalLiquidity')}
                value={`${numberWithCommas(
                  new BigNumber(data.totalLiquidity).toFixed(2)
                )}`}
              />
            </Col>
            <Col xs='12' md='4'>
              <KeyValueLi
                label={I18n.t('containers.poolPairPage.reserve', {
                  symbol: data.tokenInfo.idTokenA.symbolKey,
                })}
                value={I18n.t('containers.poolPairPage.reserveData', {
                  value: numberWithCommas(data.reserveA),
                  symbol: data.tokenInfo.idTokenA.symbol,
                })}
              />
            </Col>

            <Col xs='12' md='4'>
              <KeyValueLi
                label={I18n.t('containers.poolPairPage.reserve', {
                  symbol: data.tokenInfo.idTokenB.symbolKey,
                })}
                value={I18n.t('containers.poolPairPage.reserveData', {
                  value: numberWithCommas(data.reserveB),
                  symbol: data.tokenInfo.idTokenB.symbol,
                })}
              />
            </Col>

            <Col xs='12' md='4'>
              <KeyValueLi
                label={I18n.t('containers.poolPairPage.tradeEnabled')}
                value={capitalize(data.tradeEnabled)}
              />
            </Col>
            <Col xs='12' md='4'>
              <KeyValueLi
                label={I18n.t('containers.poolPairPage.yearlyPoolRewardUSD')}
                value={`${numberWithCommas(data.yearlyPoolReward)}`}
              />
            </Col>
            <Col xs='12' md='4'>
              <KeyValueLi
                label={I18n.t('containers.poolPairPage.apy')}
                value={`${numberWithCommas(
                  new BigNumber(data.apy).toFixed(2)
                )} %`}
              />
            </Col>

            <Col xs='12' md='4'>
              <KeyValueLi
                label={I18n.t('containers.poolPairPage.rewardPct')}
                value={`${numberWithCommas(
                  parseFloat(data.rewardPct) * 100
                )} %`}
              />
            </Col>

            <Col xs='12' md='8'>
              <KeyValueLi
                label={I18n.t('containers.poolPairPage.ownerAddress')}
                value={`${data.ownerAddress}`}
                noEllipsis
              />
            </Col>
          </Row>
        </div>
      </>
    );
  }
  return <>{I18n.t('containers.poolPairPage.loading')}</>;
};

const mapStateToProps = (state) => {
  const {
    poolPairsListPage: { poolPairPage },
    app: { unit },
  } = state;
  return {
    isLoading: poolPairPage.isLoading,
    data: poolPairPage.data,
    isError: poolPairPage.isError,
    unit,
  };
};

const mapDispatchToProps = {
  fetchPoolPairPageStartedRequest: (poolPairId) =>
    fetchPoolPairPageStartedRequest({ poolPairId }),
};

export default connect(mapStateToProps, mapDispatchToProps)(PoolPairPage);
