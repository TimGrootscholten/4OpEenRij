export class ModelChangedEvent extends Event{

    static CHANGED = "modelchanged";

    constructor(board) {
        super(ModelChangedEvent.CHANGED);
        this._board = board;
    }

    get board (){
        return this._board;
    }
}