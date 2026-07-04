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
        // Enemigo 1: Gomita Grande (Rosa) - 20x20
        this.createGomitaGrande();
        
        // Enemigo 2: Malvavisco/Marshmallow (Blanco) - 24x24
        this.createMalvavisco();
        
        // Enemigo 3: Caramelo Salado (Marrón) - 18x18
        this.createCarameloSalado();
        
        // Enemigo 4: Cristal de Azúcar (Azul) - 28x28
        this.createCristalAzucar();
    }

    createGomitaGrande() {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        // Cuerpo principal
        graphics.fillStyle(0xFF6B9D, 1);
        graphics.fillCircle(10, 10, 8);
        
        // Ojos
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillRect(5, 7, 3, 3);
        graphics.fillRect(12, 7, 3, 3);
        
        // Brillo
        graphics.fillStyle(0xFFB6D9, 1);
        graphics.fillCircle(7, 8, 1);
        graphics.fillCircle(14, 8, 1);
        
        graphics.generateTexture('enemy1', 20, 20);
        graphics.destroy();
    }

    createMalvavisco() {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        
        // Cuerpo esponjoso (dos círculos)
        graphics.fillStyle(0xFFFAE6, 1);
        graphics.fillCircle(12, 12, 10);
        graphics.fillCircle(12, 8, 8);
        
        // Puntos rosados (textura)
        graphics.fillStyle(0xFFB6D9, 1);
        graphics.fillCircle(8, 10, 1);
        graphics.fillCircle(16, 10, 1);
        graphics.fillCircle(6, 14, 1);
        graphics.fillCircle(18, 14, 1);
        graphics.fillCircle(12, 5, 1);
        graphics.fillCircle(12, 20, 1);
        
        // Ojos
        graphics.fillStyle(0x000000, 1);
        graphics.fillRect(9, 11, 2, 2);
        graphics.fillRect(15, 11, 2, 2);
        
        graphics.generateTexture('enemy2', 24, 24);
        graphics.destroy();
    }

    createCarameloSalado() {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        
        // Forma de caramelo torcido
        graphics.fillStyle(0xD2691E, 1);
        graphics.fillRect(3, 4, 12, 10);
        graphics.fillCircle(5, 5, 2);
        graphics.fillCircle(13, 13, 2);
        
        // Cristales de sal (pequeños rectángulos)
        graphics.fillStyle(0xEFEFEF, 1);
        graphics.fillRect(6, 6, 1, 1);
        graphics.fillRect(10, 7, 1, 1);
        graphics.fillRect(8, 11, 1, 1);
        graphics.fillRect(12, 9, 1, 1);
        
        // Ojos amenazantes
        graphics.fillStyle(0x8B0000, 1);
        graphics.fillRect(7, 8, 1, 1);
        graphics.fillRect(11, 8, 1, 1);
        
        graphics.generateTexture('enemy3', 18, 18);
        graphics.destroy();
    }

    createCristalAzucar() {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        
        // Forma cristalina (rombo grande)
        graphics.fillStyle(0x87CEEB, 1);
        graphics.beginPath();
        graphics.moveTo(14, 2);
        graphics.lineTo(26, 14);
        graphics.lineTo(14, 26);
        graphics.lineTo(2, 14);
        graphics.closePath();
        graphics.fillPath();
        
        // Detalles cristalinos (líneas internas)
        graphics.fillStyle(0xE0F6FF, 1);
        graphics.fillTriangle(14, 2, 20, 8, 14, 8);
        graphics.fillTriangle(26, 14, 20, 20, 20, 14);
        graphics.fillTriangle(14, 26, 8, 20, 8, 26);
        graphics.fillTriangle(2, 14, 8, 8, 8, 14);
        
        // Ojos fríos (diamantes)
        graphics.fillStyle(0x0066CC, 1);
        graphics.fillTriangle(11, 12, 13, 11, 12, 13);
        graphics.fillTriangle(17, 12, 15, 11, 16, 13);
        
        graphics.generateTexture('enemy4', 28, 28);
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