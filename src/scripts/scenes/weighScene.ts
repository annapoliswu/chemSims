import Glassware from "../objects/glassware";
import BaseScene from "./baseScene";
import InteractiveButton from "../objects/interactiveButton";
import Beaker from '../objects/Beaker';
import { Tilemaps } from "phaser";

export default class WeighScene extends BaseScene {

    chemScale: Phaser.GameObjects.Image;
    scaleText: Phaser.GameObjects.Text;
    scaleWeight: number;
    calcText: Phaser.GameObjects.Text;
    warning: Phaser.GameObjects.Text;

    pastWaterScene: boolean = false;

    iWeight: number;
    iWeightLabel: HTMLParagraphElement;
    iWeightElement: HTMLInputElement;
    iSubmitElement: HTMLInputElement;

    fWeight: number;
    fWeightLabel: HTMLParagraphElement;
    fWeightElement: HTMLInputElement;
    fSubmitElement: HTMLInputElement;
    fContainer: HTMLDivElement;
    
    waterAmountStart: number;

    temp: number;
    density: number;
    mass: number; 
    volume: number;
    targetMass: number;
    targetVolume: number;

    

    constructor() {
        super('WeighScene');
    }

    init(data){
        this.glasstype = data.glasstype;
        this.waterAmountStart = data.waterAmount;
    }

    create() {
        super.create();
        this.add.rectangle(this.WIDTH / 2, this.HEIGHT - 100, this.WIDTH, 200, 0x999999).setDepth(-99);
        this.chemScale = this.add.image(this.WIDTH/3.5, this.HEIGHT-180,'scale');

        this.makeNotes();
        this.createGlassware(this.WIDTH/3.5, 240, this.waterAmountStart);
        this.glassware.on('pointerover', () => {
            this.glassware.alpha = .2;
        }).on('pointerout', ()=> {
            this.glassware.alpha = 1;
        }).on('pointerdown', ()=> {
            this.glassware.setTintFill(0xFF00FF);
        }).on('pointerup', ()=> {
            this.glassware.setTintFill(0xCCC); 
            this.pastWaterScene = true;
            this.scene.start('WaterScene', {glasstype: this.glasstype});
        });
        
        this.temp = 70;
        this.density = 0.99802;
        this.targetMass = this.glassware.target;
        this.targetVolume = this.glassware.target/this.density;

        this.scaleText = this.add.text(210, 575, this.glassware.weight + this.waterAmountStart + ' g', {
            fontSize: '60px',
            color: '#000000',
            stroke: '#000000',
            strokeThickness: 3
        });

        this.warning = this.add.text(820,100,"",{
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#FF00FF',
            wordWrap: {
                width: 600
            }
        });

        this.calcText = this.add.text(820,400,"",{
            fontFamily: 'Arial',
            fontSize: '16px',
            color: '#FFFFFF',
            lineSpacing: 14,
            wordWrap: {
                width: 600
            }
        });

    }

    //can simplify later
    makeNotes(){
        let x = 3*this.WIDTH/4;
        let y = this.HEIGHT/2;
        this.add.rectangle(x, y, this.WIDTH/2.5, this.HEIGHT, 0x000 );

        /*note: must wrap returned doc element with HTMLInputElement for inputs; no value property on HTMLElement */
        let form = this.add.dom(x, 200).createFromCache('form');
                
        this.iWeightLabel = (<HTMLParagraphElement>document.getElementById("iWeightLabel")); //gets html part
        this.iWeightElement = (<HTMLInputElement>document.getElementById("iWeight"));
        this.iSubmitElement = (<HTMLInputElement>document.getElementById("iSubmit"));

        this.fWeightLabel = (<HTMLParagraphElement>document.getElementById("fWeightLabel")); 
        this.fWeightElement = (<HTMLInputElement>document.getElementById("fWeight"));
        this.fSubmitElement = (<HTMLInputElement>document.getElementById("fSubmit"));
        this.fContainer = (<HTMLDivElement>document.getElementById("fContainer"));

        form.addListener('click');

        if(!this.pastWaterScene){
            form.on('click', (event) => {
                if (event.target.name === 'iSubmit' ){ //initial submit button hit
                    this.iWeight = parseFloat(this.iWeightElement.value);
                    if(this.iWeightLabel){
                        if(this.iWeight){
                            this.iWeightLabel.textContent = "Initial Weight: " + this.iWeight + " g";
                                if(this.iWeight === this.glassware.weight){
                                    //can hide visibility like this 
                                    this.iWeightElement.style.display = "none";
                                    this.iSubmitElement.style.display = "none";

                                    this.warning.text = "<- Click glass to add water";
                                    this.glassware.setTintFill(0xFF00FF);
                                    this.glassware.setInteractive();
                                }else{
                                    this.warning.setText("Check the scale again");
                                }
                        }else{
                            this.warning.setText("Please enter a weight!");
                        }
                    }
                }
            });
        } else if(this.pastWaterScene){
            //scene resets this stuff if not stated? create run multiple times? not starting new scene, same because values for iWeight stay the same??
            this.iWeightLabel.textContent = "Initial Weight: " + this.iWeight + " g";
            this.iWeightElement.style.display = "none";
            this.iSubmitElement.style.display = "none";

            this.fContainer.style.display = "block";
            form.on('click', (event) => {
                if (event.target.name === 'fSubmit' ){ //initial submit button hit
                    this.fWeight = parseFloat(this.fWeightElement.value);
                    if(this.fWeightLabel){
                        if(this.fWeight){
                            this.fWeightLabel.textContent = "Final Weight: " + this.fWeight + " g";
                                if(this.fWeight === this.glassware.weight+this.glassware.waterAmount){
                                    this.fWeightElement.style.display = "none";
                                    this.fSubmitElement.style.display = "none";
                                    this.warning.setText("");

                                    this.calcVars();
                                    this.calcText.setText("DENSITY = MASS / VOLUME" +
                                    "\nVOLUME = MASS / DENSITY" +
                                    "\n\nWater's density varies slightly with its temperature" +
                                    "\nIf the water's temperature is " + this.temp + " °F, it's density is " + this.density + " g/ml"+
                                    "\n\nVOLUME = " + this.mass + " g / " + this.density + " g/ml"+
                                    "\nVOLUME = " + this.volume + " ml");
                                }else{
                                    this.warning.setText("Check the scale again");
                                }
                        }else{
                            this.warning.setText("Please enter a weight!");
                        }
                    }
                }
            });
        }

    }

    calcVars(){
        this.mass = this.fWeight - this.iWeight;
        this.volume = this.mass/this.density;
    }

    update() {
    }



}