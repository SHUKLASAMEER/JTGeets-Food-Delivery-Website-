 const items = [
  { name: "Home made pizza", price: "₹100", image: "WhatsApp Image 2025-05-12 at 11.29.02 PM.jpeg.jpg" },
  { name: "Home made pizza", price: "₹120", image: "WhatsApp Image 2025-05-12 at 11.29.04 PM.jpeg.jpg" },
  { name: "Home made pizza", price: "₹130", image: "WhatsApp Image 2025-05-12 at 11.29.06 PM.jpeg.jpg" },
  { name: "Home made pizza", price: "₹100", image: "pizza4.png" },
  { name: "Home made pizza", price: "₹119", image: "WhatsApp Image 2025-05-12 at 11.29.08 PM (1).jpeg.jpg" },
  { name: "Home made pizza", price: "₹110", image: "WhatsApp Image 2025-05-12 at 11.29.09 PM (1).jpeg.jpg" },
  { name: "Home made pizza", price: "₹100", image: "WhatsApp Image 2025-05-12 at 11.29.30 PM.jpeg.jpg" },
  { name: "Home made pizza", price: "₹120", image: "WhatsApp Image 2025-05-12 at 11.29.39 PM.jpeg.jpg" },
  { name: "Home made pizza", price: "₹130", image: "WhatsApp Image 2025-05-12 at 11.29.41 PM.jpeg.jpg" },
  { name: "Home made pizza", price: "₹100", image: "WhatsApp Image 2025-05-12 at 11.30.05 PM.jpeg.jpg" },
  { name: "Home made pizza", price: "₹119", image: "WhatsApp Image 2025-05-12 at 11.30.08 PM.jpeg.jpg" },
  { name: "Home made pizza", price: "₹110", image: "WhatsApp Image 2025-05-12 at 11.31.54 PM.jpeg.jpg" }
];

const popularItems = [
  { name: "Home made pizza", price: "₹99", image: "pizza3.jpg" },
  { name: "Tandoori Chicken", price: "₹140", image: "tandoori chicken.jpeg.jpg" },
  { name: "Chili Chicken", price: "₹116", image: "chillichicken.jpg" },
  { name: "Rajma Chawal", price: "₹80", image: "rajmachawal.jpeg.jpg" },
  { name: "Paneer Tikka", price: "₹130", image: "pannertikka.jpeg.jpg" },
  { name: "Paratha Combo", price: "₹90", image: "paratha.png" },
  { name: "Veg Biryani", price: "₹110", image: "veg briyani.jpeg.jpg" }
];

