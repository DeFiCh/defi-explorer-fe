import React, { useState } from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Button,
} from 'reactstrap';
import {
  TOKEN_LIST_PAGE_URL_NAME,
  POOL_LIST_PAGE_URL_NAME,
  ADDRESS_TOKEN_LIST_PAGE_URL_NAME,
  // BLOCK_PAGE_BASE_PATH,
  // TRANSACTION_BASE_PATH,
} from '../../constants';
import {
  NavLink as RRNavLink,
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';
import { I18n } from 'react-redux-i18n';
import styles from './NavBar.module.scss';
import Logo from '../../components/Logo';
import MobileLogo from '../../assets/svg/defi-icon.svg';
import NetworkCurrency from './component/NetworkCurrency';
import { Desktop, Mobile } from '../../components/Responsive';
import { connect } from 'react-redux';
import { setRoute } from '../../utils/utility';
import { MdSearch } from 'react-icons/md';
import SearchBar from '../../components/SearchBar';

interface NavbarComponentProps extends RouteComponentProps {
  network: string;
}

const NavbarComponent = (props: NavbarComponentProps) => {
  const { history } = props;
  const [isOpen, setIsOpen] = useState(true);

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggle = () => setIsOpen(!isOpen);
  const searchToggle = () => setShowSearchBar(!showSearchBar);
  const handleSubmitFunc = () => {
    if (searchValue) {
      history.push(
        setRoute(`${ADDRESS_TOKEN_LIST_PAGE_URL_NAME}/${searchValue}`)
      );
      setShowSearchBar(false);
    }
  };

  const handleOnchange = (e) => setSearchValue(e.target.value);

  const loadNavItems = () => {
    if (isOpen) {
      if (showSearchBar) {
        return (
          <Nav className='m-auto' navbar>
            <NavItem>
              <SearchBar
                searching={{}}
                toggleSearch={searchToggle}
                onChange={handleOnchange}
                formGroupClass='m-0'
                onSubmit={handleSubmitFunc}
              />
            </NavItem>
          </Nav>
        );
      }
      return (
        <Nav className='m-auto' navbar>
          <NavItem>
            <NavLink to={setRoute(POOL_LIST_PAGE_URL_NAME)} tag={RRNavLink}>
              {I18n.t('containers.navBar.pool')}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={setRoute(TOKEN_LIST_PAGE_URL_NAME)} tag={RRNavLink}>
              {I18n.t('containers.navBar.tokens')}
            </NavLink>
          </NavItem>
          <NavItem>
            <Desktop>
              <Button tag={NavLink} color='link' onClick={searchToggle}>
                <MdSearch />
              </Button>
            </Desktop>
            <Mobile>
              <SearchBar
                searching={{}}
                toggleSearch={searchToggle}
                onChange={handleOnchange}
                formGroupClass='m-0'
                mobileView
                onSubmit={handleSubmitFunc}
              />
            </Mobile>
          </NavItem>
        </Nav>
      );
    }
  };

  return (
    <Navbar className={styles.navigation} light expand='md'>
      <NavbarBrand
        tag={RRNavLink}
        to={`/DFI/${props.network}/pool`}
        className='mr-auto'
      >
        <Desktop>
          <Logo className={styles.logo} />
        </Desktop>
        <Mobile>
          <img src={MobileLogo} className={styles.logo} />
        </Mobile>
        {I18n.t('containers.navBar.explorerTitle')}
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        {loadNavItems()}
        {isOpen && <NetworkCurrency {...props} />}
      </Collapse>
    </Navbar>
  );
};

const mapStateToProps = ({ app }) => ({
  network: app.network,
});

const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavbarComponent)
);
