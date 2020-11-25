let emitter;
let score1=0, score2=0;
let score1Display, score2Display;
let player1Display, player2Display, player1DisplayInfo, player2DisplayInfo;
let gameOver;
const config = {
  type: Phaser.AUTO,
  parent: 'pong',
  width: 750,
  height:450,
  // scale:{
  //   mode: Phaser.Scale.RESIZE,
  //   autoCenter: Phaser.Scale.CENTER_BOTH
  // },
physics:{
  default: 'arcade',
  arcade: {
    gravity:false,
  debug: true}
},
scene: [PlayerScene,DifficultyScene,EasyScene,SceneMainPlayer, GameOver]
}

const game= new Phaser.Game(config)
let emmiter;

