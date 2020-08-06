import ImageButton from "./../objects/imageButton";
import BaseScene from "./baseScene";
import InteractiveButton from "../objects/interactiveButton";

export default class SelectionScene extends BaseScene{

    beakerButton;

    constructor() {
        super('SelectionScene');
    }

    create() {
        super.create();

        new ImageButton(this, this.WIDTH/4, 250,'beaker', 'beaker').onClick( () =>{
            this.scene.start('WeighScene', { glasstype: 'beaker' , waterAmount: 0});
        });

        new ImageButton(this, 2*this.WIDTH/4, 200,'graduatedCylinder', 'graduated cylinder').onClick( () =>{
            this.scene.start('WeighScene', { glasstype: 'graduatedCylinder' , waterAmount: 0});
        });

        new ImageButton(this, 3*this.WIDTH/4, 210,'volumetricFlask', 'volumetric flask').onClick( () =>{
            this.scene.start('WeighScene', { glasstype: 'volumetricFlask' , waterAmount: 0});
        });
    }

    update() {

    }

}