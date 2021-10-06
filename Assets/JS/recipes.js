$(function () {

  // selects search recipe & cocktail button
  var searchButton = document.querySelector('#search-btn');
  var randomButton = document.querySelector('#random-btn');

  var calendarDays = ['Sun', 'M', 'T', 'W', 'Th', 'F', 'S'];

  // function to get recipe based on user input
  function getRecipe() {
    // variable to store value of user input
    var ingredient = $('#user-search').val();
    // variable for recipe mealDB URL
    var requestRecipe = 'https://themealdb.com/api/json/v1/1/search.php?s=' + ingredient + '';

    //call for recipe data
    $.ajax({
      url: requestRecipe,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      // run display recipe function
      displayResults(response)
    });
  }

  // function to display recipe to webpage
  function displayResults(response) {
    // selects recipe results section
    var recipeResults = $("#recipesResults");
    // empties recipe results
    recipeResults.empty();
    // response for searched recipes
    var recipes = response.meals;
    // if no recipes are found return "no results" message
    if (!recipes) {
      Materialize.toast("Looks like there are no results for that search!", 4000, "blue lighten-2 rounded");
      return;
    }

    // for loop to go through the recipe data
    for (var i = 0; i < recipes.length; i++) {
      var recipe = recipes[i];

      // variables for recipe link, youtube, weekdays, calendar buttons
      var link = recipe.strSource || `https://www.themealdb.com/meal.php?c=${recipe.idMeal}`;
      var youtube = recipe.strYoutube ? ` • <a href="${recipe.strYoutube}" target="_blank">Video</a>` : '';
      var weekdays = ['Sun', 'M', 'T', 'W', 'Th', 'F', 'S'];
      var calendarButtons = weekdays.map(day => '<a class="waves-effect waves-teal btn-flat">' + day + '</a>');

      // variable to create card & display recipe information
      var card = $(`<div class="card-panel grey lighten-5 z-depth-1">
  <div class="row valign-wrapper">
    <div class="col s3">
      <img src="${recipe.strMealThumb}" alt="image of ${recipe.strMeal}" class="circle responsive-img">
    </div>
    <div class="col s9">
      <span class="black-text flow-text">${recipe.strMeal}</span>
      <br>
      <a href="${link}" target="_blank">Recipe</a>
      ${youtube}
      <br>
      <br>
      <span class="center">Save to Calendar: <br>${calendarButtons.join(' • ')}</span>
    </div>
    </div>
  </div>`);

      // function to add selected recipe link to calendar
      function addToCalendar(recipeLink) {
        return function () {
          var btn = $(this);
          saveRecipeToDay(recipeLink, btn.text());
        };
      }

      // searches the card to find anchor with class "button flat" & adds click handler
      card.find('a.btn-flat').click(addToCalendar(link))
      // append recipe card to recipe results section
      recipeResults.append(card);
    }
  }

  // function to save recipe link to day of week
  function saveRecipeToDay(recipeLink, dayOfWeek) {
    var newLine = "<br>";
    $("#links-" + dayOfWeek).append("<a href='" + recipeLink + "' target='_blank'>" + recipeLink + "</a>" + newLine);
  }

  // function to get random drink 
  function getCocktail() {
    // variable for cocktailDB URL
    var requestCocktail = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

    //call for drink data
    $.ajax({
      url: requestCocktail,
      method: "GET",
    }).then(function (response) {
      // run display drink function
      displayDrink(response);
    });
  }

  // function to display drink content
  function displayDrink(response) {
    // selects drink result section
    var drinkResults = $("#drinkResult");
    // empties drink result
    drinkResults.empty();

    // variable to hold drink data
    var drink = response.drinks[0];

    // variable for drink information link
    var ctLink = `https://www.thecocktaildb.com/drink.php?c=${drink.idDrink}`;

    var calendarButtons = calendarDays.map(day => '<a class="waves-effect waves-teal btn-flat">' + day + '</a>');

    // variable to create card & display drink information
    var card = $(`<div class="card-panel grey lighten-5 z-depth-1">
  <div class="row valign-wrapper">
    <div class="col s3">
      <img src="${drink.strDrinkThumb}" alt="image of ${drink.strDrink}" class="circle responsive-img">
    </div>
    <div class="col s9">
      <span class="black-text flow-text">${drink.strDrink}</span>
      <br>
      <a href="${ctLink}" target="_blank">Drink Recipe</a>
      <br>
      <p>Drink type: ${drink.strCategory}</p>
      <br>
      <span class="center">Save to Calendar: <br>${calendarButtons.join(' • ')}</span>
    </div>
    </div>
  </div>`);

    // function to add selected drink link to calendar
    function addToCalendar(link) {
      return function () {
        var btn = $(this);
        saveRecipeToDay(link, btn.text());
      };
    }

    // searches the card to find anchor with class "button flat" & adds click handler
    card.find('a.btn-flat').click(addToCalendar(ctLink))
    // append drink card to drink result section
    drinkResults.append(card);
  }

  // search button event listener
  searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    getRecipe();
  });

  // cocktail search button event listener
  randomButton.addEventListener('click', getCocktail);

  $("#clear-button").on("click", function () {
    for (var i = 0; i < calendarDays.length; i++) {
      var day = calendarDays[i];
      $("#links-" + day).empty();
      $("#day-" + day).val("");
    }
  });

  // close and save input from calendar to local storage
  $('#close-button').on('click', function () {
    var savedCalendar = calendarDays.map(day => ({
      name: day,
      links: $("#links-" + day).html(),
      text: $("#day-" + day).val()
    }));

    localStorage.setItem("mealSchedule", JSON.stringify(savedCalendar));
  });

  // display saved calendar to user
  function displaySavedCalendar() {
    var savedCalendar = JSON.parse(localStorage.getItem("mealSchedule"));
    if (savedCalendar !== null) {
      for (var i = 0; i < savedCalendar.length; i++) {
        var day = savedCalendar[i];
        $("#day-" + day.name).text(day.text);
        $("#links-" + day.name).empty().append(day.links);
      };
    };
  };

  // calls display saved calendar function
  displaySavedCalendar();

  // initialize modal on page load
  $('.modal').modal();
});

//displays date
var today = moment.DateTime.local();
var date = today.toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' });
plannerDate.innerHTML = date;