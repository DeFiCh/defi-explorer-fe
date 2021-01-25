import React from 'react';
import { getIcon } from '../../utils/utility';
import styles from './TokenAvatar.module.scss';
import Avatar, { ReactAvatarProps } from 'react-avatar';
interface TokenAvatar extends ReactAvatarProps {
  symbol: string;
}

const TokenAvatar = (props: TokenAvatar) => {
  const { symbol, style } = props;
  const data = getIcon(symbol);
  return (
    <Avatar
      name={symbol}
      maxInitials={2}
      round
      src={data || ''}
      size='30px'
      style={style}
    />
  );
};
export default TokenAvatar;
