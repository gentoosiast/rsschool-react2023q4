import { HttpResponse, http } from 'msw';

import { apiResponseMock, characterMock } from '@/tests/mocks';

export const handlers = [
  http.get(/\/character$/, () => {
    return HttpResponse.json(apiResponseMock.characters, {
      headers: { 'x-total-count': '3' },
      status: 200,
    });
  }),
  http.get(/\/character\/8/, () => {
    return HttpResponse.json(characterMock, { headers: {}, status: 200 });
  }),
  http.get(/rickandmortyapi\.com/, () => {
    console.error('IMAGE CDN');

    return new HttpResponse(null, { status: 404 });
  }),
];
