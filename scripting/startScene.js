class startScene extends Phaser.Scene {
    constructor() {
        super({ key: 'startScene'})
    }
    create() {
		// this.cameras.main.setBackgroundColor('#A7B8BF');
		this.cameras.main.setBackgroundColor('#0000');
		this.add.text( 350, 235, 'Click to start!', {fill: '#ffffff', fontSize: '45px'})
		this.input.on('pointerdown', () => {
			this.scene.stop('startScene')
			this.scene.start('gameScene')
		})
	}
}