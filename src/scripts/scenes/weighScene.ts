import Glassware from "../objects/glassware";
import InteractiveButton from "../objects/interactiveButton";
import Beaker from '../objects/Beaker';

export default class WeighScene extends Phaser.Scene {

    private WIDTH: number;
    private HEIGHT: number;

    constructor() {
        super({ key: 'WeighScene' });
    }

    create() {
        this.WIDTH = this.scale.width;
        this.HEIGHT = this.scale.height;
    }

    update() {

    }

}