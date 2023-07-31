class ClothingStore {
  constructor() {
    this.clothingList = document.getElementById('clothingList');
    this.cartItems = document.getElementById('cartItems');
    this._totalPriceElement = document.getElementById('totalPrice'); // Use a private property with an underscore
    this.cartIcon = document.getElementById('cartIcon');

  }

}

const clothingStore = new ClothingStore();
