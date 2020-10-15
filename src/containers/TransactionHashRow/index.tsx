import React, { useEffect, useState } from 'react';
import { MdArrowForward } from 'react-icons/md';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { Badge, Card, CardBody, Col, Row } from 'reactstrap';
import { mDFI } from '../../constants';
import { getAmountInSelectedUnit, getTime } from '../../utils/utility';
import AddressRow from './Components/addressRow';
import { fetchNewTxnIpOpDataRequest } from './reducer';

interface TransactionHashRowProps {
  tx: any;
  id: string | number;
  transactions: any;
  fetchNewTxnIpOpDataRequest: (txid: string) => void;
  data: any;
  unit: string;
}

const TransactionHashRow = (props: TransactionHashRowProps) => {
  const {
    tx,
    id,
    fetchNewTxnIpOpDataRequest,
    data,
    unit,
    transactions,
  } = props;
  const [InputOutput, setInputOutput] = useState({
    inputs: [],
    outputs: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState('');
  const [txnData, setTxnData] = useState({
    isLoading: true,
    isError: '',
    data: {},
  });

  useEffect(() => {
    fetchNewTxnIpOpDataRequest(`${tx.txid}`);
  }, []);

  useEffect(() => {
    if (data[tx.txid]) {
      const txData = data[tx.txid];
      setIsLoading(txData.isLoading);
      setIsError(txData.isLoading);
      const updatedObj = {
        inputs: [],
        outputs: [],
      };

      if (txData.data.inputs && Array.isArray(txData.data.inputs)) {
        updatedObj.inputs = txData.data.inputs.filter(
          (item) => item.address !== 'false'
        );
      }
      if (txData.data.outputs && Array.isArray(txData.data.outputs)) {
        updatedObj.outputs = txData.data.outputs.filter(
          (item) => item.address !== 'false'
        );
      }
      setInputOutput(updatedObj);
    }
  }, [data]);

  useEffect(() => {
    if (transactions[tx.txid]) {
      setTxnData(transactions[tx.txid]);
    }
  }, [transactions]);

  const loadInputOutputData = () => {
    if (isLoading)
      return <div>{I18n.t('containers.transactionHashRow.loading')}</div>;
    if (isError) return <div>{isError}</div>;
    return (
      <Row>
        <Col xs='12' md='5'>
          {InputOutput.inputs.length > 0 ? (
            InputOutput.inputs.map((item) => (
              <AddressRow item={item} unit={unit} />
            ))
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
          {InputOutput.outputs.length > 0 ? (
            InputOutput.outputs.map((item) => (
              <AddressRow item={item} unit={unit} />
            ))
          ) : (
            <div className='text-center'>
              {I18n.t('containers.transactionHashRow.noOutputAddress')}
            </div>
          )}
        </Col>
      </Row>
    );
  };

  const loadTxnData = () => {
    if (txnData.isLoading)
      return <div>{I18n.t('containers.transactionHashRow.loading')}</div>;
    if (txnData.isError) return <div>{isError}</div>;
    return (
      <Row>
        <Col xs='12' className='text-right'>
          <Badge>{getTime(txnData.data.blockTime)}</Badge>
        </Col>
        <Col xs='12'>{loadInputOutputData()}</Col>
        <Col xs='12' className='text-right'>
          <Badge className='mr-2'>
            {I18n.t('containers.transactionHashRow.confirmations', {
              confirmations: txnData.data.confirmations,
            })}
          </Badge>
          <Badge>
            {getAmountInSelectedUnit(txnData.data.value, unit, mDFI)} {unit}
          </Badge>
        </Col>
      </Row>
    );
  };

  return (
    <div key={id}>
      <Card>
        <CardBody>{loadTxnData()}</CardBody>
      </Card>
    </div>
  );
};

const mapStateToProps = ({ transactionHashRow, app }) => ({
  data: transactionHashRow.data,
  transactions: transactionHashRow.transactions,
  unit: app.unit,
});

const mapDispatchToProps = {
  fetchNewTxnIpOpDataRequest: (txid: string) =>
    fetchNewTxnIpOpDataRequest(txid),
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHashRow);
