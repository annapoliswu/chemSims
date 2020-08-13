
export default class InteractiveButton extends Phaser.GameObjects.Text {
    bgColor:string;

    constructor(scene: Phaser.Scene, x: number, y: number, name: string, bgColor: string, fSize?:number) {
        let fString;
        if(fSize){
            fString = fSize + 'px';
        }else{
            fString = '16px';
        }
        super(scene, x, y, name, {fontSize: fString, backgroundColor: bgColor, align: 'center', padding:{left:20,top:20}});
        this.bgColor = bgColor;

        scene.add.existing(this);
        
        this.on('pointerover', () => {this.buttonHover()})
            .on('pointerout', () => {this.buttonRest()})
            .on('pointerdown', () => {this.buttonDown()});

        this.setInteractive();
    }
    

    buttonHover(){
        this.setStyle({backgroundColor:'#2badf1'});
    }
    buttonRest(){
        this.setStyle({backgroundColor:this.bgColor});
    }
    buttonDown(){
        this.setStyle({backgroundColor:'#2289bf'});
    }

    changeColor(color: string){
        this.bgColor = color;
        this.setStyle({backgroundColor: this.bgColor});
    }

}