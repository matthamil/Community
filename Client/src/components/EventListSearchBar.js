import React, { PropTypes } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 75vw;
  padding: 10px;
  margin: 0 auto;
  background-color: #0f1721;
  position: absolute;
  transform: translateY(-30px) translateX(12.5vw);
`;

const Search = styled.input`
  height: 40px;
  width: 30vw;
  border: none;
  padding: 0 15px;
  border-radius: 2px 0 0 2px;
`;


const SearchButton = styled.button`
  border: none;
  background-color: #fff;
  font-size: 1em;
  color: #2d2d2d;
  padding: 5px 10px;
  width: 40px;
  height: 40px;
  border-radius: 0 2px 2px 0;
  &:focus {
    outline: none;
  }
`;

const Location = styled.input`
  background-color: #0f1721;
  border: none;
  color: #fff;
  text-decoration: underline;
`;

const EventListSearchBar = (props) => (
  <Wrapper>
    <Search type="text" onChange={props.onChange}/>
    <SearchButton type="button" onClick={props.onSubmit}><i className="fa fa-search" aria-hidden="true"></i></SearchButton>
    <label>Find</label>
      <Location type="text" onChange={props.onChangeLocation} placeholder="Nashville, TN"/>
  </Wrapper>
);

EventListSearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeLocation: PropTypes.func.isRequired
};

export default EventListSearchBar;