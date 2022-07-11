import env from '../../../../environment';

export const loadMoreBatches = async (query: string, opt: any) => {
  const params: {
    search?: string;
    afterCursor?: string;
  } = {};
  if (query) params.search = query;
  if (opt.length) params.afterCursor = opt[opt.length - 1].cursor;
  const res = await fetch(
    `${env.API_URL}/batches?${new URLSearchParams(params)}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  const response = await res.json();
  const options = response.edges.map((x: any) => ({
    value: x.node._id,
    label: `${x.node.number}`,
    cursor: x.cursor,
  }));
  await new Promise(resolve => setTimeout(resolve, 2000));
  return {
    options,
    hasMore: response.pageInfo.hasNextPage,
  };
};
