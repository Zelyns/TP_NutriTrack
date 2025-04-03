document.getElementById('goals-form').addEventListener('submit', function(event) {
    event.preventDefault();


    const dailyCalories = document.getElementById('daily-calories').value;
    const dailyProteins = document.getElementById('daily-proteins').value;
    const dailyCarbs = document.getElementById('daily-carbs').value;
    const dailyFats = document.getElementById('daily-fats').value;


    const goalsDiv = document.getElementById('goals');
    goalsDiv.innerHTML = `
        <p>Calories journalières: ${dailyCalories}</p>
        <p>Protéines journalières: ${dailyProteins}</p>
        <p>Glucides journaliers: ${dailyCarbs}</p>
        <p>Lipides journaliers: ${dailyFats}</p>
    `;

    event.target.reset();
});
