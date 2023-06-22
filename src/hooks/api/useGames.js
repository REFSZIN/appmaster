import useAsync from '../useAsync';

import * as GamesApi from '../../services/GamesApi';

export default function useGames() {
  const {
    data: status,
    loading: statusLoading,
    error: statusError,
    act: getStatus
  } = useAsync(() => GamesApi.getStatusApi());

  const {
    data: games,
    loading: getGamesLoading,
    error: getGamesError,
    act: getGames
  } = useAsync(() => GamesApi.getGames());


  return {
    status,
    statusLoading,
    statusError,
    getStatus,
    games,
    getGamesLoading,
    getGamesError,
    getGames,
  };
}
