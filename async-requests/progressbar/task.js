const progress = document.getElementById( 'progress' );
let form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    let formData = new FormData(form);
    let xhr = new XMLHttpRequest();
    let url = "https://students.netoservices.ru/nestjs-backend/upload";
    xhr.open("POST", url);
    xhr.upload.addEventListener("progress", (e) => {
        progress.value = (e.loaded/e.total).toFixed(2);
    })
    xhr.send(formData);
    e.preventDefault();
})