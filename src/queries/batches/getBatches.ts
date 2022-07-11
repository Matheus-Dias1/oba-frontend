import env from '../../environment';

export const getBatches = async (endCursor?: string, search?: string) => {
  const params: {
    search?: string;
    afterCursor?: string;
  } = {};
  if (search) params.search = search;
  if (endCursor) params.afterCursor = endCursor;

  const res = await fetch(
    `${env.API_URL}/batches/summary?${new URLSearchParams(params)}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  return res.json();
};

export const getBatch = async (id: string) => {
  const res = await fetch(`${env.API_URL}/batches/summary/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return res.json();
};
