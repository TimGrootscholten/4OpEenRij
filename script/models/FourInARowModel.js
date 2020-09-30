import {
    FourInARowController
} from "../controls/FourInARowController.js";
export class FourInARowModel {

    constructor() {

        this.board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ];
        this.player = 2;
    }
    acceptClick(id) {
        //maakt dan de id een x waarder
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
        let y = 0;
        //kijkt waar in de y de move is
        if (this.board[0][x] === 0) {
            let emty = true;
            while (emty) {
                y++;
                if (y === 5 && this.board[y][x] === 0) {
                    emty = false;
                }
                if (!this.board[y][x] == 0) {
                    y--;
                    emty = false;
                }
            }
            this.player = this.switchPlayer(this.player);
            this.board[y][x] = this.player;
            id = y * 7 + x;
            return [this.player, id]
        }

    }

    switchPlayer(player) {
        if (player === 1) {
            return 2;
        } else {
            return 1;
        }
    }

    rematchModel(WinningInfo){
        for (let i = 0; i < 42; i++) {
            document.getElementById(i).remove();
        }
        let scorePlayer1 = parseInt(document.querySelector("#player1Score").innerHTML);
        let scorePlayer2 = parseInt(document.querySelector("#player2Score").innerHTML);
        console.log(scorePlayer1, scorePlayer2, WinningInfo);
        if(WinningInfo === 1){
            document.querySelector("#player1Score").innerHTML = scorePlayer1 + 1;
        }else if(WinningInfo ===2){
            document.querySelector("#player2Score").innerHTML = scorePlayer2 + 1;
        }
    }


    winingRow(y, x, inrow) {
        this.controller = new FourInARowController();
        if (y == undefined) {
            this.winingboard = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];
        } else {
            this.winingboard[y][x] = 3;
        }
        if (inrow === 4) {
            this.controller.drawWin(this.winingboard);
        }
    }

    checkForWin(playerId) {
        let board = this.board;
        //  0  1  2  3  4  5  6
        // [ ][ ][ ][ ][ ][ ][ ] 0
        // [ ][ ][ ][ ][ ][ ][ ] 1
        // [ ][ ][ ][ ][ ][ ][ ] 2
        // [ ][ ][ ][ ][ ][ ][ ] 3
        // [x][x][x][x][ ][ ][ ] 4
        // [ ][ ][ ][ ][ ][ ][ ] 5
        let inrow = 0;
        for (let y = 0; y <= 5; y++) {
            inrow = 0;
            for (let x = 0; x <= 6; x++) {
                if (board[y][x] === playerId) {
                    inrow++;
                    this.winingRow(y, x, inrow);
                } else {
                    inrow = 0;
                    this.winingRow();
                }
                if (inrow === 4) {
                    return true;
                }
            }
        }
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
                    this.winingRow(y, x, inrow);
                } else {
                    inrow = 0;
                    this.winingRow();
                }
                if (inrow === 4) {
                    return true;
                }
            }
        }
        //  0  1  2  3  4  5  6
        // [x][ ][ ][ ][ ][ ][ ] 0
        // [ ][x][ ][ ][ ][ ][ ] 1
        // [ ][ ][x][ ][ ][ ][ ] 2
        // [ ][ ][ ][x][ ][ ][ ] 3
        // [ ][ ][ ][ ][ ][ ][ ] 4
        // [ ][ ][ ][ ][ ][ ][ ] 5
        for (let xx = 0; xx <= 3; xx++) {
            let x = xx;
            inrow = 0;
            for (let y = 0; y <= 5 && x <= 6; y++) {
                if (board[y][x] === playerId) {
                    inrow++;
                    this.winingRow(y, x, inrow);
                } else {
                    inrow = 0;
                    this.winingRow();
                }
                if (inrow === 4) {
                    return true;
                }
                x++;
            }
        }
        for (let yy = 1; yy <= 2; yy++) {
            let x = 0;
            inrow = 0;
            for (let y = yy; y <= 5 && x <= 6; y++) {
                if (board[y][x] === playerId) {
                    inrow++;
                    this.winingRow(y, x, inrow);
                } else {
                    inrow = 0;
                    this.winingRow();
                }
                if (inrow === 4) {
                    return true;
                }
                x++;
            }
        }
        //  0  1  2  3  4  5  6
        // [ ][ ][ ][ ][ ][ ][x] 0
        // [ ][ ][ ][ ][ ][x][ ] 1
        // [ ][ ][ ][ ][x][ ][ ] 2
        // [ ][ ][ ][x][ ][ ][ ] 3
        // [ ][ ][ ][ ][ ][ ][ ] 4
        // [ ][ ][ ][ ][ ][ ][ ] 5
        for (let xx = 6; xx >= 3; xx--) {
            let x = xx;
            inrow = 0;
            for (let y = 0; y <= 5 && x >= 0; y++) {
                if (board[y][x] === playerId) {
                    inrow++;
                    this.winingRow(y, x, inrow);
                } else {
                    inrow = 0;
                    this.winingRow();
                }
                if (inrow === 4) {
                    return true;
                }
                x--;

            }
        }
        for (let yy = 1; yy <= 2; yy++) {
            let x = 6;
            inrow = 0;
            for (let y = +yy; y <= 5 && x <= 6; y++) {

                if (board[y][x] === playerId) {
                    inrow++;
                    this.winingRow(y, x, inrow);
                } else {
                    inrow = 0;
                    this.winingRow();
                }
                if (inrow === 4) {
                    return true;
                }
                x--;
            }
        }
        return false;
    }
    checkForTie() {
        let inrow = 0;
        for (let x = 0; x <= 6; x++) {
            if (!this.board[0][x] == 0) {
                inrow++
            }
            if (inrow === 7) {
                return true;
            }
        }
        return false;
    }


}