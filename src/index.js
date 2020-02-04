/************************************** USING DEFER **************************************/
let pups = []//have an array of all pups accessible to whole page (global scope)
let filterOn = false

const filterButton = document.querySelector('#good-dog-filter')
filterButton.addEventListener('click', ()=> {
    //need pupsarray
    filterOn = !filterOn

    if(filterOn){
        filterButton.innerText = "Filter good dogs: OFF"
    }else{
        filterButton.innerText = "Filter good dogs: ON"
    }

    const filteredPups = pups.filter(pup => {
        if(filterOn){
            return pup.isGoodDog
        }else{
            return true
        }
    })

    let pupsList = document.querySelector("#dog-bar")
    pupsList.innerHTML = ""
    renderPups(filteredPups)
    //filter with isgooddog
    //slap filtered list on dom
})

fetch(`http://localhost:3000/pups`)
.then(r => r.json())
.then(pupsArray => {
    pups = pupsArray
    //slap on the dom
    renderPups(pupsArray)
})    //find out the container

function renderPups(pupsArray){
    let pupsList = document.getElementById('dog-bar')
        //create the elements,iterate
    pupsArray.forEach(pup => {
        let pupsSpan = document.createElement('span')
        pupsSpan.innerText = pup.name

        //append the element
        pupsList.append(pupsSpan)

        //add event listener for the click
        //event listener has to be to an element
        pupsSpan.addEventListener('click', () => {
            let dogInfo = document.querySelector('#dog-info')
            dogInfo.innerHTML = `
            <img src=${pup.image}>
            <h2> ${pup.name}</h2>
            <button>${pup.isGoodDog} </button>
            `
            const button = dogInfo.querySelector("button") 
            //(button is a tag ) so if no class or id, you can fill in with name of element
            if(pup.isGoodDog === true){
                button.innerText = "Good Dog!"
            }else{
                button.innerText = "Bad Dog!"
            }
            //when a click on the dog button happens
            button.addEventListener('click', () => {
                pup.isGoodDog =!pup.isGoodDog
                const updatedDogInfo = { isGoodDog: pup.isGoodDog }
                fetch(`http://localhost:3000/pups/${pup.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(updatedDogInfo)
                })

                if(pup.isGoodDog === true){
                    button.innerText = "Good Dog!"
                }else{
                    button.innerText = "Bad Dog!"
                }
            })
        })
    })

}

//when(the page load)event happens
//do (a get for all pups) fetch
//slap on the DOM

//fetch data
//find where to put data(queryselector)
//add an element(for each)

// document.addEventListener("DOMContentLoaded", () => {
//     getPuppies()
// })

// function getPuppies(){
//     fetch(`http://localhost:3000/pups`)
//     .then (r => r.json())
//     .then (pups => renderPupList(pups))
// }

// function renderPupList(pups){
//     let pupList = document.getElementById('dog-bar')



//`<img src=dog_image_url>
//<h2>Mr. Bonkers</h2>
//<button>Good Dog!</button>`
// }


    