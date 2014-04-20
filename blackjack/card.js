// Standard playing card in Javascript

/* 
 * Constructs a basic card. If given parameters, it sets them too.
 * value: number between 1 and 13
 * suit: number between 1 and 4
 * @constructor
 */
function Card(value, suit) {
	this.value = -1;
	this.suit = -1;

	if (arguments.length >= 2) {
		this.set(arguments[0], arguments[1]);
	} 
}

/* Constants */
Card.ACE = 1;
Card.JACK = 11;
Card.QUEEN = 12;
Card.KING = 13;
Card.CLUB = 1;
Card.DIAMOND = 2;
Card.HEART = 3;
Card.SPADE = 4;

/*
 * sets the value of a card.
 * @parameter value the value of the card, valid between 1 and 13
 */
Card.prototype.setValue = function(value) {
	if (arguments.length < 1)
		throw "Card setValue requires a value.";
	if (1 > value || value > 13)
		throw "Card value must be between 1 and 13.";
	this.value = value;
}

/*
 * sets the suit of a card.
 * @parameter suit the suit of the card, valid between 1 and 4
 */
Card.prototype.setSuit = function(suit) {
	if (arguments.length < 1)
		throw "Card setSuit requires a value.";
	if (1 > suit || suit > 4)
		throw "Card value must be between 1 and 4.";
	this.suit = suit;
}

/*
 * toString method returns a string, value of suit
 * @return String
 */
Card.prototype.toString = function() {
    if (this.value == -1 || this.suit == -1)
       return "Genetic card, no value or suit set";
    var name = "";
    switch (this.value) {
       case 1: name += "Ace"; break;
       case 11: name += "Jack"; break;
       case 12: name += "Queen"; break;
       case 13: name += "King"; break;
       default: name += this.value; break;
    }
    name += " of ";
    switch (this.suit) {
       case 1: name += "Clubs"; break;
       case 2: name += "Diamonds"; break;
       case 3: name += "Hearts"; break;
       case 4: name += "Spades"; break;
    }
    return name;
}