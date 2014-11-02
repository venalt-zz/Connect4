var Connect4Board = {
	boardColor : "#33CCCC",
	pieceColors : ["#FFF", "#FF6600", "#FF9933"],
	board : [[],[],[],[],[],[],[]],
	context : {},
	init : function() {
		Connect4Board.canvas = document.getElementById("gameBoard");
		Connect4Board.context = Connect4Board.canvas.getContext("2d");

		for (var i = 0; i < 7; i++){
			for (var j = 0; j < 7; j++){
				Connect4Board.board[i][j] = 0;
			}
		}

		var buttons = document.getElementById("buttons");
		for (var i = 0; i < 7; i++){
			var button = document.createElement("button");
			var label = document.createTextNode(i);
			button.appendChild(label);

			button.addEventListener("click",(function(i){ 
				return function(e){
	   				Connect4Board.addPiece(i, 1);
	   			}
			})(i),false);
			buttons.appendChild(button);
		}

		for (var i = 0; i < 7; i++){
			var button = document.createElement("button");
			var label = document.createTextNode(i);
			button.appendChild(label);

			button.addEventListener("click",(function(i){ 
				return function(e){
	   				Connect4Board.addPiece(i, 2);
	   			}
			})(i),false);
			buttons.appendChild(button);
		}

		Connect4Board.update();
	}, 
	addPiece : function (column, player) {
		currentHeight = Connect4Board.board[column][6]; //7th value is a count
		Connect4Board.board[column][5 - currentHeight] = player;

		Connect4Board.board[column][6]++;
		Connect4Board.update();
		if (Connect4Board.checkWin(player, column, 5 - currentHeight)) alert("YOU WON!!");
	}, 
	update : function (){
		Connect4Board.clear();
		
		Connect4Board.context.fillStyle = Connect4Board.boardColor;
		Connect4Board.context.fillRect(0, 0, Connect4Board.canvas.width, Connect4Board.canvas.height);

		var pieceDimension = Connect4Board.canvas.width / 7; 

		for (var i = 0; i < 7; i++){
			for (var j = 0; j < 6; j++){
				pieceColor = Connect4Board.pieceColors[Connect4Board.board[i][j]];
				Connect4Board.context.fillStyle = pieceColor;

				Connect4Board.context.beginPath();
				Connect4Board.context.arc((i*pieceDimension)+pieceDimension/2, (j*pieceDimension)+pieceDimension/2, pieceDimension/3, 0, 2 * Math.PI, false);
				Connect4Board.context.fill();
			}
		}
	},
	clear : function(){
		Connect4Board.context.clearRect(0, 0, 700, 700);
	}, 
	checkWin : function (player, column, row) {
		if (Connect4Board.inAColumn(player, column, row)){
			return true;
		}
		else if (Connect4Board.board[3][6] > 0){ // Middle Column needs to have some pieces
			if (Connect4Board.inARow(player, row)){
				return true;
			}
			else if (Connect4Board.isDiagonal(player, column, row)) return true;
		}
		
		return false;
	}, 
	inAColumn : function (player, column, row){
		if (Connect4Board.board[column][6] >= 4){ // Check if the column has at least 4 pieces
			var count = 0;

			while (Connect4Board.board[column][row] == player){
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
			if (Connect4Board.board[column][row] == player){
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
		if ((row + Math.abs(column - 3) < 6) && Connect4Board.board[3][row + Math.abs(column - 3)] == player){ // Diagonal lower in middle column
			if (column < 3){
				while ((column > 0 && row > 0) && Connect4Board.board[column - 1][row - 1] == player){
					column--;
					row--;
				}

				var count = 0;
				while (Connect4Board.board[column][row] == player){
					count++;
					column++;
					row++;
				}
			}
			else{
				while ((column < 6 && row > 0) && Connect4Board.board[column + 1][row - 1] == player){
					column++;
					row--;
				}

				var count = 0;
				while (Connect4Board.board[column][row] == player){
					count++;
					column--;
					row++;
				}
			}
		}
		else if (Connect4Board.board[3][row - Math.abs(column - 3)] == player){ // Diagonal higher in middle column
			if (column < 3){
				while ((column > 0 && row < 5) && Connect4Board.board[column - 1][row + 1] == player){
					column--;
					row++;
				}

				var count = 0;
				while (Connect4Board.board[column][row] == player){
					count++;
					column++;
					row--;
				}
			}
			else{
				while ((column < 6 && row < 5) && Connect4Board.board[column + 1][row + 1] == player){
					column++;
					row++;
				}

				var count = 0;
				while ((column > 0 && row > 0) && Connect4Board.board[col][row] == player){
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
			console.log(Connect4Board.board[i]);
		}
	}
}

Connect4Board.init();