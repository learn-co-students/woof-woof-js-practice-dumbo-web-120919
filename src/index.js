/*** DOM ELEMENTS ***/
const dogBar = document.querySelector("#dog-bar");
const dogInfo = document.querySelector("#dog-info");
const goodDogFilter = document.querySelector("#good-dog-filter");

/*** EVENT LISTENERS ***/
dogBar.addEventListener("click", handleDogSelect);
dogInfo.addEventListener("click", handleGoodDogToggle);

/*** EVENT HELPERS ***/

// handles clicking a dog on the nav-bar and rendering its info
function handleDogSelect(event) {
  if (event.target.dataset.action === "doggo-span") {
    parentSpan = event.target.closest("span");
    let dogName = parentSpan.innerText;
    let dogObj = dogArray.find( dog => dog.name === dogName );
    renderDogInfoToPage(dogObj);
  };
};

// handles toggling a dog from good to bad (and back) with its button
function handleGoodDogToggle(event) {
  if (event.target.dataset.action === "good-dog-toggle") {
    let toggleGoodDogButton = event.target;
    let currentDogId = parseInt(toggleGoodDogButton.id);
    if (toggleGoodDogButton.textContent === "Good Dog!") {
      toggleGoodDogButton.textContent = "Bad Dog!";
      updateGoodDogStatus(currentDogId, false);
    } else {
      toggleGoodDogButton.textContent = "Good Dog!";
      updateGoodDogStatus(currentDogId, true);
    }
  }
};

/*** FETCHES ***/

// fetch dog info into global array + render names
let dogArray = []

fetch('http://localhost:3000/pups')
.then( response => {
  return response.json();
})
.then( json => {
  dogArray = json;
  allDogsOnBar(json);
});

// update dog info with isGoodDog status
const updateGoodDogStatus = function(dogId, goodDogStatus) {
  fetch(`http://localhost:3000/pups/${dogId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      isGoodDog: goodDogStatus
    })
  })
}

/*** RENDER FUNCTIONS ***/

// functions to get dog names on navbar
function oneDogOnBar(dog) {
  dogSpan = document.createElement("span");
  dogSpan.dataset.action = "doggo-span"
  dogSpan.innerText = dog.name;
  dogBar.append(dogSpan);
};
function allDogsOnBar(dogs) {
  dogs.forEach( dog => oneDogOnBar(dog));
};

// function to render clicked-on doggo to the main body
function renderDogInfoToPage(dogObj) {
  while (dogInfo.firstChild) {
    dogInfo.removeChild(dogInfo.firstChild);
  };

  let showDogImg = document.createElement("img");
  showDogImg.src = dogObj.image;
  showDogName = dogObj.name;
  goodDogButton = document.createElement("button");
  goodDogButton.dataset.action = "good-dog-toggle"
  goodDogButton.id = `${dogObj.id}`;
  if (dogObj.isGoodDog) {
    goodDogButton.textContent = "Good Dog!";
  } else {
    goodDogButton.textContent = "Bad Dog!";
  };

  dogInfo.append(showDogImg);
  dogInfo.append(showDogName);
  dogInfo.append(goodDogButton);
};


