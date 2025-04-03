const express = require('express');
const Goal = require('../models/goal');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { dailyCalories, dailyProteins, dailyCarbs, dailyFats } = req.body;

    const existingGoal = await Goal.findOne();
    if (existingGoal) {
      existingGoal.dailyCalories = dailyCalories;
      existingGoal.dailyProteins = dailyProteins;
      existingGoal.dailyCarbs = dailyCarbs;
      existingGoal.dailyFats = dailyFats;
      await existingGoal.save();
      return res.status(200).json(existingGoal);
    }

    const newGoal = new Goal({ dailyCalories, dailyProteins, dailyCarbs, dailyFats });
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const goal = await Goal.findOne();
    if (goal) {
      res.status(200).json(goal);
    } else {
      res.status(404).json({ message: 'Aucun objectif défini.' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
