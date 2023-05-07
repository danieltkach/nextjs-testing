import { rest } from 'msw';
import { readFakeData } from '@/__tests__/__mocks__/fakeData';

const BASE_API = "http://localhost:3000";

export const handlers = [
  rest.get(`${BASE_API}/api/shows/:showId`, async (req, res, ctx) => {
    const { fakeShows } = await readFakeData();
    return res(ctx.json({ show: fakeShows[0] }));
  }),
];
