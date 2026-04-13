const items = [
  { name: 'Butter Chicken', price: '₹220', image: 'tandoori-chicken.jpg', category: 'Main', description: 'Creamy chicken curry simmered in a tomato butter sauce.' },
  { name: 'Paneer Tikka', price: '₹180', image: 'paneer-tikka.jpg', category: 'Veg', description: 'Char-grilled cottage cheese with Indian spices.' },
  { name: 'Veg Biryani', price: '₹160', image: 'veg-biryani.jpg', category: 'Main', description: 'Aromatic rice layered with vegetables and spices.' },
  { name: 'Rajma Chawal', price: '₹120', image: 'rajma-chawal.jpg', category: 'Main', description: 'Red kidney beans cooked in masala, served with rice.' },
  { name: 'Masala Dosa', price: '₹130', image: 'final.png', category: 'Breakfast', description: 'Crispy rice crepe filled with spiced potato.' },
  { name: 'Chole Bhature', price: '₹150', image: 'final.png', category: 'Special', description: 'Spicy chickpea curry with fluffy fried bread.' },
  { name: 'Dal Makhani', price: '₹140', image: 'final.png', category: 'Veg', description: 'Slow-cooked black lentils in rich buttery gravy.' },
  { name: 'Aloo Paratha', price: '₹90', image: 'paratha.png', category: 'Breakfast', description: 'Potato-stuffed flatbread served with yogurt.' },
  { name: 'Samosa Chaat', price: '₹110', image: 'final.png', category: 'Street', description: 'Crunchy samosa topped with chutneys and yogurt.' },
  { name: 'Rogan Josh', price: '₹240', image: 'final.png', category: 'Main', description: 'Fragrant lamb curry with Kashmiri spices.' },
  { name: 'Hyderabadi Biryani', price: '₹230', image: 'final.png', category: 'Main', description: 'Layered biryani with saffron, meat, and fried onions.' },
  { name: 'Paneer Butter Masala', price: '₹190', image: 'paneer-tikka.jpg', category: 'Veg', description: 'Soft paneer cubes in rich tomato gravy.' },
  { name: 'Malai Kofta', price: '₹170', image: 'final.png', category: 'Veg', description: 'Cheese dumplings in a creamy cashew sauce.' },
  { name: 'Gulab Jamun', price: '₹80', image: 'final.png', category: 'Dessert', description: 'Soft milk dumplings soaked in rose syrup.' },
  { name: 'Jalebi', price: '₹70', image: 'final.png', category: 'Dessert', description: 'Crispy sweet spirals soaked in saffron syrup.' },
  { name: 'Kadhai Paneer', price: '₹185', image: 'paneer-tikka.jpg', category: 'Veg', description: 'Paneer and peppers cooked in a spicy tomato gravy.' },
  { name: 'Paratha Combo', price: '₹95', image: 'paratha.png', category: 'Breakfast', description: 'Butter paratha served with pickles and chutney.' },
  { name: 'Chili Chicken', price: '₹170', image: 'chili-chicken.jpg', category: 'Special', description: 'Spicy and tangy Indo-Chinese chicken stir fry.' }
];

const popularItems = [
  { name: 'Butter Chicken', price: '₹220', image: 'tandoori-chicken.jpg', category: 'Main' },
  { name: 'Paneer Tikka', price: '₹180', image: 'paneer-tikka.jpg', category: 'Veg' },
  { name: 'Veg Biryani', price: '₹160', image: 'veg-biryani.jpg', category: 'Main' },
  { name: 'Chole Bhature', price: '₹150', image: 'pizza2.jpg', category: 'Special' },
  { name: 'Masala Dosa', price: '₹130', image: 'pizza1.jpg', category: 'Breakfast' },
  { name: 'Gulab Jamun', price: '₹80', image: 'pizza10.jpg', category: 'Dessert' }
];

const CART_KEY = 'jtgeetsCart';
const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');

function parsePrice(price) {
  return Number(price.replace(/[^0-9.]/g, '')) || 0;
}

