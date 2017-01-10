import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #2C3E50;
  width: 100%;
  height: 100%;
  margin-top: 5px;
`;

const Loading = () => (
  <Wrapper>
    <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
    <span className="sr-only">Loading...</span>
  </Wrapper>
);

export default Loading;