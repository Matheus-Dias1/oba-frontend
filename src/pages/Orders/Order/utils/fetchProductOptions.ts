import env from '../../../../environment';
import { ProductI } from '../../../../queries/products/models';
import { getRandomID } from '../../../../utils/randomID';

export const loadMoreProducts = async (query: string, options: any) => {
  const params: {
    search?: string;
    afterCursor?: string;
  } = {};
  if (query) params.search = query;
  if (options.length) params.afterCursor = options[options.length - 1].cursor;

  const res = await fetch(
    `${env.API_URL}/products?${new URLSearchParams(params)}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );

  const data = await res.json();
  return {
    options: data.edges.map((x: any) => {
      const product: ProductI = x.node;
      return {
        value: product._id,
        label: product.description,
        defaultMeasurementUnit: product.defaultMeasurementUnit,
        conversions: product.conversions,
        cursor: x.cursor,
      };
    }),
    hasMore: data.pageInfo.hasNextPage,
  };
};
