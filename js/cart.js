
export function addToCart(item, size, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let found = false;
    cart.forEach(cartItem => {
        if (cartItem.item.name === item.name && cartItem.size === size) {
            cartItem.quantity += quantity;
            found = true;
        }
    });

    if (!found) {
        cart.push({ item, size, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    setTimeout(() => {
        updateCartUI();
    }, 100);
}

export function updateCartUI() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalContainer = document.getElementById("cart-total");

    if (!cartItemsContainer || !cartTotalContainer) {
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartItemsContainer.innerHTML = `
        <div class="table-responsive">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th colspan="2">Producto</th>
                        <th>Talla</th>
                        <th class="total-column">Precio unitario</th>
                        <th>Cantidad</th>
                        <th class="total-column">Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    `;
    const cartTableBody = cartItemsContainer.querySelector('tbody');
    
    cartTotalContainer.innerHTML = "";

    if (cart.length === 0) {
        cartTableBody.innerHTML = "<tr><td colspan='5'>El carrito está vacío.</td></tr>";
    } else {
        cart.forEach(cartItem => {
            const { item, size, quantity } = cartItem;
            const totalPerItem = item.price * quantity;
            const itemHTML = `
                <tr>
                    <td><img src="${item.imageUrl}" alt="${item.name}" class="card-img w-100"></td>
                    <td><h6 class="card-title">${item.name}</h6></td>
                    <td><select class="form-control update-size" data-name="${item.name}" data-size="${size}">
                                    <option value="S" ${size === 'S' ? 'selected' : ''}>S</option>
                                    <option value="M" ${size === 'M' ? 'selected' : ''}>M</option>
                                    <option value="L" ${size === 'L' ? 'selected' : ''}>L</option>
                                    <option value="XL" ${size === 'XL' ? 'selected' : ''}>XL</option>
                                    <option value="XXL" ${size === 'XXL' ? 'selected' : ''}>XXL</option>
                                </select></td>
                    <td>$${item.price.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN</td>
                    <td><input type="number" class="form-control update-quantity" value="${quantity}" data-name="${item.name}" data-size="${size}" min="1"></td>
                    <td>$${totalPerItem.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN</td>
                    <td><button class="btn-sm remove-from-cart" data-name="${item.name}" data-size="${size}">
                         <i class="fas fa-trash-alt"></i>
                    </button></td>
                </tr>
            `;
            cartTableBody.insertAdjacentHTML('beforeend', itemHTML);
        });

        const subtotal = cart.reduce((acc, { item, quantity }) => acc + (item.price * quantity), 0);
        const envio = subtotal >= 1599 ? 0 : 99;
        const total = subtotal + envio;

        const totalHTML = `
            <div class="card mb-3">
                <div class="card-body cart-total-container">
                    <h4>Resumen del pedido</h4>
                    <p><span>Subtotal:</span> <span>$${subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN</span></p>
                    <p><span>Envío:</span> <span>$${envio.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN</span></p>
                    <div class="cart-total-separator"></div>
                    <p><span>Total del carrito:</span> <span>$${total.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN</span></p>
                    <button id="proceed-to-checkout" class="btn btn-primary mt-4">Proceder al Pago</button>
                </div>
            </div>
        `;
        cartTotalContainer.innerHTML = totalHTML;
    }

    attachEventListeners();
}

function attachEventListeners() {
    const removeButtons = document.querySelectorAll(".remove-from-cart");
    removeButtons.forEach(button => {
        button.addEventListener("click", function () {
            const itemName = button.dataset.name;
            const itemSize = button.dataset.size;

            removeFromCart(itemName, itemSize);
        });
    });

    const updateQuantityInputs = document.querySelectorAll(".update-quantity");
    updateQuantityInputs.forEach(input => {
        input.addEventListener("change", function () {
            const itemName = input.dataset.name;
            const itemSize = input.dataset.size;
            const newQuantity = parseInt(input.value);

            updateQuantityInCart(itemName, itemSize, newQuantity);
        });
    });

    const updateSizeSelects = document.querySelectorAll(".update-size");
    updateSizeSelects.forEach(select => {
        select.addEventListener("change", function () {
            const itemName = select.dataset.name;
            const oldSize = select.dataset.size;
            const newSize = select.value;

            updateSizeInCart(itemName, oldSize, newSize);
        });
    });

    const proceedButton = document.getElementById("proceed-to-checkout");
    if (proceedButton) {
        proceedButton.addEventListener("click", function () {
            window.location.href = "checkout.html";
        });
    }
}

export function removeFromCart(itemName, itemSize) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.filter(cartItem => !(cartItem.item.name === itemName && cartItem.size === itemSize));

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartUI();
}

export function updateQuantityInCart(itemName, itemSize, newQuantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.forEach(cartItem => {
        if (cartItem.item.name === itemName && cartItem.size === itemSize) {
            cartItem.quantity = newQuantity;
        }
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartUI();
}

export function updateSizeInCart(itemName, oldSize, newSize) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.forEach(cartItem => {
        if (cartItem.item.name === itemName && cartItem.size === oldSize) {
            cartItem.size = newSize;
        }
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartUI();
}

export function clearCart() {
    localStorage.removeItem("cart");
    updateCartUI();
}

document.addEventListener("DOMContentLoaded", updateCartUI);
