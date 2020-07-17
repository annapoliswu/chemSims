import ExampleObject from '../objects/exampleObject';
import Glassware from "../objects/glassware";
import { GameObjects } from 'phaser';
import InteractiveButton from "../objects/interactiveButton";
import Beaker from '../objects/Beaker';



export default class MainScene extends Phaser.Scene {
  
  private WIDTH: number;
  private HEIGHT: number;

  private exampleObject: ExampleObject;
  glassware : Glassware;
  glasswareGroup;

  addButton: InteractiveButton;
  subtractButton: InteractiveButton;
  graphics;
  waterImage;
  mask;

  testtext;

  constructor() {
    super({ key: 'MainScene' });
  }
  
  create() {
    
    this.WIDTH = this.scale.width;
    this.HEIGHT = this.scale.height;
    let x = 500;
    let y = 300;
    this.glassware = new Beaker(this, x, y).setDepth(99);
    
    this.graphics = this.add.graphics();
    //this.graphics.fillStyle(0xff00ff, 1);
    this.waterImage = new GameObjects.Sprite(this, x,y,'beakerFill');

    let w = this.waterImage.width*2;
    let maskShape = this.graphics.fillRoundedRect(x-w/2, y- this.waterImage.height/2, w , this.waterImage.height, { tl: 0, tr: 0, bl: w/2, br: w/2 });
    
    this.mask = this.waterImage.createGeometryMask(this.graphics);
    this.mask.invertAlpha = true;
    this.waterImage.setMask(this.mask);
    //this.waterImage.clearMask(); //mask off of lineart for some reason
    maskShape.y-=100;

    this.add.existing(this.waterImage);


  this.testtext = this.add.text(700, 100, 'WATER: '+ this.glassware.waterAmount, { backgroundColor: '#AA0AAA', padding:20});

    this.addButton = new InteractiveButton(this,700,200,'ADD WATER').on('pointerup', () => {
        this.addButton.buttonHover();
        this.glassware.addWater();
    });

    this.subtractButton = new InteractiveButton(this,700,300,'SUBTRACT WATER').on('pointerup', () => {
      this.subtractButton.buttonHover();
      this.glassware.subtractWater();
  });


}
  


  update() {
    this.testtext.setText('WATER: '+this.glassware.waterAmount);
  }


}
