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

//make new route top meals
router.get('/top-meal', async (request, response) => {
//all the meals
let titles =  knex('meal');

titles = titles
            .join('review', 'meal.id', '=', 'review.meal_id')
            .select(
                'meal.id',
                'title',
                'price',
                'review.stars',
            )
            .where('review.stars', '>', 4)
           
            
//those meals sorted by the amount of the 5 stars review
//find all 5 stars for given meal
//count how many 
//for this given meal how many 5 stars are there
// sort the list of meals by that number
// top 3
// first query ,  
})

//api/meals  works fine with multiple parameters now
router.get('/', async (request, response) => {
    let titles = knex('meal');

    if ('maxPrice' in request.query) {
        const maxPrice = Number(request.query.maxPrice);
        if (isNaN(request.query.maxPrice)) {
            return response.send('Not a number');
        } else {
            // titles = titles.filter((meal) => meal.price < maxPrice);
            titles = titles.where('meal.price', '<', maxPrice);
        }
    }
    if ('topMeals' in request.query) {
          titles = titles.join('review', 'meal.id', '=', 'review.meal_id')
          .select('meal.title','meal.price','meal.description','review.stars')
          .where('review.stars', '=', 5)
          .limit(3);
  }
    if ('availableReservations' in request.query) {
        titles = titles
            .join('reservation', 'meal.id', '=', 'reservation.meal_id')
            .select(
                'meal.id',
                'title',
                'price',
                'location',
                'when',
                'max_reservations',
                knex.raw('SUM(number_of_guests) AS total_guests'),
                knex.raw(
                    '(max_reservations-SUM(number_of_guests)) AS "available_reservation"',
                ),
            )
            .where('max_reservations', '>', 'number_of_guests')
            .groupBy('meal_id')
            .having(knex.raw('(max_reservations-SUM(number_of_guests)) > 0'));
    }

    if ('title' in request.query) {
        const title = request.query.title.toLowerCase();
        if (!isNaN(request.query.title)) {
            return response.send('Not a valid title');
        } else {
            titles = titles.where('meal.title', 'like', '%' + title + '%');
            //filter((meal) => meal.title.toLowerCase().includes(title));
        }
    }

    if ('createdAfter' in request.query) {
        const createdAfter = new Date(request.query.createdAfter);
        // titles =titles.filter((meal) => meal.created_date < createdAfter);
        titles = titles.where('meal.created_date' < createdAfter);
    }

    if ('limit' in request.query) {
        const limit = Number(request.query.limit);
        if (isNaN(request.query.limit)) {
            return response.send('Not a valid limit');
        } else {
            titles = titles.limit(limit);
        }
    }
    try {
        const titlesRecord = await titles;
        response.json(titlesRecord);
    } catch (error) {
        throw error;
    }
});

module.exports = router;
