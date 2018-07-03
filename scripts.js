function slider() {
    // TODO: slider range is hard coded in the html, 
    // this needs to be calculated based on the date ranges
    let slider = document.getElementById('myRange');
    let output = document.getElementById('date');
    // output.innerHTML = slider.value; // Display the default slider value
    // setTimeout(drawChart, 1)

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function() {

        // Try statement catches instances where the spreadsheet hasn't loaded yet
        try {
            if (this == undefined || this == null) {
                var row = window.officeStates[0];
            } else {
                var row = window.officeStates[this.value];
                window.BVNcurrentSliderValue = this.value;
            }

            // Update chart with updated date
            updateChart(convertCellDate(row.date));

            // Display date under slider
            let Day = new Date(row.date);
            output.innerHTML = moment(Day).format('MMMM Do YYYY');

            for (let key in row) {
                if (key=='notes') {
                    let notes = document.getElementById('notes');
                    notes.innerText = row[key];
                }
                else if (row.hasOwnProperty(key)) {

                    try {
                        let d = document.getElementById(key);

                        // console.log("Key is " + k + ", value is " + row[k], d);
                        d.style.opacity = row[key];
                    } catch (e) {
                        console.log('hmmmm', e);
                    }
                }
            }
        } catch (e) {
            console.log('probably just wait for the spreadsheet to load (floorplan) ', e);
        }
    };
}

 // Initialises the floorplan in the correct position
 function initialiseFloorplan(data) {
    row = data[0];
    for (let k in row) {
        if (k == 'notes') {
            let notes = document.getElementById('notes');
            notes.innerText = row[k];
        }
        else if (row.hasOwnProperty(k)) {

            try {
                let d = document.getElementById(k);
                // console.log("Key is " + k + ", value is " + row[k], d);
                d.style.opacity = row[k];
            } catch (e) {
                console.log('hmmmm', e);
            }
        }
    }
}

function getSpreadsheetData() {
    Tabletop.init( { key: "https://docs.google.com/spreadsheets/d/"
                   + window.BVNofficeProgressPublicSpreadsheetUrlKey
                   + "/pubhtml",
                     callback: showInfo,
                     simpleSheet: true } );
}


function showInfo(data, tabletop) {
    // alert('Successfully processed the table!')
    window.officeStates = data;

    initialiseFloorplan(data);

    google.charts.load('current', {'packages': ['gantt']});
    google.charts.setOnLoadCallback(drawChart);
}

function initialiseGantDataTable() {
    let dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Task ID');
    dataTable.addColumn('string', 'Task Name');
    if (window.BVNvisualiserColouredBySector) {
        dataTable.addColumn('string', 'Resource');
    }
    dataTable.addColumn('date', 'Start Date');
    dataTable.addColumn('date', 'End Date');
    dataTable.addColumn('number', 'Duration');
    dataTable.addColumn('number', 'Percent Complete');
    dataTable.addColumn('string', 'Dependencies');
    return dataTable;
}

function getStartDateRow() {
    for (let tempRowIndex = window.officeStates.length-1; tempRowIndex >= 0; tempRowIndex--) {
        if (window.officeStates[tempRowIndex]['date'] == 'datesStart') {
            return tempRowIndex;
        }
    }
}

function dateIsGood(d) {
    return d != null || d != '';
}

function removeVal(arr, val) {
    var index = arr.indexOf(val);
    if (index > -1) {
        arr.splice(index, 1);
    } else {
        console.log("didn't find", val, "in", arr);
    }

    return arr;
}

