function getHole(index){
    return document.getElementById(`hole${index}`);
}

let dead = document.getElementById("dead");
let lost = document.getElementById("lost");
for(let i=1; i<10; i++){
    getHole(i).onclick = function(){
        if(getHole(i).className.includes("hole_has-mole")){
            dead.textContent++;
        }
        else{
            lost.textContent++;
        }
        if(dead.textContent === "10"){
            alert("Победа!");
            dead.textContent = 0;
            lost.textContent = 0;
        }
        if(lost.textContent === "5"){
            alert("Вы проиграли!");
            dead.textContent = 0;
            lost.textContent = 0;
        }
    }
}