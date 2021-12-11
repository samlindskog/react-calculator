import React from "react";

function CalcButton(props) {
    return (
        <button className={props.className}>{props.number}</button>
    );
}

function Display(props) {
    return(
        <div className="displayContainer">poggers</div>
    );
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    renderButton(i, className) {
        if (className == undefined) {
            className = "calcButton";
        }
        
        return(
            <CalcButton number={i} className={className}></CalcButton>
        );
    }

    render() {
        return(
            <div className="calcContainer">
                <Display></Display>
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