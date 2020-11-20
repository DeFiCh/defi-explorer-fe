import React from 'react';
import TokenAvatar from '../../../../components/TokenAvatar';

export const PoolPairIcon = ({ data }) => {
  return (
    <span className='pr-2'>
      <TokenAvatar
        token={data.tokenInfo.idTokenA}
        style={{
          position: 'relative',
          marginRight: '-15px',
        }}
      />
      &nbsp;
      <TokenAvatar token={data.tokenInfo.idTokenB} />
    </span>
  );
};
