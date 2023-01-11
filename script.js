const previosOpereationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator{
    constructor(previosOpereationText, currentOperationText){
        this.previosOpereationText = previosOpereationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }
    addDigt(digit){
        if(digit === "." && this.currentOperationText.innerText.includes(".")){
            return;
        }
        this.currentOperation = digit;
        this.updateScreen();
    }
    processOperation(operation){
        if(this.currentOperationText.innerText === "" && operation !== "C"){
            if(this.previosOpereationText.innerText !== ""){
                this.changeOperation(operation);
            }
            return;
        }
        let operationValue;
        const previos = +this.previosOpereationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation){
            case "+":
                operationValue = previos + current;
                this.updateScreen(operationValue, operation, current, previos);
                break;
            case "-":
                operationValue = previos - current;
                this.updateScreen(operationValue, operation, current, previos);
                break;
            case "*":
                operationValue = previos * current;
                this.updateScreen(operationValue, operation, current, previos)
                break;
            case "/":
                operationValue = previos / current;
                this.updateScreen(operationValue, operation, current, previos);
                break;
            case "DEL":
                this.processDelOperation();
                break;
            case "CE":
                this.procesClearCurrentOpration();
                break;
            case "C":
                this.procesClearOpration();
                break;
            case "=":
                this.procesEqualsOperation();
                break
            default:
            return;
        }
    }
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previos = null
        ){
        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation;
        }else{
            if(previos === 0){
                operationValue = current
            }
            this.previosOpereationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }
    changeOperation(operation){
        const mathOperations = ["*", "/", "+", "-"];
        if(!mathOperations.includes(operation)){
            return;
        }
        this.previosOpereationText.innerText = 
            this.previosOpereationText.innerText.slice(0, -1) + operation;
    }
    processDelOperation(){
        this.currentOperationText.innerText = 
            this.currentOperationText.innerText.slice(0, -1);
    }
    procesClearCurrentOpration(){
        this.currentOperationText.innerText = "";
    }
    procesClearOpration(){
        this.currentOperationText.innerText = "";
        this.previosOpereationText.innerText = "";
    }
    procesEqualsOperation(){
        const operation = this.previosOpereationText.innerText.split(" ")[1];
        this.processOperation(operation);
    }
}
const calc = new Calculator(previosOpereationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        
        const value = e.target.innerText;

        if(+value >= 0 || value === "."){
            calc.addDigt(value);
        }else{
            calc.processOperation(value);
        }
    });
});