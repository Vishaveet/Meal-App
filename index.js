const inputButton = document.getElementById("search_box");

const suggestion_box = document.getElementById("suggestion");

const list = document.getElementById("list");

const container = document.getElementById("container");

const new_container = document.getElementById("new_container");

const favorite_list=document.getElementById("fav-list");

const nav=document.getElementById("nav");

const fav_container=document.getElementById("favorite_list")

let fav_list=[];

let meals_data = "";

let mealString = "";

handlechange = (e) => {
  console.log(e.target.value);

  let mealName = e.target.value;
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
  async function fetchURL(url) {
    let response = await fetch(url);
    let data = await response.json();
    meals_data = data;
    mealString = e.target.value;
    if (mealString.length > 0) {
      // fetchURL(url);
      console.log("data", data.meals);
      addSuggestionList(data.meals);
    }
    console.log("String", mealString);
    // console.log(data.meals[0].strMealThumb);
    // console.log("name", data.meals[0].strMeal);
    displayList(data.meals);
  }
  fetchURL(url);
};
// display suggestion list
function addSuggestionList(meals) {
  suggestion_box.innerHTML = "";
  for (let i = 0; i < meals.length && i < 5; i++) {
    const li = document.createElement("li");
    li.setAttribute("class", "seggestion_box");
    // li.setAttribute("id",Date.now());
    // li.setAttribute("onclick",suggClick);

    console.log("f", meals[i].strMeal);
    li.innerHTML = `
      <div  class="pro_name_sugg"  onclick="suggClick(${meals[i].idMeal})">${meals[i].strMeal}</div>
      `;
    suggestion_box.append(li);
  }
}
suggClick = (e) => {
  console.log("s", e);
  showMealsDetails(e);
  // let url= `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealId}`;
  // let data=async function fetchURL(url) {
  //   let response = await fetch(url);
  //   let data = await response.json();
  //   console.log('data',data);

  // const div=document.createElement('div');
  // div.setAttribute("Class","product_details");
  // div.innerHTML=`
  // <div>
  // <img src="${meals.strMealThumb}"/>
  // </div>
  // `
  // container.append(div);
};

