let cookie = document.getElementById("cookie");
let cookie_counter = document.getElementById("clicker__counter");
let speed_counter = document.getElementById("speed__counter");
let oldDate = new Date();
cookie.onclick = function(){
    cookie_counter.textContent++;
    if(cookie_counter.textContent%2 === 1){
        cookie.width = 300;
    }
    else{
        cookie.width = 200;
    }
    let newDate = new Date();
    time = (newDate - oldDate)/1000;
    speed_counter.textContent = (cookie_counter.textContent/(time)).toFixed(2);
};