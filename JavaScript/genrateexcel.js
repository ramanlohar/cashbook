document.getElementById('generateExcelBtn').addEventListener('click', function () {
    generateExcel();
});

// Function to generate Excel file from the HTML content
function generateExcel() {
    // Create a workbook with a worksheet
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.aoa_to_sheet(getDataArray());

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Convert the workbook to a data URL
    var excelData = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });

    // Create a Blob from the data and create a download link
    var blob = new Blob([s2ab(atob(excelData))], { type: 'application/octet-stream' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'your_data.xlsx';

    // Append the link to the document and trigger the download
    document.body.appendChild(link);
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
}

// Helper function to convert base64 to array buffer
function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
}

// Function to get data as an array for the Excel file
function getDataArray() {
    var dataArray = [];

    // Add header row
    dataArray.push(['NO.', 'Name', 'Contact', 'D_B_P', 'Year', 'CB_TYPE', 'J/B', 'Receive', 'Send', 'Money']);

    // Add data rows
    var keys = Object.keys(localStorage).filter(key => key.startsWith("CBDATA_")).sort();
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var data = JSON.parse(localStorage.getItem(key));
        
        dataArray.push([
            i + 1,
            data.name,
            data.contactNo,
            `${data.district}, ${data.block}, ${data.panchayat}`,
            data.year,
            data.bookType,
            data.tpceType,
            formatDate(data.dateReceive),
            formatDate(data.dateSend),
            data.price
        ]);
    }

    return dataArray;
}
