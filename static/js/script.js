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

    // Fetch clothing data from JSON and render it on the webpage
    fetch('db.json')
      .then((res) => res.json())
      .then((data) => {
        this.data = data;
        this.renderClothingItems();
      })
      .catch((error) => console.error('Error fetching data:', error));

    this.cartIcon.addEventListener('click', () => {
      const cartDiv = document.getElementById('cart');
      cartDiv.classList.add('active');
    });
  }

  get cartItemsCount() {
    return this.cart.reduce((acc, item) => acc + item.quantity, 0);
  }

  /**
   * @param {number} value
   */
  set totalPrice(value) {
    // You can add validation here if needed
    this._totalPriceElement.textContent = value.toFixed(2);
  }

  renderClothingItems() {
    this.data.clothingData.forEach((item) => {
      this.renderClothingItem(item);
    });
  }

  renderClothingItem(item) {
    const card = document.createElement('div');
    card.classList.add('card');

    let imageContainer;
    if (typeof item['image'] === 'string') {
      imageContainer = `<img src="${item['image']}" alt="Product Image"></img>`;
    } else {
      imageContainer = `<img src="${item['image']['url']}" alt="${item['image']['alt']}"></img>`;
    }

  }


}

const clothingStore = new ClothingStore();
