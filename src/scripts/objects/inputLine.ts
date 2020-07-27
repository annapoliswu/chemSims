export default class InputLine{
    form: Phaser.GameObjects.DOMElement;
    label: HTMLParagraphElement;
    input: HTMLInputElement;
    value: number;
    submit: HTMLInputElement;

    constructor(scene: Phaser.Scene, x: number, y: number, label: string, placeholder: string) {
        this.form = scene.add.dom(x, y).createFromCache('inputLine');
        this.label = (<HTMLParagraphElement>document.getElementById("label")); //gets html part
        this.input = (<HTMLInputElement>document.getElementById("input"));
        this.submit = (<HTMLInputElement>document.getElementById("submit"));
        
        this.setText(label);
        this.setPlaceholder(placeholder);
        
        this.form.addListener('click');
        this.form.on('click', (event) => {
            if (event.target.name === 'submit' ){
                this.value =  parseFloat(this.input.value);
            }
        });
    }

    setText(newLabel: string){
        this.label.textContent = newLabel;
    }

    setPlaceholder(newPlaceholder: string){
        this.input.placeholder = newPlaceholder;
    }


}