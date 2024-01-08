let xhr = new XMLHttpRequest();
let url = "https://students.netoservices.ru/nestjs-backend/poll";
let pollTitle = document.getElementById("poll__title");
let pollAnswers = document.getElementById("poll__answers");
let poll = document.querySelector(".card");

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
                const answerXhr = new XMLHttpRequest();
                let send = `vote=${JSON.parse(xhr.responseText).id}&answer=${i}`;
                answerXhr.open( 'POST', 'https://students.netoservices.ru/nestjs-backend/poll' );
                answerXhr.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
                answerXhr.send(send);
                answerXhr.addEventListener("readystatechange", () => {
                    if(answerXhr.readyState === answerXhr.DONE){
                        let voteArray = JSON.parse(answerXhr.responseText).stat;
                        let sum = 0;
                        for(let j=0; j<voteArray.length; j++){
                            sum = sum + voteArray[j].votes;
                        }
                        for(let j=0; j<voteArray.length; j++){
                            let text = `<div>${voteArray[j].answer}: <strong>${((voteArray[j].votes * 100)/(sum)).toFixed(2)}%</strong></div>`;
                            poll.insertAdjacentHTML("beforeEnd", text);
                        }
                        pollAnswers.style.display = "none";
                    }
                })
            });
        }
    }
});

