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
  const options = response.edges.map((x: any) => {
    const startDate = new Date(x.node.startDate).toLocaleDateString('pt-BR');
    const endDate = new Date(x.node.endDate).toLocaleDateString('pt-BR');
    return {
      value: x.node._id,
      label: `#${`${x.node.number}`.padStart(
        3,
        '0'
      )}\t(${startDate} - ${endDate})`,
      cursor: x.cursor,
    };
  });
  return {
    options,
    hasMore: response.pageInfo.hasNextPage,
  };
};
