import Glassware from "../objects/glassware";
import InteractiveButton from "../objects/interactiveButton";
import Beaker from '../objects/Beaker';

export default class BaseScene extends Phaser.Scene {

    WIDTH: number;
    HEIGHT: number;
    glasstype: string;
    glassware: Glassware;

    constructor(akey:string) {
        super({ key: akey });
        //this.glasstype = gt;
    }

    create() {
        this.WIDTH = this.scale.width;
        this.HEIGHT = this.scale.height;
    }

    createGlassware(x:number, y:number, inputWater?: number){
        switch (this.glasstype) {
            case 'beaker':
                this.glassware = new Beaker(this, x, y);
            //others go here, note using same glass in other scenes need to send info on waterAmount
        }
        if(inputWater){
            this.glassware.setWater(inputWater);
        }
    }

}