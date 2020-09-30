import {
    FourInARowView
} from "../views/FourInARowView.js";
import {
    FourInARowModel
} from "../models/FourInARowModel.js"

export class FourInARowController {

    constructor() {
        this.lastMove = false;
        this.model = new FourInARowModel();
        this.view = new FourInARowView();
        document.querySelector("#startButton").addEventListener('click', () => {
            this.view.start();
        });
    }

    onBoxClicked(id) { //als er een move word gedaan
        this.BoxId = id;
        this.moveValues = this.model.acceptClick(this.BoxId);
        if (this.moveValues == undefined || this.lastMove) {} else {
            this.view.drawMove(this.moveValues);
            this.checkforgameover();
        }
    }

    checkforgameover() { //kijkt voor een gameover
        if (this.model.checkForWin(this.moveValues[0])) {
            this.lastMove = true;
            this.view.gameOver(this.moveValues[0]);
        } else if (this.model.checkForTie()) {
            this.lastMove = true;
            this.view.gameOver("tie");
        }
    }

    rematchController(WinningInfo) { //laat een speelveld in
        console.log("controller eerst");
        document.getElementById("rematch").addEventListener('click', () => {
            console.log("click", WinningInfo);
            this.model.rematchModel(WinningInfo);
            console.log("click", WinningInfo);
            this.view.start(); 
        });
    }

    drawWin(winingboard) { //winnende rij
        this.view.drawWiningmove(winingboard);
    }
}