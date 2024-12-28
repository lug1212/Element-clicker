// Variables
let money = 0;
let gain = 1;
let gainpersecond = 0;
let delay = 1000;
let intervalId; // Store the interval ID
let g = 1;
const clicksound = document.getElementById('click-sound');

// Cookie functions
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=None; Secure";
}


function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function saveGame() {
    setCookie('money', money.toString(), 7); // Save as string
    setCookie('gainpersecond', gainpersecond.toString(), 7); // Save as string
    console.log("Game saved! Money:", money, "GainPerSecond:", gainpersecond);
}



function loadGame() {
    const savedMoney = getCookie('money');
    const savedGainPerSecond = getCookie('gainpersecond');

    // Check and parse cookie values
    if (savedMoney !== null && !isNaN(savedMoney)) {
        money = parseInt(savedMoney);
    } else {
        money = 0; // Default value if not available or invalid
    }

    if (savedGainPerSecond !== null && !isNaN(savedGainPerSecond)) {
        gainpersecond = parseInt(savedGainPerSecond);
    } else {
        gainpersecond = 0; // Default value if not available or invalid
    }

    document.querySelector('.money').innerText = 'Quarks: \n' + money;
    document.querySelector('.aps').innerText = 'Persecond \n' + gainpersecond;
}



// Erase a cookie
function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

// Load game data on startup
loadGame();

// Call saveGame function periodically
setInterval(saveGame, 10000); // Save every 10 seconds

function playclick() {
    clicksound.currentTime = 0;
    clicksound.play();
    console.log("Quark clicked!");
}

function onclicked() {
    playclick();
    money += gain;
    document.querySelector('.money').innerText = 'Quarks: \n' + money;
    console.log("Money after click:", money);
    saveGame();
}

function Aps() {
    money += gainpersecond;
    document.querySelector('.money').innerText = 'Quarks: \n' + money;
    console.log("Money per second:", money);
}


function admin() {
    const adminpass = 'no';
    const password = prompt('Enter the password: ');
    if (password === adminpass) {
        money += 99999;
        gain += 100;
        saveGame();
    }
}

// Event listeners
document.getElementById('element').addEventListener('click', onclicked)
document.querySelector('.admin').addEventListener('click', admin);

document.getElementById('upgrade1').addEventListener('click', function (e) {
    const cost = 500;
    if (money >= cost) {
        gain += 5;
        money -= cost;
        document.getElementById('upgrade1').style.display = 'none';
        saveGame();
    }
});

document.getElementById('upgrade2').addEventListener('click', function (e) {
    const cost = 1500;
    if (money >= cost) {
        g = g * 2;
        gainpersecond += g;
        money -= cost;
        document.getElementById('upgrade2').style.display = 'none';
        document.querySelector('.money').innerText = 'Quarks: \n' + money;
        document.querySelector('.aps').innerText = 'Persecond \n' + gainpersecond;
        saveGame();
    }
});

document.getElementById('upgrade3').addEventListener('click', event => {
    let cost = 10000;
    if (money >= cost) {
        money -= cost;
        gain *= 2;
        document.getElementById('upgrade3').style.display = 'none';
        document.querySelector('.money').innerText = 'Quarks: \n' + money;
        document.getElementById('Elementimg').src = 'images/Helium.svg';
        saveGame();
    }
});

document.getElementById('element').addEventListener('click', function (event) {
    const plusOneContainer = document.createElement('div');
    const quark1 = document.createElement('img'); //first quark effect
    quark1.src = 'images/Quarkup.svg';
    quark1.className = 'quarkup1';
    const quark2 = document.createElement('img'); //first quark effect
    quark2.src = 'images/Quarkup2.svg';
    quark2.className = 'quarkup2';
    plusOneContainer.textContent = '+' + gain;
    plusOneContainer.className = 'plusOne';
    document.body.appendChild(plusOneContainer);
    document.body.appendChild(quark1);

    // Adjust position to account for scrolling
    const scrollOffsetX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollOffsetY = window.pageYOffset || document.documentElement.scrollTop;

    quark1.style.left = `${event.clientX + scrollOffsetX}px`;
    quark1.style.top = `${event.clientY + scrollOffsetY}px`;

    plusOneContainer.style.left = `${event.clientX + scrollOffsetX}px`;
    plusOneContainer.style.top = `${event.clientY + scrollOffsetY}px`;

    // Randomly move left or right and up
    const randomDirectionX = (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 100);
    const randomDirectionY = -25; // Move up by 50px
    quark1.style.transform = `translate(${randomDirectionX}px, ${randomDirectionY}px)`;
    quark1.style.transition = `transform 0.5s ease-in-out, opacity 2s ease-out`;

    // Move down and fade out after a delay
    setTimeout(() => {
        const randomDirectionY2 = 100; // Move down by 100px
        const randomDirectionX2 = Math.random() < 0.5 ? -1 : 1;
        quark1.style.transform = `translate(${randomDirectionX2}px, ${randomDirectionY2}px)`;
        quark1.style.opacity = '0';
    }, 500); // Adjust the delay as needed

    // Remove elements after animation
    setTimeout(() => {
        document.body.removeChild(plusOneContainer);
        document.body.removeChild(quark1); // Remove the quark1 element after animation
    }, 2500); // Adjust the duration to match your animation
    saveGame();
});


// Shop items
document.getElementById('ejminer').addEventListener('click', function (event) {
    let button = event.target;
    let cost = parseFloat(button.getAttribute('data-cost')) || 250; // Initial cost if not set
    if (money >= cost) {
        money -= cost;
        gainpersecond += 5;
        cost = cost + (cost * 0.10); // Increase cost by 10%
        cost = Math.round(cost); // Round to the nearest whole number
        button.setAttribute('data-cost', cost); // Store the new cost
        button.innerText = 'QuartExtractor \n' + cost; // Update button text
        document.querySelector('.money').innerText = 'Quarks: \n' + money;
        document.querySelector('.aps').innerText = 'Persecond \n' + gainpersecond;
        saveGame();
    }
});

document.getElementById('buyElement').addEventListener('click', event => {
    let button = event.target;
    let cost = parseFloat(button.getAttribute('data-cost')) || 50; // Initial cost if not set
    if (money >= cost) {
        gainpersecond += g;
        money -= cost;
        cost += cost * 0.15; // Update the cost
        cost = Math.round(cost); // Round to the nearest whole number
        button.setAttribute('data-cost', cost); // Store the new cost
        button.innerText = 'Tinybot \n' + cost; // Update button text
        document.querySelector('.money').innerText = 'Quarks: \n' + money;
        document.querySelector('.aps').innerText = 'Persecond \n' + gainpersecond;
        saveGame();
    }
});

document.getElementById('Bbot').addEventListener('click', event => {
    let button = event.target;
    let cost = parseFloat(button.getAttribute('data-cost')) || 1000; // Initial cost if not set
    if (money >= cost) {
        money -= cost;
        gainpersecond += 25;
        cost += cost * 0.20; // Increase cost by 20%
        cost = Math.round(cost); // Round to the nearest whole number
        button.setAttribute('data-cost', cost); // Store the new cost
        button.innerText = 'Bigbot \n' + cost; // Update button text
        document.querySelector('.money').innerText = 'Quarks: \n' + money;
        document.querySelector('.aps').innerText = 'Persecond \n' + gainpersecond;
        saveGame();
    }});
