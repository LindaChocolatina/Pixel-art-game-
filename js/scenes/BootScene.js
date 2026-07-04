class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        this.createPlayerGraphics();
        this.createEnemyGraphics();
        this.createPowerUpGraphics();
        this.createRiverGraphics();
    }

    create() {
        this.scene.start('Menu');
    }

    createPlayerGraphics() {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xFF69B4, 1);
        graphics.fillRect(0, 0, 16, 24);
        graphics.fillStyle(0xFFB6D9, 1);
        graphics.fillRect(2, 2, 12, 8);
        graphics.fillStyle(0xFFD700, 1);
        graphics.fillRect(6, 10, 4, 6);
        graphics.generateTexture('player', 16, 24);
        graphics.destroy();
    }

    createEnemyGraphics() {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xFF6B9D, 1);
        graphics.fillRect(0, 0, 12, 12);
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillRect(2, 2, 3, 3);
        graphics.fillRect(7, 2, 3, 3);
        graphics.generateTexture('enemy', 12, 12);
        graphics.destroy();
    }

    createPowerUpGraphics() {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xFFD700, 1);
        graphics.fillRect(0, 0, 10, 10);
        graphics.fillStyle(0xFFA500, 1);
        graphics.fillRect(2, 2, 6, 6);
        graphics.generateTexture('powerup', 10, 10);
        graphics.destroy();
    }

    createRiverGraphics() {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0x8B4513, 1);
        graphics.fillRect(0, 0, 400, 600);
        graphics.fillStyle(0xD2691E, 1);
        graphics.fillRect(0, 0, 400, 10);
        graphics.generateTexture('river', 400, 600);
        graphics.destroy();
    }
}