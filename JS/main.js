let emitter;
let score1=0, score2=0;
let score1Display, score2Display;
let player1Display, player2Display, player1DisplayInfo, player2DisplayInfo;
let gameOver;
let won, lost;
let levelspeed;
let player1Name, player2Name;
const config = {
  type: Phaser.AUTO,
  parent: 'pong',
  width: 750,
  height:450,
physics:{
  default: 'arcade',
  arcade: {
    gravity:false,
  debug: false}
},
scene: [PlayerScene,DifficultyScene,EasyScene,SceneMainPlayer, GameOver, StartScene]
}

const game= new Phaser.Game(config)
let emmiter;

