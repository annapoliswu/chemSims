import Glassware from "../objects/glassware";
import BaseScene from "./baseScene";
import InteractiveButton from "../objects/interactiveButton";
import Beaker from '../objects/Beaker';
import { Tilemaps } from "phaser";

export default class WeighScene extends BaseScene {

    chemScale: Phaser.GameObjects.Image;
    scaleText: Phaser.GameObjects.Text;
    scaleWeight: number;
    sideText: Phaser.GameObjects.Text;
    warning;

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

        this.chemScale = this.add.image(this.WIDTH/3.5, this.HEIGHT-180,'scale');
        //this.notes = new Notes(this, 3*this.WIDTH/4, this.HEIGHT/2, this.WIDTH/2.5, this.HEIGHT);
        this.makeNotes();
        this.createGlassware(this.WIDTH/3.5, 240);
        this.scaleText = this.add.text(210, 575, this.glassware.weight + ' g', {
            fontSize: '60px',
            color: '#000000',
            stroke: '#000000',
            strokeThickness: 3
        });

        this.sideText = this.add.text(50, 200, 'CLICK THE GLASS TO ADD WATER\n==>', {
            fontFamily: 'Arial',
            fontSize: '30px',
            color: '#000000',
            stroke: '#000000',
            strokeThickness: 1,
            wordWrap: {
                width: 200
            },
            align:'center',
            lineSpacing: 10
        });
        this.sideText.alpha = 0;

        this.warning = this.add.text(820,100,"",{
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#FF0000',
            wordWrap: {
                width: 600
            }
        });

        
        this.glassware.on('pointerover', () => {
            this.glassware.alpha = .2;
        }).on('pointerout', ()=> {
            this.glassware.alpha = 1;
        }).on('pointerdown', ()=> {
            this.glassware.setTintFill(0xFF0000);
        }).on('pointerup', ()=> {
            this.glassware.setTintFill(0xCCC); 
            this.scene.start('WaterScene', {glasstype: this.glasstype});
        });

    }

    
    makeNotes(){
        let x = 3*this.WIDTH/4;
        let y = this.HEIGHT/2;
        this.add.rectangle(x, y, this.WIDTH/2.5, this.HEIGHT, 0x000 );
        //scene.add.text(x,y,"*interactive notes go here");

        /*note: must wrap returned doc element with HTMLInputElement for inputs; no value property on HTMLElement */
        let form = this.add.dom(x, y).createFromCache('form');

        form.addListener('click');
        form.on('click', (event) => {
            if (event.target.name === 'iSubmit'){
                
                //this.warning.text = "buttonHit";
                
                let iWeightLabel = document.getElementById("iWeightLabel"); //gets html part
                let iWeightElement = (<HTMLInputElement>document.getElementById("iWeight"));
                let iWeightInstruction = document.getElementById("iInstruction");
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
                        this.warning.text = "Please enter a weight!";
                    }
                }
            }
        });

    }


    update() {
        if(this.iWeight){
            if(this.iWeight === this.glassware.weight){
                //this.sideText.alpha = 1;
                this.warning.text = "<== CLICK GLASS TO ADD WATER";
                this.glassware.setTintFill(0xFF0000);
                this.glassware.setInteractive(); //hmmmm
            }else{
                this.warning.text = "Check the scale again"
            }
        }
    }



}