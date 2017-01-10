import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import unitedStatesList from '../helpers/unitedStatesList';

const Wrapper = styled.div`
  background-color: #fff;
  color: #fff;
  background-color: #2980B9;
  width: 100%;
  padding: 20px;
  width: 100%;
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

  @media (max-width: 500px) {
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

  @media (max-width: 1200px) {
    width: 60vw;
  }

  @media (max-width: 500px) {
    width: 90%;
  }
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

  @media (max-width: 650px) {
    width: 45%
  }
`;

const CancelBtn = styled.button`
  border: none;
  border-radius: 3px;
  padding: 10px;
  font-weight: bold;
  display: block;
  width: 14.25vw;

  @media (max-width: 650px) {
    width: 45%
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

  @media (max-width: 650px) {
    width: 90%;
  }
`;

const EditOrganizationModal = ({ organization, ...props }) => (
  <Wrapper editing={props.editing}>
    <TitleWrapper>
      <FormTitle>Edit Organization</FormTitle>
      <CloseIcon onClick={props.onCancel} className="fa fa-times-circle-o" aria-hidden="true"></CloseIcon>
    </TitleWrapper>

    <FormWrapper>
      <Center>
        <Label>Name</Label>
        <FormError>{props.validationErrors.get('name')}</FormError>
        <Input type="text" onChange={props.onChange.bind(null, 'name')} defaultValue={organization.name}/>
      </Center>

      <Center>
        <Label>Description</Label>
        <FormError>{props.validationErrors.get('description')}</FormError>
        <DescriptionInput onChange={props.onChange.bind(null, 'description')} defaultValue={organization.description}/>
      </Center>

      <Center>
        <Label>City</Label>
        <FormError>{props.validationErrors.get('city')}</FormError>
        <Input type="text" onChange={props.onChange.bind(null, 'city')} defaultValue={organization.city}/>
      </Center>

      <Center>
        <Label>State</Label>
        <Select style={{marginBottom: '5px', fontSize: '16px'}}
          name="organization-state"
          value={organization.state}
          options={unitedStatesList}
          onChange={props.onChangeState}/>
      </Center>

      <ButtonWrapper>
        <AddBtn type="button" onClick={props.onSubmit}>Save</AddBtn>
        <CancelBtn type="button" onClick={props.onCancel}>Cancel</CancelBtn>
      </ButtonWrapper>
    </FormWrapper>
  </Wrapper>
);

export default EditOrganizationModal;