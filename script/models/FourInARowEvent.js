export class FourInARowEvent extends Event {
  static CHANGED = "FourInARowChanged";

  constructor(sums, current) {
    
    super(FourInARowEvent.CHANGED);
    this.sums = sums;
    this.current = current;
  }
}
