class SceneMain extends Phaser.Scene {
  constructor() {
      super('SceneMain'); //make sure the string in super is exactly like the class name
      
  }
  preload()
  {
    this.load.image("ball", "../Images/ball.png")
    // this.load.spritesheet('paddle', 'Images/paddle1.png',{frameWidth:76 , frameHeight:410})
    this.load.image('paddle', 'Images/paddle1.png')
    this.load.spritesheet('exp', 'Images/exp.png',{frameWidth:64 , frameHeight:64})
  }
  create(){
    emmiter = new Phaser.Events.EventEmitter() //should always be the first line , it alows us to talk globally to other parts of our game
    // controller = new Controller();
      console.log("Ready!");
      // model.score=100
    // this.sb = new ScoreBox({scene: this});
    // this.sb.x= game.config.width/2;
    // this.sb.y= 50;
    let frameNames = this.anims.generateFrameNumbers('exp');
    let f2=frameNames.slice();
    f2.reverse();
    let f3=f2.concat(frameNames)
this.anims.create({
  key: 'boom',
  frames:f3,
  frameRate: 48,
  repeat:false
})


    // ball
  let ball= this.physics.add.image(game.config.width/2,game.config.height/2,"ball")
  Align.scaleToGameW(ball,.025)
  ball.setVelocity(350,350)
  ball.body.collideWorldBounds = true
  ball.body.bounce.set(1);
  ball.body.onWorldBounds = true;
  this.physics.world.on('worldbounds', this.onWorldBounds);

  // players
  let player1=this.physics.add.sprite(5+ball.width/2*.025, game.config.height/2, "paddle")
  Align.scaleToGameW(player1,.015)
  this.physics.add.collider(ball,player1)
  player1.setImmovable(true)

  let player2=this.physics.add.sprite(game.config.width-ball.width/2*.025-5, game.config.height/2, "paddle")
  Align.scaleToGameW(player2,.015)
  this.physics.add.collider(ball,player2)
  player2.setImmovable(true)
  player2.body.collideWorldBounds = true
// if you play against computer
player2.body.velocity.setTo(ball.body.velocity.y);
player2.body.velocity.x=0
player2.body.maxVelocity.y=250;
  }

 onWorldBounds =(body)=>
{
  console.log("here");
  console.log("body", body);
    var ball = body.gameObject;
    console.log("ball", ball);
    console.log("ball.x", ball.x);
    if(ball.x<=ball.width*.025|| ball.x>=game.config.width-ball.width*.025){
      console.log("*************");
      console.log("game.config.width-ball.width", game.config.width-ball.width)
      console.log("width", ball.width);
let explosion = this.add.sprite(ball.x,ball.y,'exp');
explosion.play('boom');
ball.destroy()
    }

}
  update(){

  }
}