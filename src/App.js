import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { GamesProvider } from './contexts/GamesContext';
import Home from './pages/Home';
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';

defineElement(lottie.loadAnimation);
export default function App() {
  return (
    <>
      <ToastContainer />
        <GamesProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route index path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </GamesProvider>
    </>
  );
}