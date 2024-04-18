//let's try fighting game 

class gameScene extends Phaser.Scene {
    constructor() {
        super({key: 'gameScene'})
        this.ground1 = null;
        this.hero = null;
        this.joker = null;
        this.jumps = 0;
        const gameState = {
            score: 0
        };
    }
    preload() {
        this.load.image('background', '../img/myGame/background/dark.webp');
        this.load.image('batSignal', '../img/myGame/background/test.png')
        this.load.spritesheet('batman', '../img/myGame/sprites/batman_animate2.png', {frameWidth: 162, frameHeight: 148})
        this.load.image('baddie', '../img/myGame/sprites/joker_sprite.png');
        // this.load.image('bar_full', '../img/myGame/objects/bar_0.png');
        // this.load.image('bar_1', '../img/myGame/objects/bar_1.png');
        // this.load.image('bar_2', '../img/myGame/objects/bar_2.png');
        // this.load.image('bar_3', '../img/myGame/objects/bar_3.png');
        // this.load.image('bar_4', '../img/myGame/objects/bar_4.png');
        // this.load.image('bar_5', '../img/myGame/objects/bar_5.png');
        this.load.image('pie', '../img/myGame/objects/pie.png');
    }

    create() {
        // window.addEventListener('resize', resize);
        // resize();

        const bg = this.add.sprite(590, 300, 'background');
        const signal = this.add.sprite(310, 115, 'batSignal');
        const pies = this.physics.add.group();
        // pies.children.iterate(function (pie) {
        //     var pieWidth = pie.width / 2;
        //     var pieHeight = pie.height / 2;
        //     var offsetPX = (pie.width - pieWidth) / 2;
        //     var offsetPY = (pie.height - pieHeight) / 2;
        //     pie.body.setSize(pieWidth, pieHeight);
        //     pie.body.setOffset(offsetPX, offsetPY);
        // });
        
        function pieGenerator() {
            var xcoord = Math.random() * 975;
            var myPie = pies.create(xcoord, 10, 'pie')
            myPie.setScale(0.6);

            // Adjust collision box size and offset
            var newWidth = myPie.width * 0.6; 
            var newHeight = myPie.height * 0.6;

            // Adjust collision box offset to make it tighter on the top and bottom
            var topOffset = 0.1 * newHeight; // Adjust the value as needed
            var bottomOffset = 0.1 * newHeight; // Adjust the value as needed

            var offsetX = (myPie.width - newWidth) / 2;
            var offsetY = topOffset; // Set the offset to the top

            myPie.body.setSize(newWidth, newHeight - topOffset - bottomOffset); // Subtracting top and bottom offsets
            myPie.body.setOffset(offsetX, offsetY);
        }
        const pieLoop = this.time.addEvent({
            delay: 200,
            callback: pieGenerator,
            callbackScope: this,
            loop: true
        })
    
        signal.setScale(0.6);
        this.myHero = this.physics.add.sprite(0, 309, 'batman');
        var batmanWidth = this.myHero.width / 2;
        var batmanHeight = this.myHero.height;
        var yOffset = 2;
        var offsetX = (this.myHero.width - batmanWidth) / 2;
        var offsetY = this.myHero.height - batmanHeight - yOffset; 
        this.myHero.body.setSize(batmanWidth, batmanHeight);
        this.myHero.body.setOffset(offsetX, offsetY);
        this.joker = this.physics.add.sprite(1030, 299, 'baddie');
        this.joker.setScale(0.7);
        this.joker.flipX = true;

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
        gameState.scoreText = this.add.text(460, 25, 'Score: 0', { fontSize: '25px', fill: '#FFFFFF' });
        this.myHero.setCollideWorldBounds(true);
        this.joker.setCollideWorldBounds(true);
        this.physics.add.collider(this.myHero, this.ground1);
        this.physics.add.collider(this.joker, this.ground1);
        this.physics.add.collider(pies, this.ground1, function(pie) {
            pie.destroy();
            gameState.score += 5;
            gameState.scoreText.setText( `Score: ${gameState.score}`)
        });
        this.physics.add.collider(this.myHero, pies, () => {
            this.myHero.anims.stop();
            pieLoop.destroy();
            this.physics.pause();
            this.add.text(460, 250, 'Game Over', { fontSize: '30px', fill: '#ffffff' });
        })
        
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
            this.myHero.setVelocityX(-300);
            this.myHero.anims.play('batman_moves', true);
            this.myHero.flipX = true;
        } else if (gameState.cursors.right.isDown) {
            this.myHero.setVelocityX(300);
            this.myHero.anims.play('batman_moves', true);
            this.myHero.flipX = false;
        }
        else {
            this.myHero.setVelocityX(0);
            this.myHero.anims.play('idle', true);
        }

        if (this.myHero.body.touching.down) {
            if (gameState.cursors.left.isDown || gameState.cursors.right.isDown) {
                this.myHero.anims.play('batman_moves', true);
            } else {
                this.myHero.anims.play('idle', true);
            }
        } else {
            this.myHero.anims.stop()
        }
    
        // if ((gameState.cursors.space.isDown || gameState.cursors.up.isDown) && !this.spaceWasDown && this.jumps < 2) {
        //     this.myHero.setVelocityY(-200);
        //     this.jumps++;
        //     this.myHero.anims.play('idle', true);
        //     console.log('space pressed');
        //     console.log('%d', this.jumps);
        // } this.spaceWasDown = gameState.cursors.space.isDown || gameState.cursors.up.isDown; 
        // if (this.myHero.body.touching.down && !this.wasTouchingGround) {
        //     this.jumps = 0;
        //     console.log('touching ground');
        //     this.wasTouchingGround = true;
        // } else if (!this.myHero.body.touching.down) {
        //     this.wasTouchingGround = false;
        // }  
    }
}