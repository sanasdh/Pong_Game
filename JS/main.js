const config = {
  type: Phaser.AUTO,
  parent: 'pong',
  width: "80%",
  height:"80%",
physics:{
  default: 'arcade',
  arcade: {gravity:false}
}
}

const game= new Phaser.Game(config)
