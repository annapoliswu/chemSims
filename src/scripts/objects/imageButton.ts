
export default class ImageButton{
    glass;
    text;

    constructor(scene: Phaser.Scene, x: number, y: number, imageName: string, text: string) {
        this.glass = scene.add.image(x, y, imageName).setOrigin(.5,0);
        
        this.text = scene.add.text(x, y-this.glass.height*.05, text.toUpperCase(), 
        { backgroundColor: '#2badf1', color: '#000', fontStyle: 'bold', fontSize: 32, align: 'center', fixedWidth: this.glass.width*1.2, wordWrap: {width: this.glass.width}, padding:{top:this.glass.height*1.1, bottom:this.glass.height*.05}}).setDepth(-99).setOrigin(.5,0);

        this.text.on('pointerover', () => {this.buttonHover()})
            .on('pointerout', () => {this.buttonRest()})
            .on('pointerdown', () => {this.buttonDown()});

        this.setScale(.6);
        this.text.setInteractive();
    }
    

    buttonHover(){
        this.glass.alpha = .5;
        this.text.alpha = .5;
    }
    buttonRest(){
        this.glass.alpha = 1;
        this.text.alpha = 1;
    }
    buttonDown(){
        this.glass.alpha = 1;
        this.text.alpha = 1;
    }

    onClick(someFunction: () => void) {
        this.text.on('pointerup', () => {someFunction();});
    }

    setScale(scale: number){
        this.glass.setScale(scale);
        this.text.setScale(scale);
    }

}