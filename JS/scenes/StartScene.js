class StartScene extends Phaser.Scene {
  constructor() {
      super('StartScene');
  }
  preload()
  {
    this.load.image("btn1","../../Images/btn2.png")
    player1Name=player2Name=""
  }
  create(){
    let x=game.config.width/2
    let y=game.config.height/2
player1Name= prompt("Please enter your name", "Player 1");
player2Name= prompt("Please enter your name", "Player 2");
new FlatButton({scene:this, key:'btn1', text:'Start',x,y, event:'startFunc'})
emitter.on('startFunc', this.startFunc, this);

  }
  startFunc(){
    this.scene.start("SceneMainPlayer")    
      }
  update(){

  }
}