/************************** Deck Class ****************************/
/* 
 * Constructs a basic deck with 52 cards. 
 * @constructor
 */
function Deck() {
	this.deck = [];
  var c = 0;
  for (var v = 1; v <= 13; v++) {
    for (var s = 1; s <= 4; s++) {
      this.deck[this.count] = new Card(v,s);
      console.log("just created: " + this.deck[this.count].toString())
      this.count++;
    }
  }
  this.count = 52;
}
 
/*
 * Shuffles cards in deck by looping through nTimes cards and swapping it with another card.
 * @parameter nTimes the number of cards to swap. By default, it'll make 52 swaps.
 * @return shuffled deck
 */
Deck.prototype.shuffle = function(nTimes) {
	if (arguments.length == 0) {
		var nTimes = 52;
	}
	if (arguments[0] < 1) {
		throw "Shuffle requires positive number of card swaps.";
	}
	for (var i = nTimes; i > 0; i--) {
    var card1 = Math.floor(Math.random(i)*(i+1));
    var temp = this.deck[card1];
    this.deck[card1] = this.deck[i];
    this.deck[i] = temp;
  }
  return this.deck;
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
	return this.deck[this.count]
}