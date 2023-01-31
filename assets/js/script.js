let timeContainer = $(".container");

let currentDay = $("#currentDay");
let currentTime = $("#currentTime");
let date = moment();
currentDay.text(date.format("dddd, DD MMM YYYY"));
currentTime.text(date.format("HH:mm:ss"));
let currentHour = parseInt(moment().format("H"));
console.log(currentHour);

myTimer = setInterval(function () {
    // count down timer every second and finish when time is 0
    currentTime.text(moment().format("HH:mm:ss"));
}, 1000);
  
// using a time window from 8:00 to 18:00 in 1 hour slots
for (let time=8; time<18; time++) {
    // create a row for each hour
    let row = $("<div></div>");
    row.addClass("row");
    // add hour as class
    row.addClass(String(time));
    timeContainer.append(row);

    // time to the left hand side
    let hourBlock = $("<p></p>");
    hourBlock.addClass(String(time));
    hourBlock.addClass("col-1 hour");
    // display the hour time
    hourBlock.text(time+":00")

    // Appointment block in the middle
    let appointmentBlock = $("<textarea></textarea>");
    appointmentBlock.addClass(String(time));
    appointmentBlock.addClass("col-10 description time-block");

    // save button to save appointment
    let saveButton = $('<button></button>');
    saveButton.addClass(String(time));
    saveButton.addClass("col-1 saveBtn fas fa-save");
    saveButton.on("click", function (event) {
        console.log(this);
    })


    row.append(hourBlock, appointmentBlock, saveButton);

    if (currentHour > time) {
        appointmentBlock.addClass("past");
    } else if (currentHour === time){
        appointmentBlock.addClass("present");
    } else {
        appointmentBlock.addClass("future");
    }
}

