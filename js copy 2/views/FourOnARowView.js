import {
    ModelChangedEvent
} from "../models/ModelChangedEvent.js";
import {
    FourOnARowController
} from "../controls/FourOnARowController.js"

export class FourOnARowView {
    constructor() {
        this.FourOnARowField = document.querySelector('#FourOnARowfield')
    }

    getPlayerName() {
        let player1Name = document.getElementById('player1').value;
        let player2Name = document.getElementById('player2').value;
        if (player1Name === "") {
            player1Name = "Player 1"
        }
        if (player2Name === "") {
            player2Name = "Player 2"
        }
        return [player1Name, player2Name]
    }

    start() {
        this.controller = new FourOnARowController();
        let playernames = this.getPlayerName();
        document.querySelector("#player1name").innerHTML = playernames[0];
        document.querySelector("#player2name").innerHTML = playernames[1];
        document.querySelector("#gameOver").style.display = 'none';
        document.getElementById("grid-container").style.visibility = 'visible';
        document.getElementById("start").style.display = 'none';
        document.querySelector("#rain").classList.add("raincoinsContainer")
        for (let i = 0; i < 42; i++) {
            document.querySelector("board").insertAdjacentHTML('beforeend', `<div id='${i}' class='board-item'></div>`);
            let box = document.getElementById(i);
            box.addEventListener('click', () => {
                this.controller.onBoxClicked(i);
            });
        }
    }

    drawMove(moveValues) {
        let id = moveValues[1];
        let currentPlayer = moveValues[0];

        if (currentPlayer === 1) {
            document.getElementById(id).style.backgroundColor = 'yellow';
        } else {
            document.getElementById(id).style.backgroundColor = 'red';
        }
    }

    async gameOver(info) {
        window.setTimeout(() => {
            this.controller = new FourOnARowController();
            document.querySelector("#gameOver").style.display = 'block';
            let text = document.querySelector('#gameOverText');
            let playernames = this.getPlayerName();
            if (info == "tie") {
                text.innerHTML = "TIED";
            } else {
                if (info == 1) {
                    text.innerHTML = "congratulations " + playernames[0] + " has won the game";
                } else if (info == 2) {
                    text.innerHTML = "congratulations " + playernames[1] + " has won the game";
                }
            }
            this.controller.rematch();
          }, 1);
    }
}