let tabs = document.querySelectorAll(".tab");
let contents = document.querySelectorAll(".tab__content");
let current = document.querySelector(".tab_active");
let currentContent = document.querySelector(".tab__content_active");

for(let i=0; i<tabs.length; i++){
    tabs[i].addEventListener("click", () => {
        if(current === tabs[i]){
            return;
        }
        tabs[i].classList.add("tab_active");
        contents[i].classList.add("tab__content_active")
        current.classList.remove("tab_active");
        current = tabs[i];
        currentContent.classList.remove("tab__content_active");
        currentContent = contents[i];  
    });
}