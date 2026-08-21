// Array holding mockup store inventory item objects
const products = [
    { id: 1, title: "Wireless Headphones", price: 59.99, image: "https://unsplash.com", desc: "High-fidelity sound headphones featuring adaptive noise cancellation software features." },
    { id: 2, title: "Smart Watch Fitness Tracker", price: 129.50, image: "https://unsplash.com", desc: "Waterproof heart rate checking wearables with built-in workout tracking system profiles." },
    { id: 3, title: "Mechanical Keyboard", price: 84.99, image: "https://unsplash.com", desc: "Tactile RGB backlit typing switches built for optimized productivity gaming configurations." },
    { id: 4, title: "Minimalist Leather Wallet", price: 24.95, image: "https://unsplash.com", desc: "Genuine slim leather pockets equipped with modern RFID blocking protection safeguards." }
];

let cart = JSON.parse(localStorage.getItem('mini_amazon_cart')) || [];
let activeProductId = null;

// Initialize components upon loading document instance
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateCartUI();
    setupEventListeners();
});

function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.title}">
            <h3 onclick="openProductModal(${p.id})">${p.title}</h3>
            <p class="price">$${p.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
}

function setupEventListeners() {
    document.getElementById('cart-toggle-btn').addEventListener('click', showCartView);
    document.getElementById('back-to-store-btn').addEventListener('click', showStoreView);
    document.getElementById('close-modal').addEventListener('click', closeModal);
    document.getElementById('clear-cart-btn').addEventListener('click', clearCart);
    
    document.getElementById('modal-add-btn').addEventListener('click', () => {
        if(activeProductId) addToCart(activeProductId);
        closeModal();
    });
}

// Shopping Cart Core Management Functions
window.addToCart = function(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem('mini_amazon_cart', JSON.stringify(cart));
    updateCartUI();
};

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
}

function showCartView() {
    document.getElementById('products-view').classList.add('hidden');
    document.getElementById('cart-view').classList.remove('hidden');
    
    const container = document.getElementById('cart-items-list');
    if (cart.length === 0) {
        container.innerHTML = "<p>Your shopping cart is currently empty.</p>";
    } else {
        container.innerHTML = cart.map((item, idx) => `
            <div class="cart-item">
                <span><strong>${item.title}</strong></span>
                <span>$${item.price.toFixed(2)}</span>
            </div>
        `).join('');
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cart-total-price').innerText = total.toFixed(2);
}

function showStoreView() {
    document.getElementById('cart-view').classList.add('hidden');
    document.getElementById('products-view').classList.remove('hidden');
}

function clearCart() {
    cart = [];
    localStorage.removeItem('mini_amazon_cart');
    updateCartUI();
    showCartView();
}

// Modal Windows View Operations
window.openProductModal = function(id) {
    const product = products.find(p => p.id === id);
    activeProductId = id;
    
    document.getElementById('modal-title').innerText = product.title;
    document.getElementById('modal-img').src = product.image;
    document.getElementById('modal-desc').innerText = product.desc;
    document.getElementById('modal-price').innerText = `$${product.price.toFixed(2)}`;
    
    document.getElementById('product-modal').classList.remove('hidden');
};

function closeModal() {
    document.getElementById('product-modal').classList.add('hidden');
    activeProductId = null;
}
