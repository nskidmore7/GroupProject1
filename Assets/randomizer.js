var searchFormEl = document.querySelector("#submit");
var randomRest = document.querySelector("#randomRest");
                           
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
  // if (searchLoc){

  // }
  searchApi(searchLoc);
}

searchFormEl.addEventListener("click", handleSearchFormSubmit);
{/* <input type="button" onclick="this.form.reset();"></input> */}


function getRandomRest(data) { 
  var container = document.createElement("div");     
    console.log(data);
    var max = data.businesses;
    console.log(max);
    var maxL = max.length;
    console.log(maxL);
    let i = Math.floor(Math.random() * maxL);
    console.log(i);
  
    var image_url = data.businesses[i].image_url;
  console.log(image_url);
    var imgEl = document.createElement("img");
    imgEl.src = image_url;
    container.appendChild(imgEl);

  var name = data.businesses[i].name; 
  var nameEl = document.createElement("h1");
    nameEl.innerText = name;
    // randomRest.html(nameEl);
    container.appendChild(nameEl);

  var display_address = data.businesses[i].location.display_address;
  console.log(display_address);
  var addrEl = document.createElement("h2");
    addrEl.innerHTML = display_address;
    // randomRest.html(addrEl);
    container.appendChild(addrEl);

    

  var display_phone = data.businesses[i].display_phone;
  console.log(display_phone);
  var phoneEl = document.createElement("h2");
    phoneEl.innerHTML = display_phone;
    // randomRest.html(phoneEl);
    container.appendChild(phoneEl);


  var url = data.businesses[i].url;
  console.log(url);
  var urlEl = document.createElement("a");
    urlEl.innerHTML = "Restaurant Link";
    urlEl.href = url;
    urlEl.target = "blank";
    // randomRest.innerhtml(urlEl);
    container.appendChild(urlEl);

    $("#randomRest").html(container);

    // $(this).find('randomRest').get(0).reset();
    
    // var resetDiv = document.getElementById("img");
    // resetDiv.remove();
    // document.getElementById("randomRest").reset();
    
}
// getRandomRest.reset();
// function resetRest(){
 
// }