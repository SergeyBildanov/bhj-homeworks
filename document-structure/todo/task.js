let input = document.getElementById("task__input");
let form = document.getElementById("tasks__form");
let removes = document.querySelectorAll(".task__remove");
let tasks = document.querySelectorAll(".task");
let inputs;

if(typeof localStorage["tasks"] !== "undefined"){
    let inputs = localStorage["tasks"].split(",");
    for(let i = 0; i<inputs.length; i++){
        document.getElementById("tasks__list").insertAdjacentHTML('beforeEnd', `
        <div class="task">
        <div class="task__title">
        ${inputs[i]}
        </div>
        <a href="#" class="task__remove">&times;</a>
        </div>
    `   )
    }
    removes = document.querySelectorAll(".task__remove");
    tasks = document.querySelectorAll(".task");
    for(let i=0; i<Array.from(removes).length; i++){
        Array.from(removes)[i].onclick = (e) => {
            Array.from(tasks)[i].remove();
            tasks = document.querySelectorAll(".task");
            inputs = getInputs(Array.from(tasks));
            localStorage.setItem("tasks", inputs);
            if(localStorage["tasks"] === "undefined"){
                localStorage.removeItem("tasks");
            }
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
    `);
    removes = document.querySelectorAll(".task__remove");
    tasks = document.querySelectorAll(".task");
    inputs = getInputs(Array.from(tasks));
    localStorage.setItem("tasks", inputs);
    e.preventDefault();
    form.reset();
    for(let i=0; i<Array.from(removes).length; i++){
        Array.from(removes)[i].onclick = (e) => {
            Array.from(tasks)[i].remove();
            tasks = document.querySelectorAll(".task");
            inputs = getInputs(Array.from(tasks));
            localStorage.setItem("tasks", inputs);
            if(localStorage["tasks"] === "undefined"){
                localStorage.removeItem("tasks");
            }
            e.preventDefault();
        }
    }
});

function getInputs(arr){
    let resultArr = [];
    if(arr.length){
        for(let i=0; i<arr.length; i++){
            resultArr.push(arr[i].querySelector(".task__title").textContent);
        }
        return Array.from(resultArr);
    }
    return;
}



