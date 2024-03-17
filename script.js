let bufor = 0;
let mode = 0;

const MODE = {
    '+': 0,
    '-': 1,
    '*': 2,
    '/': 3
}

const applyOperation = () => {
    const wynik = document.querySelector(".wynik");
    switch (mode) {
        case 0:
            bufor += parseFloat(wynik.textContent);
            break;
        case 1:
            bufor -= parseFloat(wynik.textContent);
            break;
        case 2:
            bufor *= parseFloat(wynik.textContent);
            break;
        case 3:
            bufor /= parseFloat(wynik.textContent);
            break;
    }
}

const handleClick = event => {
    const przycisk = event.target.textContent;
    const wynik = document.querySelector(".wynik");

    switch (przycisk) {
        case 'C':
            wynik.textContent = '0';
            bufor = 0;
            mode = 0;
            break;

        case '+':
        case '-':
            if (wynik.textContent === '0') {
                wynik.textContent = '-' + wynik.textContent;
            }

        case '*':
        case '/':
            applyOperation();
            wynik.textContent = '0';
            mode = MODE[przycisk];
            break;

        case '=':
            applyOperation();
            wynik.textContent = bufor.toFixed(6);
            mode = -1;
            break;

        case '.':
            if (!wynik.innerText.includes('.')) {

                if (wynik.innerText === '0') {
                    wynik.innerText = '0' + przycisk;
                } else
                    wynik.textContent += przycisk;
            }
            break;

        default:

            if (wynik.innerText === '0' || wynik.textContent === '-0') {
                wynik.innerText = wynik.textContent.replace('0', przycisk);
            } else {
                wynik.textContent += przycisk;
            }
    }
    console.log(`Klikam przycisk [${przycisk}]!`);
}

window.addEventListener("DOMContentLoaded", function() {

    const BUTTONS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        '=', '.', '/', '*', '-', '+', '0', 'C'
    ];

    const calculatorDIV = document.createElement('DIV')
    calculatorDIV.classList.add('calculator')
    const container = document.createElement('DIV')
    container.classList.add('container')
    calculatorDIV.appendChild(container)
    const box = document.createElement('DIV')
    box.classList.add('box')
    container.appendChild(box)

    BUTTONS.forEach(buttonText => {
        const button = document.createElement('DIV')
        button.textContent = buttonText
        if (buttonText === '0') {
            button.classList.add('wynik')
            box.appendChild(button).addEventListener('click', handleClick)
        } else
            box.appendChild(button).addEventListener('click', handleClick)
    })

    document.body.appendChild(calculatorDIV)

});