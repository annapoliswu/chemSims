import Glassware from "../objects/glassware";
import BaseScene from "./baseScene";
import InteractiveButton from "../objects/interactiveButton";
import Beaker from '../objects/Beaker';

export default class SelectionScene extends BaseScene{

    beakerButton;

    constructor() {
        super('SelectionScene');
    }

    create() {
        super.create();

        this.beakerButton = new InteractiveButton(this, this.WIDTH / 2, 300, 'BEAKER', '#000').on('pointerup', () => {
            this.beakerButton.buttonHover();
            this.scene.start('WeighScene', { glasstype: 'beaker' , waterAmount: 0});
        });

    }

    update() {

    }

}