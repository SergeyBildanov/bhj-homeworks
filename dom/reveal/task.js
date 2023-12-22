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

document.addEventListener("scroll", () => {
    for(let i=0; i< reveals.length; i++){
        if(isVisible(reveals[i])){
            reveals[i].classList.add("reveal_active");
        }
        else{
            reveals[i].classList.remove("reveal_active");
        }
    }
});