import { FourInARow } from "../model/FourInARow.js"
export class FourInARowView {
    //laat de speelboard in
    showboard(player1Name, player2Name) {
        this.FourInARow = new FourInARow();
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
                this.FourInARow.setMove(i, board);
            });
        }
    }
    showMove(y, x, board, currentPlayer) {
        this.FourInARow = new FourInARow();
        //zet de munt in de goede plek
        let id = y * 7 + x;
        board[y][x] = currentPlayer;
        if (currentPlayer === 1) {
            document.getElementById(id).innerHTML = ' <img src="img/geel_rondje_v2.png" alt="geel coin" width="120" height="120">';
        } else {
            document.getElementById(id).innerHTML = ' <img src="img/rood_rondje_v2.png" alt="rood coin" width="120" height="120">';
        }
        if (this.FourInARow.checkForWin(board, currentPlayer)) {
            return this.win(currentPlayer)
        }else if (this.FourInARow.checkForTie(board, currentPlayer)){
            return this.tie();
        }
        if (this.FourInARow.aiActive() && currentPlayer === 1){
            console.log("ai move")

            this.FourInARow.possibleMoves(board)
        }
    }
    win(playerId) {
        alert("Player: " + playerId +" heeft gewonnen!!!");
    }
    tie(){
        alert("TIE!");
    }

    GameOver(){

    }
}