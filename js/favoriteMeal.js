const mealsList = document.querySelector(".meals-list")
const favoriteMealHeading = document.querySelector(".favorite-meal-heading")
let favoriteMeals = JSON.parse(localStorage.getItem('favoritemeals')) || [];


const removeFromFavorite = (mealId) => {
    favoriteMeals = favoriteMeals.filter(m => m.idMeal !== mealId);
    localStorage.setItem('favoritemeals', JSON.stringify(favoriteMeals))
    renderFavoriteMeals();
}

const renderFavoriteMeals = () => {
    mealsList.innerHTML = ""
    favoriteMealHeading.textContent = "Your Favorite Meals"
    favoriteMeals.forEach(meal => {
        let cardComp = document.createElement("div");
        cardComp.classList.add(["card"]);
        cardComp.style.width = "18rem";
        cardComp.style.height = "45vh"
        let mealImg = document.createElement("img");
        mealImg.src = meal.strMealThumb; 
        mealImg.style.height = "8rem"
        mealImg.classList.add(["card-img-top","mealImg"]);
        cardComp.appendChild(mealImg);

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        let title = document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = meal.strMeal.slice(0,17);
        cardBody.appendChild(title);

        let text = document.createElement("p");
        text.classList.add("card-text");
        text.textContent = meal.strInstructions.slice(0,45) + "...";
        text.style.wordBreak = "break-all"
        cardBody.appendChild(text);
        let mealBtns = document.createElement("div");
        mealBtns.classList.add("meal-btns");
        let link = document.createElement("a");
        link.href = `./mealdetails.html?id=${meal.idMeal}`;
        link.classList.add("btn", "btn-primary");
        link.textContent = "More";
        mealBtns.appendChild(link);

        let favBtn = document.createElement("button");
        favBtn.textContent = "remove"
        favBtn.classList.add("btn","btn-warning")
        // favBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
        favBtn.addEventListener('click', () => removeFromFavorite(meal.idMeal))
        mealBtns.appendChild(favBtn)
        cardBody.appendChild(mealBtns)
        cardComp.appendChild(cardBody);
        mealsList.appendChild(cardComp);
    })
}
document.addEventListener('DOMContentLoaded', ()=>{
    if(favoriteMeals.length > 0){
        renderFavoriteMeals()
    }
})

