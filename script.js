'use strict';

// TODO:
// * при повторном нажатии "равно" повторить последнюю операцию.
// * обработка начального нуля в дробях.
// * обработка минуса в П-1: сделать небольшой отступ в минидисплее,
//   минус помещать туда. Сложно и ненужно? Не раскисать, сопля! Ну
//   ладно, ладно, просто сделай возможность ввода первого числа отрицательным.
// * Интересно, как происходит контроль типов? Все переменные заносятся как строки,
//   только при вычислении они (временно) преобразуются, один РЕЗ изначально число.
//   Надо бы вывести в журнальную функцию тип переменных.
//   Хорошо, и что теперь с этим делать? Что делать с типами, оставлять нумбер или что?

let domOutput = document.querySelector('#output');
const domVarPrevious_1 = document.querySelector('#previous-1');
const domVarPrevious_2 = document.querySelector('#previous-2');
const domOperation = document.querySelector('#operation');
const domResult = document.querySelector('#result');
const domKeyboard = document.querySelector('#keyboard');

const calculator = {
    varPrevious_1: '',
    varPrevious_2: '',
    varOperation: '',
    varCurrent: '',
    varResult: '',

    display(msg) {
        // Функция отображения текущего состояния дисплея.
        // Так как работа с дробями имеет свои особенности,
        // то эти особенности приходится обрабатывать с помощью
        // функции/метода toFixed(14).

        // Let's see some debug here:
        console.log(`Some debug info here:
    message: ${msg}
    varPrevious_1:\t${this.varPrevious_1}\t${typeof this.varPrevious_1}
    varPrevious_2:\t${this.varPrevious_2}\t${typeof this.varPrevious_2}
    varOperation:\t${this.varOperation}\t${typeof this.varOperation}
    varCurrent:   \t${this.varCurrent}\t${typeof this.varCurrent}
    varResult:    \t${this.varResult}\t${typeof this.varResult}
    `);

        // если переменная не пустая, то обработать для правильного
        // (человекодружественного) восприятия и вывести.
        // Возможно, в дальнейшем можно будет переписать на какой-нибудь
        // укороченный вариант, например, тернарный оператор или
        // с помощью операторов && или || -- подумать.
        if (this.varResult !== '') {
            // проверить работу закомментированной строки
            domOutput.innerText = parseFloat(this.varResult.toFixed(14));
        } else {
            domOutput.innerText = this.varCurrent || 0;
        }

        if (this.varPrevious_1 === '') {
            domVarPrevious_1.innerText = 0;
        } else {
            // domVarPrevious_1.innerText = parseFloat(this.varPrevious_1).toFixed(
            //     14
            // );
            // let temp = parseFloat(sthis.varPrevious_1).toFixed(14);
            // эта строчка заносит в переменную temp форматированное в человекочитаемый
            // вид число из П1. Переменная удаляется из памяти после отработки функции
            // (так как находится внутри блока), поэтому большой дополнительной нагрузки
            //  нести не должна.
            // Можно конечно вывести обработку в функцию, надо подумать.
            let temp = Number(parseFloat(this.varPrevious_1).toFixed(14));
            if (!calculator.varOperation) {
                temp = calculator.varCurrent;
            }
            domVarPrevious_1.innerText = temp;
            // domVarPrevious_1.innerText = this.varCurrent;
            // domVarPrevious_1.innerText = Number.parseFloat(
            //     this.varPrevious_1
            // ).toFixed(14);

            // domVarPrevious_1.innerText = this.varPrevious_1 || 0;
        }

        domOperation.innerText = this.varOperation;
        domVarPrevious_2.innerText = this.varPrevious_2;

        // domResult.innerText =
        //     this.varResult | (this.varResult === '')
        //         ? ''
        //         : '= ' + this.varResult;
        if (this.varResult !== '') {
            domResult.innerText = '= ' + parseFloat(this.varResult.toFixed(14));
        } else {
            domResult.innerText = '';
        }
    },

    calc() {
        switch (this.varOperation) {
            case '+':
                this.varResult = +this.varPrevious_1 + +this.varPrevious_2;
                break;

            case '-':
                this.varResult = +this.varPrevious_1 - +this.varPrevious_2;
                break;

            case '*':
                this.varResult = +this.varPrevious_1 * +this.varPrevious_2;
                break;

            case '/':
                this.varResult = +this.varPrevious_1 / +this.varPrevious_2;
                break;
        }
    },

    // isFloat() {
    //     if (varCurrent)
    // },
};

// Starting main program
calculator.display();

