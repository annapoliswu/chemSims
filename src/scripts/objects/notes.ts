export default class Notes {

    constructor(scene: Phaser.Scene, x: number, y: number, w: number, h: number) {
        scene.add.rectangle(x, y, w, h, 0x000 );
        //scene.add.text(x,y,"*interactive notes go here");

        let f = scene.add.dom(x, y).createFromCache('form');

        f.addListener('click');
        f.on('click', function (event) {
            if (event.target.name === 'playButton'){
                
                scene.add.text(800,100,"playHit");
                let element = document.getElementById("text"); //gets html part
                if(element){
                    element.innerHTML = "YESYESYES";
                }
            }
        });

        //let formUtil = new FormUtil({scene:scene,rows:11,cols:11});
    
    }
    
}
