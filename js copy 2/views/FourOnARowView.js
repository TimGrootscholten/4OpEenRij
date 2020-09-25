import { ModelChangedEvent } from "../models/ModelChangedEvent.js";
import { FourOnARowController } from "../controls/FourOnARowController.js"

export class FourOnARowView {
    constructor() {
        this.FourOnARowField = document.querySelector('#FourOnARowfield')
    }

    start() {
        this.controller = new FourOnARowController();
        let player1Name = document.getElementById('player1').value;
        let player2Name = document.getElementById('player2').value;
        if (player1Name === "") {
            player1Name = "Player 1"
        }
        if (player2Name === "") {
            player2Name = "Player 2"
        }
        document.querySelector("player1").insertAdjacentHTML('beforeend', player1Name);
        document.querySelector("player2").insertAdjacentHTML('beforeend', player2Name);

        document.getElementById("grid-container").style.visibility = 'visible';
        document.getElementById("start").style.display = 'none';
        for (let i = 0; i < 42; i++) {
            document.querySelector("board").insertAdjacentHTML('beforeend', `<div id='${i}' class='board-item'></div>`);
            let box = document.getElementById(i);
            box.addEventListener('click', () => {
                this.controller.onBoxClicked(i);
            });
        }
    }

    drawMove(moveValues) {
        console.log(moveValues[1])

        let id = moveValues[1];
        let currentPlayer = moveValues[0];

        if (currentPlayer === 1) {
            document.getElementById(id).style.backgroundColor = 'yellow';
        } else {
            document.getElementById(id).style.backgroundColor = 'red';
        }

    }



}