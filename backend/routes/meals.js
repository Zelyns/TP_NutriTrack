const express = require('express');
const Meal = require('../models/meal');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, calories, proteins, carbs, fats } = req.body;
  const newMeal = new Meal({ name, calories, proteins, carbs, fats });
  await newMeal.save();
  res.status(201).json(newMeal);
});


router.get('/', async (req, res) => {
  const meals = await Meal.find();
  res.status(200).json(meals);
});

module.exports = router;