function formatPrice(value) {
  return `₹${value}`;
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  const badge = document.getElementById('cart-count');
  if (!badge) return;
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

function addToCart(item) {
  const existing = cart.find(cartItem => cartItem.name === item.name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  saveCart();
  alert(`${item.name} added to cart.`);
}

function removeFromCart(name) {
  const index = cart.findIndex(item => item.name === name);
  if (index === -1) return;
  cart.splice(index, 1);
  saveCart();
}

function changeQuantity(name, delta) {
  const item = cart.find(row => row.name === name);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity < 1) {
    removeFromCart(name);
  } else {
    saveCart();
  }
}

function calculateTotal() {
  return cart.reduce((total, item) => total + parsePrice(item.price) * item.quantity, 0);
}

function renderItems(itemsArray, container) {
  if (!container) return;
  container.innerHTML = '';

  if (itemsArray.length === 0) {
    container.innerHTML = '<div class="cart-empty">No dishes found. Try another search or category.</div>';
    return;
  }

  itemsArray.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="card-body">
        <div>
          <div class="card-meta">
            <span class="badge">${item.category}</span>
            <span class="price">${item.price}</span>
          </div>
          <h3>${item.name}</h3>
          ${item.description ? `<p class="description">${item.description}</p>` : ''}
        </div>
        <div class="add-container">
          <button class="add-to-cart"><i class="fas fa-plus"></i> Add</button>
          <button class="rate-item"><i class="fas fa-star"></i> Rate</button>
        </div>
      </div>
    `;

    card.querySelector('.add-to-cart').addEventListener('click', () => addToCart(item));
    card.querySelector('.rate-item').addEventListener('click', () => alert(`Thanks for rating ${item.name}!`));
    container.appendChild(card);
  });
}

function renderCart() {
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  if (!cartItemsContainer || !cartTotal) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<div class="cart-empty">Your cart is empty. Add a tasty home-cooked dish to begin.</div>';
    cartTotal.textContent = formatPrice(0);
    return;
  }

  cartItemsContainer.innerHTML = '';
  cart.forEach(item => {
    const cartRow = document.createElement('div');
    cartRow.className = 'cart-item';
    cartRow.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>${item.price}</p>
        <div class="cart-item-controls">
          <button class="cart-qty-btn" data-action="decrease" data-name="${item.name}">−</button>
          <span>${item.quantity}</span>
          <button class="cart-qty-btn" data-action="increase" data-name="${item.name}">+</button>
          <button class="remove-from-cart" data-name="${item.name}">Remove</button>
        </div>
      </div>
    `;
    cartItemsContainer.appendChild(cartRow);
  });

  cartTotal.textContent = formatPrice(calculateTotal());
  cartItemsContainer.querySelectorAll('.cart-qty-btn').forEach(button => {
    button.addEventListener('click', () => {
      const name = button.dataset.name;
      const action = button.dataset.action;
      changeQuantity(name, action === 'increase' ? 1 : -1);
    });
  });

  cartItemsContainer.querySelectorAll('.remove-from-cart').forEach(button => {
    button.addEventListener('click', () => removeFromCart(button.dataset.name));
  });
}

