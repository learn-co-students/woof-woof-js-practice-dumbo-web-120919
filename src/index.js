/*** DOM Elements ***/
const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")
const dogFilterBtn = document.querySelector("#good-dog-filter")

// (bonus challenge) *tricky* store dog data globally in order to access it when filtering good dogs
let dogArr = []

// fetch dog data, slap it on DOM
fetch("http://localhost:3000/pups")
.then(r => r.json())
.then(data => {
    dogArr = data
    renderAllDogs(dogArr)
})


function renderAllDogs(dogArr) {
    dogArr.forEach(dog => renderOneDog(dog))
}


function renderOneDog(dog) {
    //// Now we are in navbar section
    // put dog names onto navbar
    const dogBarSpan = document.createElement("span")
    dogBarSpan.textContent = dog.name
    dogBar.append(dogBarSpan)
    // make navbar accessible as btn
    dogBarSpan.dataset.id = dog.id
    // make navbar clickable
    dogBarSpan.addEventListener("click", handleDogBar)
    
    //// Now we are moving from navebar to each dog info 
    function handleDogBar() {
        // clear the info section
        dogInfo.innerHTML = ""
        // create dog info tags
        const dogImg = document.createElement("img")
        const dogName = document.createElement("h2")
        const dogBtn = document.createElement
        ("button")
        
        // match tags to specific dogs
        dogImg.src = dog.image
        dogName.innerText = dog.name
        dogBtn.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
        dogBtn.dataset.id = dog.id
        
        // append tags to dogInfo
        dogInfo.append(dogImg, dogName, dogBtn)
        
        
        // make dogBtn toggle
        dogBtn.addEventListener("click", handleToggle)
        // handle dogBtn toggle
        function handleToggle(e) {
            let newDogStatus = true
            if (e.target.innerText.includes("Good")) {
                e.target.innerText = "Bad Dog!"
                newDogStatus = false
            } else {
                e.target.innerText = "Good Dog!"
            }
            
            updateDogStatus(dog.id, newDogStatus)
        }
        
    }
    
}

/*** Helper Functions ***/
function updateDogStatus(id, newStatus) {
    return fetch(`http://localhost:3000/pups/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"         
        },
        body: JSON.stringify({
            isGoodDog: newStatus
        })
    })
    .then(r => r.json())
    
}

// (bonus challenge) filter good dogs
dogFilterBtn.addEventListener("click", handleFilter)

function handleFilter(e) {
    if (e.target.innerText.includes("OFF")) {
        e.target.innerText = "Filter good dogs: ON"
        // clear navbar section
        dogBar.innerHTML = ""
        const onlyGoodDogs = dogArr.filter(dog => dog.isGoodDog)
        renderAllDogs(onlyGoodDogs)
    } else {
        e.target.innerText = "Filter good dogs: OFF"
        // clear navbar section
        dogBar.innerHTML = ""
        renderAllDogs(dogArr)
    }
}