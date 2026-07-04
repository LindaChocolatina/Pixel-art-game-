class MenuScene extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xFFE6F0, 1);
        graphics.fillRect(0, 0, width, height);
        graphics.generateTexture('menuBg', width, height);
        graphics.destroy();
        this.add.image(width / 2, height / 2, 'menuBg');

        this.add.text(width / 2, 80, '🍫 River Raid Dulce 🍬', {
            font: 'bold 32px Arial',
            fill: '#8B4513',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(width / 2, 150, 'Navega por un río de chocolate\nevitando enemigos y recogiendo caramelos', {
            font: '14px Arial',
            fill: '#A0522D',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(width / 2, 250, 'CONTROLES:', {
            font: 'bold 18px Arial',
            fill: '#8B4513',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(width / 2, 290, '← → Moverse\nESPACIO Disparar\nP Pausa', {
            font: '14px Arial',
            fill: '#A0522D',
            align: 'center'
        }).setOrigin(0.5);

        const playButton = this.add.rectangle(width / 2, 420, 120, 50, 0xFFB6D9);
        playButton.setStrokeStyle(3, 0xFF69B4);
        playButton.setInteractive();
        playButton.on('pointerover', () => {
            playButton.setFillStyle(0xFF69B4);
        });
        playButton.on('pointerout', () => {
            playButton.setFillStyle(0xFFB6D9);
        });
        playButton.on('pointerdown', () => {
            this.scene.start('Game');
        });

        this.add.text(width / 2, 420, 'JUGAR', {
            font: 'bold 18px Arial',
            fill: '#FFFFFF'
        }).setOrigin(0.5);

        this.add.text(width / 2, 530, 'Presiona ESPACIO o haz click en JUGAR', {
            font: '12px Arial',
            fill: '#8B4513',
            align: 'center'
        }).setOrigin(0.5);

        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('Game');
        });
    }
}