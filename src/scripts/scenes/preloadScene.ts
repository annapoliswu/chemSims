export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload(){
    this.load.image('beaker800ml','assets/beaker800ml.png');
    this.load.image('beaker800mlFill','assets/beaker800ml_fill.png');
    
    this.load.image('beaker','assets/beaker50ml.png');
    this.load.image('beakerFill','assets/beaker50ml_fill.png');

    this.load.image('scale','assets/scale.png' );
    this.load.image('waterTable','assets/watertable.png' );

    this.load.html('form', 'assets/form.html');
    this.load.html('inputLine', 'assets/inputLine.html');
  }

  create() {
    this.scene.start('SelectionScene');
    //this.scene.start('WaterScene');
    //this.scene.start('WeighScene');
  }
}
