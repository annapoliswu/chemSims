import { GameObjects } from "phaser";

export default class Glassware extends Phaser.GameObjects.Sprite {
    glasstype: string;
    target: number;
    max: number;
    fill: number = 0;
    fillImage: GameObjects.Sprite;
    mask;
    maskShape; 
    graphics;
    x;
    y;
    constructor(scene: Phaser.Scene, x: number, y: number, typeinput: string) {
        super(scene, x, y, typeinput); 
        this.setTintFill(0xCCC); //gradient [topLeft] [, topRight] [, bottomLeft] [, bottomRight]
    
        this.glasstype = typeinput;
        switch(this.glasstype){
            case "beaker":
                this.target = 200;
                this.max = 800;
                break;
        }
        scene.add.existing(this);
    }

        //player = new Player(this, 0, 0, 'image');
        //this.add.existing(player);
    addWater(){
        this.fill += this.max/20;
        this.maskShape.y -= this.max/20
    }

    

}

