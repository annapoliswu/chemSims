import ImageButton from "./../objects/imageButton";
import BaseScene from "./baseScene";



export default class SelectionScene extends BaseScene{


    constructor() {
        super('SelectionScene');
    }

    create() {
        super.create();
        this.add.rectangle(this.WIDTH/2, this.HEIGHT - 100, this.WIDTH, 200, 0x999999).setDepth(-99);
        this.add.text(this.WIDTH/2, 80, "GLASSWARE SIMULATION",  { color: '#000',  fontSize: 36, fontStyle: 'bold', align: 'center'}).setOrigin(.5,.5);

        new ImageButton(this, this.WIDTH/4, 290,'beaker', 'beaker').onClick( () =>{
            this.scene.start('WeighScene', { glasstype: 'beaker' , waterAmount: 0});
        });

        new ImageButton(this, 2*this.WIDTH/4, 200,'graduatedCylinder', 'graduated cylinder').onClick( () =>{
            this.scene.start('WeighScene', { glasstype: 'graduatedCylinder' , waterAmount: 0});
        });

        new ImageButton(this, 3*this.WIDTH/4, 230,'volumetricFlask', 'volumetric flask').onClick( () =>{
            this.scene.start('WeighScene', { glasstype: 'volumetricFlask' , waterAmount: 0});
        });

        this.add.text(this.WIDTH/2, 720, "(CHOOSE A GLASSWARE TYPE TO GET STARTED)",  { color: '#000',  fontSize: 18, fontStyle: 'bold', align: 'center'}).setOrigin(.5,.5);
    }

    update() {

    }

}