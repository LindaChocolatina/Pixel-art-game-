class SoundManager {
    constructor(scene) {
        this.scene = scene;
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.masterVolume = 0.3;
    }

    // Sonido de disparo - Caramelo siendo lanzado
    playShoot() {
        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);
        gain.gain.setValueAtTime(this.masterVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        
        osc.start(now);
        osc.stop(now + 0.1);
    }

    // Sonido de enemigo eliminado - Colisión dulce
    playEnemyHit() {
        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);
        gain.gain.setValueAtTime(this.masterVolume * 0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        
        osc.start(now);
        osc.stop(now + 0.15);
    }

    // Sonido de power-up recolectado - Éxito mágico
    playPowerUpCollect() {
        const now = this.audioContext.currentTime;
        
        // Primer tono
        const osc1 = this.audioContext.createOscillator();
        const gain1 = this.audioContext.createGain();
        osc1.connect(gain1);
        gain1.connect(this.audioContext.destination);
        
        osc1.frequency.setValueAtTime(800, now);
        gain1.gain.setValueAtTime(this.masterVolume * 0.8, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        
        osc1.start(now);
        osc1.stop(now + 0.2);
        
        // Segundo tono (más agudo)
        const osc2 = this.audioContext.createOscillator();
        const gain2 = this.audioContext.createGain();
        osc2.connect(gain2);
        gain2.connect(this.audioContext.destination);
        
        osc2.frequency.setValueAtTime(1200, now + 0.1);
        gain2.gain.setValueAtTime(0, now);
        gain2.gain.setValueAtTime(this.masterVolume * 0.8, now + 0.1);
        gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        
        osc2.start(now + 0.1);
        osc2.stop(now + 0.3);
    }

    // Sonido de daño/colisión - Impacto
    playDamage() {
        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.3);
        gain.gain.setValueAtTime(this.masterVolume * 0.7, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        
        osc.start(now);
        osc.stop(now + 0.3);
    }

    // Sonido de Level Up - Ascenso
    playLevelUp() {
        const now = this.audioContext.currentTime;
        const frequencies = [523.25, 659.25, 783.99]; // Do, Mi, Sol
        
        frequencies.forEach((freq, index) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(this.audioContext.destination);
            
            osc.frequency.setValueAtTime(freq, now + index * 0.1);
            gain.gain.setValueAtTime(this.masterVolume * 0.6, now + index * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, now + index * 0.1 + 0.2);
            
            osc.start(now + index * 0.1);
            osc.stop(now + index * 0.1 + 0.2);
        });
    }

    // Sonido de Game Over - Dramático
    playGameOver() {
        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.8);
        gain.gain.setValueAtTime(this.masterVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
        
        osc.start(now);
        osc.stop(now + 0.8);
    }

    // Música de fondo - Loop suave para el juego
    playGameMusic() {
        // Se reproducirá continuamente con una melodía simple
        this.playGameMusicLoop();
    }

    playGameMusicLoop() {
        const now = this.audioContext.currentTime;
        const melody = [392, 440, 494, 392, 440, 494, 523, 494];
        const beatDuration = 0.3;
        
        melody.forEach((freq, index) => {
            const startTime = now + index * beatDuration;
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(this.audioContext.destination);
            
            osc.frequency.setValueAtTime(freq, startTime);
            gain.gain.setValueAtTime(this.masterVolume * 0.15, startTime);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + beatDuration * 0.8);
            
            osc.start(startTime);
            osc.stop(startTime + beatDuration);
        });
        
        // Loop cada 2.4 segundos
        setTimeout(() => {
            if (this.scene && !this.scene.isShuttingDown) {
                this.playGameMusicLoop();
            }
        }, melody.length * beatDuration * 1000);
    }

    setMasterVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
    }
}