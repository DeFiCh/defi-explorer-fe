import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { I18n } from "react-redux-i18n";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";
import { UNIT_OPTIONS } from "../../../../constants";
import { changeUnit } from "../../../App/reducer";
import defiLogo from "../../../../assets/svg/dfi.svg";

interface MenuDropdown {
  network: string;
  unit: string;
  changeUnit: (unit: string) => void;
}

const MenuDropdown = (props) => {
  const { network, unit, changeUnit } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const loadRadioButton = () => (
    <FormGroup>
      {UNIT_OPTIONS.map((item, idx) => (
        <>
          <DropdownItem key={`dropDownUnit_${idx}`} onClick={() => changeUnit(item)}>
            <FormGroup>
              <Label>
                <Input
                  type="radio"
                  name="unit"
                  value={item}
                  checked={item === unit}
                />{" "}
                {item}
              </Label>
            </FormGroup>
          </DropdownItem>
          <DropdownItem divider />
        </>
      ))}
    </FormGroup>
  );

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle
        caret
        color="link"
      >{`${network.toUpperCase()}-${unit}`}</DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>
          {I18n.t("containers.navBar.menuDropdown.network")}
        </DropdownItem>
        <DropdownItem divider />
        <div>
          <span>
            <img src={defiLogo} />
          </span>
          <span>
            <Button size="xs">{`${network.toUpperCase()}`}</Button>
          </span>
        </div>
        <DropdownItem header>
          {I18n.t("containers.navBar.menuDropdown.unit")}
        </DropdownItem>
        <DropdownItem divider />
        {loadRadioButton()}
      </DropdownMenu>
    </Dropdown>
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuDropdown);
