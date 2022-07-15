import env from '../../environment';

export const getProducts = async (endCursor?: string, search?: string) => {
  const params: {
    search?: string;
    afterCursor?: string;
  } = {};
  if (search) params.search = search;
  if (endCursor) params.afterCursor = endCursor;

  const res = await fetch(
    `${env.API_URL}/products?${new URLSearchParams(params)}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  return res.json();
};

export const getProduct = async (id: string) => {
  const res = await fetch(`${env.API_URL}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return res.json();
};
