import React from 'react';
import { getIcon } from '../../utils/utility';
import UserAvatar from 'react-user-avatar';
import styles from './TokenAvatar.module.scss';
interface TokenAvatar {
  token: any;
}

const TokenAvatar = (props: TokenAvatar) => {
  const { token } = props;
  const data = getIcon(token.symbol);
  return <img height='30px' width='30px' src={data} />;
};
export default TokenAvatar;
