import InputLine from "./../objects/inputLine";
import BaseScene from "./baseScene";
import InteractiveButton from "../objects/interactiveButton";



export default class WeighScene extends BaseScene {

    waterAmountStart: number;
    iWeight: number;

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
    checkScaleWarning: string = "Check the scale again";
    sigFigsWarning: string = "Please be mindful of your sig figs" 
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
    timer: number = 0;
    sigFig = 4; //how many sig figs the final volume should be (based on lowest sig fig of of scale numbers and density)

    constructor() {
        super('WeighScene');
    }

    init(data){
        this.glasstype = data.glasstype;
        this.waterAmountStart = data.waterAmount;
    }

    create() {
        super.create();
        let x = 3 * this.WIDTH / 4;
        let y = this.HEIGHT / 2;
        this.add.rectangle(x, y, this.WIDTH / 2.2, this.HEIGHT, 0x000).setDepth(-98); //notes
        this.add.rectangle(this.WIDTH / 2, this.HEIGHT - 100, this.WIDTH, 200, 0x999999).setDepth(-99); //table
        this.chemScale = this.add.image(this.WIDTH / 3.5, this.HEIGHT - 160, 'scale');

        this.randomInitial = Math.random()*3;
        this.randomFinal = Math.random();
        if (Math.random() > .5){
            this.randomInitial = this.randomInitial * -1;
            this.randomFinal = this.randomFinal * -1;
        }
        
        this.waterTable = this.add.image(400, 350, 'waterTable').setScale(.7).setDepth(99);
        this.waterTable.alpha = 0;

        let glassX = this.WIDTH / 3.5;;
        let glassY = 0;
        switch (this.glasstype) {
            case 'beaker':
                glassY = 270;
                break;
            case 'graduatedCylinder':
                glassY = 210;
                break;
            case 'volumetricFlask':
                glassY = 225;
                break;
        }
        this.createGlassware(glassX, glassY, this.waterAmountStart);
        this.glassware.on('pointerover', () => {
            this.glassware.alpha = .3;
        }).on('pointerout', () => {
            this.glassware.alpha = 1;
        }).on('pointerdown', () => {
            this.glassware.setTintFill(0xCCC);
        }).on('pointerup', () => {
            this.glassware.alpha = 1;
            this.glassware.setTintFill(0x0091de);
            this.scene.sleep();
            this.scene.run('WaterScene', { glasstype: this.glasstype, waterTarget: this.glassware.target });
        });

        this.setTempDensity();
        this.iWeightScale = this.toDecimalPlace(this.glassware.weight + this.randomInitial, 2);


        //---------------------------------EXTRA SCENE TEXT-----------------------------------

        let inputX = x - 40;
        let inputY = 100;

        this.scaleText = this.add.text(160, 605, this.iWeightScale.toFixed(2) + " g", {
            fontSize: '48px',
            color: '#000000',
            stroke: '#000000',
            strokeThickness: 3
        });

        this.clickText = this.add.text(this.glassware.x - this.glassware.width/2, 160, "", {
            fontFamily: 'Arial',
            fontSize: '36px',
            color: '#0091de',
            align: 'right',
            fontStyle: 'bold',
            wordWrap: {
                width: 180
            }
        }).setOrigin(1,0);

        
        this.calcText = this.add.text(inputX-175, 380, "", {
            fontFamily: 'Arial',
            fontSize: '22px',
            color: '#9ED3FF',
            lineSpacing: 14,
            wordWrap: {
                width: 400
            }
        });



        //-------------------------------INPUTS and BUTTONS-----------------------------------

        this.iWeightInput = new InputLine(this, inputX, inputY, "Initial Weight", "Enter initial weight");
        this.iWeightInput.setLabel("Initial Weight: ?");

        this.iWeightInput.addOnClick(() => {
            if (this.iWeightInput.value == this.iWeightScale) {
                this.iWeightInput.showCorrect("Initial Weight: " + this.iWeightInput.value.toFixed(2) + " g");
                this.iWeight = this.iWeightInput.value;
                this.iWeightInput.hideInput();

                this.clickText.setText("CLICK GLASS TO MOVE ON ");
                this.glassware.setTintFill(0x0091de);
                this.glassware.setInteractive();
            } else if (this.toSigFig(this.iWeightInput.value,this.sigFig-1) == this.toSigFig(this.iWeightScale,this.sigFig-1)) {
                this.iWeightInput.showWarning(this.sigFigsWarning);
            } else {
                this.iWeightInput.showWarning(this.checkScaleWarning);
            }
        });

        this.fWeightInput = new InputLine(this, inputX, inputY + 50, "Final Weight: ?", "Enter final weight");
        this.fWeightInput.addOnClick(() => {
            if (this.fWeightInput.value == this.fWeightScale) {
                this.fWeightInput.showCorrect("Final Weight: " + this.fWeightInput.value.toFixed(2) + " g");
                this.fWeightInput.hideInput();
            } else if (this.toSigFig(this.fWeightInput.value,this.sigFig-1) == this.toSigFig(this.fWeightScale,this.sigFig-1)) {
                this.fWeightInput.showWarning(this.sigFigsWarning);
            } else {
                this.fWeightInput.showWarning(this.checkScaleWarning);
            }
        });

        this.densityInput = new InputLine(this, inputX, inputY + 130, "Temp: " + this.temp + " °C,  " + "Density: ?", "Enter water density");
        this.densityInput.addOnClick(() => {
            if (this.densityInput.value == this.density) {
                this.densityInput.showCorrect("Temp: " + this.temp + " °C,  " + "Density: " + this.density + " g/ml");
                this.densityInput.hideInput();

                this.volumeInput.show();
                this.waterTableButton.alpha = 0;
                this.waterTable.alpha = 0;
            } else {
                this.densityInput.showWarning("Check table for temp = " + this.temp + " °C");
            }
        });

        this.waterTableButton = new InteractiveButton(this, inputX-175, inputY + 180, "TEMP-DENSITY TABLE", "#444");
        this.waterTableButton.on('pointerup', () => {
            this.waterTableButton.buttonHover();
            if (this.waterTable.alpha == 0) {
                this.waterTable.alpha = 1;
            } else {
                this.waterTable.alpha = 0;
            }
        });


        
         //------------------------------------VOLUME CHECKS-----------------------------------
        this.volumeInput = new InputLine(this, inputX, inputY + 225, "Calculate Volume of Water", "Enter water volume");
        this.volumeInput.addOnClick(() => {

            let inputVol = this.volumeInput.value; //this.toDecimalPlace(this.volumeInput.value, 2);
            let approxInputVol = this.toDecimalPlace(inputVol,1);
            let percentOff = this.toDecimalPlace(( Math.abs(this.glassware.target - this.volume) / this.glassware.target)*100, 2);
            let mlOff = this.toSigFig(Math.abs(this.glassware.target - this.volume), this.sigFig-1);
            if (inputVol == this.volume) {
                this.volumeInput.showCorrect("Volume: " + this.volume + " ml");
                if (this.glassware.waterAmount == this.glassware.target) {
                    this.calcText.setText("CONGRATULATIONS!!\nYou've calculated the volume correctly and hit the target!" +
                        "\nYou're about " + mlOff + " ml (" + percentOff + "%) off from the target of " + this.glassware.target + " ml.");
                    this.tryAnotherButton.changeColor('#3330AA');
                } else if (this.glassware.waterAmount < this.glassware.target) {
                    this.calcText.setText("You've calculated the volume correctly, but you're too short the target!" +
                        "\nYou're about " + mlOff + " ml (" + percentOff + "%) off from the target of " + this.glassware.target + " ml.");
                } else if (this.glassware.waterAmount > this.glassware.target) {
                    this.calcText.setText("You've calculated the volume correctly, but you overshot the target!" +
                        "\nYou're about " + mlOff + " ml (" + percentOff + "%) off from the target of " + this.glassware.target + " ml.");
                }
                this.volumeInput.hideInput();
                this.tryAgainButton.changeColor('#3330AA');
            } else if ((this.toDecimalPlace(inputVol,0) == this.toDecimalPlace(this.volume, 0)) && (this.countDecimals(inputVol) != this.countDecimals(this.volume))) {
                this.calcText.setText("Your calculated volume doesn't match the correct number of significant figures. Since we are multiplying and dividing, use the LEAST number of sig figs from your calculation numbers.");
                this.volumeInput.showWarning("Calculate Volume of Water to " + this.sigFig + " Sig Figs");
            } else if (approxInputVol == this.toDecimalPlace(this.fWeightScale / this.density, 1)) {
                this.calcText.setText("You may have used your final scale weight for mass.\nRemember that MASS is your FINAL WEIGHT - INITIAL WEIGHT.");
                this.volumeInput.showWarning("Calculate Volume of Water");
            } else if (approxInputVol == this.toDecimalPlace(this.iWeightScale / this.density, 1)) {
                this.calcText.setText("You may have used your initial scale weight for mass.\nRemember that MASS is your FINAL WEIGHT - INITIAL WEIGHT.");
                this.volumeInput.showWarning("Calculate Volume of Water");
            } else if (approxInputVol == this.toDecimalPlace(this.density / this.mass, 1)) {
                this.calcText.setText("You may have gotten the formula backwards. Consider:\nDENSITY = MASS/VOLUME\nVOLUME = MASS/DENSITY");
                this.volumeInput.showWarning("Calculate Volume of Water");
            } else {
                this.calcText.setText("Try using the formula:\nDENSITY = MASS/VOLUME\nto find the volume of water.")
                this.volumeInput.showWarning("Calculate Volume of Water");
            }
        });

        this.tryAgainButton = new InteractiveButton(this, inputX - 175, inputY + 550, "START OVER", "#444");
        this.tryAgainButton.on('pointerup', () => {
            this.scene.restart();
        });

        this.tryAnotherButton = new InteractiveButton(this, inputX - 25, inputY + 550, "TRY A DIFFERENT GLASSWARE", "#444");
        this.tryAnotherButton.on('pointerup', () => {
            this.scene.start('SelectionScene');
        });

        this.fWeightInput.hide();
        this.densityInput.hide();
        this.waterTableButton.alpha = 0;
        this.volumeInput.hide();

        this.events.on('wake', this.onWake, this);

        /*
        //---------------------------------------------- DEBUG ----------------------------------------------
        setInterval( ()=>{
            console.log({iWeight: this.iWeight, density: this.density, volume: this.volume, percent: this.toDecimalPlace(( Math.abs(this.glassware.target - this.volume) / this.glassware.target)*100, 2)});
        }, 4000 );
        */
    }



