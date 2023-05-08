import { screen, render } from '@testing-library/react';
import { UserReservations } from '@/components/user/UserReservations';

test("user reservations are displayed", async () => {
  render(<UserReservations userId={1} />);

  const band1 = await screen.findByText(/The Wandering Bunnies/i);
  expect(band1).toBeInTheDocument();
  const band2 = await screen.findByText(/queen 13/i);
  expect(band2).toBeInTheDocument();

  const purchaseButton = screen.getByRole("button", { name: /purchase more tickets/i});
  expect(purchaseButton).toBeInTheDocument();
});

test("when user has no reservations display purchase button", async () => {
  render(<UserReservations userId={0} />);

  const purchaseButton = await screen.findByRole("button", { name: /purchase tickets/i});
  expect(purchaseButton).toBeInTheDocument();

  const heading = screen.queryByRole("heading", { name: /Your Tickets/i});
  expect(heading).not.toBeInTheDocument();
  
  const purchaseMoreButton = screen.queryByRole("button", { name: /purchase more tickets/i});
  expect(purchaseMoreButton).not.toBeInTheDocument();
});