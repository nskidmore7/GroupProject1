var nameEl = document.createElement(h2)
var searchFormEl = document.querySelector("#submit");
// var searchRes = document.querySelector("#search-name");
// var searchLoc = document.querySelector("#search-loc");
console.log("hello");
function searchApi(place) {
  console.log(place);
  var locQueryUrl =
    "https://cors-anywhere.herokuapp.com/" +
    "https://api.yelp.com/v3/businesses/search?location=" +
    place;
  fetch(locQueryUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization:
        "Bearer " +
        "ualh69eyPnQfBSyu6feObJ5sQTd4i3-4BMuHLg7IASZi71WhV15tHWCkW7-d6gBgT1Ax1JvWLRTK2JatLGuGnPy7ETGfFcxMHVJGuA0-J21i2iv7OfbVBZ35IEdbYXYx",
      "Content-Type": "application/json",
    },
  }).then(function (takeresponse) {
    console.log(takeresponse);
    takeresponse.json().then(function (data) {
      console.log(data);
      getRandomRest(data);
    });
  });
}
function handleSearchFormSubmit(event) {
  event.preventDefault();

//   var searchRes = document.querySelector("#search-name").value;
  var searchLoc = document.querySelector("#search-loc").value;
  console.log(searchLoc);

  if (!searchLoc) {
    console.error("You need a search input value!");
    return;
  }

  searchApi(searchLoc);
}
//searchApi("starbucks");
searchFormEl.addEventListener("click", handleSearchFormSubmit);



function getRandomRest(data) {
    console.log(data);
    var max = data.businesses;
    console.log(max);
    var maxL = max.length;
    console.log(maxL);
    let i = Math.floor(Math.random() * maxL);
    console.log(i);
  }


  var name = data.businesses[i].name
  nameEl.innertext = name;
  h2.append(nameEl)