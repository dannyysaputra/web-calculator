const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};

// menambahkan fungsi update
function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
};

//menambahkan fungsi clear
function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

// menambahkan fungsi input nomor
function inputDigit(digit) {
    if (calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
}

// menambahkan fungsi mengubah digit menjadi negatif
function inverseNumber() {
    if(calculator.displayNumber === '0') {
        return;
    }

    calculator.displayNumber = calculator.displayNumber * -1;
}

// menambahkan fungsi operator
function handleOperator(operator) {
    if(!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        // mengatur ulang nilai display agar sesudah memilih operator kembali menjadi 0
        calculator.displayNumber = '0';
    } else {
        alert('Operator sudah ditetapkan');
    }
}

// menambahkan fungsi kalkulasi
function performCalculation() {
    if(calculator.firstNumber == null || calculator.operator == null) {
        alert('Anda belum menetapkan operator');
        return;
    }

    let result = 0;

    if (calculator.operator === '+') {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber); //parseInt digunakan untuk mengubah nilai string ke number
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber); 
    }

    // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    };
    putHistory(history);

    calculator.displayNumber = result;

    renderHistory();
}

// mendapatkan nilai seluruh elemen button
const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', function(event) {
        const target = event.target;

        // menghapus isi display
        if(target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }

        // mengubah digit menjadi negatif
        if(target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }

        // melakukan kalkulasi
        if(target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }
        
        // mengubah operator
        if(target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }

        // menambahkan digit
        inputDigit(target.innerText);
        updateDisplay();
    });
}