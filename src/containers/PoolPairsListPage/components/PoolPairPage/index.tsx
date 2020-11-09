import { isEmpty } from 'lodash';
import capitalize from 'lodash/capitalize';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Row, Col } from 'reactstrap';
import KeyValueLi from '../../../../components/KeyValueLi';
import { POOL_LIST_PAGE_URL_NAME } from '../../../../constants';
import TokenAvatar from '../../../../components/TokenAvatar';
import { fetchPoolPairPageStartedRequest } from '../../reducer';
import { setRoute } from '../../../../utils/utility';

interface RouteInfo {
  poolPairId: string;
}

interface TokenPageProps extends RouteComponentProps<RouteInfo> {
  isLoading: boolean;
  data: any;
  isError: string;
  unit: string;
  fetchPoolPairPageStartedRequest: (poolPairId: string | number) => void;
}

const TokenPage = (props: TokenPageProps) => {
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
            <span>
              <TokenAvatar token={data.tokenInfo.idTokenA} />
            </span>
            <span>
              <TokenAvatar token={data.tokenInfo.idTokenB} />
            </span>{' '}
            {I18n.t('containers.poolPairPage.titlePair', {
              symbol: data.symbol,
            })}
          </h1>
          <Row>
            <Col xs='12' md='4'>
              <KeyValueLi
                label={I18n.t('containers.poolPairPage.oneCurrencyLabel', {
                  symbol: data.tokenInfo.idTokenA.symbol,
                })}
                value={`${data['reserveB/reserveA']}`}
              />
            </Col>
            <Col xs='12' md='4'>
              <KeyValueLi
                label={I18n.t('containers.poolPairPage.oneCurrencyLabel', {
                  symbol: data.tokenInfo.idTokenB.symbol,
                })}
                value={`${data['reserveA/reserveB']}`}
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
                label={I18n.t('containers.poolPairPage.totalLiquidity')}
                value={`$ ${(
                  data.liquidityReserveOfTokens.idTokenA +
                  data.liquidityReserveOfTokens.idTokenB
                ).toFixed(2)}`}
              />
            </Col>
            <Col xs='12' md='4'>
              <KeyValueLi
                label={I18n.t('containers.poolPairPage.reserve', {
                  symbol: data.tokenInfo.idTokenA.symbol,
                })}
                value={I18n.t('containers.poolPairPage.reserveData', {
                  value: data.reserveA,
                  symbol: data.tokenInfo.idTokenA.symbol,
                })}
              />
            </Col>

            <Col xs='12' md='4'>
              <KeyValueLi
                label={I18n.t('containers.poolPairPage.reserve', {
                  symbol: data.tokenInfo.idTokenB.symbol,
                })}
                value={I18n.t('containers.poolPairPage.reserveData', {
                  value: data.reserveB,
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
            <Col xs='12' md='8'>
              <KeyValueLi
                label={I18n.t('containers.poolPairPage.ownerAddress')}
                value={`${data.ownerAddress}`}
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

export default connect(mapStateToProps, mapDispatchToProps)(TokenPage);
