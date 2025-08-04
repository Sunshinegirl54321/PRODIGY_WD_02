const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');
// Stopwatch variables
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 1;
// Format time to HH:MM:SS
function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    
    return (
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0') + '.' +
        String(milliseconds).padStart(2, '0')
    );
}
// Start the stopwatch
function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            display.textContent = formatTime(elapsedTime);
        }, 10);
        isRunning = true;
        
        // Update button states
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        lapBtn.disabled = false;
        
        // Visual feedback
        startBtn.style.opacity = "0.7";
        pauseBtn.style.opacity = "1";
        lapBtn.style.opacity = "1";
    }
}
// Pause the stopwatch
function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        
        // Update button states
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        
        // Visual feedback
        startBtn.style.opacity = "1";
        pauseBtn.style.opacity = "0.7";
    }
}
// Reset the stopwatch
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = formatTime(elapsedTime);
    lapCount = 1;
    
    // Clear laps list and reset to default message
    lapsList.innerHTML = '';
    const noLaps = document.createElement('li');
    noLaps.classList.add('no-laps');
    noLaps.textContent = 'No laps recorded yet';
    lapsList.appendChild(noLaps);
    
    // Update button states
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
    
    // Visual feedback
    startBtn.style.opacity = "1";
    pauseBtn.style.opacity = "0.7";
    lapBtn.style.opacity = "0.7";
}
// Record a lap time
function recordLap() {
    if (isRunning) {
        const lapTime = elapsedTime;
        
        // Remove "no laps" message if present
        if (lapsList.querySelector('.no-laps')) {
            lapsList.innerHTML = '';
        }
        
        // Create new lap element
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `
            <span>Lap ${lapCount}</span>
            <span>${formatTime(lapTime)}</span>
        `;
        
        // Add to top of list
        lapsList.insertBefore(lapItem, lapsList.firstChild);
        
        // Highlight the latest lap
        lapItem.style.background = 'rgba(255, 255, 255, 0.2)';
        setTimeout(() => {
            lapItem.style.background = 'rgba(255, 255, 255, 0.1)';
        }, 1000);
        
        lapCount++;
    }
}
// Event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
// Initialize button states
pauseBtn.disabled = true;
lapBtn.disabled = true;
pauseBtn.style.opacity = "0.7";
lapBtn.style.opacity = "0.7";
// Initialize laps list
resetTimer();