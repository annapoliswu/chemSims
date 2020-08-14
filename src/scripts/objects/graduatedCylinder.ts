import Glassware from "./glassware";

export default class GraduatedCylinder extends Glassware{

    
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'graduatedCylinder');
        this.glasstype = 'graduatedCylinder';
        this.description = "GRADUATED CYLINDER\nA graduated cylinder is a tall cylindrical vessel. While commonly used for measuring out specific amounts of liquid, it is not the most accurate glassware type out there.";
        
        this.max = 10;
        this.target = Math.floor(Math.random() * 9)+ 1;
        this.weight = 50;
        this.percentVariation = .02;

        let w = this.waterImage.width*3;
        let h = this.waterImage.height;
        this.addMask(scene, x, y-40, w, h);
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
        this.maskShape.y = this.maskHeightStart -  (this.waterAmount * (this.waterImage.height-180)/this.max);
    }

    setWater(amountOfWater:number){
        this.waterAmount = amountOfWater;
        this.updateMask();
    }

}

