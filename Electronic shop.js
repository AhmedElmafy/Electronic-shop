const yes = document.getElementById("yes");
const no = document.getElementById("no");
const the_yes = document.getElementById("the-yes");
const the_no = document.getElementById("the-no");
const email = document.getElementById("email");
const but = document.getElementById("but");
const navbar = document.getElementById("navbar");
const bar = document.getElementById("bar");
const closed = document.getElementById("close");
let offCart = document.querySelector("#mobile a");
let pro = document.querySelectorAll(".pro");
const readMoreBtn = document.querySelectorAll("#read-more-btn");
const readMoreContainer = document.querySelectorAll(".read-more");

// cart
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

// #####################
// #####################
// ##### newsletter #####
// #####################
// #####################

but.onclick = function () {
  // let lowerCaseEmail = email.value.toLowerCase();
  if (email.value.match(/@gmail.com/ig) && email.value.endsWith("@gmail.com")) {
    yes.style.top = 0;
    no.style.top = "-300px";
    email.value = "";
    setTimeout(function () { yes.style.top = "-300px"; }, 5000);
  } else if (email.value === "") {
    return;
  } else {
    no.style.top = 0;
    yes.style.top = "-300px";
    setTimeout(function () { no.style.top = "-300px"; }, 5000);
  }
};

the_yes.onclick = function () {
yes.style.top = "-300px";
};

the_no.onclick = function () {
no.style.top = "-300px";
};

bar.onclick = function () {
  navbar.style.right = "0";
  offCart.style.opacity = "0";
};

closed.onclick = function () {
  offCart.style.opacity = "1";
  navbar.style.right = "-800px";
};

// #####################
// #####################
// ##### Single Product #####
// #####################
// #####################

let mainimg = document.getElementById("mainimg");
let smailImg = document.querySelectorAll(".smail-img");

smailImg.forEach(function (img) {
  img.addEventListener("click", function () {
    mainimg.src = img.src;
  });
});

// #####################
// #####################
// ##### Product #####
// #####################
// #####################

let products; // قم بتعريف المتغير في نطاق أعلى

const xhr = new XMLHttpRequest();
xhr.open("GET", "product.json");

xhr.onload = function () {
  if (this.status === 200) {
    products = JSON.parse(xhr.responseText);
    // console.log(products);
  } else {
    console.error("حدث خطأ أثناء تحميل الملف:", xhr.statusText);
  }
};

xhr.send();

// عرض المنتج في الصفحه
// إضافة حدث النقر لكل عنصر من العناصر
pro.forEach(function (div) {
  div.addEventListener("click", function () {
    console.log(this); // هنا سيتم طباعة العنصر الذي تم النقر عليه
    for (let i = 0; i < products.length; i++) {
      if (this.dataset.name === products[i].name) {
        let showBroducte = products[i];
        // console.log(showBroducte);
        localStorage.setItem("selectedProduct", JSON.stringify(showBroducte));
        window.location.href = "singl product.html";
      }
    }
  });
});

/* #####################
#####################
##### Shop blog #####
#####################
##################### */
readMoreBtn.forEach(function(btn, index){
  btn.addEventListener("click", function() {
    readMoreContainer[index].classList.toggle("expanded");
    if (readMoreContainer[index].classList.contains("expanded")) {
      btn.textContent = "Read less";
    }else{
      btn.textContent = "continue reading";
    }
  })
})


// copyright
let year = new Date().getFullYear();
document.getElementById(
  "copyright"
).innerHTML = `© ${year}, tech - html css js ecommerce template`;
