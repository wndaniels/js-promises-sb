$(function () {
  let baseURL = "https://deckofcardsapi.com/api/deck";

  // 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck.
  // Once you have the card, console.log the value and the suit(e.g. “5 of spades”, “queen of diamonds”).
  $.getJSON(`${baseURL}/new/draw`).then((data) => {
    let { suit, value } = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  });

  // 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck.
  //Once you have the card, make a request to the same API to get one more card from the same deck.
  //Once you have both cards, console.log the values and suits of both cards.
  let firstCard = null;
  $.getJSON(`${baseURL}/new/draw/`)
    .then((data) => {
      firstCard = data.cards[0];
      let deckId = data.deck_id;
      return $.getJSON(`${baseURL}/${deckId}/draw/`);
    })
    .then((data) => {
      let secondCard = data.cards[0];
      [firstCard, secondCard].forEach(function (card) {
        console.log(
          `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
        );
      });
    });

  // Build an HTML page that lets you draw cards from a deck. When the page loads, go to the
  // Deck of Cards API to create a new deck, and show a button on the page that will let you
  // draw a card.Every time you click the button, display a new card, until there are no cards left in the deck.
  let deckId = null;
  let $btn = $("button");
  let $cards = $("#cards");

  $.getJSON(`${baseURL}/new/shuffle`).then((data) => {
    deckId = data.deck_id;
    $btn.show();
  });

  $btn.on("click", function () {
    $.getJSON(`${baseURL}/${deckId}/draw/`).then((data) => {
      let cardImg = data.cards[0].image;
      $cards.append(
        $("<img>", {
          src: cardImg,
        })
      );
      if (data.remaining === 0) $btn.remove();
    });
  });
});
