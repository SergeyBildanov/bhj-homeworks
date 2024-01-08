let url = " https://students.netoservices.ru/nestjs-backend/slow-get-courses";
let valute;
let list = document.getElementById("items");

let storagedValute = restoreValute("valute");

if(storagedValute){
    let keys = Object.keys(storagedValute);
    for(let i=0; i< keys.length; i++){
        list.insertAdjacentHTML("beforeEnd",`
        <div class="item">
            <div class="item__code">
            ${storagedValute[keys[i]].CharCode}
            </div>
            <div class="item__value">
            ${storagedValute[keys[i]].Value}
            </div>
            <div class="item__currency">
            руб.
            </div>
        </div>`);
    }
    document.getElementById("loader").classList.remove("loader_active");
}
else{
    storagedValute = {};
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', () => {
    if(xhr.readyState === xhr.DONE){
        valute = JSON.parse(xhr.responseText).response.Valute;
        let forStorage;
        let keys = Object.keys(valute);
        for(let i=0; i< keys.length; i++){
            forStorage = {
                CharCode: valute[keys[i]].CharCode,
                Value : valute[keys[i]].Value,
            };
            storagedValute[keys[i]] = forStorage;
            list.insertAdjacentHTML("beforeEnd",`
            <div class="item">
                <div class="item__code">
                ${valute[keys[i]].CharCode}
                </div>
                <div class="item__value">
                ${valute[keys[i]].Value}
                </div>
                <div class="item__currency">
                руб.
                </div>
            </div>`);
        }
        localStorage.setItem("valute", JSON.stringify(storagedValute));
    }
    document.getElementById("loader").classList.remove("loader_active");
    });

    xhr.open("GET", url);
    xhr.send();
}

function restoreValute(key){
    try{
        return JSON.parse(localStorage.getItem(key));
    } catch{
        return null;
    }
}