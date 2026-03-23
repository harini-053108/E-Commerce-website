// ========================================
// ITALIAN PIZZA - JAVASCRIPT FUNCTIONALITY
// ========================================

// ========================================
// PIZZA DATA
// ========================================
const pizzaData = [
    // Veg Pizzas
    {
        id: 1,
        name: "Margherita",
        category: "veg",
        description: "Classic Italian pizza with tomato sauce, mozzarella cheese, and fresh basil",
        price: 299,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop",
        featured: true
    },
    {
        id: 2,
        name: "Veggie Supreme",
        category: "veg",
        description: "Loaded with bell peppers, onions, mushrooms, olives, and tomatoes",
        price: 349,
        image: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=400&fit=crop",
        featured: true
    },
    {
        id: 3,
        name: "Paneer Tikka",
        category: "veg",
        description: "Spicy paneer tikka with onions, peppers, and special tikka sauce",
        price: 379,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=400&fit=crop",
        featured: false
    },
    {
        id: 4,
        name: "Corn & Cheese",
        category: "veg",
        description: "Sweet corn kernels with extra mozzarella cheese",
        price: 329,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop",
        featured: false
    },
    {
        id: 5,
        name: "Garden Fresh",
        category: "veg",
        description: "Fresh vegetables with herbs and Italian seasonings",
        price: 359,
        image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=400&fit=crop",
        featured: false
    },

    // Non-Veg Pizzas
    {
        id: 6,
        name: "Chicken Supreme",
        category: "non-veg",
        description: "Grilled chicken, peppers, onions with BBQ sauce",
        price: 429,
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=400&fit=crop",
        featured: true
    },
    {
        id: 7,
        name: "Pepperoni Classic",
        category: "non-veg",
        description: "Loaded with pepperoni slices and extra cheese",
        price: 449,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=400&fit=crop",
        featured: false
    },
    {
        id: 8,
        name: "Chicken Tikka",
        category: "non-veg",
        description: "Tandoori chicken with onions and special tikka masala sauce",
        price: 459,
        image: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=400&fit=crop",
        featured: true
    },
    {
        id: 9,
        name: "Meat Lovers",
        category: "non-veg",
        description: "Chicken, pepperoni, sausage with extra cheese",
        price: 499,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop",
        featured: false
    },

    // Special Italian Pizzas
    {
        id: 10,
        name: "Quattro Formaggi",
        category: "special",
        description: "Four cheese blend: mozzarella, parmesan, gorgonzola, and ricotta",
        price: 529,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop",
        featured: true
    },
    {
        id: 11,
        name: "Prosciutto e Funghi",
        category: "special",
        description: "Italian ham with fresh mushrooms and truffle oil",
        price: 549,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop",
        featured: false
    },
    {
        id: 12,
        name: "Capricciosa",
        category: "special",
        description: "Ham, mushrooms, artichokes, and olives",
        price: 539,
        image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=400&fit=crop",
        featured: false
    },

    // Combo Offers
    {
        id: 13,
        name: "Family Combo",
        category: "combo",
        description: "2 Large Pizzas + Garlic Bread + 1.5L Coke",
        price: 899,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop",
        featured: true
    },
    {
        id: 14,
        name: "Party Pack",
        category: "combo",
        description: "3 Medium Pizzas + 2 Sides + 2L Pepsi",
        price: 1199,
        image: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=400&fit=crop",
        featured: false
    }
];

// ========================================
// GLOBAL VARIABLES
// ========================================
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentPizza = null;
let appliedCoupon = null;

// Coupon Codes
const coupons = {
    'WEEKEND50': { type: 'percentage', value: 50, minOrder: 500 },
    'BOGO': { type: 'bogo', value: 0, minOrder: 400 },
    'FIRST100': { type: 'fixed', value: 100, minOrder: 500 }
};

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Update cart count
    updateCartCount();
    
    // Load page-specific content
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === '' || currentPage === 'index.html') {
        loadFeaturedPizzas();
    } else if (currentPage === 'menu.html') {
        loadMenuPizzas();
        initCategoryFilter();
        initCustomizationModal();
    } else if (currentPage === 'cart.html') {
        loadCartItems();
        initCartFunctionality();
    }
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});

// ========================================
// THEME FUNCTIONALITY
// ========================================
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// ========================================
// CART MANAGEMENT
// ========================================
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}


function addToCart(item) {
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(cartItem => 
        cartItem.id === item.id && 
        cartItem.size === item.size && 
        JSON.stringify(cartItem.toppings) === JSON.stringify(item.toppings)
    );
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += item.quantity;
    } else {
        cart.push(item);
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show success message
    showNotification('Item added to cart successfully!');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    updateCartCount();
    showNotification('Item removed from cart');
}

function updateCartItemQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            removeFromCart(index);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCartItems();
            updateCartCount();
        }
    }
}

// ========================================
// LOAD PIZZAS
// ========================================
function loadFeaturedPizzas() {
    const container = document.getElementById('featuredPizzas');
    if (!container) return;
    
    const featuredPizzas = pizzaData.filter(pizza => pizza.featured);
    
    container.innerHTML = featuredPizzas.map(pizza => createPizzaCard(pizza)).join('');
}

function loadMenuPizzas(category = 'all') {
    const container = document.getElementById('menuItems');
    if (!container) return;
    
    const filteredPizzas = category === 'all' 
        ? pizzaData 
        : pizzaData.filter(pizza => pizza.category === category);
    
    container.innerHTML = filteredPizzas.map(pizza => createPizzaCard(pizza, true)).join('');
}

function createPizzaCard(pizza, showCustomize = false) {
    const badgeClass = pizza.category === 'veg' ? 'veg-badge' : 
                      pizza.category === 'non-veg' ? 'non-veg-badge' : 
                      'pizza-badge';
    
    const badgeText = pizza.category === 'veg' ? 'VEG' : 
                     pizza.category === 'non-veg' ? 'NON-VEG' : 
                     pizza.category === 'special' ? 'SPECIAL' : 'COMBO';
    
    return `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="pizza-card">
                <div style="position: relative;">
                    <img src="${pizza.image}" alt="${pizza.name}" class="pizza-image">
                    <span class="pizza-badge ${badgeClass}">${badgeText}</span>
                </div>
                <h3 class="pizza-name">${pizza.name}</h3>
                <p class="pizza-desc">${pizza.description}</p>
                <div class="pizza-price">₹${pizza.price}</div>
                ${showCustomize ? 
                    `<button class="btn btn-primary" onclick="openCustomizeModal(${pizza.id})">
                        <i class="fas fa-plus"></i> Customize & Add
                    </button>` :
                    `<a href="menu.html" class="btn btn-primary">Order Now</a>`
                }
            </div>
        </div>
    `;
}

// ========================================
// CATEGORY FILTER
// ========================================
function initCategoryFilter() {
    const categoryButtons = document.querySelectorAll('.btn-category');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter pizzas
            const category = this.getAttribute('data-category');
            loadMenuPizzas(category);
        });
    });
}

// ========================================
// CUSTOMIZATION MODAL
// ========================================
function initCustomizationModal() {
    const modal = document.getElementById('customizeModal');
    if (!modal) return;
    
    // Quantity controls
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    const quantityInput = document.getElementById('modalQuantity');
    
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', () => {
            let qty = parseInt(quantityInput.value);
            if (qty > 1) {
                quantityInput.value = qty - 1;
                updateModalPrice();
            }
        });
    }
    
    if (increaseBtn) {
        increaseBtn.addEventListener('click', () => {
            let qty = parseInt(quantityInput.value);
            if (qty < 10) {
                quantityInput.value = qty + 1;
                updateModalPrice();
            }
        });
    }
    
    // Size and topping change listeners
    const sizeInputs = document.querySelectorAll('input[name="size"]');
    const toppingInputs = document.querySelectorAll('.topping-check');
    
    sizeInputs.forEach(input => {
        input.addEventListener('change', updateModalPrice);
    });
    
    toppingInputs.forEach(input => {
        input.addEventListener('change', updateModalPrice);
    });
    
    // Add to cart button
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', addCustomizedPizzaToCart);
    }
}

function openCustomizeModal(pizzaId) {
    currentPizza = pizzaData.find(p => p.id === pizzaId);
    if (!currentPizza) return;
    
    // Update modal content
    document.getElementById('modalPizzaImage').src = currentPizza.image;
    document.getElementById('modalPizzaName').textContent = currentPizza.name;
    document.getElementById('modalPizzaDesc').textContent = currentPizza.description;
    
    // Reset form
    document.getElementById('modalQuantity').value = 1;
    document.getElementById('sizeMedium').checked = true;
    
    const toppingInputs = document.querySelectorAll('.topping-check');
    toppingInputs.forEach(input => input.checked = false);
    
    // Update price
    updateModalPrice();
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('customizeModal'));
    modal.show();
}

