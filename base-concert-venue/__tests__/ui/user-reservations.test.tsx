import { screen, render } from '@testing-library/react';
import { UserReservations } from '@/components/user/UserReservations';

test("User reservations are displayed", async () => {
  render(<UserReservations userId={1} />);

  const band1 = await screen.findByText(/The Wandering Bunnies/i);
  expect(band1).toBeInTheDocument();
  const band2 = await screen.findByText(/queen 13/i);
  expect(band2).toBeInTheDocument();
});