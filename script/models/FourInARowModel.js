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

    this.scores = {
      2: 1,
      1: -1,
      Tie: 0,
    };
    this.calculations;
  }

  move(id1) {
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
      if (this.data.board[0][x] === 0) {
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
        this.calculations = 0;
        if (this.data.ai) {
          this.bestMove();
          this.checkForWin();
          this._commit();
          this.data.currentPlayer = this.switchPlayer(this.data.currentPlayer);
        }
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

  restart() {
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

  /*
    !MiniMax
    */

  bestMove() {
    let bestScore = -Infinity;
    let move;
    for (let x = 0; x <= 6; x++) {
      if (this.data.board[0][x] === 0) {
        let boxEmty = true;
        let y = 0;
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
        this.data.board[y][x] = 2;
        let score = this.minimax(this.data.board, 0, false);
        if (score == 1) {
          // console.log(score, y, x, "ai");
        }
        this.data.board[y][x] = 0;
        console.log(x, bestScore, "x bestscore")

        if (score > bestScore) {
          bestScore = score;
          move = {
            y,
            x,
          };
        }
        console.log(score, bestScore, move);
      }
    }
    console.log(this.calculations);

    // console.log("--------------------------------------------")
    // console.log(move.y, move.x, "move loaction");
    // // console.log(y,x);
    // console.log("--------------------------------------------")

    this.data.gameStatus = "playing";
    this.data.board[move.y][move.x] = 2;
  }

  minimax(board, depth, isMaximizing) {
    let result = this.checkForWin();
    if (depth > 5) {
      return;
    }
    if (result !== null) {
      this.data.gameStatus = "playing";
      // console.log(this.scores[result]);
      return this.scores[result];
    }
    if (isMaximizing) {
      let bestScore = Infinity;
      for (let x = 0; x <= 6; x++) {
        if (this.data.board[0][x] === 0) {
          let boxEmty = true;
          let y = 0;
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
          this.data.board[y][x] = 2;
          let score;

          this.calculations++;
          score = this.minimax(this.data.board, depth + 1, false);
          this.data.board[y][x] = 0;
          if (score == 1) {
            // console.log(score, y, x, "ai");
          }
          if (bestScore > score) {
            bestScore = score;
            // console.log(score, y, x, "ai");
          }

        }
      }
      return bestScore;
    } else {
      let bestScore = -Infinity;
      for (let x = 0; x <= 6; x++) {
        if (this.data.board[0][x] === 0) {
          let boxEmty = true;
          let y = 0;
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
          this.data.board[y][x] = 1;
          let score;
          this.calculations++;
          score = this.minimax(this.data.board, depth + 1, true);
          if (score == -11) {
            // console.table(this.data.board);
            // console.log(score);
          }
          this.data.board[y][x] = 0;
          if (score == 1) {
            // console.log(score, y, x, "ai");
          }
          if (bestScore < score) {
            bestScore = score;
            // console.log(bestScore, y, x, "player");
          }


        }
      }

      return bestScore;
    }
  }

  _commit() {
    this.dispatchEvent(new FourInARowEvent(this.data));
  }
}