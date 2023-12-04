const confirmmessage = document.querySelector("body");

const confirmbox = document.createElement("div");
confirmbox.id = "confirmationdilogue";
confirmbox.innerHTML = `
    <p id="warntext"><span id="warnsypble">&#x26A0;</span> Do You Want To Delete This Row ?</p>
    <div>
        <button id="yesbutton">Yes</button>
        <button id="cancelbutton">Cancel</button>
    </div>
`;

// Append the confirmbox to the body
confirmmessage.appendChild(confirmbox);

// JavaScript to show/hide the confirmation dialog
document.getElementById('yesbutton').addEventListener('click', function () {
    // Handle 'Yes' button click
    // ... your delete logic here ...
    hideConfirmationDialog();
});

document.getElementById('cancelbutton').addEventListener('click', function () {
    // Handle 'Cancel' button click
    hideConfirmationDialog();
});

function showConfirmationDialog() {
    document.getElementById('confirmationdilogue').style.display = 'block';
}

function hideConfirmationDialog() {
    document.getElementById('confirmationdilogue').style.display = 'none';
}
