const button = document.querySelector('#generate-btn');
const container = document.querySelector('#pokemon-container');

async function fetchPokemon() {
    try {
        let response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
        let allPokemon = response.data.results;

        let randomPokemon = [];
        for (let i = 0; i < 3; i++) {
            let randomIndex = Math.floor(Math.random() * allPokemon.length)
            randomPokemon.push(allPokemon[randomIndex]);
        }

        let pokemonDetails = await Promise.all(randomPokemon.map(pokemon => {
            return axios.get(pokemon.url)
        }))
        container.innerHTML = ''

        // fetch species descriptions
        for (let i = 0; i < pokemonDetails.length; i++) {
            let pokemonData = pokemonDetails[i].data;
            let speciesUrl = pokemonData.species.url;

            let speciesResponse = await axios.get(speciesUrl);
            let speciesData = speciesResponse.data;
            let flavorTextEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');
            let description = flavorTextEntry ? flavorTextEntry.flavor_text : "No description available";

            let name = pokemonData.name;
            let imageSrc = pokemonData.sprites.front_default;

            // create and display pokemon card
            let pokemonCard = document.createElement('div');
            pokemonCard.classList.add('pokemon');

            let img = document.createElement('img');
            img.src = imageSrc;

            let nameValue = document.createElement('p');
            nameValue.textContent = name;
            nameValue.classList.add('pokemon-name')

            let descriptionText = document.createElement('p');
            descriptionText.textContent = description;
            descriptionText.classList.add('description')

            pokemonCard.appendChild(nameValue);
            pokemonCard.appendChild(img);
            pokemonCard.appendChild(descriptionText);
            container.appendChild(pokemonCard);
        }

    } catch (e) {
        console.log("Error fetching pokemon", e)
    }
}

button.addEventListener('click', fetchPokemon)