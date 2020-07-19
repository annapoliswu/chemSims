import Glassware from "../objects/glassware";
import InteractiveButton from "../objects/interactiveButton";
import Beaker from '../objects/Beaker';
import Notes from "../objects/notes";
import { Tilemaps } from "phaser";

export default class WeighScene extends Phaser.Scene {

    private WIDTH: number;
    private HEIGHT: number;
    chemscale: Phaser.GameObjects.Image;
    glasstype: string;
    notes: Notes;

    constructor() {
        super({ key: 'WeighScene' });
    }

    init(data){
        this.glasstype = data.glasstype;
    }

    create() {
        this.WIDTH = this.scale.width;
        this.HEIGHT = this.scale.height;
        this.add.rectangle(this.WIDTH / 2, this.HEIGHT - 100, this.WIDTH, 200, 0x999999).setDepth(-99);

        this.chemscale = this.add.image(this.WIDTH/3.5, this.HEIGHT-200,'scale');
        this.notes = new Notes(this, 3*this.WIDTH/4, this.HEIGHT/2, this.WIDTH/2.5, this.HEIGHT);
    }

    update() {

    }

}