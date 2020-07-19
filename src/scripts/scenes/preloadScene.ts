export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload(){
    this.load.image('beaker','src/assets/beaker800ml.png');
    this.load.image('beakerFill','src/assets/beaker800ml_fill.png');
    this.load.image('scale','src/assets/scale.png' );
    this.load.html('form', 'src/scripts/objects/form.html');
  }

  create() {
    //this.scene.start('SelectionScene');
    //this.scene.start('WaterScene');
    this.scene.start('WeighScene');
  }
}
