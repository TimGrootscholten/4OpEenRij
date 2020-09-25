import {MemoryView} from "../views/MemoryView.js";
import {MemoryModel} from "../models/MemoryModel.js"

export class MemoryController{

    constructor (){
        this.model = new MemoryModel();
        this.view = new MemoryView();
        this.view.addClickHandler((e)=>{
            this.onCardClicked(e);
        });
        this.view.coupleToModel(this.model);

    }

    onCardClicked(e){
        let cardId =  this.view.getClickedCard(e);
        this.model.acceptCard(cardId);
    }
}