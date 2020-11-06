import isEmpty from 'lodash/isEmpty';
import capitalize from 'lodash/capitalize';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Col, Row } from 'reactstrap';
import KeyValueLi from '../../../../components/KeyValueLi';
import { TOKEN_LIST_PAGE_URL_NAME } from '../../../../constants';
import { fetchTokenPageStartedRequest } from '../../reducer';
import PoolPairsTable from '../../../PoolPairsListPage/components/PoolPairsTable';
import TokenAvatar from '../../../../components/TokenAvatar';
import { setRoute } from '../../../../utils/utility';

interface RouteInfo {
  tokenId: string;
}

interface TokenPageProps extends RouteComponentProps<RouteInfo> {
  isLoading: boolean;
  data: any;
  isError: string;
  unit: string;
  fetchTokenPageStartedRequest: (tokenId: string | number) => void;
}

const TokenPage = (props: TokenPageProps) => {
  const {
    data,
    isError,
    fetchTokenPageStartedRequest,
    match: {
      params: { tokenId },
    },
  } = props;

  useEffect(() => {
    fetchTokenPageStartedRequest(tokenId);
  }, []);

  if (isError) return <>{isError}</>;
  if (!isEmpty(data)) {
    return (
      <>
        <div className='mt-4'>
          <Breadcrumb tag='nav' listTag='div'>
            <BreadcrumbItem
              tag={NavLink}
              to={setRoute(TOKEN_LIST_PAGE_URL_NAME)}
            >
              {I18n.t('containers.tokenPage.tokenListPageBreadCrumb')}
            </BreadcrumbItem>
            {` > `}
            <BreadcrumbItem active tag='span'>
              {data.name}
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className='mt-4'>
          <h1>
            <span>
              <TokenAvatar token={data} />
            </span>{' '}
            {data.name}
          </h1>
          <Row>
            <Col xs='12'>
              {/* <Row>
                <Col xs='12' md='4'>
                  <KeyValueLi
                    label={I18n.t('containers.tokenPage.name')}
                    value={data.name || 'Unknown'}
                  />
                </Col>
                <Col xs='12' md='4'>
                  <KeyValueLi
                    label={I18n.t('containers.tokenPage.symbol')}
                    value={data.symbol || 'Unknown'}
                  />
                </Col>
                <Col xs='12' md='4'>
                  <KeyValueLi
                    label={I18n.t('containers.tokenPage.tokenId')}
                    value={data.tokenId}
                  />
                </Col>
                <Col xs='12' md='4'>
                  <KeyValueLi
                    label={I18n.t('containers.tokenPage.category')}
                    value={data.category}
                  />
                </Col>
                <Col xs='12' md='4'>
                  <KeyValueLi
                    label={I18n.t('containers.tokenPage.decimal')}
                    value={`${data.decimal}`}
                  />
                </Col>
              </Row> */}
              <Row>
                <Col xs='12' md='4'>
                  <KeyValueLi
                    label={I18n.t('containers.tokenPage.name')}
                    value={`${data.name}`}
                  />
                </Col>
                <Col xs='12' md='4'>
                  <KeyValueLi
                    label={I18n.t('containers.tokenPage.symbol')}
                    value={`${data.symbol}`}
                  />
                </Col>
                <Col xs='12' md='4'>
                  <KeyValueLi
                    label={I18n.t('containers.tokenPage.tokenId')}
                    value={`${data.tokenId}`}
                  />
                </Col>
                <Col xs='12' md='4'>
                  <KeyValueLi
                    label={I18n.t('containers.tokenPage.category')}
                    value={`${data.category}`}
                  />
                </Col>
                <Col xs='12' md='4'>
                  <KeyValueLi
                    label={I18n.t('containers.tokenPage.decimal')}
                    value={`${data.decimal}`}
                  />
                </Col>
                <Col xs='12' md='4'>
                  <KeyValueLi
                    label={I18n.t('containers.tokenPage.limit')}
                    value={`${data.limit}`}
                  />
                </Col>
                <Col xs='12' md='4'>
                  <KeyValueLi
                    label={I18n.t('containers.tokenPage.mintable')}
                    value={capitalize(data.mintable)}
                  />
                </Col>
                <Col xs='12' md='4'>
                  <KeyValueLi
                    label={I18n.t('containers.tokenPage.tradeable')}
                    value={capitalize(data.tradeable)}
                  />
                </Col>
                <Col xs='12' md='4'>
                  <KeyValueLi
                    label={I18n.t('containers.tokenPage.isLPS')}
                    value={capitalize(data.isLPS)}
                  />
                </Col>
                <Col xs='12' md='4'>
                  <KeyValueLi
                    label={I18n.t('containers.tokenPage.finalized')}
                    value={capitalize(data.finalized)}
                  />
                </Col>
                <Col xs='12' md='4'>
                  <KeyValueLi
                    label={I18n.t('containers.tokenPage.minted')}
                    value={`${data.minted}`}
                  />
                </Col>

                <Col xs='12' md='4'>
                  <KeyValueLi
                    label={I18n.t('containers.tokenPage.creationHeight')}
                    value={`${data.creationHeight}`}
                  />
                </Col>
                <Col xs='12' md='4'>
                  <KeyValueLi
                    label={I18n.t('containers.tokenPage.destructionHeight')}
                    value={`${data.destructionHeight}`}
                  />
                </Col>
                {data.collateralAddress && (
                  <Col xs='12' md='8'>
                    <KeyValueLi
                      label={I18n.t('containers.tokenPage.collateralAddress')}
                      value={data.collateralAddress}
                    />
                  </Col>
                )}
                <Col xs='12'>
                  <KeyValueLi
                    label={I18n.t('containers.tokenPage.creationTx')}
                    value={`${data.creationTx}`}
                    noEllipsis
                  />
                </Col>
                <Col xs='12'>
                  <KeyValueLi
                    label={I18n.t('containers.tokenPage.destructionTx')}
                    value={`${data.destructionTx}`}
                    noEllipsis
                  />
                </Col>
              </Row>
            </Col>
            <Col xs='12' className='mt-4'>
              <h1>{I18n.t('containers.tokenPage.pairsHeading')}</h1>
              <PoolPairsTable tokenId={data.tokenId} />
            </Col>
          </Row>
        </div>
      </>
    );
  }
  return <>{I18n.t('containers.tokenPage.loading')}</>;
};

const mapStateToProps = (state) => {
  const {
    tokensListPage: { tokenPage },
    app: { unit },
  } = state;
  return {
    isLoading: tokenPage.isLoading,
    data: tokenPage.data,
    isError: tokenPage.isError,
    unit,
  };
};

const mapDispatchToProps = {
  fetchTokenPageStartedRequest: (tokenId) =>
    fetchTokenPageStartedRequest({ tokenId }),
};

export default connect(mapStateToProps, mapDispatchToProps)(TokenPage);
