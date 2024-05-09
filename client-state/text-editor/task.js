let textArea = document.getElementById("editor");
let buttonClear = document.getElementById("clear");

textArea.value = localStorage.getItem("text");
textArea.addEventListener("keyup", ()=>{
    localStorage.setItem("text", textArea.value);
});
buttonClear.addEventListener("click", ()=>{
    textArea.value = "";
    localStorage.removeItem("text");
})