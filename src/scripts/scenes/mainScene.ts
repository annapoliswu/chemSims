import ExampleObject from '../objects/exampleObject';
import Glassware from "../objects/glassware";
import { GameObjects } from 'phaser';

/*
const WIDTH
const HEIGHT 
*/
export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  glassware : Glassware;
  glasswareGroup;

  addButton: GameObjects.Text;
  minusButton;
  graphics;
  fillImage;
  mask;
  constructor() {
    super({ key: 'MainScene' });
  }
  
  create() {
    let x = 500;
    let y = 300;
    this.glassware = new Glassware(this, x, y, "beaker").setDepth(99);
    
    this.graphics = this.add.graphics();
    //this.graphics.fillStyle(0xff00ff, 1);
    this.fillImage = new GameObjects.Sprite(this, x,y,this.glassware.glasstype+'Fill');
    let w = this.fillImage.width*2;
    let maskShape = this.graphics.fillRoundedRect(x-w/2, y- this.fillImage.height/2, w , this.fillImage.height, { tl: 0, tr: 0, bl: w/2, br: w/2 });
    
    this.mask = this.fillImage.createGeometryMask(this.graphics);
    this.mask.invertAlpha = true;
    this.fillImage.setMask(this.mask);
    //this.fillImage.clearMask(); //mask off of lineart for some reason
    maskShape.y-=100;

    this.add.existing(this.fillImage);

    //let graphics2 = this.add.graphics();
    this.addButton = this.add.text(700, 200, 'ADD WATER', { backgroundColor: '#000', padding:20})
      .on('pointerover', () => {this.buttonHover(this.addButton)})
      .on('pointerout', () => {this.buttonRest(this.addButton)})
      .on('pointerdown', () => {this.buttonDown(this.addButton)})
      .on('pointerup', () => {
        //addwater
        this.buttonHover(this.addButton);
      });
    this.addButton.setInteractive();

    this.minusButton = this.add.text(700, 300, 'SUBTRACT WATER', { backgroundColor: '#000', padding:20})
    .on('pointerover', () => {this.buttonHover(this.minusButton)})
    .on('pointerout', () => {this.buttonRest(this.minusButton)})
    .on('pointerdown', () => {this.buttonDown(this.minusButton)})
    .on('pointerup', () => {
      //addwater
      this.buttonHover(this.minusButton);
    });
    this.minusButton.setInteractive();
  }


  update() {
  }

  
  buttonHover(button){
    button.setStyle({backgroundColor:'#00CCCC'});
  }
  buttonRest(button){
    button.setStyle({backgroundColor:'#000'});
  }
  buttonDown(button){
    button.setStyle({backgroundColor:'#00AAAA'});
  }
}
