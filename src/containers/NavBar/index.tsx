import React, { FormEvent, useState } from "react";
import { Col, Form, Input, NavLink, Row } from "reactstrap";
import classnames from "classnames";
import { Mobile } from "../../components/Responsive";
import MenuDropdown from "./component/MenuDropdown";
import defiAppIcon from "../../assets/svg/logo-defi.svg";
import { INDEX_PATH } from "../../constants";
import { NavLink as RRNavLink, withRouter } from "react-router-dom";
import { I18n } from "react-redux-i18n";
import { isInputValid } from "../../utils/utility";

const NavbarComponent = () => {
  return (
    <>
      <Row>
        <Col xs={2}>
          <NavLink to={INDEX_PATH} tag={RRNavLink}>
            <img src={defiAppIcon} />
          </NavLink>
        </Col>
        <Col xs={10}>
          <Row>
            <Col xs={{ size: 4, offset: 8 }}>
              <MenuDropdown />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default withRouter(NavbarComponent);
