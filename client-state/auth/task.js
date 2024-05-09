const authButton = document.getElementById("signin__btn");
const logoutButton = document.getElementById("logout");
const modalWelcome = document.getElementById("welcome");
const userId = document.getElementById("user_id");
const signInModal = document.getElementById("signin");
const signInForm = document.getElementById("signin__form")

if(localStorage.user_id){
    modalWelcome.classList.add("welcome_active");
    signInModal.classList.remove("signin_active");
    userId.innerText = localStorage.user_id;
}
authButton.addEventListener("click", (e)=>{
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    let formData = new FormData(signInForm);
    signInForm.reset();
    xhr.responseType = "json";
    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/auth", true);
    xhr.send(formData);
    xhr.addEventListener("load", ()=>{
        if(xhr.response && xhr.response.success){
            localStorage.setItem("user_id", xhr.response.user_id);
            modalWelcome.classList.add("welcome_active");
            signInModal.classList.remove("signin_active");
            userId.innerText = xhr.response.user_id;
        }
    });
    
})
logoutButton.addEventListener("click",() => {
    localStorage.removeItem("user_id");
    modalWelcome.classList.remove("welcome_active");
    signInModal.classList.add("signin_active");
    userId.innerText = "";
})