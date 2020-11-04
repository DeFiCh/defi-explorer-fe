import React, { useState } from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
} from 'reactstrap';
import {
  TOKEN_BASE_PATH,
  POOL_BASE_PATH,
  // BLOCK_PAGE_BASE_PATH,
  // TRANSACTION_BASE_PATH,
} from '../../constants';
import { NavLink as RRNavLink, withRouter } from 'react-router-dom';
import { I18n } from 'react-redux-i18n';
import styles from './NavBar.module.scss';
import Logo from '../../components/Logo';
import NetworkCurrency from './component/NetworkCurrency';

const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar className={styles.navigation} light expand='md'>
      <NavbarBrand href='/' className='mr-auto'>
        <Logo className={styles.logo} />
        <span>{I18n.t('containers.navBar.explorerTitle')}</span>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className='m-auto' navbar>
          {/* <NavItem>
            <NavLink to={BLOCK_PAGE_BASE_PATH} tag={RRNavLink}>
              {I18n.t('containers.navBar.blocks')}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={TRANSACTION_BASE_PATH} tag={RRNavLink}>
              {I18n.t('containers.navBar.transactions')}
            </NavLink>
          </NavItem> */}
          <NavItem>
            <NavLink to={TOKEN_BASE_PATH} tag={RRNavLink}>
              {I18n.t('containers.navBar.tokens')}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={POOL_BASE_PATH} tag={RRNavLink}>
              {I18n.t('containers.navBar.pool')}
            </NavLink>
          </NavItem>
        </Nav>
        <NetworkCurrency />
      </Collapse>
    </Navbar>
  );
};

export default withRouter(NavbarComponent);
