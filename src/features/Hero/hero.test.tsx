import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import mockRouter from 'next-router-mock';
jest.mock('next/router', () => require('next-router-mock'));

import { Hero } from '@/features/Hero/hero';

test('should display hero image, title and CTA button', () => {
    render(<Hero />);

    const title = screen.getAllByRole('heading', {
        name: /Embark on a Culinary Journey/i,
    });

    const button = screen.getAllByRole('button', { name: /Browse Recipes/i });
    const image = screen.getByTestId('hero-bg');

    expect(title).toHaveLength(2);
    expect(button).toHaveLength(2);
    expect(image).toBeInTheDocument();
});

test('should go to /recipes route when user clicks CTA button', async () => {
    render(<Hero />);
    const ctaButton = screen.getAllByRole('button', {
        name: /Browse Recipes/i,
    });

    await userEvent.click(ctaButton[0]);

    expect(mockRouter).toMatchObject({
        asPath: '/recipes?filter=Country&value=American',
        pathname: '/recipes',
        query: { filter: 'Country', value: 'American' },
    });
});
