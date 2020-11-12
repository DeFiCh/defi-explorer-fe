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
  const [isOpen, setIsOpen] = useState(false);

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggle = () => setIsOpen(!isOpen);
  const searchToggle = () => setShowSearchBar(!showSearchBar);
  const handleSubmitFunc = (event) => {
    event.preventDefault();
    if (searchValue) {
      history.push(
        setRoute(`${ADDRESS_TOKEN_LIST_PAGE_URL_NAME}/${searchValue}`)
      );
      setShowSearchBar(false);
    }
  };

  const handleOnchange = (e) => setSearchValue(e.target.value);

  const loadMobileNavItems = () => {
    if (isOpen) {
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
        </Nav>
      );
    }
  };

  const loadDesktopNavItems = () => {
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
          <Button tag={NavLink} color='link' onClick={searchToggle}>
            <MdSearch />
          </Button>
        </NavItem>
      </Nav>
    );
  };

  return (
    <>
      <Mobile>
        <Navbar
          className={`${styles.navigation} ${showSearchBar ? 'm-0' : ''}`}
          light
          expand='md'
        >
          {showSearchBar ? (
            <SearchBar
              searching={{}}
              toggleSearch={searchToggle}
              onChange={handleOnchange}
              formGroupClass='m-0'
              onSubmit={handleSubmitFunc}
            />
          ) : (
            <>
              <NavbarBrand
                tag={RRNavLink}
                to={`/DFI/${props.network}/pool`}
                className='mr-auto'
              >
                <img src={MobileLogo} className={styles.logo} />
                {I18n.t('containers.navBar.explorerTitle')}
              </NavbarBrand>
              <NavbarToggler onClick={toggle} />
              <Button
                tag={NavLink}
                className={styles.mobileSearchBtn}
                color='link'
                onClick={searchToggle}
              >
                <MdSearch />
              </Button>
              <Collapse isOpen={isOpen} navbar>
                {loadMobileNavItems()}
                {isOpen && <NetworkCurrency {...props} />}
              </Collapse>
            </>
          )}
        </Navbar>
      </Mobile>
      <Desktop>
        <Navbar className={styles.navigation} light expand='md'>
          <NavbarBrand
            tag={RRNavLink}
            to={`/DFI/${props.network}/pool`}
            className='mr-auto'
          >
            <Logo className={styles.logo} />
            {I18n.t('containers.navBar.explorerTitle')}
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen navbar>
            {loadDesktopNavItems()}
            <NetworkCurrency {...props} />
          </Collapse>
        </Navbar>
      </Desktop>
    </>
  );
};

const mapStateToProps = ({ app }) => ({
  network: app.network,
});

const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavbarComponent)
);
