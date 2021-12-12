import React from "react";

function CalcButton(props) {
    return (
        <button className={props.className} onClick={props.onClick}>{props.value}</button>
    );
}

function Display(props) {
    return(
        <div className="displayContainer">{props.value}</div>
    );
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            display: "",
            isOperation: [],
            value: [],
        }
    }

    renderButton(i, className) {
        if (className === undefined) {
            className = "calcButton";
        }
        
        return(
            <CalcButton value={i} onClick={() => this.handleClick(i)} className={className}></CalcButton>
        );
    }

    //returns boolean reflecting validity of input, updates this.state.isOperation array
    validInput(input) {
        let operations = ["+","-","X","/","ac","="];
        let isOperation = this.state.isOperation.slice();
        let lastValue = this.state.value.slice(-1)[0];
        let valueIsOperation = false;
        let lastValueIsOperation = undefined;

        //sets valueIsOperation boolean
        for (let i = 0; i < 6; i++) {
            if (input === operations[i]) {
                valueIsOperation = true;
            }
        }
        
        //sets lastValueIsOperation boolean
        if (isOperation.length === 0) {
            lastValueIsOperation = true
        } else {
            lastValueIsOperation = isOperation.slice(-1).pop();
        }

        //return false if two operations being typed back to back, except "ac"
        if (lastValueIsOperation && valueIsOperation) {
            if(input === "ac") {
                return true;
            } else {
                return false;
            }
        }

        //return false if last input was "="
        if (lastValue === "=") {
            return false;
        } else {
            //updates this.state.isOperation array
            isOperation.push(valueIsOperation);
            this.setState({isOperation: isOperation});
            return true;
        }
    }

    handleClick(i) {
        let value = this.state.value.slice();
        let display = this.state.display;
        let answer = "";

        if(!this.validInput(i)) {
            return;
        }
        
        if(i === "ac") {
            this.setState({
                display: "",
                isOperation: [],
                value: [],
            });
            return;
        }

        value.push(i);
        display = display + i;

        if(i === "=") {
            answer = this.calculate();
            display = display + answer;
        }

        this.setState({
            display: display,
            value: value,
        });
    }

    calculate() {
        let concat = "";
        let numbers = [];
        let operations = [];
        let value = this.state.value.slice();
        let isOperation = this.state.isOperation.slice();

        //process this.state.value into numbers and operations
        for(let i = 0; i < value.length; i++) {
            if(!isOperation[i]) {
                concat = concat + value[i];
                if(i === (value.length - 1)) {
                    numbers.push(concat);
                }
            } else {
                numbers.push(concat);
                operations.push(value[i]);
                concat = "";
            }
        }

        //convert numbers from type string to number
        for(let i = 0; i < numbers.length; i++) {
            numbers[i] = parseInt(numbers[i]);
        }

        function evaluate(index, operation) {
            let answer;
            let number1 = numbers[index];
            let number2 = numbers[index + 1];

            switch(operation) {
                case "X":
                    answer = number1 * number2;
                    break;
                case "/":
                    answer = number1 / number2;
                    break;
                case "+":
                    answer = number1 + number2;
                    break;
                case "-":
                    answer = number1 - number2;
                    break;
                default:
                    break
            }

            numbers[index] = answer;
            numbers.splice(index + 1, 1);
            operations.splice(index, 1);
        }
        
        let oper = ["X","/","+","-"];

        for(let i = 0; i < 4; i++) {

            let operationsLength = operations.length;

            for(let j = 0; j < operationsLength; j++) {
                if(operations[j] === oper[i]) {
                    evaluate(j, oper[i]);
                    operationsLength--;
                    j--;
                }
            }
        }

        return(numbers[0].toString());
    }

    render() {
        return(
            <div className="calcContainer">
                <Display value={this.state.display}></Display>
                <div className="buttonRow">
                    {this.renderButton("1")}
                    {this.renderButton("2")}
                    {this.renderButton("3")}
                    {this.renderButton("+")}
                </div>
                <div className="buttonRow">
                    {this.renderButton("4")}
                    {this.renderButton("5")}
                    {this.renderButton("6")}
                    {this.renderButton("-")}
                </div>
                <div className="buttonRow">
                    {this.renderButton("7")}
                    {this.renderButton("8")}
                    {this.renderButton("9")}
                    {this.renderButton("X")}
                </div>
                <div className="buttonRow">
                    {this.renderButton("ac", "acButton")}
                    {this.renderButton("=")}
                    {this.renderButton("/")}
                </div>
            </div>
            
        );  
    }
}

export default Calculator;