let cards = [
]

function makeNewPokemonCard(pokeObject) {
    let newCard = document.createElement('div')
    newCard.classList.add('card', 'pokemon'); 
    newCard.id = `${pokeObject.name}`
    newCard.addEventListener('click', () => deleteCard(pokeObject.name));
    newCard.innerHTML = `
                <h1>${pokeObject.name}</h1>
                <img src = ${pokeObject.imgLink} alt = "image not found">
                <p> Possible Forms: ${pokeObject.possibleForms}</p>
                <p> Height: ${parseFloat(pokeObject.height)/10} m</p>
                <p> Weight: ${parseFloat(pokeObject.weight)/10} kg</p> 
    `
    return newCard;
}

function makeNewDigimonCard(digiObject) {
    let newCard = document.createElement('div')
    newCard.classList.add('card', 'digimon'); 
    newCard.id = `${digiObject.name}`;
    newCard.addEventListener('click', () => deleteCard(digiObject.name));
    newCard.innerHTML = `
                <h1>${digiObject.name}</h1>
                <img src = ${digiObject.imgLink} alt = "image not found">
                <p> Level: ${digiObject.level}</p>
    `
    return newCard;
}


async function searchPokemonByName(name) {
    let pokeResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (pokeResponse.status == 404 || pokeResponse.status == 400) {
        alert("Entry not found! Check spelling and try again!")
        return false
    }
    else if (pokeResponse.status == 200) {
        let pokeData = await pokeResponse.json();
        cards.push({
            type: "poke",
            name: pokeData.name,
            imgLink: pokeData.sprites.front_default,
            possibleForms: pokeData.forms.length,
            height: pokeData.height,
            weight: pokeData.weight
        })

        document.querySelector("#card-div").appendChild(makeNewPokemonCard(cards[cards.length - 1]));
    }
    else{
        return false
    }
}

async function searchDigimonByName(name) {
    let digiResponse = await fetch(`https://digimon-api.vercel.app/api/digimon/name/${name}`);
    if (digiResponse.status == 404 || digiResponse.status == 400) {
        return false
    }
    else if (digiResponse.status == 200) {
        let digiData = await digiResponse.json();
        digiData = digiData[0];
        cards.push({
            type: "digi",
            name: digiData.name,
            imgLink: digiData.img,
            level: digiData.level
        })
    

    document.querySelector("#card-div").appendChild(makeNewDigimonCard(cards[cards.length - 1]));
    }
    else{
        return false
    }
}

async function findDigimonOrPokemon(e){
    e.preventDefault();
    let name = document.querySelector("#search-field").value.trim().toLowerCase();
    for (let card of cards) {
        if (card.name === name) {
            alert("This mon already is on your page!")
            return false
        }
    }

    let digiFound = await searchDigimonByName(name);
    if (digiFound === false){
        await searchPokemonByName(name);
    }
}

document.querySelector("#search-button").addEventListener("click", findDigimonOrPokemon);


function reloadCards(){
    let cardDiv = document.querySelector("#card-div");
    cardDiv.innerHTML = ''
    for (let card of cards){
        if (card.type === 'poke'){
            cardDiv.appendChild(makeNewPokemonCard(card));
        }
        else if (card.type === 'digi'){
            cardDiv.appendChild(makeNewDigimonCard(card));
        }
    }
}

function deleteCard(name){
    cards = cards.filter(card => card.name !== name);
    reloadCards()
}