// display the  list
function addlistToDom(meals) {
  const li = document.createElement("li");
  li.setAttribute("class", "list_box");
  li.innerHTML = `
  <div id="zoom_In">
   <figure>
    <img class="list_img" alt="img" src="${meals.strMealThumb}"/>
   </figure>
  </div>
<div class="product_name">${meals.strMeal}</div>

<div id="details">
    <button id= "${Date.now()}" onclick="showMealsDetails(${
    meals.idMeal
  })">Recipe </button>
    <img alt="img" id="fav-Btn" onclick="favList(${meals.idMeal})" src="https://media.istockphoto.com/id/1305618081/vector/vector-illustration-of-like-icon.jpg?s=170667a&w=0&k=20&c=ue54HPlGPQ0OJqG8yxtFTqGG-l_i_LzD_uBX5BEEPHA="/>
</div>
`;
  list.append(li);
  showMealsDetails = (mealId) => {
    // console.log('b',mealId);
    // console.log(meals);
    // console.log("meal", meals_data.meals[0].idMeal);
    // console.log('len',meals_data.meals.length);
    for (let i = 0; i < meals_data.meals.length; i++) {
      // console.log(('pro',meals_data.meals[i].idMeal));
      if (mealId == meals_data.meals[i].idMeal) {
        console.log('right');
        new_container.innerHTML='';
        console.log("hi", meals_data.meals[i].strMeal);
        container.style.display = "none";
        new_container.style.display="block";
        fav_container.style.display="none";
        nav.style.display="flex";
        const div = document.createElement("div");
        console.log('ki');
        div.setAttribute("class", "Product_details_container");
        div.innerHTML = `
        
          <div id="left_desc">
          <div id="meal-img">
            <img src="${meals_data.meals[i].strMealThumb}" alt="img"/>
          </div>
          <div id="food-desc">
          <div id="type">Type:
          <span id="meal-type">${meals_data.meals[i].strArea}</span>
          </div>
          <div id="ingredients">Ingredients:
           <span id="ingredients-type">
            ${meals_data.meals[i].strIngredient1},
            ${meals_data.meals[i].strIngredient2},
            ${meals_data.meals[i].strIngredient3},
            ${meals_data.meals[i].strIngredient4},
            ${meals_data.meals[i].strIngredient4},
            ${meals_data.meals[i].strIngredient5},
            ${meals_data.meals[i].strIngredient6}
           </span>
          </div>
          </div>
          </div>
          <div id="right_desc">
          <div id="meal-heading">${meals_data.meals[i].strMeal}</div>
          <div class="meal-desc-buttons">
          <div id="wat-vid" class="meal-btn">
           <a href="${meals_data.meals[i].strYoutube}">Watch Recipe</a>
          </div>
          <div class="meal-btn add-to-fav" onclick="favList(${meals_data.meals[i].idMeal})">Add to Favourite</div>
          </div>
          <div id="recipe">${meals_data.meals[i].strInstructions}</div>
          </div>
          `;
        new_container.append(div);
        return;
      }
    }
  };
  favList=(e)=>{
    console.log(e);
    // console.log("p",meals_data.meals.length);
    // console.log(!fav_list.length==0);
    if(fav_list.length<1){
        fav_list.push(e);
        console.log('push1');
        return;
    }
    for(let i=0;i<fav_list.length;i++){
      console.log("o",fav_list[i]==e, fav_list[i]);
     if(fav_list[i]==e){
      fav_list.splice(i,1);
      console.log('pop');
      console.log("List",fav_list);
      favorite();
      return;
     }
    }
    // if(fav_list[i]!=e) {
      fav_list.push(e);
      console.log('push2');
    console.log("list",fav_list);           
      return;
    //  }
  }
  
  
  

}
favorite=()=>{
  fav_container.style.display = "block";
  container.style.display = "none";
  new_container.style.display="none"
  nav.style.display="none";
  console.log('fav',fav_list);
  console.log('data',meals_data.meals.length);
   favorite_list.innerHTML='';
  for(let i=0;i<meals_data.meals.length;i++){
    // console.log('loop',meals_data.meals[i].idMeal==fav_list[i]);
    for(let j=0;j<fav_list.length;j++){
    if(meals_data.meals[i].idMeal==fav_list[j]){

      const li=document.createElement('li');
      li.setAttribute("class","fav-list-item");
      // console.log('id',meals_data.meals[i].idMeal);
      li.innerHTML=`
    <img class="img" alt="img" src="${meals_data.meals[i].strMealThumb}"/>
    <div class="cart-details">
     <div class="cart-heading">${meals_data.meals[i].strMeal}</div>
     <div class="fav-cart-Btn">
      <div class="recipe card-btn" data-mealid="${meals_data.meals[i].idMeal}" onclick="showMealsDetails(${meals_data.meals[i].idMeal})"> 
      See Recepie </div>
      <div class="fav-remove-btn card-btn" onclick="favList(${meals_data.meals[i].idMeal})">Remove from Favorite</div>
    </div>
    `;
  favorite_list.append(li);
  
    }
  }
  }
 
}

clossFav=()=>{
  // console.log('ji');
  fav_container.style.display="none";
  container.style.display = "block";
  
  nav.style.display="flex";
}

// display the list of set alarm list
function displayList(meals) {
  // console.log("hi", meals.length);
  list.innerHTML = "";
  for (let i = 0; i < meals.length; i++) {
    addlistToDom(meals[i]);
  }
}
 home=()=>{
  console.log("e");
  new_container.style.display="none";
  container.style.display = "block";

}

inputButton.addEventListener("keyup", handlechange);
