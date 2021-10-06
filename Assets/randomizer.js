var nameEl = document.createElement("randomRest")
var addrEl = document.createElement("display_address")
var searchFormEl = document.querySelector("#submit");
                                      
function searchApi(place) {
  console.log(place);
  var locQueryUrl =
    "https://cors-anywhere.herokuapp.com/" +
    "https://api.yelp.com/v3/businesses/search?restaurants&location=" +
    place + "&limit=50";
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

  var searchLoc = document.querySelector("#search-loc").value;
  console.log(searchLoc);

  if (!searchLoc) {
    console.error("You need a search input value!");
    return;
  }

  searchApi(searchLoc);
}

searchFormEl.addEventListener("click", handleSearchFormSubmit);



function getRandomRest(data) {      
    console.log(data);
    var max = data.businesses;
    console.log(max);
    var maxL = max.length;
    console.log(maxL);
    let i = Math.floor(Math.random() * maxL);
    console.log(i);
  


  var name = data.businesses[i].name;
  var nameEl = document.createElement("h2");
    nameEl.innerText = name;
    randomRest.appendChild(nameEl);

  var display_address = data.businesses[i].display_address;
  var addrEl = document.createElement("h2");
    addrEl.innerText = display_address;
    display_address.appendChild(addrEl);
}
