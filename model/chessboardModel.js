/*
    The model handels all data and changes to data.
*/

const chessboardModel = {};

chessboardModel.init = () => {
  chessboardModel.files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // Horizontal rows
  chessboardModel.ranks = [1, 2, 3, 4, 5, 6, 7, 8]; // Vertical rows

  chessboardModel.blackPieces = {
    'Rook': '♜',
    'Knight': '♞',
    'Bishop': '♝',
    'Queen': '♛',
    'King': '♚',
    'Pawn': '♟'
  };
  chessboardModel.whitePieces = {
    'Rook': '♖',
    'Knight': '♘',
    'Bishop': '♗',
    'Queen': '♕',
    'King': '♔',
    'Pawn': '♙'
  };

  class chessPiece {
    constructor(brand) {
      this.color = '';
      this.piece = '';
      this.file = '';
      this.rank = '';
    }
    defineColor() {
      if (this.color == 'white') {
        this.appearance = chessboardModel.whitePieces[this.piece];
      } else {
        this.appearance = chessboardModel.blackPieces[this.piece];
      }
    }
    currentPosition() {
      console.log('The position of ' + this.color + ' ' + this.piece +
        ' is file ' + this.file + ' and rank ' + this.rank)
    }
    updatePosition(file, rank) {
      document.getElementById('file_' + this.file + '-' + 'rank_' + this.rank).innerHTML = "";
      this.file = file;
      this.rank = rank;
      this.position = 'file_' + this.file + '-' + 'rank_' + this.rank;
      document.getElementById("gameInfo").innerHTML += ('Moved ' + this.color + ' ' + this.piece + ' to spot: ' + this.position + '<br>');
      this.place = document.getElementById(this.position);
      this.place.innerHTML = this.appearance;
    }
  }

  class Rook extends chessPiece {
    constructor(color, file, rank) {
      super();
      this.color = color;
      this.piece = 'Rook';
      this.defineColor();
      this.file = file;
      this.rank = rank;
      this.updatePosition(this.file, this.rank);
    }
  }

  class Knight extends chessPiece {
    constructor(color, file, rank) {
      super();
      this.color = color;
      this.piece = 'Knight';
      this.defineColor();
      this.file = file;
      this.rank = rank;
      this.updatePosition(this.file, this.rank);
    }
  }

  class Bishop extends chessPiece {
    constructor(color, file, rank) {
      super();
      this.color = color;
      this.piece = 'Bishop';
      this.defineColor();
      this.file = file;
      this.rank = rank;
      this.updatePosition(this.file, this.rank);
    }
  }

  class Queen extends chessPiece {
    constructor(color, file, rank) {
      super();
      this.color = color;
      this.piece = 'Queen';
      this.defineColor();
      this.file = file;
      this.rank = rank;
      this.updatePosition(this.file, this.rank);
    }
  }

  class King extends chessPiece {
    constructor(color, file, rank) {
      super();
      this.color = color;
      this.piece = 'King';
      this.defineColor();
      this.file = file;
      this.rank = rank;
      this.updatePosition(this.file, this.rank);
    }
  }

  class Pawn extends chessPiece {
    constructor(color, file, rank) {
      super();
      this.color = color;
      this.piece = 'Pawn';
      this.defineColor();
      this.file = file;
      this.rank = rank;
      this.updatePosition(this.file, this.rank);
    }
  }

  chessboardModel.initBoard = () => {

    //Create white Rooks
    chessboardModel.whiteRooks = [];
    chessboardModel.whiteRooks[0] = new Rook('white', 'A', 1);
    chessboardModel.whiteRooks[1] = new Rook('white', 'H', 1);
    //Create black Rooks
    chessboardModel.blackRooks = [];
    chessboardModel.blackRooks[0] = new Rook('black', 'A', 8);
    chessboardModel.blackRooks[1] = new Rook('black', 'H', 8);

    //Create white Knights
    chessboardModel.whiteKnights = [];
    chessboardModel.whiteKnights[0] = new Knight('white', 'B', 1);
    chessboardModel.whiteKnights[1] = new Knight('white', 'G', 1);
    //Create black Knights
    chessboardModel.blackKnights = [];
    chessboardModel.blackKnights[0] = new Knight('black', 'B', 8);
    chessboardModel.blackKnights[1] = new Knight('black', 'G', 8);

    //Create white bishops
    chessboardModel.whiteBishops = [];
    chessboardModel.whiteBishops[0] = new Bishop('white', 'C', 1);
    chessboardModel.whiteBishops[1] = new Bishop('white', 'F', 1);
    //Create black bishops
    chessboardModel.blackBishops = [];
    chessboardModel.blackBishops[0] = new Bishop('black', 'C', 8);
    chessboardModel.blackBishops[1] = new Bishop('black', 'F', 8);

    //Create white queen
    chessboardModel.whiteQueen = new Queen('white', 'D', 1);
    //Create black queen
    chessboardModel.blackQueen = new Queen('black', 'D', 8);

    //Create white king
    chessboardModel.whiteKing = new King('white', 'E', 1);
    //Create black king
    chessboardModel.blackKing = new King('black', 'E', 8);

    //Create white pawns
    chessboardModel.whitePawns = [];
    for (let i = 0; i < 8; i++) {
      chessboardModel.whitePawns[i] = new Pawn('white', chessboardModel.files[i], 2);
    }
    //Create black pawns
    chessboardModel.blackPawns = [];
    for (let i = 0; i < 8; i++) {
      chessboardModel.blackPawns[i] = new Pawn('black', chessboardModel.files[i], 7);
    }
  }

  chessboardModel.movePiece = (pieceName) => {
    let piece = chessboardModel.whiteBishops[1];
    piece.updatePosition('F', 5);
    piece.currentPosition();

  }
};
