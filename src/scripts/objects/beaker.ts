import Glassware from "./glassware";

export default class Beaker extends Glassware{

    
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'beaker');
        this.glasstype = 'beaker';
        this.description = 'BEAKER\nA beaker is a cylinder with a lip and a spout. A beaker is usually about the same width as its height... etc';
        
        this.max = 50;
        this.target = Math.floor(Math.random() * 4) * 10 + 10;
        this.weight = 60;
        this.percentVariation = .1;

        let w = this.waterImage.width*3;
        let h = this.waterImage.height + 15;
        this.addMask(scene, x+15, y, w, h);
    }
    
    addWater(){
        if(this.waterAmount < this.max){
            this.waterAmount += this.max/20;
            this.updateMask();
        }
    }

    subtractWater(){
        if(this.waterAmount > 0){
            this.waterAmount -= this.max/20;
            this.updateMask();
        }
    }

    updateMask(){
        this.maskShape.y = this.maskHeightStart -  (this.waterAmount * (this.waterImage.height-75)/this.max);
    }

    setWater(amountOfWater:number){
        this.waterAmount = amountOfWater;
        this.updateMask();
    }

}

