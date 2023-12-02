document.querySelector("#addbtn").addEventListener("click",()=>{
    window.location.href = "input.html"
})
document.querySelector("#btn1").addEventListener("click",()=>{
    window.location.href = "index2.html"
})
document.querySelector("#btn2").addEventListener("click",()=>{
    window.location.href = "baki.html"
})
document.querySelector("#btn3").addEventListener("click",()=>{
    window.location.href = "jama.html"
})
document.querySelector("#editbtn").addEventListener("click",()=>{
    const column7 =  document.querySelector("#column7")
    const cdv = localStorage.getItem("column7display");

    if(cdv == "block"){
        column7.style.display = "none"        
        localStorage.setItem("column7display", "none")
    }else{
        localStorage.setItem("column7display", "block")
        column7.style.display = "block"        

    }


})

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

   const ttotle =  document.querySelector("#ttotal")
   ttotle.value = totalAll;
   const tjama =  document.querySelector("#tjama")
   tjama.value = totalJama;
   const tbaki =  document.querySelector("#tbaki")
   tbaki.value = totalBaki;

}