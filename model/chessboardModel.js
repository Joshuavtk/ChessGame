/*
    The model handels all data and changes to data.
*/

const chessboardModel = {};

chessboardModel.init = () => {
  chessboardModel.files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // Horizontal rows
  chessboardModel.ranks = [1, 2, 3, 4, 5, 6, 7, 8]; // Vertical rows

/*chessboardModel.blackPieces = ['♜', '♞', '♝', '♛', '♚', '♟'];
  chessboardModel.whitePieces = ['♖', '♘', '♗', '♕', '♔', '♙']; */

};
