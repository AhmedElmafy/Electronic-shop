let two_description = document.querySelector("#description1");
let title = document.querySelector("#title");
let First_description = document.querySelector("#First-description");
let mainimg1 = document.querySelectorAll("#mainimg");

// console.log(mainimg1)

// في الصفحة الأخرى - display-product.html
const savedProductJSON = localStorage.getItem('selectedProduct');
const savedProduct = JSON.parse(savedProductJSON);

two_description.innerHTML = savedProduct['two description'];
title.innerHTML += savedProduct.title;
First_description.innerHTML = savedProduct['First description'];
// قم بتحديث src لكل عنصر
mainimg1.forEach(img => {
    img.src = savedProduct.url;
});



let cart = [];

// تحقق إذا كان هناك بيانات مخزنة في التخزين المحلي وقم باسترجاعها إذا كانت موجودة
const savedCart = localStorage.getItem('cart');
if (savedCart) {
    cart = JSON.parse(savedCart); // تحويل سلسلة JSON إلى كائن JavaScript
}

let addToCart = document.querySelector("#prodetails .sinhle-pro-datails button");
addToCart.onclick = function(e){
    let Pieces = document.querySelector("#prodetails .sinhle-pro-datails input");
        let size = document.querySelector("#prodetails .sinhle-pro-datails select");
        let selectedOptionIndex = size.selectedIndex;

        if(selectedOptionIndex === 0){
            const no = document.getElementById("no");
            const h4 = document.querySelector("#no h4").textContent = "Please select the size";
            no.style.top = 0;
            yes.style.top = "-300px";
            setTimeout(function () { no.style.top = "-300px"; }, 5000);
        }else{
            let newProduct = Object.assign({}, savedProduct); // إنشاء نسخة جديدة من savedProduct
            newProduct.numberOfPieces = Pieces.value;
            newProduct.size = selectedOptionIndex;
            // console.log(newProduct)
            cart.push(newProduct)
            localStorage.setItem('cart', JSON.stringify(cart));
            const no = document.getElementById("yes");
            const h4 = document.querySelector("#yes h4").textContent = "Product added successfully";
            no.style.top = "-300px";
            yes.style.top = 0;
            setTimeout(function () { no.style.top = "-300px"; }, 5000);

                let num_order = document.querySelectorAll("#num-order");
                const savedCartJSON = localStorage.getItem('cart');
                const savedToCart = JSON.parse(savedCartJSON);

              num_order.forEach(e => {
                  if (savedToCart && Array.isArray(savedToCart)) {
                      e.textContent = savedToCart.length;
                   } else {
                     e.textContent = 0; // في حالة عدم وجود عناصر أو savedProduct ليس مصفوفة
                    }
                })
    }
}