function openModal(modal) {
  if (!modal) return;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  if (!modal) return;
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

function renderSearchResults(results) {
  const resultsContainer = document.getElementById('searchResults');
  if (!resultsContainer) return;
  resultsContainer.innerHTML = '';
  renderItems(results, resultsContainer);
}

function filterMenu(query = '', category = 'All') {
  const normalized = query.trim().toLowerCase();
  return items.filter(item => {
    const matchesCategory = category === 'All' || item.category === category;
    const matchesSearch = normalized.length === 0 || item.name.toLowerCase().includes(normalized) || (item.description && item.description.toLowerCase().includes(normalized));
    return matchesCategory && matchesSearch;
  });
}

function updateCategoryFilters() {
  const filters = document.getElementById('categoryFilters');
  if (!filters) return;

  const categories = ['All', 'Main', 'Veg', 'Breakfast', 'Dessert', 'Special', 'Street'];
  filters.innerHTML = categories.map(category => `<button type="button" class="filter-chip" data-category="${category}">${category}</button>`).join('');

  filters.querySelectorAll('.filter-chip').forEach(button => {
    button.addEventListener('click', () => {
      filters.querySelectorAll('.filter-chip').forEach(chip => chip.classList.remove('active'));
      button.classList.add('active');
      const searchInput = document.querySelector('.menu-section .search-bar input');
      const query = searchInput ? searchInput.value : '';
      renderMenuGrid(filterMenu(query, button.dataset.category));
    });
  });

  const firstChip = filters.querySelector('.filter-chip');
  if (firstChip) firstChip.classList.add('active');
}

function renderMenuGrid(itemsArray) {
  const menuGrid = document.getElementById('menu-grid');
  if (!menuGrid) return;
  menuGrid.innerHTML = '';

  if (itemsArray.length === 0) {
    menuGrid.innerHTML = '<div class="cart-empty">No dishes found for this category or search.</div>';
    return;
  }

  const categoryOrder = ['Main', 'Veg', 'Breakfast', 'Special', 'Street', 'Dessert'];
  categoryOrder.forEach(category => {
    const categoryItems = itemsArray.filter(item => item.category === category);
    if (!categoryItems.length) return;

    const section = document.createElement('section');
    section.className = 'menu-category';
    section.innerHTML = `
      <div class="category-head">
        <div>
          <h3>${category}</h3>
          <p>${categoryItems.length} delicious options</p>
        </div>
      </div>
    `;

    const categoryGrid = document.createElement('div');
    categoryGrid.className = 'menu-grid';
    renderItems(categoryItems, categoryGrid);
    section.appendChild(categoryGrid);
    menuGrid.appendChild(section);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const menuGrid = document.getElementById('menu-grid');
  const popularTrack = document.getElementById('popularTrack');
  const searchModal = document.getElementById('searchModal');
  const cartModal = document.getElementById('cartModal');
  const requestModal = document.getElementById('requestModal');

  renderMenuGrid(items);
  if (popularTrack) renderItems(popularItems, popularTrack);
  updateCartCount();
  renderCart();
  updateCategoryFilters();

  const searchIcon = document.getElementById('search-icon');
  const cartIcon = document.getElementById('cart-icon');
  if (searchIcon) searchIcon.addEventListener('click', () => openModal(searchModal));
  if (cartIcon) cartIcon.addEventListener('click', () => openModal(cartModal));

  document.querySelectorAll('.modal .close').forEach(closeButton => {
    closeButton.addEventListener('click', () => {
      const modal = closeButton.closest('.modal');
      closeModal(modal);
    });
  });

  window.addEventListener('click', event => {
    if (event.target === searchModal) closeModal(searchModal);
    if (event.target === cartModal) closeModal(cartModal);
    if (event.target === requestModal) closeModal(requestModal);
  });

  const heroSearchButton = document.querySelector('.hero .search-bar button');
  const heroSearchInput = document.querySelector('.hero .search-bar input');
  if (heroSearchButton && heroSearchInput) {
    heroSearchButton.addEventListener('click', () => {
      renderSearchResults(filterMenu(heroSearchInput.value));
      openModal(searchModal);
    });
  }

  const menuSearchButton = document.querySelector('.menu-section .search-bar button');
  const menuSearchInput = document.querySelector('.menu-section .search-bar input');
  if (menuSearchButton && menuSearchInput) {
    menuSearchButton.addEventListener('click', () => {
      const activeFilter = document.querySelector('.filter-chip.active');
      const category = activeFilter ? activeFilter.dataset.category : 'All';
      renderMenuGrid(filterMenu(menuSearchInput.value, category));
    });
  }

  const modalSearchButton = document.getElementById('modalSearchBtn');
  const modalSearchInput = document.getElementById('modalSearchInput');
  if (modalSearchButton && modalSearchInput) {
    modalSearchButton.addEventListener('click', () => {
      renderSearchResults(filterMenu(modalSearchInput.value));
    });
    modalSearchInput.addEventListener('keypress', event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        modalSearchButton.click();
      }
    });
  }

  const prevPopularBtn = document.getElementById('prevPopularBtn');
  const nextPopularBtn = document.getElementById('nextPopularBtn');
  if (prevPopularBtn && popularTrack) {
    prevPopularBtn.addEventListener('click', () => popularTrack.scrollBy({ left: -260, behavior: 'smooth' }));
  }
  if (nextPopularBtn && popularTrack) {
    nextPopularBtn.addEventListener('click', () => popularTrack.scrollBy({ left: 260, behavior: 'smooth' }));
  }

  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const navUl = document.querySelector('.nav ul');
      if (navUl) navUl.classList.toggle('show');
    });
  }

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Your cart is empty. Add something first.');
        return;
      }
      alert(`Checkout successful! Total: ${formatPrice(calculateTotal())}`);
      cart.length = 0;
      saveCart();
      closeModal(cartModal);
    });
  }

  const requestOpen = document.getElementById('popular-request-btn');
  const requestClose = document.querySelector('#requestModal .close');
  const cancelRequest = document.getElementById('cancel-btn');
  const requestForm = document.getElementById('request-form');
  if (requestOpen && requestClose && cancelRequest && requestForm) {
    requestOpen.addEventListener('click', () => openModal(requestModal));
    requestClose.addEventListener('click', () => closeModal(requestModal));
    cancelRequest.addEventListener('click', () => closeModal(requestModal));

    requestForm.addEventListener('submit', event => {
      event.preventDefault();
      requestForm.reset();
      alert('Your dish request has been received. We will contact you soon!');
      closeModal(requestModal);
    });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      this.reset();
      alert('Thanks for reaching out! We will get back to you soon.');
    });
  }
});
