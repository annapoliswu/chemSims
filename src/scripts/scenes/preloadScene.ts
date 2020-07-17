export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload(){
    this.load.image('beaker','assets/beaker800ml.png');
    this.load.image('beakerFill','assets/beaker800ml_fill.png');
    this.load.image('scale','assets/scale.png' )
  }

  create() {
    this.scene.start('SelectionScene');
    //this.scene.start('WaterScene');
  }
}
