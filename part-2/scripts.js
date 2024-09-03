// 1. Make a request to API for a single card from newly shuffled deck
//    Once i have the card, console.log the 'value' & 'suit'

async function drawCard() {
    // request newly shuffled deck
    let deckResponse = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    let deckId = deckResponse.data.deck_id;

    // draw a single card from deck
    let cardResponse = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    let card = cardResponse.data.cards[0];

    console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`)
}
drawCard()

// 2. Make a request to draw a single card from newly shuffled deck
//    Once i have the card, make another request to draw another card

async function drawTwoCards() {
    let drawURL = 'https://deckofcardsapi.com/api/deck/';
    try {
        // Request a newly shuffled deck
        let deckResponse = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        let deckId = deckResponse.data.deck_id;

        // Draw two cards from the deck simultaneously
        let [card1Response, card2Response] = await Promise.all([
            axios.get(`${drawURL}/${deckId}/draw/?count=1`),
            axios.get(`${drawURL}/${deckId}/draw/?count=1`)
        ]);

        // Extract and log the card details
        let card1 = card1Response.data.cards[0];
        let card2 = card2Response.data.cards[0];

        console.log(`${card1.value.toLowerCase()} of ${card1.suit.toLowerCase()}`);
        console.log(`${card2.value.toLowerCase()} of ${card2.suit.toLowerCase()}`);

    } catch (error) {
        console.error('Error drawing cards:', error);
    }
}

drawTwoCards();

// 3. Build an HTML page that lets you draw cards from a deck.
// When the page loads, go to the Deck of Cards API to create a new deck,
// and show a button on the page that will let you draw a card.
// Every time you click the button, display a new card,
// until there are no cards left in the deck.


const button = document.querySelector('#card-drawer');
const container = document.querySelector('#card-container');

const cardGame = {

    async startGame() {
        try {
            const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            this.deckId = response.data.deck_id;
            // add click event listener
            button.addEventListener('click', () => this.drawCard())


        } catch (e) {
            console.log(error)
        }
    },

    async drawCard() {
        try {
            const response = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`)
            const card = response.data.cards[0];

            const img = document.createElement('img');
            img.src = card.image;

            let angle = Math.random() * 30 - 15;
            let x = Math.random() * 30 - 5;
            let y = Math.random() * 30 - 5;
            img.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`

            container.appendChild(img);

            if (response.data.remaining === 0) {
                button.disabled = true;
            }
        } catch (e) {
            console.log(e)
        }
    }


}
cardGame.startGame()