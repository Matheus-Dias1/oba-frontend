import env from '../../environment';

export const getBatches = async () => {
  const res = await fetch(`${env.API_URL}/`);
};
