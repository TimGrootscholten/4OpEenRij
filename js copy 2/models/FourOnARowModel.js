import {ModelChangedEvent} from "./ModelChangedEvent.js";

export class FourOnARowModel extends EventTarget{

    constructor(){
        super();
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

    raiseModelChanged(){
        this.dispatchEvent(new ModelChangedEvent(this.board));
    }

    acceptClick(id){
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
            this.raiseModelChanged();
            id = y * 7 + x;
           return [this.player, id]
        }
       
    }

    switchPlayer(player) {
        // 1 player1, 2 player2
        if (player === 1) {
            return 2;
        } else {
            return 1;
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
    checkForTie(){
        //tie
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

    rematch(){
        for (let i = 0; i < 42; i++) {
            document.getElementById(i).remove();
        }
    }
}