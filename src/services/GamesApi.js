import api from './api';

export async function getStatusApi() {
  const response = await api.get('/');
  return response.data;
}

export async function getGames() {
  const response = await api.get('/data', {
    headers: {
      'dev-email-address': 'refwire@gmail.com',
    }
  });
  return response.data;
}