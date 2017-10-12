var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTjCiJgL1LRHFXkeMgK4q7hE8CYO7HQQj1uMhYT0JriKNeF7ZnhuI4Ho9u-Zha-_jv9lzCIlyJ_7QO5/pubhtml?gid=0&single=true';

function slider(){
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function() {
        output.innerHTML = this.value;
    }

    var d = document.querySelector("svg rect");
    d.classList.toggle("hidden");
    alert('Successfully processed the table!')
}



function init() {
    Tabletop.init( { key: publicSpreadsheetUrl,
                        callback: showInfo,
                        simpleSheet: true } )
}

function showInfo(data, tabletop) {
    alert('Successfully processed the table!')
    console.log(data);
}

window.addEventListener('DOMContentLoaded', init);
window.addEventListener('DOMContentLoaded', slider);

