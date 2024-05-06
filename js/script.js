const mealsList = document.querySelector(".meals-list")
const searchInput  = document.querySelector(".search-input");
let meals = [];
let favoriteMeals = JSON.parse(localStorage.getItem('favoritemeals')) || [];
const toastLiveExample = document.getElementById('liveToast')
const toastMsg = document.querySelector(".toast-msg");
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)


const fetchMealsBySearch = async (keyword) => {
    meals = []
    let res = await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${keyword}`);
    let mealsRes = await res.json();
    meals = mealsRes["meals"] ?? [];
}


const removeFromFavorite = (mealId) => {
    favoriteMeals = favoriteMeals.filter(m => m.idMeal !== mealId);
    localStorage.setItem('favoritemeals', JSON.stringify(favoriteMeals))
    renderMeals();
    toastMsg.textContent = "Removed from favorites";
    toastBootstrap.show()
}

const addToFavorite = (meal) => {
    if(favoriteMeals.filter(m => m.idMeal == meal.idMeal).length > 0){
        return;
    }
    favoriteMeals.push(meal);
    localStorage.setItem('favoritemeals', JSON.stringify(favoriteMeals));
    renderMeals()
    toastMsg.textContent = "Added to favorites";
    toastBootstrap.show()
}

const handleFavoriteMeal = (meal) => {
    if(favoriteMeals.filter(m => m.idMeal === meal.idMeal).length <= 0){
        addToFavorite(meal);
    }else{
        console.log("df");
        removeFromFavorite(meal.idMeal)
    }
}

const renderMeals = () => {
    mealsList.innerHTML = ""
    meals.forEach(meal => {
        let cardComp = document.createElement("div");
        cardComp.classList.add(["card"]);
        cardComp.style.width = "14rem";
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

        let favBtn = document.createElement("i");
        if(favoriteMeals.some(m => m.idMeal === meal.idMeal)){
            favBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
        }else{
            favBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
        }
        favBtn.addEventListener('click', () => handleFavoriteMeal(meal))
        mealBtns.appendChild(favBtn)
        cardBody.appendChild(mealBtns)
        cardComp.appendChild(cardBody);
        mealsList.appendChild(cardComp);

    })
}

searchInput?.addEventListener("input", async (e) => {
    await fetchMealsBySearch(e.target.value)
    if(meals.length > 0){
        renderMeals()
    }else{
        mealsList.innerHTML = "<h1>No Meals Found.</h1>";
    }
})





