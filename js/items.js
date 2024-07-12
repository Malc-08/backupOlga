import { ItemsController } from "./itemsController.js";

const itemsController = new ItemsController();

function addItemCard(item) {
    const itemHTML = `
        <div class="card" style="width: 20rem;">
            <img src="${item.imageUrl}" width="180px" alt="product image">
            <div class="card-body">
                <h4 class="card-title">${item.name}</h4>
                <!--<p class="card-text">${item.description}</p>-->
                <p class="card-text content-center" >${item.price}</p>
               <!-- <a href="#" class="btn btn-primary">Add</a>-->
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
                description: "Body encaje vino",
                price: "$799.99 MXN"
            },
            {
                name: "Body Carmina",
                imageUrl: "/img/BodyCarmina(2).jpg",
                description: "Body encaje negro",
                price: "$799.99 MXN"
            },
            {
                name: "Bustier Ale",
                imageUrl: "/img/Bustier Ale (2).jpg",
                description: "Bustier encaje negro",
                price: "$799 MXN"
            },
            {
                name: "Set Angel",
                imageUrl: "/img/Set-Angel.jpg",
                description: "Set de encaje Angel",
                price: "$799 MXN"
            },
            {
                name: "Set Daniela",
                imageUrl: "/img/Set-Daniela.jpg",
                description: "Set ",
                price: "$799 MXN"
            },
            {
                name: "Set Cordelia",
                imageUrl: "/img/Set-Cordelia.jpg",
                description: "Set de encaje Angel",
                price: "$799 MXN"
            },
            {
                name: "Set Vedette",
                imageUrl: "/img/Set-Vedette.jpg",
                description: "Set de encaje Angel",
                price: "$799 MXN"
            },
            {
                name: "Set Catalina",
                imageUrl: "/img/Set-Catalina.jpg",
                description: "Set de encaje Angel",
                price: "$799 MXN"
            },
            {
                name: "Set Florentina",
                imageUrl: "/img/Set-Florentina.jpg",
                description: "Set de encaje Angel",
                price: "$799 MXN"
            },
            {
                name: "Set Susan",
                imageUrl: "/img/Set-Susan.jpg",
                description: "Set de encaje Angel",
                price: "$799 MXN"
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

    
