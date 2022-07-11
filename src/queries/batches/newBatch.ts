import env from '../../environment';

export const newBatch = async (startDate: string, endDate: string) => {
  const res = await fetch(`${env.API_URL}/batches`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      startDate,
      endDate,
    }),
  });
  return res.json();
};