function updateModalPrice() {
    if (!currentPizza) return;
    
    let basePrice = currentPizza.price;
    
    // Get size price
    const selectedSize = document.querySelector('input[name="size"]:checked');
    const sizePrice = selectedSize ? parseInt(selectedSize.getAttribute('data-price')) : 0;
    
    // Get toppings price
    let toppingsPrice = 0;
    const selectedToppings = document.querySelectorAll('.topping-check:checked');
    selectedToppings.forEach(topping => {
        toppingsPrice += parseInt(topping.getAttribute('data-price'));
    });
    
    // Get quantity
    const quantity = parseInt(document.getElementById('modalQuantity').value);
    
    // Calculate total
    const totalPrice = (basePrice + sizePrice + toppingsPrice) * quantity;
    
    // Update display
    document.getElementById('modalTotalPrice').textContent = '₹' + totalPrice;
}

function addCustomizedPizzaToCart() {
    if (!currentPizza) return;
    
    // Get selected options
    const selectedSize = document.querySelector('input[name="size"]:checked');
    const size = selectedSize ? selectedSize.value : 'medium';
    const sizePrice = selectedSize ? parseInt(selectedSize.getAttribute('data-price')) : 0;
    
    const selectedToppings = Array.from(document.querySelectorAll('.topping-check:checked'))
        .map(topping => ({
            name: topping.value,
            price: parseInt(topping.getAttribute('data-price'))
        }));
    
    const quantity = parseInt(document.getElementById('modalQuantity').value);
    
    // Calculate price
    const toppingsPrice = selectedToppings.reduce((sum, t) => sum + t.price, 0);
    const unitPrice = currentPizza.price + sizePrice + toppingsPrice;
    
    // Create cart item
    const cartItem = {
        id: currentPizza.id,
        name: currentPizza.name,
        image: currentPizza.image,
        basePrice: currentPizza.price,
        size: size,
        sizePrice: sizePrice,
        toppings: selectedToppings,
        quantity: quantity,
        unitPrice: unitPrice,
        totalPrice: unitPrice * quantity
    };
    
    // Add to cart
    addToCart(cartItem);
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('customizeModal'));
    modal.hide();
}

// ========================================
// CART PAGE FUNCTIONALITY
// ========================================
function loadCartItems() {
    const container = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    
    if (!container) return;
    
    if (cart.length === 0) {
        container.style.display = 'none';
        emptyCart.style.display = 'block';
    } else {
        container.style.display = 'block';
        emptyCart.style.display = 'none';
        
        container.innerHTML = cart.map((item, index) => createCartItemCard(item, index)).join('');
    }
    
    updateCartSummary();
}

function createCartItemCard(item, index) {
    const toppingsText = item.toppings && item.toppings.length > 0 
        ? item.toppings.map(t => t.name).join(', ') 
        : 'No extra toppings';
    
    return `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h5 class="cart-item-name">${item.name}</h5>
                <div class="cart-item-customization">
                    <small><strong>Size:</strong> ${item.size.charAt(0).toUpperCase() + item.size.slice(1)}</small><br>
                    <small><strong>Toppings:</strong> ${toppingsText}</small>
                </div>
                <div class="cart-item-price">₹${item.unitPrice} × ${item.quantity}</div>
            </div>
            <div class="d-flex flex-column align-items-center gap-2">
                <div class="cart-quantity-control">
                    <button onclick="updateCartItemQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateCartItemQuantity(${index}, 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    let discount = 0;
    
    // Apply coupon discount
    if (appliedCoupon) {
        const coupon = coupons[appliedCoupon];
        if (coupon.type === 'percentage') {
            discount = (subtotal * coupon.value) / 100;
        } else if (coupon.type === 'fixed') {
            discount = coupon.value;
        } else if (coupon.type === 'bogo') {
            // Buy One Get One - 50% off on total
            discount = subtotal * 0.5;
        }
    }
    
    const deliveryFee = subtotal > 0 ? 40 : 0;
    const tax = ((subtotal - discount) * 0.05);
    const total = subtotal - discount + deliveryFee + tax;
    
    // Update UI
    document.getElementById('subtotal').textContent = '₹' + subtotal.toFixed(0);
    document.getElementById('deliveryFee').textContent = '₹' + deliveryFee;
    document.getElementById('tax').textContent = '₹' + tax.toFixed(0);
    document.getElementById('totalPrice').textContent = '₹' + total.toFixed(0);
    
    if (discount > 0) {
        document.getElementById('discountRow').style.display = 'flex';
        document.getElementById('discount').textContent = '-₹' + discount.toFixed(0);
    } else {
        document.getElementById('discountRow').style.display = 'none';
    }
}
function initSearch() {
    const searchBar = document.getElementById('pizzaSearch');
    if (!searchBar) return;

    searchBar.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        
        // Filter from the global pizzaData
        const filteredPizzas = pizzaData.filter(pizza => 
            pizza.name.toLowerCase().includes(term) || 
            pizza.description.toLowerCase().includes(term)
        );

        const container = document.getElementById('menuItems');
        if (filteredPizzas.length > 0) {
            container.innerHTML = filteredPizzas.map(pizza => createPizzaCard(pizza, true)).join('');
        } else {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-pizza-slice fa-3x mb-3 text-muted"></i>
                    <p class="text-light">Sorry, no pizzas match your search!</p>
                </div>`;
        }
    });
}

