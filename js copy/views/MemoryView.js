import {ModelChangedEvent} from "../models/ModelChangedEvent.js";
import {Card} from "../models/Card.js";

export class MemoryView{

    constructor(){
        this.memoryField = document.querySelector('#memoryfield')
    }
    addClickHandler(handler){
        this.memoryField.addEventListener('click',(e)=>handler(e));
    }


    getClickedCard(e){
        const source = e.target;
        let count = 0;
        const cards = this.memoryField.querySelectorAll('.card');
        for(let card of cards){
            if(card=== source){
                return count;
            }
            count++;
        }
        return -1;
    }

    coupleToModel(model){
        model.addEventListener(ModelChangedEvent.CHANGED,
            (e)=>{
                    this.onModelChanged(e)
            })
    }

    onModelChanged(event){
       let cards = event.cards;//model
        let cardDivs = this.memoryField.querySelectorAll('.card');//html
        let id =0;
        for(let card of cards){
            if(card.status===Card.OPEN){
                cardDivs[id].style.backgroundImage = `url('img/${card.id}.jpg')`;
            }
            id++;
        }

    }

}