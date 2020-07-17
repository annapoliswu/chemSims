import Glassware from "../objects/glassware";
import InteractiveButton from "../objects/interactiveButton";
import Beaker from '../objects/Beaker';

export default class SelectionScene extends Phaser.Scene {

    private WIDTH: number;
    private HEIGHT: number;
    beakerButton;

    constructor() {
        super({ key: 'SelectionScene' });
    }

    create() {
        this.WIDTH = this.scale.width;
        this.HEIGHT = this.scale.height;

        this.beakerButton = new InteractiveButton(this, this.WIDTH / 2, 300, 'BEAKER').on('pointerup', () => {
            this.beakerButton.buttonHover();
            this.scene.start('WaterScene', { glasstype: 'beaker' });
        });

    }

    update() {

    }

}