import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  UncontrolledPopover,
  PopoverBody,
  Input,
  Row,
  Col,
  FormGroup,
  Label,
  Form,
} from 'reactstrap';
import { changeUnit } from '../../../App/reducer';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { I18n } from 'react-redux-i18n';
import { UNIT_OPTIONS, NETWORK_OPTIONS } from '../../../../constants';
import styles from '../../NavBar.module.scss';
import { Redirect, RouteComponentProps } from 'react-router-dom';

interface NetworkCurrency extends RouteComponentProps {
  network: string;
  unit: string;
  changeUnit: (unit: string) => void;
}

const LoadRadio = ({ label, options, name, value, onClickFunc }) => (
  <Row>
    <Col xs={12}>
      <strong>{label}</strong>
    </Col>
    {options.map((item) => (
      <Col xs={6} key={item}>
        <FormGroup check>
          <Input
            type='radio'
            name={name}
            value={item}
            checked={item.toLowerCase() === value.toLowerCase()}
            id={item}
            onChange={() => onClickFunc(item)}
          />
          <Label for={item}>{item}</Label>
        </FormGroup>
      </Col>
    ))}
  </Row>
);

const NetworkCurrency = (props: NetworkCurrency) => {
  const { network, unit, changeUnit, history } = props;

  const [changeNetwork, setChangeNetwork] = useState('');

  // if (changeNetwork) return ;
  if (changeNetwork) {
    history.go(0);
    return <Redirect to={`/DFI/${changeNetwork}/`} />;
  }

  return (
    <div>
      <div id='PopoverClick' color='link' className='cursor-pointer'>
        <span color='secondary'>
          {/* {`${network.toUpperCase()}-${unit}`}&nbsp; */}
          {`${network.toUpperCase()}`}&nbsp;
          <MdKeyboardArrowDown className='d-inline-block' />
        </span>
      </div>
      <UncontrolledPopover
        trigger='legacy'
        placement='bottom'
        target='PopoverClick'
        popperClassName={styles.networkPopover}
        hideArrow
      >
        <PopoverBody>
          <Form>
            <LoadRadio
              options={NETWORK_OPTIONS}
              onClickFunc={(v) => setChangeNetwork(v.toLowerCase())}
              name='Network'
              value={network}
              label={I18n.t('containers.navBar.menuDropdown.network')}
            />
            {/* <LoadRadio // TODO: need in future
              options={UNIT_OPTIONS}
              onClickFunc={changeUnit}
              name='Unit'
              value={unit}
              label={I18n.t('containers.navBar.menuDropdown.units')}
            /> */}
          </Form>
        </PopoverBody>
      </UncontrolledPopover>
    </div>
  );
};

const mapStateToProps = ({ app }) => {
  const { chain, network, unit } = app;
  return {
    chain,
    network,
    unit,
  };
};

const mapDispatchToProps = {
  changeUnit: (unit: string) => changeUnit(unit),
};

export default connect(mapStateToProps, mapDispatchToProps)(NetworkCurrency);
