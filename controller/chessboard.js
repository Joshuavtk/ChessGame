/* 
    This is the controller. It makes everyone do their jobs.
*/

const chessboardController = {};

chessboardController.init = () => {
    console.log("Init chessboard");
    chessboardModel.init();
    chessboardView.init();
}

addEventListener("load", chessboardController.init);

