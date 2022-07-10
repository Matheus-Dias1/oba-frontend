import env from '../../environment';
import { SessionResponseT, SESSION_ERRORS } from './models';

export const createSession = async (username: string, password: string) => {
  const res = await fetch(`${env.API_URL}/session`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const response: SessionResponseT = await res.json();
  if (res.status >= 400 && res.status < 600) {
    if (response.error) throw new Error(SESSION_ERRORS[response.error]);
    else throw new Error('Erro inesperado ao fazer login, tente novamente');
  }
  return response;
};
