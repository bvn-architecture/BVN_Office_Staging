// $(document).ready( 
//     function(){
//         alert("I'm in UR function");
//     }
// );

var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1Np-BOM5_Jr6B4Obx_9ls0JlX0vd-i1pDeVKMYbUYA_s/edit?usp=sharing';

function slider(){
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function() {
        try{
            var row = window.officeStates[this.value];
            output.innerHTML = row.date;

            for (var k in row){
                if (row.hasOwnProperty(k)) {
                    
                    try {
                        var d = document.getElementById(k);
                        // console.log("Key is " + k + ", value is " + row[k], d);
                        d.style.opacity = row[k];
                    } catch(e) {
                        //  console.log(e);
                    }
                }
            }
        } catch(e) {
            console.log("probably just wait for the spreadsheet to load", e);
        }
    } 

    
}



function init() {
    Tabletop.init( { key: publicSpreadsheetUrl,
                        callback: showInfo,
                        simpleSheet: true } )
}

function showInfo(data, tabletop) {
    // alert('Successfully processed the table!')
    console.log(data);
    window.officeStates = data;
}

window.addEventListener('DOMContentLoaded', init);
window.addEventListener('DOMContentLoaded', slider);


// window.onload = loadData;

// function loadData() {
//     xmlhttp=new XMLHttpRequest();
//     xmlhttp.onreadystatechange = function() {
//       if(xmlhttp.readyState == 4 && xmlhttp.status==200){
//         document.getElementById("display").innerHTML = xmlhttp.responseText;
//       }
//     };
//     xmlhttp.open("GET",publicSpreadsheetUrl,true);
//     xmlhttp.send(null);
//   }

  