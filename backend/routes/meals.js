// define les routes pour les repas de l'utilisateur
const express = require('express');
const Meal = require('../models/meal');
const router = express.Router();

router.post('/', async (req, res) => { // route pour ajouter un repas
  const { name, calories, proteins, carbs, fats } = req.body;
  const newMeal = new Meal({ name, calories, proteins, carbs, fats });
  await newMeal.save();
  res.status(201).json(newMeal);
});


router.get('/', async (req, res) => {// route pour recuperer tous les repas
  const meals = await Meal.find();
  res.status(200).json(meals);
});

module.exports = router;
