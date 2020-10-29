import React from 'react';
import { Nav, NavItem, NavLink, Row } from 'reactstrap';
import MenuDropdown from './component/MenuDropdown';
import defiAppIcon from '../../assets/svg/logo-defi.svg';
import {
  INDEX_PATH,
  TOKENS_PATH,
  PAIRS_PATH,
  BLOCK_PAGE_BASE_PATH,
  TRANSACTION_BASE_PATH,
} from '../../constants';
import { NavLink as RRNavLink, withRouter } from 'react-router-dom';
import { I18n } from 'react-redux-i18n';
import styles from './NavBar.module.scss';

const NavbarComponent = () => {
  return (
    <>
      <div className={styles.navs}>
        <Nav className='bg-white'>
          <NavItem>
            <NavLink to={INDEX_PATH} tag={RRNavLink}>
              <span>
                <img src={defiAppIcon} />
              </span>
              <span>{I18n.t('containers.navBar.explorerTitle')}</span>
            </NavLink>
          </NavItem>

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

          <NavItem>
            <MenuDropdown />
          </NavItem>
        </Nav>
      </div>
    </>
  );
};

export default withRouter(NavbarComponent);