function renderItems(itemsArray, container) {
  itemsArray.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" style="width:100%; border-radius:10px;">
      <div class="card-body">
        <h3>${item.name}</h3>
        <p class="price">${item.price}</p>
        <div class="rating">
          ${'<i class="fas fa-star"></i>'.repeat(4)}<i class="far fa-star"></i>
        </div>
        <div class="add-container">
          <button class="add-to-cart"><i class="fas fa-plus"></i></button>
          <button class="rate-item"><i class="fas fa-star"></i> Rate</button>
        </div>
      </div>
    `;

    card.querySelector('.add-to-cart').addEventListener('click', () => {
      alert(`Added ${item.name} to cart!`);
    });

    card.querySelector('.rate-item').addEventListener('click', () => {
      alert(`You rated ${item.name}!`);
    });

    container.appendChild(card);
  });
}

// Render menu items
const menuGrid = document.getElementById('menu-grid');
renderItems(items, menuGrid);

// Render popular items
const popularTrack = document.getElementById('popularTrack');
renderItems(popularItems, popularTrack);

// Search functionality
document.querySelector('.search-bar button').addEventListener('click', () => {
  const query = document.querySelector('.search-bar input').value.toLowerCase().trim();
  const filteredItems = items.filter(item => item.name.toLowerCase().includes(query));
  const menuGrid = document.getElementById('menu-grid');
  menuGrid.innerHTML = '';
  renderItems(filteredItems, menuGrid);
});

// Scroll buttons
document.getElementById('nextPopularBtn').addEventListener('click', () => {
  popularTrack.scrollBy({ left: 260, behavior: 'smooth' });
});

document.getElementById('prevPopularBtn').addEventListener('click', () => {
  popularTrack.scrollBy({ left: -260, behavior: 'smooth' });
});

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const name = this.querySelector('input[type="text"]').value;
  const email = this.querySelector('input[type="email"]').value;
  const message = this.querySelector('textarea').value;

  fetch('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    this.reset();
  })
  .catch(err => {
    console.error('Error:', err);
    alert('Failed to submit contact form');
  });
});



// Icons
document.getElementById('search-icon').addEventListener('click', () => {
  document.getElementById('searchModal').style.display = 'block';
});

document.getElementById('cart-icon').addEventListener('click', () => {
  alert('Cart feature will be available soon!');
});
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("requestModal");
  const openBtn = document.getElementById("popular-request-btn");
  const closeBtn = document.querySelector("#requestModal .close");
  const form = document.getElementById("request-form");

  if (modal && openBtn && closeBtn && form) {
    // Open modal on button click
    openBtn.addEventListener("click", () => {
      modal.style.display = "block";
    });

    // Close modal on X click
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Close modal when clicking outside content
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

    // Handle form submission
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you! Your request has been submitted.");
      form.reset();
      modal.style.display = "none";
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("requestModal");
  const openBtn = document.getElementById("popular-request-btn");
  const closeBtn = document.querySelector("#requestModal .close");
  const cancelBtn = document.getElementById("cancel-btn");
  const form = document.getElementById("request-form");

  if (modal && openBtn && closeBtn && form) {
    // Open modal on button click
    openBtn.addEventListener("click", () => {
      modal.style.display = "block";
    });

    // Close modal on X click
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Close modal on Cancel button click
    cancelBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Close modal when clicking outside content
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

    // Handle form submission
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you! Your request has been submitted.");
      form.reset();
      modal.style.display = "none";
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("requestModal");
  const openBtn = document.getElementById("popular-request-btn");
  const closeBtn = document.querySelector("#requestModal .close");
  const cancelBtn = document.getElementById("cancel-btn");
  const form = document.getElementById("request-form");

  if (modal && openBtn && closeBtn && form) {
    // Open modal on button click
    openBtn.addEventListener("click", () => {
      modal.style.display = "block";
      document.body.style.overflow = "hidden"; // Disable scroll
    });

    // Close modal on X click
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "auto"; // Enable scroll
    });

    // Close modal on Cancel button click
    cancelBtn.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "auto"; // Enable scroll
    });

    // Close modal when clicking outside content
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Enable scroll
      }
    });

    // Handle form submission
   form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const name = form.querySelector('input[type="text"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const request = form.querySelector('textarea').value;

  fetch('http://localhost:3000/api/request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, request })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    form.reset();
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  })
  .catch(err => {
    console.error('Error:', err);
    alert('Failed to submit request');
  });
});

  }
});



// Search Modal
document.addEventListener("DOMContentLoaded", () => {
  const searchModal = document.getElementById("searchModal");
  const closeBtn = document.querySelector("#searchModal .close");
  const searchBtn = document.getElementById("modalSearchBtn");
  const searchInput = document.getElementById("modalSearchInput");
  const resultsDiv = document.getElementById("searchResults");

  if (searchModal && closeBtn && searchBtn && searchInput && resultsDiv) {
    // Close modal on X click
    closeBtn.addEventListener("click", () => {
      searchModal.style.display = "none";
      document.body.style.overflow = "auto";
    });

    // Close modal on outside click
    window.addEventListener("click", (event) => {
      if (event.target === searchModal) {
        searchModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });

    // Search functionality
    searchBtn.addEventListener("click", () => {
      const query = searchInput.value.toLowerCase().trim();
      const allItems = [...items, ...popularItems]; // Combine items
      const filteredItems = allItems.filter(item => item.name.toLowerCase().includes(query));
      resultsDiv.innerHTML = '';
      if (filteredItems.length > 0) {
        renderItems(filteredItems, resultsDiv);
      } else {
        resultsDiv.innerHTML = '<p>No items found.</p>';
      }
    });
  }
});

// Hamburger menu toggle
document.getElementById('hamburger').addEventListener('click', function() {
  const navUl = document.querySelector('.nav ul');
  navUl.classList.toggle('show');
});



