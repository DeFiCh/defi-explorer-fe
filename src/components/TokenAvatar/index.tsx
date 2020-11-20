import React from 'react';
import { getIcon } from '../../utils/utility';
import styles from './TokenAvatar.module.scss';
import Avatar, { ReactAvatarProps } from 'react-avatar';
interface TokenAvatar extends ReactAvatarProps {
  token: any;
}

const TokenAvatar = (props: TokenAvatar) => {
  const { token, style } = props;
  const data = getIcon(token.symbolKey);
  return (
    <Avatar
      name={token.symbolKey}
      maxInitials={2}
      round
      src={data || ''}
      size='30px'
      style={style}
    />
  );
};
export default TokenAvatar;
