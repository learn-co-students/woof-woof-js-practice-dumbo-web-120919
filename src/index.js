const dogTopBar = document.querySelector("#dog-bar")
let pups = []
let filterOn = false 

const dogButton = document.querySelector("#dog-info button")
const filterButton = document.querySelector("#good-dog-filter")
filterButton.addEventListener("click", () => {
    filterOn = !filterOn
    if (filterOn) {
        filterButton.innerText = "Filter Good Dogs: On"
    } else {
        filterButton.innerText = "Filter Bad Dogs: Off"
    }

    const filterDogs = pups.filter(pup => {
            if (filterOn) {
                return pup.isGoodDog
            } else {
                return true
            }
    })
        console.log(filterDogs)
        let dogTopBar = document.querySelector("#dog-bar")
        dogTopBar.innerHTML = ""
        renderAllPups(filterDogs)
})

    fetch("http://localhost:3000/pups")
        .then(r => r.json())
        .then(pupsArray => {
            pups = pupsArray
            renderAllPups(pupsArray)
        })

    function renderAllPups(pupsArray) {
        pupsArray.forEach( pup => {
        const dogSpan = document.createElement("span")
            dogSpan.innerText = pup.name
            dogTopBar.append(dogSpan)

            dogSpan.addEventListener("click", () => {  
                const pupList = document.querySelector("#dog-info")

                    pupList.innerHTML =
                    `
                        <img src=${pup.image}>
                            <h2>${pup.name}</h2>
                        <button>${pup.isGoodDog} Dog!</button>
                    `
                    const dogButton = document.querySelector("#dog-info button")

                    if(pup.isGoodDog === true) {
                        dogButton.innerText = "Good Dog!"
                    } else {
                        dogButton.innerText = "Bad Dog!"
                    }

                    dogButton.addEventListener("click", () => {
                        pup.isGoodDog = !pup.isGoodDog

                        const updatedDogInfo = { isGoodDog: pup.isGoodDog }

                        fetch(`http://localhost:3000/pups/${pup.id}`, {
                            method: "PATCH",
                                      headers: {
                                        "Content-Type": "application/json",
                                        "Accept": "application/json",
                                      },
                                      body: JSON.stringify(updatedDogInfo)
                        })
                        .then(r => r.json())
                        .then(newPupInfo => {
                            if(newPupInfo.isGoodDog === true) {
                                dogButton.innerText = "Good Dog!"
                            } else {
                                dogButton.innerText = "Bad Dog!"
                            }
                        })
                    })
            })
        })
    }

