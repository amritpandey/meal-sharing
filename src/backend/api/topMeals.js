const express = require("express");
const router = express.Router();
const knex = require('../database');

router.get("/",async(request, response)=>{
  const titles = await knex('meal');
  try {
    titles=titles.join('reservation', 'meal.id', '=', 'reservation.meal_id')
    .select("*");
  /*.where('review.stars', '=', 5)
  .limit(3); */
  response.json(titles);
  } catch (error) {
    throw error;
  }
})
            
//those meals sorted by the amount of the 5 stars review
//find all 5 stars for given meal
//count how many 
//for this given meal how many 5 stars are there
// sort the list of meals by that number
// top 3
// first query ,  

module.exports = router;