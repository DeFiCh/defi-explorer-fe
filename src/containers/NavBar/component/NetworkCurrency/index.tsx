import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
} from 'reactstrap';
import { changeUnit } from '../../../App/reducer';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface NetworkCurrency {
  network: string;
  unit: string;
  changeUnit: (unit: string) => void;
}

const NetworkCurrency = (props: NetworkCurrency) => {
  const { network, unit, changeUnit } = props;

  return (
    <div>
      <Button id='PopoverClick' color='link' size='sm'>
        <span color='secondary'>
          {`${network.toUpperCase()}-${unit}`}&nbsp;
          <MdKeyboardArrowDown className='d-inline-block' />
        </span>
      </Button>
      <UncontrolledPopover
        trigger='legacy'
        placement='bottom'
        target='PopoverClick'
      >
        <PopoverHeader>Click Trigger</PopoverHeader>
        <PopoverBody>
          Clicking on the triggering element makes this popover appear. Clicking
          on it again will make it disappear. You can select this text, but
          clicking away (somewhere other than the triggering element) will not
          dismiss this popover.
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
