function countdown(state,minutes, counterLoc, source, channelData) {
    var seconds = 60;
    var mins = minutes;
    var counter = document.getElementById(counterLoc);
    var timerState = state;
    function tick() {
        if (timerState === "run") {
            var current_minutes = mins - 1;
            seconds--;
            counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
            if (seconds > 0) {
                //todo: need way to manage active timers so we can cancel them all upon successul login
                timerTimeout = setTimeout(tick, 1000);
            } else {
                if (mins > 1) {
                    countdown("run", mins - 1, counterLoc, source, channelData);
                }
            }
        } else {
            if (typeof timerTimeout !== "undefined") {
                clearTimeout(timerTimeout);
            }
        }
    }
    if (seconds === 0 && mins === 0) {
        if (typeof timerTimeout !== "undefined") {
            clearTimeout(timerTimeout);
        }
    } else {
        tick();
    }
}