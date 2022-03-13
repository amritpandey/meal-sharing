const express = require('express');
const { andHaving } = require('../database');
const router = express.Router();
const knex = require('../database');

router.post('/', async (request, response) => {
    try {
        // knex syntax for selecting things.
        const insertMeal = await knex('meal').insert({
            title: request.body.title,
            description: request.body.description,
            location: request.body.location,
            when: request.body.when,
            max_reservations: request.body.max_reservations,
            price: request.body.price,
            created_date: request.body.created_date,
        });
        response.json(insertMeal);
    } catch (error) {
        throw error;
    }
});

router.put('/:id', async (request, response) => {
    try {
        const titles = await knex('meal')
            .where({ id: request.params.id })
            .update(request.body);
        response.json(titles);
    } catch (error) {
        throw error;
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const titles = await knex('meal')
            .where({ id: request.params.id })
            .delete(request.body);
        response.json(titles);
    } catch (error) {
        throw error;
    }
});

router.get('/:id', async (request, response) => {
    try {
        const titles = await knex('meal').where({ id: request.params.id });
        response.json(titles);
    } catch (error) {
        throw error;
    }
});

//api/meals?maxPrice=90
router.get('/', async (request, response) => {
    try {
        let titles = await knex('meal');

        if ('maxPrice' in request.query) {
            const maxPrice = Number(request.query.maxPrice);
            titles = await (
                await knex('meal')
            ).filter((meal) => meal.price < maxPrice);
            if (isNaN(request.query.maxPrice)) {
                return response.send('Not a number max price');
            } else {
                return response.json(titles);
            }
        }
        if ('availableReservations' in request.query) {
            const titles = await knex('meal')
                .join('reservation', 'meal.id', '=', 'reservation.meal_id')
                .select(
                    'meal.id',
                    'title',
                    'max_reservations',
                    knex.raw('SUM(number_of_guests) AS total_guests'),
                    knex.raw(
                        '(max_reservations-SUM(number_of_guests)) AS "Available Reservation"',
                    ),
                )
                .where('max_reservations', '>', 'number_of_guests')
                .groupBy('meal_id')
                .having(
                    knex.raw('(max_reservations-SUM(number_of_guests)) > 0'),
                );

            return response.json(titles);
        }

        if ('title' in request.query) {
            const title = request.query.title;
            titles = await (
                await knex('meal')
            ).filter((meal) => meal.title.match(title));
            if (!isNaN(request.query.title)) {
                return response.send('Not a valid title');
            } else {
                return response.json(titles);
            }
        }

        if ('createdAfter' in request.query) {
            const createdAfter = new Date(request.query.createdAfter);
            const titles = await (
                await knex('meal')
            ).filter((meal) => meal.created_date < createdAfter);
        }

        if ('limit' in request.query) {
            const limit = Number(request.query.limit);
            titles = await knex('meal').limit(limit);
            if (isNaN(request.query.limit)) {
                return response.send('Not a valid limit');
            } else {
                return response.json(titles);
            }
        }
        if ('limit' in request.query && 'maxPrice' in request.query) {
            const maxPrice = Number(request.query.maxPrice);
            const limit = Number(request.query.limit);
            titles = await knex('meal')
                .where('price', '<=', maxPrice)
                .limit(limit);
        }
        response.json(titles);
    } catch (error) {
        throw error;
    }
});

module.exports = router;
