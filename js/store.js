/**
 * DM SOFTWARE TECH — EMBEDDED E-COMMERCE STORE DEMO MODULE
 * Uses custom vector SVG hardware illustrations for clean, professional look
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

  // --- SVG Vector Hardware Icons ---
  const svgIcons = {
    scanner: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="svg-hardware-icon"><path d="M12 18h40v28H12z" stroke="#38BDF8"/><path d="M20 26v12M28 26v12M34 26v12M40 26v12M44 26v12" stroke="#2563EB"/><line x1="8" y1="32" x2="56" y2="32" stroke="#EF4444" stroke-width="2" stroke-dasharray="4 2"/></svg>`,
    printer: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="svg-hardware-icon"><path d="M16 20h32v12H16z" stroke="#38BDF8"/><path d="M12 32h40v18H12z" stroke="#2563EB"/><path d="M20 40h24v16H20z" fill="rgba(37,99,235,0.2)" stroke="#38BDF8"/><circle cx="20" cy="38" r="2" fill="#22C55E"/></svg>`,
    tablet: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="svg-hardware-icon"><rect x="10" y="14" width="44" height="36" rx="4" stroke="#38BDF8"/><path d="M16 22h32v20H16z" fill="rgba(37,99,235,0.2)" stroke="#2563EB"/><line x1="22" y1="36" x2="30" y2="28" stroke="#38BDF8"/><line x1="30" y1="28" x2="36" y2="32" stroke="#38BDF8"/><line x1="36" y1="32" x2="42" y2="24" stroke="#38BDF8"/></svg>`,
    scale: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="svg-hardware-icon"><rect x="12" y="40" width="40" height="12" rx="2" stroke="#2563EB"/><path d="M8 30h48l-6 10H14z" fill="rgba(56,189,248,0.2)" stroke="#38BDF8"/><rect x="22" y="16" width="20" height="14" rx="2" stroke="#38BDF8"/><text x="32" y="26" font-size="8" font-weight="bold" fill="#22C55E" text-anchor="middle">30.00</text></svg>`,
    rfid: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="svg-hardware-icon"><rect x="22" y="12" width="20" height="40" rx="4" stroke="#38BDF8"/><rect x="26" y="18" width="12" height="14" fill="rgba(37,99,235,0.2)" stroke="#2563EB"/><path d="M14 24a16 16 0 0 1 0 16M50 24a16 16 0 0 1 0 16" stroke="#38BDF8"/><path d="M10 20a22 22 0 0 1 0 24M54 20a22 22 0 0 1 0 24" stroke="#2563EB"/></svg>`,
    drawer: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="svg-hardware-icon"><rect x="8" y="16" width="48" height="32" rx="4" stroke="#38BDF8"/><line x1="8" y1="32" x2="56" y2="32" stroke="#2563EB"/><circle cx="32" cy="40" r="3" fill="#F59E0B"/><path d="M20 24h24" stroke="#38BDF8"/></svg>`,
    paper: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="svg-hardware-icon"><ellipse cx="24" cy="24" rx="12" ry="6" stroke="#38BDF8"/><path d="M12 24v20c0 3.3 5.4 6 12 6s12-2.7 12-6V24" stroke="#2563EB"/><ellipse cx="42" cy="18" rx="10" ry="5" stroke="#38BDF8"/><path d="M32 18v16c0 2.8 4.5 5 10 5s10-2.2 10-5V18" stroke="#2563EB"/></svg>`,
    server: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="svg-hardware-icon"><rect x="12" y="12" width="40" height="12" rx="2" stroke="#38BDF8"/><rect x="12" y="28" width="40" height="12" rx="2" stroke="#2563EB"/><rect x="12" y="44" width="40" height="12" rx="2" stroke="#38BDF8"/><circle cx="20" cy="18" r="1.5" fill="#22C55E"/><circle cx="20" cy="34" r="1.5" fill="#22C55E"/><circle cx="20" cy="50" r="1.5" fill="#22C55E"/></svg>`
  };

  // --- Sample Products Data with Custom SVG Icons ---
  const products = [
    { id: 1, name: "Escáner de Código de Barras Inalámbrico", category: "tech", price: 48500, tag: "Tech", svg: svgIcons.scanner },
    { id: 2, name: "Impresora Térmica de Comprobantes 80mm", category: "tech", price: 92000, tag: "Tech", svg: svgIcons.printer },
    { id: 3, name: "Tablet Industrial PWA 10\" Rugged", category: "tech", price: 215000, tag: "Tech", svg: svgIcons.tablet },
    { id: 4, name: "Balanza Digital Comercial 30kg RS232", category: "indus", price: 165000, tag: "Indus", svg: svgIcons.scale },
    { id: 5, name: "Lector RFID Portátil para Depósito", category: "indus", price: 180000, tag: "Indus", svg: svgIcons.rfid },
    { id: 6, name: "Cajón de Dinero Automático de Acero", category: "office", price: 54000, tag: "Oficina", svg: svgIcons.drawer },
    { id: 7, name: "Bobina de Papel Térmico 80x50mm (Pack x 10)", category: "office", price: 14500, tag: "Oficina", svg: svgIcons.paper },
    { id: 8, name: "Servidor VPS Integrado Local Docker", category: "tech", price: 350000, tag: "Tech", svg: svgIcons.server }
  ];

  let cart = [
    { id: 1, name: "Escáner de Código de Barras Inalámbrico", price: 48500, qty: 1, svg: svgIcons.scanner }
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
          ${p.svg}
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
      btn.addEventListener('click', () => {
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
      cart.push({ id: item.id, name: item.name, price: item.price, qty: 1, svg: item.svg });
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
            <div style="width:40px; height:40px; flex-shrink:0; display:flex; align-items:center; justify-content:center;">
              ${item.svg}
            </div>
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
