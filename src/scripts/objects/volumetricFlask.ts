import Glassware from "./glassware";

export default class VolumetricFlask extends Glassware{

    
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'volumetricFlask');
        this.glasstype = 'volumetricFlask';
        this.description = "VOLUMETRIC FLASK\nA volumetric flask comes in a spherical shape with a tapered neck. It has one calibration line that indicates where to measure to and it is quite accurate at measuring to that one specific volume.";
        
        this.max = 12;
        this.target = 10;
        this.weight = 45;
        this.percentVariation = .005;

        let w = this.waterImage.width*3;
        let h = this.waterImage.height;
        this.addMask(scene, x, y, w, h);
    }
    
    addSmallWater(){
        this.addWater(.25);
    } 

    subtractSmallWater(){
        this.subtractWater(.25);
    }

    addLargeWater(){
        this.addWater(3);
    }
    
    subtractLargeWater(){
        this.subtractWater(3);
    }

    updateMask(){
        this.maskShape.y = this.maskHeightStart - 12*Math.pow(this.waterAmount,1.4);
    }

    setWater(amountOfWater:number){
        this.waterAmount = amountOfWater;
        this.updateMask();
    }

}

