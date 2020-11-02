import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { fetchTokenPageStartedRequest } from '../../reducer';

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
    isLoading,
    data,
    isError,
    unit,
    fetchTokenPageStartedRequest,
    match: {
      params: { tokenId },
    },
  } = props;

  useEffect(() => {
    fetchTokenPageStartedRequest(tokenId);
  }, []);

  return <div>Token #{tokenId}</div>;
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
