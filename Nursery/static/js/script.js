// Plant data
const plants = [
    {
        id: 1,
        name: "Monstera Deliciosa",
        category: "trees",
        price: 2499,
        description: "Beautiful tropical plant with split leaves. Perfect for indoor decoration.",
        icon: "🌿"
    },
    {
        id: 2,
        name: "Rose Bush",
        category: "flowers",
        price: 1999,
        description: "Classic red roses that bloom throughout the season.",
        icon: "🌹"
    },
    {
        id: 3,
        name: "Basil Plant",
        category: "herbs",
        price: 699,
        description: "Fresh basil for cooking. Easy to grow and maintain.",
        icon: "🌱"
    },
    {
        id: 4,
        name: "Succulent Collection",
        category: "succulents",
        price: 1599,
        description: "Set of 5 different succulents. Low maintenance and beautiful.",
        icon: "🌵"
    },
    {
        id: 5,
        name: "Sunflower Seeds",
        category: "flowers",
        price: 399,
        description: "Grow your own giant sunflowers. Perfect for gardens.",
        icon: "🌻"
    },
    {
        id: 6,
        name: "Japanese Maple",
        category: "trees",
        price: 7199,
        description: "Stunning ornamental tree with red foliage.",
        icon: "🍁"
    },
    {
        id: 7,
        name: "Lavender Plant",
        category: "herbs",
        price: 1099,
        description: "Aromatic herb with purple flowers. Great for relaxation.",
        icon: "💜"
    },
    {
        id: 8,
        name: "Jade Plant",
        category: "succulents",
        price: 1299,
        description: "Lucky plant that brings good fortune. Very easy to care for.",
        icon: "🪴"
    },
    {
        id: 9,
        name: "Tulip Bulbs",
        category: "flowers",
        price: 799,
        description: "Spring flowering bulbs in mixed colors.",
        icon: "🌷"
    },
    {
        id: 10,
        name: "Aloe Vera",
        category: "succulents",
        price: 1149,
        description: "Medicinal plant with healing properties.",
        icon: "🌿"
    },
    {
        id: 11,
        name: "Rosemary",
        category: "herbs",
        price: 899,
        description: "Fragrant herb perfect for cooking Mediterranean dishes.",
        icon: "🌿"
    },
    {
        id: 12,
        name: "Fiddle Leaf Fig",
        category: "trees",
        price: 3999,
        description: "Popular indoor tree with large, glossy leaves.",
        icon: "🌳"
    }
];

// Shopping cart
let cart = [];
let currentFilter = 'all';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    displayPlants(plants);
    updateCartDisplay();
});

// Display plants based on current filter
function displayPlants(plantsToShow) {
    const plantsGrid = document.getElementById('plantsGrid');
    plantsGrid.innerHTML = '';

    plantsToShow.forEach(plant => {
        const plantCard = createPlantCard(plant);
        plantsGrid.appendChild(plantCard);
    });
}

// Create a plant card element
function createPlantCard(plant) {
    const card = document.createElement('div');
    card.className = 'plant-card';
    card.setAttribute('data-category', plant.category);

    card.innerHTML = `
        <div class="plant-image">
            <span style="font-size: 4rem;">${plant.icon}</span>
        </div>
        <div class="plant-info">
            <h3>${plant.name}</h3>
            <p>${plant.description}</p>
            <div class="plant-price">₹${plant.price.toLocaleString('en-IN')}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${plant.id})">
                <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
        </div>
    `;

    return card;
}

// Filter plants by category
function filterPlants(category) {
    currentFilter = category;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filter and display plants
    const filteredPlants = category === 'all' 
        ? plants 
        : plants.filter(plant => plant.category === category);
    
    displayPlants(filteredPlants);
}

// Add item to cart
function addToCart(plantId) {
    const plant = plants.find(p => p.id === plantId);
    const existingItem = cart.find(item => item.id === plantId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...plant,
            quantity: 1
        });
    }

    updateCartDisplay();
    showAddToCartFeedback();
}

// Remove item from cart
function removeFromCart(plantId) {
    cart = cart.filter(item => item.id !== plantId);
    updateCartDisplay();
    updateCartModal();
}

// Update cart quantity
function updateCartQuantity(plantId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(plantId);
        return;
    }

    const item = cart.find(item => item.id === plantId);
    if (item) {
        item.quantity = newQuantity;
        updateCartDisplay();
        updateCartModal();
    }
}

// Update cart display
function updateCartDisplay() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (totalItems > 0) {
        cartCount.style.display = 'flex';
    } else {
        cartCount.style.display = 'none';
    }
}

