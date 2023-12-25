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
                    let key1 = Object.keys(myStorage1).find(key => myStorage1[key] === cartProducts[j].outerHTML);
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
                    myStorage1[key1] = cartProducts[j].outerHTML;
                    return;
                }
            }
        }
        let image = document.createElement("img");
        image.className = "";
        image.classList.add("cart__product-image");
        image.src = productsImages[i].src;
        image.alt = "";
        let count = document.createElement("div");
        let controls = document.createElement("div");
        controls.innerHTML = productsImages[i].parentElement.querySelector(".product__quantity-controls").innerHTML;
        controls.querySelector(".product__quantity-value").remove();
        count.replaceWith(values[i]);
        count.className = "";
        count.classList.add("cart__product-count")
        count.innerText = values[i].innerText;
        let cartElem = document.createElement("div");
        cartElem.insertAdjacentElement("afterBegin", image);
        cartElem.insertAdjacentElement("beforeEnd", count);
        cartElem.insertAdjacentElement("beforeEnd", controls);
        cartElem.classList.add("cart__product");
        cartElem.dataset.id = productsImages[i].parentElement.dataset.id;
        cart.appendChild(cartElem);
        myStorage1.setItem( `product${cart.children.length}`, cartElem.outerHTML);
        values[i].innerText = 1;
});
}
setInterval(() => {
    for(let i=0; i<Array.from(cartProducts).length; i++){
        Array.from(cartProducts)[i].querySelector(".product__quantity-control_dec").onclick = () => {
            let count = Array.from(cartProducts)[i].querySelector(".cart__product-count").textContent - 1;
            if(count === 0){
                for(j=0; j<Object.keys(myStorage1).length; j++){
                    let isEqual  = myStorage1[Object.keys(myStorage1)[j]] === cartProducts[i].outerHTML;
                    if(isEqual){
                        myStorage1.removeItem(Object.keys(myStorage1)[j]);
                    }
                }
                Array.from(cartProducts)[i].remove();
            }
            else{
                for(j=0; j<Object.keys(myStorage1).length; j++){
                    let isEqual  = myStorage1[Object.keys(myStorage1)[j]] === cartProducts[i].outerHTML;
                    if(isEqual){
                        Array.from(cartProducts)[i].querySelector(".cart__product-count").textContent--;
                        myStorage1[Object.keys(myStorage1)[j]] = cartProducts[i].outerHTML;
                    }
                }
            }
        };
        Array.from(cartProducts)[i].querySelector(".product__quantity-control_inc").onclick = () => {
            for(j=0; j<Object.keys(myStorage1).length; j++){
                let isEqual  = myStorage1[Object.keys(myStorage1)[j]] === cartProducts[i].outerHTML;
                if(isEqual){
                    Array.from(cartProducts)[i].querySelector(".cart__product-count").textContent++;
                    myStorage1[Object.keys(myStorage1)[j]] = cartProducts[i].outerHTML;
                }
            }
        };

    }
    if(Array.from(cartProducts).length === 0){
        document.querySelector(".cart").style.display = "none";
    }
    else{
        document.querySelector(".cart").style.display = "block";  
    }
});
window.onload = () => {
    let keys = Object.keys(myStorage1);
    if(keys.length){
        for(let key of keys) {
            let element = document.createElement('div');
            cart.appendChild(element);
            cart.lastElementChild.outerHTML = myStorage1.getItem(key);
        }
    }
}

