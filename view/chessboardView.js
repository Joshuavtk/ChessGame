/*
    The view handels all methods and data that go to the user.
*/

const chessboardView = {};

chessboardView.init = () => {
    const chessboard = document.createElement("div");
    chessboard.id = "chessboard";
    document.body.appendChild(chessboard);

    //Showing horizontal rows
    //let rowName = chessboardModel.getRows();
    let files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']; // Horizontal rows
    let ranks = [1, 2, 3, 4, 5, 6, 7, 8]; // Vertical rows

    for (let i = 0; i < files.length; i++) {
        let file = document.createElement("div");
        file.id = "file_" + files[i];
        file.style.position = "absolute";
        file.style.left = i * 100 + "px";
        file.style.top = "0px";
        file.style.height = "800px";
        file.style.width = "100px";
        document.getElementById("chessboard").appendChild(file);

        for (let z = 0; z < ranks.length; z++) {
            let rank = document.createElement("div");
            rank.id = "rank_" + ranks[z];
            rank.style.position = "absolute";
            rank.style.bottom = z * 100 + "px";
            rank.style.left = "0px";
            rank.style.height = "100px";
            rank.style.width = "100px";
            document.getElementById("file_" + files[i]).appendChild(rank);
        }
    }
};


