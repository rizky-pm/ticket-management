import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { BASE_URL } from '../constants';

const Container = styled.section`
  position: relative;
  background-color: ${(props) => props.theme.color.accent};
  height: 100vh;
`;

const FormContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  width: 75%;
  flex-direction: column;
  padding: 10px;
  border-radius: 5px;
  row-gap: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

const Label = styled.label`
  color: ${(props) => props.theme.color.light};
`;

const Input = styled.input`
  padding: 10px 15px;
  border-radius: 2px;
  border: 2px solid ${(props) => props.theme.color.accent};
  transition: 0.2s ease-in;

  &:focus {
    border: 2px solid ${(props) => props.theme.color.dark};
    outline: none;
  }
`;

const Heading1 = styled.h1`
  font-size: 36px;
  font-weight: bold;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: ${(props) => props.theme.color.dark};
  outline: none;
  border: 2px solid ${(props) => props.theme.color.light};
  color: ${(props) => props.theme.color.light};
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 5px;
  transition: 0.3s ease-in;

  &:hover {
    background-color: ${(props) => props.theme.color.light};
    color: ${(props) => props.theme.color.dark};
    border: 2px solid ${(props) => props.theme.color.dark};
  }
`;

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('superadmin');
  const [password, setPassword] = useState('superadmin');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(BASE_URL + '/login', {
        email,
        password,
      });
      console.log(response);

      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data));
        setIsLoading(false);
        navigate('/');
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, []);

  return (
    <Container>
      <FormContainer>
        <Heading1>LOGIN PAGE</Heading1>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <InputContainer>
            <Label htmlFor='email'>Email</Label>
            <Input
              type='text'
              id='email'
              name='email'
              value={email}
              required
              onChange={(e) => {
                handleEmailInput(e);
              }}
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor='password'>Password</Label>
            <Input
              type='password'
              id='password'
              name='password'
              value={password}
              required
              onChange={(e) => {
                handlePasswordInput(e);
              }}
            />
          </InputContainer>
          <Button>{isLoading ? 'SIGNING IN...' : 'SIGN IN'}</Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default LoginPage;
