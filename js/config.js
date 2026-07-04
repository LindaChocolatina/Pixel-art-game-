const gameConfig = {
    type: Phaser.AUTO,
    width: 400,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [BootScene, MenuScene, GameScene, GameOverScene],
    backgroundColor: '#ffe6f0',
    render: {
        pixelArt: true,
        antialias: false
    }
};