function initCartFunctionality() {
    // Coupon functionality
    const applyCouponBtn = document.getElementById('applyCoupon');
    if (applyCouponBtn) {
        applyCouponBtn.addEventListener('click', applyCouponCode);
    }
    
    // Coupon tag clicks
    const couponTags = document.querySelectorAll('.coupon-tag');
    couponTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const code = this.getAttribute('data-code');
            document.getElementById('couponCode').value = code;
            applyCouponCode();
        });
    });
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', openCheckoutModal);
    }
    
    // Checkout form
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
}

function applyCouponCode() {
    const couponInput = document.getElementById('couponCode');
    const couponMessage = document.getElementById('couponMessage');
    const code = couponInput.value.trim().toUpperCase();
    
    if (!code) {
        couponMessage.innerHTML = '<small class="text-danger">Please enter a coupon code</small>';
        return;
    }
    
    const coupon = coupons[code];
    
    if (!coupon) {
        couponMessage.innerHTML = '<small class="text-danger">Invalid coupon code</small>';
        appliedCoupon = null;
        updateCartSummary();
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    
    if (subtotal < coupon.minOrder) {
        couponMessage.innerHTML = `<small class="text-warning">Minimum order of ₹${coupon.minOrder} required</small>`;
        appliedCoupon = null;
        updateCartSummary();
        return;
    }
    
    appliedCoupon = code;
    updateCartSummary();
    
    let discountText = '';
    if (coupon.type === 'percentage') {
        discountText = `${coupon.value}% off`;
    } else if (coupon.type === 'fixed') {
        discountText = `₹${coupon.value} off`;
    } else if (coupon.type === 'bogo') {
        discountText = 'Buy 1 Get 1 Free';
    }
    
    couponMessage.innerHTML = `<small class="text-success">✓ Coupon applied: ${discountText}</small>`;
}

function openCheckoutModal() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    // Update checkout summary
    const summaryContainer = document.getElementById('checkoutSummaryItems');
    const totalElement = document.getElementById('checkoutTotal');
    
    const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    let discount = 0;
    
    if (appliedCoupon) {
        const coupon = coupons[appliedCoupon];
        if (coupon.type === 'percentage') {
            discount = (subtotal * coupon.value) / 100;
        } else if (coupon.type === 'fixed') {
            discount = coupon.value;
        } else if (coupon.type === 'bogo') {
            discount = subtotal * 0.5;
        }
    }
    
    const deliveryFee = 40;
    const tax = ((subtotal - discount) * 0.05);
    const total = subtotal - discount + deliveryFee + tax;
    
    summaryContainer.innerHTML = cart.map(item => `
        <div class="summary-item">
            <span>${item.name} (${item.size}) × ${item.quantity}</span>
            <span>₹${item.totalPrice}</span>
        </div>
    `).join('');
    
    totalElement.textContent = '₹' + total.toFixed(0);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    modal.show();
}

function handleCheckout(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('customerName').value,
        phone: document.getElementById('customerPhone').value,
        email: document.getElementById('customerEmail').value,
        address: document.getElementById('customerAddress').value,
        city: document.getElementById('customerCity').value,
        pincode: document.getElementById('customerPincode').value,
        paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
        specialInstructions: document.getElementById('specialInstructions').value
    };
    
    // Generate order ID
    const orderId = 'ORD' + Date.now();
    
    // Store order (in real app, send to backend)
    const order = {
        orderId: orderId,
        items: cart,
        customer: formData,
        total: document.getElementById('checkoutTotal').textContent,
        date: new Date().toISOString()
    };
    
    // Clear cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    appliedCoupon = null;
    
    // Close checkout modal
    const checkoutModal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
    checkoutModal.hide();
    
    // Show success modal
    document.getElementById('orderId').textContent = orderId;
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
    
    // Update cart count
    updateCartCount();
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'alert alert-success';
    notification.style.position = 'fixed';
    notification.style.top = '100px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.minWidth = '250px';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i> ${message}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    updateCartCount();
    
    // Page-specific calls
    if (currentPage === 'menu.html') {
        loadMenuPizzas();
        initCategoryFilter();
        initCustomizationModal();
        initSearch(); // <--- Inga add pannu
    }
    // ... rest of your code
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});