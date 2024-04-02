//add pie as collision objects
//going to shoot out of joker hands
//keep them running 
//batman has to jump over pies 

class gameScene extends Phaser.Scene {
    constructor() {
        super({key: 'gameScene'})
        this.ground1 = null;
        this.hero = null;
        this.joker = null;
        this.jumps = 0;
    }
    preload() {
        this.load.image('background', '../img/myGame/background/dark.webp');
        this.load.image('batSignal', '../img/myGame/background/test.png')
        this.load.image('batman', '../img/myGame/sprites/batman_crop.gif')
        this.load.image('baddie', '../img/myGame/sprites/joker_sprite.png');
        this.load.image('obstaclePie', '../img/myGame/pie.png');
        //add obstacles
    }
    create() {
        // window.addEventListener('resize', resize);
        // resize();
    
        const bg = this.add.sprite(590, 300, 'background');
        const signal = this.add.sprite(310, 115, 'batSignal');
        signal.setScale(0.6);
        this.myHero = this.physics.add.sprite(0, 280, 'batman');
        this.joker = this.physics.add.sprite(1030, 280, 'baddie');
        this.joker.setScale(0.7);
    
        gameState.cursors = this.input.keyboard.createCursorKeys();
    
        const rectWidth = 2199;
        const rectHeight = 120;
        const rectColor = 0x1c2324;
        this.ground1 = this.physics.add.staticGroup();
        const ground = this.add.rectangle(0, 440, rectWidth, rectHeight, rectColor);
        this.ground1.add(ground);
        this.myHero.setCollideWorldBounds(true);
        this.joker.setCollideWorldBounds(true);
        this.physics.add.collider(this.myHero, this.ground1);
        this.physics.add.collider(this.joker, this.ground1);
    
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
    update() {
        if (gameState.cursors.left.isDown) {
            this.myHero.setVelocityX(-160);
        } else if (gameState.cursors.right.isDown) {
            this.myHero.setVelocityX(200);
        }
        else {
            this.myHero.setVelocityX(0);
        }
    
        if (gameState.cursors.space.isDown && this.jumps < 3) {
            this.myHero.setVelocityY(-230);
            this.jumps++;
            console.log('space pressed');
            console.log('%d', this.jumps);
        } else if (this.myHero.body.touching.down) {
            this.jumps = 0;
            console.log('touching ground')//runs infinite amount of times right now 
        }
    }
}