import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../assets/logo/logo-web-transparent.png';
import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import HeaderDropdown  from './HeaderDropdown'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class Header extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
      <AppSidebarToggler className="d-lg-none" display="md" mobile />
      <AppNavbarBrand
        full={{ src: logo, width: 48, height: 58, alt: 'Kramaa Logo' }}
        minimized={{ src: logo, width: 48, height: 58, alt: 'Kramaa Logo' }} 
      />
      <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <Link to="/profile">Profile</Link>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <HeaderDropdown notif/>
          <HeaderDropdown onLogout={this.props.onLogout} accnt/>
        </Nav>
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
