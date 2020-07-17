export default class Notes {

    constructor(scene: Phaser.Scene, x: number, y: number, w: number, h: number) {
        scene.add.rectangle(x, y, w, h, 0x000 );
        scene.add.text(x,y,"*interactive notes go here");
    }
}
