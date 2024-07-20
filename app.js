// Btn move in stopwatch
$('.stopwatch-btn').click(function() {
    $('.outer-wrapper > div').slideUp();

    $('.stopwatch').slideDown();
    $('.type').html("Stopwatch");

})

// Btn move in timer
$('.timer-btn').click(function() {
    $('.outer-wrapper > div').slideUp();

    $('.timer').slideDown();
    $('.type').html("timer");

})

// Btn Back
$('.back-btn').click(function() {
    $('.outer-wrapper > div').slideUp();

    $('.clock').slideDown();
    $('.type').html("Clock");
    
})

// ===================================================================

// Clock
function addTrailingZero(num) {
    return num < 10 ? '0' + num : num;
}

function updateTime() {
    const time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM"
    let otherampm = hours >= 12 ? "AM" : "PM"

    // Convert hour from 24 to 12
    hours = hours % 12 || 12;

    // Add '0' if less than 10
    hours = addTrailingZero(hours);
    minutes = addTrailingZero(minutes);
    seconds = addTrailingZero(seconds);

    $('#hour').html(hours);
    $('#min').html(minutes);
    $('#sec').html(seconds);
    $('#ampm').html(ampm);
    $('#other-ampm').html(otherampm);
}

updateTime()

// callback function after every second
setInterval(updateTime, 1000)

// ===================================================================

// Stopwatch
let stopwatchHours = 0,
    stopwatchMinutes = 0,
    stopwatchSeconds = 0,
    stopwatchMiliSeconds = 0,
    stopwatchRunning = 0,
    laps = 0,
    stopwatchInterval = 0;

function stopwatch() {
    stopwatchMiliSeconds++;
    if (stopwatchMiliSeconds === 100) {
        stopwatchSeconds++;
        stopwatchMiliSeconds = 0;
    }
    if (stopwatchSeconds === 60) {
        stopwatchMinutes++;
        stopwatchSeconds = 0;
    }
    if (stopwatchMinutes === 60) {
        stopwatchHours++;
        stopwatchMinutes = 0;
    }

    $('#stopwatch-hour').html(addTrailingZero(stopwatchHours));
    $('#stopwatch-min').html(addTrailingZero(stopwatchMinutes));
    $('#stopwatch-sec').html(addTrailingZero(stopwatchSeconds));
    $('#stopwatch-ms').html(addTrailingZero(stopwatchMiliSeconds));
}

function startStopwatch() {
    if(!stopwatchRunning) {
        stopwatchInterval = setInterval(stopwatch, 10);
        stopwatchRunning = true;
    }
}

function skipStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
}

$('.start-stopwatch').click(function() {
    startStopwatch();

    $('.start-stopwatch').hide();
    $('.lap-stopwatch').show();
})

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchHours = 0;
    stopwatchMinutes = 0;
    stopwatchSeconds = 0;
    stopwatchMiliSeconds = 0;
    stopwatchRunning = 0;
    laps = 0;
    
    $('#stopwatch-hour').html('00');
    $('#stopwatch-min').html('00');
    $('#stopwatch-sec').html('00');
    $('#stopwatch-ms').html('00');
    $('.laps').html('');
}

$('.reset-stopwatch').click(function() {
    resetStopwatch();

    $('.start-stopwatch').show();
    $('.lap-stopwatch').hide();
})

$('.lap-stopwatch').click(function() {
    laps++;

    // remove active class
    $('.lap').removeClass('active');

    // add 'lap' to before: prepend()
    $('.laps').prepend(`
        <div class="lap active">
            <p>lap ${laps}</p>
            <p>
                ${addTrailingZero(stopwatchHours)} : 
                ${addTrailingZero(stopwatchMinutes)} : 
                ${addTrailingZero(stopwatchSeconds)} : 
                ${addTrailingZero(stopwatchMiliSeconds)}
            </p>
        </div>    
    `)
})

// ===================================================================

// Timer
let time = 0,
    timeHours = 0,
    timeMinutes = 0,
    timeSeconds = 0,
    timeMiliSeconds = 0,
    timeInterval = 0;

function timer() {
    timeMiliSeconds--;
    if(timeMiliSeconds === -1) {
        timeMiliSeconds = 99;
        timeSeconds--;
    }
    if(timeSeconds === -1) {
        timeSeconds = 59;
        timeMinutes--;
    }
    if(timeMinutes === -1) {
        timeMinutes = 59;
        timeHours--;
    }
    
    $('#timer-hour').html(addTrailingZero(timeHours));
    $('#timer-min').html(addTrailingZero(timeMinutes));
    $('#timer-sec').html(addTrailingZero(timeSeconds));
    $('#timer-ms').html(addTrailingZero(timeMiliSeconds));

    timeUp();
}

function getTime() {
    time = prompt("Nhập thời gian hẹn giờ (đơn vị phút):");
    time = time * 60;
    setTime();
}

function setTime() {
    timeHours = Math.floor(time/3600);
    timeMinutes = Math.floor((time % 3600) / 60);
    timeSeconds = Math.floor(time % 60);

    $('#timer-hour').html(addTrailingZero(timeHours));
    $('#timer-min').html(addTrailingZero(timeMinutes));
    $('#timer-sec').html(addTrailingZero(timeSeconds));
    $('#timer-ms').html(addTrailingZero(timeMiliSeconds));
}

function startTimer() {
    if(
        (timeHours === 0) & (timeMinutes === 0) &&
        timeSeconds === 0 &&
        timeMiliSeconds === 0
    ) {
        getTime();
    } else {
        timeInterval = setInterval(timer, 10);
        $('.start-timer').hide();
        $('.stop-timer').show();
    }
}

function stopTimer() {
    clearInterval(timeInterval);
    $('.start-timer').show();
    $('.stop-timer').hide();
}

function resetTimer() {
    stopTimer();
    time = 0;
    setTime();
}

// check time < 0
function timeUp() {
    if (
        timeHours === 0 &&
        timeMinutes === 0 &&
        timeSeconds === 0 &&
        timeMiliSeconds === 0
    ) {
        resetTimer();
        alert("Time's up");
    }
}

$('.start-timer').click(function() {
    startTimer();
})

$('.stop-timer').click(function() {
    stopTimer();
})

$('.reset-timer').click(function() {
    resetTimer();
    
})