import React from 'react';
import { Nav, NavItem, NavLink, Row } from 'reactstrap';
import MenuDropdown from './component/MenuDropdown';
import defiAppIcon from '../../assets/svg/logo-defi.svg';
import {
  INDEX_PATH,
  TOKENS_PATH,
  PAIRS_PATH,
  BLOCKS_PAGE,
  TRANSACTIONS_PAGE,
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
              <span>Explorer</span>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink to={BLOCKS_PAGE} tag={RRNavLink}>
              {I18n.t('containers.navBar.blocks')}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={TRANSACTIONS_PAGE} tag={RRNavLink}>
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
