var searchFormEl = document.querySelector("#search-btn");
// var searchResultsBtn = document.querySelectorAll("#save");
// var wishDishEl = document.querySelector("#wish-dish");
console.log("hello");
function searchApi(name, place) {
  console.log(name);
  console.log(place);
  var locQueryUrl =
    "https://cors-anywhere.herokuapp.com/" +
    "https://api.yelp.com/v3/businesses/search?categories=restaurants&term=" +
    name +
    "&location=" +
    place;
  fetch(locQueryUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization:
        "Bearer " +
        "Y10uXD3MPQF9L3lVhPX4iU65TCdJMw_UMUBd69J5iygPu2vwsfCrHRwJDybKw3A9_NQQQuPmNRsbOCmBAGCe7LdW-NbNd4D38hzn8aUb7UCLrlGs6YRiiYiTVBBbYXYx",
      "Content-Type": "application/json",
    },
  }).then(function (takeresponse) {
    takeresponse.json().then(function (data) {
      console.log(data);
      generateResults(data);
    });
  });
}
function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchRes = document.querySelector("#search-name").value;
  var searchLoc = document.querySelector("#search-loc").value;
  console.log(searchRes, searchLoc);

  if (!searchRes) {
    console.error("You need a search input value!");
    return;
  }

  searchApi(searchRes, searchLoc);
}
function createWishDish() {
  var existingList = JSON.parse(localStorage.getItem("wishDish"));
  var wishDishList = $("#wish-dish");
  wishDishList.empty();
  if (existingList !== null) {
    var listLength = existingList.length;
    console.log(listLength);
    for (let i = 0; i < listLength; i++) {
      var restaurant = existingList[i];
      console.log(restaurant);

      var addressKey = Object.keys(restaurant)[2];
      var address = restaurant[addressKey];
      console.log(address);
      var imageKey = Object.keys(restaurant)[0];
      var image = restaurant[imageKey];
      console.log(image);
      var nameKey = Object.keys(restaurant)[1];
      var name = restaurant[nameKey];
      console.log(name);
      var urlKey = Object.keys(restaurant)[3];
      var site = restaurant[urlKey];
      console.log(site);

      var card = $(`<div class="card-panel grey lighten-5 z-depth-1" >
    <div class="row valign-wrapper" id = "card">
      <div class="col s3">
        <img src="${image}" alt="image of ${name}" class="circle responsive-img" id= "image">
      </div>
      <div class="col s9">
        <span class="black-text flow-text" id="name">${name}</span>
        <p class="black-text flow-text" id = "address">${address}</p>
        <br>
        <a href="${site}" target="_blank" id ="yelp">Yelp Page</a>
        <a class="waves-effect waves-light btn delete" id = "delete" data-name="${name}">Remove from WishDish</a>
      </div>
      </div>
    </div>`);
      wishDishList.append(card);
    }
  }
}

function generateResults(data) {
  var searchResults = $("#searchResults");
  searchResults.empty();
  var restaurants = data.businesses;
  if (!restaurants) {
    Materialize.toast(
      "Looks like there are no results for that search!",
      4000,
      "blue lighten-2 rounded"
    );
    return;
  }
  let i = 0;
  while (i < 5) {
    var restaurant = restaurants[i];
    console.log(restaurant);
    var name = restaurant.name;
    console.log(name);
    var site = restaurant.url;
    console.log(site);
    var address = restaurant.location.display_address;
    console.log(address);
    var image = restaurant.image_url;
    var card = $(`<div class="card-panel grey lighten-5 z-depth-1" >
    <div class="row valign-wrapper" id = "card">
      <div class="col s4">
        <img src="${image}" alt="image of ${name}" class="circle responsive-img" id= "image">
      </div>
      <div class="col s8">
        <span class="black-text flow-text" id="name">${name}</span>
        <p class="black-text flow-text" id = "address">${address}</p>
        <br>
        <a href="${site}" target="_blank" id ="yelp">Yelp Page</a>
        <a class="waves-effect waves-light btn save" id = "save">Save to WishDish</a>
      </div>
      </div>
    </div>`);

    searchResults.append(card);
    i++;
  }
}

$(document).on("click", ".save", function (event) {
  console.log("hello save");
  var existingEntries = JSON.parse(localStorage.getItem("wishDish"));
  if (existingEntries == null) existingEntries = [];
  var target = event.target;
  var saveTarget = target.closest("#card");
  var saveImage = saveTarget.querySelector("#image").src;
  console.log(saveImage);
  var saveName = saveTarget.querySelector("#name").innerText;
  console.log(saveName);
  var saveAddress = saveTarget.querySelector("#address").innerText;
  console.log(saveAddress);
  var saveUrl = saveTarget.querySelector("#yelp").href;
  console.log(saveUrl);
  var saveItem = {
    image: saveImage,
    name: saveName,
    address: saveAddress,
    url: saveUrl,
  };
  localStorage.setItem("saveItem", JSON.stringify(saveItem));
  existingEntries.push(saveItem);
  localStorage.setItem("wishDish", JSON.stringify(existingEntries));
  createWishDish();
});

$(document).on("click", ".delete", function (event) {
  console.log("hello delete");

  var nameDel = $(this).attr("data-name");
  console.log(nameDel);

  var target = event.target;
  var deleteTarget = target.closest(".card-panel");
  deleteTarget.remove();
  var wishDish = JSON.parse(localStorage.getItem("wishDish"));
  for (let i = 0; i < wishDish.length; i++) {
    console.log(wishDish[i].name);
    if (wishDish[i].name === nameDel) {
      console.log(wishDish[i]);
      wishDish.splice(i, 1);
      console.log(wishDish);
      localStorage.setItem("wishDish", JSON.stringify(wishDish));
    }
  }
});
createWishDish();
searchFormEl.addEventListener("click", handleSearchFormSubmit);
