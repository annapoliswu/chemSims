import { GameObjects } from "phaser";

export default class Glassware extends Phaser.GameObjects.Sprite {
    glasstype: string;
    sprite: GameObjects.Sprite;
    target: number;
    max: number;
    fill: number = 0;

    constructor(scene: Phaser.Scene, x: number, y: number, typeinput: string) {
        super(scene, x, y, typeinput); 
        //player = new Player(this, 0, 0, 'image');
        //this.add.existing(player);
        this.glasstype = typeinput;
        switch(this.glasstype){
            case "beaker":
                this.target = 200;
                this.max = 800;
                scene.add.image(x,y,'beakerFill');
                //this.setTintFill(0xfff, 0xCCC); // [topLeft] [, topRight] [, bottomLeft] [, bottomRight]
                break;
        
        }
        scene.add.existing(this);
    }

    update(){

    }

    

}

