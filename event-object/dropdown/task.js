function linkHandler(event){
    let list = this.closest(".dropdown__list");
    let index = lists.indexOf(list);
    buttons[index].textContent = this.textContent;
    list.classList.remove("dropdown__list_active");
    return false;
}

let buttons = Array.from(document.querySelectorAll(".dropdown__value"));
let lists = Array.from(document.querySelectorAll(".dropdown__list"));

for(let j = 0; j < buttons.length; j++){
    buttons[j].onclick = () => {lists[j].classList.toggle("dropdown__list_active");};
}


let items = document.querySelectorAll(".dropdown__link")
for(let i = 0; i < items.length; i++){
    items[i].onclick = linkHandler;
}