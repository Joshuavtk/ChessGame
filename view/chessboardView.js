/*
    The view displays all methods and data.
*/
const chessboardView = {};

chessboardView.init = () => {
    const chessboard = document.createElement("div");
    let wrapper = document.getElementById("wrapper");
    chessboard.id = "chessboard";
    wrapper.appendChild(chessboard);

    //Showing horizontal rows
    //let rowName = chessboardModel.getRows();
    let files = chessboardModel.files; // Horizontal rows
    let ranks = chessboardModel.ranks; // Vertical rows

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
            rank.id = file.id + "-rank_" + ranks[z];
            rank.style.position = "absolute";
            rank.style.bottom = z * 100 + "px";
            rank.style.left = "0px";
            rank.style.height = "100px";
            rank.style.width = "100px";
            if (z % 2 === 0 && i % 2 === 0 || z % 2 === 1 && i % 2 === 1) {
                rank.style.backgroundColor = "#07a207";
            } else {
                rank.style.backgroundColor = "#efef7f";
            }
            rank.onclick = () => {
                chessboardModel.selectPiece(rank.className, rank.id)
            };
            document.getElementById("file_" + files[i]).appendChild(rank);
        }

        let fileLabel = document.createElement("div");
        fileLabel.className = "fileLabel";
        fileLabel.style.position = "absolute";
        fileLabel.style.left = i * 100 + "px";
        fileLabel.style.width = "100px";
        fileLabel.style.top = "800px";
        fileLabel.innerHTML = files[i];
        document.getElementById("chessboard").appendChild(fileLabel);

        let rankLabel = document.createElement("div");
        rankLabel.className = "rankLabel";
        rankLabel.style.position = "absolute";
        rankLabel.style.top = i * 100 + "px";
        rankLabel.style.width = "100px";
        rankLabel.style.left = "800px";
        rankLabel.innerHTML = 8 - i;
        document.getElementById("chessboard").appendChild(rankLabel);
    }
};