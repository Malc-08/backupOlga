import { ItemsController } from "./itemsController.js";
import { setupModal } from "./modal.js";

const itemsController = new ItemsController();

function addItemCard(item) {
    const itemHTML = `
       <div class="card" style="width: 20rem;">
    <div class="image-container">
        <img src="${item.imageUrl}" class="primary-image" alt="product image">
        <div class="hover-content">
            <img src="${item.hoverImageUrl}" class="hover-image" alt="hover image">
            <span class="modal-text" data-item='${JSON.stringify(item)}'>Ver más</span>
        </div>
    </div>
    <div class="card-body">
        <h4 class="card-title">${item.name}</h4>
        <p class="card-text">$${item.price} MXN</p>
    </div>
</div>

    `;
    const itemsContainer = document.getElementById("list-items");
    itemsContainer.innerHTML += itemHTML;
}

function loadStorageSampleData() {
    if (!localStorage.getItem("items")) {
        const sampleItems = [
            {
                name: "Body Damon",
                imageUrl: "/img/Body-Damon.jpg",
                hoverImageUrl: "/img/Body-Damon(2).jpg",
                price: "799.99"
            },
            {
                name: "Body Carmina",
                imageUrl: "/img/Body-Carmina.jpg",
                hoverImageUrl: "/img/Body-Carmina(2).jpg",
                price: "799.99"
            },
            {
                name: "Bustier Ale",
                imageUrl: "/img/Bustier-Ale.jpg",
                hoverImageUrl: "/img/Bustier-Ale(2).jpg",
                price: "799.99"
            },
            {
                name: "Set Angel",
                imageUrl: "/img/Set-Angel.jpg",
                hoverImageUrl: "/img/Set-Angel(2).jpg",
                price: "799.99"
            },
            {
                name: "Set Daniela",
                imageUrl: "/img/Set-Daniela.jpg",
                hoverImageUrl: "/img/Set-Daniela(2).jpg",
                price: "799.99"
            },
            {
                name: "Set Cordelia",
                imageUrl: "/img/Set-Cordelia.jpg",
                hoverImageUrl: "/img/Set-Cordelia(2).jpg",
                price: "799.99"
            },
            {
                name: "Set Vedette",
                imageUrl: "/img/Set-Vedette.jpg",
                hoverImageUrl: "/img/Set-Vedette(2).jpg",
                price: "799.99"
            },
            {
                name: "Set Catalina",
                imageUrl: "/img/Set-Catalina.jpg",
                hoverImageUrl: "/img/Set-Catalina(2).jpg",
                price: "799.99"
            },
            {
                name: "Set Florentina",
                imageUrl: "/img/Set-Florentina.jpg",
                hoverImageUrl: "/img/Set-Florentina(2).jpg",
                price: "799.99"
            },
            {
                name: "Set Susan",
                imageUrl: "/img/Set-Susan.jpg",
                hoverImageUrl: "/img/Set-Susan(2).jpg",
                price: "799.99"
            },

        ];
        localStorage.setItem("items", JSON.stringify(sampleItems));
    }
}

function loadCardsListFromItemsController() {
    const items = itemsController.getItems();
    items.forEach(item => addItemCard(item));
}

loadStorageSampleData();
itemsController.loadItemsFromLocalStorage();
loadCardsListFromItemsController();

setupModal();


