import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { GamesProvider } from './contexts/GamesContext';
import { UserProvider } from './contexts/UserContext';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCmrOKFfM9TEqNcDmgYfytHrcOGg3lN2uY",
  authDomain: "appmasters-8aa8e.firebaseapp.com",
  projectId: "appmasters-8aa8e",
  storageBucket: "appmasters-8aa8e.appspot.com",
  messagingSenderId: "804104280141",
  appId: "1:804104280141:web:189bbfb7d14391281ca404",
  measurementId: "G-J4WJ5C7Z45"
};

export default function App() {
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    getAnalytics(app);
  }, [ ]);

  return (
    <>
      <ToastContainer />
      <UserProvider>
        <GamesProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth/" element={<LoginPage />} />
              <Route index path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </GamesProvider>
      </UserProvider>
    </>
  );
}