    onWake(sys, data){
        this.input.disable(this.glassware);
        this.glassware.setTintFill(0xCCC);

        this.waterAmountStart = data.waterAmount;
        this.glassware.setWater(this.waterAmountStart);
        this.glassware.target = data.waterTarget;
        this.fWeightScale = this.toDecimalPlace( this.iWeightScale + (this.waterAmountStart * (1+ this.randomFinal * this.glassware.percentVariation)), 2);
        this.scaleText.setText(this.fWeightScale.toFixed(2) + " g");

        this.mass = this.fWeightScale - this.iWeightScale;
        this.volume = this.toSigFig(this.mass/this.density, this.sigFig);

        this.fWeightInput.show();
        this.densityInput.show();
        this.waterTableButton.alpha = 1;
        this.clickText.alpha = 0;
    }

    
    update() {
        //this.clickText.setText("val: " + this.iWeightInput.value);
        //this.iWeightInput.setLabel("Initial Weight: " + this.iWeightInput.value + " g");
    }
    
    withinRange(num: number, lower: number, upper:number):boolean{
        if(num <= upper && num >= lower){
            return true;
        }else{
            return false;
        }
    }

    //rounds theninput number to a certain number of decimal places
    toDecimalPlace(num: number, place: number):number{
        return (Math.round(num * Math.pow(10,place)) / Math.pow(10,place) );
    }

    //rounds to sig fig
    toSigFig(num: number, sigfig: number):number{
        return Number(new Number(num).toPrecision(sigfig)).valueOf();
    }

    countDecimals (value:number) : number {
        if ((value % 1) != 0) 
            return value.toString().split(".")[1].length;  
        return 0;
    }


    //if there's a formula for this, use that instead
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
            case 5:
                this.temp = 25.6;
                this.density = 0.996888;
                break;
            default:
                this.temp = 16.9
                this.density = 0.998792;
        }
    }

}
