function setCookie(name, value){
    document.cookie = `${name}=${encodeURIComponent(value)}; max-age: ${3600*1000}`;
    console.log(document.cookie);
}

function getCookie(name){
    if(document.cookie){
        const pairs = document.cookie.split(";");
        const cookie = pairs.find(p=>p.startsWith(name+"="))
        return cookie.substring(name.length+1);
    }
    return "false";
    
}

let modal = document.querySelector(".modal")
let closeButton = document.querySelector(".modal__close")
if(getCookie("isClosed") === "false"){
    modal.classList.add("modal_active")
}
else{
    modal.classList.remove("modal_active")
}
modal.addEventListener("click", (e)=>{
    if(e.target && e.target.closest(".modal__close")){;
       setCookie("isClosed", true);
       modal.classList.remove("modal_active");
    }
})
