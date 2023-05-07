import { render, screen } from '@testing-library/react';
import BandComponent from '@/pages/bands/[bandId]';
import { readFakeData } from '@/__tests__/__mocks__/fakeData';

function assert(element: HTMLElement) {
  expect(element).toBeInTheDocument();
}

describe('band component displays correct band information', () => {
  beforeEach(async () => {
    const { fakeBands } = await readFakeData();
    render(<BandComponent band={fakeBands[0]} error={null} />);
  });

  test('heading is correct', () => {
    assert(screen.getByRole('heading', { name: /the wandering bunnies/i }));
  });

  test('band description is correct', () => {
    assert(screen.getByText(/blistering world music, supported by a moody water glass orchestra/i));
  });

  test('band image comes up', () => {
    assert(screen.getByRole('img', { name: /band photo/i }));
  });

  test('image footer has proper text and link', () => {
    const imageAuthor = screen.getByText(/Adina Voicu/i);
    assert(imageAuthor);
    expect(imageAuthor).toHaveAttribute('href', "https://pixabay.com/users/adinavoicu-485024/");
  });
});

describe('errors are handled properly', () => {
  test('band component displays error message', () => {
    render(<BandComponent band={null} error={'no band found'} />);

    assert(screen.getByRole('heading', { name: /no band found/i }));
  });
});
