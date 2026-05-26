let cart = {};

// ======================
//  FEEDBACK & ORDER FORMS
// ======================

function submitFeedback() {
    const name = document.getElementById('name').value?.trim() || '';
    const message = document.getElementById('message').value?.trim() || '';

    if (!name || !message) {
        alert('Please fill in your name and message before submitting.');
        return;
    }

    document.getElementById('success').style.display = 'block';
    document.getElementById('success').scrollIntoView({ behavior: 'smooth' });
}

function submitOrder() {
    const name = document.getElementById('name').value?.trim() || '';
    const email = document.getElementById('email').value?.trim() || '';

    if (!name || !email) {
        alert('Please fill in at least your name and email to submit.');
        return;
    }

    document.getElementById('success').style.display = 'block';
    document.getElementById('success').scrollIntoView({ behavior: 'smooth' });
}

// ======================
//  SHOPPING CART FUNCTIONS
// ======================

function addToCart(name, price) {
    if (cart[name]) {
        cart[name].quantity += 1;
    } else {
        cart[name] = { price: price, quantity: 1 };
    }
    updateCart();
}

function increaseQty(name) {
    if (cart[name]) {
        cart[name].quantity += 1;
        updateCart();
    }
}

function decreaseQty(name) {
    if (cart[name]) {
        cart[name].quantity -= 1;
        if (cart[name].quantity <= 0) {
            delete cart[name];
        }
        updateCart();
    }
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    let total = 0;

    cartItems.innerHTML = "";

    for (let item in cart) {
        const price = cart[item].price;
        const qty = cart[item].quantity;
        total += price * qty;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <span class="cart-item-name">${item}</span>
                    <span class="cart-item-price">P${price} each</span>
                </div>
                <div class="qty-controls">
                    <button class="qty-btn" onclick="decreaseQty('${item}')">-</button>
                    <span class="qty-num">${qty}</span>
                    <button class="qty-btn" onclick="increaseQty('${item}')">+</button>
                </div>
            </div>`;
    }

    document.getElementById("cart-total").innerHTML = "P" + total;

    if (total === 0) {
        cartItems.innerHTML = "<p>No items yet</p>";
    }
}

function clearCart() {
    cart = {};
    updateCart();
}

function checkout() {
    let receipt = "";
    let total = 0;

    for (let item in cart) {
        const price = cart[item].price;
        const qty = cart[item].quantity;
        total += price * qty;

        receipt += `
            <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #E5DCC8;">
                <span>${item} x ${qty}</span>
                <strong>P${price * qty}</strong>
            </div>`;
    }

    if (total === 0) {
        alert("Your cart is empty!");
        return;
    }

    document.getElementById("receipt-details").innerHTML = receipt;
    document.getElementById("receipt-total").innerText = "P" + total;
    document.getElementById("receipt-modal").style.display = "block";

    clearCart();
}

function closeReceipt() {
    document.getElementById("receipt-modal").style.display = "none";
}

// Close modal when clicking outside
window.onclick = function(e) {
    const modal = document.getElementById("receipt-modal");
    if (e.target === modal) {
        closeReceipt();
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
});