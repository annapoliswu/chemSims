import Glassware from "./glassware";

export default class VolumetricFlask extends Glassware{

    
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'volumetricFlask');
        this.glasstype = 'volumetricFlask';
        this.description = 'A volumetric flask ...';
        
        this.max = 12;
        this.target = 10;
        this.weight = 45;
        this.percentVariation = .005;

        let w = this.waterImage.width*3;
        let h = this.waterImage.height;
        this.addMask(scene, x, y, w, h);
    }
    
    addWater(){
        if(this.waterAmount < this.max){
            this.waterAmount += 2;
            this.updateMask();
        }
    }

    subtractWater(){
        if(this.waterAmount > 0){
            this.waterAmount -= 2;
            this.updateMask();
        }
    }

    //updates height of mask 
    updateMask(){
        this.maskShape.y = this.maskHeightStart -  (this.waterAmount * (this.waterImage.height-135)/this.max);
    }

    setWater(amountOfWater:number){
        this.waterAmount = amountOfWater;
        this.updateMask();
    }

}

