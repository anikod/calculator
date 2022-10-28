'use strict';

let domOutput = document.querySelector('.output');
const domVarPrevious_1 = document.querySelector('.previous-1');
const domVarPrevious_2 = document.querySelector('.previous-2');
const domOperation = document.querySelector('.operation');
const domResult = document.querySelector('.result');
const domKeyboard = document.querySelector('.keyboard');

const calculator = {
    varPrevious_1: '',
    varPrevious_2: '',
    varOperation: '',
    varCurrent: '',
    varResult: '',

    display(msg) {
        // Let's see some debug here:
        console.log(`Some debug info here:
    message: ${msg}
    varPrevious_1: ${calculator.varPrevious_1}
    varPrevious_2: ${calculator.varPrevious_2}
    varOperation: ${calculator.varOperation}
    varCurrent: ${calculator.varCurrent}
    varResult: ${calculator.varResult}
    `);

        domOutput.innerText = this.varCurrent || this.varResult || 0;

        domVarPrevious_1.innerText = this.varPrevious_1 || 0;
        domOperation.innerText = this.varOperation;
        domVarPrevious_2.innerText = this.varPrevious_2;

        // if (this.varResult) {
        //   console.log('typeof result: ', typeof this.varResult);
        //   domResult.innerText = '= ' + this.varResult;
        // }
        domResult.innerText =
            this.varResult | (this.varResult === 0)
                ? '= ' + this.varResult
                : '';
    },

    calc() {
        switch (this.varOperation) {
            case '+':
                this.varResult = +this.varPrevious_1 + +this.varPrevious_2;
                this.varCurrent = '';
                break;

            case '-':
                this.varResult = this.varPrevious_1 - this.varPrevious_2;
                this.varCurrent = '';
                break;
        }
    },
};

// Starting main program
calculator.display();

keyboard.addEventListener('click', (evt) => {
    let buttonPressedValue = evt.target.innerText;

    switch (buttonPressedValue) {
        case 'C':
            break;

        case 'CE':
            break;

        case '+':
            if (calculator.varOperation && !calculator.varResult) {
                calculator.calc();
                calculator.display('plus: is varOperation and no varResult');
                break;
            }

            if (calculator.varOperation && calculator.varResult) {
                calculator.varPrevious_1 = calculator.varResult;
                calculator.varPrevious_2 = '';
                calculator.varResult = '';
                calculator.varOperation = '+';
                calculator.varCurrent = '';
                calculator.display('plus: is varOperation and varResult');
                break;
            }

            calculator.varOperation = '+';
            calculator.varCurrent = '';

            calculator.display('plus: default');
            break;

        case '-':
            if (calculator.varOperation && !calculator.varResult) {
                calculator.calc();
                calculator.display('minus: is varOperation and no varResult');
                break;
            }

            if (calculator.varOperation && calculator.varResult) {
                calculator.varPrevious_1 = calculator.varResult;
                calculator.varPrevious_2 = '';
                calculator.varResult = '';
                calculator.varOperation = '-';
                calculator.varCurrent = '';
                calculator.display('minus: is varOperation and varResult');
                break;
            }

            calculator.varOperation = '-';
            calculator.varCurrent = '';

            calculator.display('minus: default');
            break;

        case '=':
            calculator.calc(calculator.varOperation);
            calculator.display('equals: default');
            calculator.varOperation = '';
            break;

        default:
            if (buttonPressedValue.length !== 1) {
                break;
            }
            calculator.varCurrent += buttonPressedValue;
            // в общем здесь походу необходимо делать проверки на
            // отображение и что куда записывать:
            // если имеется результат, то провести его обработку
            if (calculator.varResult) {
                calculator.varPrevious_1 = calculator.varResult;
                calculator.varPrevious_2 = '';
                calculator.varResult = '';
                calculator.display('button: is varResult');
                // break;
            }

            // здесь надо сделать отправку значения в previous_1 или в previous_2
            // условие проверки -- наличие установленной операции
            if (calculator.varOperation) {
                calculator.varPrevious_2 = calculator.varCurrent;
            } else {
                calculator.varPrevious_1 = calculator.varCurrent;
            }

            calculator.display('press button default');
            break;
    }
});
