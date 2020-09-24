import { FourInARowView } from "../view/FourInARowView.js"
export class FourInARow {
    constructor() {
        this.FourInARowView = new FourInARowView();
        document.getElementById("startButton").addEventListener('click', () => {this.start();});
        this.player;
        this.ai = false;
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
        this.FourInARowView.showboard(player1Name, player2Name);
    }
    setMove(id, board) {
        //kijkt waar de move is
        let x;
        if (id <= 6) {
            x = id;
        } else if (id <= 13) {
            x = id - 7;
        } else if (id <= 20) {
            x = id - 14;
        } else if (id <= 27) {
            x = id - 21;
        } else if (id <= 34) {
            x = id - 28;
        } else if (id <= 41) {
            x = id - 35;
        }
        //kijkt waar in de rij de munt gezet moet worden
        let y = 0;
        if (board[0][x] === 0) {
            let emty = true;
            while (emty) {
                y++;
                if (y === 5 && board[y][x] === 0) {
                    emty = false;
                }
                if (!board[y][x] == 0) {
                    y--;
                    emty = false;
                }
            }
            this.player = this.switchPlayer(this.player);
            console.log(this.player);
            this.FourInARowView.showMove(y, x, board, this.player);
        }
    }

    switchPlayer(player) {
        // 1 player1, 2 player2
        console.log(player);
        if (player === 1) {
            return 2;
        } else {
            return 1;
        }
    }

    aiActive(){
        let player2Name = document.getElementById('player2').value;
        return player2Name === "ai";
    }

    possibleMoves(board){
        // for (let x = 0; x <= 6; x++) {
        //
        // }
        let id =Math.floor(Math.random() * 41);
        this.setMove(id, board)
    }


    minimax(board){
        this.possibleMoves(board);

    }
    checkForWin(board, playerId) {
        //  0  1  2  3  4  5  6
        // [ ][ ][ ][ ][ ][ ][ ] 0
        // [ ][ ][ ][ ][ ][ ][ ] 1
        // [ ][ ][ ][ ][ ][ ][ ] 2
        // [ ][ ][ ][ ][ ][ ][ ] 3
        // [x][x][x][x][ ][ ][ ] 4
        // [ ][ ][ ][ ][ ][ ][ ] 5
        //horzontaal
        let inrow = 0;
        for (let y = 0; y <= 5; y++) {
            inrow = 0;
            for (let x = 0; x <= 6; x++) {
                if (board[y][x] === playerId) {
                    inrow++;
                } else {
                    inrow = 0;
                }
                if (inrow === 4) {
                    return true;
                }
            }
        }
        //verticaal
        //  0  1  2  3  4  5  6
        // [ ][ ][ ][ ][ ][ ][ ] 0
        // [ ][ ][ ][ ][ ][ ][ ] 1
        // [ ][ ][ ][x][ ][ ][ ] 2
        // [ ][ ][ ][x][ ][ ][ ] 3
        // [ ][ ][ ][x][ ][ ][ ] 4
        // [ ][ ][ ][x][ ][ ][ ] 5
        for (let x = 0; x <= 6; x++) {
            inrow = 0;
            for (let y = 0; y <= 5; y++) {
                if (board[y][x] === playerId) {
                    inrow++;
                } else {
                    inrow = 0;
                }
                if (inrow === 4) {
                    return true;
                }
            }
        }
        //digonaal
        //links naar rechts
        //  0  1  2  3  4  5  6
        // [x][ ][ ][ ][ ][ ][ ] 0
        // [ ][x][ ][ ][ ][ ][ ] 1
        // [ ][ ][x][ ][ ][ ][ ] 2
        // [ ][ ][ ][x][ ][ ][ ] 3
        // [ ][ ][ ][ ][ ][ ][ ] 4
        // [ ][ ][ ][ ][ ][ ][ ] 5
        for (let xx = 0; xx <= 3; xx++) {
            let x = xx;
            inrow =0;
            for (let y = 0; y <= 5 && x <= 6; y++) {
                if (board[y][x] === playerId) {
                    inrow++;
                } else {
                    inrow = 0;
                }
                if (inrow === 4) {
                    return true;
                }
                x++;
            }
        }
        for (let yy = 1; yy <= 2; yy++) {
            let x = 0;
            inrow =0;
            for (let y =  yy; y <= 5 && x <= 6; y++) {
                if (board[y][x] === playerId) {
                    inrow++;
                } else {
                    inrow = 0;
                }
                if (inrow === 4) {
                    return true;
                }
                x++;
            }
        }
        //rechts naar links
        //  0  1  2  3  4  5  6
        // [ ][ ][ ][ ][ ][ ][x] 0
        // [ ][ ][ ][ ][ ][x][ ] 1
        // [ ][ ][ ][ ][x][ ][ ] 2
        // [ ][ ][ ][x][ ][ ][ ] 3
        // [ ][ ][ ][ ][ ][ ][ ] 4
        // [ ][ ][ ][ ][ ][ ][ ] 5
        for (let xx = 6; xx >= 3; xx--) {
            let x = xx;
            inrow =0;
            for (let y = 0; y <= 5 && x >= 0; y++) {
                if (board[y][x] === playerId) {
                    inrow++;
                } else {
                    inrow = 0;
                }
                if (inrow === 4) {
                    return true;
                }
                x--;

            }
        }
        for (let yy = 1; yy <= 2; yy++) {
            let x = 6;
            inrow =0;
            for (let y = + yy; y <= 5 && x <= 6; y++) {

                if (board[y][x] === playerId) {
                    inrow++;
                } else {
                    inrow = 0;
                }
                if (inrow === 4) {
                    return true;
                }
                x--;
            }
        }
        return false;
    }
    checkForTie(board){
        //tie
        let inrow = 0;
        for (let x = 0; x <= 6; x++) {
            if (!board[0][x] == 0) {
                inrow++
            }
            if (inrow === 7) {
                return true;
            }
        }
        return false;
    }



}