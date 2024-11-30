//variables :
let money = 0;

//functions :
function onclicked() {
    money += 1;
    document.querySelector('.money').innerText = 'Money: ' + money;
}

//event listener :
document.getElementById('element').addEventListener('click', function(event) {
    const plusOneContainer = document.createElement('div');
    plusOneContainer.textContent = '+1';
    plusOneContainer.className = 'plusOne';
    document.body.appendChild(plusOneContainer);
    
    // Position the animation near the clicked area
    plusOneContainer.style.left = `${event.clientX}px`;
    plusOneContainer.style.top = `${event.clientY}px`;

    // Trigger the fade out animation
    setTimeout(() => {
        document.body.removeChild(plusOneContainer);
    }, 2000);
});


document.getElementById('element').addEventListener('click', onclicked);