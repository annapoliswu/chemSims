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
        
        this.graphics = scene.add.graphics();
        //this.graphics.fillStyle(0xff00ff, 1); //mask shape color
        this.waterImage = new GameObjects.Sprite(scene, x,y, typeinput+'Fill');

        let w = this.waterImage.width*2;
        this.maskShape = this.graphics.fillRoundedRect(x-w/2, y- this.waterImage.height/2, w , this.waterImage.height-5, { tl: 0, tr: 0, bl: w/2, br: w/2 });
        
        this.mask = this.waterImage.createGeometryMask(this.graphics);
        this.mask.invertAlpha = true;
        this.waterImage.setMask(this.mask);
        this.clearMask(); //mask off of lineart for some reason
        //maskShape.y-=100;

        scene.add.existing(this.waterImage);
        
        scene.add.existing(this);
    }

    addWater(){};

    subtractWater(){};

    

}

