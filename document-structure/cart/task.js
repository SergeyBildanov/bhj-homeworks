let incs = document.querySelectorAll(".product__quantity-control_inc");
let decs = document.querySelectorAll(".product__quantity-control_dec");
let values = document.querySelectorAll(".product__quantity-value");
let adds =  document.querySelectorAll(".product__add");
let productsImages = document.querySelectorAll(".product img");
let cart = document.querySelector(".cart__products");
let cartProducts = document.getElementsByClassName("cart__product");
let myStorage1 = this.localStorage;
let productInner;


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
                    let targetTop = Array.from(cartProducts)[j].querySelector("img").getBoundingClientRect().top;
                    let targetHeight = Array.from(cartProducts)[j].querySelector("img").getBoundingClientRect().height;
                    let targetWidth = Array.from(cartProducts)[j].querySelector("img").getBoundingClientRect().width;
                    let targetLeft = Array.from(cartProducts)[j].querySelector("img").getBoundingClientRect().left;
                    anim.style.top = `${top}px`;
                    anim.style.left = `${left}px`;
                    let intervalId = setInterval(() => {
                        left = left + 10;
                        top = top - 10*(Array.from(cartProducts)[j].dataset.id)*((targetTop+targetHeight)/(targetLeft + targetWidth));
                        anim.style.top = `${top}px`;
                        anim.style.left = `${left}px`;
                        if(left > targetLeft){
                            clearInterval(intervalId);
                            anim.remove()
                        }
                    });
                    productInner = getProductInner(cartProducts);
                    myStorage1.setItem( `products`, JSON.stringify(productInner));
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
        productInner = getProductInner(cartProducts);
        myStorage1.setItem(`products`, JSON.stringify(productInner));
        document.querySelector(".cart").style.display = "block";
        values[i].innerText = 1;
        for(let k=0; k<Array.from(cartProducts).length; k++){
            Array.from(cartProducts)[k].querySelector(".product__quantity-control_dec").onclick = (e) => {
                let product = e.currentTarget.parentElement.closest(".cart__product");
                let count = product.querySelector(".cart__product-count").innerText - 1;
                if(count === 0){
                    product.remove();
                    if(Array.from(cartProducts).length === 0){
                        document.querySelector(".cart").style.display = "none";
                    }
                }
                else{
                    product.querySelector(".cart__product-count").textContent--;
                }
                productInner = getProductInner(cartProducts);
                myStorage1.setItem( `products`, JSON.stringify(productInner));
            };
            Array.from(cartProducts)[k].querySelector(".product__quantity-control_inc").onclick = () => {
                Array.from(cartProducts)[k].querySelector(".cart__product-count").textContent++;
                productInner = getProductInner(cartProducts);
                myStorage1.setItem( `products`, JSON.stringify(productInner));
            };
        }
});
}

window.onload = () => {
    if(myStorage1.length){
        let productsInners = JSON.parse(myStorage1.getItem("products"));
        let cart = document.querySelector(".cart");
        if(productsInners === ''){
            cart.innerHTML = cart.innerHTML;
            return;
        }
        let keys = Object.keys(productsInners);
        for(let i=0; i<keys.length; i++){
            document.querySelector(".cart__products").insertAdjacentHTML("afterBegin", `
            <div class="cart__product" data-id="${productsInners[keys[keys.length-i-1]].number}">
            <img class="cart__product-image" src="${productsInners[keys[keys.length-i-1]].src}" alt="">
            <div class="cart__product-count">${productsInners[keys[keys.length-i-1]].count}</div>
            <div>
            <div class="product__quantity-control product__quantity-control_dec">
            -
            </div>
            <div class="product__quantity-control product__quantity-control_inc">
            +
            </div>
            </div></div>`);
        }
    }
    for(let k=0; k<Array.from(cartProducts).length; k++){
        Array.from(cartProducts)[k].querySelector(".product__quantity-control_dec").onclick = (e) => {
            let product = e.currentTarget.parentElement.closest(".cart__product");
            let count = product.querySelector(".cart__product-count").innerText - 1;
            if(count === 0){
                product.remove();
                if(Array.from(cartProducts).length === 0){
                    document.querySelector(".cart").style.display = "none";
                }
            }
            else{
                product.querySelector(".cart__product-count").textContent--;
            }
            productInner = getProductInner(cartProducts);
            myStorage1.setItem( `products`, JSON.stringify(productInner));
        };
        Array.from(cartProducts)[k].querySelector(".product__quantity-control_inc").onclick = () => {
            Array.from(cartProducts)[k].querySelector(".cart__product-count").textContent++;
            productInner = getProductInner(cartProducts);
            myStorage1.setItem( `products`, JSON.stringify(productInner));
        };
    }
    if(Array.from(cartProducts).length !== 0){
        document.querySelector(".cart").style.display = "block";
    }
    else{
        document.querySelector(".cart").style.display = "none";
    }
}


function getProductInner(arr){
    debugger
    let result = [];
    let product;
    for(let i=0; i< arr.length; i++){
        product = {};
        product.src = arr[i].querySelector("img").src;
        product.count = arr[i].querySelector(".cart__product-count").textContent;
        product.number = arr[i].dataset.id;
        result.push(product);
    }
    return result;
}