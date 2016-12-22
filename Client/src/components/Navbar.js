import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

const NavWrapper = styled.nav`
  width: 100vw;
  height: 12.5vh;
  padding: 5px;
  background-color: #fff;
  color: #d2d2d2;
  font-family: 'Open Sans', sans-serif;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-around;

  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: space-around;
    height: 25vh;
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

  @media (max-width: 600px) {
    font-size: 1.25em;
    margin-top: 10px;
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
  margin-right: 5px;

  &:hover {
    background-color: #3498DB;
  }
`;

const LoginRegisterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LoginIcon = styled.div`
  margin-right: 10px;
`;

const Navbar = (props) => (
  <NavWrapper>
    <Link to="/" style={{ textDecoration: 'none' }}><NavHeader>Community</NavHeader></Link>
    <LoginRegisterWrapper>
      <Link to="/login" style={{ textDecoration: 'none' }}>
        <LoginButton>
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
  </NavWrapper>
);

export default Navbar;