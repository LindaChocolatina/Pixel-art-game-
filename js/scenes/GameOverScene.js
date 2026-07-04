class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    init(data) {
        this.finalScore = data.score || 0;
        this.finalLevel = data.level || 1;
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xFFE6F0, 1);
        graphics.fillRect(0, 0, width, height);
        graphics.generateTexture('gameOverBg', width, height);
        graphics.destroy();
        this.add.image(width / 2, height / 2, 'gameOverBg');

        this.add.text(width / 2, 80, '¡GAME OVER!', {
            font: 'bold 40px Arial',
            fill: '#FF1493',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(width / 2, 180, `Puntuación Final: ${this.finalScore}`, {
            font: 'bold 24px Arial',
            fill: '#8B4513',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(width / 2, 240, `Nivel Alcanzado: ${this.finalLevel}`, {
            font: 'bold 24px Arial',
            fill: '#8B4513',
            align: 'center'
        }).setOrigin(0.5);

        const retryButton = this.add.rectangle(width / 2, 380, 140, 50, 0xFFB6D9);
        retryButton.setStrokeStyle(3, 0xFF69B4);
        retryButton.setInteractive();
        retryButton.on('pointerover', () => {
            retryButton.setFillStyle(0xFF69B4);
        });
        retryButton.on('pointerout', () => {
            retryButton.setFillStyle(0xFFB6D9);
        });
        retryButton.on('pointerdown', () => {
            this.scene.start('Game');
        });

        this.add.text(width / 2, 380, 'REINTENTAR', {
            font: 'bold 16px Arial',
            fill: '#FFFFFF'
        }).setOrigin(0.5);

        const menuButton = this.add.rectangle(width / 2, 460, 140, 50, 0xC8E6C9);
        menuButton.setStrokeStyle(3, 0x81C784);
        menuButton.setInteractive();
        menuButton.on('pointerover', () => {
            menuButton.setFillStyle(0x81C784);
        });
        menuButton.on('pointerout', () => {
            menuButton.setFillStyle(0xC8E6C9);
        });
        menuButton.on('pointerdown', () => {
            this.scene.start('Menu');
        });

        this.add.text(width / 2, 460, 'MENÚ', {
            font: 'bold 16px Arial',
            fill: '#FFFFFF'
        }).setOrigin(0.5);

        this.add.text(width / 2, 550, 'Presiona ESPACIO para reintentar', {
            font: '12px Arial',
            fill: '#8B4513',
            align: 'center'
        }).setOrigin(0.5);

        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('Game');
        });
    }
}