getAllInputData();

function getAllInputData() {
  // Get all localStorage keys and sort them
  var keys = Object.keys(localStorage)
    .filter((key) => key.startsWith("CBDATA_"))
    .sort((a, b) => {
      var dateA = new Date(JSON.parse(localStorage.getItem(a)).dateReceive);
      var dateB = new Date(JSON.parse(localStorage.getItem(b)).dateReceive);
      return dateB - dateA;
    });

  // Loop through sorted localStorage keys
  var index = 1;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var data = JSON.parse(localStorage.getItem(key));

    // Append the data to the corresponding column
    appendToList("inputDataList0", index, key);
    appendToList("inputDataList1", data.name, key);
    appendToList("inputDataList2", data.contactNo, key);
    appendToList(
      "inputDataList3",
      `${data.district}, ${data.block}, ${data.panchayat}`,
      key
    );
    appendToList("inputDataList4", data.year, key);
    appendToList("inputDataList5", replace(data.bookType), key);
    appendToList("inputDataList6", replace(data.tpceType), key);
    appendToList("jamaDataList7", ``, key);
    appendToList("inputDataList8", formatDate(data.dateReceive), key);
    appendToList("inputDataList9", formatDate(data.dateSend), key);
    appendToList("inputDataList10", data.price, key);

    index++;
  }
}

function appendToList(listId, data, key) {
  var inputDataList = document.getElementById(listId);
  var listItem = document.createElement("li");
  listItem.textContent = data;
  inputDataList.appendChild(listItem);
  listItem.id = key;
  listItem.classList.add(key);
  // listItem.classList.add(key);

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
      showConfirmationDialog();
      document
        .getElementById("yesbutton")
        .addEventListener("click", function () {
          // Handle 'Yes' button click
          // ... your delete logic here ...
          localStorage.removeItem(key);
          location.reload();
          hideConfirmationDialog();
        });
    });

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

function formatDate(dateString) {
  if (dateString == "" || dateString == "Panding..") {
    return `Panding...`;
  } else {
    // Convert the date to dd mm yyyy format
    var date = new Date(dateString);
    var day = date.getDate().toString().padStart(2, "0");
    var month = (date.getMonth() + 1).toString().padStart(2, "0");
    var year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
}

function replace(value) {
  if (value == "Mnarega") {
    return `NREGA`;
  }
  if (value == "Panchayat") {
    return `Panchayat`;
  }
  if (value == "7 Register") {
    return `7 Register`;
  }
  if (value == "jama") {
    return `Deposit`;
  }
  if (value == "baki") {
    return `Remaining`;
  }
}