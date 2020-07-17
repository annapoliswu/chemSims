
export default class InteractiveButton extends Phaser.GameObjects.Text {

    constructor(scene: Phaser.Scene, x: number, y: number, name: string) {
        super(scene, x, y, name, { backgroundColor: '#000', padding:{left:20,top:20}});
        scene.add.existing(this);
        
        this.on('pointerover', () => {this.buttonHover()})
            .on('pointerout', () => {this.buttonRest()})
            .on('pointerdown', () => {this.buttonDown()});

        this.setInteractive();
    }
    
    buttonHover(){
        this.setStyle({backgroundColor:'#00CCCC'});
    }
    buttonRest(){
        this.setStyle({backgroundColor:'#000'});
    }
    buttonDown(){
        this.setStyle({backgroundColor:'#00AAAA'});
    }
}