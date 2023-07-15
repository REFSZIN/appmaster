import React, { createContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const UserContext = createContext();
export default UserContext;

export function UserProvider({ children }) {
  const [userData, setUserData] = useLocalStorage('user', null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    <UserContext.Provider value={{ userData, setUserData, showConfirmPassword, setShowConfirmPassword, showPassword, setShowPassword, isLoginScreen, setIsLoginScreen, name, setName, confirmPassword, setConfirmPassword, password, setPassword, email, setEmail, toggleScreen, togglePasswordVisibility, toggleConfirmPasswordVisibility }}>
      {children}
    </UserContext.Provider>
  );
}