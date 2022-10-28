'use strict';

const domOutput = document.querySelector('.output');
const domVarPrevious_1 = document.querySelector('.previous-1');
const domVarPrevious_2 = document.querySelector('.previous-2');
const domOperation = document.querySelector('.operation');
const domResult = document.querySelector('.result');
const domKeyboard = document.querySelector('.keyboard');

let varPrevious_1 = '';
let varPrevious_2 = '';
let varOperation = '';
let varCurrent = '';
let varResult = '';

keyboard.addEventListener('click', (evt) => {
  let buttonPressedValue = evt.target.innerText;

  switch (buttonPressedValue) {
    case 'C':
      break;

    case 'CE':
      break;

    case '+':
      if (currentOp === '+') {
        previousVal += +currentVal;
        output.innerText = previousVal;
        // currentOp = '';
        // document.querySelector('.')
        result.innerText = previousVal;
        currentVal = '';
        output.innerText = 0;
      } else {
        operation.innerText = '+';
        currentOp = '+';
        // result
        previousVal = +currentVal;
        result.innerText = previousVal;
        currentVal = '';
        output.innerText = 0;
      }
      break;

    case '-':
      if (!varPrevious_1) {
        // varPrevious = varCurrent;
        // varOperation = '-';
        // domVarPrevious_1.innerText = parseFloat(varPrevious);
        // domOperation.innerText = '-';
        // varCurrent = '';
        varPrevious_1 = parseFloat(varCurrent);
        varCurrent = '';
        varOperation = '-';
        display();
        break;
      }
      // calc(varOperation);
      if (!varResult) {
        varPrevious_2 = parseFloat(varCurrent);
        varCurrent = '';
        varOperation = '-';
        calc(varOperation);
        display();
        break;
      }
      varPrevious_1 = varResult;
      varPrevious_2 = parseFloat(varCurrent);
      varOperation = '-';
      calc(varOperation);
      display();
      break;

    case '=':
      calc(varOperation);
      display();
      break;

    default:
      if (buttonPressedValue.length == 1) {
        varCurrent += buttonPressedValue;
      }
      display();
      break;
  }

  function calc(operation) {
    // if (!varPrevious - 1 && !varPrevious - 2 && !varOperation) {
    //   return;
    // }
    switch (operation) {
      case '-':
        varResult = varPrevious_1 - varPrevious_2;

        // domOutput.innerText = varPrevious;
        // domResult.innerText = '= ' + varPrevious;
        varCurrent = '';
        varOperation = '';
        break;
    }
  }

  function display() {
    domOutput.innerText = varCurrent || 0;

    if (!varPrevious_1) {
      // domVarPrevious_1.innerText = varCurrent ? varCurrent : 0;
      domVarPrevious_1.innerText = varCurrent || 0;
    } else {
      domVarPrevious_2.innerText = varCurrent;
    }
    // domVarPrevious_1.innerText = varCurrent || 0;
    // domVarPrevious_2.innerText = varCurrent || '';

    if (varOperation) {
      domOperation.innerText = varOperation;
    }

    if (varPrevious_2) {
      domVarPrevious_2.innerText = varPrevious_2;
    }

    if (varResult) {
      domResult.innerText = '= ' + varResult;
    }
  }

  //   output.innerHTML = Math.round(Math.random() * 100);
  //   output.innerHTML = evt.target.innerText;
  //   console.log('evt: ', evt);
  //   console.log('evt target: ', evt.target);
  //   console.log('evt current target: ', evt.currentTarget);
  //   //   console.dir(evt);
  //   console.log(
  //     '----------------------------------------------------------------'
});

// const img = document.querySelector('img');
// const imager = setInterval(
//   () => (img.src = 'http://picsum.photos/100?' + new Date().getTime()),
//   15000
// );
// image.src = 'http://localhost/image.jpg?' + new Date().getTime();
// });
