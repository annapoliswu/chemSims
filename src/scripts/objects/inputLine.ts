export default class InputLine{
    private form: Phaser.GameObjects.DOMElement;
    private label: HTMLParagraphElement;
    private input: HTMLInputElement;
    private submit: HTMLInputElement;
    public value: number;
    static numInstances: number = 0; //count inside causing errors?? not sure
    

    constructor(scene: Phaser.Scene, x: number, y: number, label: string, placeholder: string, n: number) {

        //doesn't work either.. setting previous elements, getElement function maybe -> undefined referring to same id. 
        //let htmlstring = '<div id="container" class="container"><p id="label" class="label">Initial Weight: </p><input type="number" id="input" name="input" placeholder="aa"onkeydown="return event.keyCode !== 69"><input type="button" id="submit" name="submit" value="SUBMIT"></div>'
        //this.form = scene.add.dom(x, y).createFromHTML(htmlstring);

        this.form = scene.add.dom(x, y).createFromCache('inputLine');
        this.label = (<HTMLParagraphElement>document.getElementsByClassName("label")[InputLine.numInstances]);
        this.input = (<HTMLInputElement>document.getElementsByClassName("input")[InputLine.numInstances]);
        this.submit = (<HTMLInputElement>document.getElementsByClassName("submit")[InputLine.numInstances]);
        
        this.setLabel(label);
        this.setPlaceholder(placeholder);
        
        this.form.addListener('click');
        this.form.on('click', (event) => {
            if (event.target.name === 'submit' ){
                this.value =  parseFloat(this.input.value);
            }
        });
        InputLine.numInstances++;
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

    showNormal(text : string){
        this.input.style.color = "black";
        this.input.style.borderColor = "black";
        this.label.style.color = "white";
        this.setLabel(text);
    }

    showWarning(text : string){
        this.input.style.color = "red";
        this.input.style.borderColor = "red";
        this.label.style.color = "red";
        this.setLabel(text);
    }

    showCorrect(text : string){
        this.input.style.color = "green";
        this.input.style.borderColor = "green";
        this.label.style.color = "green";
        this.setLabel(text);
    }


}