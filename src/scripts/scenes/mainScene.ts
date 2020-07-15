import ExampleObject from '../objects/exampleObject';
import Glassware from "../objects/glassware";

/*
const WIDTH
const HEIGHT 
*/
export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  beaker : Glassware;

  constructor() {
    super({ key: 'MainScene' });
  }
  
  create() {
    
    this.beaker = new Glassware(this, 500, 300, "beaker");
  }

  update() {
  }
}
