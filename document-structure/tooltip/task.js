let tips = document.querySelectorAll(".has-tooltip");
let positions = ["top", "left", "bottom", "right"];

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
        Array.from(tip_texts)[i].style = `${Array.from(tip_texts)[i].dataset.position}:0`;
        if(Array.from(document.getElementsByClassName("tooltip_active")).length > 1){
            current.classList.remove("tooltip_active");
        }
        current =  Array.from(tip_texts)[i];
        e.preventDefault();
    })
}
