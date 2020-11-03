import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { RouteComponentProps } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Col, Row } from 'reactstrap';
import KeyValueLi from '../../../../components/KeyValueLi';
import { TOKEN_BASE_PATH } from '../../../../constants';
import { fetchTokenPageStartedRequest } from '../../reducer';
import PoolPairsTable from '../../../PoolPairsListPage/components/PoolPairsTable';
import TokenAvatar from '../../../../components/TokenAvatar';

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
            <BreadcrumbItem tag='a' href={TOKEN_BASE_PATH}>
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
              <Row>
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
