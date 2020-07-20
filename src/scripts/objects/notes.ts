export default class Notes {

    constructor(scene: Phaser.Scene, x: number, y: number, w: number, h: number) {
        scene.add.rectangle(x, y, w, h, 0x000 );
        //scene.add.text(x,y,"*interactive notes go here");

        let f = scene.add.dom(x, y).createFromCache('form');
        let header = scene.add.text(800,100,"");

        f.addListener('click');
        f.on('click', function (event) {
            if (event.target.name === 'playButton'){
                
                header.text = "playHit"
                
                let element = document.getElementById("text"); //gets html part
                let inputText = document.getElementById("name");
                if(element){
                    if(inputText && inputText.innerHTML){ //cannot use inner on input types; nothing between html tags
                        element.innerText = "aghhh"; //how to extract input value???
                    }else{
                        element.innerText = "null input";
                    }
                }
            }
        });

    }
    
}
