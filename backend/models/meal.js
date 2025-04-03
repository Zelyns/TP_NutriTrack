const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  name: String,
  calories: Number,
  proteins: Number,
  carbs: Number,
  fats: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Meal', mealSchema);