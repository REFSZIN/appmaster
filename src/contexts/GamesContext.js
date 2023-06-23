/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import useGames from '../hooks/api/useGames';

const GamesContext = createContext();

export function GamesProvider({ children }) {
  const [gamesData, setGamesData] = useLocalStorage('gamesData', []);
  const [statusApi, setStatusApi] = useState(null);
  const [errormsg, setError] = useState('');
  const { getStatus, getGames } = useGames();

  useEffect(() => {
    let isCancelled = false;
    let timer;

    async function fetchData() {
      try {
        const status = await getStatus();
        if (status?.alive !== false) {
          setStatusApi(status.alive);
          const games = await getGames();
          timer = setTimeout(() => {
            if (isCancelled) {
              setError('O servidor demorou para responder, tente novamente mais tarde.');
            }
          }, 5000);
          clearTimeout(timer);
          if (!isCancelled) {
            setGamesData(games);
          }
        } else {
          setError('O servidor não está respondendo.');
          handleErrorResponse(status?.statusCode);
        }
      } catch (errormsg) {
        setError('O servidor não está respondendo.');
        handleErrorResponse(errormsg?.statusCode);
      }
    }

    fetchData();

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };

  }, []);

  const handleErrorResponse = (statusCode) => {
    if (statusCode && [500, 502, 503, 504, 507, 508, 509].includes(statusCode)) {
      setError('O servidor falhou em responder, tente recarregar a página.');
    } else {
      setError('O servidor não conseguiu responder no momento, tente novamente mais tarde.');
    }
  };

  return (
    <GamesContext.Provider value={{ gamesData, setGamesData, statusApi, errormsg }}>
      {children}
    </GamesContext.Provider>
  );
}

export default GamesContext;