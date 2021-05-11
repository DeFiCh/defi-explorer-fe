import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { Row, Col } from 'reactstrap';
import { DEFAULT_DECIMAL_PLACE } from '../../../../constants';
import { numberWithCommas } from '../../../../utils/utility';
import styles from '../../PoolPairsListPage.module.scss';

interface TotalValueLocked {
  totalValueLocked: number;
  totalBlockCount: number;
  hideTVL: boolean;
  hideBlocksCount: boolean;
}

const TotalValueLocked = (props: TotalValueLocked) => {
  const { totalValueLocked, totalBlockCount } = props;

  return (
    <Row>
      <Col md='12'>
      {!props.hideTVL &&
        (<>
          {I18n.t('containers.poolPairsListPage.totalValueLocked')}{' '}
          <span className={styles.currency}>
            {I18n.t('containers.poolPairsListPage.totalValueLockedCurrency')}
          </span>
        </>)}
        {!props.hideBlocksCount && 
        (<>
          <h4 className='mb-1'>{numberWithCommas(totalValueLocked, DEFAULT_DECIMAL_PLACE)}</h4>
          {I18n.t('containers.poolPairsListPage.totalBlockCount')}{' '}
          <h4>{numberWithCommas(totalBlockCount, 0)}</h4>
        </>)}
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ poolPairsListPage, app }) => ({
  totalValueLocked: poolPairsListPage.totalValueLocked,
  totalBlockCount: poolPairsListPage.totalBlockCount,
});

export default connect(mapStateToProps, {})(TotalValueLocked);
