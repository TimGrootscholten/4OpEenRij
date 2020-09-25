export class ModelChangedEvent extends Event{

    static CHANGED = "modelchanged";

    constructor(cards) {
        super(ModelChangedEvent.CHANGED);
        this._cards = cards;
    }

    get cards (){
        return this._cards;
    }
}