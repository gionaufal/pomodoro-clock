//desktop notifications
document.addEventListener('DOMContentLoaded', function () {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
});


//code start
$(document).ready(function() {
 //Updates timer time
  
  var timerTime = +($('#work-time').text());
  var breakTime = +($('#break-time').text());
  
  
  function plusTime () {
      $('#work-time').html(timerTime= timerTime+1);
  }
  $('#work-plus').click(plusTime);
  
  
  function minusTime () {
    if (timerTime > 1) {
      $('#work-time').html(timerTime= timerTime-1);
    }
  }
  $('#work-minus').click(minusTime);

 $('#work-plus, #work-minus').click(function() {
    $('#timer').html(timerTime+':'+'00');
  });
  
  function plusBreak () {
      $('#break-time').html(breakTime= breakTime+1);
  }
  $('#break-plus').click(plusBreak);
  
  function minusBreak () {
    if (breakTime > 1) {
      $('#break-time').html(breakTime= breakTime-1);
    }
  }
  $('#break-minus').click(minusBreak);
  

    
//notification functions
  
  function notifyWork () {
      if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.'); 
    return;
  }
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification('Pause now!', {
      icon: 'http://masterjurisonline.com/wp-content/uploads/2014/07/M%C3%A9todo-Pomodoro.png',
      body: "End of work cycle! Get some rest",
    });

  }

}
  
 function notifyRest () {
      if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.'); 
    return;
  }
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification('Back to work!', {
      icon: 'http://masterjurisonline.com/wp-content/uploads/2014/07/M%C3%A9todo-Pomodoro.png',
      body: "Break is over. Time to focus!",
    });

  }

}
  
  
  
  //timer function
     function startTimer(duration, display) {
 //added a date parameter to improve timer accurability
        var start = Date.now(),
            diff;
        var timer = duration, minutes, seconds;
        var secondsBreak = breakTime * 60;
        var i = 0;
        var timerStart = setInterval(function () {

            diff = duration - (((Date.now() - start) / 1000) | 0);
   
            minutes = parseInt(diff / 60, 10);
            seconds = parseInt(diff % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;
          timer --

            if (timer < 0 && (i % 2) == 0) {
                timer = secondsBreak;
                $('#clock').addClass('breakInterval');
                notifyWork();
                alert ('End of work cicle. Rest now!');
                start = Date.now();

                i++;
            }
            else if (timer < 0 && (i%2) == 1) {
                timer = duration;
                $('#clock').removeClass('breakInterval');
                notifyRest();
                alert ('End of rest. Back to work!');
                start = Date.now();
                i++;
            }
          
        }, 1000);
       
       
  //reset timer - only works after timer is started
  function resetTimer() {
    timerTime = 25;
    breakTime = 5;
    clearInterval(timerStart);
    $('#work-time').html(timerTime);
    $('#break-time').html(breakTime);
    $('#timer').html(timerTime+':00');
    $('#clockTimer').prop('disabled', false);
    $('#clock').removeClass('breakInterval');
    
  }
  
  $('#reset').click(resetTimer);
  
       
     
     }
//start timer
    $('#clockTimer').click(function () {
        var secondsWork = timerTime * 60,
            display = document.querySelector('#timer');
        startTimer(secondsWork, display);
      this.disabled=true;
     
    });
    


 
});