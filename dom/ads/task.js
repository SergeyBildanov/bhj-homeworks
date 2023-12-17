function goToCase(n){
    rotatorCases[n % rotatorCases.length].classList.toggle("rotator__case_active");
    currentCase.classList.remove("rotator__case_active");
    currentCase = rotatorCases[n % rotatorCases.length];
    currentCase.style.color = currentCase.dataset.color;
}
function nextCase(){
    i++;
    goToCase(i);
}
function timeCase(){
    nextCase();
    interval = currentCase.dataset.speed;
    clearInterval(caseInterval);
    caseInterval = setInterval(timeCase, interval);
    console.log(interval);
}

let rotatorCases = document.querySelectorAll(".rotator__case");
let currentCase = document.querySelector(".rotator__case_active");
let interval = currentCase.dataset.speed;

let i = 0;
let caseInterval = setInterval(timeCase, interval);