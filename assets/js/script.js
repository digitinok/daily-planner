let timeContainer = $(".container");

let currentDay = $("#currentDay");
let currentTime = $("#currentTime");
let date = moment();
currentDay.text(date.format("dddd, DD MMM YYYY"));
currentTime.text(date.format("HH:mm:ss"));

myTimer = setInterval(function () {
    // count down timer every second and finish when time is 0
    currentTime.text(moment().format("HH:mm:ss"));
}, 1000);
  
// i
for (let i=8; i<18; i++) {
    // create a row for each hour
    let row = $("<div></div>");
    row.addClass("row");
    // hour as class
    row.addClass(String(i));
    timeContainer.append(row);

    // timer to the left hand side
    let hourBlock = $("<div></div>");
    hourBlock.addClass(String(i));
    hourBlock.addClass("col-1 hour");
    // display the hour i
    hourBlock.text(i+":00")

    // descrition block in the middle
    let appointmentBlock = $("<textarea></textarea>");
    appointmentBlock.addClass(String(i));
    appointmentBlock.addClass("col-10 description past");

    let saveButton = $("<button></button>");
    saveButton.addClass(String(i));
    saveButton.addClass("col-1 saveBtn fas fa-save");


    row.append(hourBlock, appointmentBlock, saveButton);
}