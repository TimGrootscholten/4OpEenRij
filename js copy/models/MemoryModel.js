import {Card} from "./Card.js"
import {ModelChangedEvent} from "./ModelChangedEvent.js";

export class MemoryModel extends EventTarget{

    constructor(){
        super();
        this.cards = [];
        for (let i =0; i<16; i++) {
            this.cards[2 * i] = new Card(i);
            this.cards[2 * i + 1] = new Card(i);
        }
    }


    raiseModelChanged(){
        this.dispatchEvent(new ModelChangedEvent(this.cards));
    }

    acceptCard(id){
        this.cards[id].status=Card.OPEN;
        this.raiseModelChanged();
    }
}