const navbar = document.getElementById("navbar");
const bar = document.getElementById("bar");
const closed = document.getElementById("close");
let offCart = document.querySelector("#mobile a");
let num_order = document.querySelectorAll("#num-order");
let tbody_table = document.getElementById("tbody-table");


bar.onclick = function () {
    navbar.style.right = "0";
    offCart.style.opacity = "0";
  };
  
  closed.onclick = function () {
    offCart.style.opacity = "1";
    navbar.style.right = "-800px";
  };

const savedProductJSON = localStorage.getItem('cart');
const savedProduct = JSON.parse(savedProductJSON);

// console.log(savedProduct)

num_order.forEach(e => {
    if (savedProduct && Array.isArray(savedProduct)) {
        e.textContent = savedProduct.length;
    } else {
        e.textContent = 0; // في حالة عدم وجود عناصر أو savedProduct ليس مصفوفة
    }
})

if (savedProduct && Array.isArray(savedProduct)) {
for (let i = 0; i < savedProduct.length; i++) {
    // console.log(savedProduct[i]);
    let tr = document.createElement("tr");
    tr.innerHTML = `<td><a class="remove"><i class="fa-solid fa-circle-xmark"></i></a></td>
    <td><img src="${savedProduct[i].url}" alt=""></td>
    <td>${savedProduct[i]["First description"]}</td>
    <td>60$</td>
    <td><input type="number" name="" id="" value="${savedProduct[i].numberOfPieces}" min="1"></td>
    <td>
    <select name="" id="">
        <option value="xl" ${savedProduct[i].size === 1 ? 'selected' : ''}>xl</option>
        <option value="xxl" ${savedProduct[i].size === 2 ? 'selected' : ''}>xxl</option>
        <option value="small" ${savedProduct[i].size === 3 ? 'selected' : ''}>small</option>
        <option value="large" ${savedProduct[i].size === 4 ? 'selected' : ''}>large</option>
    </select> 
    </td>
    <td class="is-total">$${savedProduct[i].numberOfPieces * 60}</td>`;
    tbody_table.appendChild(tr);
}
let removeButtons = document.querySelectorAll(".remove");
removeButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        let parentRow = e.target.closest("tr"); // الحصول على الصف الذي يحتوي على الزر "Remove"
        let index = Array.from(tbody_table.children).indexOf(parentRow);
        if (index !== -1 && index <= savedProduct.length) {
            savedProduct.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(savedProduct));
        }
        parentRow.remove()
        // console.log(parentRow);
        let totalPrices = calculateTotalPrices();
        console.log(`Total prices: $${totalPrices}`);

        let total = document.querySelectorAll(".total");
        total.forEach(e => {
        e.innerHTML = `$${totalPrices}`;
    });
    if (savedProduct && Array.isArray(savedProduct)) {
        num_order.textContent = savedProduct.length;
    } else {
        num_order.textContent = 0; // في حالة عدم وجود عناصر أو savedProduct ليس مصفوفة
    }
    });
});

function calculateTotalPrices() {
    if (savedProduct && Array.isArray(savedProduct)) {
        let total = savedProduct.reduce((acc, product) => {
            let price = product.numberOfPieces * 60;
            // console.log(price)
            return acc + price;
        }, 0);

        return total;
    }

    return 0;
}

let totalPrices = calculateTotalPrices();
console.log(`Total prices: $${totalPrices}`);

let total = document.querySelectorAll(".total");
total.forEach(e => {
e.innerHTML = `$${totalPrices}`;
});

}else{
    let total = document.querySelectorAll(".total");
    total.forEach(e => {
    e.innerHTML = `$0`;
});
}

// coupon
let coupon = document.querySelector("#cart-add #coupon input");
let applyCoupon = document.querySelector("#cart-add #coupon button");
let total = document.querySelectorAll(".total");
let totalPrices = calculateTotalPrices();
let titel_cobon = document.querySelector("#titel-cobon");
let correctAndEroor = document.querySelector("#cart-add #coupon div span ");



applyCoupon.onclick = function() {
    if (totalPrices > 59 && coupon.value === "AHMED70") {
        let discount = totalPrices * 0.7; // حساب قيمة الخصم
        let newTotal = totalPrices - discount; // حساب القيمة الإجمالية بعد الخصم
        total.forEach(e => {
            e.innerHTML = `$${Math.floor(newTotal)}`;
        })
        correctAndEroor.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        titel_cobon.innerHTML = "70% discount applied";
        correctAndEroor.style.display = "block";
        correctAndEroor.style.color = "#4CAF50";
        coupon.style.marginRight = "0px";
        // console.log(`تم تطبيق خصم 70%: القيمة بعد الخصم = $${newTotal}`);
    }else if (totalPrices > 59 && coupon.value === "AHMED50") {
        let discount = totalPrices * 0.5; // حساب قيمة الخصم
        let newTotal = totalPrices - discount; // حساب القيمة الإجمالية بعد الخصم
        total.forEach(e => {
            e.innerHTML = `$${Math.floor(newTotal)}`;
        })
        correctAndEroor.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        titel_cobon.innerHTML = "50% discount applied";
        correctAndEroor.style.display = "block";
        correctAndEroor.style.color = "#4CAF50";
        coupon.style.marginRight = "0px";
    }else{
        correctAndEroor.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
        correctAndEroor.style.display = "block";
        correctAndEroor.style.color = "#ab1616";
        coupon.style.marginRight = "0px";
    }
}


