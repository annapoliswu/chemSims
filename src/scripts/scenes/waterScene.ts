import ExampleObject from '../objects/exampleObject';
import BaseScene from "./baseScene";
import Glassware from "../objects/glassware";
import InteractiveButton from "../objects/interactiveButton";
import Beaker from '../objects/Beaker';



export default class WaterScene extends BaseScene {

  private exampleObject: ExampleObject;
  glasswareGroup;

  addButton: InteractiveButton;
  subtractButton: InteractiveButton;
  nextSceneButton: InteractiveButton;

  testtext;

  graphics;
  waterImage;
  mask;


  constructor() {
    super('WaterScene');
  }

  init(data) {
    this.glasstype = data.glasstype;
  }

  create() {
    super.create();

    this.add.rectangle(this.WIDTH / 2, this.HEIGHT - 100, this.WIDTH, 200, 0x999999).setDepth(-99);

    let glassX = 4 * this.WIDTH / 7;
    let glassY = this.HEIGHT / 2 + 50;
    this.createGlassware(glassX, glassY);


    //buttons
    let buttonX = 3 * this.WIDTH / 4;
    this.addButton = new InteractiveButton(this, buttonX, 300, 'ADD WATER').on('pointerup', () => {
      this.addButton.buttonHover();
      this.glassware.addWater();
    });

    this.subtractButton = new InteractiveButton(this, buttonX, 375, 'SUBTRACT WATER').on('pointerup', () => {
      this.subtractButton.buttonHover();
      this.glassware.subtractWater();
    });

    this.nextSceneButton = new InteractiveButton(this, buttonX, 500, 'MOVE TO NEXT STEP').on('pointerup', () => {
      this.nextSceneButton.buttonHover();
      this.scene.start('WeighScene',{glasstype: this.glasstype, waterAmount: this.glassware.waterAmount});
    });


    //text
    this.add.text(buttonX, 200, 'TARGET\nFill to ' + this.glassware.target + 'ml',
      {
        fontSize: '16px',
        backgroundColor: '#3330AA',
        padding: 20,
        lineSpacing: 5
      });

    this.add.text(100, 200, this.glassware.glasstype.toUpperCase() + '\n' + this.glassware.description,
      {
        backgroundColor: '#3330AA',
        padding: 20,
        wordWrap: { width: 300 },
        lineSpacing: 10
      });

    //for debug      
    //this.testtext = this.add.text(buttonX, 500, 'WATER: ' + this.glassware.waterAmount, { color: '#000', backgroundColor: '#999999', padding: 20 });
    //this.add.text(buttonX, 600, 'GLASSTYPE: ' + this.glasstype, { color: '#000', backgroundColor: '#999999', padding: 20 });


  }



  update() {
    //this.testtext.setText('WATER: ' + this.glassware.waterAmount);
  }

  checkEnd(){
    if(this.glassware.waterAmount == this.glassware.target){  //maybe a submit button instead? or a text promp to move on 
      this.scene.stop(); 
      this.scene.wake('WeighScene',{glasstype: this.glasstype, waterAmount: this.glassware.waterAmount});
    }
  }


}
