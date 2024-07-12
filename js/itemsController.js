class ItemsController {
    constructor(currentId = 0) {
        this.items = [];
        this.currentId = currentId;
    }

    addItem(name, description, imageUrl, price) {
        const item = {
            id: this.currentId++,
            name: name,
            description: description,
            imageUrl: imageUrl,
            price: price
        };
        this.items.push(item);
    }

    loadItemsFromLocalStorage() {
        const storageItems = localStorage.getItem("items");
        if (storageItems) {
            const items = JSON.parse(storageItems);
            items.forEach(item => {
                this.addItem(item.name, item.description, item.imageUrl, item.price);
            });
        }
    }

    getItems() {
        return this.items;
    }
}

// Exportar la clase si es necesario
export { ItemsController };


