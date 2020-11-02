import React from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  Collapse,
} from 'reactstrap';
import MenuDropdown from './component/MenuDropdown';
import {
  TOKENS_PATH,
  PAIRS_PATH,
  BLOCK_PAGE_BASE_PATH,
  TRANSACTION_BASE_PATH,
} from '../../constants';
import { NavLink as RRNavLink, withRouter } from 'react-router-dom';
import { I18n } from 'react-redux-i18n';
import styles from './NavBar.module.scss';
import Logo from '../../components/Logo';
import NetworkCurrency from './component/NetworkCurrency';

const NavbarComponent = () => {
  return (
    <Navbar className={styles.navigation} light expand='md'>
      <NavbarBrand href='/' className='mr-auto'>
        <Logo className={styles.logo} />
        <span>{I18n.t('containers.navBar.explorerTitle')}</span>
      </NavbarBrand>
      <Collapse isOpen={true} navbar>
        <Nav className='m-auto' navbar>
          <NavItem>
            <NavLink to={BLOCK_PAGE_BASE_PATH} tag={RRNavLink}>
              {I18n.t('containers.navBar.blocks')}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={TRANSACTION_BASE_PATH} tag={RRNavLink}>
              {I18n.t('containers.navBar.transactions')}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={TOKENS_PATH} tag={RRNavLink}>
              {I18n.t('containers.navBar.tokens')}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={PAIRS_PATH} tag={RRNavLink}>
              {I18n.t('containers.navBar.pairs')}
            </NavLink>
          </NavItem>
        </Nav>
        <NetworkCurrency />
      </Collapse>
    </Navbar>
  );
};

export default withRouter(NavbarComponent);
