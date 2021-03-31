import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import { ADDRESS_BASE_PATH, mDFI } from '../../../../constants';
import { getAmountInSelectedUnit } from '../../../../utils/utility';
import styles from '../../TransactionHashRow.module.scss';

const AddressRow = ({ item, unit }) => {
  return (
    <Row>
      <Col xs='8'>
        <Button
          to={`${ADDRESS_BASE_PATH}/${item.address}`}
          color='link'
          className={styles.ipOpRow}
          tag={NavLink}
        >
          {item.address}
        </Button>
      </Col>
      <Col xs='4' className='text-right'>
        <span>{getAmountInSelectedUnit(item.value, unit, mDFI)}</span>
        <span> {unit}</span>
      </Col>
    </Row>
  );
};

export default AddressRow;
