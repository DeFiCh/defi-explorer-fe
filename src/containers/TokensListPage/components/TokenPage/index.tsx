import isEmpty from 'lodash/isEmpty';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { TOKEN_LIST_PAGE_URL_NAME } from '../../../../constants';
import { fetchTokenPageStartedRequest } from '../../reducer';
import TokenAvatar from '../../../../components/TokenAvatar';
import { setRoute } from '../../../../utils/utility';
import styles from '../../TokensListPage.module.scss';
import TokenTabs from '../TokenTabs';
import TokenDetails from '../TokenDetails';

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
              {data.symbolKey}
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className='mt-4'>
          <h1>
            <span className='pr-2'>
              <TokenAvatar token={data} />
            </span>
            &nbsp;
            <span>
              <div className={styles.iconTitle}>{data.symbolKey}</div>
            </span>
          </h1>
          <TokenDetails data={data} />
          <TokenTabs data={data} tokenId={tokenId} />
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
