class PlayerScene extends Phaser.Scene {
  constructor(){
    super("PlayerScene")
  }
  preload(){
this.load.image("btn1","../../Images/btn2.png")
  }
  create(){
    let emitter =new Phaser.Events.EventEmitter();
    let controller= new Controller();
this.welcome= this.add.text(game.config.width/2,game.config.height/4,'Welcome to Pong',{
  font: "64px Gabriella",
  fill:"white",
  align: "center"
})
this.opponent= this.add.text(game.config.width/2,game.config.height/2,'Choose your player',{
  font: "32px Gabriella",
  fill:"white",
  align: "center"
})
this.welcome.setOrigin(.5,.5)
this.opponent.setOrigin(.5,.5)

// buttons
let x=game.config.width/4
console.log({x});
let x2=game.config.width*3/4
console.log({x2});
let y=game.config.height*3/4
let btn1= new FlatButton({scene:this, key:'btn1', text:'Computer',x,y, event:'computer', })
let btn2= new FlatButton({scene:this, key:'btn1', text:'Player 2',x:x2,y, event:'human'})
 

emitter.on('computer', this.computerFun, this);
  }

  computerFun(){

  }
  update(){
    
  }
}