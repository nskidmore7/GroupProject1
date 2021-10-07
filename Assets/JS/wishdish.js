var searchFormEl = document.querySelector("#search-button");

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

searchResults.addEventListener("click", function (event) {
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
});

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
      <div class="col s3">
        <img src="${image}" alt="image of ${name}" class="circle responsive-img" id= "image">
      </div>
      <div class="col s9">
        <span class="black-text flow-text" id="name">${name}</span>
        <span class="black-text flow-text" id = "address">${address}</span>
        <br>
        <a href="${site}" target="_blank" id ="yelp">Yelp Page</a>
        <a class="waves-effect waves-light btn" id = "save">Save to WishDish</a>
      </div>
      </div>
    </div>`);

    searchResults.append(card);
    i++;
  }
}

searchFormEl.addEventListener("click", handleSearchFormSubmit);
