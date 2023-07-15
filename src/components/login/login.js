import { LoginContainer, LoginForm, LoginFormBtns, LoginFormTitle, Input, InputContainer, Button, ToggleLink, PasswordToggle } from './styled';
import React, { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import UserContext from '../../contexts/UserContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'firebase/compat/auth';

export default function Login() {
  const navigate = useNavigate();
  const { setUserData, showConfirmPassword, showPassword, isLoginScreen, name, setName, confirmPassword, setConfirmPassword, password, setPassword, email, setEmail,  toggleScreen, togglePasswordVisibility, toggleConfirmPasswordVisibility } = useContext(UserContext);

  useEffect(() => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <LoginContainer>
      <LoginForm>
        <LoginFormTitle>
          <h1>{isLoginScreen ? 'Login' : 'Cadastro'}</h1>
          <lord-icon
            src="https://cdn.lordicon.com/ajkxzzfb.json"
            trigger="hover"
            alt="UserIcon"
            colors="primary:#ffc738,secondary:#4bb3fd"
            style={{ width: '150px', height: '150px' }}
          />
        </LoginFormTitle>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          autoComplete='email'
          onChange={(e) => setEmail(e.target.value)}
        />
        {isLoginScreen ? null : (
          <Input
            type="text"
            name="Nome"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <InputContainer>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Senha"
            name="password"
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
              name="confirmPassword"
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