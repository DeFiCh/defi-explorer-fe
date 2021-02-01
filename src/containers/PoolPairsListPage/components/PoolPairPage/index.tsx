import { isEmpty } from 'lodash';
import capitalize from 'lodash/capitalize';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Col,
  UncontrolledTooltip,
  PopoverBody,
} from 'reactstrap';
import KeyValueLi from '../../../../components/KeyValueLi';
import {
  DEFAULT_DECIMAL_PLACE,
  POOL_LIST_PAGE_URL_NAME,
} from '../../../../constants';
import { fetchPoolPairPageStartedRequest } from '../../reducer';
import { numberWithCommas, setRoute } from '../../../../utils/utility';
import styles from '../../PoolPairsListPage.module.scss';
import { PoolPairIcon } from '../PoolPairIcon';
import PoolPairPageTable from '../PoolPairPageTable';

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
            <PoolPairIcon
              symbolA={data.tokenASymbol}
              symbolB={data.tokenBSymbol}
            />
            &nbsp;
            <span>
              <div className={styles.iconTitle}>{data.symbol}</div>
            </span>
          </h1>
          <Row>
            <Col xs='12' md='4'>
              <KeyValueLi
                label={I18n.t('containers.poolPairPage.oneCurrencyLabel', {
                  symbol: data.tokenASymbol,
                })}
                value={`${numberWithCommas(data['reserveB/reserveA'])}`}
              />
            </Col>
            <Col xs='12' md='4'>
              <KeyValueLi
                label={I18n.t('containers.poolPairPage.oneCurrencyLabel', {
                  symbol: data.tokenBSymbol,
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
                label={
                  <>
                    {I18n.t('containers.poolPairPage.totalLiquidityUsd')}
                    &nbsp;
                    <span className={styles.subHeader}>
                      {I18n.t('containers.poolPairPage.usd')}
                    </span>
                  </>
                }
                value={`${numberWithCommas(
                  data.totalLiquidity,
                  DEFAULT_DECIMAL_PLACE
                )}`}
              />
            </Col>
            <Col xs='12' md='4'>
              <KeyValueLi
                label={
                  <>
                    {I18n.t('containers.poolPairPage.totalLiquidity')}
                    &nbsp;
                    <span className={styles.subHeader}>
                      {I18n.t('containers.poolPairPage.lpToken')}
                    </span>
                  </>
                }
                value={`${numberWithCommas(
                  data.totalLiquidityLpToken,
                  DEFAULT_DECIMAL_PLACE
                )}`}
              />
            </Col>
            <Col xs='12' md='4'>
              <KeyValueLi
                label={I18n.t('containers.poolPairPage.reserve', {
                  symbol: data.tokenASymbol,
                })}
                value={I18n.t('containers.poolPairPage.reserveData', {
                  value: numberWithCommas(data.reserveA, DEFAULT_DECIMAL_PLACE),
                  symbol: data.tokenASymbol,
                })}
              />
            </Col>
            <Col xs='12' md='4'>
              <KeyValueLi
                label={I18n.t('containers.poolPairPage.reserve', {
                  symbol: data.tokenBSymbol,
                })}
                value={I18n.t('containers.poolPairPage.reserveData', {
                  value: numberWithCommas(data.reserveB, DEFAULT_DECIMAL_PLACE),
                  symbol: data.tokenBSymbol,
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
                label={
                  <>
                    {I18n.t('containers.poolPairPage.yearlyPoolRewardUSD')}
                    &nbsp;
                    <span className={styles.subHeader}>
                      {I18n.t('containers.poolPairPage.usd')}
                    </span>
                  </>
                }
                value={`${numberWithCommas(
                  data.yearlyPoolReward,
                  DEFAULT_DECIMAL_PLACE
                )}`}
              />
            </Col>

            <Col xs='12' md='4'>
              <KeyValueLi
                label={
                  <>
                    {I18n.t('containers.poolPairPage.volume', {
                      symbol: data.tokenASymbol,
                    })}
                    &nbsp;
                    <span className={styles.subHeader}>
                      {I18n.t('containers.poolPairPage.24hr')}
                    </span>
                  </>
                }
                value={numberWithCommas(data.volumeA, DEFAULT_DECIMAL_PLACE)}
              />
            </Col>
            <Col xs='12' md='4'>
              <KeyValueLi
                label={
                  <>
                    {I18n.t('containers.poolPairPage.volume', {
                      symbol: data.tokenBSymbol,
                    })}
                    &nbsp;
                    <span className={styles.subHeader}>
                      {I18n.t('containers.poolPairPage.24hr')}
                    </span>
                  </>
                }
                value={numberWithCommas(data.volumeB, DEFAULT_DECIMAL_PLACE)}
              />
            </Col>
            <Col xs='12' md='4'>
              <KeyValueLi
                label={
                  <>
                    {I18n.t('containers.poolPairPage.totalVolume')}
                    &nbsp;
                    <span className={styles.subHeader}>
                      {I18n.t('containers.poolPairPage.24hr')}
                    </span>
                  </>
                }
                value={numberWithCommas(
                  data.totalVolume,
                  DEFAULT_DECIMAL_PLACE
                )}
              />
            </Col>

            <Col xs='12' md='4'>
              <KeyValueLi
                label={I18n.t('containers.poolPairPage.apy')}
                value={
                  <>
                    <span className={styles.pointer} id={`apyinfo`}>
                      {numberWithCommas(data.totalApy, DEFAULT_DECIMAL_PLACE)} %
                    </span>
                    <UncontrolledTooltip
                      target={`apyinfo`}
                      innerClassName='bg-white text-break w-90 h-50 border'
                    >
                      <PopoverBody>
                        <div>
                          {`${I18n.t(
                            'containers.poolPairsListPage.apy'
                          )} : ${numberWithCommas(
                            data.apy,
                            DEFAULT_DECIMAL_PLACE
                          )}`}
                          &nbsp;%
                        </div>
                        <div>
                          {`${I18n.t(
                            'containers.poolPairsListPage.commission'
                          )} : ${numberWithCommas(
                            data.commission,
                            DEFAULT_DECIMAL_PLACE
                          )}`}
                          &nbsp;%
                        </div>
                      </PopoverBody>
                    </UncontrolledTooltip>
                  </>
                }
                noEllipsis
              />
            </Col>
            <Col xs='12' md='4'>
              <KeyValueLi
                label={I18n.t('containers.poolPairPage.rewardPct')}
                value={`${numberWithCommas(
                  parseFloat(data.rewardPct) * 100,
                  2
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
          {poolPairId && <PoolPairPageTable poolPairId={poolPairId} />}
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
