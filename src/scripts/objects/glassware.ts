import { GameObjects } from "phaser";

export default abstract class Glassware extends Phaser.GameObjects.Sprite {
    glasstype: string;
    description: string;

    target: number;
    max: number;
    weight: number;
    waterAmount: number = 0;
    waterImage: GameObjects.Sprite;
    
    graphics: GameObjects.Graphics;
    mask: Phaser.Display.Masks.GeometryMask;
    maskHeightStart: number;
    maskShape;

    constructor(scene: Phaser.Scene, x: number, y: number, typeinput: string) {
        super(scene, x, y, typeinput); 
        this.setTintFill(0xCCC); //gradient [topLeft] [, topRight] [, bottomLeft] [, bottomRight]
        
        this.graphics = scene.add.graphics();
        
        this.waterImage = new GameObjects.Sprite(scene, x,y, typeinput+'Fill');

        let w = this.waterImage.width*2;
        let h = this.waterImage.height;
        this.maskShape = this.graphics.fillRoundedRect(x-w/2, y-h/2, w , h-5, { tl: 0, tr: 0, bl: w/2, br: w/2 });
        this.maskShape.alpha = 0;

        this.mask = this.waterImage.createGeometryMask(this.graphics);
        this.mask.invertAlpha = true;
        this.maskHeightStart = this.maskShape.y; //must be after invert
        this.waterImage.setMask(this.mask);
        this.clearMask(); //mask off of lineart for some reason

        scene.add.existing(this.waterImage);
        scene.add.existing(this);
    }

    abstract addWater();
    abstract subtractWater();
    abstract updateMask();
    abstract setWater(amountOfWater: number);

    

}

