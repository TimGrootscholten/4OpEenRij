import { FourInARowView } from "../views/FourInARowView.js";
import { FourInARowModel } from "../models/FourInARowModel.js";

export class FourInARowController {
  constructor() {
    this.model = new FourInARowModel();
    this.view = new FourInARowView(this.model);
    this.view.bindStartButton();
    this.view.drwawGame(this.handleUserData)
    this.view.rematchButton(this.restart);
  }

  handleUserData = (id) => {
    this.model.move(id);
  };

  restart = () =>{
    this.view.drwawGame(this.handleUserData)
    this.model.restart();
  }
}
