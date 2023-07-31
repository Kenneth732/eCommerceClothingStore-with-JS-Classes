class ClothingStore {
  constructor() {
    this.clothingList = document.getElementById('clothingList');
    this.cartItems = document.getElementById('cartItems');
    this._totalPriceElement = document.getElementById('totalPrice'); // Use a private property with an underscore
    this.cartIcon = document.getElementById('cartIcon');
    this.cart = [];

    // Bind class methods as event handlers with explicit binding
    this.addToCart = this.addToCart.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);

 
  }

}

const clothingStore = new ClothingStore();
