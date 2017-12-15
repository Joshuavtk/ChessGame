/* 
    This is the controller. It makes everyone do their jobs.
*/

const chessboardController = {};

chessboardController.init = () => {
    chessboardModel.init('black');
    chessboardView.init();
    chesspieceView.init();

};

addEventListener("load", chessboardController.init);

