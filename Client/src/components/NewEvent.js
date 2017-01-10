import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Select from 'react-select';
import unitedStatesList from '../helpers/unitedStatesList';

const Wrapper = styled.div`
  color: #2C3E50;
  width: 100%;
  padding: 20px;
  margin: 0 auto;
`;

const TitleWrapper = styled.div`
  position: relative;
`;

const FormTitle = styled.h1`
  display: block;
  width: 20vw;
  font-weight: bold;
  margin: 0 auto;
  text-align: center;
  font-size: 1.5em;
  margin-bottom: 5px;

  @media (max-width: 600px) {
    width: 60%;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 0;
`;

const Input = styled.input`
  border-radius: 3px;
  border: none;
  padding: 10px;
  color: #000;
  font-size: 16px;
  margin: 0 auto;
  width: 100%;
  margin-bottom: 5px;
  border: 1px solid rgb(238, 238, 238);
`;

const DescriptionInput = styled.textarea`
  font-size: 16px;
  color: #000;
  border: none;
  border-radius: 3px;
  padding: 10px;
  width: 100%;
  height: 150px;
  border: 1px solid rgb(238, 238, 238);
`;

const Center = styled.div`
  width: 30vw;
  margin: 0 auto;

  @media (max-width: 1200px) {
    width: 60vw;
  }

  @media (max-width: 500px) {
    width: 90%;
  }
`;

const TimeInputs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 30vw;
  margin: 0 auto;

  @media (max-width: 1200px) {
    width: 60vw;
  }

  @media (max-width: 500px) {
    width: 90%;
  }
`;

const TimeWrapper = styled.div`
  width: 14.25vw;

  @media (max-width: 1200px) {
    width: 28.5vw;
  }

  @media (max-width: 500px) {
    width: 45.125%;
  }
`;

const FormError = styled.div`
  font-weight: bold;
  color: #E74C3C;
`;

const AddBtn = styled.button`
  background-color: rgb(35, 218, 91);
  border: none;
  border-radius: 3px;
  padding: 10px;
  font-weight: bold;
  display: block;
  width: 14.25vw;
  color: #fff;

  @media (max-width: 1200px) {
    width: 28.5vw;
  }

  @media (max-width: 500px) {
    width: 45.125%;
  }
`;

const CancelBtn = styled.button`
  border: none;
  border-radius: 3px;
  padding: 10px;
  font-weight: bold;
  display: block;
  width: 14.25vw;
  color: #fff;

  @media (max-width: 1200px) {
    width: 28.5vw;
  }

  @media (max-width: 500px) {
    width: 45.125%;
  }
`;

const ButtonWrapper = styled.div`
  width: 30vw;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;

  @media (max-width: 1200px) {
    width: 60vw;
  }

  @media (max-width: 500px) {
    width: 90%;
  }
`;

const CenterAlign = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 30vw;
  margin: 0 auto;

  @media (max-width: 1200px) {
    width: 60vw;
  }

  @media (max-width: 500px) {
    width: 90%;
  }
`;

const NewEvent = (props) => (
  <Wrapper editing={props.editing}>
    <TitleWrapper>
      <FormTitle>New Event</FormTitle>
    </TitleWrapper>

    <Center>
      <Label>Organization</Label>
      <Select
        name="organization"
        value={props.selectedOrganization}
        options={props.userOrganizations}
        onChange={props.onChangeOrganization}/>
    </Center>

    <FormWrapper>
      <Center>
        <Label>Name</Label>
        <FormError>{props.validationErrors.get('name')}</FormError>
        <Input type="text" onChange={props.onChange.bind(null, 'name')}/>
      </Center>

      <Center>
        <Label>Description</Label>
        <FormError>{props.validationErrors.get('description')}</FormError>
        <DescriptionInput onChange={props.onChange.bind(null, 'description')}/>
      </Center>

      <CenterAlign>
        <TimeWrapper>
          <Label>Address</Label>
          <FormError>{props.validationErrors.get('address')}</FormError>
          <Input type="text" onChange={props.onChange.bind(null, 'address')}/>
        </TimeWrapper>

        <TimeWrapper>
          <Label>City</Label>
          <FormError>{props.validationErrors.get('city')}</FormError>
          <Input type="text" onChange={props.onChange.bind(null, 'city')}/>
        </TimeWrapper>
      </CenterAlign>

      <Center>
        <Label>State</Label>
        <Select style={{marginBottom: '5px', fontSize: '16px'}}
          name="event-state"
          value={props.state}
          options={unitedStatesList}
          onChange={props.onChangeState}/>
      </Center>

      <Center>
        <Label>ZIP Code</Label>
        <FormError>{props.validationErrors.get('zipCode')}</FormError>
        <Input type="text" onChange={props.onChange.bind(null, 'zipCode')}/>
      </Center>

      <Center>
        <Label>Date</Label>
        <FormError>{props.validationErrors.get('date')}</FormError>
        <Input type="date" onChange={props.onChange.bind(null, 'date')}/>
      </Center>

      <TimeInputs>
        <TimeWrapper>
          <Label>Start Time</Label>
          <FormError>{props.validationErrors.get('startTime')}</FormError>
          <Input type="time" onChange={props.onChange.bind(null, 'startTime')}/>
        </TimeWrapper>

        <TimeWrapper>
          <Label>End Time</Label>
          <FormError>{props.validationErrors.get('endTime')}</FormError>
          <Input type="time" onChange={props.onChange.bind(null, 'endTime')}/>
        </TimeWrapper>
      </TimeInputs>

      <ButtonWrapper>
        <AddBtn type="button" onClick={props.onSubmit}>Save</AddBtn>
        <CancelBtn type="button" onClick={props.onCancel}>Cancel</CancelBtn>
      </ButtonWrapper>
    </FormWrapper>
  </Wrapper>
);

export default NewEvent;