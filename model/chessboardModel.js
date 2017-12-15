/*
    The model handels all data and changes to data.
*/

const chessboardModel = {};

chessboardModel.init = () => {
    chessboardModel.files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // Horizontal rows
    chessboardModel.ranks = [1, 2, 3, 4, 5, 6, 7, 8]; // Vertical rows

    chessboardModel.blackPieces = {
        Rook: '♜',
        Knight: '♞',
        Bishop: '♝',
        Queen: '♛',
        King: '♚',
        Pawn: '♟'
    };
    chessboardModel.whitePieces = {
        Rook: '♖',
        Knight: '♘',
        Bishop: '♗',
        Queen: '♕',
        King: '♔',
        Pawn: '♙'
    };

    // Global Variables
    chessboardModel.selectedPiece = "";
    chessboardModel.selectedPlaceColor = "";
    chessboardModel.selectedPlace = "";
    chessboardModel.possiblePathPlace = [''];
    chessboardModel.possiblePathPlaceId = [''];
    chessboardModel.possiblePathPlaceColor = [''];

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
            // Save current background color
            chessboardModel.selectedPlaceColor = document.getElementById(this.position).style.backgroundColor;

            // Save the position of the spot that has that background color
            chessboardModel.selectedPlace = this.position;

            // Give new background color
            document.getElementById(this.position).style.backgroundColor = "rgb(114, 111, 224)";
        }

        resetBackgroundColor() {
            // Revert background color of piece's position
            document.getElementById(chessboardModel.selectedPlace).style.backgroundColor = chessboardModel.selectedPlaceColor;

            // Revert background color of piece's path
            for (let i = 1; i < chessboardModel.possiblePathPlaceId.length; i++) {
                let backgroundResetElement = document.getElementById(chessboardModel.possiblePathPlaceId[i]);
                backgroundResetElement.style.backgroundColor = chessboardModel.possiblePathPlaceColor[i];
            }
        }

        showPossiblePath() {
            // Determining the file position

            let fileArrayPosition = "";
            for (let i = 0; i < chessboardModel.files.length; i++) {
                if (chessboardModel.files[i] === this.file) {
                    fileArrayPosition = i;
                    break;
                }
            }

            //if (this.color === "white") {

                if (this.moveSet.forward) {
                    for (let i = 1; i <= this.moveSet.forward; i++) {
                        let possibleRank = parseInt(this.rank) + i;
                        if (possibleRank <= 8) {
                            let possiblePositionId = 'file_' + this.file + '-rank_' + possibleRank;
                            let possiblePositionElement = document.getElementById(possiblePositionId);
                            if (possiblePositionElement.className === "") { // Path is empty
                                chessboardModel.possiblePathPlace[chessboardModel.possiblePathPlace.length] = this.file + possibleRank;
                                chessboardModel.showPath(possiblePositionElement, possiblePositionId);
                            } else { // Piece is on path
                                let possiblePositionPiece = possiblePositionElement.className.split(" ");
                                possiblePositionPiece = chessboardModel[possiblePositionPiece[0]][possiblePositionPiece[1]];
                                if (possiblePositionPiece.color !== chessboardModel.player) { // Enemy piece is on path
                                    chessboardModel.possiblePathPlace[chessboardModel.possiblePathPlace.length] = this.file + possibleRank;
                                    chessboardModel.showPath(possiblePositionElement, possiblePositionId, true);
                                    break;
                                } else { // Allied piece on path
                                    break;
                                }
                            }
                        } else {
                            break;
                        }
                    }
                }

                if (this.moveSet.backward) {
                    for (let i = 1; i <= this.moveSet.backward; i++) {
                        let possibleRank = parseInt(this.rank) - i;
                        if (possibleRank >= 1) {
                            let possiblePositionId = 'file_' + this.file + '-rank_' + possibleRank;
                            let possiblePositionElement = document.getElementById(possiblePositionId);
                            if (possiblePositionElement.className === "") { // Path is empty
                                chessboardModel.possiblePathPlace[chessboardModel.possiblePathPlace.length] = this.file + possibleRank;
                                chessboardModel.showPath(possiblePositionElement, possiblePositionId);
                            } else { // Piece is on path
                                let possiblePositionPiece = possiblePositionElement.className.split(" ");
                                possiblePositionPiece = chessboardModel[possiblePositionPiece[0]][possiblePositionPiece[1]];
                                if (possiblePositionPiece.color !== chessboardModel.player) { // Enemy piece is on path
                                    chessboardModel.possiblePathPlace[chessboardModel.possiblePathPlace.length] = this.file + possibleRank;
                                    chessboardModel.showPath(possiblePositionElement, possiblePositionId, true);
                                    break;
                                } else { // Allied piece on path
                                    break;
                                }
                            }
                        } else {
                            break;
                        }
                    }
                }

                if (this.moveSet.left) {
                    for (let i = 1; i <= this.moveSet.left; i++) {
                        let possibleFileNum = fileArrayPosition - i;
                        let possibleFile = chessboardModel.files[possibleFileNum];
                        if (possibleFileNum >= 0) {
                            let possiblePositionId = 'file_' + possibleFile + '-rank_' + this.rank;
                            let possiblePositionElement = document.getElementById(possiblePositionId);
                            if (possiblePositionElement.className === "") { // Path is empty
                                chessboardModel.possiblePathPlace[chessboardModel.possiblePathPlace.length] = possibleFile + this.rank;
                                chessboardModel.showPath(possiblePositionElement, possiblePositionId);
                            } else { // Piece is on path
                                let possiblePositionPiece = possiblePositionElement.className.split(" ");
                                possiblePositionPiece = chessboardModel[possiblePositionPiece[0]][possiblePositionPiece[1]];
                                if (possiblePositionPiece.color !== chessboardModel.player) { // Enemy piece is on path
                                    chessboardModel.possiblePathPlace[chessboardModel.possiblePathPlace.length] = possibleFile + this.rank;
                                    chessboardModel.showPath(possiblePositionElement, possiblePositionId, true);
                                    break;
                                } else { // Allied piece on path
                                    break;
                                }
                            }
                        } else {
                            break;
                        }
                    }
                }

                if (this.moveSet.right) {
                    for (let i = 1; i <= this.moveSet.right; i++) {
                        let possibleFileNum = fileArrayPosition + i;
                        let possibleFile = chessboardModel.files[possibleFileNum];
                        if (possibleFileNum <= 7) {
                            let possiblePositionId = 'file_' + possibleFile + '-rank_' + this.rank;
                            let possiblePositionElement = document.getElementById(possiblePositionId);
                            if (possiblePositionElement.className === "") { // Path is empty
                                chessboardModel.possiblePathPlace[chessboardModel.possiblePathPlace.length] = possibleFile + this.rank;
                                chessboardModel.showPath(possiblePositionElement, possiblePositionId);
                            } else { // Piece is on path
                                let possiblePositionPiece = possiblePositionElement.className.split(" ");
                                possiblePositionPiece = chessboardModel[possiblePositionPiece[0]][possiblePositionPiece[1]];
                                if (possiblePositionPiece.color !== chessboardModel.player) { // Enemy piece is on path
                                    chessboardModel.possiblePathPlace[chessboardModel.possiblePathPlace.length] = possibleFile + this.rank;
                                    chessboardModel.showPath(possiblePositionElement, possiblePositionId, true);
                                    break;
                                } else { // Allied piece on path
                                    break;
                                }
                            }
                        } else {
                            break;
                        }
                    }
                }

                if (this.moveSet.forward_left) {
                    for (let i = 1; i <= this.moveSet.forward_left; i++) {
                        let possibleFileNum = fileArrayPosition - i;
                        let possibleFile = chessboardModel.files[possibleFileNum];
                        let possibleRank = parseInt(this.rank) + i;
                        if (possibleFileNum >= 0 && possibleRank <= 8) {
                            let possiblePositionId = 'file_' + possibleFile + '-rank_' + possibleRank;
                            let possiblePositionElement = document.getElementById(possiblePositionId);
                            if (possiblePositionElement.className === "") { // Path is empty
                                chessboardModel.possiblePathPlace[chessboardModel.possiblePathPlace.length] = possibleFile + possibleRank;
                                chessboardModel.showPath(possiblePositionElement, possiblePositionId);
                            } else { // Piece is on path
                                let possiblePositionPiece = possiblePositionElement.className.split(" ");
                                possiblePositionPiece = chessboardModel[possiblePositionPiece[0]][possiblePositionPiece[1]];
                                if (possiblePositionPiece.color !== chessboardModel.player) { // Enemy piece is on path
                                    chessboardModel.possiblePathPlace[chessboardModel.possiblePathPlace.length] = possibleFile + possibleRank;
                                    chessboardModel.showPath(possiblePositionElement, possiblePositionId, true);
                                    break;
                                } else { // Allied piece on path
                                    break;
                                }
                            }
                        } else {
                            break;
                        }
                    }
                }

                if (this.moveSet.forward_right) {
                    for (let i = 1; i <= this.moveSet.forward_right; i++) {
                        let possibleFileNum = fileArrayPosition + i;
                        let possibleFile = chessboardModel.files[possibleFileNum];
                        let possibleRank = parseInt(this.rank) + i;
                        if (possibleFileNum <= 7 && possibleRank <= 8) {
                            let possiblePositionId = 'file_' + possibleFile + '-rank_' + possibleRank;
                            let possiblePositionElement = document.getElementById(possiblePositionId);
                            if (possiblePositionElement.className === "") { // Path is empty
                                chessboardModel.possiblePathPlace[chessboardModel.possiblePathPlace.length] = possibleFile + possibleRank;
                                chessboardModel.showPath(possiblePositionElement, possiblePositionId);
                            } else { // Piece is on path
                                let possiblePositionPiece = possiblePositionElement.className.split(" ");
                                possiblePositionPiece = chessboardModel[possiblePositionPiece[0]][possiblePositionPiece[1]];
                                if (possiblePositionPiece.color !== chessboardModel.player) { // Enemy piece is on path
                                    chessboardModel.possiblePathPlace[chessboardModel.possiblePathPlace.length] = possibleFile + possibleRank;
                                    chessboardModel.showPath(possiblePositionElement, possiblePositionId, true);
                                    break;
                                } else { // Allied piece on path
                                    break;
                                }
                            }
                        } else {
                            break;
                        }
                    }
                }

                if (this.moveSet.backward_left) {
                    for (let i = 1; i <= this.moveSet.backward_left; i++) {
                        let possibleFileNum = fileArrayPosition - i;
                        let possibleFile = chessboardModel.files[possibleFileNum];
                        let possibleRank = parseInt(this.rank) - i;
                        if (possibleFileNum >= 0 && possibleRank >= 1) {
                            let possiblePositionId = 'file_' + possibleFile + '-rank_' + possibleRank;
                            let possiblePositionElement = document.getElementById(possiblePositionId);
                            if (possiblePositionElement.className === "") { // Path is empty
                                chessboardModel.possiblePathPlace[chessboardModel.possiblePathPlace.length] = possibleFile + possibleRank;
                                chessboardModel.showPath(possiblePositionElement, possiblePositionId);
                            } else { // Piece is on path
                                let possiblePositionPiece = possiblePositionElement.className.split(" ");
                                possiblePositionPiece = chessboardModel[possiblePositionPiece[0]][possiblePositionPiece[1]];
                                if (possiblePositionPiece.color !== chessboardModel.player) { // Enemy piece is on path
                                    chessboardModel.possiblePathPlace[chessboardModel.possiblePathPlace.length] = possibleFile + possibleRank;
                                    chessboardModel.showPath(possiblePositionElement, possiblePositionId, true);
                                    break;
                                } else { // Allied piece on path
                                    break;
                                }
                            }
                        } else {
                            break;
                        }
                    }
                }

                if (this.moveSet.backward_right) {
                    for (let i = 1; i <= this.moveSet.backward_right; i++) {
                        let possibleFileNum = fileArrayPosition + i;
                        let possibleFile = chessboardModel.files[possibleFileNum];
                        let possibleRank = parseInt(this.rank) - i;
                        if (possibleFileNum <= 7 && possibleRank >= 1) {
                            let possiblePositionId = 'file_' + possibleFile + '-rank_' + possibleRank;
                            let possiblePositionElement = document.getElementById(possiblePositionId);
                            if (possiblePositionElement.className === "") { // Path is empty
                                chessboardModel.possiblePathPlace[chessboardModel.possiblePathPlace.length] = possibleFile + possibleRank;
                                chessboardModel.showPath(possiblePositionElement, possiblePositionId);
                            } else { // Piece is on path
                                let possiblePositionPiece = possiblePositionElement.className.split(" ");
                                possiblePositionPiece = chessboardModel[possiblePositionPiece[0]][possiblePositionPiece[1]];
                                if (possiblePositionPiece.color !== chessboardModel.player) { // Enemy piece is on path
                                    chessboardModel.possiblePathPlace[chessboardModel.possiblePathPlace.length] = possibleFile + possibleRank;
                                    chessboardModel.showPath(possiblePositionElement, possiblePositionId, true);
                                    break;
                                } else { // Allied piece on path
                                    break;
                                }
                            }
                        } else {
                            break;
                        }
                    }
                }

                if (this.moveSet.knightMove) {
                    const checkIfPossible = (possibleFileNum, possibleRank) => {
                        if (possibleFileNum <= 7 && possibleFileNum >= 0 && possibleRank >= 1 && possibleRank <= 8) {
                            let possibleFile = chessboardModel.files[possibleFileNum];
                            let possiblePositionId = 'file_' + possibleFile + '-rank_' + possibleRank;
                            let possiblePositionElement = document.getElementById(possiblePositionId);
                            if (possiblePositionElement.className === "") { // Path is empty
                                chessboardModel.possiblePathPlace[chessboardModel.possiblePathPlace.length] = possibleFile + possibleRank;
                                chessboardModel.showPath(possiblePositionElement, possiblePositionId);
                            } else { // Piece is on path
                                let possiblePositionPiece = possiblePositionElement.className.split(" ");
                                possiblePositionPiece = chessboardModel[possiblePositionPiece[0]][possiblePositionPiece[1]];
                                if (possiblePositionPiece.color !== chessboardModel.player) { // Enemy piece is on path
                                    chessboardModel.possiblePathPlace[chessboardModel.possiblePathPlace.length] = possibleFile + possibleRank;
                                    chessboardModel.showPath(possiblePositionElement, possiblePositionId, true);
                                }
                            }
                        }
                    }
                    // right + 1, up + 2
                    checkIfPossible(fileArrayPosition + 1, this.rank + 2);
                    // right + 2, up + 1
                    checkIfPossible(fileArrayPosition + 2, this.rank + 1);
                    // right + 1, down + 2
                    checkIfPossible(fileArrayPosition + 1, this.rank - 2);
                    // right + 2, down + 1
                    checkIfPossible(fileArrayPosition + 2, this.rank - 1);
                    // left + 1, up + 2
                    checkIfPossible(fileArrayPosition - 1, this.rank + 2);
                    // left + 2, up + 1
                    checkIfPossible(fileArrayPosition - 2, this.rank + 1);
                    // left + 1, down + 2
                    checkIfPossible(fileArrayPosition - 1, this.rank - 2);
                    // left + 2, down + 1
                    checkIfPossible(fileArrayPosition - 2, this.rank - 1); 
                }

            //} else {
               // console.log('Code not yet implemented');

           // }
        } // end ShowPossiblePath()

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
            this.moveSet = {
                forward: 8,
                right: 8,
                backward: 8,
                left: 8,
            }
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
            this.moveSet = {
                knightMove: 1
            }
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
            this.moveSet = {
                forward_right: 8,
                forward_left: 8,
                backward_right: 8,
                backward_left: 8
            }
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
            this.moveSet = {
                forward: 8,
                right: 8,
                backward: 8,
                left: 8,
                forward_right: 8,
                forward_left: 8,
                backward_right: 8,
                backward_left: 8
            }
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
            this.moveSet = {
                forward: 1,
                right: 1,
                backward: 1,
                left: 1,
                forward_right: 1,
                forward_left: 1,
                backward_right: 1,
                backward_left: 1
            }
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
            this.moveSet = {
                forward: 2
            }
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
                    currentPiece.showPossiblePath();
                } else {
                    console.log('You tried to move the opponent\'s piece.');
                }
            } else {
                console.log('Select a piece first.');
            }
        } else { // Already selected a piece
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
        pieceNextPosition[1] = parseInt(pieceNextPosition[1].replace('rank_', ''));

        let possiblePos = chessboardModel.possiblePathPlace;
        for (let i = 1; i < possiblePos.length; i++) {
            if (pieceNextPosition[0] + pieceNextPosition[1] === possiblePos[i]) {
                movingPiece.updatePosition(pieceNextPosition[0], pieceNextPosition[1]);
                if (movingPiece.piece === 'Pawn' && movingPiece.moveSet.forward === 2) {
                    movingPiece.moveSet.forward = 1;
                }
                break;
            }
        }
        chessboardModel.possiblePathPlace = [''];
        chessboardModel.selectedPiece = "";

    };

    chessboardModel.showPath = (possiblePositionElement, possiblePositionId, enemyPieceOnPath) => {
        // Save variables for reverting the color back
        let length = chessboardModel.possiblePathPlaceColor.length;
        chessboardModel.possiblePathPlaceColor[length] = possiblePositionElement.style.backgroundColor;
        chessboardModel.possiblePathPlaceId[chessboardModel.possiblePathPlaceId.length] = possiblePositionId;

        // Set highlighting color
        let color = (chessboardModel.possiblePathPlaceColor[length] === "rgb(7, 162, 7)") ? "rgb(244, 113, 90)" : "rgb(240, 139, 122)";
        if (enemyPieceOnPath) {
            color = "rgb(255, 52, 16)";
        }
        possiblePositionElement.style.backgroundColor = color;
    };
};