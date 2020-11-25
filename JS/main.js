let emitter;
const config = {
  type: Phaser.AUTO,
  parent: 'pong',
  width: 800,
  height:500,
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
scene: [PlayerScene,DifficultyScene,EasyScene,SceneMainPlayer]
}

const game= new Phaser.Game(config)
let emmiter;

