import Glassware from "../objects/glassware";
import VolumetricFlask from "./../objects/volumetricFlask";
import GraduatedCylinder from "./../objects/graduatedCylinder";
import Beaker from '../objects/Beaker';
import InteractiveButton from "../objects/interactiveButton";

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
                break;
            case 'graduatedCylinder':
                this.glassware = new GraduatedCylinder(this, x, y);
                break;
            case 'volumetricFlask':
                this.glassware = new VolumetricFlask(this, x, y);
                break;
            //others go here, note using same glass in other scenes need to send info on waterAmount
        }

        if(inputWater){
            this.glassware.setWater(inputWater);
        }
    }

}