import ExampleObject from '../objects/exampleObject';
import BaseScene from "./baseScene";
import Glassware from "../objects/glassware";
import InteractiveButton from "../objects/interactiveButton";
import Beaker from '../objects/Beaker';



export default class WaterScene extends BaseScene {

  private exampleObject: ExampleObject;

  addButton: InteractiveButton;
  subtractButton: InteractiveButton;
  addButton2: InteractiveButton;
  subtractButton2: InteractiveButton;
  nextSceneButton: InteractiveButton;

  testtext;

  graphics;
  waterImage;
  mask;
  waterTarget;
  


  constructor() {
    super('WaterScene');
  }

  init(data) {
    this.glasstype = data.glasstype;
    this.waterTarget = data.waterTarget;
  }

  create() {
    super.create();

    this.add.rectangle(this.WIDTH / 2, this.HEIGHT - 100, this.WIDTH, 200, 0x999999).setDepth(-99);
    //this.add.text(this.WIDTH / 2, 80, "HIT THE TARGET",  {color: '#000',  fontSize: 32, fontStyle: 'bold', align: 'center'}).setOrigin(.5,.5);

    let glassX = this.WIDTH / 2;
    let glassY = this.HEIGHT / 2 + 50;
    this.createGlassware(glassX, glassY);

    this.glassware.target = this.waterTarget;


    //buttons
    let buttonX = glassX + 150 + this.glassware.width/2;
    this.addButton = new InteractiveButton(this, buttonX+175, 275, '+ SMALL\nAMOUNT WATER', '#666',14).on('pointerup', () => {
      this.addButton.buttonHover();
      this.glassware.addSmallWater();
    }).setOrigin(.5,.5);

    this.addButton2 = new InteractiveButton(this, buttonX, 275, '+ LARGE\nAMOUNT WATER', '#444').on('pointerup', () => {
      this.addButton2.buttonHover();
      this.glassware.addLargeWater();
    }).setOrigin(.5,.5);

    this.subtractButton = new InteractiveButton(this, buttonX+175, 350, '- SMALL\nAMOUNT WATER', '#666',14).on('pointerup', () => {
      this.subtractButton.buttonHover();
      this.glassware.subtractSmallWater();
    }).setOrigin(.5,.5);

    this.subtractButton2 = new InteractiveButton(this, buttonX, 350, '- LARGE\nAMOUNT WATER', '#444').on('pointerup', () => {
      this.subtractButton2.buttonHover();
      this.glassware.subtractLargeWater();
    }).setOrigin(.5,.5);

    this.nextSceneButton = new InteractiveButton(this, 1110, 675, 'MOVE TO NEXT STEP', '#000').on('pointerup', () => {
      this.nextSceneButton.buttonHover();
      this.scene.wake('WeighScene',{glasstype: this.glasstype, waterAmount: this.glassware.waterAmount, waterTarget: this.glassware.target});
      this.scene.stop();
    });


    //text
    this.add.text(buttonX+85, 150, 'TARGET: Fill to ' + this.glassware.target + 'ml',
      {
        fontSize: '20px',
        backgroundColor: '#3330AA',
        padding: 20,
        lineSpacing: 5,
        align: 'center'
      }).setOrigin(.5,0);

    this.add.text(100, 150, this.glassware.description,
      { 
        fontSize: '20px',
        backgroundColor: '#3330AA',
        padding: 20,
        wordWrap: { width: 300 },
        lineSpacing: 10
      });

    //for debug      
    //this.testtext = this.add.text(buttonX, 700, 'Testing...\nWATER: ' + this.glassware.waterAmount, { color: '#000', backgroundColor: '#999999', padding: 20 });
    //this.add.text(buttonX, 600, 'GLASSTYPE: ' + this.glasstype, { color: '#000', backgroundColor: '#999999', padding: 20 });

  }



  update() {
    //this.testtext.setText('WATER: ' + this.glassware.waterAmount);
  }



}