keyboard.addEventListener('click', (evt) => {
    let buttonPressedValue = evt.target.innerText;

    //
    switch (buttonPressedValue) {
        case 'C':
            calculator.varPrevious_1 = '';
            calculator.varPrevious_2 = '';
            calculator.varOperation = '';
            calculator.varCurrent = '';
            calculator.varResult = '';
            calculator.display('C');
            break;

        case 'CE':
            // если нет РЕЗ, то ТЕК = '',
            //calculator.varCurrent = '';
            if (calculator.varResult !== '') {
                break;
            }
            calculator.varCurrent = '';
            // дублируем в минидисплей
            // если нет ОП, то это П2,
            // е
            if (calculator.varOperation !== '') {
                calculator.varPrevious_2 = '';
            } else {
                calculator.varPrevious_1 = '';
            }
            calculator.display('CE');
            break;

        case '+':
        case '-':
        case '/':
        case '*':
            // если:
            // нет П-1, то выход;
            if (calculator.varPrevious_1 === '') {
                break;
            }

            // ФУНКЦИЯ ПРОДОЛЖЕНИЯ ОПЕРАЦИИ
            // используется предыдущий вычисленный результат
            // есть П1, ОП, П2, РЕЗ
            // значит результат надо перенести в Р_1, Р_2 стереть и ОП,
            if (
                // calculator.varPrevious_1 !== '' &&
                // calculator.varOperation &&
                // calculator.varPrevious_2 !== '' &&
                calculator.varResult !== ''
                // Вопрос: а может быть результат, но отсутствовать
                // остальные части датасета?
                // Может, есть смысл проверять просто по наличию результата?
            ) {
                calculator.varPrevious_1 = calculator.varResult;
                calculator.varOperation = buttonPressedValue;
                calculator.varPrevious_2 = '';
                calculator.varResult = '';
                calculator.varCurrent = '';
                calculator.display('num keys: P_1, P_2, OP');
                //     // break;
                // calculator.calc(buttonPressedValue);
                // calculator.display('operation: P_1, P_2, OP');
                break;
            }

            // // есть П1 и П2 с результатом
            // // значит результат надо перенести в Р_1, Р_2 стереть и ОП,
            // if (
            //     calculator.varPrevious_1 !== '' &&
            //     calculator.varOperation &&
            //     calculator.varPrevious_2 !== '' &&
            //     calculator.varResult !== ''
            // ) {
            //     // calculator.varPrevious_1 = calculator.varResult;
            //     calculator.varOperation = buttonPressedValue;
            //     calculator.varPrevious_2 = '';
            //     calculator.varResult = '';
            //     calculator.varCurrent = '';
            //     calculator.display('operation: P_1, P_2, OP');

            //     break;
            // }

            // есть П-1 и П-2, без результата,
            if (
                calculator.varPrevious_1 !== '' &&
                calculator.varOperation &&
                calculator.varPrevious_2 !== '' &&
                calculator.varResult === ''
            ) {
                calculator.calc(buttonPressedValue);
                calculator.varCurrent = calculator.varResult;
                calculator.varCurrent = '';
                calculator.display('operation: P_1, P_2');

                calculator.varPrevious_1 = calculator.varResult;
                calculator.varOperation = buttonPressedValue;
                calculator.varPrevious_2 = '';
                calculator.varResult = '';
                // calculator.varCurrent = '';
                break;
            }

            // есть П-1, то ОП=buttonPV
            if (calculator.varPrevious_1 !== '') {
                calculator.varOperation = buttonPressedValue;
                calculator.varCurrent = '';
            }

            calculator.display(`operation: ${buttonPressedValue}`);
            break;

        case '=':
            if (
                calculator.varPrevious_1 === '' ||
                calculator.varPrevious_2 === ''
            ) {
                break;
            }
            calculator.calc();
            // calculator.varPrevious_1 = calculator.varResult;
            calculator.varCurrent = calculator.varResult;
            calculator.display('equals');
            break;

        default:
            // if (calculator.buttonPressedValue === 'CE') {
            //     calculator.varCurrent = '';
            //     calculator.buttonPressedValue = '';
            // }

            if (buttonPressedValue.length !== 1) {
                break;
            }

            if (
                buttonPressedValue === '.' &&
                calculator.varCurrent.includes('.')
            ) {
                break;
            }

            if (
                buttonPressedValue === '.' &&
                (calculator.varCurrent === 0 || calculator.varCurrent === '')
            ) {
                calculator.varCurrent = '0';
                //break;
            }

            // что делает эта функция?
            if (calculator.varResult !== '') {
                // calculator.varPrevious_1 = calculator.varResult;
                // calculator.varOperation = buttonPressedValue;
                calculator.varPrevious_1 = '';
                calculator.varOperation = '';
                calculator.varPrevious_2 = '';
                calculator.varResult = '';
                calculator.varCurrent = '';
                calculator.display('num keys: P_1, P_2, OP  // new operation');
                //     // break;
                // calculator.calc(buttonPressedValue);
                // calculator.display('button: RSLT');
                // break;
            }
            // calculator.display('num keys default first');

            // касательно двух нижеследующих пунктов:
            // будет ли нормально работать такой вариант,
            // что в датасете хранится флоат,
            // а здесь он просто обрабатывается? -- нет нельзя, потому что 0.00 уже будет не набрать
            // Значит, храним в строковом виде. Нужен только
            // обработчик чисел с точкой.

            // исключаем добавление к нулю новых нулей.
            // как обрабатывать числа с точкой?
            // 1. если в числе нет точки, то запрет добавления нулей.
            // 2. проверка на точку.
            if (
                calculator.varCurrent == 0 &&
                buttonPressedValue == 0 &&
                !calculator.varCurrent.includes('.')
            ) {
                break;
            }

            // здесь нужна проверка на точку. ?? какая? какие действия? описывать в следующий раз!
            calculator.varCurrent += buttonPressedValue;
            // calculator.varCurrent = calculator.varCurrent == 0 ? 0;

            // дублируем в мини-дисплей
            if (calculator.varOperation) {
                calculator.varPrevious_2 = calculator.varCurrent;
            } else {
                calculator.varPrevious_1 = calculator.varCurrent;
            }

            calculator.display('num keys default');
            break;
    }
});
