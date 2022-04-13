const express = require("express");
const router = express.Router();
const knex = require('../database');

router.get("/", async(request,response)=>{
  try {
    const titles = await knex("review");
    response.json(titles);
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async(request,response)=>{
  try {
    const titles = await knex("review").where({id:request.params.id});
    response.json(titles);
  } catch (error) {
    throw error;
  }
});

router.post("/", async(request,response)=>{
  try {
    const titles = await knex("review").insert({
      title:request.body.title,
      description:request.body.description,
      stars:request.body.stars,
      created_date:request.body.created_date,
      meal_id:request.body.meal_id,
    });
    response.json(titles);
  } catch (error) {
    throw error;
  }
});

router.put("/:id", async(request,response)=>{
  try {
    const titles = await knex("review").where({id:request.params.id}).update(request.body);
    response.json(titles);
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", async(request,response)=>{
  try {
    const titles = await knex("review").where({id:request.params.id}).delete(request.body);
    response.json(titles);
  } catch (error) {
    throw error;
  }
});


module.exports = router;