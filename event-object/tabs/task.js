let tabs = document.querySelectorAll(".tab");
let contents = document.querySelectorAll(".tab__content");
let currentContent = document.querySelector(".tab__content_active");

for(let i=0; i<tabs.length; i++){
    tabs[i].addEventListener("click", () => {
        if(currentContent === contents[i]){
            return;
        }
        contents[i].classList.toggle("tab__content_active");
        currentContent.classList.remove("tab__content_active");
        currentContent = contents[i];
    });
}