const sidebar = document.getElementById("sidebar");

const sidebardiv = document.createElement("div");
sidebardiv.className = "sidebardiv";
sidebardiv.innerHTML = `
    <div id="sidebar_heading">
    <a id="crossbtn" href="javascript:void(0)" class="closebtn" onclick="closeNav()">×</a>
    <h2 class="sidebarh2">Cashbook Orders</h2>
    <br>
    </div>
    <label for="filterType">Filter Type:</label>
    <br>
    <select id="filterType" 
    onchange="showFilterOptions()">
        <option value="">Select</option>
        <option value="ALL">ALL</option>
        <option value="block">Block</option>
        <option value="bookType">Book Type</option>
        <option value="contactNo">Contact No</option>
        <option value="dateReceive">Date Receive</option>
        <option value="dateSend">Date Send</option>
        <option value="district">District</option>
        <option value="name">Name</option>
        <option value="panchayat">Panchayat</option>
        <option value="price">Amount</option>
        <option value="tpceType">Amount Type</option>
        <option value="year">Year</option>
    </select>
    <div id="additionalFilter"></div>
    <br>
    <p class="filterp" id="filterjama">Deposit Amount<p>
    <p class="filterp" id="filterbaki">Remaining Amount<p>
    <p class="filterp" id="filterpandingsend">Panding Send<p>
    <p class="filterp" id="filtertoday">Today<p>
    <br>
    <label>Font - Size : </label>
    <input id="fontsizeoflis" type="range" name="volume" min="10" max="20" value="">
    <input type="text" id="fontsizevalue" readonly>
    <br>
    <br>
    <button id="generateExcelBtn">Generate Excel</button>


`;

function openNav() {
  document.getElementById("sidebar").style.width = "250px";
//   document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("sidebar").style.width = "0";
//   document.getElementById("main").style.marginLeft = "0";
}

function showFilterOptions() {
  var filterType = document.getElementById("filterType").value;

  var additionalFilterDiv = document.getElementById("additionalFilter");

  // Clear previous options
  additionalFilterDiv.innerHTML = "";

  if (filterType !== "") {
    var selectLabel = filterType;
    if(selectLabel == "tpceType"){
        selectLabel = "Amount Type";
    }
    if(selectLabel == "price"){
        selectLabel = "Amount";
    }

    additionalFilterDiv.innerHTML = `<label for="${selectLabel}">${selectLabel}:</label>
            <select id="secondselect">
                <option value="">Select</option>
            </select>`;
    populateDateOptions("secondselect", filterType);

    // const filtersecondTypevalue = document.getElementById("secondselect");

    // localStorage.setItem("filtervalue", filtersecondTypevalue.value);
  }
}

function populateDateOptions(selectId, filterType) {
  var selectElement = document.getElementById(selectId);

  // Get all localStorage keys and sort them
  var keys = Object.keys(localStorage)
    .filter((key) => key.startsWith("CBDATA_"))
    .sort((a, b) => {
      var valueA = JSON.parse(localStorage.getItem(a))[filterType];
      var valueB = JSON.parse(localStorage.getItem(b))[filterType];

      // Handle different data types if needed
      if (typeof valueA === "string" && typeof valueB === "string") {
        //   alert("not string")
        return valueA.localeCompare(valueB);
      } else {
        // Fallback to default comparison if the data types are not strings
        return valueB - valueA;
      }
    });

  var addedValues = {}; // Keep track of values that have already been added

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var data = JSON.parse(localStorage.getItem(key));
    var dateValue = filterType === "dateReceive" ? data.dateReceive : "";

    // Check if the value is empty or has already been added, if yes, skip it
    if (data[filterType] && !addedValues[data[filterType]]) {
      var option = document.createElement("option");
      option.value = data[filterType];

      if (filterType == "dateReceive" || filterType == "dateSend") {
        option.textContent = formatDate(data[filterType]);
      } else {
        if (data[filterType] == "Mnarega") {
            
            option.textContent = "NREGA";
        }else if(data[filterType] == "baki"){
            option.textContent = "Remaining";

        }else if(data[filterType] == "jama"){
            option.textContent = "Deposit";
        }else{

            option.textContent = data[filterType];
        }
      }

      selectElement.appendChild(option);

      // Mark the value as added
      addedValues[data[filterType]] = true;
    }
  }

  const filtersecondTypevalue = document.getElementById("secondselect");
  filtersecondTypevalue.addEventListener("input", () => {
    localStorage.setItem("filtervalue", filtersecondTypevalue.value);

    if (filtersecondTypevalue.value !== "") {
      window.location.href = "filter.html";
    }
  });
}









function formatDate(dateString) {
  if (dateString == "" || dateString == "Panding..") {
    return `Panding...`;
  } else {
    var date = new Date(dateString);
    var day = date.getDate().toString().padStart(2, "0");
    var month = (date.getMonth() + 1).toString().padStart(2, "0");
    var year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
}

// Append the sidebardiv to the sidebar element
sidebar.appendChild(sidebardiv);

const filterTypevalue = document.querySelector("#filterType");
filterTypevalue.addEventListener("input", () => {
  // Store both filterType and select value in localStorage
  localStorage.setItem("datafiltervalue", filterTypevalue.value);

  const firstinputvalue = localStorage.getItem("datafiltervalue");

  if (firstinputvalue == "ALL") {
    window.location.href = "index2.html";
    // alert("message")
  }
});
document.getElementById("filterpandingsend").addEventListener("click", () => {
  localStorage.setItem("datafiltervalue", "dateSend");
  localStorage.setItem("filtervalue", "");
  window.location.href = "filter.html";
});
// filterpandingreceive

document
  .getElementById("filtertoday")
  .addEventListener("click", () => {
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

    localStorage.setItem("datafiltervalue", "dateReceive");
    localStorage.setItem("filtervalue", today);
    window.location.href = "filter.html";
  });

document.getElementById("filterjama").addEventListener("click", () => {
  localStorage.setItem("datafiltervalue", "tpceType");
  localStorage.setItem("filtervalue", "jama");
  window.location.href = "filter.html";
});
document.getElementById("filterbaki").addEventListener("click", () => {
  localStorage.setItem("datafiltervalue", "tpceType");
  localStorage.setItem("filtervalue", "baki");
  window.location.href = "filter.html";
});

const fontsizeoflis = document.querySelector("#fontsizeoflis");
const fontsizevalue = document.querySelector("#fontsizevalue");

fontsizeoflis.addEventListener("input", () => {
  const selectedFontSize = fontsizeoflis.value;
  localStorage.setItem("fonsizeofli", selectedFontSize);

  var allElements = document.querySelectorAll("li");
  allElements.forEach(function (element) {
    element.style.fontSize = `${selectedFontSize}px`;
  });

  fontsizevalue.value = `${selectedFontSize}px`;
});

const getfontsize = localStorage.getItem("fonsizeofli");

if (getfontsize == null) {
  fontsizeoflis.value = 16;
  fontsizevalue.value = "16px";
} else {
  fontsizeoflis.value = Number(getfontsize);
  fontsizevalue.value = `${getfontsize}px`;
}

var allElements = document.querySelectorAll("li");
allElements.forEach(function (element) {
  element.style.fontSize = `${fontsizeoflis.value}px`;
});
