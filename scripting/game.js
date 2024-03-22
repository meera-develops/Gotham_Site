function preload() {
    this.load.image('background', '../img/myGame/background/dark.webp');
    //add character images
    //add obstacles
}

const gameState = {};

function create() {
    this.add.sprite(590, 300, 'background');
}

function update() {

}

const config = {
    type: Phaser.AUTO,
    width: 1100,
    height: 480,
    parent: 'game-container',
    
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 200},
            enableBody: true,
        }
    },
    scene: {
        preload, 
        create, 
        update
    }
};

const game = new Phaser.Game(config);
