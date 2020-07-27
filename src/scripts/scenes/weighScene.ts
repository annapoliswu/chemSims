import Glassware from "../objects/glassware";
import InputLine from "./../objects/inputLine";
import BaseScene from "./baseScene";
import InteractiveButton from "../objects/interactiveButton";
import Beaker from '../objects/Beaker';
import { Tilemaps } from "phaser";

export default class WeighScene extends BaseScene {

    pastWaterScene: boolean = false;
    waterAmountStart: number;

    iWeight: number;
    iWeightLabel: HTMLParagraphElement;
    iWeightElement: HTMLInputElement;
    iSubmitElement: HTMLInputElement;

    fWeight: number;
    fWeightLabel: HTMLParagraphElement;
    fWeightElement: HTMLInputElement;
    fSubmitElement: HTMLInputElement;
    fContainer: HTMLDivElement;

    temp: number;   //randomize
    density: number;    //based on temp table
    mass: number; 
    volume: number;
    targetMass: number;
    targetVolume: number;

    chemScale: Phaser.GameObjects.Image;
    scaleWeight: number;    //randomize
    scaleText: Phaser.GameObjects.Text;
    calcText: Phaser.GameObjects.Text;

    warning: Phaser.GameObjects.Text;
    clickGlassWarning: string = "<- Click glass to add water";
    checkScaleWarning: string = "Check the scale again";
    enterWeightWarning: string = "Please enter a weight";

    line: InputLine;

    iWeightInput: InputLine;
    fWeightInput: InputLine;
    densityInput: InputLine;
    answerInput: InputLine;

    constructor() {
        super('WeighScene');
    }

    init(data){
        this.glasstype = data.glasstype;
        this.waterAmountStart = data.waterAmount;
    }

    create() {
        super.create();
        this.add.rectangle(this.WIDTH/2, this.HEIGHT - 100, this.WIDTH, 200, 0x999999).setDepth(-99);
        this.chemScale = this.add.image(this.WIDTH/3.5, this.HEIGHT-160,'scale');

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
        
        this.temp = 21.1;
        this.density = 0.99797;
        this.targetMass = this.glassware.target;
        this.targetVolume = this.glassware.target/this.density;

        this.scaleText = this.add.text(160, 605, (this.glassware.weight + this.waterAmountStart).toFixed(2) + ' g', {
            fontSize: '48px',
            color: '#000000',
            stroke: '#000000',
            strokeThickness: 3
        });

        this.warning = this.add.text(820,50,"",{
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


    updateCalcVars(){
        this.mass = this.fWeight - this.iWeight;
        this.volume = this.mass/this.density;
    }

    //updates onscreen text once text input changes
    updateLabels(){
        if(this.iWeight){
            this.iWeightLabel.textContent = "Initial Weight: " + this.iWeight + " g";
        }
        if(this.fWeight){
            this.fWeightLabel.textContent = "Final Weight: " + this.fWeight + " g";
        }
    }

    //can simplify later
    makeNotes(){
        /*
        let x = 3*this.WIDTH/4;
        let y = this.HEIGHT/2;
        this.add.rectangle(x, y, this.WIDTH/2.5, this.HEIGHT, 0x000 );

        //note: must wrap returned doc element with HTMLInputElement for inputs; no value property on HTMLElement
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
                            this.updateLabels();
                                if(this.iWeight === this.glassware.weight){
                                    //can hide visibility like this 
                                    this.iWeightElement.style.display = "none";
                                    this.iSubmitElement.style.display = "none";

                                    this.warning.setText(this.clickGlassWarning);
                                    this.glassware.setTintFill(0xFF00FF);
                                    this.glassware.setInteractive();
                                }else{
                                    this.warning.setText(this.checkScaleWarning);
                                }
                        }else{
                            this.warning.setText(this.enterWeightWarning);
                        }
                    }
                }
            });
        } else if(this.pastWaterScene){
            //scene resets this stuff if not stated? create run multiple times? not starting new scene, same because values for iWeight stay the same??
            //maybe form.html gets reset??
            this.updateLabels();
            this.iWeightElement.style.display = "none";
            this.iSubmitElement.style.display = "none";

            this.fContainer.style.display = "block";
            form.on('click', (event) => {
                if (event.target.name === 'fSubmit' ){ //initial submit button hit
                    this.fWeight = parseFloat(this.fWeightElement.value);
                    if(this.fWeightLabel){
                        if(this.fWeight){
                            this.updateLabels();
                                if(this.fWeight === this.glassware.weight+this.glassware.waterAmount){
                                    this.fWeightElement.style.display = "none";
                                    this.fSubmitElement.style.display = "none";
                                    this.warning.setText("");

                                    this.updateCalcVars();
                                    this.calcText.setText("DENSITY = MASS / VOLUME" +
                                    "\nVOLUME = MASS / DENSITY" +
                                    "\n\nWater's density varies slightly with its temperature" +
                                    "\nIf the water's temperature is " + this.temp + " °C, it's density is " + this.density + " g/ml"+
                                    "\n\nVOLUME = " + this.mass + " g / " + this.density + " g/ml"+
                                    "\nVOLUME = " + this.volume + " ml");
                                }else{
                                    this.warning.setText(this.checkScaleWarning);
                                }
                        }else{
                            this.warning.setText(this.enterWeightWarning);
                        }
                    }
                }
            });
        }
*/
        let x = 3*this.WIDTH/4;
        let y = this.HEIGHT/2;
        this.add.rectangle(x, y, this.WIDTH/2.5, this.HEIGHT, 0x000 );

        this.iWeightInput= new InputLine(this, x, 150, "Initial Weight", "Enter initial weight",0);

        if(!this.pastWaterScene){
            this.iWeightInput.addOnClick(() => {
                if(this.iWeightInput.value == this.glassware.weight){
                    this.iWeightInput.showNormal("Initial Weight: " + this.iWeightInput.value + " g");
                    this.iWeightInput.hideInput();
                    
                    this.warning.setText(this.clickGlassWarning);
                    this.glassware.setTintFill(0xFF00FF);
                    this.glassware.setInteractive();
                }else{
                    this.iWeightInput.showWarning(this.checkScaleWarning);
                }
            });
        }else{
            this.iWeightInput.hideInput();
            this.iWeightInput.setLabel("Initial Weight: " + this.iWeightInput.value + " g");

            this.fWeightInput= new InputLine(this, x, 250, "Final Weight", "Enter final weight",1);
            this.densityInput= new InputLine(this, x, 350, "Water Density", "Enter water density",2);
            this.answerInput= new InputLine(this, x, 450, "Calculate Volume of Water", "Enter water volume",3);
        }
    }

    
    update() {
        //this.warning.setText("val: " + this.line.value);
    }



}