import React from 'react';
import { MdArrowForward } from 'react-icons/md';
import { RiErrorWarningLine } from 'react-icons/ri';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { NavLink } from 'react-router-dom';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
import CopyToClipIcon from '../../components/CopyToClipIcon';
import { mDFI, TRANSACTION_BASE_PATH } from '../../constants';
import { getAmountInSelectedUnit, getTime } from '../../utils/utility';
import AddressRow from './Components/addressRow';
import styles from './TransactionHashRow.module.scss';

interface TransactionHashRowProps {
  tx: any;
  id: string | number;
  unit: string;
}

const TransactionHashRow = (props: TransactionHashRowProps) => {
  const { tx, id, unit } = props;
  const inputs = tx.input.filter((item) => item.address !== 'false');
  const outputs = tx.output.filter((item) => item.address !== 'false');
  return (
    <div key={id} className='my-4'>
      <Card>
        <CardHeader>
          <Row>
            <Col xs='12' md='8'>
              <Button
                to={`${TRANSACTION_BASE_PATH}/${tx.transactions.txid}`}
                color='link'
                className={styles.txidHeader}
                tag={NavLink}
              >
                {tx.transactions.txid}
              </Button>
              <span>
                <CopyToClipIcon value={tx.transactions.txid!} uid={`_copy`} />
              </span>
            </Col>
            <Col xs='12' md='4'>
              <div className='text-right'>
                {getTime(tx.transactions.blockTime)}{' '}
                <RiErrorWarningLine size='24' />
              </div>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs='12'>
              <Row>
                <Col xs='12' md='5'>
                  {inputs.length > 0 ? (
                    inputs.map((item) => <AddressRow item={item} unit={unit} />)
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
                  {outputs.length > 0 ? (
                    outputs.map((item, index) => (
                      <AddressRow item={item} unit={unit} key={index} />
                    ))
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
