/*
export default class Notes {

    iWeight: number;
    fWeight: number;
    

    constructor(scene: Phaser.Scene, x: number, y: number, w: number, h: number) {
        scene.add.rectangle(x, y, w, h, 0x000 );
        //scene.add.text(x,y,"*interactive notes go here");
        
        let header = scene.add.text(800,100,"");

        //note: must wrap returned doc element with HTMLInputElement for inputs; no value property on HTMLElement 
        let form = scene.add.dom(x, y).createFromCache('form');

        form.addListener('click');
        form.on('click', (event) => {
            if (event.target.name === 'iSubmit'){
                
                header.text = "buttonHit";
                
                let iWeightLabel = document.getElementById("iWeightLabel"); //gets html part
                let iWeightElement = (<HTMLInputElement>document.getElementById("iWeight"));
                this.iWeight = parseFloat(iWeightElement.value);

                if(iWeightLabel){
                    if(this.iWeight){
                        iWeightLabel.innerText = "Initial Weight: " + this.iWeight;

                        //can hide visibility like this 
                        //iWeightElement.style.visibility = "hidden";
                        //(<HTMLInputElement>document.getElementById("iSubmit")).style.visibility = "hidden";
                        

                        //prompts to move to water scene
                        //scene.scene.start('WaterScene');
                    }else{
                        iWeightLabel.innerText = "Please enter a weight";
                    }
                }
            }
        });

    }
    
}
*/
