const CACHE_KEY = 'calculation_history';

// mengembalikan nilai boolean dari pengecekan fitur storage pada browser
function checkForStorage() {
    return typeof(Storage) !== 'undefined';
}

// menyimpan data riwayat kalkulasi pada localStorage
function putHistory(data) {
    if( checkForStorage() ) {
        let historyData = null;

        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));  // JSON.parse() -> mengubah nilai objek dalam bentuk string kembali menjadi nilai objek Javascript
        };

        historyData.unshift(data); // unshift() -> menambahkan nilai baru pada array ke awal index

        if(historyData.length > 5) {
            historyData.pop(); // pop() -> menghapus nilai index terakhir
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData)); // JSON.stringify() -> mengubah objek Javascript ke dalam bentuk string
    }
}

// mengembalikan nilai array dari localStorage
function showHistory() {
    if ( checkForStorage() ) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}

// merender data riwayat kalkulasi pada tabel HTML
function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");

    // menghapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
    historyList.innerHTML = '';

    for(let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = '<td>' + history.firstNumber + '</td>';
        row.innerHTML += '<td>' + history.operator + '</td>';
        row.innerHTML += '<td>' + history.secondNumber + '</td>';
        row.innerHTML += '<td>' + history.result + '</td>';

        historyList.appendChild(row);
    }
}

renderHistory();