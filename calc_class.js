const BUTTONS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    '=', '.', '/', '*', '-', '+', '0', 'C'
];

const MODE = {
    '+': 0,
    '-': 1,
    '*': 2,
    '/': 3
}

class Calc {
    constructor() {
        this.calculatorDIV = document.createElement('DIV');
        this.calculatorDIV.classList.add('calculator');
        this.container = document.createElement('DIV');
        this.container.classList.add('container');
        this.calculatorDIV.appendChild(this.container);
        this.box = document.createElement('DIV');
        this.box.classList.add('box');
        this.container.appendChild(this.box);

        BUTTONS.forEach(buttonText => {
            const button = document.createElement('DIV');
            button.textContent = buttonText;
            if (buttonText === '0') {
                button.classList.add('wynik');
                this.box.appendChild(button).addEventListener('click', this.handleClick.bind(this));
            } else
                this.box.appendChild(button).addEventListener('click', this.handleClick.bind(this));
        })

        this.bufor = 0;
        this.mode = 0;

    }

    get screenText() {
        return this.wynik.textContent;
    }

    set screenText(value) {
        this.wynik.textContent = value;
    }

    get screemNumber() {
        return parseFloat(this.wynik.textContent);
    }

    applyOperation() {

        switch (this.mode) {
            case 0:
                this.bufor += this.screemNumber;
                break;
            case 1:
                this.bufor -= this.screemNumber;
                break;
            case 2:
                this.bufor *= this.screemNumber;
                break;
            case 3:
                this.bufor /= this.screemNumber;
                break;
        }
    }


    handleClick(event) {
        const przycisk = event.target.textContent;

        switch (przycisk) {
            case 'C':
                this.screenText = '0';
                this.bufor = 0;
                this.mode = 0;
                break;

            case '+':
            case '-':
                if (this.screenText === '0') {
                    this.screenText = '-' + this.screenText;
                }

            case '*':
            case '/':
                this.applyOperation();
                this.screenText = '0';
                this.mode = MODE[przycisk];
                break;

            case '=':
                this.applyOperation();
                this.screenText = this.bufor.toFixed(5);
                this.mode = -1;
                break;

            case '.':
                if (!this.screenText.includes('.')) {

                    if (this.screenText === '0') {
                        this.screenText = '0' + przycisk;
                    } else
                        this.screenText = this.screenText + przycisk;
                }
                break;

            default:

                if (this.screenText === '0' || this.screenText === '-0') {
                    this.screenText = this.screenText.replace('0', przycisk);
                } else {
                    this.screenText = this.screenText + przycisk;
                }
        }
    }

    init(event) {
        console.log(`Document loaded in ${event.timeStamp}ms`);
        document.body.appendChild(this.calculatorDIV);
        this.wynik = document.querySelector(".wynik");
    }

}

const calc = new Calc();

window.addEventListener("DOMContentLoaded", calc.init.bind(calc));