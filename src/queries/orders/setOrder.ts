import env from '../../environment';

export const saveOrder = async (body: any, id?: string) => {
  const res = await fetch(`${env.API_URL}/orders${id ? `/${id}` : ''}`, {
    method: id ? 'PUT' : 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};
