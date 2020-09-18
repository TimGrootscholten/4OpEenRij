import { VierOpEenRij } from "../model/VierOpEenRij.js"
export class VierOpEenRijView {
    //laat de speelboard in
    showboard(player1Name, player2Name) {
        this.vierOpEenRij = new VierOpEenRij();

        //zet de playername neer
        document.querySelector("player1").insertAdjacentHTML('beforeend', player1Name);
        document.querySelector("player2").insertAdjacentHTML('beforeend', player2Name);
        document.getElementById("grid-container").style.visibility = 'visible';

        let board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ];

        //zet de board neer 
        for (let i = 0; i < 42; i++) {
            document.querySelector("board").insertAdjacentHTML('beforeend', `<div id='${i}' class='board-item'></div>`);
            //kijkt voor een klik
            let box = document.getElementById(i);
            box.addEventListener('click', () => {
                return this.vierOpEenRij.move(i, board);
            });
        }
    }

    setMove(y, x, playerId, board) {
        this.vierOpEenRij = new VierOpEenRij();
        let id = y * 7 + x;
        board[y][x] = playerId;
        if (playerId === 1) {
            document.getElementById(id).innerHTML = ' <img src="img/geel_rondje_v2.png" alt="geele coin" width="120" height="120">';
        } else {
            document.getElementById(id).innerHTML = ' <img src="img/rood_rondje_v2.png" alt="geele coin" width="120" height="120">';
        }
        return this.vierOpEenRij.checkForWin(board, playerId);
    }

    win(playerId) {
        
        alert("Player: "+ playerId + " heeft gewonnen!!!");
    }

}
