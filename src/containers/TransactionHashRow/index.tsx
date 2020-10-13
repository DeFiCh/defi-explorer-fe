import React, { useEffect, useState } from 'react';
import {
  MdArrowDownward,
  MdArrowDropDown,
  MdArrowDropUp,
  MdArrowForward,
  MdArrowUpward,
} from 'react-icons/md';
import { connect } from 'react-redux';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { Button, Card, CardBody, Col, Collapse, Row } from 'reactstrap';
import {
  ADDRESS_BASE_PATH,
  DEFAULT_UNIT,
  DFI_UNIT_MAP,
  mDFI,
} from '../../constants';
import { getAmountInSelectedUnit } from '../../utils/utility';
import { fetchNewTxnDataRequest } from './reducer';
import styles from './TransactionHashRow.module.scss';

interface TransactionHashRowProps extends RouteComponentProps {
  tx: any;
  id: string | number;
  fetchNewTxnDataRequest: (txid: string) => void;
  data: any;
}

const TransactionHashRow = (props: TransactionHashRowProps) => {
  const { tx, id, fetchNewTxnDataRequest, data } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [InputOutput, setInputOutput] = useState({});
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
      setInputOutput(txData.data);
    }
  }, [data]);

  const loadInputOutputData = () => {
    if (isLoading) return <div>Loading</div>;
    if (isError) return <div>{isError}</div>;
    return (
      <Row>
        <Col xs='5'>
          <Row>
            {InputOutput.inputs.map((item) => (
              <Col xs='12'>
                <Button
                  to={`${ADDRESS_BASE_PATH}/${item.address}`}
                  color='link'
                  className={styles.ipOpRow}
                  tag={NavLink}
                >
                  {item.address}
                </Button>
              </Col>
            ))}
          </Row>
        </Col>
        <Col xs='2'>
          <MdArrowForward />
        </Col>
        <Col xs='5'>
          {InputOutput.outputs.map((item) => (
            <Col xs='12'>
              <Button
                to={`${ADDRESS_BASE_PATH}/${item.address}`}
                color='link'
                className={styles.ipOpRow}
                tag={NavLink}
              >
                {item.address}
              </Button>
            </Col>
          ))}
        </Col>
      </Row>
    );
  };

  return (
    <div key={id}>
      <Row>
        <Col xs='1'>
          <Button color='link' className='p-0' onClick={toggle}>
            {isOpen ? <MdArrowDropDown /> : <MdArrowDropUp />}
          </Button>
        </Col>
        <Col xs='9'>{tx.txid}</Col>
        <Col xs='2' className='text-right'>
          {getAmountInSelectedUnit(tx.value, DEFAULT_UNIT, mDFI)}
        </Col>
        <Col xs='12'>
          <Collapse isOpen={isOpen}>
            <Card>
              <CardBody>{loadInputOutputData()}</CardBody>
            </Card>
          </Collapse>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = ({ transactionHashRow }) => ({
  data: transactionHashRow.data,
});

const mapDispatchToProps = {
  fetchNewTxnDataRequest: (txid: string) => fetchNewTxnDataRequest(txid),
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHashRow);
