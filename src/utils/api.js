let deckId;
const apiUrl = 'https://deckofcardsapi.com/api/deck'

const handleResponse = response => {
  if(response.ok) { return response.json() }
  throw new Error('API call failed');
};

export let createDeck = () => fetch(`${apiUrl}/new/shuffle/`)
  .then(handleResponse)
  .then(json => {
    deckId = json['deck_id'];
    return json;
  });

export let getCard = () => fetch(`${apiUrl}/${deckId}/draw/?count=1`)
  .then(handleResponse)
  .then(json => json['cards'][0])
