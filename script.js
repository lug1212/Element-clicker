// Variables
let money = 99999;
let gain = 1;
let gainpersecond = 0;
let delay = 1000;
let intervalId; // Store the interval ID

// Functions
function onclicked() {
    money += gain;
    document.querySelector('.money').innerText = 'Quartz: ' + money;
}

function Aps(){
    money += gainpersecond;
    document.querySelector('.money').innerText = 'Quartz: ' + money;
}

// Event listeners
document.getElementById('upgrade1').addEventListener('click', function(e) {
    const cost = 1000;
    if (money >= cost) {
        money -= cost;
        delay = 500; // Update the delay
        clearInterval(intervalId); // Clear the old interval
        intervalId = setInterval(Aps, delay); // Set a new interval with the updated delay
        document.getElementById('.upgrade1').style.display = 'none';
    }
});

document.getElementById('element').addEventListener('click', function(event) {
    const plusOneContainer = document.createElement('div');
    plusOneContainer.textContent = '+' + gain;
    plusOneContainer.className = 'plusOne';
    document.body.appendChild(plusOneContainer);

    // Adjust position to account for scrolling
    const scrollOffsetX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollOffsetY = window.pageYOffset || document.documentElement.scrollTop;

    plusOneContainer.style.left = `${event.clientX + scrollOffsetX}px`;
    plusOneContainer.style.top = `${event.clientY + scrollOffsetY}px`;

    // Trigger the fade-out animation
    setTimeout(() => {
        document.body.removeChild(plusOneContainer);
    }, 2000);
});

document.getElementById('ejminer').addEventListener('click', function(event) {
    const cost = 200;
    if (money >= cost) {
        money -= cost;
        gainpersecond += 1;
        document.querySelector('.money').innerText = 'Quartz: ' + money;
        document.querySelector('.aps').innerText = 'Persecond \n' + gainpersecond;
    }
});

document.getElementById('buyElement').addEventListener('click', event => {
    const cost = 25;
    if (money >= cost) {
        gain += 1;
        money -= cost;
        document.querySelector('.money').innerText = 'Quartz: ' + money;
    }
});

document.getElementById('toggleShop').addEventListener('click', function() {
    const shop = document.querySelector('.shop');
    shop.style.display = (shop.style.display === 'none' || shop.style.display === '') ? 'block' : 'none';
});

document.getElementById('element').addEventListener('click', onclicked);

// Intervals
intervalId = setInterval(Aps, delay); // Set initial interval
