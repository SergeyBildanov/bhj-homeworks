let reveals = document.querySelectorAll(".reveal");

function isVisible(el){
    const {top, bottom} = el.getBoundingClientRect();

    if(bottom < 0){
        return false;
    }

    if(top > window.innerHeight){
        return false;
    }
    return true;
}

setInterval(() => {
    for(let i=0; i< reveals.length; i++){
        if(isVisible(reveals[i])){
            reveals[i].classList.toggle("reveal_active");
        }
    }
}, 1000)