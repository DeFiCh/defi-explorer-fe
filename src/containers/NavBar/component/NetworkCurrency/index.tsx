import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
  DropdownItem,
  Input,
  Label,
} from 'reactstrap';
import { changeUnit } from '../../../App/reducer';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { I18n } from 'react-redux-i18n';
import { UNIT_OPTIONS } from '../../../../constants';
import styles from '../../NavBar.module.scss';

interface NetworkCurrency {
  network: string;
  unit: string;
  changeUnit: (unit: string) => void;
}

const NetworkCurrency = (props: NetworkCurrency) => {
  const { network, unit, changeUnit } = props;

  const loadRadioButton = () =>
    UNIT_OPTIONS.map((item, idx) => (
      <>
        <DropdownItem
          key={`dropDownUnit_${idx}`}
          onClick={() => changeUnit(item)}
        >
          <Label>
            <Input
              type='radio'
              name='unit'
              value={item}
              checked={item === unit}
            />{' '}
            {item}
          </Label>
        </DropdownItem>
        <DropdownItem divider />
      </>
    ));

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
        popperClassName={styles.networkPopover}
        hideArrow
      >
        <PopoverHeader>
          {I18n.t('containers.navBar.menuDropdown.units')}
        </PopoverHeader>
        <PopoverBody>{loadRadioButton()}</PopoverBody>
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
