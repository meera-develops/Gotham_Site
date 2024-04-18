//make the canvas run infinitely
//add collisions
//add game over screen
//count points 

//at this point i could do spaceInvaeders or endless runner

class gameScene extends Phaser.Scene {
    constructor() {
        super({key: 'gameScene'})
        this.ground1 = null;
        this.hero = null;
        this.joker = null;
        this.jumps = 0;
        this.platforms;
        this.lastPlatformX = 0;
    }
    preload() {
        this.load.image('background', '../img/myGame/background/dark.webp');
        this.load.image('batSignal', '../img/myGame/background/test.png')
        this.load.spritesheet('batman', '../img/myGame/sprites/batman_animate2.png', {frameWidth: 162, frameHeight: 148})
        this.load.image('baddie', '../img/myGame/sprites/joker_sprite.png');
        this.load.image('obstaclePie', '../img/myGame/pie.png');
        // var imageList = ['background', 'batSignal'];
        // var len = imageList.length;
        // for (var i = 0; i < len; i++) {
        //     var key = imageList[i];
        //     if (key == 'background') {var path = '../img/myGame/background/' + key + ".webp";
        //     } if ( key == 'batSignal') {
        //         var path = '../img/myGame/background/' + key + ".png"
        //     }
        //     gameScene.load.image(key,path) 
        // }
    }
    create() {
        // window.addEventListener('resize', resize);
        // resize();

        // this.group1 = this.makeGroup();
        // this.group2 = this.makeGroup();
        // this.group2.x = game.width;
    
        const bg = this.add.sprite(590, 300, 'background');
        const signal = this.add.sprite(310, 115, 'batSignal');
        signal.setScale(0.6);
        this.myHero = this.physics.add.sprite(0, 309, 'batman');
        this.joker = this.physics.add.sprite(1030, 299, 'baddie');
        this.joker.setScale(0.7);

        this.anims.create({
            key: 'batman_moves',
            frames: this.anims.generateFrameNumbers('batman', { start: 0, end: 11}),
            frameRate: 26,
            repeat: -1,

        })

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('batman', { start: 0, end: 0}),
            frameRate: 1,
            repeat: -1
        })
    
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
        this.myHero.setVelocityX(300);
        this.myHero.anims.play('batman_moves', true);

        if (this.myHero.body.touching.down) {
            this.myHero.anims.play('batman_moves', true);
        } else {
            this.myHero.anims.stop()
        }
    
        if (gameState.cursors.space.isDown && !this.spaceWasDown && this.jumps < 2) {
            this.myHero.setVelocityY(-200);
            this.jumps++;
            this.myHero.anims.play('idle', true);
            console.log('space pressed');
            console.log('%d', this.jumps);
        } this.spaceWasDown = gameState.cursors.space.isDown; 
        if (this.myHero.body.touching.down && !this.wasTouchingGround) {
            this.jumps = 0;
            console.log('touching ground');
            this.wasTouchingGround = true;
        } else if (!this.myHero.body.touching.down) {
            this.wasTouchingGround = false;
        }    
    }
    // makeGroup() {
    //     var g = game.add.group()
    //     var bg = g.create(0, 0, "background");
    //     bg.height = game.height;
    //     bg.width = game.width;
    //     //var ground = g.create(0, game.height - 48, "ground");
    //     var signal = g.create( 310, 115, "batSignal")
    //     g.width = game.width
    //     g.scale.y = g.scale.x;
    //     return g;
        
    // }
}