let textArea = document.getElementById("editor");
let buttonClear = document.getElementById("clear");

if(localStorage.text){
    textArea.value = localStorage.text
}
textArea.addEventListener("keyup", ()=>{
    localStorage.setItem("text", textArea.value);
});
buttonClear.addEventListener("click", ()=>{
    textArea.value = "";
    localStorage.setItem("text", textArea.value);
})