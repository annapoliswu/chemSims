import { GameObjects } from "phaser";

export default class Glassware extends Phaser.GameObjects.Sprite {
    glasstype: string;
    description: string;

    target: number;
    max: number;
    waterAmount: number = 0;
    waterImage: GameObjects.Sprite;

    mask;
    maskShape; 
    graphics;

    constructor(scene: Phaser.Scene, x: number, y: number, typeinput: string) {
        super(scene, x, y, typeinput); 
        this.setTintFill(0xCCC); //gradient [topLeft] [, topRight] [, bottomLeft] [, bottomRight]
        scene.add.existing(this);
    }

    addWater(){
        if(this.waterAmount < this.max){
            this.waterAmount += this.max/20;
            //this.maskShape.y -= this.max/20
        }
    }

    subtractWater(){
        if(this.waterAmount > 0){
            this.waterAmount -= this.max/20;
            //this.maskShape.y -= this.max/20
        }
    }

    

}

