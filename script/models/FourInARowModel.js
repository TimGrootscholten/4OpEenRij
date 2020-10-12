import {
  FourInARowEvent
} from "../models/FourInARowEvent.js";

export class FourInARowModel extends EventTarget {
  constructor() {
    super();
    this.data = [];
    this.data.board = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];
    this.data.currentPlayer = 1;
    this.data.gameStatus = "playing";
    this.data.player1Score = 0;
    this.data.player2Score = 0;
    this.data.winingRow = [
      [],
      [],
      [],
      []
    ];
  }

  move(id1) {// maakt van een id de x en y waarde
    if (this.data.gameStatus == "playing") {

      let id = id1.id;
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
      if (this.data.board[0][x] === 0) {//kijkt waar in de row de eerst volgende leeg vakje is
        let boxEmty = true;
        while (boxEmty) {
          y++;
          if (y === 5 && this.data.board[y][x] === 0) {
            boxEmty = false;
          }
          if (!this.data.board[y][x] == 0) {
            y--;
            boxEmty = false;
          }
        }
        this.data.board[y][x] = this.data.currentPlayer;
        this.checkForWin();
        this._commit();
        this.data.currentPlayer = this.switchPlayer(this.data.currentPlayer);
      }
    }
  }

  switchPlayer(player) {
    if (player === 1) {
      return 2;
    } else {
      return 1;
    }
  }

  restart() {//reset de values 
    this.data.board = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];
    this.data.currentPlayer = 1;
    this.data.gameStatus = "playing";
  }

  checkForWin() {
    let inrow = 0;
    let board = this.data.board;
    for (let i = 1; i <= 2; i++) {
      let playerId = i;
      //  0  1  2  3  4  5  6
      // [ ][ ][ ][ ][ ][ ][ ] 0
      // [ ][ ][ ][ ][ ][ ][ ] 1
      // [ ][ ][ ][ ][ ][ ][ ] 2
      // [ ][ ][ ][ ][ ][ ][ ] 3
      // [x][x][x][x][ ][ ][ ] 4
      // [ ][ ][ ][ ][ ][ ][ ] 5

      for (let y = 0; y <= 5; y++) {
        inrow = 0;
        for (let x = 0; x <= 6; x++) {
          if (board[y][x] === playerId) {
            inrow++;
            this.data.winingRow[inrow] = [y, x];
          } else {
            inrow = 0;
          }
          if (inrow === 4) {
            this.data.gameStatus = playerId;
            return playerId;
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
            this.data.winingRow[inrow] = [y, x];
          } else {
            inrow = 0;
          }
          if (inrow === 4) {
            this.data.gameStatus = playerId;
            return playerId;
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
            this.data.winingRow[inrow] = [y, x];
          } else {
            inrow = 0;
          }
          if (inrow === 4) {
            this.data.gameStatus = playerId;
            return playerId;
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
            this.data.winingRow[inrow] = [y, x];
          } else {
            inrow = 0;
          }
          if (inrow === 4) {
            this.data.gameStatus = playerId;
            return playerId;
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
            this.data.winingRow[inrow] = [y, x];
          } else {
            inrow = 0;
          }
          if (inrow === 4) {
            this.data.gameStatus = playerId;
            return playerId;
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
            this.data.winingRow[inrow] = [y, x];
          } else {
            inrow = 0;
          }
          if (inrow === 4) {
            this.data.gameStatus = playerId;
            return playerId;
          }
          x--;
        }
      }
    }
    inrow = 0;
    for (let x = 0; x <= 6; x++) {
      if (!this.data.board[0][x] == 0) {
        inrow++;
      }
      if (inrow === 7) {
        this.data.gameStatus = "Tie";
        return "Tie";
      }
    }
    return null;
  }
  _commit() {//commit de data
    this.dispatchEvent(new FourInARowEvent(this.data));
  }
}