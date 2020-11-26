class SceneMainPlayer extends Phaser.Scene {
  constructor() {
      super('SceneMainPlayer');
      this.key={}
  }
  preload()
  {
    this.load.image("line","Images/line.png")
    this.load.image("ball", "../../Images/ball.png")
    this.load.image('paddle', '../../Images/paddle1.png')
    this.load.image("home", "Images/home.png")
    this.load.image("on","Images/on.png")
    this.load.image("off","Images/off.png")
    this.load.spritesheet('exp', 'Images/exp.png',{frameWidth:64 , frameHeight:64})
    this.load.audio('pong1','../../audio/pong1.wav')
    this.load.audio('pong2','../../audio/pong2.wav')
    this.load.audio('explosion','../../audio/explosion.wav')
    this.gameStart=false
    this.gameStartPlayer2=true

  }
  create(){
    emmiter = new Phaser.Events.EventEmitter() 
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
let x3=game.config.width/10
let x4=game.config.width/10*9
let y3=game.config.height/10

let home= new FlatButton({scene:this, key:'home',x:x3,y:y3, event:'home'})
emitter.on('home', this.home, this);
this.on= new FlatButton({scene:this, key:'on',x:x4,y:y3, event:'sound'})
this.off= new FlatButton({scene:this, key:'off',x:x4,y:y3, event:'sound'})
this.on.visible=true;
this.off.visible=false;
this.countToggle=0;
emitter.on('sound', this.soundFunction, this);

this.line=this.add.image(game.config.width/2-2,0,"line")

// sounds
this.explosionSound= this.sound.add('explosion')
this.pong1=this.sound.add('pong1')
this.pong2=this.sound.add('pong2')


    // ball
    this.ball= this.physics.add.image(30,game.config.height/2,"ball")
  Align.scaleToGameW(this.ball,.025)
  this.ball.body.collideWorldBounds = true
  this.ball.body.bounce.set(1);
  this.ball.body.onWorldBounds = true;

  // players
  // player1
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
  if(player1Name==null||player1Name==""){
    player1Name="Player 1"
  }
  player1Display= this.add.text(game.config.width/4,game.config.height/2,player1Name,{
    font: "64px 'VT323'",
    fill:"white",
    align: "center"
  })
  player1DisplayInfo=this.add.text(game.config.width/4,game.config.height*3/4,'↑ MOVES UP \n ↓ MOVES DOWN\n → MOVES RIGHT/SERVE \n← MOVES LEFT/SERVE',{
    font: "32px 'VT323'",
    fill:"white",
    align: "center"
  })
  score1Display.setOrigin(.5,.5)
  player1Display.setOrigin(.5,.5)
  player1DisplayInfo.setOrigin(.5,.5)

  // player2
  this.player2=this.physics.add.sprite(game.config.width-this.ball.width/2*.025-5, game.config.height/2, "paddle")
  Align.scaleToGameW(this.player2,.012)
  this.physics.add.collider(this.ball,this.player2, this.pongTwoSound)
  this.player2.setImmovable(true)
  this.player2.body.collideWorldBounds = true
  score2Display= this.add.text(game.config.width*3/4,game.config.height/10,score2,{
    font: "32px 'VT323'",
    fill:"white",
    align: "center"
  })
  if(player2Name==null||player2Name==""){
    player2Name="Player 2"
  }
  player2Display= this.add.text(game.config.width*3/4,game.config.height/2,player2Name,{
    font: "64px 'VT323'",
    fill:"white",
    align: "center"
  })
  player2DisplayInfo=this.add.text(game.config.width*3/4,game.config.height*3/4,'W MOVES UP \n S MOVES DOWN \n D MOVES RIGHT/SERVE \n A MOVES LEFT/SERVE',{
    font: "32px 'VT323'",
    fill:"white",
    align: "center"
  })
  score2Display.setOrigin(.5,.5)
  player2Display.setOrigin(.5,.5)
  player2DisplayInfo.setOrigin(.5,.5)

  // move players
  this.moves=this.input.keyboard.createCursorKeys();
  this.key.s= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
  this.key.w= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
  this.key.a= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
  this.key.d= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

}
soundFunction(){
  this.countToggle++
  if(this.countToggle%2==0){
    this.on.visible=true;
    this.off.visible=false;
    this.explosionSound= this.sound.add('explosion')
this.pong1=this.sound.add('pong1')
this.pong2=this.sound.add('pong2')
  }else{
    this.on.visible=false;
    this.off.visible=true;
    this.pong1=null
    this.pong2=null
    this.explosionSound=null
  }
}
pongOneSound=()=>{
  if(this.pong1){
  this.pong1.play()
  }
}
pongTwoSound=()=>{
  if(this.pong2){
    this.pong2.play()
    }
  }
home(){
  score1=score2=0
  this.scene.start("PlayerScene")
}
 onWorldBounds =(body)=>
{ 
    var ball = body.gameObject;
      if(ball.body.blocked.left||ball.body.blocked.right){
        this.ball.setVelocity(0,0)
      if(ball.body.blocked.right){
        score1+=1;
        score1Display.text=score1
        this.gameStart=false
        this.winnig()
      }
      if(ball.body.blocked.left){
        score2+=1;
        this.gameStartPlayer2=false
        score2Display.text=score2
        this.winnig()

      }
let explosion = this.add.sprite(ball.x,ball.y,'exp');
if(this.explosionSound){
  this.explosionSound.play()
}

explosion.play('boom');
ball.body.velocity.y=0
ball.body.velocity.x=0

this.time.addEvent({delay:900, callback:this.createNewBall , callbackScope: this, loop:false})

    }

}
winnig(){
  if(score2==7){
    score1=score2=0
    // won="player2"
    won=player2Name
    lost=`Better luck ${player1Name}`
    this.scene.start('GameOver');
  }
  else if(score1==7){
    score1=score2=0
    // won="player1"
    won=player1Name
    // lost="Better luck Player2"
    lost=`Better luck ${player2Name}`

    this.scene.start('GameOver');
  }
}
createNewBall(){
  if(!this.gameStart){
    this.ball.x=this.player1.x+20
    this.ball.y=this.player1.y
  }
 if(!this.gameStartPlayer2){
  this.ball.x=this.player2.x-20
  this.ball.y=this.player2.y
 }
  // this.ball.setVelocity(350,350)
  this.ball.body.collideWorldBounds = true
  this.ball.body.bounce.set(1);
  this.ball.body.onWorldBounds = true;
  this.physics.add.collider(this.ball,this.player1,this.pongOneSound)
  this.physics.add.collider(this.ball,this.player2,this.pongTwoSound)
  this.ball.setVelocity(0,0)

}

  update(){

    this.onWorldBounds(this.ball.body)
// move paddle 2 for player 2(not computer)
if(this.key.w.isDown){
  if(!this.gameStartPlayer2){
    this.ball.y=this.player2.y
  }
  this.player2.body.velocity.y=-200;
  player2Display.destroy()
  player2DisplayInfo.destroy()
}

else{
  this.player2.body.setVelocityY(0);
}
if(this.key.s.isDown){
  if(!this.gameStartPlayer2){
    this.ball.y=this.player2.y
  }
  this.player2.body.setVelocityY(200);
  player2Display.destroy()
  player2DisplayInfo.destroy()
}
if(this.key.a.isDown && this.player2.x>=game.config.width*3/4){
  if(!this.gameStartPlayer2){
    this.ball.setVelocity(0,0)
    this.gameStart=true
    this.gameStartPlayer2=true
    this.ball.setVelocity(-350,-350)
  }
  this.player2.body.velocity.x=-100;
  player2Display.destroy()
  player2DisplayInfo.destroy()
}
else{
  this.player2.body.setVelocityX(0);
}
if(this.key.d.isDown){
  this.player2.body.velocity.x=100;
  player2Display.destroy()
  player2DisplayInfo.destroy()
}


// user moves paddle1 
if(this.moves.down.isDown){
  if(!this.gameStart){
    this.ball.y=this.player1.y
  }
  this.player1.body.velocity.y=200;
  player1Display.destroy()
  player1DisplayInfo.destroy()
}
else{
  this.player1.body.setVelocityY(0);
}
if(this.moves.up.isDown){
  if(!this.gameStart){
    this.ball.y=this.player1.y
  }
  this.player1.body.setVelocityY(-200);
  player1Display.destroy()
  player1DisplayInfo.destroy()
}
if(this.moves.right.isDown && this.player1.x<=game.config.width/4){
  if(!this.gameStart){
    this.ball.setVelocity(0,0)
    this.gameStart=true
    this.gameStartPlayer2=true
    this.ball.setVelocity(350,350)
  }
  this.player1.body.velocity.x=100;
  player1Display.destroy()
  player1DisplayInfo.destroy()
}
else{
  this.player1.body.setVelocityX(0);
}
if(this.moves.left.isDown){
  if(!this.gameStart){
    this.ball.setVelocity(0,0)
    this.gameStart=true
    this.gameStartPlayer2=true
    this.ball.setVelocity(350,350)
  }
  this.player1.body.velocity.x=-100;
  player1Display.destroy()
  player1DisplayInfo.destroy()
}  
  }
}