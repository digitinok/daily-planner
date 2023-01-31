$(function() {
    // script only starts after DOM is loaded

    let timeContainer = $(".container");
    //timeContainer.addClass("time-block");
    let stored = $("<p>");    
    stored.html('Appointment added to <code>LocalStorage</code> <i class="fa fa-check" aria-hidden="true"></i>');
    stored.attr("class", "hide").attr("id", "stored");
    timeContainer.append(stored);

    // get the date
    let date = moment();
    let currentDayEl = $("#currentDay");
    let currentTimeEl = $("#currentTime");
    // format the date
    currentDayEl.text(date.format("dddd, DD MMM YYYY"));
    currentTimeEl.text(date.format("HH:mm:ss"));
    // initialize current and previous hour
    let currentHour = parseInt(date.format("H"));
    let previousHour = parseInt(date.format("H"));

    let storeAppointments = JSON.parse(localStorage.getItem("storeAppointments"));
    if (storeAppointments === null) {
        storeAppointments = {};
    }

    myTimer = setInterval(function () {

        // time updated every second
        date = moment();
        currentTimeEl.text(date.format("HH:mm:ss"));
        currentHour = parseInt(date.format("H"));
        if (currentHour !== previousHour) {
            // if the hour changes, the color coding gets updated
            let strTestArea = `textarea.${currentHour}`;
            $(strTestArea).addClass("present").removeClass("future");
            strTestArea = `textarea.${previousHour}`;
            $(strTestArea).addClass("past").removeClass("present");
            previousHour = currentHour;
        }
    }, 1000);

    
    // using a time window from 8:00 to 18:00 in 1 hour slots
    for (let time=8; time<18   ; time++) {
        // create a row for each hour
        let row = $("<div></div>");
        // add hour as class
        row.attr("id", String(time));
        row.addClass(String(time));
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
        if (storeAppointments !== null) {
            appointmentBlock.val(storeAppointments[String(time)]);
        }

        // save button to save appointment
        let saveButton = $('<button></button>');
        saveButton.addClass(String(time));
        saveButton.addClass("col-1 saveBtn fas fa-save");
        saveButton.on("click", function (event) {
            // event handler for save buttons
            let timeId = $(this).parent().attr("id");
            // get the text in the corresponding text area to save into local storage
            let strTestArea = `textarea.${timeId}`;
            storeAppointments[timeId] = $(strTestArea).val();
            localStorage.setItem("storeAppointments", JSON.stringify(storeAppointments));
            stored.removeClass("hide")

            const myTimeout = setTimeout(function () {stored.addClass("hide")}, 2000);
        })

        row.append(hourBlock, appointmentBlock, saveButton);

        // color code the hours based on past, present and future
        if (currentHour > time) {
            appointmentBlock.addClass("past");
        } else if (currentHour === time){
            appointmentBlock.addClass("present");
        } else {
            appointmentBlock.addClass("future");
        }
    }

});