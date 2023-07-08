import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import UserContext from '../contexts/UserContext';
import 'firebase/compat/auth';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const { setUserData } = useContext(UserContext);

  const handleLogin = async () => {
    try {
      const response = await firebase.auth().signInWithEmailAndPassword(email, password);
      setUserData(response.user);
      navigate('/');
      toast('Login realizado com sucesso.');
    } catch (error) {
      toast.error('Login inválido.');
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem.');
      return;
    }

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const response = await firebase.auth().signInWithEmailAndPassword(email, password);
      setUserData(response.user);
      navigate('/');
      toast('Cadastro e Login realizado com sucesso.');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('O email já está em uso. Por favor, use um email diferente.');
      } else {
        toast.error('Falha ao criar conta, tente novamente.');
      }
    }
  };

  const toggleScreen = () => {
    setIsLoginScreen(!isLoginScreen);
  };

  return (
    <LoginContainer>
      <LoginForm>
        <LoginFormTitle>
          <h1>{isLoginScreen ? 'Login' : 'Cadastro'}</h1>
          <lord-icon
            src="https://cdn.lordicon.com/ajkxzzfb.json"
            trigger="hover"
            colors="primary:#ffc738,secondary:#4bb3fd"
            style={{ width: '250px', height: '250px' }}
          />
        </LoginFormTitle>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isLoginScreen ? null : (
          <Input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <LoginFormBtns>
          <Button onClick={isLoginScreen ? handleLogin : handleSignUp}>
            {isLoginScreen ? 'Entrar' : 'Criar conta'}
          </Button>
          <ToggleLink onClick={toggleScreen}>
            {isLoginScreen ? 'Criar uma conta' : 'Já possui uma conta?'}
          </ToggleLink>
        </LoginFormBtns>
      </LoginForm>
    </LoginContainer>
  );
}

const LoginContainer = styled.section`
  margin-bottom: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 900px) {
    margin-bottom: 250px;
  }
`;

const LoginForm = styled.div`
  background-color: #181A1B;
  margin-top: 160px;
  border: 1px solid #0056b3;
  border-radius: 4px;
  padding: 20px;
  width: 300px;
  max-width: 100%;
  @media (max-width: 900px) {
    margin-top: 100px;
  }
`;

const LoginFormBtns = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
`;

const LoginFormTitle = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ToggleLink = styled.span`
  color: #007bff;
  cursor: pointer;
  font-size: 12px;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }
`;