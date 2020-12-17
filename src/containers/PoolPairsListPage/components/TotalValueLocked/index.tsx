import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { numberWithCommas } from '../../../../utils/utility';
import styles from '../../PoolPairsListPage.module.scss';

interface TotalValueLocked {
  totalValueLocked: number;
}

const TotalValueLocked = (props: TotalValueLocked) => {
  const { totalValueLocked } = props;

  return (
    <Row className='mb-4'>
      <Col md='12'>
        {I18n.t('containers.poolPairsListPage.totalValueLocked')}{' '}
        <span className={styles.currency}>
          {I18n.t('containers.poolPairsListPage.totalValueLockedCurrency')}
        </span>
        <h4>{numberWithCommas((totalValueLocked || 0).toFixed(2))}</h4>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ poolPairsListPage, app }) => ({
  totalValueLocked: poolPairsListPage.totalValueLocked,
});

export default connect(mapStateToProps, {})(TotalValueLocked);
