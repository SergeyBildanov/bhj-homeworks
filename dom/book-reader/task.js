let book = document.getElementById("book");

let fonts = document.querySelectorAll(".book__control_font-size a");
let colors = document.querySelectorAll(".book__control_color a");
let backgrounds =  document.querySelectorAll(".book__control_background a");
let currentFont = document.querySelector(".font-size_active");
let currentColor = document.querySelector(".book__control_color .color_active");
let currentBackground = document.querySelector(".book__control_background .color_active");


for(let i=0; i<fonts.length; i++){
    fonts[i].addEventListener("click", (event) => {
        book.classList.remove("book_fs-big");
        book.classList.remove("book_fs-small");
        currentFont.classList.remove("font-size_active");
        currentFont = fonts[i];
        currentFont.classList.add("font-size_active");
        if(currentFont.dataset){
            book.classList.add(`book_fs-${currentFont.dataset.size}`);
        }
        event.preventDefault();
    });
}

for(let j=0; j < colors.length; j++){
    colors[j].addEventListener("click", (event) => {
        book.classList.remove("book_color-black");
        book.classList.remove("book_color-gray");
        book.classList.remove("book_color-whitesmoke");
        currentColor.classList.remove("color_active");
        currentColor = colors[j];
        currentColor.classList.add("color_active");
        if(currentColor.dataset){
            book.classList.add(`book_color-${currentColor.dataset.textColor}`);
        }
        event.preventDefault();
    });
}

for(let k=0; k < backgrounds.length; k++){
    backgrounds[k].addEventListener("click", (event) => {
        book.classList.remove("book_bg-gray");
        book.classList.remove("book_bg-black");
        book.classList.remove("book_bg-white");
        currentBackground.classList.remove("color_active");
        currentBackground = backgrounds[k];
        currentBackground.classList.add("color_active");
        if(currentColor.dataset){
            book.classList.add(`book_bg-${currentBackground.dataset.bgColor}`);
        }
        event.preventDefault();
    });
}