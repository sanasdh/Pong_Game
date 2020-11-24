class Model{
  constructor(){
    this._score=0
  }
  set score(value){
    console.log({value});
    this._score=value;
    console.log("value,", this._score);
    emitter.emit(G.SCORE_UPDATED)
  }
  get score(){
    return this._score
  }
}