import Glassware from "./glassware";

export default class GraduatedCylinder extends Glassware{

    
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'graduatedCylinder');
        this.glasstype = 'graduatedCylinder';
        this.description = 'A graduated cylinder ...';
        
        this.max = 10;
        this.target = Math.floor(Math.random() * 9)+ 1;
        this.weight = 40;
        this.percentVariation = .02;

        let w = this.waterImage.width*3;
        let h = this.waterImage.height;
        this.addMask(scene, x, y-40, w, h);
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

    //updates height of mask 
    updateMask(){
        this.maskShape.y = this.maskHeightStart -  (this.waterAmount * (this.waterImage.height-180)/this.max);
    }

    setWater(amountOfWater:number){
        this.waterAmount = amountOfWater;
        this.updateMask();
    }

}

