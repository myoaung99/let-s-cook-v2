import { Meal } from '@/types';
import { motion } from 'framer-motion';
import { MealCard } from '@/components/MealCard';
import React from 'react';

const STAGGER_DELAY_IN_MILLISECOND = 0.08;
const VIEWPORT_MARGIN_FROM_ALL_DIRECTIONS = '250px';

const Bookmarks = ({ bookmarks = [] }: { bookmarks: Array<Meal> }) => {
    return (
        <section>
            <h1 className={'text-2xl font-semibold py-5'}>Bookmarks</h1>

            <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {bookmarks.map((meal: Meal, index: number) => (
                    <motion.div
                        key={meal.idMeal}
                        variants={mealCardVariants}
                        initial={'hidden'}
                        whileInView={'animate'}
                        transition={{
                            delay: STAGGER_DELAY_IN_MILLISECOND * index,
                        }}
                        viewport={{
                            once: true,
                            margin: VIEWPORT_MARGIN_FROM_ALL_DIRECTIONS,
                        }}
                    >
                        <MealCard
                            mealData={meal}
                            title={<MealCard.Title />}
                            image={<MealCard.Image />}
                            action={<MealCard.Button />}
                        />
                    </motion.div>
                ))}
            </section>
        </section>
    );
};

export default Bookmarks;

const mealCardVariants = {
    hidden: {
        opacity: 0,
        translateX: -20,
    },
    animate: {
        opacity: 1,
        translateX: 0,
    },
};
