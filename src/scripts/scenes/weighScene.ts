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

    temp: number;   //randomize
    density: number;    //based on temp table
    mass: number; 
    volume: number;
    targetMass: number;
    targetVolume: number;

    chemScale: Phaser.GameObjects.Image;
    iWeightScale: number;    //randomize
    fWeightScale: number;
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

    randomNum1: number = Math.random();
    randomNum2: number = Math.random();

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
            this.scene.sleep();
            this.scene.start('WaterScene', {glasstype: this.glasstype});
            //still not working, this.scene.switch seems to be what I want, but can't pass values
        });
        
        this.temp = 21.1;
        this.density = 0.99797;
        this.targetMass = this.glassware.target;
        this.targetVolume = this.glassware.target/this.density;
        this.iWeightScale = Math.round((this.glassware.weight+this.randomNum1*10)*100)/100;
        this.fWeightScale = Math.round((this.iWeightScale + this.waterAmountStart)*100)/100;

        this.scaleText = this.add.text(160, 605, this.iWeightScale.toFixed(2) + ' g', {
            fontSize: '48px',
            color: '#000000',
            stroke: '#000000',
            strokeThickness: 3
        });

        this.warning = this.add.text(820,25,"",{
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

        this.makeNotes();

    }

    makeNotes(){
        let x = 3*this.WIDTH/4;
        let y = this.HEIGHT/2;
        this.add.rectangle(x, y, this.WIDTH/2.2, this.HEIGHT, 0x000 ).setDepth(-98);

        //if left inside if, doesn't create line when resuming
        this.iWeightInput= new InputLine(this, x, 125, "Initial Weight", "Enter initial weight");
        this.iWeightInput.setLabel("Initial Weight: " + this.iWeightInput.value + " g");

        if(!this.pastWaterScene){
            this.iWeightInput.addOnClick(() => {
                if(this.iWeightInput.value == this.iWeightScale){

                    this.iWeightInput.showNormal("Initial Weight: " + this.iWeightInput.value + " g");
                    this.iWeight = this.iWeightInput.value;
                    this.iWeightInput.hideInput();
                    
                    this.warning.setText(this.clickGlassWarning);
                    this.glassware.setTintFill(0xFF00FF);
                    this.glassware.setInteractive();
                }else{
                    this.iWeightInput.showWarning(this.checkScaleWarning);
                }
            });
        }else{
            this.scaleText.setText(this.fWeightScale.toFixed(2));
            this.iWeightInput.value = this.iWeight;
            this.iWeightInput.setLabel("Initial Weight: " + this.iWeightInput.value + " g");
            this.iWeightInput.hideInput();

            this.fWeightInput= new InputLine(this, x, 200, "Final Weight", "Enter final weight");
            this.fWeightInput.addOnClick( () => {
                if(this.fWeightInput.value == this.fWeightScale){
                    this.fWeightInput.showNormal("Final Weight: " + this.fWeightInput.value + " g");
                    this.fWeightInput.hideInput();
                }else{
                    this.fWeightInput.showWarning(this.checkScaleWarning);
                }
            });

            this.densityInput= new InputLine(this, x, 275, "Water Density", "Enter water density");
            //this.answerInput= new InputLine(this, x, 350, "Calculate Volume of Water", "Enter water volume");

            this.calcText.setText("checking 1,2");
        }
    }

    
    update() {
        //this.warning.setText("val: " + this.iWeightInput.value);
        //this.iWeightInput.setLabel("Initial Weight: " + this.iWeightInput.value + " g");
    }



}