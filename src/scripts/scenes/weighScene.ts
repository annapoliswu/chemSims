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

    clickText: Phaser.GameObjects.Text;
    clickGlassWarning: string = "CLICK GLASS TO ADD WATER";
    checkScaleWarning: string = "Check the scale again";
    enterWeightWarning: string = "Please enter a weight";


    iWeightInput: InputLine;
    fWeightInput: InputLine;
    densityInput: InputLine;
    volumeInput: InputLine;

    randomInitial: number;
    randomFinal: number;

    waterTableButton: InteractiveButton;
    waterTable: Phaser.GameObjects.Image;
    tryAnotherButton: InteractiveButton;
    tryAgainButton: InteractiveButton;

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
        this.randomInitial = Math.random(); 
        this.randomFinal = Math.random(); 

        let x = 3*this.WIDTH/4;
        let y = this.HEIGHT/2;
        this.add.rectangle(x, y, this.WIDTH/2.2, this.HEIGHT, 0x000 ).setDepth(-98);

        this.createGlassware(this.WIDTH/3.5, 240, this.waterAmountStart);
        
        this.setTempDensity();
        this.targetMass = this.glassware.target;
        this.targetVolume = this.glassware.target/this.density;
        this.iWeightScale = Math.round((this.glassware.weight+ this.randomInitial *10)*100)/100;

        this.scaleText = this.add.text(160, 605, this.iWeightScale.toFixed(2) + " g", {
            fontSize: '48px',
            color: '#000000',
            stroke: '#000000',
            strokeThickness: 3
        });

        this.clickText = this.add.text(550,150,"",{
            fontFamily: 'Arial',
            fontSize: '36px',
            color: '#000',
            align: 'left',
            fontStyle: 'bold',
            wordWrap: {
                width:150
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

        let inputX = x - 20;
        let inputY = 100;

        this.iWeightInput= new InputLine(this, inputX, inputY, "Initial Weight", "Enter initial weight");
        this.iWeightInput.setLabel("Initial Weight: " + this.iWeightInput.value + " g");

            this.iWeightInput.addOnClick(() => {
                if(this.iWeightInput.value == this.iWeightScale){

                    this.iWeightInput.showNormal("Initial Weight: " + this.iWeightInput.value + " g");
                    this.iWeight = this.iWeightInput.value;
                    this.iWeightInput.hideInput();
                    
                    this.clickText.setText(this.clickGlassWarning);
                    this.glassware.setTintFill(0xFF00FF);
                    this.glassware.setInteractive();
                }else{
                    this.iWeightInput.showWarning(this.checkScaleWarning);
                }
            });
            
            this.fWeightInput= new InputLine(this, inputX, inputY+50, "Final Weight: ?", "Enter final weight");
            this.fWeightInput.addOnClick( () => {
                if(this.fWeightInput.value == this.fWeightScale){
                    this.fWeightInput.showNormal("Final Weight: " + this.fWeightInput.value + " g");
                    this.fWeightInput.hideInput();
                }else{
                    this.fWeightInput.showWarning(this.checkScaleWarning);
                }
            }); 

            this.densityInput = new InputLine(this, inputX, inputY+130, "Temp: " + this.temp + " °C,  " + "Density: ?", "Enter water density");
            this.densityInput.addOnClick( ()=> {
                if(this.densityInput.value == this.density){
                    this.densityInput.showNormal("Temp: " + this.temp + " °C,  " + "Density: " + this.density + " g/ml");
                    this.densityInput.hideInput();
                }else{
                    this.densityInput.showWarning("Check table for temp = " + this.temp + " °C");
                }
            });
            
            this.waterTableButton = new InteractiveButton(this, inputX-175, inputY+180, "TEMP-DENSITY TABLE", "#444");
            this.waterTableButton.on('pointerup', ()=> {
                this.waterTableButton.buttonHover();
                if(this.waterTable.alpha == 0){
                    this.waterTable.alpha = 1;
                }else{
                    this.waterTable.alpha = 0;
                }
            });
            
            this.volumeInput = new InputLine(this, inputX, inputY+480, "Calculate Volume of Water", "Enter water volume");
            this.volumeInput.addOnClick( ()=> {
                if((Math.round(this.volumeInput.value*100)/100) == this.volume){
                    this.volumeInput.showNormal("Volume: " + this.volume);
                    this.volumeInput.hideInput();
                }else{
                    this.volumeInput.showWarning("Calculate using Volume = Mass/Density");
                    alert(this.volume);
                }
            });

            this.tryAgainButton = new InteractiveButton(this, inputX-175, inputY+550 , "START OVER", "#444");
            this.tryAgainButton.on('pointerup', ()=> {
                this.scene.restart();
            });

            this.tryAnotherButton = new InteractiveButton(this, inputX-25, inputY+550, "TRY ANOTHER GLASS", "#444");
            this.tryAnotherButton.on('pointerup', ()=> {
                this.scene.start('SelectionScene');
            });

            this.fWeightInput.hide();
            this.densityInput.hide();
            this.waterTableButton.alpha = 0;
            this.volumeInput.hide();
            
        this.glassware.on('pointerover', () => {
            this.glassware.alpha = .2;
        }).on('pointerout', ()=> {
            this.glassware.alpha = 1;
        }).on('pointerdown', ()=> {
            this.glassware.setTintFill(0xFF00FF);
        }).on('pointerup', ()=> {
            this.glassware.alpha = 1;
            this.glassware.setTintFill(0xCCC); 
            this.pastWaterScene = true;
            this.scene.sleep();
            this.scene.run('WaterScene', {glasstype: this.glasstype});
        });

        
        this.events.on('wake',this.onWake,this);


    }

    onWake(sys, data){
        this.input.disable(this.glassware);

        this.waterAmountStart = data.waterAmount;
        this.glassware.setWater(this.waterAmountStart);
        this.fWeightScale = Math.round(((this.iWeightScale + this.waterAmountStart) + (this.randomFinal * 10))*100)/100;
        this.scaleText.setText(this.fWeightScale.toFixed(2) + " g");

        this.mass = this.fWeightScale - this.iWeightScale;
        this.volume = Math.round(((this.mass/this.density)*100))/100;

        this.fWeightInput.show();
        this.densityInput.show();
        this.waterTableButton.alpha = 1;
        this.clickText.alpha = 0;
        this.volumeInput.show();
    }
    
    withinRange(num: number, lower: number, upper:number):boolean{
        if(num <= upper && num >= lower){
            return true;
        }else{
            return false;
        }
    }

    update() {
        //this.clickText.setText("val: " + this.iWeightInput.value);
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
                this.density = 0.99797;
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