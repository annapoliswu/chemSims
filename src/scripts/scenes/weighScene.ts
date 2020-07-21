import Glassware from "../objects/glassware";
import BaseScene from "./baseScene";
import InteractiveButton from "../objects/interactiveButton";
import Beaker from '../objects/Beaker';
import { Tilemaps } from "phaser";

export default class WeighScene extends BaseScene {

    chemscale: Phaser.GameObjects.Image;
    
    iWeight: number;
    fWeight: number;
    

    constructor() {
        super('WeighScene');
    }

    init(data){
        this.glasstype = data.glasstype;
    }

    create() {
        super.create();
        this.add.rectangle(this.WIDTH / 2, this.HEIGHT - 100, this.WIDTH, 200, 0x999999).setDepth(-99);

        this.chemscale = this.add.image(this.WIDTH/3.5, this.HEIGHT-200,'scale');
        //this.notes = new Notes(this, 3*this.WIDTH/4, this.HEIGHT/2, this.WIDTH/2.5, this.HEIGHT);
        this.makeNotes();
    }

    
    makeNotes(){
        let x = 3*this.WIDTH/4;
        let y = this.HEIGHT/2;
        this.add.rectangle(x, y, this.WIDTH/2.5, this.HEIGHT, 0x000 );
        //scene.add.text(x,y,"*interactive notes go here");
        
        let header = this.add.text(800,100,"");

        /*note: must wrap returned doc element with HTMLInputElement for inputs; no value property on HTMLElement */
        let form = this.add.dom(x, y).createFromCache('form');

        form.addListener('click');
        form.on('click', (event) => {
            if (event.target.name === 'iSubmit'){
                
                header.text = "buttonHit";
                
                let iWeightLabel = document.getElementById("iWeightLabel"); //gets html part
                let iWeightElement = (<HTMLInputElement>document.getElementById("iWeight"));
                this.iWeight = parseFloat(iWeightElement.value);

                if(iWeightLabel){
                    if(this.iWeight){
                        iWeightLabel.innerText = "Initial Weight: " + this.iWeight;

                        /* //can hide visibility like this 
                        iWeightElement.style.visibility = "hidden";
                        (<HTMLInputElement>document.getElementById("iSubmit")).style.visibility = "hidden";
                        */

                        //prompts to move to water scene
                        //this.scene.start('WaterScene');
                    }else{
                        iWeightLabel.innerText = "Please enter a weight";
                    }
                }
            }
        });

    }


    update() {

    }

}