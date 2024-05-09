function setCookie(name, value, expires){
    document.cookie = `${name}=${encodeURIComponent(value)}; ${(expires==null) ? "" : ";Expires=" + expires.toGMTString()}`;
    console.log(document.cookie);
}

function getCookie(name){
    const pairs = document.cookie.split(";");
    const cookie = pairs.find(p=>p.startsWith(name+"="))
    return cookie.substring(name.length+1);
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
    if(e.target && e.target.closest(".modal__close")){
       let date = new Date();
       date.setHours(date.getHours()+1);
       setCookie("isClosed", true, date);
       modal.classList.remove("modal_active");
    }
})
