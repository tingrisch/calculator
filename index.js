import React from 'react'
import ReactDOM from 'react-dom'
import './styles.css';

// 1. What state is there?
// 2. When does it change?

class Calculator extends React.Component {
  state = {
    displayValue: '0',
    waitingForOperation: false,
    operator: null,
    operationDigit: null
  }

  computeResult = () => {
    const { displayValue, waitingForOperation, operator, operationDigit } = this.state
    let result = null

    switch(operator) {
      case '+':
        result = Number(operationDigit) + Number(displayValue)
        break
      case '-':
        result = Number(operationDigit) - Number(displayValue)
        break
      case '/':
        result = Number(operationDigit) / Number(displayValue)
        break
      case '*':
        result = Number(operationDigit) * Number(displayValue)
        break
    }

    this.setState({
      displayValue: String(result)
    })
  }

  inputDigit = digit => {
    const { displayValue, waitingForOperation, operator, operationDigit } = this.state
    let result = null
    let oldDigit = null
    
    if (waitingForOperation === true) {
      result = digit
      oldDigit = displayValue
    } else {
      result = (displayValue !== '0') ? displayValue + String(digit) : String(digit)
    }

    this.setState({
      displayValue: result,
      operationDigit: oldDigit
    })
  }

  clearDisplay = () => {
    this.setState({
      displayValue: '0',
      waitingForOperation: false,
      operator: null
    })
  }

  changeSign = () => {
    const { displayValue } = this.state

    this.setState({
      displayValue: (this.state.displayValue > 0) ? `-${displayValue}` : Math.abs(displayValue)
    })
  }

  addDot = () => {
    const { displayValue } = this.state

    this.setState({
      displayValue: (displayValue.indexOf('.') === -1) ? displayValue + '.' : displayValue
    })
  }

  doOperation = (operator) => {
    this.setState({
      waitingForOperation: true,
      operator: operator
    })
  }

  render() {
    const { displayValue } = this.state;
    console.log(this.state);

    return (
      <div className="calculator">
        <div className="calculator-display">{displayValue}</div>
        <div className="calculator-keypad">
          <div className="input-keys">
            <div className="function-keys">
              <button className="calculator-key key-clear" onClick={() => this.clearDisplay()}>AC</button>
              <button className="calculator-key key-sign" onClick={() => this.changeSign()}>±</button>
              <button className="calculator-key key-percent">%</button>
            </div>
            <div className="digit-keys">
              <button className="calculator-key key-0" onClick={() => this.inputDigit(0)}>0</button>
              <button className="calculator-key key-dot" onClick={() => this.addDot()}>●</button>
              <button className="calculator-key key-1" onClick={() => this.inputDigit(1)}>1</button>
              <button className="calculator-key key-2" onClick={() => this.inputDigit(2)}>2</button>
              <button className="calculator-key key-3" onClick={() => this.inputDigit(3)}>3</button>
              <button className="calculator-key key-4" onClick={() => this.inputDigit(4)}>4</button>
              <button className="calculator-key key-5" onClick={() => this.inputDigit(5)}>5</button>
              <button className="calculator-key key-6" onClick={() => this.inputDigit(6)}>6</button>
              <button className="calculator-key key-7" onClick={() => this.inputDigit(7)}>7</button>
              <button className="calculator-key key-8" onClick={() => this.inputDigit(8)}>8</button>
              <button className="calculator-key key-9" onClick={() => this.inputDigit(9)}>9</button>
            </div>
          </div>
          <div className="operator-keys">
            <button className="calculator-key key-divide" onClick={() => this.doOperation('/')}>÷</button>
            <button className="calculator-key key-multiply" onClick={() => this.doOperation('*')}>×</button>
            <button className="calculator-key key-subtract" onClick={() => this.doOperation('-')}>−</button>
            <button className="calculator-key key-add" onClick={() => this.doOperation('+')}>+</button>
            <button className="calculator-key key-equals" onClick={() => this.computeResult()}>=</button>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <div id="wrapper">
    <Calculator/>
  </div>,
  document.getElementById('app')
)