var Connect4Board = {
	boardColor : #33CCCC,
	init : function() {
		var canvas = document.getElementById("gameBoard");
		var context = c.getContext("2d");

		context.fillStyle(boardColor);
	}, 
	addPiece : function (column, player) {

		checkWin(player);
	}, 
	checkWin : function (player) {

	}
}

Connect4Board.init();