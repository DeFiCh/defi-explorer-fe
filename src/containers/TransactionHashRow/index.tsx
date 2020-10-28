import React from 'react';
import { MdArrowForward } from 'react-icons/md';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { Badge, Card, CardBody, Col, Row } from 'reactstrap';
import { mDFI } from '../../constants';
import { getAmountInSelectedUnit, getTime } from '../../utils/utility';
import AddressRow from './Components/addressRow';

interface TransactionHashRowProps {
  tx: any;
  id: string | number;
  unit: string;
}

const TransactionHashRow = (props: TransactionHashRowProps) => {
  const { tx, id, unit } = props;
  return (
    <div key={id}>
      <Card>
        <CardBody>
          <Row>
            <Col xs='12' className='text-right'>
              <Badge>{getTime(tx.transactions.blockTime)}</Badge>
            </Col>
            <Col xs='12'>
              <Row>
                <Col xs='12' md='5'>
                  {tx.input.length > 0 ? (
                    tx.input
                      .filter((item) => item.address !== 'false')
                      .map((item) => <AddressRow item={item} unit={unit} />)
                  ) : (
                    <div className='text-center'>
                      {I18n.t('containers.transactionHashRow.noInputAddress')}
                    </div>
                  )}
                </Col>
                <Col xs='12' md='2' className='text-center'>
                  <MdArrowForward />
                </Col>
                <Col xs='12' md='5'>
                  {tx.output.length > 0 ? (
                    tx.output
                      .filter((item) => item.address !== 'false')
                      .map((item) => <AddressRow item={item} unit={unit} />)
                  ) : (
                    <div className='text-center'>
                      {I18n.t('containers.transactionHashRow.noOutputAddress')}
                    </div>
                  )}
                </Col>
              </Row>
            </Col>
            <Col xs='12' className='text-right'>
              <Badge className='mr-2'>
                {I18n.t('containers.transactionHashRow.confirmations', {
                  confirmations: tx.transactions.confirmations,
                })}
              </Badge>
              <Badge>
                {getAmountInSelectedUnit(
                  tx.transactions.value || tx.transactions.valueOut,
                  unit,
                  mDFI
                )}{' '}
                {unit}
              </Badge>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

const mapStateToProps = ({ app }) => ({
  unit: app.unit,
});

export default connect(mapStateToProps)(TransactionHashRow);
