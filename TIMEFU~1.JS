//Time function to convert seconds 
function Timefn1($page, event) {
    var seconds = $page.State.tokenValid;
    console.log("Seconds left to covert are", seconds);
    // multiply by 1000 because Date() requires milliseconds
    var date = new Date(seconds * 1000);
    var hh = date.getUTCHours();
    var mm = date.getUTCMinutes();
    var ss = date.getSeconds();
    // If you were building a timestamp instead of a duration, you would uncomment the following line to get 12-hour (not 24) time
    // if (hh > 12) {hh = hh % 12;}
    // These lines ensure you have two-digits
    if (hh < 10) { hh = "0" + hh; }
    if (mm < 10) { mm = "0" + mm; }
    if (ss < 10) { ss = "0" + ss; }
    // This formats your string to HH:MM:SS
    var t = hh + ":" + mm + ":" + ss;
    //document.write(t);
    console.log("the converted time is ", t);
    //console.log(" Time remaining is", )
    $page.State.tokenTimeLeft = t;
    $page.update();
  }  