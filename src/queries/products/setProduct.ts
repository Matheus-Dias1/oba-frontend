import env from '../../environment';
import { ProductI } from './models';

export const setProduct = async (product: Partial<ProductI>, id?: string) => {
  await fetch(`${env.API_URL}/products${id ? `/${id}` : ''}`, {
    method: id ? 'PUT' : 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
};
