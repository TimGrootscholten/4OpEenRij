import {
    FourInARowController
} from "../controls/FourInARowController.js"

export class FourInARowView {

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

    start() { //zet de player name neer en veranderd de style
        this.controller = new FourInARowController();
        let playernames = this.getPlayerName();
        document.querySelector("#player1name").innerHTML = playernames[0] + ": ";
        document.querySelector("#player2name").innerHTML = playernames[1] + ": ";
        document.getElementById("gameOver").style.display = 'none';
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
            this.controller = new FourInARowController();
            document.getElementById("gameOver").style.display = 'block';
            let text = document.querySelector('#gameOverText');
            let playernames = this.getPlayerName();
            if (info == "tie") {
                text.innerHTML = "TIED";
            } else {
                if (info == 1) {
                    text.innerHTML = "Congratulations " + playernames[0] + ", you won the game.";
                } else if (info == 2) {
                    text.innerHTML = "Congratulations " + playernames[1] + ", you won the game.";
                }
            }
            this.controller.rematch(info);
        }, 1);
    }

    drawWiningmove(winingBoard) {
        for (let y = 0; y <= 5; y++) {
            for (let x = 0; x <= 6; x++) {
                console.log(winingBoard[y][x]);
                if (winingBoard[y][x] === 0) {
                    let id = y * 7 + x;
                    document.getElementById(id).style.opacity = '0.6';
                }
            }
        }
    }
}