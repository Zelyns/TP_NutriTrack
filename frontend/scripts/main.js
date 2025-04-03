// script principal gestion de repas et de l'objectif nutritionnel
const API_URL = 'http://localhost:3000/api/meals';
const GOALS_API_URL = 'http://localhost:3000/api/goals';

const fetchData = async (url) => {// recuperer les donnees de l'API
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Erreur lors de la récupération des données depuis ${url}:`, error);
    return null;
  }
};

const postData = async (url, data) => {// envoyer les donnees a l'API
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(await response.text());
    return await response.json();
  } catch (error) {
    console.error(`Erreur lors de l'envoi des données à ${url}:`, error);
    return null;
  }
};

// creation d'un repas
const createMealElement = (meal) => {
  const mealItem = document.createElement('li');
  mealItem.textContent = `${meal.name} - Calories: ${meal.calories}, Protéines: ${meal.proteins}, Glucides: ${meal.carbs}, Lipides: ${meal.fats}`;
  return mealItem;
};

// ajouter les repas
const renderMeals = (meals) => {
  const mealList = document.getElementById('meal-list');
  mealList.innerHTML = '';
  meals.forEach((meal) => mealList.appendChild(createMealElement(meal)));// ajouter chaque repas a la liste
};

// affiche les repas
const loadMeals = async () => {
  const meals = await fetchData(API_URL);
  if (meals) renderMeals(meals);
};

// Generer le contenu des objectifs
const createGoalsContent = (goals) => `
  <p>Calories journalières: ${goals.dailyCalories}</p>
  <p>Protéines journalières: ${goals.dailyProteins}</p>
  <p>Glucides journaliers: ${goals.dailyCarbs}</p>
  <p>Lipides journaliers: ${goals.dailyFats}</p>
`;

// Afficher les objectifs
const renderGoals = (goals) => {
  const goalsDiv = document.getElementById('goals');
  goalsDiv.innerHTML = createGoalsContent(goals);
};

// Charger et afficher les objectifs
const loadGoals = async () => {
  const goals = await fetchData(GOALS_API_URL);
  if (goals) renderGoals(goals);
};

// Gestionnaire de soumission de formulaire generique
const handleFormSubmit = (formId, url, dataExtractor, onSuccess) => {
  document.getElementById(formId).addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = dataExtractor();
    const result = await postData(url, data);
    if (result) {
      onSuccess();
      event.target.reset();
    }
  });
};

// Extraire les donnees du formulaire de repas
const extractMealData = () => ({
  name: document.getElementById('meal-name').value,
  calories: parseInt(document.getElementById('meal-calories').value),
  proteins: parseInt(document.getElementById('meal-proteins').value),
  carbs: parseInt(document.getElementById('meal-carbs').value),
  fats: parseInt(document.getElementById('meal-fats').value),
});

// Extraire les données du formulaire d'objectifs
const extractGoalsData = () => ({
  dailyCalories: parseInt(document.getElementById('daily-calories').value),
  dailyProteins: parseInt(document.getElementById('daily-proteins').value),
  dailyCarbs: parseInt(document.getElementById('daily-carbs').value),
  dailyFats: parseInt(document.getElementById('daily-fats').value),
});

// Initialisation
const init = () => {
  loadMeals();
  loadGoals();
  handleFormSubmit('meal-form', API_URL, extractMealData, loadMeals);
  handleFormSubmit('goals-form', GOALS_API_URL, extractGoalsData, loadGoals);
};

init();
