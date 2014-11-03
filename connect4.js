var Connect4Board = {
	boardColor : "#33CCCC",
	pieceColors : ["#FFF", "#C72E00", "#FFEE00"],
	board : [[],[],[],[],[],[],[]],
	numPieces : [],
	winState : 0,
	context : {},
	currentPlayer : 1,
	init : function() {
		this.canvas = document.getElementById("gameBoard");
		this.context = this.canvas.getContext("2d");
		this.currentPlayer = 1;
		this.winState = 0;

		for (var i = 0; i < 7; i++){
			for (var j = 0; j < 7; j++){
				this.board[i][j] = 0;
			}
			this.numPieces[i] = 0;
		}

		document.getElementById("resetButton").addEventListener("click", this.init.bind(this),false);

		this.update();
	}, 
	addPiece : function (column, player) {
		currentHeight = this.numPieces[column];
		if (currentHeight == 6 || this.winState) return;
		this.board[column][5 - currentHeight] = player;

		this.numPieces[column]++;
		if (this.checkWin(player, column, 5 - currentHeight)){
			this.update();
			alert("Congratulations, you've won!");
			this.winState = 1;
		}
		else {
			this.currentPlayer = (1 + (this.currentPlayer == 1));
			this.update();
		}
	}, 
	update : function (){
		this.clear();
		document.getElementById("buttons").innerHTML = "";

		this.drawButtons();
		this.drawPieces();
	},
	drawButtons : function(){
		var buttons = document.getElementById("buttons");

		for (var i = 0; i < 7; i++){
			var button = document.createElement("div");
			button.className = "connect4-btn";

			var circle = document.createElement("div");
			circle.className = "connect4-circle";
			circle.style.backgroundColor = this.pieceColors[this.currentPlayer];

			button.appendChild(circle);

			button.addEventListener("click",(function(i){ 
				return function(e){
	   				Connect4Board.addPiece(i, Connect4Board.currentPlayer);
	   			}
			})(i),false);
			buttons.appendChild(button);
		}
	},
	drawPieces : function(){
		this.context.fillStyle = this.boardColor;
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

		var pieceDimension = this.canvas.width / 7; 

		for (var i = 0; i < 7; i++){
			for (var j = 0; j < 6; j++){
				pieceColor = this.pieceColors[this.board[i][j]];
				this.context.fillStyle = pieceColor;

				this.context.beginPath();
				this.context.arc((i*pieceDimension)+pieceDimension/2, (j*pieceDimension)+pieceDimension/2, pieceDimension/3, 0, 2 * Math.PI, false);
				this.context.fill();
			}
		}
	},
	clear : function(){
		this.context.clearRect(0, 0, 700, 700);
	}, 
	checkWin : function (player, column, row) {
		if (this.inAColumn(player, column, row)){
			return true;
		}
		else if (this.numPieces[3] > 0){ // Middle Column needs to have some pieces
			if (this.inARow(player, row)){
				return true;
			}
			else if (this.isDiagonal(player, column, row)) return true;
		}
		
		return false;
	}, 
	inAColumn : function (player, column, row){
		if (this.numPieces[column] >= 4){ // Check if the column has at least 4 pieces
			var count = 0;

			while (this.board[column][row] == player){
				row++;
				count++;
			}

			return (count == 4);
		}
		return false;
	},
	inARow : function (player, row){
		var count = 0, column = 0;

		while (column <= 6){
			if (this.board[column][row] == player){
				count++;
				if (count == 4) return true;
			}
			else {
				count = 0; // Reset count
			}

			column++;
		}

		return false;
	}, 
	isDiagonal : function (player, column, row){
		if ((row + Math.abs(column - 3) < 6) && this.board[3][row + Math.abs(column - 3)] == player){ // Diagonal lower in middle column
			if (column < 3){
				while ((column > 0 && row > 0) && this.board[column - 1][row - 1] == player){
					column--;
					row--;
				}

				var count = 0;
				while (this.board[column][row] == player && (row < 6)){
					count++;
					column++;
					row++;
				}
			}
			else{
				while ((column < 7 && row > 0) && this.board[column + 1][row - 1] == player){
					column++;
					row--;
				}

				var count = 0;
				while (this.board[column][row] == player && (row < 6)){
					count++;
					column--;
					row++;
				}
			}
		}
		else if (this.board[3][row - Math.abs(column - 3)] == player){ // Diagonal higher in middle column
			if (column < 3){
				while ((column > 0 && row < 6) && this.board[column - 1][row + 1] == player){
					column--;
					row++;
				}

				var count = 0;
				while (this.board[column][row] == player){
					count++;
					column++;
					row--;
				}
			}
			else{
				while ((column < 7 && row < 6) && this.board[column + 1][row + 1] == player){
					column++;
					row++;
				}

				var count = 0;
				while ((column > 0 && row > 0) && this.board[col][row] == player){
					count++;
					column--;
					row--;
				}
			}
		}

		return count == 4;
	},
	print : function (){
		for (var i = 0; i < 7; i++){
			console.log(this.board[i]);
		}
	}
}

Connect4Board.init();