async function addMeal(event) {
    event.preventDefault();
  

    const name = document.getElementById('meal-name').value;
    const calories = document.getElementById('meal-calories').value;
    const proteins = document.getElementById('meal-proteins').value;
    const carbs = document.getElementById('meal-carbs').value;
    const fats = document.getElementById('meal-fats').value;
  
    const response = await fetch('http://localhost:3000/api/meals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, calories, proteins, carbs, fats })
    });
  
    if (response.ok) {
      loadMeals();
    } else {
      console.error('Erreur lors de l\'ajout du repas');
    }
  
    document.getElementById('meal-form').reset();
  }
  
  async function loadMeals() {
    const response = await fetch('http://localhost:3000/api/meals');
    const meals = await response.json();
    const mealList = document.getElementById('meal-list');
    mealList.innerHTML = ''; 
  
    meals.forEach(meal => {
      const mealItem = document.createElement('li');
      mealItem.textContent = `${meal.name}: ${meal.calories} cal, ${meal.proteins}g protéines, ${meal.carbs}g glucides, ${meal.fats}g lipides`;
      mealList.appendChild(mealItem);
    });
  }
  
  document.getElementById('meal-form').addEventListener('submit', addMeal);
  
  loadMeals();
  