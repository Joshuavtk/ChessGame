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

    // Global Variables
    chessboardModel.selectedPiece = "";
    chessboardModel.selectedPlaceColor = "";
    chessboardModel.selectedPlace = "";

    // Your side
    chessboardModel.player = 'white';
    document.getElementById("gameInfo").innerHTML += "You're playing as " + chessboardModel.player + '<br>';


    class chessPiece {

        constructor() {
            this.num = '';
            this.color = '';
            this.piece = '';
            this.file = '';
            this.rank = '';
        }

        defineColor() {
            if (this.color === 'white') {
                this.appearance = chessboardModel.whitePieces[this.piece];
            } else {
                this.appearance = chessboardModel.blackPieces[this.piece];
            }
        }

        updatePosition(newFile, newRank) {
            // Clear old position
            document.getElementById('file_' + this.file + '-' + 'rank_' + this.rank).innerHTML = "";
            document.getElementById('file_' + this.file + '-' + 'rank_' + this.rank).className = "";

            // Updating position
            this.position = 'file_' + newFile + '-' + 'rank_' + newRank;
            this.place = document.getElementById(this.position);
            document.getElementById(this.position).className = this.color + this.piece + ' ' + this.num;
            this.place.innerHTML = this.appearance;

            // Log the position change
            let logMessage = '<div class="log-message">Moved <b>' + this.color + ' ' + this.piece + '</b> to: <b>' + newFile + newRank + '</b></div>';
            document.getElementById("gameInfo").innerHTML += (logMessage);

            // Scroll log down to bottom
            let sidebar = document.getElementById('sidebar');
            sidebar.scrollTop = sidebar.scrollHeight;

            // Update new position in the class
            this.file = newFile;
            this.rank = newRank;
        }

        highlightPlace() {
            chessboardModel.selectedPlaceColor = document.getElementById(this.position).style.backgroundColor;
            chessboardModel.selectedPlace = this.position;
            document.getElementById(this.position).style.backgroundColor = "rgb(114, 111, 224)";
        }

        resetBackgroundColor() {
            document.getElementById(chessboardModel.selectedPlace).style.backgroundColor = chessboardModel.selectedPlaceColor;
        }

        showPossiblePath() {
            console.log("Piece: " + this.piece + "[" + this.num + "] can be moved to spot: ");
        }

    }

    /*  Creating all the subclasses  */
    class Rook extends chessPiece {
        constructor(num, color, file, rank) {
            super();
            this.num = num;
            this.color = color;
            this.piece = 'Rook';
            this.defineColor();
            this.file = file;
            this.rank = rank;
            this.updatePosition(this.file, this.rank);
        }
    }

    class Knight extends chessPiece {
        constructor(num, color, file, rank) {
            super();
            this.num = num;
            this.color = color;
            this.piece = 'Knight';
            this.defineColor();
            this.file = file;
            this.rank = rank;
            this.updatePosition(this.file, this.rank);
        }
    }

    class Bishop extends chessPiece {
        constructor(num, color, file, rank) {
            super();
            this.num = num;
            this.color = color;
            this.piece = 'Bishop';
            this.defineColor();
            this.file = file;
            this.rank = rank;
            this.updatePosition(this.file, this.rank);
        }
    }

    class Queen extends chessPiece {
        constructor(num, color, file, rank) {
            super();
            this.num = num;
            this.color = color;
            this.piece = 'Queen';
            this.defineColor();
            this.file = file;
            this.rank = rank;
            this.updatePosition(this.file, this.rank);
        }
    }

    class King extends chessPiece {
        constructor(num, color, file, rank) {
            super();
            this.num = num;
            this.color = color;
            this.piece = 'King';
            this.defineColor();
            this.file = file;
            this.rank = rank;
            this.updatePosition(this.file, this.rank);
        }
    }

    class Pawn extends chessPiece {
        constructor(num, color, file, rank) {
            super();
            this.num = num;
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
        chessboardModel.whiteRook = [];
        chessboardModel.whiteRook[0] = new Rook(0, 'white', 'A', 1);
        chessboardModel.whiteRook[1] = new Rook(1, 'white', 'H', 1);
        //Create black Rooks
        chessboardModel.blackRook = [];
        chessboardModel.blackRook[0] = new Rook(0, 'black', 'A', 8);
        chessboardModel.blackRook[1] = new Rook(1, 'black', 'H', 8);

        //Create white Knights
        chessboardModel.whiteKnight = [];
        chessboardModel.whiteKnight[0] = new Knight(0, 'white', 'B', 1);
        chessboardModel.whiteKnight[1] = new Knight(1, 'white', 'G', 1);
        //Create black Knights
        chessboardModel.blackKnight = [];
        chessboardModel.blackKnight[0] = new Knight(0, 'black', 'B', 8);
        chessboardModel.blackKnight[1] = new Knight(1, 'black', 'G', 8);

        //Create white bishops
        chessboardModel.whiteBishop = [];
        chessboardModel.whiteBishop[0] = new Bishop(0, 'white', 'C', 1);
        chessboardModel.whiteBishop[1] = new Bishop(1, 'white', 'F', 1);
        //Create black bishops
        chessboardModel.blackBishop = [];
        chessboardModel.blackBishop[0] = new Bishop(0, 'black', 'C', 8);
        chessboardModel.blackBishop[1] = new Bishop(1, 'black', 'F', 8);

        //Create white queen
        chessboardModel.whiteQueen = [];
        chessboardModel.whiteQueen[0] = new Queen(0, 'white', 'D', 1);
        //Create black queen
        chessboardModel.blackQueen = [];
        chessboardModel.blackQueen[0] = new Queen(0, 'black', 'D', 8);

        //Create white king
        chessboardModel.whiteKing = [];
        chessboardModel.whiteKing[0] = new King(0, 'white', 'E', 1);
        //Create black king
        chessboardModel.blackKing = [];
        chessboardModel.blackKing[0] = new King(0, 'black', 'E', 8);

        //Create white pawns
        chessboardModel.whitePawn = [];
        for (let i = 0; i < 8; i++) {
            chessboardModel.whitePawn[i] = new Pawn(i, 'white', chessboardModel.files[i], 2);
        }
        //Create black pawns
        chessboardModel.blackPawn = [];
        for (let i = 0; i < 8; i++) {
            chessboardModel.blackPawn[i] = new Pawn(i, 'black', chessboardModel.files[i], 7);
        }
    };

    chessboardModel.selectPiece = (pieceClassName, pieceNextPosition) => {

        // Variables used in function
        let pieceName = pieceClassName.split(" "); // piece name, num
        let currentPiece = "";
        if (pieceName[0]) {
            currentPiece = chessboardModel[pieceName[0]][pieceName[1]];
        }

        if (chessboardModel.selectedPiece === "") { // Not yet selected a piece
            if (pieceName[0]) {
                // Check if selected piece color is the same as your own
                if (currentPiece.color === chessboardModel.player) {
                    chessboardModel.selectedPiece = pieceName;
                    currentPiece.highlightPlace();
                    //currentPiece.showPossiblePath();
                } else {
                    console.log('You tried to move the opponent\'s piece.');
                }
            } else {
                console.log('Select a piece first.');
            }
        } else {
            let movingPiece = chessboardModel[chessboardModel.selectedPiece[0]][chessboardModel.selectedPiece[1]];
            if (pieceName[0]) {
                if (currentPiece.color !== chessboardModel.player) {
                    // Moving a piece to a place where a enemy piece was.
                    chessboardModel.movePiece(pieceNextPosition, movingPiece);
                    console.log("You've slain an enemy piece.");
                    movingPiece.resetBackgroundColor();
                } else {
                    // Moving to a place where a piece of your own color is.
                    movingPiece.resetBackgroundColor();
                    chessboardModel.selectedPiece = "";
                    console.log('That spot is already occupied by one of your own pieces.');
                }
            } else {
                // Moving a piece to an empty location.
                chessboardModel.movePiece(pieceNextPosition, movingPiece);
                movingPiece.resetBackgroundColor();
            }
        }
    };

    chessboardModel.movePiece = (pieceNextPosition, movingPiece) => {
        pieceNextPosition = pieceNextPosition.split("-");
        pieceNextPosition[0] = pieceNextPosition[0].replace('file_', '');
        pieceNextPosition[1] = pieceNextPosition[1].replace('rank_', '');
        movingPiece.updatePosition(pieceNextPosition[0], pieceNextPosition[1]);
        //console.log('Initiated movePiece() with ' + chessboardModel[chessboardModel.selectedPiece[0]][chessboardModel.selectedPiece[1]]);
        chessboardModel.selectedPiece = "";
    }
};