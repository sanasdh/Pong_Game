class EasyScene extends Phaser.Scene {
  constructor() {
      super('EasyScene'); //make sure the string in super is exactly like the class name
      this.key={}
  }
  preload()
  {
    this.load.image("ball", "../../Images/ball.png")
    this.load.image('paddle', '../../Images/paddle1.png')
    this.load.spritesheet('exp', '../../Images/exp.png',{frameWidth:64 , frameHeight:64})
    this.load.audio('pong1','../../audio/pong1.wav')
    this.load.audio('pong2','../../audio/pong2.wav')
    this.load.audio('explosion','../../audio/explosion.wav')

  }
  create(){
    emmiter = new Phaser.Events.EventEmitter() //should always be the first line , it alows us to talk globally to other parts of our game
      console.log("Ready!");
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
  // player 1
  this.player1=this.physics.add.sprite(5+this.ball.width/2*.025, game.config.height/2, "paddle")
  Align.scaleToGameW(this.player1,.012)
  this.physics.add.collider(this.ball,this.player1,this.pongOneSound)
  this.player1.setImmovable(true)
  this.player1.body.collideWorldBounds = true
  score1Display= this.add.text(game.config.width/4,game.config.height/10,score1,{
    font: "32px 'VT323'",
    fill:"white",
    align: "center"
  })
  player1Display= this.add.text(game.config.width/4,game.config.height/2,'Player 1',{
    font: "64px 'VT323'",
    fill:"white",
    align: "center"
  })
  player1DisplayInfo=this.add.text(game.config.width/4,game.config.height*2/3,'↑ MOVES UP \n ↓ MOVES DOWN',{
    font: "32px 'VT323'",
    fill:"white",
    align: "center"
  })
  score1Display.setOrigin(.5,.5)
  player1Display.setOrigin(.5,.5)
  player1DisplayInfo.setOrigin(.5,.5)


  this.player2=this.physics.add.sprite(game.config.width-this.ball.width/2*.025-5, game.config.height/2, "paddle")
  Align.scaleToGameW(this.player2,.012)
  this.physics.add.collider(this.ball,this.player2, this.pongTwoSound)
  this.player2.setImmovable(true)
  this.player2.body.collideWorldBounds = true
// player 2 Computer
  this.player2.body.velocity.setTo(this.ball.body.velocity.y);
  this.player2.body.velocity.x=0
  this.player2.body.maxVelocity.y=200;
  this.moves=this.input.keyboard.createCursorKeys();
  score2Display= this.add.text(game.config.width*3/4,game.config.height/10,score2,{
    font: "32px 'VT323'",
    fill:"white",
    align: "center"
  })
  player2Display= this.add.text(game.config.width*3/4,game.config.height/2,'Computer',{
    font: "64px 'VT323'",
    fill:"white",
    align: "center"
  })
  score2Display.setOrigin(.5,.5)
  player2Display.setOrigin(.5,.5)

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
    // if(ball.x<=ball.width*.025|| ball.x>=game.config.width-ball.width*.025){
      if(ball.body.blocked.left||ball.body.blocked.right){
        if(ball.body.blocked.right){
          score1+=1;
          score1Display.text=score1
          this.winnig()
        }
        if(ball.body.blocked.left){
          score2+=1;
          score2Display.text=score2
          this.winnig()
  
        }
this.explosionSound.play()
      console.log("*************");
      console.log("game.config.width-ball.width", game.config.width-ball.width)
      console.log("width", ball.width);
let explosion = this.add.sprite(ball.x,ball.y,'exp');
explosion.play('boom');
ball.body.velocity.y=0
ball.body.velocity.x=0
this.time.addEvent({delay:900, callback:this.createNewBall , callbackScope: this, loop:false})
    }

}
winnig(){
  if(score2==7){
    console.log("player 2 won");
    // this.scene.start("PlayerScene")
    this.scene.start('GameOver', 'player2','player1');
  }
  else if(score1==3){
    console.log("player 1 won");
    // this.scene.start("PlayerScene")
    this.scene.start('GameOver', ['player1','player2']);

  }
}
createNewBall(){
  // this.ball.destroy()
  // this.ball= this.physics.add.image(game.config.width/2,game.config.height/2,"ball")
  this.ball.x=game.config.width/2
  this.ball.y=game.config.height/2
  // Align.scaleToGameW(this.ball,.025)
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
    this.player2.body.velocity.setTo(this.ball.body.velocity.y);
    this.player2.body.velocity.x=0
    this.player2.body.maxVelocity.y=200;

// user moves paddle1 
if(this.moves.down.isDown){
  this.player1.body.velocity.y=200;
  player1Display.destroy()
  player1DisplayInfo.destroy()
  player2Display.destroy()
}
else{
  this.player1.body.setVelocityY(0);
}
if(this.moves.up.isDown){
  this.player1.body.setVelocityY(-200);
  player1Display.destroy()
  player1DisplayInfo.destroy()
  player2Display.destroy()

}
    
  }
}