class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    init() {
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.gameOver = false;
        this.gamePaused = false;
        this.lastShotTime = 0;
    }

    create() {
        this.add.image(200, 300, 'river');

        // Inicializar SoundManager
        this.soundManager = new SoundManager(this);
        this.soundManager.playGameMusic();

        this.player = this.physics.add.sprite(200, 550, 'player');
        this.player.setBounce(0);
        this.player.setCollideWorldBounds(true);

        this.enemies = this.physics.add.group();
        this.projectiles = this.physics.add.group();
        this.powerUps = this.physics.add.group();
        this.obstacles = this.physics.add.group();

        this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this);
        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemyWithProjectile, null, this);
        this.physics.add.overlap(this.player, this.powerUps, this.collectPowerUp, null, this);
        this.physics.add.overlap(this.player, this.obstacles, this.hitObstacle, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        this.scoreText = this.add.text(10, 10, `Puntuación: ${this.score}`, {
            font: 'bold 16px Arial',
            fill: '#FFFFFF',
            backgroundColor: '#8B4513',
            padding: { x: 8, y: 4 }
        });

        this.levelText = this.add.text(10, 35, `Nivel: ${this.level}`, {
            font: 'bold 16px Arial',
            fill: '#FFFFFF',
            backgroundColor: '#8B4513',
            padding: { x: 8, y: 4 }
        });

        this.livesText = this.add.text(10, 60, `Vidas: ${this.lives}`, {
            font: 'bold 16px Arial',
            fill: '#FFFFFF',
            backgroundColor: '#8B4513',
            padding: { x: 8, y: 4 }
        });

        this.enemySpawner = this.time.addTimer({
            delay: 800 - (this.level * 50),
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });

        this.powerUpSpawner = this.time.addTimer({
            delay: 3000,
            callback: this.spawnPowerUp,
            callbackScope: this,
            loop: true
        });

        this.obstacleSpawner = this.time.addTimer({
            delay: 2000,
            callback: this.spawnObstacle,
            callbackScope: this,
            loop: true
        });
    }

    update() {
        if (this.gameOver || this.gamePaused) return;

        this.player.setVelocity(0, 0);
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-250);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(250);
        }

        if (this.spaceKey.isDown) {
            this.shoot();
        }

        if (Phaser.Input.Keyboard.JustDown(this.pKey)) {
            this.togglePause();
        }

        this.projectiles.children.entries.forEach(projectile => {
            if (projectile.y < 0) {
                projectile.destroy();
            }
        });

        this.enemies.children.entries.forEach(enemy => {
            if (enemy.y > 600) {
                enemy.destroy();
            }
        });

        this.powerUps.children.entries.forEach(powerUp => {
            if (powerUp.y > 600) {
                powerUp.destroy();
            }
        });

        this.obstacles.children.entries.forEach(obstacle => {
            if (obstacle.y > 600) {
                obstacle.destroy();
            }
        });
    }

    spawnEnemy() {
        if (this.gameOver) return;
        
        const x = Phaser.Math.Between(30, 370);
        const enemyType = Phaser.Math.Between(1, 4);
        const enemyData = this.getEnemyData(enemyType);
        
        const enemy = this.enemies.create(x, -30, enemyData.texture);
        enemy.setVelocityY(enemyData.speed + (this.level * 20));
        enemy.setBounce(0);
        enemy.enemyType = enemyType;
        enemy.displayWidth = enemyData.width;
        enemy.displayHeight = enemyData.height;
    }

    getEnemyData(type) {
        const enemyData = {
            1: { texture: 'enemy1', width: 20, height: 20, speed: 150, points: 10 },
            2: { texture: 'enemy2', width: 24, height: 24, speed: 130, points: 15 },
            3: { texture: 'enemy3', width: 18, height: 18, speed: 170, points: 12 },
            4: { texture: 'enemy4', width: 28, height: 28, speed: 100, points: 20 }
        };
        return enemyData[type];
    }

    spawnPowerUp() {
        if (this.gameOver) return;
        
        if (Math.random() > 0.7) {
            const x = Phaser.Math.Between(30, 370);
            const powerUp = this.powerUps.create(x, -10, 'powerup');
            powerUp.setVelocityY(100);
            powerUp.setBounce(0);
        }
    }

    spawnObstacle() {
        if (this.gameOver) return;
        
        if (Math.random() > 0.6) {
            const x = Phaser.Math.Between(50, 350);
            const obstacle = this.obstacles.create(x, -10, null);
            
            const graphics = this.make.graphics({ x: 0, y: 0, add: false });
            graphics.fillStyle(0xC71585, 1);
            graphics.fillRect(0, 0, 14, 14);
            graphics.generateTexture('obstacle', 14, 14);
            graphics.destroy();
            
            obstacle.setTexture('obstacle');
            obstacle.setVelocityY(120 + (this.level * 15));
            obstacle.setBounce(0);
        }
    }

    shoot() {
        const now = this.time.now;
        if (now - this.lastShotTime < 200) return; // Limitar cadencia de disparo
        
        this.lastShotTime = now;
        
        if (this.projectiles.children.entries.length > 5) return;
        
        const projectile = this.projectiles.create(this.player.x, this.player.y - 15, null);
        
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xFFD700, 1);
        graphics.fillRect(0, 0, 4, 10);
        graphics.generateTexture('projectile', 4, 10);
        graphics.destroy();
        
        projectile.setTexture('projectile');
        projectile.setVelocityY(-300);
        
        // Sonido de disparo
        this.soundManager.playShoot();
    }

    hitEnemy(player, enemy) {
        enemy.destroy();
        this.lives--;
        this.livesText.setText(`Vidas: ${this.lives}`);
        
        // Sonido de daño
        this.soundManager.playDamage();
        
        if (this.lives <= 0) {
            this.endGame();
        }
    }

    hitEnemyWithProjectile(projectile, enemy) {
        projectile.destroy();
        const enemyType = enemy.enemyType || 1;
        const enemyData = this.getEnemyData(enemyType);
        const points = enemyData.points;
        
        enemy.destroy();
        this.score += points;
        this.scoreText.setText(`Puntuación: ${this.score}`);
        
        // Sonido de enemigo eliminado
        this.soundManager.playEnemyHit();
        
        if (this.score > 0 && this.score % 100 === 0) {
            this.levelUp();
        }
    }

    collectPowerUp(player, powerUp) {
        powerUp.destroy();
        this.score += 25;
        this.lives = Math.min(this.lives + 1, 5);
        this.scoreText.setText(`Puntuación: ${this.score}`);
        this.livesText.setText(`Vidas: ${this.lives}`);
        
        // Sonido de power-up
        this.soundManager.playPowerUpCollect();
    }

    hitObstacle(player, obstacle) {
        obstacle.destroy();
        this.lives--;
        this.livesText.setText(`Vidas: ${this.lives}`);
        
        // Sonido de daño
        this.soundManager.playDamage();
        
        if (this.lives <= 0) {
            this.endGame();
        }
    }

    levelUp() {
        this.level++;
        this.levelText.setText(`Nivel: ${this.level}`);
        this.enemySpawner.delay = Math.max(300, 800 - (this.level * 50));
        
        // Sonido de level up
        this.soundManager.playLevelUp();
    }

    togglePause() {
        this.gamePaused = !this.gamePaused;
        this.physics.pause();
        
        if (this.gamePaused) {
            this.add.text(200, 300, 'PAUSA', {
                font: 'bold 48px Arial',
                fill: '#FFFFFF',
                backgroundColor: '#000000',
                padding: { x: 20, y: 20 },
                align: 'center'
            }).setOrigin(0.5).setName('pauseText');
        } else {
            this.children.getByName('pauseText')?.destroy();
            this.physics.resume();
        }
    }

    endGame() {
        this.gameOver = true;
        this.physics.pause();
        
        // Sonido de game over
        this.soundManager.playGameOver();
        
        this.scene.start('GameOver', { score: this.score, level: this.level });
    }

    shutdown() {
        this.soundManager = null;
    }
}