import Glassware from "./glassware";

export default class Beaker extends Glassware{

    
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'beaker');
        this.glasstype = 'beaker';
        this.description = 'BEAKER\nA cylinder with a lip and a spout. Beakers are mostly used for containing liquids instead of measuring to exact amounts.';
        
        this.max = 50;
        this.target = Math.floor(Math.random() * 4) * 10 + 10;
        this.weight = 60;
        this.percentVariation = .1;

        let w = this.waterImage.width*3;
        let h = this.waterImage.height + 15;
        this.addMask(scene, x+15, y, w, h);
    }
    addSmallWater(){
        this.addWater(2.5);
    } 

    subtractSmallWater(){
        this.subtractWater(2.5);
    }

    addLargeWater(){
        this.addWater(15);
    }
    
    subtractLargeWater(){
        this.subtractWater(15);
    }

    updateMask(){
        this.maskShape.y = this.maskHeightStart -  (this.waterAmount * (this.waterImage.height-75)/this.max);
    }

    setWater(amountOfWater:number){
        this.waterAmount = amountOfWater;
        this.updateMask();
    }

}

