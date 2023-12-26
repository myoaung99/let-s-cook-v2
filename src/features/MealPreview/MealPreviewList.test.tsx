import { render, screen } from '@testing-library/react';
jest.mock('next/router', () => require('next-router-mock'));
import MealPreviewList from './MealPreviewList';

test('should display 4 preview meals', () => {
    render(<MealPreviewList />);
    const mealCards = screen.getAllByRole('heading', { level: 3 });
    expect(mealCards).toHaveLength(4);
});
