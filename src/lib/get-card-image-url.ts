import { IMAGE_CDN_URL } from '@/store/api';

export const getCardImageUrl = (id: number): string => {
  if (id < 1) {
    return '';
  }

  return `${IMAGE_CDN_URL}/${id}.jpeg`;
};
