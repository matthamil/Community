import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #fff;
  color: #fff;
  background-color: #2980B9;
  background-image: linear-gradient(to bottom, #2b678e, #2980B9 1.5%, #2980B9);
  width: 100%;
  padding: 20px;
  width: 100%
  margin: 0 auto;
`;

const CloseIcon = styled.i`
  display: block;
  position: absolute;
  float: right;
  top: 0;
  right: 0;
  font-size: 2em;
  color: rgb(250, 250, 250);
  text-shadow: 0 2px 2px #2a5b7b;
  &:hover {
    cursor: pointer;
  }
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
  text-shadow: 0 2px 2px #2a5b7b;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 0;
  text-shadow: 0 2px 2px #2a5b7b;
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
`;

const DescriptionInput = styled.textarea`
  font-size: 16px;
  color: #000;
  border: none;
  border-radius: 3px;
  padding: 10px;
  width: 100%;
  height: 150px;
`;

const Center = styled.div`
  width: 30vw;
  margin: 0 auto;
`;

const TimeInputs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 30vw;
  margin: 0 auto;
`;

const TimeWrapper = styled.div`
  width: 14.25vw;
`;

const FormError = styled.div`
  font-weight: bold;
  color: rgb(255, 206, 10);
`;

const AddBtn = styled.button`
  background-color: rgb(35, 218, 91);
  border: none;
  border-radius: 3px;
  padding: 10px;
  font-weight: bold;
  display: block;
  width: 14.25vw;
`;

const CancelBtn = styled.button`
  border: none;
  border-radius: 3px;
  padding: 10px;
  font-weight: bold;
  display: block;
  width: 14.25vw;
`;

const ButtonWrapper = styled.div`
  width: 30vw;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
`;

const NewEventMember = (props) => (
  <Wrapper>
    <TitleWrapper>
      <FormTitle>New Position</FormTitle>
      <CloseIcon onClick={props.onCancel} className="fa fa-times-circle-o" aria-hidden="true"></CloseIcon>
    </TitleWrapper>

    <FormWrapper>
      <Center>
        <Label>Job Title</Label>
        <FormError>{props.validationErrors.get('jobTitle')}</FormError>
        <Input type="text" onChange={props.onChange.bind(null, 'jobTitle')}/>
      </Center>

      <Center>
        <Label>Description</Label>
        <FormError>{props.validationErrors.get('description')}</FormError>
        <DescriptionInput onChange={props.onChange.bind(null, 'description')}/>
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
        <AddBtn type="button" onClick={props.onSubmit}>Add</AddBtn>
        <CancelBtn type="button" onClick={props.onCancel}>Cancel</CancelBtn>
      </ButtonWrapper>
    </FormWrapper>
  </Wrapper>
);

export default NewEventMember;