
const { request } = require('express');
const express = require('express');
const router = express.Router();
const knex = require('../database');

router.get("/", async(request,response)=>{
  try {
    const titles = await knex("reservation");
    response.json(titles);
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async(request,response)=>{
  try {
    const titles = await knex("reservation").where({id:request.params.id});
    response.json(titles);
  } catch (error) {
    throw error;
  }
});

router.post("/", async(request,response)=>{
  try {
    const titles = await knex("reservation").insert({
      number_of_guests:request.body.number_of_guests,
      created_date:request.body.created_date,
      contact_phonenumber:request.body.contact_phonenumber,
      contact_name:request.body.contact_name,
      contact_email:request.body.contact_email,
      meal_id:request.body.meal_id,
    });
    response.json(titles);
  } catch (error) {
    throw error;
  }
});

router.put("/:id", async(request,response)=>{
  try {
    const titles = await knex("reservation").where({id:request.params.id}).update(request.body);
    response.json(titles);
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", async(request,response)=>{
  try {
    const titles = await knex("reservation").where({id:request.params.id}).delete(request.body);
    response.json(titles);
  } catch (error) {
    throw error;
  }
});




module.exports=router;
