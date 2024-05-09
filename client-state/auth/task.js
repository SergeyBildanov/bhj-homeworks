const authButton = document.getElementById("signin__btn");
const logoutButton = document.getElementById("logout");

if(localStorage.user_id){
    document.getElementById("welcome").classList.add("welcome_active");
    document.getElementById("signin").classList.remove("signin_active");
    document.getElementById("user_id").innerText = localStorage.user_id;
}
authButton.addEventListener("click", (e)=>{
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    let formData = new FormData(document.getElementById("signin__form"));
    xhr.responseType = "json";
    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/auth", true);
    xhr.send(formData);
    xhr.addEventListener("load", ()=>{
        if(xhr.status == "201" && xhr.readyState == 4){
            localStorage.setItem("user_id", xhr.response.user_id);
            document.getElementById("welcome").classList.add("welcome_active");
            document.getElementById("signin").classList.remove("signin_active");
            document.getElementById("user_id").innerText = xhr.response.user_id;
        }
        else{
            alert("Неверный логин/пароль!");
        }
    })
})
logoutButton.addEventListener("click",() => {
    delete localStorage.user_id;
    document.getElementById("welcome").classList.remove("welcome_active");
    document.getElementById("signin").classList.add("signin_active");
    document.getElementById("user_id").innerText = "";
})