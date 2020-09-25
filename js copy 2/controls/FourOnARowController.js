import {FourOnARowView} from "../views/FourOnARowView.js";
import {FourOnARowModel} from "../models/FourOnARowModel.js"

export class FourOnARowController{

    constructor (){
        this.model = new FourOnARowModel();
        this.view = new FourOnARowView();
        this.player = 2;
        document.querySelector("#startButton").addEventListener('click', () => {this.view.start()});
    }

    onBoxClicked(id){
        this.BoxId = id;
        this.moveValues = this.model.acceptClick(this.BoxId);
        this.view.drawMove(this.moveValues);
        this.checkforgameover();
    }

    checkforgameover(){
        if(this.model.checkForWin(this.moveValues[0])){
            alert(this.moveValues[0])
        }else if(this.model.checkForTie()){
            alert("tie");
        }
    }

}