let reminders = [];
const reminder = document.createElement('p');
reminder.style.cssText = 'background-color: #ffffff;color:#f95959; padding:2em;max-width:fit-content;align-self:center;font-weight:bold;';

document.getElementById('reminderForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const day = document.getElementById('day').value;
    const time = document.getElementById('time').value;
    const activity = document.getElementById('activity').value;

    if (day !== '' && time !== '') {
        const reminderMessage = `Reminder set for ${day} at ${time} to ${activity}.`;
        document.getElementById('reminderMessage').innerText = reminderMessage;
        document.getElementById('reminderMessage').style.cssText = 'display:block;';

        reminders.push({ 'activity': activity, 'time': time });

        // Append reminder with new line
        reminder.innerHTML += `Time for ${activity} <br>`;

        const now = new Date();
        const reminderTime = new Date(`${now.toDateString()} ${time}`);

        if (reminderTime > now) {
            const timeDiff = reminderTime - now;
            setTimeout(() => {
                document.getElementsByTagName('h1')[0].insertAdjacentElement('beforebegin', reminder);

                const closeButton = document.createElement('button');
                closeButton.textContent = "Okay";
                closeButton.style.cssText = 'margin-top: 10px; display: block;';
                closeButton.addEventListener('click', function() {
                    reminder.remove(); 
                });
                
                reminder.appendChild(closeButton); 
            }, timeDiff);
        }
    } else {
        document.getElementById('reminderMessage').innerText = "Specify Date and time to set the activity";
        document.getElementById('reminderMessage').style.cssText = 'background-color: #ffffff;color:#f95959; padding:2em;max-width:fit-content;align-self:center;font-weight:bold;';
    }
});
