let xhr = new XMLHttpRequest();
let url = "https://students.netoservices.ru/nestjs-backend/poll";
let pollTitle = document.getElementById("poll__title");
let pollAnswers = document.getElementById("poll__answers");

xhr.open("GET", url);
xhr.send();

xhr.addEventListener('readystatechange', () => {
    if(xhr.readyState === xhr.DONE){
        pollTitle.textContent = JSON.parse(xhr.responseText).data["title"];
        let answerList =  JSON.parse(xhr.responseText).data["answers"];
        for(let i = 0; i < answerList.length; i++){
            pollAnswers.insertAdjacentHTML("beforeend", `
            <button class="poll__answer">
                ${answerList[i]}
            </button>`)
        }
        //console.log(JSON.parse(xhr.responseText));
        //console.log(answerList);
        let buttons = document.getElementsByClassName("poll__answer");
        for(let i=0; i < Array.from(buttons).length; i++){
            Array.from(buttons)[i].addEventListener("click", () => {
                alert("Спасибо, ваш голос засчитан!");
                return;
            });
        }
    }
});