// Show/hide cart modal
function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    const isVisible = cartModal.style.display === 'block';
    
    if (isVisible) {
        cartModal.style.display = 'none';
    } else {
        cartModal.style.display = 'block';
        updateCartModal();
    }
}

// Show/hide registration modal
function showRegisterForm() {
    const registerModal = document.getElementById('registerModal');
    registerModal.style.display = 'block';
}

function toggleRegisterForm() {
    const registerModal = document.getElementById('registerModal');
    const isVisible = registerModal.style.display === 'block';
    
    if (isVisible) {
        registerModal.style.display = 'none';
    } else {
        registerModal.style.display = 'block';
    }
}

// Submit registration form
function submitRegistration(event) {
    event.preventDefault();
    
    const formData = new FormData(document.getElementById('registerForm'));
    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    // Validate phone number (Indian format)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid Indian phone number (10 digits starting with 6-9)');
        return;
    }
    
    // Validate password match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Simulate registration success
    alert(`Welcome to Green Haven Nursery, ${fullName}!\n\nYour account has been created successfully.\nEmail: ${email}\nPhone: +91 ${phone}`);
    
    // Reset form and close modal
    document.getElementById('registerForm').reset();
    toggleRegisterForm();
}

// Show/hide login modal
function showLoginForm() {
    const loginModal = document.getElementById('loginModal');
    loginModal.style.display = 'block';
}

function toggleLoginForm() {
    const loginModal = document.getElementById('loginModal');
    const isVisible = loginModal.style.display === 'block';
    
    if (isVisible) {
        loginModal.style.display = 'none';
    } else {
        loginModal.style.display = 'block';
    }
}

// Submit login form
function submitLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(document.getElementById('loginForm'));
    const email = formData.get('loginEmail');
    const password = formData.get('loginPassword');
    
    // Simulate login validation
    if (email && password) {
        // Simulate successful login
        alert(`Welcome back!\n\nYou have successfully logged in to your Green Haven Nursery account.\nEmail: ${email}`);
        
        // Reset form and close modal
        document.getElementById('loginForm').reset();
        toggleLoginForm();
    } else {
        alert('Please enter both email and password.');
    }
}

// Switch from login to register modal
function switchToRegister() {
    toggleLoginForm();
    showRegisterForm();
}

// Show forgot password alert
function showForgotPassword() {
    alert('Password reset functionality coming soon!\n\nFor now, please contact us at +91 98765 43210 for assistance with your account.');
}

// Update cart modal content
function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">Your cart is empty</p>';
        cartTotal.textContent = '0';
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>₹${item.price.toLocaleString('en-IN')} each</p>
            </div>
            <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})" 
                            style="background: #f0f0f0; border: none; padding: 0.25rem 0.5rem; border-radius: 3px; cursor: pointer;">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})" 
                            style="background: #f0f0f0; border: none; padding: 0.25rem 0.5rem; border-radius: 3px; cursor: pointer;">+</button>
                </div>
                <span style="font-weight: bold;">₹${itemTotal.toLocaleString('en-IN')}</span>
                <button onclick="removeFromCart(${item.id})" 
                        style="background: #ff4757; color: white; border: none; padding: 0.25rem 0.5rem; border-radius: 3px; cursor: pointer;">×</button>
            </div>
        `;

        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = total.toLocaleString('en-IN');
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your order! Total: ₹${total.toLocaleString('en-IN')}\n\nYour plants will be ready for pickup in 2-3 business days.`);
    
    cart = [];
    updateCartDisplay();
    toggleCart();
}

// Scroll to plants section
function scrollToPlants() {
    document.getElementById('plants').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Show add to cart feedback
function showAddToCartFeedback() {
    // Create a temporary feedback element
    const feedback = document.createElement('div');
    feedback.textContent = 'Added to cart!';
    feedback.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4a7c59;
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(feedback);

    // Remove feedback after 2 seconds
    setTimeout(() => {
        feedback.remove();
    }, 2000);
}

// Close modals when clicking outside
document.addEventListener('click', function(event) {
    const cartModal = document.getElementById('cartModal');
    const registerModal = document.getElementById('registerModal');
    const loginModal = document.getElementById('loginModal');
    
    if (event.target === cartModal) {
        toggleCart();
    }
    
    if (event.target === registerModal) {
        toggleRegisterForm();
    }
    
    if (event.target === loginModal) {
        toggleLoginForm();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add CSS animation for feedback
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
