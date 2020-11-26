class DifficultyScene extends Phaser.Scene {
  constructor(){
    super("DifficultyScene")
  }
  preload(){
    this.load.image("btn","../../Images/btn.png")
    this.load.image("btn1","../../Images/back.png")
    this.load.image("btn2","../../Images/btn3.png")
    this.load.image("btn3","../../Images/btn4.png")

  }
  create(){
    emitter =new Phaser.Events.EventEmitter();
this.levels= this.add.text(game.config.width/2,game.config.height/5,'Select The Difficulty Level',{
  font: "64px 'VT323'",
  fill:"white",
  align: "center"
})

this.levels.setOrigin(.5,.5)

// buttons
let x=game.config.width/2
let x1=game.config.width/10
let y=game.config.height*2/5
let y1=game.config.height*3/5
let y2=game.config.height*4/5
let y3=game.config.height*7/8

this.btn= new FlatButton({scene:this, key:'back', text:'Back',x:x1,y:y3, event:'back'})
let btn1= new FlatButton({scene:this, key:'btn', text:'Easy',x,y, event:'easy'})
let btn2= new FlatButton({scene:this, key:'btn2', text:'Medium',x,y:y1, event:'medium'})
let btn3= new FlatButton({scene:this, key:'btn3', text:'Hard',x,y:y2, event:'hard'})

emitter.on('back', this.backFunc, this);
emitter.on('easy', this.easyFunc, this);
emitter.on('medium', this.mediumFunc, this);
emitter.on('hard', this.hardFunc, this);

  }
  backFunc(){
    this.scene.start("PlayerScene")
  }
  easyFunc(){
    this.scene.start("EasyScene")
    levelspeed=150
  }
  mediumFunc(){
    this.scene.start("EasyScene")
    levelspeed=200
  }
  hardFunc(){
    this.scene.start("EasyScene")
    levelspeed=270
  }
  update(){
    
  }
}