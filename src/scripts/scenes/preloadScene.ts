export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload(){
    this.load.image('beaker','assets/beaker800ml.png');
    this.load.image('beakerFill','assets/beaker800ml_fill.png');
  }

  create() {
    this.scene.start('MainScene');
  }
}
