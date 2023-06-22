import React, { createContext, useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import useGames from '../hooks/api/useGames';

const GamesContext = createContext();

export function GamesProvider({ children }) {
  const [gamesData, setGamesData] = useLocalStorage('gamesData', []);
  const [statusApi, setStatusApi] = useState(null);
  const [error, setError] = useState('');
  const { getStatus, getGames } = useGames();

  useEffect(() => {
    let isCancelled = false;
    let timer;

    async function fetchData() {
      try {
        const status = await getStatus();
        if (status || status.alive) {
          setStatusApi(status.alive);
          timer = setTimeout(() => {
            if (!isCancelled) {
              setError('O servidor demorou para responder, tente novamente mais tarde.');
            }
          }, 9000);

          const games = await getGames();
          clearTimeout(timer);
          if (!isCancelled) {
            setGamesData(games);
          }
        } else {
          handleErrorResponse(status);
        }
      } catch (error) {
        handleErrorResponse();
      }
    }

    fetchData();

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleErrorResponse = (status) => {
    if ([500, 502, 503, 504, 507, 508, 509].includes(status)) {
      setError('O servidor falhou em responder, tente recarregar a página.');
    } else {
      setError('O servidor não conseguiu responder no momento, tente novamente mais tarde.');
    }
  };

  return (
    <GamesContext.Provider
      value={{ gamesData, setGamesData, statusApi, error }}
    >
      {children}
    </GamesContext.Provider>
  );
}

export default GamesContext;