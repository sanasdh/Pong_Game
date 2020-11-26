class StartScene extends Phaser.Scene {
  constructor() {
      super('StartScene');
  }
  preload()
  {
    this.load.image("btn1","../../Images/btn2.png")
    this.load.image("back","../../Images/back.png")
    player1Name=player2Name=""
  }
  create(){
    let x=game.config.width/2
    let y=game.config.height/2
    let x1=game.config.width/10
    let y1=game.config.height*7/8

player1Name= prompt("Please enter your name", "Player 1");
player2Name= prompt("Please enter your name", "Player 2");
this.btn= new FlatButton({scene:this, key:'back', text:'Back',x:x1,y:y1, event:'back'})
new FlatButton({scene:this, key:'btn1', text:'Start',x,y, event:'startFunc'})
emitter.on('startFunc', this.startFunc, this);
emitter.on('back', this.backFunc, this);

  }
  startFunc(){
    this.scene.start("SceneMainPlayer")    
    }
  backFunc(){
    this.scene.start("PlayerScene")
    }
  update(){

  }
}