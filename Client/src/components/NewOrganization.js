import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import unitedStatesList from '../helpers/unitedStatesList';

const Wrapper = styled.div`
  color: #2C3E50;
  width: 100%;
  padding: 20px;
  margin: 0 auto;
  margin-top: 20px;
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

  @media (max-width: 800px) {
    width: 60%;
  }

  @media (max-width: 700px) {
    width: 70%;
  }

  @media (max-width: 400px) {
    width: 90%;
  }
`;

const FormError = styled.div`
  font-weight: bold;
  color: #E74C3C;
`;

const AddBtn = styled.button`
  background-color: rgb(35, 218, 91);
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px;
  font-weight: bold;
  display: block;
  width: 14.25vw;

  @media (max-width: 700px) {
    width: 45%;
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

  @media (max-width: 700px) {
    width: 45%;
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

  @media (max-width: 700px) {
    width: 70%;
  }

  @media (max-width: 400px) {
    width: 90%;
  }
`;

const EditOrganizationModal = (props) => (
  <Wrapper editing={props.editing}>
    <TitleWrapper>
      <FormTitle>New Organization</FormTitle>
    </TitleWrapper>

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

      <Center>
        <Label>City</Label>
        <FormError>{props.validationErrors.get('city')}</FormError>
        <Input type="text" onChange={props.onChange.bind(null, 'city')}/>
      </Center>

      <Center>
        <Label>State</Label>
        <FormError>{props.validationErrors.get('state')}</FormError>
        <Select style={{marginBottom: '5px', fontSize: '16px'}}
          name="organization-state"
          value={props.selectedState}
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