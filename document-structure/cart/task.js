let incs = document.querySelectorAll(".product__quantity-control_inc");
let decs = document.querySelectorAll(".product__quantity-control_dec");
let values = document.querySelectorAll(".product__quantity-value");
let adds =  document.querySelectorAll(".product__add");
let productsImages = document.querySelectorAll(".product img");
let cart = document.querySelector(".cart__products");
let cartProducts = document.getElementsByClassName("cart__product");
let myStorage1 = this.localStorage;


for(let i=0; i<incs.length; i++){
    incs[i].addEventListener("click", () => {
        values[i].textContent++;
    })
    decs[i].addEventListener("click", () => {
        if(values[i].innerText === "1"){
            return;
        }
        values[i].textContent--;
    })
}
for(let i=0; i<adds.length; i++){
    adds[i].addEventListener("click", (e) => {
        if(Array.from(cartProducts).length !== 0){
            for(let j=0; j<Array.from(cartProducts).length; j++){
                if(productsImages[i].closest(".product").dataset.id === Array.from(cartProducts)[j].dataset.id){
                    Array.from(cartProducts)[j].querySelector(".cart__product-count").textContent = Number(Array.from(cartProducts)[j].querySelector(".cart__product-count").textContent) + Number(values[i].innerText);
                    let anim = document.createElement("img");
                    productsImages[i].closest(".product").insertBefore(anim, productsImages[i]);
                    productsImages[i].closest(".product").firstElementChild.nextElementSibling.outerHTML = productsImages[i].outerHTML;
                    anim = productsImages[i].closest(".product").firstElementChild.nextElementSibling;
                    anim.style.position = "absolute";
                    let top = anim.getBoundingClientRect().top;
                    let left = anim.getBoundingClientRect().left;
                    anim.style.top = `${top}px`;
                    anim.style.left = `${left}px`;
                    let intervalId = setInterval(() => {
                        top = top - 10;
                        left = left + 10;
                        anim.style.top = `${top}px`;
                        anim.style.left = `${left}px`;
                        if(top < Array.from(cartProducts)[j].getBoundingClientRect().top){
                            clearInterval(intervalId);
                            anim.remove()
                        }
                    });
                    myStorage1.setItem( `products`, document.querySelector(".cart__products").outerHTML);
                    return;
                }
            }
        }
        document.querySelector(".cart__products").insertAdjacentHTML("afterBegin", `
        <div class="cart__product" data-id="${i+1}">
        <img class="cart__product-image" src="${productsImages[i].src}" alt="">
        <div class="cart__product-count">${values[i].innerText}</div>
        <div>
        <div class="product__quantity-control product__quantity-control_dec">
            -
        </div>
        
        <div class="product__quantity-control product__quantity-control_inc">
            +
        </div>
        </div></div>`);
        myStorage1.setItem( `products`, document.querySelector(".cart__products").outerHTML);
        document.querySelector(".cart").style.display = "block";
        values[i].innerText = 1;
        for(let k=0; k<Array.from(cartProducts).length; k++){
            Array.from(cartProducts)[k].querySelector(".product__quantity-control_dec").onclick = (e) => {
                for(let j=0; j<cartProducts.length; j++){
                    if(e.currentTarget.parentElement.closest(".cart__product").dataset.id === cartProducts[j].dataset.id){
                        let count = Array.from(cartProducts)[j].querySelector(".cart__product-count").innerText - 1;
                        if(count === 0){
                            Array.from(cartProducts)[j].remove();
                            myStorage1.setItem( `products`, document.querySelector(".cart__products").outerHTML);
                            if(Array.from(cartProducts).length === 0){
                                document.querySelector(".cart").style.display = "none";
                            }
                        }
                        else{
                            Array.from(cartProducts)[j].querySelector(".cart__product-count").textContent--;
                            myStorage1.setItem( `products`, document.querySelector(".cart__products").outerHTML);
                        }
                    }
                }
            };
            Array.from(cartProducts)[k].querySelector(".product__quantity-control_inc").onclick = () => {
                Array.from(cartProducts)[k].querySelector(".cart__product-count").textContent++;
                myStorage1.setItem( `products`, document.querySelector(".cart__products").outerHTML);
            };
        }
});
}

window.onload = () => {
    if(myStorage1.length){
        cart.outerHTML = myStorage1.getItem("products");
    }
    for(let i=0; i<Array.from(cartProducts).length; i++){
        Array.from(cartProducts)[i].querySelector(".product__quantity-control_dec").onclick = () => {
            let count = Array.from(cartProducts)[i].querySelector(".cart__product-count").textContent - 1;
            if(count === 0){
                Array.from(cartProducts)[i].remove();
                myStorage1.setItem( `products`, document.querySelector(".cart__products").outerHTML);
            }
            else{
                Array.from(cartProducts)[i].querySelector(".cart__product-count").textContent--;
                myStorage1.setItem( `products`, document.querySelector(".cart__products").outerHTML);
            }
        };
        Array.from(cartProducts)[i].querySelector(".product__quantity-control_inc").onclick = () => {
            Array.from(cartProducts)[i].querySelector(".cart__product-count").textContent++;
            myStorage1.setItem( `products`, document.querySelector(".cart__products").outerHTML);
        };
    }
    if(Array.from(cartProducts).length !== 0){
        document.querySelector(".cart").style.display = "block";
    }
    else{
        document.querySelector(".cart").style.display = "none";
    }
}