function drawChart() {
    // Finds where the dates are - assumes the first relevant column is the third one.
    var datesStartRow = getStartDateRow();

    slider();

    // Creating the data structure for the gantt chart
    let dataTable = initialiseGantDataTable();

    // Various variable initialisations for the following loop
    let name = 'uninitialised name';
    let previousNameList = [];
    let startDay = new Date(1970, 1, 1);
    let endDay = new Date(1970, 2, 2);
    let cellValue = null;
    let nameUnfound = true;
    let extraCount = 2;
    let rowCount = 0;
    let constructionIdentifier = window.BVNvisualiserConstructionIdentifier;
    let sectionStartDate = '3/3/2003';
    let cellValueEnd = '4/4/2004';
    let currentTime = Date.now();
    let percentageCompleted = 0.0;
    let displayName = '';

    let allColumnNames = Object.keys(window.officeStates[0]);
    let usefulColumnNames = removeVal(allColumnNames, "date");
    usefulColumnNames = removeVal(usefulColumnNames, "notes");

    for (i = 0; i < usefulColumnNames.length; i++) {
        let columnName = usefulColumnNames[i];
        //columnName is the header of each column i.e. for each column

        // Looping through the rows
        for (let tempRowIndex = datesStartRow; tempRowIndex < window.officeStates.length; tempRowIndex += 2) {
            sectionStartDate = window.officeStates[tempRowIndex][columnName];

            if (dateIsGood(sectionStartDate)) {
                // Checking for name already being taken
                if (previousNameList.indexOf(columnName) == -1) {
                    // Workaround for the lack of an 'in' function in javascript
                    name = columnName;
                } else {
                    // Adding extra "pt." until untaken
                    extraCount = 2;
                    nameUnfound = true;
                    while (nameUnfound == true) {
                        if (previousNameList.indexOf(columnName + ' pt.' + extraCount) == -1) {
                            name = columnName + ' pt.' + extraCount;
                            nameUnfound = false;
                        }
                        extraCount++;
                    }
                }
                previousNameList.push(name);

                displayName = createDisplayName(name);

                // Formatting start and end dates
                cellValueEnd = window.officeStates[tempRowIndex + 1][columnName];
                startDay = convertCellDate(sectionStartDate);
                endDay =   convertCellDate(cellValueEnd);

                // Calculating percentage completed from start, current, and end times (Deprecated for consistency with other elements)
                // if (endDay.getTime() < currentTime) {
                //     percentageCompleted = 100;
                // } else if (startDay.getTime() > currentTime) {
                //     percentageCompleted = 0;
                // } else {
                //     percentageCompleted = Math.round(((currentTime-startDay.getTime())/((endDay.getTime()-startDay.getTime())))*1000)/10;
                // }

                percentageCompleted = 0;

                // Adding row information
                if (window.BVNvisualiserColouredBySector) {
                    dataTable.addRow([name, displayName, columnName, startDay, endDay, null, 100, null]);

                    // Adding row information to global variable for easy continual generation
                    nearlyFilledDataRows.push([name, displayName, columnName, startDay, endDay, null]);
                } else {
                    dataTable.addRow([name, displayName, startDay, endDay, null, percentageCompleted, null]);

                    // Adding row information to global variable for easy continual generation
                    nearlyFilledDataRows.push([name, displayName, startDay, endDay, null]);
                }
                rowCount++;
                // console.log(name + " " + startDay + " " + endDay);
            }
        }
    }


    chartOptions = {
        // height: 30*rowCount + 50,
        gantt: {
            trackHeight: 30,
        },
        labelStyle: {
            fontName: 'Arial',
            fontSize: 40,
            color: '#FF0000',
        },
    };

    // console.log("HERE! Part 5")

    let container = document.getElementById('chart_div');
    chart = new google.visualization.Gantt(document.getElementById('chart_div'));

    // monitor activity, change bar color
    // Doesn't work atm, hence commented out. Definitely look into this as a future feature.
    // (Mainly because of lack of support from google api. )

    /*
    var observer = new MutationObserver(function (mutations) {
        Array.prototype.forEach.call(container.getElementsByTagName('path'), function(bar, index) {
            if (data.getValue(index, 6) > 100) {
                bar.setAttribute('fill', '#a52714');
            }
        });
    });
    observer.observe(container, {
        childList: true,
        subtree: true
    });
    */


    // console.log(data, name, previousNameList, startDay, endDay, cellValue, nameUnfound, extraCount, rowCount,
    //             constructionIdentifier, cellValueStart, cellValueEnd, columnKey, tempRow, chartOptions, chart)


    // https://developers.google.com/chart/interactive/docs/gallery/ganttchart#a-simple-example

    // https://stackoverflow.com/questions/40655308/change-the-bar-color-in-gantt-chat-based-on-value/40655754#40655754

    chart.draw(dataTable, chartOptions);
}


