function updateData() {
    // Get updated form values
    var name = document.getElementById('name').value;
    var contactNo = document.getElementById('contactNo').value;
    var district = document.getElementById('district').value;
    var block = document.getElementById('block').value;
    var panchayat = document.getElementById('panchayat').value;
    var bookType = document.querySelector('input[name="bookType"]:checked').value;
    var price = document.getElementById('price').value;
    var tpceType = document.querySelector('input[name="tpceType"]:checked').value;
    var year = document.getElementById('year').value;
    var dateReceive = document.getElementById('dateReceive').value;
    var dateSend = document.getElementById('dateSend').value;

    // Update the data object
    var updatedData = {
        name: name,
        contactNo: contactNo,
        district: district,
        block: block,
        panchayat: panchayat,
        bookType: bookType,
        price: price,
        tpceType: tpceType,
        year: year,
        dateReceive: dateReceive,
        dateSend: dateSend
    };

    // Save updated data back to localStorage with the original key
    localStorage.setItem(editKey, JSON.stringify(updatedData));

    // Display success message or perform other actions as needed
    // alert("Data updated successfully!");

    // Optionally, redirect to another page
    window.location.href = "index2.html";
}

// Retrieve the key from localStorage
var editKey = localStorage.getItem('foreditkey');

// Check if the key is present
if (editKey) {
    // Retrieve data using the key
    var data = JSON.parse(localStorage.getItem(editKey));

    // Populate form fields with data
    document.getElementById('name').value = data.name;
    document.getElementById('contactNo').value = data.contactNo;
    document.getElementById('district').value = data.district;
    document.getElementById('block').value = data.block;
    document.getElementById('panchayat').value = data.panchayat;

    // Check the appropriate radio button for Book Type
    var bookTypeRadioButton = document.getElementById(data.bookType);
    if (bookTypeRadioButton) {
        bookTypeRadioButton.checked = true;
    } else {
        console.error("Element not found for bookType: " + data.bookType);
    }

    document.getElementById('price').value = data.price;

    // Check the appropriate radio button for TPCE Type
    document.getElementById(data.tpceType).checked = true;

    document.getElementById('year').value = data.year;
    document.getElementById('dateReceive').value = data.dateReceive;
    document.getElementById('dateSend').value = data.dateSend;
}

function cancelbtn() {
            window.location.href = "index2.html";
        }