let currentDay = $("#currentDay");
let currentTime = $("#currentTime");
let date = moment();
currentDay.text(date.format("dddd, DD MMM YYYY"));
currentTime.text(date.format("HH:mm:ss"));

myTimer = setInterval(function () {
    // count down timer every second and finish when time is 0
    currentTime.text(moment().format("HH:mm:ss"));
}, 1000);
  