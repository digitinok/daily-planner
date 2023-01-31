let timeContainer = $(".container");
//timeContainer.addClass("time-block");
let stored = $("<p>").html('Appointment added to <code>LocalStorage</code> <i class="fa fa-check" aria-hidden="true"></i>')
stored.attr("id", "stored")
stored.attr("class", "hide")
timeContainer.append(stored);

let currentDayEl = $("#currentDay");
let currentTimeEl = $("#currentTime");
let date = moment();
currentDayEl.text(date.format("dddd, DD MMM YYYY"));
currentTimeEl.text(date.format("HH:mm:ss"));
let currentHour = parseInt(moment().format("H"));
let previousHour = parseInt(moment().format("H"));
console.log(currentHour);

myTimer = setInterval(function () {
    // count down timer every second and finish when time is 0
    currentTimeEl.text(moment().format("HH:mm:ss"));
    currentHour = parseInt(moment().format("H"));
    if (currentHour !== previousHour) {

        let strTestArea = `textarea.${currentHour}`;
        $(strTestArea).addClass("present").removeClass("future");
        strTestArea = `textarea.${previousHour}`;
        $(strTestArea).addClass("past").removeClass("present");
        previousHour = currentHour;
        
    }
}, 1000);

  
// using a time window from 8:00 to 18:00 in 1 hour slots
for (let time=20; time<24   ; time++) {
    // create a row for each hour
    let row = $("<div></div>");
    // add hour as class
    row.addClass(String(time));
    row.attr("id", String(time));
    row.addClass("row time-block");
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
    appointmentBlock.addClass("col-10 description");
    appointmentBlock.val(localStorage.getItem(String(time)));

    // save button to save appointment
    let saveButton = $('<button></button>');
    saveButton.addClass(String(time));
    saveButton.addClass("col-1 saveBtn fas fa-save");
    saveButton.on("click", function (event) {

        let timeId = $(this).parent().attr("id");
        // get the text in the corresponding text area to save into local storage
        let strTestArea = `textarea.${timeId}`;
        localStorage.setItem(timeId, $(strTestArea).val());
        stored.removeClass("hide")

        const myTimeout = setTimeout(function () {stored.addClass("hide")}, 2000);
  

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

