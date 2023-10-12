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

  /** 
   * Getter for the cart items count.
   * @returns {number} The total count of items in the cart.
   */
  get cartItemsCount() {
    return this.cart.reduce((acc, item) => acc + item.quantity, 0);
  }

  /** 
   * Setter for the total price.
   * @param {number} value - The new total price value.
   */
  set totalPrice(value) {
    this._totalPriceElement.textContent = value.toFixed(2);
  }
  renderClothingItems() {
    this.data.clothingData.forEach((item) => {
      this.renderClothingItem(item);
    });
  }

  async renderClothingItem(item) {
    try {
      const card = document.createElement('div');
      card.classList.add('card');
  
      let imageContainer;
      if (typeof item['image'] === 'string') {
        imageContainer = `<img src="${item['image']}" alt="Product Image"></img>`;
      } else {
        imageContainer = `<img src="${item['image']['url']}" alt="${item['image']['alt']}"></img>`;
      }
  
      card.innerHTML = `
        ${imageContainer}
        <h3>${item.name}</h3>
        <p>Price: $${item.price}</p>
        <button class="addToCartBtn" data-id="${item.id}">Add to Cart</button>
      `;
  
      const addToCartBtn = card.querySelector('.addToCartBtn');
      addToCartBtn.addEventListener('click', () => {
        this.addToCart(item);
      });
  
      this.clothingList.appendChild(card);
    } catch(error) {
      console.error(`Error occured when trying to display`, error)
    }
  }

  async addToCart(item) {
    try {
      const existingItem = this.cart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({ ...item, quantity: 1 });
      }
  
      this.updateCart();
    } catch(error) {
      console.error(`Error while adding item to cart`, error)
    }
  }

  updateCart() {
    this.cartItems.innerHTML = '';
    let totalPrice = 0;

    this.cart.forEach((item) => {
      const cartItemElement = document.createElement('li');
      cartItemElement.classList.add('cartItem');

      cartItemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <span>${item.name}</span>
        <button class="quantityBtn decrease" data-id="${item.id}">-</button>
        <span>${item.quantity}</span>
        <button class="quantityBtn increase" data-id="${item.id}">+</button>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
        <button class="removeBtn" data-id="${item.id}">Remove</button>
      `;

      const decreaseBtn = cartItemElement.querySelector('.decrease');
      const increaseBtn = cartItemElement.querySelector('.increase');
      const removeBtn = cartItemElement.querySelector('.removeBtn');

      decreaseBtn.addEventListener('click', () => {
        this.decreaseQuantity(item);
      });

      increaseBtn.addEventListener('click', () => {
        this.increaseQuantity(item);
      });

      removeBtn.addEventListener('click', () => {
        this.removeFromCart(item);
      });

      this.cartItems.appendChild(cartItemElement);
      totalPrice += item.price * item.quantity;
    });

    this.totalPrice = totalPrice; // Use the setter to update totalPrice
    document.getElementById('cartItemCount').textContent = this.cartItemsCount; // Use the getter for cartItemsCount
  }

  decreaseQuantity(item) {
    item.quantity = Math.max(0, item.quantity - 1);
    this.updateCart();
  }

  increaseQuantity(item) {
    item.quantity++;
    this.updateCart();
  }

  removeFromCart(item) {
    const index = this.cart.findIndex((cartItem) => cartItem.id === item.id);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
    this.updateCart();
  }
}

const clothingStore = new ClothingStore();


