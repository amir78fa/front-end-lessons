// Javascript for a Blackjack game

/************************** Blackjack logic ****************************/

$(document).ready(function() {
	var myDeck;
	var playerCards;
	var dealerCards;
	var dealerTurn;
	var playerScore;
	var dealerScore;

	
	var gameInProgress = false;
	displayActions(); //"deal" to start
	
	console.log("Game on?: " + gameInProgress);

	//---------carry out selected play: DEAL
	// Deal starts a new game. Board is reset and 2 cards are dealt to both sides
	$("#deal").on('click', function() {
		setBoard();
		gameInProgress = true;
		displayActions();

		playerCards.push(myDeck.nextCard());
		playerCards.push(myDeck.nextCard());
		dealerCards.push(myDeck.nextCard());
		dealerCards.push(myDeck.nextCard());
		window.console&&console.log("Player has n cards: " + playerCards.length);
		window.console&&console.log("Dealer has n cards: " + dealerCards.length);

		displayDealtHand();
		score();
	});

	//---------carry out selected play: HIT
	// Hit gives player a new card. 
	// Calculates score and checks for busting.		
	$("#hit").on('click', function() {
		playerCards.push(myDeck.nextCard());
		displayNewCard();
		score();
		if (isBust()) {
			dealerTurn = true;
			displayActions();
			score(); //sets dealer's score 
			while (dealerScore < 17) {
				dealerPlay();
				displayNewCard();
				score();
			}
			gameOver();
		}
		
	});

	//---------carry out selected play: STAND
	// stand ends player's turn. 
	$("#stand").on('click', function() {
		dealerTurn = true;
		displayActions();
		score(); //sets dealer's score 
		while (dealerScore < 17) {
			dealerPlay();
			displayNewCard();
			score();
		}

		gameOver();
		displayActions();
	});

	/* 
	 * Displays the legal actions at the current time of game and hides others
	 * When a game isn't in progess, "deal" is only option
	 * During game, player can only play "hit" or "Stand"
	 */
	function displayActions() {
		//Buttons only during player's turn
		if (!dealerTurn) { 
			console.log("player's turn buttons");
			if (!gameInProgress) {  //no game on
				$('#deal').attr("disabled", false);	
				$('#hit').attr("disabled", true);	
				$('#stand').attr("disabled", true);	
			} else {
				$('#deal').attr("disabled", true);	
				$('#hit').attr("disabled", false);	
				$('#stand').attr("disabled", false);	
			}
		} else {
			console.log("dealer's turn buttons");
			$('#hit').attr("disabled", true);	
			$('#stand').attr("disabled", true);	
		}
	}

	/* 
	 * Displays the first 2 dealt cards in BJ
	 */
	function displayDealtHand() {
		//Player cards
		var pHand = $('#player').find('.hand');
		for (var p = 0; p < playerCards.length; p++) {
			pHand.append('<p>' + playerCards[p].toString() + '</p>'); 
			console.log('player has ' + playerCards[p]);
		}
		//Dealer cards. TODO: hide dealer 2nd card during player turn
		var dHand = $('#dealer').find('.hand');
		for (var d = 0; d < dealerCards.length; d++) {
			dHand.append('<p>' + dealerCards[d].toString() + '</p>'); 
			console.log('dealer has ' + dealerCards[d]);
		}
	}

	/* 
	 * Displays new Cards
	 *
	 */
	function displayNewCard() {
		//if player's turn
		if (!dealerTurn) {
			$('#player').find('.hand').append('<p>' + playerCards[playerCards.length-1].toString() + '</p>'); 
			console.log("Player has n cards:" + playerCards.length);
		} else {
		//dealer's turn
		$('#dealer').find('.hand').append('<p>' + dealerCards[dealerCards.length-1].toString() + '</p>'); 
		console.log("Dealer has n cards:" + dealerCards.length);
		}
	}

	/* 
	 * Sets board for new game.
	 *
	 */
	function setBoard() {
		//cards
		myDeck = new Deck();
		console.log(myDeck);
		myDeck.shuffle();
		//players
		playerCards = [];
		dealerCards = [];
		playerScore = 0;
		dealerScore = 0;
		dealerTurn = false; //player goes first!
		//table
		$('#player').find('.hand').empty();
		$('#dealer').find('.hand').empty();
		$('#result').empty();
		//scores
		$('#dealer').find('input:text').val('?');
		$('#player').find('input:text').val('?');
	}

	/* 
	 * Calculates and updates scores on browser screen.
	 *
	 */
	function score() {
		//player
		if (!dealerTurn) {
			var pScore = 0;
			for(var ps = 0; ps < playerCards.length; ps++) {
				pScore += playerCards[ps].getValue();
				console.log("Player Card scoring: " + playerCards[ps].toString());
			}
			playerScore = pScore;
			$('#player').find('input:text').val(pScore);
		} else {
		//dealer
			var dScore = 0;
			for(var ds = 0; ds < dealerCards.length; ds++) {
				dScore += dealerCards[ds].getValue();
				console.log("Dealer Card scoring: " + dealerCards[ds].toString());
			}
			dealerScore = dScore;
			$('#dealer').find('input:text').val(dScore);
		}
	}

	/* 
	 * Checks if player has busted (score over 21)
	 * @return true, if player busted. false, otherwise.
	 */
	function isBust() {
		return (playerScore > 21) ? true : false ; 
	}

	/* 
	 * Dealer's Play
	 */
	function dealerPlay() {
		if (!dealerTurn) 
			return;
		dealerCards.push(myDeck.nextCard());
		console.log("Dealer got new card:" + dealerCards[dealerCards.length-1]);
	}

	/* 
	 * Dealer's Play
	 */
	function dealerPlay() {
		if (!dealerTurn) 
			return;
		dealerCards.push(myDeck.nextCard());
		console.log("Dealer got new card:" + dealerCards[dealerCards.length-1]);
	}

	/* 
	 * Game Over checks for winner
	 * if playerBust, dealer wins automatically
	 * if 
	 */
	function gameOver() {
		var resultDiv = $('#result');

		if (!isBust() && (dealerScore > 21 || playerScore >= dealerScore)){
			resultDiv.append("<h2>CONGRATUATIONS, You\x27ve beat our dealer!</h2>");
		} else {
			resultDiv.append("<h2>Sorry, but our dealer got you.</h2>");
		}
		//Try again option?
		$('#deal').attr("disabled", false);	
	}

});




