//Created by Meera Bhola in Mar 2024
//First Portfolio Project
const gameState = {
    score: 0
};



const config = {
    type: Phaser.AUTO,
    // scale: {
    //     mode: Phaser.Scale.FIT,
    //     parent: 'game-container',
    //     autoCenter: Phaser.Scale.CENTER_BOTH,
    //     width: 1100, 
    //     height: 480
    // },
    width: 1100,
    height: 480,
    parent: 'game-container',
    
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300}, //higher number indicates affect of gravity 
            enableBody: true,
        }
    },
    scene: [startScene, gameScene]
};

const game = new Phaser.Game(config);

// function resize() {
//     var canvas = game.canvas, width = window.innerWidth, height = window.innerHeight;
//     var wratio = width / height, ratio = canvas.width / canvas.height;

//     if (wratio < ratio) {
//         canvas.style.width = width + 'px';
//         canvas.style.height = (width / ratio) + 'px';
//     } else {
//         canvas.style.width = (height * ratio) + 'px';
//         canvas.style.height = height + 'px';
//     }
// }
