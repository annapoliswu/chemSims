import Glassware from "../objects/glassware";
import GraduatedCylinder from "./../objects/graduatedCylinder";
import ImageButton from "./../objects/imageButton";
import BaseScene from "./baseScene";
import InteractiveButton from "../objects/interactiveButton";
import Beaker from '../objects/Beaker';

export default class SelectionScene extends BaseScene{

    beakerButton;
    beaker;
    graduatedCylinder;

    constructor() {
        super('SelectionScene');
    }

    create() {
        super.create();

        this.beakerButton = new InteractiveButton(this, this.WIDTH / 2, 300, 'BEAKER', '#000').on('pointerup', () => {
            this.beakerButton.buttonHover();
            this.scene.start('WeighScene', { glasstype: 'beaker' , waterAmount: 0});
        });

        this.beaker = new ImageButton(this, 300, 200,'beaker', 'beaker').onClick( () =>{
            this.scene.start('WeighScene', { glasstype: 'beaker' , waterAmount: 0});
        });

        this.graduatedCylinder = new ImageButton(this, 600, 200,'graduatedCylinder', 'graduated cylinder').onClick( () =>{
            this.scene.start('WeighScene', { glasstype: 'graduatedCylinder' , waterAmount: 0});
        });

    }

    update() {

    }

}