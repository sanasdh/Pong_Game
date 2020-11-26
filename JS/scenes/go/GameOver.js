class GameOver extends Phaser.Scene {
  constructor(){
    super("GameOver")
  }
  preload(){
    console.log("here!!!! go");
    this.load.image("btn1","../../../Images/btn2.png")

  }
    create(){
      emitter =new Phaser.Events.EventEmitter();

      gameOver=this.add.text(game.config.width/2,game.config.height/3,'GAME OVER',{
        font: "64px 'VT323'",
        fill:"white",
        align: "center"
      })
     this.msg=this.add.text(game.config.width/2,game.config.height/2,`${won} Won \n  ${lost}`,{
        font: "32px 'VT323'",
        fill:"white",
        align: "center"
      })
      gameOver.setOrigin(.5,.5)
      this.msg.setOrigin(.5,.5)
      let x=game.config.width/4
      let x2=game.config.width*3/4
      let y=game.config.height*3/4
      
      let playAgain= new FlatButton({scene:this, key:'btn1', text:'Play Again',x,y, event:'playAgain'})
      let home= new FlatButton({scene:this, key:'btn1', text:'Home',x:x2,y, event:'home'})
      emitter.on('playAgain', this.playAgain, this);
      emitter.on('home', this.home, this);
    }
    playAgain(){
      if(lost=="Better luck Player1"||lost=="Better luck Player2"){
        this.scene.start("SceneMainPlayer")
      } else if(lost=="Don't take it personally Player1"||lost=="You deafeted the MACHINE!"){
        this.scene.start("DifficultyScene")
      }
        }
        home(){
      this.scene.start("PlayerScene")
      
        }
}