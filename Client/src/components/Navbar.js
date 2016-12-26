import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

const NavWrapper = styled.nav`
  width: 100vw;
  height: 12.5vh;
  display: flex;
  align-items: center;
  background-color: #fff;
  color: #d2d2d2;
  font-family: 'Open Sans', sans-serif;
`;

const InnerNav = styled.div`
  width: 75vw;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 600px) {
    max-height: 12.5vh;
    flex-direction: column;
    justify-content: space-around;
    background: none;
  }
`;

const NavHeader = styled.h1`
  font-weight: 800;
  font-size: 2em;
  letter-spacing: -1px;
  stroke: 2px
  color: #2C3E50;
  margin: 0;
  margin-left: 10px;
  letter-spacing: -2px;

  @media (max-width: 600px) {
    font-size: 1.25em;
    margin-top: 10px;
    display: none;
  }
`;

const LoginButton = styled.button`
  border: none;
  background-color: #2C3E50;
  font-weight: 600;
  color: #fff;
  height: 40px;
  min-width: 80px;
  padding: 5px 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.15s ease-out;

  &:hover {
    background-color: #3498DB;
  }

  @media (max-width: 650px) {
    height: 12.5vh;
    background: none;
    color: #2C3E50;
    font-size: 1.5em;

    &:hover {
      color: #fff;
    }
  }
`;

const LoginRegisterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const LoginIcon = styled.div`
  margin-right: 10px;
`;

const StartAnOrganizationLink = styled.div`
  border: none;
  background-color: #fff;
  font-weight: 600;
  color: #2C3E50;
  height: 40px;
  min-width: 80px;
  padding: 5px 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-right: 5px;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 650px) {
    font-size: 1.5em;
    margin: 0;
  }
`;

const Navbar = ({ user, loggedIn }) => (
  <NavWrapper>
    <InnerNav>
      <Link to="/" style={{ textDecoration: 'none' }}><NavHeader>Community</NavHeader></Link>
      {/* If the user is logged in, hide the LogIn and Register buttons */
      loggedIn ?
      <LoginRegisterWrapper>
        <Link to="/organizations/new" style={{ textDecoration: 'none' }}>
          <StartAnOrganizationLink>
            <LoginIcon>
              <i className="fa fa-plus" style={{ color: '#E74C3C' }} aria-hidden="true"></i>
            </LoginIcon>
            <span>{window.screen.availWidth > 600 ? 'Start an Organization' : 'Organization'}</span>
          </StartAnOrganizationLink>
        </Link>
        <Link to="/events" style={{ textDecoration: 'none' }}>
          <LoginButton>
            <LoginIcon>
              <i className="fa fa-calendar" aria-hidden="true"></i>
            </LoginIcon>
            <span>{window.screen.availWidth > 600 ? 'Your Events' : 'Events'}</span>
          </LoginButton>
        </Link>
      </LoginRegisterWrapper>
      : /* If the user is not logged in, show LogIn and Register buttons */
      <LoginRegisterWrapper>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <LoginButton style={{marginRight: '5px'}}>
            <LoginIcon>
              <i className="fa fa-user" aria-hidden="true"></i>
            </LoginIcon>
            <span>LogIn</span>
          </LoginButton>
        </Link>
        <Link to="/register" style={{ textDecoration: 'none' }}>
          <LoginButton>
            <LoginIcon>
              <i className="fa fa-plus" aria-hidden="true"></i>
            </LoginIcon>
            <span>Register</span>
          </LoginButton>
        </Link>
      </LoginRegisterWrapper>
      }
    </InnerNav>
  </NavWrapper>
);

Navbar.propTypes = {
  user: PropTypes.object.isRequired
};

export default Navbar;