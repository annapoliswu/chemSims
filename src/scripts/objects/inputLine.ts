export default class InputLine{
    private form: Phaser.GameObjects.DOMElement;
    private label: HTMLParagraphElement;
    private input: HTMLInputElement;
    private submit: HTMLInputElement;
    public value: number;
    

    constructor(scene: Phaser.Scene, x: number, y: number, label: string, placeholder: string) {

        this.form = scene.add.dom(x, y).createFromCache('inputLine');
        this.label = (<HTMLInputElement>this.form.node.getElementsByClassName('label')[0]);
        this.input = (<HTMLInputElement>this.form.node.getElementsByClassName('input')[0]);
        this.submit = (<HTMLInputElement>this.form.node.getElementsByClassName('submit')[0]);
        
        this.setLabel(label);
        this.setPlaceholder(placeholder);
        
        this.form.addListener('click');
        this.form.on('click', (event) => {
            if (event.target.name === 'submit' ){
                this.value =  parseFloat(this.input.value);
            }
        });
    }

    setLabel(newLabel: string){
        this.label.textContent = newLabel;
    }

    setPlaceholder(newPlaceholder: string){
        this.input.placeholder = newPlaceholder;
    }

    addOnClick(someFunction: () => void) {
        this.form.on('click', (event) => {
            if (event.target.name === 'submit') {
                someFunction();
            }
        });
    }  

    hideInput(){
        this.input.style.display = "none";
        this.submit.style.display = "none";
    }

    showInput(){
        this.input.style.display = "inline";
        this.submit.style.display = "inline";
    }

    show(){
        this.form.alpha = 1;
    }

    hide(){
        this.form.alpha = 0;
    }

    showNormal(text : string){
        this.input.style.color = "black";
        this.input.style.borderColor = "black";
        this.label.style.color = "white";
        this.setLabel(text);
    }

    showWarning(text : string){
        this.input.style.color = "#ff4f4f";
        this.input.style.borderColor = "#ff4f4f";
        this.label.style.color = "#ff4f4f";
        this.setLabel(text);
    }

    showCorrect(text : string){
        this.input.style.color = "#c0e892";
        this.input.style.borderColor = "#c0e892";
        this.label.style.color = "#c0e892";
        this.setLabel(text);
    }


}