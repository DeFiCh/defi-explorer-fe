import React from 'react';
import TokenAvatar from '../../../../components/TokenAvatar';

export const PoolPairIcon = ({ symbolA, symbolB }) => {
  return (
    <span className='pr-2'>
      <TokenAvatar
        symbol={symbolA}
        style={{
          position: 'relative',
          marginRight: '-15px',
        }}
      />
      &nbsp;
      <TokenAvatar symbol={symbolB} />
    </span>
  );
};
