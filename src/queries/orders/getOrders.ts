import env from '../../environment';

export const getOrders = async (endCursor?: string) => {
  const params: {
    afterCursor?: string;
  } = {};
  if (endCursor) params.afterCursor = endCursor;

  const res = await fetch(
    `${env.API_URL}/orders?${new URLSearchParams(params)}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  return res.json();
};

export const getOrder = async (id: string) => {
  const res = await fetch(`${env.API_URL}/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return res.json();
};
