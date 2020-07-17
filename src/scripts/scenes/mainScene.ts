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
