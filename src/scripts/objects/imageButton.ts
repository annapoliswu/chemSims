
export default class ImageButton{
    glass: Phaser.GameObjects.Image;
    text: Phaser.GameObjects.Text;
    rect: Phaser.GameObjects.Rectangle;
    bgColor:number = 0x2badf1;

    constructor(scene: Phaser.Scene, x: number, y: number, imageName: string, text: string) {
        this.glass = scene.add.image(x, y, imageName).setTintFill(0x000).setDepth(99).setOrigin(.5,0);
        
        this.text = scene.add.text(x, y-this.glass.height*.05, text.toUpperCase(), 
        { color: '#000', fontStyle: 'bold', fontSize: 24, fontFamily: 'Arial', align: 'center', fixedWidth: this.glass.width*1.2, wordWrap: {width: this.glass.width}, padding:{top:this.glass.height*1.1, bottom:this.glass.height*.05}}).setDepth(99).setOrigin(.5,0);
        this.rect = scene.add.rectangle(x, y-this.glass.height*.05, this.glass.width*1.25, this.glass.height*1.25).setDepth(-99).setOrigin(.5,0);
        this.rect.setStrokeStyle(2, 0x000, 1);
        this.rect.setFillStyle(this.bgColor, .2);

        this.text.on('pointerover', () => {this.buttonHover()})
            .on('pointerout', () => {this.buttonRest()})
            .on('pointerdown', () => {this.buttonDown()});

        this.setScale(.7);
        this.text.setInteractive();
    }
    

    buttonHover(){
        this.rect.setFillStyle(this.bgColor, 1);
    }
    buttonRest(){
        this.glass.alpha = 1;
        this.rect.setFillStyle(this.bgColor, .2);
    }
    buttonDown(){
        this.glass.alpha = 1;
    }

    onClick(someFunction: () => void) {
        this.text.on('pointerup', () => {someFunction();});
    }

    setScale(scale: number){
        this.glass.setScale(scale);
        this.text.setScale(scale);
        this.rect.scale = scale;
    }

}