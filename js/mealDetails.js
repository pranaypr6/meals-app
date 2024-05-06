
const id = parseInt(new URLSearchParams(window.location.search).get('id'))
const mealImg = document.querySelector(".meal-image")
const mealTitle = document.querySelector(".meal-name")
const mealsInstructions = document.querySelector(".meal-instructions")
const mealsIngredients = document.querySelector(".meal-ingredients");
const youTubeIcon = document.querySelector(".youtube-icon") 
let meal;

const renderMealDetails = () => {
    mealImg.src = meal.strMealThumb;
    mealTitle.textContent = meal.strMeal;
    mealsInstructions.textContent = meal.strInstructions;
    youTubeIcon.href = meal.strYoutube;
    let i = 1;
    let ingredients = ""
    for(let i=1;i<=20;i++){
        if(meal[`strIngredient${i}`] !== ""){
            ingredients += `${i}. ` + meal[`strIngredient${i}`] + "<br/>"
        }
    } 
    mealsIngredients.innerHTML = ingredients;
}
const fetchMealById = async (id) => {
    if(!id){
        alert("Invalid Id");
        return;
    }
    const res = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const data = await res.json();
    meal = data["meals"][0];
}

document.addEventListener('DOMContentLoaded', async () => {
    await fetchMealById(id);
    renderMealDetails()
})
