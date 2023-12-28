let tips = document.querySelectorAll(".has-tooltip");
let positions = ["bottom", "top", "left", "right"];

document.addEventListener("DOMContentLoaded", () => {
    for(let i=0; i<tips.length; i++){
        let tip = document.createElement("div");
        tip.classList.add("tooltip");
        tip.innerText = tips[i].title;
        tip.dataset.position = positions[i % positions.length];
        tips[i].insertAdjacentHTML("afterEnd", tip.outerHTML);
    }
});
let current;
let tipTexts = document.getElementsByClassName("tooltip");
for(let i=0; i<tips.length; i++){
    tips[i].addEventListener("click", e => {
        Array.from(tipTexts)[i].classList.toggle("tooltip_active");
        let position = Array.from(tipTexts)[i].dataset.position;
        if(position === "bottom"){
            Array.from(tipTexts)[i].style = `left: ${e.currentTarget.getBoundingClientRect().left}px`
        }
        if(position === "top"){
            Array.from(tipTexts)[i].style = `left: ${e.currentTarget.getBoundingClientRect().left}px; top: ${e.currentTarget.getBoundingClientRect().top - Array.from(tipTexts)[i].getBoundingClientRect().height}px;`
        }
        if(position === "left"){
            Array.from(tipTexts)[i].style = `left: ${e.currentTarget.getBoundingClientRect().left - Array.from(tipTexts)[i].getBoundingClientRect().width}px; top: ${e.currentTarget.getBoundingClientRect().top - Array.from(tipTexts)[i].getBoundingClientRect().height / 2}px;`
        }
        if(position === "right"){
            Array.from(tipTexts)[i].style = `left: ${e.currentTarget.getBoundingClientRect().left + e.currentTarget.getBoundingClientRect().width}px; top: ${e.currentTarget.getBoundingClientRect().top - 15}px;`
        }
        if(Array.from(document.getElementsByClassName("tooltip_active")).length > 1){
            current.classList.remove("tooltip_active");
        }
        current =  Array.from(tipTexts)[i];
        e.preventDefault();
    })
}
