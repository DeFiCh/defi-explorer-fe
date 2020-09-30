import React, { FormEvent, useState } from "react";
import { Col, Form, Input, NavLink, Row } from "reactstrap";
import SearchBar from "./component/SearchBar";
import classnames from "classnames";
import { Mobile } from "../../components/Responsive";
import MenuDropdown from "./component/MenuDropdown";
import defiAppIcon from "../../assets/svg/logo-defi.svg";
import { INDEX_PATH } from "../../constants";
import { NavLink as RRNavLink, withRouter } from "react-router-dom";
import { I18n } from "react-redux-i18n";
import { isInputValid } from "../../utils/utility";

const NavbarComponent = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleOnChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  const loadSearchInputBar = () => {
    return (
      <Form onSubmit={handleSubmit}>
        <Input
          value={searchValue}
          placeholder={I18n.t(
            "containers.navBar.searchBar.searchPlaceHolderText"
          )}
          onChange={handleOnChange}
        />
      </Form>
    );
  };
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
            <Col xs={8}>
              <SearchBar
                showSearchBar={showSearchBar}
                setShowSearchBar={setShowSearchBar}
                loadSearchInputBar={loadSearchInputBar}
              />
            </Col>
            <Col xs={4}>
              <MenuDropdown />
            </Col>
          </Row>
        </Col>
      </Row>
      <Mobile>
        <Row
          className={classnames({
            "d-none": !showSearchBar,
          })}
        >
          <Col xs={12}>{loadSearchInputBar()}</Col>
        </Row>
      </Mobile>
    </>
  );
};

export default withRouter(NavbarComponent);
