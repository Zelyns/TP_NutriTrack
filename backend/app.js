const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const mealRoutes = require('./routes/meals');
const goalRoutes = require('./routes/goals');


mongoose.connect('mongodb://localhost/nutriTrack', { useNewUrlParser: true, useUnifiedTopology: true })//connection a la base de donnees
  .then(() => console.log('Database connected'))
  .catch(err => console.error(err));

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use('/api/meals', mealRoutes);
app.use('/api/goals', goalRoutes);

app.listen(3000, () => { // demarre le serveur 
  console.log('Server running on port 3000');
});