import { addToCart } from './cart.js';

export function setupModal() {
    const itemsContainer = document.getElementById("list-items");
    const modal = document.getElementById("modalModal");
    const productDetails = document.getElementById("product-detailsModal");

    itemsContainer.addEventListener("click", (event) => {
        const target = event.target.closest(".modal-text");
        if (!target) return;

        const item = JSON.parse(target.dataset.item);
        displayProductDetails(item);
    });

    function displayProductDetails(item) {
        productDetails.innerHTML = "";

        const carouselHTML = `
            <div id="carouselExampleControlsModal" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="${item.imageUrl}" class="carousel-imageModal" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="${item.hoverImageUrl}" class="carousel-imageModal" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="/public/img/Tablamedidas.jpg" class="carousel-imageModal" alt="Tabla de medidas">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsModal" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsModal" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        `;

        const thumbnailsHTML = `
            <div class="thumbnails-container">
                <img src="${item.imageUrl}" class="thumbnail-image" data-bs-target="#carouselExampleControlsModal" data-bs-slide-to="0" alt="...">
                <img src="${item.hoverImageUrl}" class="thumbnail-image" data-bs-target="#carouselExampleControlsModal" data-bs-slide-to="1" alt="...">
                <img src="/public/img/Tablamedidas.jpg" class="thumbnail-image" data-bs-target="#carouselExampleControlsModal" data-bs-slide-to="2" alt="Tabla de medidas">
            </div>
        `;

        const productInfoHTML = `
            <div class="product-infoModal">
                <br>
                <h2>${item.name}</h2>
                <p>Precio: $${item.price} MXN</p>
                <div class="form-group">
                    <label for="sizeModal">Talla:</label>
                    <select id="sizeModal" class="form-select">
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="G">G</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="unitsModal">Cantidad:</label>
                    <input type="number" id="unitsModal" class="form-control" value="1" min="1">
                </div>
                <button id="add-to-cartModal" class="btn btn-primary">Agregar al Carrito</button>
            </div>
        `;

        productDetails.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    ${carouselHTML}
                    ${thumbnailsHTML}
                </div>
                <div class="col-md-6">
                    ${productInfoHTML}
                </div>
            </div>
        `;

        new bootstrap.Carousel(document.querySelector('#carouselExampleControlsModal'), {
            interval: 5000
        });

        modal.style.display = "block";

        const closeBtn = document.querySelector("#modalModal .closeModal");
        closeBtn.addEventListener("click", function () {
            document.getElementById("modalModal").style.display = "none";
        });
        
        const addToCartButton = productDetails.querySelector("#add-to-cartModal");
        addToCartButton.addEventListener("click", function () {
            const selectedSize = document.getElementById("sizeModal").value;
            const selectedQuantity = parseInt(document.getElementById("unitsModal").value);

            addToCart(item, selectedSize, selectedQuantity);

            $('#confirmationModal').modal('show');

            document.getElementById("sizeModal").value = "S";
            document.getElementById("unitsModal").value = "1";
        });
    }
}

    document.addEventListener('DOMContentLoaded', function () {
 
    document.querySelector('#confirmationModal .btn-secondary').addEventListener('click', function () {
        $('#confirmationModal').modal('hide');
    });

    document.querySelector('#confirmationModal #goToCartBtn').addEventListener('click', function () {
        window.location.href = '../cart/cart.html';
    });

    $('#confirmationModal').modal({ show: false });
});
