export class PlayerScore {

    constructor() {
        this.playersScore = [];
    }

    playerscore(playerId) {
        if (playerId === 1) {
            this.playersScore.player1Score = +1;

        } else if (playerId === 2) {
            this.playersScore.player2Score = +1;
        }
        return this.playersScore

    }

    rematch(info) {
        for (let i = 0; i < 42; i++) {
            document.getElementById(i).remove();
        }
        let playersScore = this.playerscore(info);
        if (playersScore.player1Score == undefined) {
            playersScore.player1Score = 0;
        }
        if (playersScore.player2Score == undefined) {
            playersScore.player2Score = 0;
        }
        document.querySelector("#player1Score").innerHTML = playersScore.player1Score;
        document.querySelector("#player2Score").innerHTML = playersScore.player2Score;
    }

    start() {
        this.playersScore.player2Score = 0;
        this.playersScore.player1Score = 0;
    }
}