var searchFormEl = document.querySelector("#submit");
// var searchRes = document.querySelector("#search-name");
// var searchLoc = document.querySelector("#search-loc");
console.log("hello");
function searchApi(name, place) {
  console.log(name);
  console.log(place);
  var locQueryUrl =
    "https://cors-anywhere.herokuapp.com/" +
    "https://api.yelp.com/v3/businesses/search?term=" +
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
    console.log(takeresponse);
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
function generateResults(data) {
  let i = 0;
  while (i < 5) {}
}

// searchApi("starbucks");
searchFormEl.addEventListener("click", handleSearchFormSubmit);
