const startbtn = document.getElementById('start');
const stopbtn = document.getElementById('stop');
const reset = document.getElementById('reset');
// select days, hours, minutes, seconds
let days = document.getElementById('days');
let hours = document.getElementById('hours');
let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');

// new element to display once timer ends
let wish = document.createElement('div');
let interval;

startbtn.addEventListener('click', calculate);

function calculate() {
    const date = document.getElementsByName('date')[0].value;
    const time = document.getElementsByName('time')[0].value;
    
    if (date != '' && time != '') {
        let selectedEndTime = new Date(`${date} ${time}`);
        let curDateTime = new Date();

        if (selectedEndTime > curDateTime) {
            interval = setInterval(() => {
                curDateTime = new Date();
                // timedifference in milliseconds between current time and selected time
                let timeDifference = selectedEndTime - curDateTime;
                console.log(timeDifference);

                // Convert timeDifference into total seconds
                let miliToSec = Math.floor(timeDifference / 1000);

                // Calculate remaining days, hours, minutes, and seconds using modulo
                let remainingDays = Math.floor(miliToSec / (24 * 60 * 60));
                let remainingHours = Math.floor((miliToSec % (24 * 60 * 60)) / (60 * 60));
                let remainingMinutes = Math.floor((miliToSec % (60 * 60)) / 60);
                let remainingSeconds = miliToSec % 60;

                // Update the DOM elements with the remaining time
                days.innerText = remainingDays;
                hours.innerText = remainingHours;
                minutes.innerText = remainingMinutes;
                seconds.innerText = remainingSeconds;

                // Check if the countdown timer has ended
                if (timeDifference <= 0) {
                    clearInterval(interval);
                    days.innerText = 0;
                    hours.innerText = 0;
                    minutes.innerText = 0;
                    seconds.innerText = 0;

                    wish.innerHTML = `<p>Countdown timer ended</p><br>
                    <button id='ok' style='background-color:green; padding:0.7em; color:black;'>Ok</button>`;
                    wish.style.cssText = `background-color:white; color:black; padding:1em; margin-bottom:2em; font-weight:bold;`;
                    let body = document.getElementsByTagName('body')[0];
                    body.insertAdjacentElement('afterbegin', wish);

                    setTimeout(() => {
                        wish.innerText = '';
                        wish.removeAttribute('style');
                    }, 4000);
                }
            }, 1000);
        } else {
            showMessage('Please select a future date and time!', true);
        }
    } else {
        showMessage('Date and Time must be entered to start countdown!', true);
    }
}

reset.addEventListener('click', function() {
    days.innerText = 0;
    hours.innerText = 0;
    minutes.innerText = 0;
    seconds.innerText = 0;
    clearInterval(interval);
});

// to stop down the counter
stopbtn.onclick = function() {
    wish.innerHTML = `<p>Do you want to stop the countdown?</p><br>
    <button id='stopOk'>Ok</button><button id='cancelit'>Cancel</button>`;
    wish.style.cssText = `background-color:white; color:black; padding:1em; margin-bottom:2em; font-weight:bold;`;
    let body = document.getElementsByTagName('body')[0];
    body.insertAdjacentElement('afterbegin', wish);

    document.getElementById('stopOk').style.cssText = 'background-color: red; color: white; padding: 0.5em 1em; margin-right:1em';
    document.getElementById('cancelit').style.cssText = 'background-color: green; color: white; padding: 0.5em 1em;';

    // if ok then stop the counter
    document.getElementById('stopOk').onclick = function(event) {
        clearInterval(interval);
        wish.innerText = '';
        wish.removeAttribute('style');
    }
    document.getElementById('cancelit').onclick = function(event) {
        wish.innerText = '';
        wish.removeAttribute('style');
    }
}

// Helper function to display messages
function showMessage(message, isError = true) {
    wish.innerHTML = `<p>${message}</p><br>
    <button id='gotIt' style='background-color:${isError ? 'red' : 'green'}; color:white; padding:0.7em;'>Ok</button>`;
    wish.style.cssText = `background-color:white; color:black; padding:1em; margin-bottom:2em; font-weight:bold;`;

    let body = document.getElementsByTagName('body')[0];
    body.insertAdjacentElement('afterbegin', wish);

    setTimeout(() => {
        wish.innerHTML = '';
        wish.removeAttribute('style');
    }, 3000);
}