function convertCellDate(dateString) {
    // Converts the date from the structure it's given in in the cell 
    // to the necessary format for the gantt chart
    dateList = dateString.split('/');
    return new Date(dateList[2], dateList[0], dateList[1]);
}


function updateChart(currentTime) {
    /* Update chart data with date from slider

    Sets the progress of each element in the gantt chart to correspond with the date selected by the slider.
    */

    // Try statement catches instances where the spreadsheet hasn't loaded yet
    try {
        // console.log(window.officeStates)

        // throw '- actually just temp error to stop this function from working.'

        let startDay = new Date(2001, 1, 1);
        let endDay = new Date(2002, 2, 2);

        // Initialising data
        let newData = initialiseGantDataTable();

        // Removing all the rows
        // data.removeRows(0, rowCount-1)

        let updatedChartData = [];

        // Looping through each row
        for (let index in nearlyFilledDataRows) {
            incompleteRow = nearlyFilledDataRows[index];

            // Fetching relevant dates
            startDay = incompleteRow[2];
            endDay = incompleteRow[3];

            // Calculating percentage completed
            if (endDay.getTime() < currentTime) {
                percentageCompleted = 100;
            } else if (startDay.getTime() > currentTime) {
                percentageCompleted = 0;
            } else {
                percentageCompleted = Math.round(((currentTime-startDay.getTime())/((endDay.getTime()-startDay.getTime())))*1000)/10;
            }

            // Adding the updated items to the row
            newDataList = incompleteRow.concat([percentageCompleted, null]);
            newData.addRow(newDataList);
        }

        // Redrawing the chart with the updated progress bars
        chart.draw(newData, chartOptions);
    } catch (e) {
        console.log('probably just wait for the spreadsheet to load (gantt chart update) ', e);
    }
}


function createDisplayName(name) {
    let re = /(\w)(\w+)(\d\d)/g;
    result = name.replace(re, "$1$2 $3");
    return result;
}


function hoverTest() {
    // DO THIS DOCUMENTATION BLURB

    let textElements = document.getElementsByTagName('text');
    let hoverOverFlag = false;

    for (let textElementIndex in textElements) {
        // Looking for a <text> element with a dash in it. Specifically a line that resembles this:
        // "centre: Dec 2017 - Jan 2018"
        // The dash is an easy (albeit problematic) differentiator
        try {
            if (textElements[textElementIndex].textContent.indexOf('-') != -1) {

                // Get the string before the : without any "pt. 2"s or similar:
                window.BVNcurrentHoverZone = textElements[textElementIndex].textContent.split(':')[0].trim().split(' ')[0];
                window.BVNcurrentHoverZone = window.BVNvisualiserConstructionIdentifier + window.BVNcurrentHoverZone;
                hoverOverFlag = true;


                // Read in current opacity state for safekeeping
                // row = window.officeStates[window.BVNcurrentSliderValue]

                // Highlighting hovered zone
                var currentZone = document.getElementById(window.BVNcurrentHoverZone);
                currentZone.style.opacity = 0.5;
                break;
            }
        } catch (e) {
            // Log the error if it isn't the expected (and unimportant) error
            if (e != 'TypeError: Cannot read property \'indexOf\' of undefined') {
                console.log(e);
            }
        }
    }

    if (!hoverOverFlag) {
        // Reseting zones if not being hovered over
        try {
            for (let elementOpacityKey in window.officeStates[window.BVNcurrentSliderValue]) {
                if (elementOpacityKey.substring(0, window.BVNvisualiserConstructionIdentifier.length) == window.BVNvisualiserConstructionIdentifier) {

                    var currentZone = document.getElementById(elementOpacityKey);

                    currentZone.style.opacity = window.officeStates[window.BVNcurrentSliderValue][elementOpacityKey];
                }
            }
            window.BVNcurrentHoverZone = 'NONE';
        } catch (e) {
            // console.log(elementOpacityKey)
        }
    }
    setTimeout(hoverTest, 1000);
}

var nearlyFilledDataRows = [];
window.BVNcurrentHoverZone = 'NONE';
window.BVNcurrentSliderValue = 0;

window.addEventListener('DOMContentLoaded', getSpreadsheetData);
window.addEventListener('DOMContentLoaded', slider);


// window.onload = hoverTest();
