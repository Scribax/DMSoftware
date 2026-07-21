/**
 * DM SOFTWARE TECH — FULLY INTERACTIVE SYSTEM DEMO ENGINE
 * State management, live transaction creation, receipt modal, search filters
 */

document.addEventListener('DOMContentLoaded', () => {
  const demoModal = document.getElementById('demoModal');
  const demoMainCanvas = document.getElementById('demoMainCanvas');
  const openDemoBtns = document.querySelectorAll('.open-demo-btn');
  const closeDemoBtn = document.getElementById('closeDemoBtn');
  const closeDemoDot = document.getElementById('closeDemoDot');

  // --- Reactive System State ---
  const state = {
    currentView: 'dashboard',
    todayRevenue: 845200,
    activeClientsCount: 142,
    sales: [
      { id: 'REM-4821', time: '09:42', client: 'Supermercado El Sol', items: '12 cajones Huevos XL', total: 145000, pay: 'Transferencia', status: 'Pagada', bg: 'success' },
      { id: 'REM-4820', time: '09:15', client: 'Granja San Rafael', items: '8 cajones Huevos L', total: 89500, pay: 'Efectivo', status: 'Pagada', bg: 'success' },
      { id: 'REM-4819', time: '08:30', client: 'Distribuidora Cuyo', items: '45 bultos Lácteos', total: 230000, pay: 'Cuenta Corriente', status: 'Pendiente', bg: 'warning' },
      { id: 'REM-4818', time: '08:05', client: 'Minimarket Central', items: '4 hormas Queso Tybo', total: 42000, pay: 'MercadoPago', status: 'Pagada', bg: 'success' }
    ],
    clients: [
      { name: 'Supermercado El Sol', cuit: '30-71234567-8', phone: '2604-554433', balance: 0, status: 'Al día' },
      { name: 'Distribuidora Cuyo', cuit: '30-68912345-2', phone: '2604-112233', balance: 230000, status: 'Pendiente' },
      { name: 'Panadería La Unión', cuit: '27-34567890-1', phone: '2604-998877', balance: 0, status: 'Al día' },
      { name: 'Minimarket Central', cuit: '30-55443322-9', phone: '2604-667788', balance: 0, status: 'Al día' }
    ],
    products: [
      { code: 'PRD-001', name: 'Cajón Huevos XL (30 docenas)', category: 'Avícola', cost: 18500, price: 24000, stock: 145, minStock: 20 },
      { code: 'PRD-002', name: 'Cajón Huevos L (30 docenas)', category: 'Avícola', cost: 16000, price: 21500, stock: 8, minStock: 20 },
      { code: 'PRD-003', name: 'Queso Tybo Horma x 4kg', category: 'Lácteos', cost: 22000, price: 29000, stock: 32, minStock: 10 },
      { code: 'PRD-004', name: 'Jamón Cocido Lomo x kg', category: 'Fiambres', cost: 6500, price: 9200, stock: 2, minStock: 10 }
    ]
  };

  // --- Open & Close Handlers ---
  const openDemo = () => {
    demoModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderCurrentView();
  };

  const closeDemo = () => {
    demoModal?.classList.remove('active');
    document.body.style.overflow = '';
  };

  openDemoBtns.forEach(btn => btn.addEventListener('click', openDemo));
  closeDemoBtn?.addEventListener('click', closeDemo);
  closeDemoDot?.addEventListener('click', closeDemo);

  demoModal?.addEventListener('click', (e) => {
    if (e.target === demoModal) closeDemo();
  });

  // --- Sidebar Navigation ---
  const navItems = document.querySelectorAll('.demo-nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      state.currentView = item.getAttribute('data-view');
      renderCurrentView();
    });
  });

  // --- Main View Renderer ---
  function renderCurrentView() {
    if (!demoMainCanvas) return;

    switch (state.currentView) {
      case 'dashboard':
        demoMainCanvas.innerHTML = renderDashboardView();
        break;
      case 'ventas':
        demoMainCanvas.innerHTML = renderVentasView();
        break;
      case 'clientes':
        demoMainCanvas.innerHTML = renderClientesView();
        break;
      case 'productos':
        demoMainCanvas.innerHTML = renderProductosView();
        break;
      case 'stock':
        demoMainCanvas.innerHTML = renderStockView();
        break;
      case 'compras':
        demoMainCanvas.innerHTML = renderComprasView();
        break;
      case 'reportes':
        demoMainCanvas.innerHTML = renderReportesView();
        break;
      case 'config':
        demoMainCanvas.innerHTML = renderConfigView();
        break;
      default:
        demoMainCanvas.innerHTML = renderDashboardView();
    }

    attachViewEvents();
  }

  // --- View HTML Generators ---
  function renderDashboardView() {
    const lowStockCount = state.products.filter(p => p.stock <= p.minStock).length;

    return `
      <div class="demo-canvas-header">
        <div class="demo-canvas-title">
          <h2>Panel Principal de Control</h2>
          <p>Resumen operacional interactivo — Sistema DM ERP Live</p>
        </div>
        <div class="demo-actions-bar">
          <button class="btn btn-primary action-new-sale" style="padding:8px 16px; font-size:0.82rem;">⚡ + Nueva Venta / Remito</button>
        </div>
      </div>

      <!-- KPI Grid -->
      <div class="demo-kpi-grid">
        <div class="demo-kpi-card">
          <div class="demo-kpi-top"><span>Ventas Hoy</span><div class="demo-kpi-icon">💰</div></div>
          <div class="demo-kpi-val">$${state.todayRevenue.toLocaleString('es-AR')}</div>
          <div class="demo-kpi-trend up">▲ +18.4% vs ayer</div>
        </div>

        <div class="demo-kpi-card">
          <div class="demo-kpi-top"><span>Clientes Activos</span><div class="demo-kpi-icon">👥</div></div>
          <div class="demo-kpi-val">${state.clients.length}</div>
          <div class="demo-kpi-trend up">▲ Cuentas al día</div>
        </div>

        <div class="demo-kpi-card">
          <div class="demo-kpi-top"><span>Stock Alerta Min.</span><div class="demo-kpi-icon">⚠️</div></div>
          <div class="demo-kpi-val">${lowStockCount} Prod.</div>
          <div class="demo-kpi-trend down">▼ Reponer urgente</div>
        </div>

        <div class="demo-kpi-card">
          <div class="demo-kpi-top"><span>Ganancia Estimada</span><div class="demo-kpi-icon">📈</div></div>
          <div class="demo-kpi-val">$3.120.000</div>
          <div class="demo-kpi-trend up">▲ Margen 28%</div>
        </div>
      </div>

      <!-- Charts & Widgets Grid -->
      <div class="demo-charts-grid">
        <div class="demo-widget-card">
          <div class="demo-widget-header">
            <h3>Ventas Semanales ($ ARS)</h3>
            <span style="font-size:0.75rem; color:var(--text-tertiary);">Últimos 7 días</span>
          </div>
          <div class="demo-chart-container">
            <div class="demo-bar-chart">
              <div class="demo-bar-col"><div class="demo-bar-fill" style="height:45%;"></div><span class="demo-bar-label">Lun</span></div>
              <div class="demo-bar-col"><div class="demo-bar-fill" style="height:65%;"></div><span class="demo-bar-label">Mar</span></div>
              <div class="demo-bar-col"><div class="demo-bar-fill" style="height:85%;"></div><span class="demo-bar-label">Mié</span></div>
              <div class="demo-bar-col"><div class="demo-bar-fill" style="height:50%;"></div><span class="demo-bar-label">Jue</span></div>
              <div class="demo-bar-col"><div class="demo-bar-fill" style="height:95%;"></div><span class="demo-bar-label">Vie</span></div>
              <div class="demo-bar-col"><div class="demo-bar-fill" style="height:70%;"></div><span class="demo-bar-label">Sáb</span></div>
              <div class="demo-bar-col"><div class="demo-bar-fill" style="height:30%;"></div><span class="demo-bar-label">Dom</span></div>
            </div>
          </div>
        </div>

        <div class="demo-widget-card">
          <div class="demo-widget-header">
            <h3>Top Categorías Vendidas</h3>
            <span style="font-size:0.75rem; color:var(--text-tertiary);">Mes Actual</span>
          </div>
          <div style="display:flex; flex-direction:column; gap:12px; font-size:0.85rem;">
            <div>
              <div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>Bebidas & Lácteos</span><strong>45%</strong></div>
              <div style="height:6px; background:var(--bg-hover); border-radius:3px; overflow:hidden;"><div style="width:45%; height:100%; background:var(--accent);"></div></div>
            </div>
            <div>
              <div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>Fiambres & Embutidos</span><strong>30%</strong></div>
              <div style="height:6px; background:var(--bg-hover); border-radius:3px; overflow:hidden;"><div style="width:30%; height:100%; background:var(--info);"></div></div>
            </div>
            <div>
              <div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>Almacén General</span><strong>25%</strong></div>
              <div style="height:6px; background:var(--bg-hover); border-radius:3px; overflow:hidden;"><div style="width:25%; height:100%; background:var(--warning);"></div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Transactions Table -->
      <div class="demo-widget-card">
        <div class="demo-widget-header">
          <h3>Últimas Transacciones Registradas</h3>
          <button class="btn btn-ghost action-new-sale" style="font-size:0.78rem; padding:4px 10px;">+ Emitir Venta</button>
        </div>
        <div class="demo-table-wrapper">
          <table class="demo-table">
            <thead>
              <tr>
                <th>N° Remito</th>
                <th>Hora</th>
                <th>Cliente</th>
                <th>Detalle Items</th>
                <th>Monto</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              ${state.sales.map(s => `
                <tr>
                  <td><strong>#${s.id}</strong></td>
                  <td>${s.time} hs</td>
                  <td>${s.client}</td>
                  <td>${s.items}</td>
                  <td><strong>$${s.total.toLocaleString('es-AR')}</strong></td>
                  <td><span class="badge-status ${s.bg}">● ${s.status}</span></td>
                  <td><button class="btn btn-ghost btn-view-receipt" data-id="${s.id}" style="padding:2px 8px; font-size:0.72rem;">📄 Remito PNG</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderVentasView() {
    return `
      <div class="demo-canvas-header">
        <div class="demo-canvas-title">
          <h2>Gestión de Ventas & Remitos PNG</h2>
          <p>Facturación rápida con comprobantes enviables por WhatsApp</p>
        </div>
        <button class="btn btn-primary action-new-sale" style="padding:8px 16px; font-size:0.8rem;">⚡ + Nueva Venta</button>
      </div>

      <div class="demo-table-wrapper">
        <table class="demo-table">
          <thead>
            <tr>
              <th>Remito ID</th>
              <th>Hora</th>
              <th>Cliente</th>
              <th>Detalle Comprado</th>
              <th>Total ($ ARS)</th>
              <th>Pago</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            ${state.sales.map(s => `
              <tr>
                <td><strong>#${s.id}</strong></td>
                <td>${s.time}</td>
                <td>${s.client}</td>
                <td>${s.items}</td>
                <td><strong>$${s.total.toLocaleString('es-AR')}</strong></td>
                <td>${s.pay}</td>
                <td><span class="badge-status ${s.bg}">${s.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderClientesView() {
    return `
      <div class="demo-canvas-header">
        <div class="demo-canvas-title">
          <h2>Base de Clientes & Cuentas Corrientes</h2>
          <p>Listado activo de cuentas corrientes y saldos</p>
        </div>
        <button class="btn btn-primary action-add-client" style="padding:8px 16px; font-size:0.8rem;">+ Registrar Cliente</button>
      </div>

      <div class="demo-client-grid" style="display:grid; grid-template-columns:repeat(2, 1fr); gap:16px;">
        ${state.clients.map(c => `
          <div class="demo-kpi-card">
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:8px;">
              <div style="width:40px; height:40px; border-radius:50%; background:var(--accent-gradient); display:flex; align-items:center; justify-content:center; font-weight:700; color:#fff;">
                ${c.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <strong>${c.name}</strong><br>
                <span style="font-size:0.78rem; color:var(--text-tertiary);">CUIT: ${c.cuit} | Tel: ${c.phone}</span>
              </div>
            </div>
            <div style="font-size:0.85rem; color:var(--text-secondary); display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
              <span>Saldo Cta. Cte:</span>
              <strong style="color: ${c.balance > 0 ? 'var(--danger)' : 'var(--success)'}; font-size:1.05rem;">
                $${c.balance.toLocaleString('es-AR')} (${c.status})
              </strong>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderProductosView() {
    return `
      <div class="demo-canvas-header">
        <div class="demo-canvas-title">
          <h2>Catálogo de Productos & Inventario</h2>
          <p>Precios de costo, venta y control de existencias</p>
        </div>
      </div>

      <div class="demo-table-wrapper">
        <table class="demo-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Descripción Producto</th>
              <th>Categoría</th>
              <th>Costo</th>
              <th>Precio Venta</th>
              <th>Stock Actual</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            ${state.products.map(p => `
              <tr>
                <td><strong>${p.code}</strong></td>
                <td>${p.name}</td>
                <td>${p.category}</td>
                <td>$${p.cost.toLocaleString('es-AR')}</td>
                <td><strong>$${p.price.toLocaleString('es-AR')}</strong></td>
                <td>${p.stock} un.</td>
                <td>
                  <span class="badge-status ${p.stock <= p.minStock ? 'danger' : 'success'}">
                    ${p.stock <= p.minStock ? '⚠️ Reponer' : '● Ok'}
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderStockView() {
    const lowProducts = state.products.filter(p => p.stock <= p.minStock);

    return `
      <div class="demo-canvas-header">
        <div class="demo-canvas-title">
          <h2>Control de Stock & Alertas Mínimas</h2>
          <p>Detección automática de insumos que necesitan reposición</p>
        </div>
      </div>

      <div class="demo-widget-card">
        <h3>Alertas de Reposición Urgente</h3>
        <p style="font-size:0.85rem; color:var(--text-secondary);">Productos que bajaron del límite configurado:</p>
        <div style="display:flex; flex-direction:column; gap:10px; margin-top:12px;">
          ${lowProducts.map(p => `
            <div style="padding:12px 16px; background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.25); border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong>⚠️ ${p.name}</strong><br>
                <span style="font-size:0.78rem; color:var(--text-secondary);">Quedan ${p.stock} unidades (Mínimo: ${p.minStock})</span>
              </div>
              <button class="btn btn-primary action-restock" data-code="${p.code}" style="padding:6px 12px; font-size:0.78rem;">+ Reponer Stock (+50)</button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderComprasView() {
    return `
      <div class="demo-canvas-header">
        <div class="demo-canvas-title"><h2>Órdenes de Compra a Proveedores</h2></div>
      </div>
      <div class="demo-table-wrapper">
        <table class="demo-table">
          <thead><tr><th>OC N°</th><th>Proveedor</th><th>Monto Total</th><th>Fecha Pedido</th><th>Estado</th></tr></thead>
          <tbody>
            <tr><td>OC-301</td><td>Granja Avícola Norte</td><td>$650.000</td><td>19/07/2026</td><td><span class="badge-status success">Recibido</span></td></tr>
            <tr><td>OC-302</td><td>Lácteos La Serenísima</td><td>$420.000</td><td>20/07/2026</td><td><span class="badge-status warning">En Tránsito</span></td></tr>
          </tbody>
        </table>
      </div>
    `;
  }

  function renderReportesView() {
    return `
      <div class="demo-canvas-header">
        <div class="demo-canvas-title"><h2>Reportes Financieros & Margen Neto</h2></div>
      </div>
      <div class="demo-kpi-grid">
        <div class="demo-kpi-card"><span>Ventas Brutas</span><div class="demo-kpi-val">$${state.todayRevenue.toLocaleString('es-AR')}</div></div>
        <div class="demo-kpi-card"><span>Costo de Venta</span><div class="demo-kpi-val">$${Math.round(state.todayRevenue * 0.72).toLocaleString('es-AR')}</div></div>
        <div class="demo-kpi-card"><span>Ganancia Neta</span><div class="demo-kpi-val text-gradient">$${Math.round(state.todayRevenue * 0.28).toLocaleString('es-AR')}</div></div>
      </div>
    `;
  }

  function renderConfigView() {
    return `
      <div class="demo-canvas-header">
        <div class="demo-canvas-title"><h2>Configuración del Servidor & VPS</h2></div>
      </div>
      <div class="demo-widget-card" style="font-size:0.9rem;">
        <p>🟢 <strong>VPS Server IP:</strong> 186.64.123.136 (Ubuntu 22.04 LTS Docker OK)</p>
        <p>🟢 <strong>Dominio SSL:</strong> https://dmsoftwaretech.com (Let's Encrypt Active)</p>
        <p>🟢 <strong>PWA Offline Mode:</strong> Service Worker Enabled</p>
      </div>
    `;
  }

  // --- Attach Interactive Action Events ---
  function attachViewEvents() {
    // New Sale Modal Event
    document.querySelectorAll('.action-new-sale').forEach(btn => {
      btn.addEventListener('click', openNewSaleModal);
    });

    // View Receipt Modal Event
    document.querySelectorAll('.btn-view-receipt').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openReceiptModal(id);
      });
    });

    // Add Client Modal Event
    document.querySelectorAll('.action-add-client').forEach(btn => {
      btn.addEventListener('click', openAddClientModal);
    });

    // Restock Button Event
    document.querySelectorAll('.action-restock').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.getAttribute('data-code');
        const prod = state.products.find(p => p.code === code);
        if (prod) {
          prod.stock += 50;
          renderCurrentView();
        }
      });
    });
  }

  // --- MODAL 1: Nueva Venta Interactiva ---
  function openNewSaleModal() {
    const saleModal = document.createElement('div');
    saleModal.className = 'checkout-modal active';
    saleModal.innerHTML = `
      <div class="checkout-card" style="max-width:520px; text-align:left;">
        <h3 style="font-size:1.2rem; font-weight:800; margin-bottom:12px;">⚡ Emitir Nueva Venta / Remito PNG</h3>

        <label style="font-size:0.8rem; font-weight:600; color:var(--text-secondary);">Seleccionar Cliente:</label>
        <select id="saleClientSelect" style="width:100%; padding:10px; border-radius:8px; background:var(--bg-elevated); color:var(--text-primary); border:1px solid var(--border-default); margin-bottom:12px;">
          ${state.clients.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
        </select>

        <label style="font-size:0.8rem; font-weight:600; color:var(--text-secondary);">Seleccionar Producto:</label>
        <select id="saleProductSelect" style="width:100%; padding:10px; border-radius:8px; background:var(--bg-elevated); color:var(--text-primary); border:1px solid var(--border-default); margin-bottom:12px;">
          ${state.products.map(p => `<option value="${p.code}">${p.name} - $${p.price.toLocaleString('es-AR')}</option>`).join('')}
        </select>

        <label style="font-size:0.8rem; font-weight:600; color:var(--text-secondary);">Cantidad (Bultos / Unidades):</label>
        <input type="number" id="saleQtyInput" value="5" min="1" style="width:100%; padding:10px; border-radius:8px; background:var(--bg-elevated); color:var(--text-primary); border:1px solid var(--border-default); margin-bottom:16px;">

        <div class="btn-row" style="display:flex; gap:10px; justify-content:flex-end;">
          <button class="btn btn-secondary" id="cancelSaleBtn">Cancelar</button>
          <button class="btn btn-primary" id="confirmSaleBtn">Emitir Remito PNG</button>
        </div>
      </div>
    `;

    document.body.appendChild(saleModal);

    document.getElementById('cancelSaleBtn').addEventListener('click', () => saleModal.remove());

    document.getElementById('confirmSaleBtn').addEventListener('click', () => {
      const clientName = document.getElementById('saleClientSelect').value;
      const prodCode = document.getElementById('saleProductSelect').value;
      const qty = parseInt(document.getElementById('saleQtyInput').value) || 1;

      const prod = state.products.find(p => p.code === prodCode);
      const totalAmount = prod ? prod.price * qty : 50000;

      const newId = `REM-${Math.floor(1000 + Math.random() * 9000)}`;
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

      // Update State
      state.sales.unshift({
        id: newId,
        time: timeStr,
        client: clientName,
        items: `${qty} x ${prod ? prod.name : 'Mercadería'}`,
        total: totalAmount,
        pay: 'Efectivo',
        status: 'Pagada',
        bg: 'success'
      });

      state.todayRevenue += totalAmount;

      saleModal.remove();
      renderCurrentView();
      openReceiptModal(newId);
    });
  }

  // --- MODAL 2: Vista Previa Remito PNG ---
  function openReceiptModal(remitoId) {
    const sale = state.sales.find(s => s.id === remitoId) || state.sales[0];

    const receiptModal = document.createElement('div');
    receiptModal.className = 'checkout-modal active';
    receiptModal.innerHTML = `
      <div class="checkout-card" style="max-width:440px; text-align:center; background:#ffffff; color:#0f172a; padding:24px; border-radius:12px;">
        <div style="border-bottom:2px dashed #cbd5e1; padding-bottom:12px; margin-bottom:12px;">
          <h3 style="font-size:1.1rem; font-weight:800; color:#0f172a; margin:0;">REMITO DE ENTREGA</h3>
          <p style="font-size:0.75rem; color:#64748b; margin:2px 0;">DM Software ERP — Factura Visual PNG</p>
        </div>

        <div style="font-size:0.85rem; text-align:left; line-height:1.6; color:#334155;">
          <p><strong>N° Comprobante:</strong> #${sale.id}</p>
          <p><strong>Fecha/Hora:</strong> ${sale.time} hs</p>
          <p><strong>Cliente:</strong> ${sale.client}</p>
          <p><strong>Detalle:</strong> ${sale.items}</p>
          <hr style="border:none; border-top:1px solid #e2e8f0; margin:8px 0;">
          <p style="font-size:1.1rem; font-weight:800; color:#2563eb;">TOTAL: $${sale.total.toLocaleString('es-AR')}</p>
        </div>

        <div class="btn-row" style="margin-top:16px; display:flex; gap:8px;">
          <button class="btn btn-whatsapp" id="btnSendWa" style="flex:1; justify-content:center; font-size:0.8rem;">📱 Enviar por WhatsApp</button>
          <button class="btn btn-secondary" id="btnCloseReceipt" style="color:#0f172a; border-color:#cbd5e1;">Cerrar</button>
        </div>
      </div>
    `;

    document.body.appendChild(receiptModal);

    document.getElementById('btnCloseReceipt').addEventListener('click', () => receiptModal.remove());
    document.getElementById('btnSendWa').addEventListener('click', () => {
      alert(`Simulación: Remito #${sale.id} enviado por WhatsApp a ${sale.client}!`);
      receiptModal.remove();
    });
  }

  // --- MODAL 3: Registrar Cliente ---
  function openAddClientModal() {
    const clientModal = document.createElement('div');
    clientModal.className = 'checkout-modal active';
    clientModal.innerHTML = `
      <div class="checkout-card" style="max-width:440px; text-align:left;">
        <h3 style="font-size:1.2rem; font-weight:800; margin-bottom:12px;">+ Registrar Nuevo Cliente</h3>

        <label style="font-size:0.8rem; color:var(--text-secondary);">Nombre Fantasía / Razón Social:</label>
        <input type="text" id="newClientName" placeholder="Ej: Autoservicio Don Pedro" style="width:100%; padding:10px; border-radius:8px; background:var(--bg-elevated); color:var(--text-primary); border:1px solid var(--border-default); margin-bottom:12px;">

        <label style="font-size:0.8rem; color:var(--text-secondary);">CUIT / DNI:</label>
        <input type="text" id="newClientCuit" placeholder="30-12345678-9" style="width:100%; padding:10px; border-radius:8px; background:var(--bg-elevated); color:var(--text-primary); border:1px solid var(--border-default); margin-bottom:16px;">

        <div class="btn-row" style="display:flex; gap:10px; justify-content:flex-end;">
          <button class="btn btn-secondary" id="cancelClientBtn">Cancelar</button>
          <button class="btn btn-primary" id="saveClientBtn">Guardar Cliente</button>
        </div>
      </div>
    `;

    document.body.appendChild(clientModal);

    document.getElementById('cancelClientBtn').addEventListener('click', () => clientModal.remove());
    document.getElementById('saveClientBtn').addEventListener('click', () => {
      const name = document.getElementById('newClientName').value || 'Cliente Nuevo';
      const cuit = document.getElementById('newClientCuit').value || '30-99999999-9';

      state.clients.push({ name, cuit, phone: '2604-000000', balance: 0, status: 'Al día' });
      clientModal.remove();
      renderCurrentView();
    });
  }
});
