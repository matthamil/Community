import React, { PropTypes } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 75vw;
  padding: 10px;
  margin: 0 auto;
  background-color: #0f1721;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  transform: translateY(-30px) translateX(12.5vw);

  @media (max-width: 950px) {
    flex-direction: column;
    position: static;
    transform: none;
    width: 100vw;
    padding: 20px 10px;
  }
`;

const Search = styled.input`
  height: 40px;
  width: 30vw;
  border: none;
  padding: 0 15px;
  border-radius: 2px 0 0 2px;

  @media (max-width: 950px) {
    width: 60vw;
  }
  @media (max-width: 600px) {
    width: 85%;
  }
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

  @media (max-width: 950px) {
    width: 20vw;
  }
  @media (max-width: 600px) {
    width: 15%;
  }
`;

const SearchWrapper = styled.div`
  @media (max-width: 600px) {
    width: 80%;
  }
`;

const Location = styled.input`
  background-color: #0f1721;
  display: inline-block;
  border: none;
  color: #fff;
  border-bottom: 1px dotted rgba(255,255,255,.2);
  @media (max-width: 950px) {
    margin: 15px 0;
    font-weight: bold;
  }
`;

const TypeOptions = styled.ul`
  text-decoration: none;
  border: 1px solid rgba(255,255,255,.2);
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 950px) {
    width: 80vw;
  }
`;

const Type = styled.li`
  text-decoration: none;
  color: #fff;
  list-style: none;
  display: block;
  padding: 10px 20px;
  background-color: ${props => props.selected ? 'rgba(255,255,255,.2)!important' : ''};
  box-shadow: ${props => props.selected ? 'inset -1px 1px 2px 0 rgba(0,0,0,.54)' : ''};
  @media (max-width: 950px) {
    width: 40vw;
    text-align: center;
  }
`;

const SearchLabel = styled.label`
  display: inline;
  color: #f2f2f2;
  margin-right: 5px;
`;

const EventListSearchBar = (props) => (
  <Wrapper>
    <SearchWrapper>
      <Search type="text" onChange={props.onChangeSearch}/>
      <SearchButton type="button" onClick={props.onSubmit}><i className="fa fa-search" aria-hidden="true"></i></SearchButton>
    </SearchWrapper>

    {window.screen.availWidth > 950 ?
      <Location type="text" onChange={props.onChangeLocation} placeholder="Nashville, TN"/>
      :
      <div>
        <SearchLabel>Search in:</SearchLabel>
        <Location type="text" onChange={props.onChangeLocation} placeholder="Nashville, TN"/>
      </div>}

    <TypeOptions>
      <Type selected={props.searchType === 'event'} style={{borderRight: '1px solid rgba(255,255,255,.2)'}} onClick={props.onChangeSearchType.bind(null, 'event')}>Events</Type>
      <Type selected={props.searchType === 'organization'} onClick={props.onChangeSearchType.bind(null, 'organization')}>Organizations</Type>
    </TypeOptions>

  </Wrapper>
);

EventListSearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChangeSearch: PropTypes.func.isRequired,
  onChangeLocation: PropTypes.func.isRequired,
  onChangeSearchType: PropTypes.func.isRequired,
  searchType: PropTypes.string.isRequired
};

export default EventListSearchBar;