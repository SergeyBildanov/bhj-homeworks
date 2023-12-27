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
let tip_texts = document.getElementsByClassName("tooltip");
for(let i=0; i<tips.length; i++){
    tips[i].addEventListener("click", e => {
        Array.from(tip_texts)[i].classList.toggle("tooltip_active");
        if(Array.from(tip_texts)[i].dataset.position === "bottom"){
            Array.from(tip_texts)[i].style = `left: ${e.currentTarget.getBoundingClientRect().left}px`
        }
        if(Array.from(tip_texts)[i].dataset.position === "top"){
            Array.from(tip_texts)[i].style = `left: ${e.currentTarget.getBoundingClientRect().left}px; top: ${e.currentTarget.getBoundingClientRect().top - 30}px;`
        }
        if(Array.from(tip_texts)[i].dataset.position === "left"){
            Array.from(tip_texts)[i].style = `left: ${e.currentTarget.getBoundingClientRect().left - tip_texts[i].getBoundingClientRect().width}px; top: ${e.currentTarget.getBoundingClientRect().top - 15}px;`
        }
        if(Array.from(tip_texts)[i].dataset.position === "right"){
            Array.from(tip_texts)[i].style = `left: ${e.currentTarget.getBoundingClientRect().left + e.currentTarget.getBoundingClientRect().width}px; top: ${e.currentTarget.getBoundingClientRect().top - 15}px;`
        }
        if(Array.from(document.getElementsByClassName("tooltip_active")).length > 1){
            current.classList.remove("tooltip_active");
        }
        current =  Array.from(tip_texts)[i];
        e.preventDefault();
    })
}
