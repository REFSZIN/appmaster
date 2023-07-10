import styled from 'styled-components';

export const LoginContainer = styled.section`
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

export const LoginForm = styled.div`
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

export const LoginFormBtns = styled.div`
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

export const LoginFormTitle = styled.div`
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

export const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Button = styled.button`
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

export const ToggleLink = styled.span`
  color: #007bff;
  cursor: pointer;
  font-size: 12px;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }
`;

export const PasswordToggle = styled.span`
  color: #007bff;
  cursor: pointer;
  font-size: 22px;
  margin-left: 5px;

  &:hover {
    text-decoration: underline;
  }
`;