let input = document.getElementById("task__input");
let toDo = document.getElementById("tasks__list");
let form = document.getElementById("tasks__form");
let myStorage = window.localStorage;

form.addEventListener("submit", (e) => {
    let listElem = document.createElement("div");
    let listText = document.createElement("div");
    let del = document.createElement("a");
    listElem.classList.add("task");
    listText.classList.add("task__title");
    listText.innerText = input.value;
    del.innerHTML = "&times;";
    del.classList.add("task__remove");
    del.href = "#";
    listElem.appendChild(listText);
    listElem.appendChild(del);
    toDo.appendChild(listElem);
    myStorage.setItem( `task${toDo.children.length}`, listElem.outerHTML);
    e.preventDefault();
    form.reset();
});

let removes, tasks;

setInterval(()=>{
    removes = Array.from(document.getElementsByClassName("task__remove"));
    tasks =  Array.from(document.getElementsByClassName("task"));
    for(let i=0; i<removes.length; i++){
        removes[i].onclick = (e) => {
            tasks[i].remove();
            let key1 = Object.keys(myStorage).find(key => myStorage[key] === tasks[i].outerHTML);
            myStorage.removeItem(key1);
            e.preventDefault();
        };
    }
},1000);

window.onload = () => {
    let keys = Object.keys(myStorage);
    if(keys.length){
    for(let key of keys) {
        let element = document.createElement('div');
        toDo.appendChild(element);
        toDo.lastElementChild.outerHTML = myStorage.getItem(key);
    }
}
}

