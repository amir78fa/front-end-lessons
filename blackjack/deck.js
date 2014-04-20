/************************** Deck Class ****************************/
/* 
 * Constructs a basic deck with 52 cards. 
 * @constructor
 */
function Deck() {
  this.cards = [];
  this.count = 0;
  for (var v = 1; v <= 13; v++) {
    for (var s = 1; s <= 4; s++) {
      this.cards[this.count] = new Card(v,s);
      console.log("just created: " + this.cards[this.count].toString());
      console.log("just created: " + this.count + " " + this.cards[this.count].suit + " " + this.cards[this.count].value);
      this.count++;
    }
  }
}
 
/*
 * Shuffles cards in deck by looping through nTimes cards and swapping it with another card.
 * @parameter nTimes the number of cards to swap. By default, it'll make 52 swaps.
 * @return shuffled deck
 */
Deck.prototype.shuffle = function(nTimes) {
  if (nTimes === undefined) {
    nTimes = 10;
  }
  for (var i = 0; i < nTimes; i++) {
    var card1 = Math.floor(Math.random()*52);
    var card2 = Math.floor(Math.random()*52);
    var temp = this.cards[card2];
    this.cards[card2] = this.cards[card1];
    this.cards[card1] = temp;
  }
}

/*
 * Next card removes last/top card from deck.
 * @return card removed from deck
 */
Deck.prototype.nextCard = function() {
  if (this.count < 1) {
    throw "Deck is already empty."
  }
  this.count = this.count - 1;
  return this.cards.pop();
}