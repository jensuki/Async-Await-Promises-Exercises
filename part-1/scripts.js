// 1. Make a request to #'s API to get fact about my fav number

async function getNumFact() {
    let favNumber = 8;
    const response = await axios.get(`http://numbersapi.com/${favNumber}?json`);
    console.log(response.data);
}

getNumFact();

// 2. Get data on multiple #'s in a single request

async function getMultipleNumFacts() {
    let nums = [2, 4, 8];
    try {
        let response = await axios.get(`http://numbersapi.com/${nums}?json`)
        console.log(response.data)

        // look through results and log each fact
        for (let num in response.data) {
            document.body.innerHTML += `<p>${response.data[num]}</p>`
        }
    } catch (error) {
        console.log(error)
    }
}

getMultipleNumFacts()

// 3.  use the API to get 4 facts on my fav numbers. Once i have all,
//     display it on the page

async function fourFacts() {
    let favNumber = 9;
    let facts = [];

    try {
        for (let i = 0; i < 4; i++) {
            let factPromise = axios.get(`http://numbersapi.com/${favNumber}?json`);
            facts.push(factPromise);
        }
        //wait for all promises to resolve
        let responses = await Promise.all(facts);

        //loop through response and display each fact on page
        responses.forEach(response => {
            const factText = document.createElement('p');
            factText.textContent = response.data.text;
            document.body.appendChild(factText)
        });
    } catch (error) {
        console.log(error)
    }
}

fourFacts();

