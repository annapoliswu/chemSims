import { GameObjects } from "phaser";
import Glassware from "./glassware";

export default class Beaker2 extends Glassware{

    
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'beaker800ml');
        this.glasstype = 'beaker';
        this.description = 'BEAKER\nA beaker is a cylinder with a lip and a spout. A beaker is usually about the same width as its height... etc';
        
        this.max = 800;
        this.target = Math.floor(Math.random() * 8) * 100 + 100;
        this.weight = 100;
        this.percentVariation = .1;

        
        let w = this.waterImage.width*2;
        let h = this.waterImage.height;
        this.addMask(scene, x, y, w, h);


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
        this.maskShape.y = this.maskHeightStart -  (this.waterAmount * (this.waterImage.height-115)/this.max);
    }

    setWater(amountOfWater:number){
        this.waterAmount = amountOfWater;
        this.updateMask();
    }

}

