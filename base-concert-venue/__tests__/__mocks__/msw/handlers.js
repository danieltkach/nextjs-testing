import { rest } from 'msw';
import { getReservationsByUserId } from '@/lib/features/users/queries.ts';
import { readFakeData } from '../fakeData';

const BASE_API = "http://localhost:3000";

export const handlers = [
  rest.get(`${BASE_API}/api/shows/:showId`, async (req, res, ctx) => {
    const { showId } = req.params;
    const { fakeShows } = await readFakeData();
    return res(ctx.json({ show: fakeShows[showId] }));
  }),

  rest.get(`${BASE_API}/api/users/:userId/reservations`, async (req, res, ctx) => {
    const { userId } = req.params;
    const data = await getReservationsByUserId(+userId);
    return res(ctx.json({ userReservations: data }));
  })
];
