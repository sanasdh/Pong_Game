class SceneMainPlayer extends Phaser.Scene {
  constructor() {
      super('SceneMainPlayer'); //make sure the string in super is exactly like the class name
      this.key={}
  }
  preload()
  {
    this.load.image("ball", "../Images/ball.png")
    this.load.image('paddle', 'Images/paddle1.png')
    this.load.spritesheet('exp', 'Images/exp.png',{frameWidth:64 , frameHeight:64})
    this.load.audio('pong1','../../audio/pong1.wav')
    this.load.audio('pong2','../../audio/pong2.wav')
    this.load.audio('explosion','../../audio/explosion.wav')

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
// sounds
this.explosionSound= this.sound.add('explosion')
this.pong1=this.sound.add('pong1')
this.pong2=this.sound.add('pong2')


    // ball
  this.ball= this.physics.add.image(game.config.width/2,game.config.height/2,"ball")
  Align.scaleToGameW(this.ball,.025)
  this.ball.setVelocity(350,350)
  this.ball.body.collideWorldBounds = true
  this.ball.body.bounce.set(1);
  this.ball.body.onWorldBounds = true;

  // players
  this.player1=this.physics.add.sprite(5+this.ball.width/2*.025, game.config.height/2, "paddle")
  Align.scaleToGameW(this.player1,.012)
  this.physics.add.collider(this.ball,this.player1,this.pongOneSound)
  this.player1.setImmovable(true)
  this.player1.body.collideWorldBounds = true


  this.player2=this.physics.add.sprite(game.config.width-this.ball.width/2*.025-5, game.config.height/2, "paddle")
  Align.scaleToGameW(this.player2,.012)
  this.physics.add.collider(this.ball,this.player2, this.pongTwoSound)
  this.player2.setImmovable(true)
  this.player2.body.collideWorldBounds = true

  // move players
  this.moves=this.input.keyboard.createCursorKeys();
  this.key.q= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q)
  this.key.w= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
  

}
pongOneSound=()=>{
  this.pong1.play()
}
pongTwoSound=()=>{
  this.pong2.play()
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
this.explosionSound.play()

explosion.play('boom');
ball.body.velocity.y=0
ball.body.velocity.x=0
this.time.addEvent({delay:900, callback:this.createNewBall , callbackScope: this, loop:false})

    }

}
createNewBall(){
  this.ball.x=game.config.width/2
  this.ball.y=game.config.height/2
  this.ball.setVelocity(350,350)
  this.ball.body.collideWorldBounds = true
  this.ball.body.bounce.set(1);
  this.ball.body.onWorldBounds = true;
  this.physics.add.collider(this.ball,this.player1,this.pongOneSound)
  this.physics.add.collider(this.ball,this.player2,this.pongTwoSound)
}

  update(){

    this.onWorldBounds(this.ball.body)
// // move paddle 2 for computer
//     this.player2.body.velocity.setTo(this.ball.body.velocity.y);
//     this.player2.body.velocity.x=0
//     this.player2.body.maxVelocity.y=200;

// move paddle 2 for player 2(not computer)
if(this.key.w.isDown){
  this.player2.body.velocity.y=200;
}

else{
  this.player2.body.setVelocityY(0);
}
if(this.key.q.isDown){
  this.player2.body.setVelocityY(-200);
}

// user moves paddle1 
if(this.moves.down.isDown){
  this.player1.body.velocity.y=200;
}
  // this.player1.body.setVelocityY(-200);
// }
else{
  this.player1.body.setVelocityY(0);
}
if(this.moves.up.isDown){
  this.player1.body.setVelocityY(-200);
}
    
  }
}