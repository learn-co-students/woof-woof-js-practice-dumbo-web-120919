document.addEventListener("DOMContentLoaded", () => {
    let pups = []
    // make filter button clickable to show just good dogs or show all dogs when off
    let filterOn = false

    const filterButton = document.querySelector("#good-dog-filter")
    filterButton.addEventListener("click", () => {
        //button text should change to off or on when clicked
        filterOn = !filterOn
        if (filterOn) {
            filterButton.innerText = "Filter good dogs: ON"
        } else {
            filterButton.innerText = "Filter good dogs: OFF"
        }
        //need the array of pups
        const filteredPups = pups.filter(pup => {
            if (filterOn) {
                return pup.isGoodDog
            } else {
                return true
            }
        })
        let pupsList = document.querySelector("#dog-bar")
        pupsList.innerHTML = ""
        renderPups(filteredPups)
        //once we have the array we need to filter it based on isGoodDog attribute
        //once we have filtered list, slap it on the DOM
    })

    fetch("http://localhost:3000/pups")
        .then(r => r.json())
        .then(pupsArray => {
            pups = pupsArray
            // add each pup to the DOM
            renderPups(pupsArray)
    })

    function renderPups(pupsArray) {
        // find where to put the dogs
        // add the dogs to the dog bar
        const pupsList = document.querySelector("#dog-bar")
        pupsArray.forEach(pup => {
            //create an element for each pup using span
            const pupSpan = document.createElement("span")
            pupSpan.innerText = pup.name
            // append the element to our container
            pupsList.append(pupSpan)

            //add event listener
            pupSpan.addEventListener("click", () => {
                //grab the container that will show dog details
                const dogInfo = document.querySelector("#dog-info")
                //add dog details to the DOM
                //add this HTML to the container
                dogInfo.innerHTML = `
                    <img src=${pup.image}>
                    <h2>${pup.name}</h2>
                    <button>${pup.isGoodDog} Dog!</button>
                    `
                const button = dogInfo.querySelector("button")
                // change button text so it doesn't say boolean value
                if (pup.isGoodDog === true) {
                    button.innerText = "Good Dog!"
                } else {
                    button.innerText = "Bad Dog!"
                }

                // when a click on the dog button event happens
                button.addEventListener("click", () => {
                    //click to change value of button
                    pup.isGoodDog = !pup.isGoodDog
                    const updatedDogInfo = { isGoodDog: pup.isGoodDog }

                    //do a patch fetch
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
                        //put the updated dog info on the DOM
                        if (newPupInfo.isGoodDog === true) {
                            button.innerText = "Good Dog!"
                        } else {
                            button.innerText = "Bad Dog!"
                        }
                    })
                })
            })
            //event delegation- putting listener on dog bar to listen for clicks on children (more challenging)
            //event listeners are put directly on each dog object (this is what we used)
        })
    }

})