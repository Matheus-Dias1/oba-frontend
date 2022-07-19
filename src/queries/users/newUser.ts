import env from '../../environment';

export const createUser = async (user: string, pass: string, name: string) => {
  await fetch(`${env.API_URL}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      username: user,
      password: pass,
    }),
  });
};
