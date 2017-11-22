function slider(){
    var slider = document.getElementById("myRange");
    var output = document.getElementById("date");
    // output.innerHTML = slider.value; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function() {
        try{
            var row = window.officeStates[this.value];

            // Display date under slider
            var Day = new Date(row.date);
            output.innerHTML = moment(Day).format('MMMM Do YYYY');

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
    Tabletop.init( { key: window.BVNofficeProgressPublicSpreadsheetUrl,
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
























google.charts.load('current', {'packages':['gantt']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    //Finds where the dates are - assumes the first relevant column is the third one.
    for (var tempRow = window.officeStates.length - 1; tempRow >= 0; tempRow--) {
        if (window.officeStates[tempRow] == 'dates') {
            var datesStartRow = tempRow;
            break;
        }
    }

    //Loops through each column and adds relevant rows to gantt chart
    for (var )

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Task ID');
    data.addColumn('string', 'Task Name');
    data.addColumn('date', 'Start Date');
    data.addColumn('date', 'End Date');
    data.addColumn('number', 'Duration');
    data.addColumn('number', 'Percent Complete');
    data.addColumn('string', 'Dependencies');

    data.addRows([
        ['2014Spring', 'Spring 2014',
         new Date(2014, 2, 22), new Date(2014, 5, 20), null, 100, null],
        ['2014Summer', 'Summer 2014',
         new Date(2014, 5, 29), new Date(2014, 8, 20), null, 100, null],
        ['2014Autumn', 'Autumn 2014',
         new Date(2014, 7, 21), new Date(2014, 11, 20), null, 100, null],
        ['2014Winter', 'Winter 2014',
         new Date(2014, 11, 21), new Date(2015, 2, 11), null, 100, null],
        ['2015Spring', 'Spring 2015',
         new Date(2014, 10, 22), new Date(2015, 2, 20), null, 100, null],
    ]);

    var options = {
        height: 400,
        gantt: {
            trackHeight: 30
        },
        fill: '#FF0000'
    };

    var chart = new google.visualization.Gantt(document.getElementById('chart_div'));

    //https://developers.google.com/chart/interactive/docs/gallery/ganttchart#a-simple-example

    chart.draw(data, options);
}