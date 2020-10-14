import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import { MdArrowDropDown, MdArrowDropUp, MdArrowForward } from 'react-icons/md';
import { connect } from 'react-redux';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { Button, Card, CardBody, Col, Collapse, Row } from 'reactstrap';
import { mDFI, TRANSACTION_BASE_PATH } from '../../constants';
import { getAmountInSelectedUnit, getTime } from '../../utils/utility';
import AddressRow from './Components/addressRow';
import { fetchNewTxnDataRequest } from './reducer';
import styles from './TransactionHashRow.module.scss';

interface TransactionHashRowProps extends RouteComponentProps {
  tx: any;
  id: string | number;
  fetchNewTxnDataRequest: (txid: string) => void;
  data: any;
  unit: string;
}

const TransactionHashRow = (props: TransactionHashRowProps) => {
  const { tx, id, fetchNewTxnDataRequest, data, unit } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [InputOutput, setInputOutput] = useState({
    inputs: [],
    outputs: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState('');
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    fetchNewTxnDataRequest(`${tx.txid}`);
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

  const loadInputOutputData = () => {
    if (isLoading) return <div>Loading</div>;
    if (isError) return <div>{isError}</div>;
    return (
      <Row>
        <Col xs='5'>
          {InputOutput.inputs.length > 0 ? (
            InputOutput.inputs.map((item) => (
              <AddressRow item={item} unit={unit} />
            ))
          ) : (
            <div className='text-center'>No input address</div>
          )}
        </Col>
        <Col xs='2' className='text-center'>
          <MdArrowForward />
        </Col>
        <Col xs='5'>
          {InputOutput.outputs.length > 0 ? (
            InputOutput.outputs.map((item) => (
              <AddressRow item={item} unit={unit} />
            ))
          ) : (
            <div className='text-center'>No output address</div>
          )}
        </Col>
      </Row>
    );
  };

  return (
    <div key={id}>
      <Card>
        <CardBody>
          <Row>
            <Col xs='12' className='text-right'>
              {getTime(tx.blockTime)}
            </Col>
            <Col xs='12'>{loadInputOutputData()}</Col>
            <Col xs='12' className='text-right'>
              <span>{getAmountInSelectedUnit(tx.value, unit, mDFI)}</span>
              <span> {unit}</span>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

const mapStateToProps = ({ transactionHashRow, app }) => ({
  data: transactionHashRow.data,
  unit: app.unit,
});

const mapDispatchToProps = {
  fetchNewTxnDataRequest: (txid: string) => fetchNewTxnDataRequest(txid),
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHashRow);
