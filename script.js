//variables :
let money = 0;
let gain = 1;
let gainpersecond = 0;
//functions :
function onclicked() {
    money += gain
    document.querySelector('.money').innerText = 'Money: ' + money;
}
function Aps(){
    money += gainpersecond;
    document.querySelector('.money').innerText = 'Money: '+ money;
}

// event listener :
document.getElementById('element').addEventListener('click', function(event) {
    const plusOneContainer = document.createElement('div');
    plusOneContainer.textContent = '+'+ gain;
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
    if (money >= cost){
        money -= cost;
        gainpersecond += 1;
        document.querySelector('.money').innerText = 'Money: '+ money;
        document.querySelector('.aps').innerText = 'APS: '+ gainpersecond;
    }
    else {
        return
    }
});
document.getElementById('buyElement').addEventListener('click', event => {
    const cost = 25
    
    if (money >= cost) {
        gain += 1;
        money -= cost;
        
        cost
        document.querySelector('.money').innerText = 'Money: '+ money;
    } else {
        return
    }
});
document.getElementById('toggleShop').addEventListener('click', function() {
    const shop = document.querySelector('.shop');
    shop.style.display = (shop.style.display === 'none' || shop.style.display === '') ? 'block' : 'none';
});
document.getElementById('element').addEventListener('click', onclicked);
//inetverals
setInterval(Aps,1000);