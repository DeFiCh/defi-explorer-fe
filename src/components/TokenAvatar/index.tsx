import React from 'react';
import { getIcon } from '../../utils/utility';
import styles from './TokenAvatar.module.scss';
import Avatar from 'react-avatar';
interface TokenAvatar {
  token: any;
}

const TokenAvatar = (props: TokenAvatar) => {
  const { token } = props;
  const data = getIcon(token.symbolKey);
  return (
    <Avatar
      name={token.symbolKey}
      maxInitials={2}
      round
      src={data || ''}
      size='30px'
    />
  );
};
export default TokenAvatar;
