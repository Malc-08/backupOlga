class ItemsController {
    constructor(currentId = 0) {
        this.items = [];
        this.currentId = currentId;
    }

    addItem(name, description, imageUrl, hoverImageUrl, price) {
        const item = {
            id: this.currentId++,
            name: name,
            description: description,
            imageUrl: imageUrl,
            hoverImageUrl: hoverImageUrl,
            price: price
        };
        this.items.push(item);
    }

    loadItemsFromLocalStorage() {
        const storageItems = localStorage.getItem("items");
        if (storageItems) {
            const items = JSON.parse(storageItems);
            items.forEach(item => {
                this.addItem(item.name, item.description, item.imageUrl, item.hoverImageUrl, item.price);
            });
        }
    }

    getItems() {
        return this.items;
    }
}

export { ItemsController };


