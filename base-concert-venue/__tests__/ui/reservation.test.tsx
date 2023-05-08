import { render, screen } from '@testing-library/react';
import { Reservation } from '@/components/reservations/Reservation';

test("reservation page shows correct number of available seats", async () => {
  render(<Reservation showId={0} submitPurchase={jest.fn()} />);

  const seatCountText = await screen.findByText(/10 seats left/i);
  expect(seatCountText).toBeInTheDocument();
});

test("if there are no seats available no purchase button and no seats available message are shown", async () => {
  render(<Reservation showId={1} submitPurchase={jest.fn()} />)

  const soldOutMessage = await screen.findByText(/Show is sold out/i);
  expect(soldOutMessage).toBeInTheDocument();

  const purchaseButton = screen.queryByRole("button", { name: /purchase/i });
  expect(purchaseButton).not.toBeInTheDocument();
})