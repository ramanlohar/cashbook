document.addEventListener('DOMContentLoaded', function () {
    // Get the current date in the format YYYY-MM-DD
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; // January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd;

    // Set the value of dateReceive
    document.getElementById('dateReceive').value = today;
});

    function submitFormcheck() {
        var dateReceive = document.getElementById('dateReceive');
        if (dateReceive.value == "") {
            dateReceive.style.backgroundColor="red";
            setTimeout(() => {
                dateReceive.style.backgroundColor="white";
                
            }, 100);
        }
        else{
            submitForm();
        }            
    }
     function submitForm() {
        // Get form values
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


        if (price == "") {
            price =  "0";
        }

        if(localStorage.getItem("formcount") === null){
            localStorage.setItem("formcount", 1);
            var formcount = localStorage.getItem("formcount");
        }
        else{
            var formcount = localStorage.getItem("formcount");
           formcount2 =  ++formcount;
            localStorage.setItem("formcount",formcount2);

        }
        // Generate a unique ID
        var uniqueID = formcount;
        // var uniqueID = new Date().getTime();

        // Create a data object
        var data = {
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
            dateSend: dateSend,
            formcountvalue: formcount
        };

        // Save data to localStorage with a unique key
        localStorage.setItem('CBDATA_' + uniqueID, JSON.stringify(data));

        // Display success message or perform other actions as needed
        // alert("Form submitted successfully!");

        // Optionally, redirect to another page
        window.location.href = "index2.html";
    }

    function cancelbtn() {
        window.location.href = "index2.html";
    }