import { LoginContainer, LoginForm, LoginFormBtns, LoginFormTitle, Input, InputContainer, Button, ToggleLink, PasswordToggle } from './styled';
import React, { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import UserContext from '../../contexts/UserContext';
import 'firebase/compat/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { setUserData } = useContext(UserContext);

  useEffect(() => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
  }, [isLoginScreen]);

  const handleLogin = async () => {
    if (password.length < 6) {
      toast.error('A senha deve ter 6 caracteres ou mais.');
      return;
    }
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

    if (password.length < 6) {
      toast.error('A senha deve ter 6 caracteres ou mais.');
      return;
    }

    try {
      const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
      await response.user.updateProfile({
        displayName: name,
      });
      const signInResponse = await firebase.auth().signInWithEmailAndPassword(email, password);
      setUserData(signInResponse.user);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
        {isLoginScreen ? null : (
          <Input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <InputContainer>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordToggle onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </PasswordToggle>
        </InputContainer>
        {!isLoginScreen && (
          <InputContainer>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirmar Senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <PasswordToggle onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </PasswordToggle>
          </InputContainer>
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
};