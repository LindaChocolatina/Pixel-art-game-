# River Raid Dulce 🍫🍬

Un videojuego inspirado en el clásico River Raid de Carol Shaw, con una temática deliciosa de dulces y colores pastel.

## Descripción del Juego

Navega tu barco por un río de chocolate, evitando enemigos (gomitas) y obstáculos mientras recoges caramelos para ganar puntos. A medida que subes de nivel, la dificultad aumenta.

## Características

✨ **Mecánicas de Juego:**
- Movimiento lateral del barco con flechas de teclado
- Sistema de disparo contra enemigos
- Múltiples niveles con dificultad progresiva
- Sistema de vidas (pierdes vidas al chocar con enemigos u obstáculos)
- Power-ups para recuperar vidas y ganar puntos extra
- Pausa durante el juego (tecla P)

🎨 **Estética:**
- Pixel art con colores pastel
- Temática de dulces: río de chocolate, enemigos gomitas, disparos de caramelo, obstáculos de dulce
- Interfaz intuitiva y atractiva

📊 **Sistema de Puntuación:**
- Enemigos eliminados: +10 puntos
- Power-ups recolectados: +25 puntos + vida extra
- Cambio de nivel cada 100 puntos
- Niveles progresivamente más difíciles

## Controles

- **← →** : Mover el barco a izquierda/derecha
- **ESPACIO** : Disparar
- **P** : Pausa/Reanudar
- **Click en botones** : Interactuar con menús

## Cómo Jugar

1. Abre `index.html` en un navegador web moderno
2. Desde el menú principal, presiona ESPACIO o haz click en JUGAR
3. Usa las flechas para moverte
4. Presiona ESPACIO para disparar a los enemigos
5. Evita los obstáculos
6. Recoge caramelos para ganar puntos y vidas extra
7. Intenta llegar lo más lejos posible

## Tecnología

- **Phaser 3** - Motor de juegos 2D
- **JavaScript** - Lógica del juego
- **HTML5 Canvas** - Renderizado de gráficos

## Archivos del Proyecto

```
├── index.html              # Página principal
├── js/
│   ├── main.js            # Punto de entrada
│   ├── config.js          # Configuración de Phaser
│   └── scenes/
│       ├── BootScene.js   # Carga de recursos y gráficos
│       ├── MenuScene.js   # Pantalla de menú
│       ├── GameScene.js   # Lógica principal del juego
│       └── GameOverScene.js # Pantalla de fin de juego
└── README.md              # Este archivo
```

## Créditos

Inspiración: River Raid (1982) por Carol Shaw
Desarrollado con Phaser 3

## Licencia

MIT