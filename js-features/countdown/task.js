function setTime(hours, minutes, seconds){
    let time = new Date();
    time.setHours(hours);
    time.setMinutes(minutes);
    time.setSeconds(seconds);
    return time;
}
function getTime(time){
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    if(hours < 10){
        hours = `0${hours}`;
    }
    if(minutes < 10){
        minutes = `0${minutes}`; 
    }
    if(seconds < 10){
        seconds = `0${seconds}`; 
    }
    timer.textContent = `${hours}:${minutes}:${seconds}`;
}
function countDown(time){
    time.setSeconds(time.getSeconds()-1);
    if(time.getSeconds < 0){
        time.setMinutes(time.getMinutes()-1);
        if(time.getMinutes < 0){
            time.setHours(time.getHours()-1);
        }
    }
    return time;
}

const timer = document.getElementById("timer");

let time = setTime(0,0,5);
getTime(time);
const intervalID = setInterval(()=>{
    countDown(time);
    getTime(time);
    if(timer.textContent === "00:00:00"){
        document.getElementById("download").click();
        clearInterval(intervalID);
    }
}, 1000);
