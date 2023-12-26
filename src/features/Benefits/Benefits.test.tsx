import { render, screen } from '@testing-library/react';
import Benefits from '.';

jest.mock('next/router', () => require('next-router-mock'));

beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
});

test('show mission and value texts', async () => {
    render(<Benefits />);

    const missionTitle = screen.getByText('Mission');
    const discoverTitle = screen.getByText('Discover');

    const missionDesc = await screen.findAllByText(/our mission/i);
    const discoverDesc = await screen.findAllByText(/our core values revolve/i);

    expect(missionTitle).toBeInTheDocument();
    expect(discoverTitle).toBeInTheDocument();

    expect(missionDesc).toBeDefined();
    expect(discoverDesc).toBeDefined();
});
