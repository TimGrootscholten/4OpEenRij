import { VierOpEenRijView } from "../view/VierOpEenRijView.js"
export class VierOpEenRij extends EventTarget {
    constructor() {
        super();
        this.vierOpEenRijView = new VierOpEenRijView();
        document.getElementById("startButton").addEventListener('click', () => {
            this.start();
            this.player = true;
        });
    }


    start() {
        //haalt de player name op
        let player1Name = document.getElementById('player1').value;
        let player2Name = document.getElementById('player2').value;
        if (player1Name === "") {
            player1Name = "Player 1"
        }
        if (player2Name === "") {
            player2Name = "Player 2"
        }
        document.getElementById("start").style.display = 'none';
        this.vierOpEenRijView.showboard(player1Name, player2Name);
    }
    move(id, board) {
        //kijkt waar de move is
        let y;
        let x;
        if (id <= 6) {
            y = 0;
            x = id;
        } else if (id <= 13) {
            y = 1;
            x = id - 7;
        } else if (id <= 20) {
            y = 2;
            x = id - 14;
        } else if (id <= 27) {
            y = 3;
            x = id - 21;
        } else if (id <= 34) {
            y = 4;
            x = id - 28;
        } else if (id <= 41) {
            y = 5;
            x = id - 35;
        }
        //kijkt waar in de rij de munt gezet moet worden
        if (board[0][x] == 0) {
            let yy = 0;
            let emty = true;
            while (emty) {
                yy++;
                if (yy === 5 && board[yy][x] == 0) {
                    emty = false;
                }
                if (!board[yy][x] == 0) {
                    yy--;
                    emty = false;
                }

            }
            y = yy;
            this.playercontrol(y, x, board);
        }
    }
    playercontrol(y, x, board) {
        const player1 = 1;
        const player2 = 2;
        let playerId;
       //geeft de player omstebeurt 
        if (this.player == true) {
            playerId = player2;
            this.player = false;
        } else {
            playerId = player1;
            this.player = true;
        }
        this.vierOpEenRijView.setMove(y, x, playerId, board);



    }
    checkForWin() {

    }
}