import { render, screen } from '@testing-library/react';
import BandComponent from '@/pages/bands/[bandId]';
import { readFakeData } from '@/__tests__/__mocks__/fakeData';

describe('band component displays correct band information', () => {
  beforeEach(async () => {
    const { fakeBands } = await readFakeData();
    render(<BandComponent band={fakeBands[0]} error={null} />);
  });

  test('heading is correct', () => {
    const heading = screen.getByRole('heading', {
      name: /the wandering bunnies/i
    });
    expect(heading).toBeInTheDocument();
  });

  test('band description is correct', () => {
    const bandDescription = screen.getByText(/blistering world music, supported by a moody water glass orchestra/i);
    expect(bandDescription).toBeInTheDocument();
  });

  test('band image comes up', () => {
    const bandImage = screen.getByRole('img', {
      name: /band photo/i
    });
    expect(bandImage).toBeInTheDocument();
  });

  test('image footer has proper text and link', () => {
    const imageAuthor = screen.getByText(/Adina Voicu/i);
    expect(imageAuthor).toBeInTheDocument();
    expect(imageAuthor).toHaveAttribute('href', "https://pixabay.com/users/adinavoicu-485024/");
  });
});
