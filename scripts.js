// $(document).ready( 
//     function(){
//         alert("I'm in UR function");
//     }
// );

var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1Np-BOM5_Jr6B4Obx_9ls0JlX0vd-i1pDeVKMYbUYA_s/edit?usp=sharing';

function slider(){
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    // output.innerHTML = slider.value; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function() {
        try{
            var row = window.officeStates[this.value];
            output.innerHTML = new Date(row.date); //TODO: format this date with moment.js or something

            for (var k in row){
                if (k=="notes"){
                  var notes = document.getElementById("notes");
                  notes.innerText = row[k];
                }
                else if (row.hasOwnProperty(k)) {
                    
                    try {
                        var d = document.getElementById(k);
                        /*console.log("Key is " + k + ", value is " + row[k], d);*/
                        d.style.opacity = row[k];
                    } catch(e) {
                        console.log("hmmmm", e);
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



/*

SVG CODE:
(For the clipping masks)

<g id="clippaths">
    <g id="EXS02A">
      <defs>
        <path id="_x30_2A_x5F_EXS_1_" d="M310.5 394h274l-3.7 189.5-237.4 4.2-25 9.6z"/>
      </defs>
      <clipPath id="_x30_2A_x5F_EXS_2_">
        <use xlink:href="#_x30_2A_x5F_EXS_1_" overflow="visible"/>
      </clipPath>
    </g>
    <g id="EXS03A">
      <defs>
        <path id="_x30_3A_x5F_EXS_1_" d="M316 690.3l4-91 24.3-9.3 290.3-6 47.6 14.5.8 91.8H576V587.7l-106.5.5-10 12.4-35 2-4.7 89.7z"/>
      </defs>
      <clipPath id="_x30_3A_x5F_EXS_2_">
        <use xlink:href="#_x30_3A_x5F_EXS_1_" overflow="visible"/>
      </clipPath>
    </g>
    <g id="EXS13A">
      <defs>
        <path id="_x31_3A_x5F_EXS_1_" d="M422.3 692.3l4.7-83.6 47.8-8 5.5-10.4h74l7.3 98z"/>
      </defs>
      <clipPath id="_x31_3A_x5F_EXS_2_">
        <use xlink:href="#_x31_3A_x5F_EXS_1_" overflow="visible"/>
      </clipPath>
    </g>
    <g id="EXS33A">
      <defs>
        <path id="_x33_3A_x5F_EXS_1_" d="M849.3 683.7l137.6-10-2-19-12-10 4-55 99 5.4 6 9 2 70 18-1-3-85-39-40-141 16-70 83z"/>
      </defs>
      <clipPath id="_x33_3A_x5F_EXS_2_">
        <use xlink:href="#_x33_3A_x5F_EXS_1_" overflow="visible"/>
      </clipPath>
    </g>
    <g id="EXS61A">
      <defs>
        <path id="_x36_1A_x5F_EXS_1_" d="M989 659.6l-2-8.7-11.3-8 6-48 97 7-1.3 56 7.7 15h23l13-406 39-15 48-10 4-54 112-2 5 297-3 432-22-1 2-78-105-2-60-23-19-124-28-13-8-2z"/>
      </defs>
      <clipPath id="_x36_1A_x5F_EXS_2_">
        <use xlink:href="#_x36_1A_x5F_EXS_1_" overflow="visible"/>
      </clipPath>
    </g>
    <g id="EXS44A">
      <defs>
        <path id="_x34_4A_x5F_EXS_1_" d="M1083.7 677.7l-10.8-2.3-34-.5-81 22-25 280 3 32h171l193-20-3-144-105-2-66-16-16-132z"/>
      </defs>
      <clipPath id="_x34_4A_x5F_EXS_2_">
        <use xlink:href="#_x34_4A_x5F_EXS_1_" overflow="visible"/>
      </clipPath>
    </g>
    <g id="EXS76A">
      <defs>
        <path id="_x37_6A_x5F_EXS_1_" d="M1408.4 968.6H1368l-45.3 24.4v64.8h92.8v-74.5z"/>
      </defs>
      <clipPath id="_x37_6A_x5F_EXS_2_">
        <use xlink:href="#_x37_6A_x5F_EXS_1_" overflow="visible"/>
      </clipPath>
    </g>
    <g id="EXS71A">
      <defs>
        <path id="_x37_1A_x5F_EXS_1_" d="M1417.8 967.6h-79l-9.5-461.7 7.7-366 83.5 2z"/>
      </defs>
      <clipPath id="_x37_1A_x5F_EXS_2_">
        <use xlink:href="#_x37_1A_x5F_EXS_1_" overflow="visible"/>
      </clipPath>
    </g>
    <g id="EXS40A">
      <defs>
        <path id="_x34_0A_x5F_EXS_1_" d="M907.5 422.5h67l132-21.5 2-136 96-30 2.6-48 91-4v-63l-53-34H930z"/>
      </defs>
      <clipPath id="_x34_0A_x5F_EXS_2_">
        <use xlink:href="#_x34_0A_x5F_EXS_1_" overflow="visible"/>
      </clipPath>
    </g>
    <g id="PRP02A">
      <defs>
        <path id="_x30_2A_x5F_PRP_1_" d="M316.7 402H587l-.3 178H334l-17.3 14z"/>
      </defs>
      <clipPath id="_x30_2A_x5F_PRP_2_">
        <use xlink:href="#_x30_2A_x5F_PRP_1_" overflow="visible"/>
      </clipPath>
    </g>
    <g id="PRP03A">
      <defs>
        <path id="_x30_3A_x5F_PRP_1_" d="M311 686.5l5.7-86.7 32.5-17.4h365.3V594L678 691l-96.5-11v-40l14.3-55-51-.2-4.5 19.5-121.4 1-11 81.5z"/>
      </defs>
      <clipPath id="_x30_3A_x5F_PRP_2_">
        <use xlink:href="#_x30_3A_x5F_PRP_1_" overflow="visible"/>
      </clipPath>
    </g>
    <g id="PRP13A">
      <defs>
        <path id="_x31_3A_x5F_PRP_1_" d="M436.5 681.2l144.7-2.2v-10.3l-.5-.7v-75.7l4-5.2h-33.2L537 616l-82.4-1.7z"/>
      </defs>
      <clipPath id="_x31_3A_x5F_PRP_2_">
        <use xlink:href="#_x31_3A_x5F_PRP_1_" overflow="visible"/>
      </clipPath>
    </g>
    <g id="PRP33A">
      <defs>
        <path id="_x33_3A_x5F_PRP_1_" d="M852.3 663.5l107.7-8.2-3.5-75.3-48 .8-66.3 52.4z"/>
      </defs>
      <clipPath id="_x33_3A_x5F_PRP_2_">
        <use xlink:href="#_x33_3A_x5F_PRP_1_" overflow="visible"/>
      </clipPath>
    </g>
    <g id="PRP44A">
      <defs>
        <path id="_x34_4A_x5F_PRP_1_" d="M910 665h237v156.2l53.7 5.2 2 51.3 97.7 7.6 12 24.4-1.3 25.2-74 71-311-1z"/>
      </defs>
      <clipPath id="_x34_4A_x5F_PRP_2_">
        <use xlink:href="#_x34_4A_x5F_PRP_1_" overflow="visible"/>
      </clipPath>
    </g>
    <g id="PRP71A">
      <defs>
        <path id="_x37_1A_x5F_PRP_1_" d="M1308 860.5l1 41 89-.2 21.3-301L1408 152l-116 12 41.7 92.2-20.4 26.3 9.4 28 6.3 26.7 1 82 21.3 43-20 26.3-9.8 178.4 6 194z"/>
      </defs>
      <clipPath id="_x37_1A_x5F_PRP_2_">
        <use xlink:href="#_x37_1A_x5F_PRP_1_" overflow="visible"/>
      </clipPath>
    </g>
    <g id="PRP76A">
      <defs>
        <path id="_x37_6A_x5F_PRP_1_" d="M1331.8 989.8l68-.6-2.5 56.5h-70.6z"/>
      </defs>
      <clipPath id="_x37_6A_x5F_PRP_2_">
        <use xlink:href="#_x37_6A_x5F_PRP_1_" overflow="visible"/>
      </clipPath>
    </g>
    <g id="PRP76A_1_">
      <defs>
        <path id="_x36_1A_x5F_PRP_1_" d="M1323.8 859.4l-22 .5-55.6 14-43.2-22v-28l-44.7-21-3-149-166.6-10 3.3-62 124.7-7V392l33-82.5 13-94 137.7-24 30 59.3-25 35.3 22.4 58 .5 79 6.4 17-9.7 17-5.8 152v112l3 13z"/>
      </defs>
      <clipPath id="_x36_1A_x5F_PRP_2_">
        <use xlink:href="#_x36_1A_x5F_PRP_1_" overflow="visible"/>
      </clipPath>
    </g>
    <g id="PRP40A">
      <defs>
        <path id="_x34_0A_x5F_PRP_1_" d="M931.5 81.5v338l173.3-8 35.7-101 17-98.3 101-17.2-6-111z"/>
      </defs>
      <clipPath id="_x34_0A_x5F_PRP_2_">
        <use xlink:href="#_x34_0A_x5F_PRP_1_" overflow="visible"/>
      </clipPath>
    </g>
</g>

*/