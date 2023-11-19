import { HttpResponse, http } from 'msw';

import { DEFAULT_ITEMS_PER_PAGE } from '@/store/api/constants';
import { characterMock, charactersMock, princessesMock } from '@/tests/mocks';

export const handlers = [
  http.get(/\/character$/, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');

    if (query === 'nothingwillbefound') {
      return HttpResponse.json([], { headers: { 'x-total-count': '0' }, status: 200 });
    }

    if (query === 'princess') {
      return HttpResponse.json(princessesMock, { headers: { 'x-total-count': '2' }, status: 200 });
    }

    const limitSearchParam = url.searchParams.get('_limit') ?? '0';
    const limit = parseInt(limitSearchParam, 10) || DEFAULT_ITEMS_PER_PAGE;

    const characters = charactersMock.slice(0, limit);
    const total = charactersMock.length;

    return HttpResponse.json(characters, {
      headers: { 'x-total-count': `${total}` },
      status: 200,
    });
  }),

  http.get(/\/character\/8/, () => {
    return HttpResponse.json(characterMock, { headers: {}, status: 200 });
  }),

  http.get(/\/character\/666/, () => {
    return new HttpResponse(null, { status: 404 });
  }),

  http.get(/rickandmortyapi\.com/, () => {
    return new HttpResponse(null, { status: 404 });
  }),
];
