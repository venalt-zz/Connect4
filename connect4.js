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

		for (var i = 0; i < 7; i++){
			var button = document.createElement("button");
			var label = document.createTextNode(i);
			button.appendChild(label);
			button.addEventListener("click",function(e){
	   			Connect4Board.addPiece(i, 1);
			},false);
		}

		Connect4Board.update();
	}, 
	addPiece : function (column, player) {
		currentHeight = Connect4Board.board[column][6]; //7th value is a count
		Connect4Board.board[column][5 - currentHeight] = player;

		Connect4Board.board[column][6]++;
		if (Connect4Board.checkWin(player)) alert("YOU WON!!");
		Connect4Board.update();
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
	checkWin : function (player) {
		return false;
	}
}

Connect4Board.init();