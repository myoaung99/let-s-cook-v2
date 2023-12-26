import { render, screen } from '@testing-library/react';
import { MealCard } from '.';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));

const meal_data = {
    strMeal: 'Meal name',
    idMeal: '1212',
    strMealThumb:
        'https://www.themealdb.com/images/media/meals/y2irzl1585563479.jpg',
};

const empty_meal_data = {
    strMeal: '',
    idMeal: '',
    strMealThumb: '',
};

test('card should have title, image and cta button', () => {
    render(
        <MealCard
            title={<MealCard.Title />}
            image={<MealCard.Image />}
            action={<MealCard.Button />}
            mealData={meal_data}
        />
    );

    const mealTitle = screen.getByRole('heading', { name: /meal name/i });
    const mealImage = screen.getByAltText('meal suggestion');
    const mealButton = screen.getByRole('button');

    expect(mealTitle).toBeInTheDocument();
    expect(mealTitle).toHaveAccessibleName(meal_data.strMeal);

    expect(mealImage).toBeInTheDocument();
    expect(mealButton).toBeInTheDocument();
});

test('card should display title, image and cta button for empty values', () => {
    render(
        <MealCard
            title={<MealCard.Title />}
            image={<MealCard.Image />}
            action={<MealCard.Button />}
            mealData={empty_meal_data}
        />
    );

    const mealTitle = screen.getByRole('heading', { level: 3 });
    const mealImage = screen.getByAltText('meal suggestion');
    const mealButton = screen.getByRole('button');

    expect(mealTitle).toBeInTheDocument();
    expect(mealTitle).toHaveAccessibleName(empty_meal_data.strMeal);

    expect(mealImage).toBeInTheDocument();
    expect(mealButton).toBeInTheDocument();
});

test('card should navigate to meal detail route when user click cta button', async () => {
    render(
        <MealCard
            title={<MealCard.Title />}
            image={<MealCard.Image />}
            action={<MealCard.Button />}
            mealData={meal_data}
        />
    );

    const mealButton = screen.getByRole('button');

    await userEvent.click(mealButton);

    expect(mockRouter).toMatchObject({
        asPath: '/recipes/' + meal_data.idMeal,
        query: {},
    });
});

test('card should navigate to recipes route when user click cta button with empty meal id', async () => {
    render(
        <MealCard
            title={<MealCard.Title />}
            image={<MealCard.Image />}
            action={<MealCard.Button />}
            mealData={empty_meal_data}
        />
    );

    const mealButton = screen.getByRole('button');

    await userEvent.click(mealButton);

    expect(mockRouter).toMatchObject({
        asPath: '/recipes',
        query: {},
    });
});
