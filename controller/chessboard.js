/* 
    This is the controller. It makes everyone do their jobs.
*/

const chessboardController = {};

chessboardController.init = () => {
    document.getElementById('wrapper').innerHTML = "";
    document.getElementById('gameInfo').innerHTML = "";
    chessboardModel.init('white');
    chessboardView.init();
    chesspieceView.init();
};

addEventListener("load", chessboardController.init);