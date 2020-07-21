import { GameObjects } from "phaser";
import Glassware from "./glassware";

export default class Beaker extends Glassware{

    
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'beaker');
        this.glasstype = 'beaker';
        this.description = 'A beaker is a cylinder with a lip and a spout. A beaker is usually about the same width as its height... etc';
        
        this.max = 800;
        this.target = 400;
        this.weight = 100;
    }
    
    addWater(){
        if(this.waterAmount < this.max){
            this.waterAmount += this.max/20;
            //this.maskShape.y -= (this.waterImage.height-115)/20;
            this.updateMask();
        }
    }

    subtractWater(){
        if(this.waterAmount > 0){
            this.waterAmount -= this.max/20;
            //this.maskShape.y += (this.waterImage.height-115)/20;
            this.updateMask();
        }
    }

    //updates height of mask 
    updateMask(){
        this.maskShape.y = this.maskHeightStart -  (this.waterAmount * (this.waterImage.height-155)/this.max);
    }

    setWater(amountOfWater:number){
        this.waterAmount = amountOfWater;
        this.updateMask();
    }

}

