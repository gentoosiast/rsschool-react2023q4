export const getCardImageUrl = (id: number): string => {
  const IMAGE_CDN_URL = 'https://rickandmortyapi.com/api/character/avatar/';

  if (id < 1) {
    return '';
  }

  return `${IMAGE_CDN_URL}/${id}.jpeg`;
};
