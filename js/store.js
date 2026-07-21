/**
 * DM SOFTWARE TECH — EMBEDDED E-COMMERCE STORE DEMO MODULE
 */

document.addEventListener('DOMContentLoaded', () => {
  const storeProductsGrid = document.getElementById('storeProductsGrid');
  const storeCategories = document.getElementById('storeCategories');
  const cartTrigger = document.getElementById('cartTrigger');
  const cartCountBadge = document.getElementById('cartCountBadge');
  const cartBackdrop = document.getElementById('cartBackdrop');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartSubtotalVal = document.getElementById('cartSubtotalVal');
  const btnCheckout = document.getElementById('btnCheckout');
  const checkoutModal = document.getElementById('checkoutModal');
  const btnCloseCheckout = document.getElementById('btnCloseCheckout');

  // --- Sample Products Data ---
  const products = [
    { id: 1, name: "Escáner de Código de Barras Inalámbrico", category: "tech", price: 48500, tag: "Tech", img: "assets/logo-brand.png" },
    { id: 2, name: "Impresora Térmica de Comprobantes 80mm", category: "tech", price: 92000, tag: "Tech", img: "assets/banner-facebook.png" },
    { id: 3, name: "Tablet Industrial PWA 10\" Rugged", category: "tech", price: 215000, tag: "Tech", img: "assets/proyecto-avicola.png" },
    { id: 4, name: "Balanza Digital Comercial 30kg RS232", category: "indus", price: 165000, tag: "Indus", img: "assets/proyecto-distribuidora.png" },
    { id: 5, name: "Lector RFID Portátil para Depósito", category: "indus", price: 180000, tag: "Indus", img: "assets/logo-brand.png" },
    { id: 6, name: "Cajón de Dinero Automático de Acero", category: "office", price: 54000, tag: "Oficina", img: "assets/banner-facebook.png" },
    { id: 7, name: "Bobina de Papel Térmico 80x50mm (Pack x 10)", category: "office", price: 14500, tag: "Oficina", img: "assets/favicon.png" },
    { id: 8, name: "Servidor VPS Integrado Local Docker", category: "tech", price: 350000, tag: "Tech", img: "assets/logo-brand.png" }
  ];

  let cart = [
    { id: 1, name: "Escáner de Código de Barras Inalámbrico", price: 48500, qty: 1, img: "assets/logo-brand.png" }
  ];

  // --- Render Store Products ---
  function renderProducts(catFilter = 'all') {
    if (!storeProductsGrid) return;

    const filtered = catFilter === 'all'
      ? products
      : products.filter(p => p.category === catFilter);

    storeProductsGrid.innerHTML = filtered.map(p => `
      <div class="product-card">
        <div class="product-img-wrapper">
          <img src="${p.img}" alt="${p.name}" class="product-card-img">
        </div>
        <div class="product-card-body">
          <span class="product-category-tag">${p.tag}</span>
          <h4 class="product-title">${p.name}</h4>
          <div class="product-card-footer">
            <div class="product-price">$${p.price.toLocaleString('es-AR')}</div>
            <button class="btn-add-cart" data-id="${p.id}">
              <span>+ Agregar</span>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach Add to Cart event listeners
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(btn.getAttribute('data-id'));
        addToCart(id);
      });
    });
  }

  // --- Category Filter Tabs ---
  if (storeCategories) {
    storeCategories.querySelectorAll('.category-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        storeCategories.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const cat = pill.getAttribute('data-cat');
        renderProducts(cat);
      });
    });
  }

  // --- Cart Core Functions ---
  function addToCart(productId) {
    const item = products.find(p => p.id === productId);
    if (!item) return;

    const existing = cart.find(c => c.id === productId);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id: item.id, name: item.name, price: item.price, qty: 1, img: item.img });
    }

    updateCartUI();
    openCart();
  }

  function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    if (cartCountBadge) cartCountBadge.textContent = totalCount;
    if (cartSubtotalVal) cartSubtotalVal.textContent = `$${subtotal.toLocaleString('es-AR')}`;

    if (cartItemsList) {
      if (cart.length === 0) {
        cartItemsList.innerHTML = `<p style="text-align:center; color:var(--text-tertiary); padding:40px 0;">Tu carrito está vacío.</p>`;
      } else {
        cartItemsList.innerHTML = cart.map(item => `
          <div class="cart-item">
            <img src="${item.img}" class="cart-item-img" alt="${item.name}">
            <div class="cart-item-info">
              <div class="cart-item-title">${item.name}</div>
              <div class="cart-item-price">$${item.price.toLocaleString('es-AR')}</div>
            </div>
            <div class="cart-qty-controls">
              <button class="cart-qty-btn decrease-qty" data-id="${item.id}">-</button>
              <span style="font-size:0.85rem; font-weight:700;">${item.qty}</span>
              <button class="cart-qty-btn increase-qty" data-id="${item.id}">+</button>
            </div>
          </div>
        `).join('');

        // Attach Quantity Event Listeners
        document.querySelectorAll('.increase-qty').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            const cartItem = cart.find(c => c.id === id);
            if (cartItem) { cartItem.qty++; updateCartUI(); }
          });
        });

        document.querySelectorAll('.decrease-qty').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            const cartItem = cart.find(c => c.id === id);
            if (cartItem) {
              cartItem.qty--;
              if (cartItem.qty <= 0) {
                cart = cart.filter(c => c.id !== id);
              }
              updateCartUI();
            }
          });
        });
      }
    }
  }

  // --- Cart Drawer Visibility ---
  const openCart = () => cartBackdrop?.classList.add('active');
  const closeCart = () => cartBackdrop?.classList.remove('active');

  cartTrigger?.addEventListener('click', openCart);
  closeCartBtn?.addEventListener('click', closeCart);

  cartBackdrop?.addEventListener('click', (e) => {
    if (e.target === cartBackdrop) closeCart();
  });

  // --- Checkout Simulation ---
  btnCheckout?.addEventListener('click', () => {
    if (cart.length === 0) return;
    closeCart();
    checkoutModal?.classList.add('active');
  });

  btnCloseCheckout?.addEventListener('click', () => {
    checkoutModal?.classList.remove('active');
    cart = [];
    updateCartUI();
  });

  // Initial Load
  renderProducts();
  updateCartUI();
});
