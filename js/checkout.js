document.addEventListener("DOMContentLoaded", function () {
    const shippingPaymentForm = document.getElementById("shipping-payment-form");
    const continueToStep2Button = document.getElementById("continue-to-step-2");
    const continueToStep3Button = document.getElementById("continue-to-step-3");
    const paymentMethodRadios = document.getElementsByName("payment-method");
    const creditCardDetails = document.getElementById("credit-card-details");
    const confirmOrderButton = document.getElementById("confirm-order-btn");
    const orderSummaryContainer = document.getElementById("order-summary");

    paymentMethodRadios.forEach(radio => {
        radio.addEventListener("change", function () {
            if (this.value === "paypal") {
                creditCardDetails.style.display = "none";
            } else if (["visa", "mastercard", "amex"].includes(this.value)) {
                creditCardDetails.style.display = "block";
            } else {
                creditCardDetails.style.display = "none";
            }
        });
    });

    if (continueToStep2Button) {
        continueToStep2Button.addEventListener("click", function () {
            if (!document.getElementById("user-info-form").checkValidity()) {
                document.getElementById("user-info-form").reportValidity();
                return;
            }

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;

            localStorage.setItem("userInfo", JSON.stringify({ name, email, phone }));

            const tab = new bootstrap.Tab(document.getElementById("tab-step-2"));
            tab.show();
        });
    }

    if (continueToStep3Button) {
        continueToStep3Button.addEventListener("click", function () {
            const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
            let isValid = true;

            if (paymentMethod !== "paypal") {
                isValid = shippingPaymentForm.checkValidity();
                if (["visa", "mastercard", "amex"].includes(paymentMethod)) {
                  
                    isValid = isValid &&
                        document.getElementById("card-number").value.trim() !== "" &&
                        document.getElementById("expiry-date").value.trim() !== "" &&
                        document.getElementById("security-code").value.trim() !== "";
                }
            }

            if (!isValid) {
                shippingPaymentForm.reportValidity();
                return;
            }

            const addressLine1 = document.getElementById("address-line-1").value;
            const addressLine2 = document.getElementById("address-line-2").value;
            const city = document.getElementById("city").value;
            const state = document.getElementById("state").value;
            const zip = document.getElementById("zip").value;
            const country = document.getElementById("country").value;

            if (["visa", "mastercard", "amex"].includes(paymentMethod)) {
                const cardNumber = document.getElementById("card-number").value;
                const expiryDate = document.getElementById("expiry-date").value;
                const securityCode = document.getElementById("security-code").value;

                localStorage.setItem("paymentInfo", JSON.stringify({ cardNumber, expiryDate, securityCode }));
            }

            localStorage.setItem("shippingInfo", JSON.stringify({ addressLine1, addressLine2, city, state, zip, country, paymentMethod }));

            if (paymentMethod === "paypal") {
                alert("Simulando redirección a PayPal para completar el pago.");

                setTimeout(() => {
                    showOrderSummary(); 
                }, 300);
            } else {
                showOrderSummary();
            }
        });
    }

    function showOrderSummary() {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (userInfo && shippingInfo && cart.length > 0) {
            let orderSummaryHTML = `
                <div class="no-spacing">    
                <p><strong>Nombre:</strong> ${userInfo.name}</p>
                <p><strong>Correo Electrónico:</strong> ${userInfo.email}</p>
                <p><strong>Teléfono:</strong> ${userInfo.phone}</p>
                <p><strong>Dirección de Envío:</strong> ${shippingInfo.addressLine1} ${shippingInfo.addressLine2}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.zip}, ${shippingInfo.country}</p>
                <p><strong>Método de Pago:</strong> ${shippingInfo.paymentMethod}</p>
                <br>
                <h4>Resumen del Pedido:</h4>
                </div>
            `;

            let totalOrder = 0;

            cart.forEach(cartItem => {
                const { item, size, quantity } = cartItem;
                const totalPerItem = item.price * quantity;
                totalOrder += totalPerItem;

                orderSummaryHTML += `
                    <ul class="custom-list">
                        <li><span>${item.name} - Talla ${size}</span></li>
                        <li><span>Cantidad: ${quantity}</span></li>
                        <li><span>Total: $${totalPerItem.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN</span></li>
                    </ul>               
                     `;
            });

            orderSummaryHTML += `
                <p><span><h4>Total del Pedido:</h4></span><span>$${totalOrder.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN</span></p>
            `;

            orderSummaryContainer.innerHTML = orderSummaryHTML;

            const tab = new bootstrap.Tab(document.getElementById("tab-step-3"));
            tab.show();
        } else {
            alert("Por favor completa todos los pasos anteriores para proceder.");
        }
    }

    if (confirmOrderButton) {
        confirmOrderButton.addEventListener("click", function () {
            const confirmationMessage = document.getElementById("confirmation-message");
            if (confirmationMessage) {
                confirmationMessage.textContent = "¡Pedido confirmado! Gracias por tu compra.";
                confirmationMessage.style.display = "block";
            }

            localStorage.removeItem("userInfo");
            localStorage.removeItem("shippingInfo");
            clearCart();

            setTimeout(() => {
                window.location.href = "../productos/productos.html";
            }, 3000);
        });
    }

    function clearCart() {
        localStorage.removeItem("cart");
    }
});
