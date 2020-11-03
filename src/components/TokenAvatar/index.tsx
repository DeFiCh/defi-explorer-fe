import React from 'react';
import { getIcon } from '../../utils/utility';

interface TokenAvatar {
  token: any;
}

const TokenAvatar = (props: TokenAvatar) => {
  const { token } = props;
  return <img height={'30px'} width={'30px'} src={getIcon(token.symbol)} />;
};
export default TokenAvatar;
