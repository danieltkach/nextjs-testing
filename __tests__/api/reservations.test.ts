/* eslint-disable no-param-reassign */
import { testApiHandler } from "next-test-api-route-handler";

import reservationHandler from "@/pages/api/reservations/[reservationId]";
import userReservationsHandler from "@/pages/api/users/[userId]/reservations";

jest.mock("@/lib/auth/utils");

test("POST /api/reservations/[reservationId] creates a reservation", async () => {
  await testApiHandler({
    handler: reservationHandler,
    paramsPatcher: (params) => {
      params.reservationId = 12345;
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          seatCount: 1,
          userId: 1,
          showId: 0,
        }),
      });

      expect(res.status).toBe(201);
    },
  });

  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher: (params) => {
      params.userId = 1;
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.userReservations).toHaveLength(3);
    },
  });
});
