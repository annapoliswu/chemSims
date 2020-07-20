export default class Notes {

    initialWeight: number;
    finalWeight: number


    constructor(scene: Phaser.Scene, x: number, y: number, w: number, h: number) {
        scene.add.rectangle(x, y, w, h, 0x000 );
        //scene.add.text(x,y,"*interactive notes go here");
        
        let header = scene.add.text(800,100,"");

        /*note: must wrap returned doc element with HTMLInputElement for inputs; no value property on HTMLElement */
        let form = scene.add.dom(x, y).createFromCache('form');

        form.addListener('click');
        form.on('click', (event) => {
            if (event.target.name === 'initialSubmit'){
                
                header.text = "buttonHit"
                
                let element = document.getElementById("initialWeightLabel"); //gets html part
                this.initialWeight = parseFloat((<HTMLInputElement>document.getElementById("initialWeight")).value);
                if(element){
                    if(this.initialWeight){
                        element.innerText = "Initial Weight: " + this.initialWeight;
                    }else{
                        element.innerText = "null input";
                    }
                }
            }
        });

    }
    
}
