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

    targetMass: number;     //mass one should've gotten if didn't overfill in waterScene (glassware.target + scaleRandomness)
    targetVolume: number;   //volume one should've gotten (glassware.target + scaleRandomness)/density

    temp: number;       //temp of water
    density: number;    //density of water
    mass: number;       //calculated mass based on fScaleWeight-iScaleWeight only
    volume: number;     //calculated volume based on (fScaleWeight-iScaleWeight)/density

    chemScale: Phaser.GameObjects.Image;
    iWeightScale: number;  //initial weight displayed on scale
    fWeightScale: number;
    scaleText: Phaser.GameObjects.Text;
    calcText: Phaser.GameObjects.Text;

    warning: Phaser.GameObjects.Text;
    clickGlassWarning: string = "<- Click glass to add water";
    checkScaleWarning: string = "Check the scale again";
    enterWeightWarning: string = "Please enter a weight";


    iWeightInput: InputLine;
    fWeightInput: InputLine;
    densityInput: InputLine;
    answerInput: InputLine;

    randomNum1: number = Math.random(); 
    randomNum2: number = Math.random();

    waterTableButton: InteractiveButton;
    waterTable: Phaser.GameObjects.Image;

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
        
        this.waterTable = this.add.image(400, 350,'waterTable').setScale(.7).setDepth(99);
        this.waterTable.alpha = 0;

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
        
        this.setTempDensity();
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

            this.fWeightInput= new InputLine(this, x, 175, "Final Weight: ?", "Enter final weight");
            this.fWeightInput.addOnClick( () => {
                if(this.fWeightInput.value == this.fWeightScale){
                    this.fWeightInput.showNormal("Final Weight: " + this.fWeightInput.value + " g");
                    this.fWeightInput.hideInput();
                }else{
                    this.fWeightInput.showWarning(this.checkScaleWarning);
                }
            });

            this.densityInput = new InputLine(this, x, 275, "Temp: " + this.temp + " °C,  " + "Density: ?", "Enter water density");
            this.densityInput.addOnClick( ()=> {
                if(this.densityInput.value == this.density){
                    this.densityInput.showNormal("Temp: " + this.temp + " °C,  " + "Density: " + this.density + " g/ml");
                    this.densityInput.hideInput();
                }else{
                    this.densityInput.showWarning("Check table for temp = " + this.temp + " °C");
                }
            });
            
            this.waterTableButton = new InteractiveButton(this, x-175, 325, "TEMP-DENSITY TABLE", '#333');
            this.waterTableButton.on('pointerup', ()=> {
                this.waterTableButton.buttonHover();
                if(this.waterTable.alpha == 0){
                    this.waterTable.alpha = 1;
                }else{
                    this.waterTable.alpha = 0;
                }
            });
            
            this.answerInput= new InputLine(this, x, 450, "Calculate Volume of Water", "Enter water volume");

            //this.calcText.setText("checking 1,2");
        }
    }

    
    update() {
        //this.warning.setText("val: " + this.iWeightInput.value);
        //this.iWeightInput.setLabel("Initial Weight: " + this.iWeightInput.value + " g");
    }

    //probably a formula for this table, using this until i find it
    setTempDensity(){
        let r = Math.floor(Math.random()*5);
        switch(r){
            case 0: 
                this.temp = 15.2;
                this.density = 0.999069;
                break;
            case 1:
                this.temp = 18.6;
                this.density = 0.998482;
                break;
            case 2:
                this.temp = 19.8;
                this.density = 0.998244;
                break;
            case 3:
                this.temp = 21.1;
                this.density = 0.997992;
                break;
            case 4:
                this.temp = 23.1;
                this.density = 0.997514;
                break;
            case 4:
                this.temp = 25.6;
                this.density = 0.996888;
                break;
            default:
                this.temp = 16.9
                this.density = 0.998792;
        }
    }


}