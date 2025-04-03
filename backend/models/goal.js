// definition du modele Goal pour MongoDB
const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  dailyCalories: Number,
  dailyProteins: Number,
  dailyCarbs: Number,
  dailyFats: Number,
});

module.exports = mongoose.model('Goal', goalSchema);