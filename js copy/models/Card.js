export class Card{
    static CLOSED = 0;
    static OPEN = 1;
    static FOUND = 2;
    constructor(id){
        this._id = id;
        this._status = Card.CLOSED;
    }

    set status(value){
        this._status = value;
    }

    get status (){
        return this._status;
    }

    get id() {
        return this._id;
    }



}