import { getRandomID } from '../../../../utils/randomID';

export const loadMoreBatches = async (query: string, options: any) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return {
    options: [
      { value: getRandomID(), label: '1' },
      { value: getRandomID(), label: '2' },
      { value: getRandomID(), label: '3' },
      { value: getRandomID(), label: '4' },
      { value: getRandomID(), label: '5' },
      { value: getRandomID(), label: '6' },
      { value: getRandomID(), label: '7' },
      { value: getRandomID(), label: '8' },
    ],
    hasMore: true,
  };
};
