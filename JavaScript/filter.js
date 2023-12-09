getAllJamaData();

function getAllJamaData() {
    // Loop through localStorage items

    var index = 1;
    var sortedKeys = Object.keys(localStorage)
        .filter(key => key.startsWith("CBDATA_"))
        .sort((a, b) => {
            var dateA = new Date(JSON.parse(localStorage.getItem(a)).dateReceive);
            var dateB = new Date(JSON.parse(localStorage.getItem(b)).dateReceive);
            return dateB - dateA;
        });

    sortedKeys.forEach(key => {
        var data = JSON.parse(localStorage.getItem(key));

        // Assuming that datafiltervalue is a valid property of the data object
        var filtervalue = localStorage.getItem("filtervalue");
        var datafiltervalue = localStorage.getItem("datafiltervalue");
        console.log(datafiltervalue);
        var newBlock;
        // newBlock = data.name;

        if (datafiltervalue == "block") {
            newBlock = data.block;
            // alert("done");
        }
        else if (datafiltervalue == `bookType`) {
            newBlock = data.bookType;
        }
        else if (datafiltervalue == `contactNo`) {
            newBlock = data.contactNo;
        }
        else if (datafiltervalue == "dateReceive") {
            newBlock = data.dateReceive;
        }
        else if (datafiltervalue == "dateSend") {
            newBlock = data.dateSend;
        }
        else if (datafiltervalue == "district") {
            newBlock = data.district;
        }
        else if (datafiltervalue == "name") {
            newBlock = data.name;
            // alert("name");
        }
        else if (datafiltervalue == "panchayat") {
            newBlock = data.panchayat;
        }
        else if (datafiltervalue == "price") {
            newBlock = data.price;
        }
        else if (datafiltervalue == "tpceType") {
            newBlock = data.tpceType;
        }
        else if (datafiltervalue == "year") {
            newBlock = data.year;
        }

        // const newBlock = data.panchayat;
        // Check if the data satisfies the filter condition
        if (newBlock === filtervalue) {
            // Append the data to the corresponding column
            appendToList("jamaDataList0", index, key);
            appendToList("jamaDataList1", data.name, key);
            appendToList("jamaDataList2", data.contactNo, key);
            appendToList("jamaDataList3", `${data.district}, ${data.block}, ${data.panchayat}`, key);
            appendToList("jamaDataList4", data.year, key);
            appendToList("jamaDataList5", replace(data.bookType), key);
            appendToList("jamaDataList6", replace(data.tpceType), key);
            appendToList("jamaDataList7", '', key); // I left this as an empty string, update as needed
            appendToList("inputDataList8", formatDate(data.dateReceive), key);
            appendToList("inputDataList9", formatDate(data.dateSend), key);
            appendToList("inputDataList10", data.price, key);

            index++;
        }
    });
}

function appendToList(listId, data, key) {
    var inputDataList = document.getElementById(listId);
    var listItem = document.createElement("li");
    listItem.textContent = data;
    inputDataList.appendChild(listItem);
    listItem.id = key;
    listItem.classList.add(key);

    // Add an Edit button to each list item in the "EDIT" column
    if (listId === "jamaDataList7") {
        var editButton = document.createElement("span");
        var deletButton = document.createElement("span");
        editButton.className = "edit-button";
        deletButton.className = "del-button";
        editButton.innerHTML = `<i class="fa-solid fa-file-pen"></i>`;
    deletButton.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
        editButton.addEventListener("click", function () {
            // Set the key in localStorage for editing
            localStorage.setItem("foreditkey", key);
            // Redirect to the editinput.html page
            window.location.href = "editinput.html";
        });
        deletButton.addEventListener("click", () => {
            showConfirmationDialog()
            document.getElementById('yesbutton').addEventListener('click', function () {
                // Handle 'Yes' button click
                // ... your delete logic here ...
                localStorage.removeItem(key);
                location.reload();
                hideConfirmationDialog();
            });
        })

        listItem.appendChild(editButton);
        listItem.appendChild(deletButton);
    }

    listItem.addEventListener("click", () => {
        // Remove the previous highlights
        var highlightedRows = document.querySelectorAll(".highlight-green");
        highlightedRows.forEach((row) => {
            row.classList.remove("highlight-green");
        });

        // Highlight the clicked row
        var lihighlight = document.querySelectorAll("." + key);
        lihighlight.forEach(function (element) {
            if (element.classList.contains("highlight-green")) {
                element.classList.remove("highlight-green");
            } else {
                element.classList.add("highlight-green");
            }
        });
    });

    inputDataList.appendChild(listItem);
}
// function appendToList(listId, data, key) {
//     var jamaDataList = document.getElementById(listId);
//     var listItem = document.createElement("li");
//     listItem.textContent = data;

//     // Add an Edit button to each list item in the "EDIT" column
//     if (listId === "jamaDataList7") {
//         var editButton = document.createElement("span");
//         editButton.className = "edit-button";
//         editButton.textContent = "Edit";
//         editButton.addEventListener("click", function () {
//             // Set the key in localStorage for editing
//             localStorage.setItem("foreditkey", key);
//             // Redirect to the editinput.html page
//             window.location.href = "editinput.html";
//         });

//         listItem.appendChild(editButton);
//     }

//     jamaDataList.appendChild(listItem);
// }



function formatDate(dateString) {

    if (dateString == "" || dateString == "Panding..") {
        return `Panding...`;
    }
    else {

        // Convert the date to dd mm yyyy format
        var date = new Date(dateString);
        var day = date.getDate().toString().padStart(2, '0');
        var month = (date.getMonth() + 1).toString().padStart(2, '0');
        var year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }
}

calculateTotals();

function calculateTotals() {
    var totalBaki = 0;
    var totalJama = 0;
    var totalAll = 0;

    // Loop through localStorage items
    for (var key in localStorage) {
        if (key.startsWith("CBDATA_")) {
            var data = JSON.parse(localStorage.getItem(key));

            // Calculate total based on CB_TYPE
            if (data.tpceType === "baki") {
                totalBaki += parseFloat(data.price);
            } else if (data.tpceType === "jama") {
                totalJama += parseFloat(data.price);
            }

            // Calculate total for all entries
            totalAll += parseFloat(data.price);
        }
    }

    // Output or use totals as needed
    console.log("Total Baki:", totalBaki);
    console.log("Total Jama:", totalJama);
    console.log("Total All:", totalAll);

    const tjama = document.querySelector("#tjama")
    tjama.value = totalJama;

}

function replace(value) {
    if (value == "Mnarega") {
        return `NREGA`;
    }
    if (value == "Panchayat") {
        return `Panchayat`;
    }
    if (value == "sevenregister") {
        return `7 Register`;
    }
    if (value == "jama") {
        return `Deposit`;
    }
    if (value == "baki") {
        return `Remaining`;
    }
}

// localStorage.setItem("filtervalue","");