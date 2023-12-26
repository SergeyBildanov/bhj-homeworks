let input = document.getElementById("task__input");
let form = document.getElementById("tasks__form");
let myStorage = window.localStorage;
let removes = document.querySelectorAll(".task__remove");
let tasks = document.querySelectorAll(".task");

if(myStorage.length){
    document.getElementById("tasks__list").outerHTML = myStorage['tasks'];
    removes = document.querySelectorAll(".task__remove");
    tasks = document.querySelectorAll(".task");
    for(let i=0; i<Array.from(removes).length; i++){
        Array.from(removes)[i].onclick = (e) => {
            Array.from(tasks)[i].remove();
            myStorage.setItem("tasks", document.getElementById("tasks__list").outerHTML);
            e.preventDefault();
        }
    }
}


form.addEventListener("submit", (e) => {
    if(input.value.trim() === ""){
        e.preventDefault();
        form.reset();
        return;
    }
    document.getElementById("tasks__list").insertAdjacentHTML('afterBegin', `
    <div class="task">
    <div class="task__title">
    ${input.value}
    </div>
    <a href="#" class="task__remove">&times;</a>
    </div>
    `)
    myStorage.setItem("tasks", document.getElementById("tasks__list").outerHTML);
    removes = document.querySelectorAll(".task__remove");
    tasks = document.querySelectorAll(".task");
    e.preventDefault();
    form.reset();
    for(let i=0; i<Array.from(removes).length; i++){
        Array.from(removes)[i].onclick = (e) => {
            Array.from(tasks)[i].remove();
            myStorage.setItem("tasks", document.getElementById("tasks__list").outerHTML);
            e.preventDefault();
        }
    }
});



