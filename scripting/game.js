//figure out hero sprite
//get things moving
//incorporate joker baddie or do jumping 

//figure out what's colission or what the player has to do 

function preload() {
    this.load.image('background', '../img/myGame/background/dark.webp');
    this.load.image('batSignal', '../img/myGame/background/test.png')
    this.load.image('batman', '../img/myGame/sprites/batman_moves.gif')
    this.load.image('baddie', '../img/myGame/sprites/joker_sprite2.png');
    //add obstacles
}

const gameState = {};
let ground1;

function create() {
    const bg = this.add.sprite(590, 300, 'background');
    const signal = this.add.sprite(310, 115, 'batSignal');
    const myHero = this.physics.add.sprite(0, 150, 'batman');
    signal.setScale(0.6);

    //creates rectangle for player to move across
    // const rectWidth = 2199;
    // const rectHeight = 120;
    // const rectColor = 0x1c2324;
    // const ground1 = this.add.rectangle(0, 440, rectWidth, rectHeight, rectColor);

    const rectWidth = 2199;
    const rectHeight = 120;
    const rectColor = 0x1c2324;
    const ground1 = this.physics.add.staticGroup();
    myHero.setCollideWorldBounds(true);
    //const ground = ground1.create(0, 440, null);
    //ground.body.setSize(rectWidth, rectHeight);
    const ground = this.add.rectangle(0, 440, rectWidth, rectHeight, rectColor);
    ground1.add(ground);
    myHero.setCollideWorldBounds(true);
    this.physics.add.collider(myHero, ground1);

    const barWidth = 150;
    const barHeight = 60;
    const barColor = 0xcfd3d4;
    const street = this.add.rectangle(50, 430, barWidth, barHeight, barColor);
    //decorates bars on rectangle for aesthetics
    const street2 = this.add.rectangle(300, 430, barWidth, barHeight, barColor);

    const street3 = this.add.rectangle(550, 430, barWidth, barHeight, barColor);

    const street4 = this.add.rectangle(800, 430, barWidth, barHeight, barColor);

    const street5 = this.add.rectangle(1050, 430, barWidth, barHeight, barColor);
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
            gravity: {y: 300}, //higher number indicates affect of gravity 
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
