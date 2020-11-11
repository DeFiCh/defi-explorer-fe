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
  TOKEN_LIST_PAGE_URL_NAME,
  POOL_LIST_PAGE_URL_NAME,
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

interface NavbarComponentProps extends RouteComponentProps {
  network: string;
}

const NavbarComponent = (props: NavbarComponentProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

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
        {isOpen && (
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
        )}
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
