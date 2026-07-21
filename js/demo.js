/**
 * DM SOFTWARE TECH — INTERACTIVE DEMO SYSTEM MODULE (MODAL & DASHBOARD)
 */

document.addEventListener('DOMContentLoaded', () => {
  const demoModal = document.getElementById('demoModal');
  const demoMainCanvas = document.getElementById('demoMainCanvas');
  const openDemoBtns = document.querySelectorAll('.open-demo-btn');
  const closeDemoBtn = document.getElementById('closeDemoBtn');
  const closeDemoDot = document.getElementById('closeDemoDot');

  // --- Open & Close Modal Handlers ---
  const openDemo = () => {
    demoModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderView('dashboard');
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

  // --- Sidebar Navigation View Switcher ---
  const navItems = document.querySelectorAll('.demo-nav-item');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const view = item.getAttribute('data-view');
      renderView(view);
    });
  });

  // --- Render Dynamic View Contents ---
  function renderView(view) {
    if (!demoMainCanvas) return;

    switch (view) {
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
  }

  // --- 1. DASHBOARD VIEW ---
  function renderDashboardView() {
    return `
      <div class="demo-canvas-header">
        <div class="demo-canvas-title">
          <h2>Panel Principal de Control</h2>
          <p>Resumen operacional en tiempo real — Distribuidora & Ventas</p>
        </div>
        <div class="demo-actions-bar">
          <button class="btn btn-primary" style="padding:8px 16px; font-size:0.8rem;">+ Nueva Venta</button>
        </div>
      </div>

      <!-- KPI Grid -->
      <div class="demo-kpi-grid">
        <div class="demo-kpi-card">
          <div class="demo-kpi-top">
            <span>Ventas Hoy</span>
            <div class="demo-kpi-icon">💰</div>
          </div>
          <div class="demo-kpi-val">$845.200</div>
          <div class="demo-kpi-trend up">▲ +18.4% vs ayer</div>
        </div>

        <div class="demo-kpi-card">
          <div class="demo-kpi-top">
            <span>Clientes Activos</span>
            <div class="demo-kpi-icon">👥</div>
          </div>
          <div class="demo-kpi-val">142</div>
          <div class="demo-kpi-trend up">▲ +12 este mes</div>
        </div>

        <div class="demo-kpi-card">
          <div class="demo-kpi-top">
            <span>Stock Alerta Min.</span>
            <div class="demo-kpi-icon">⚠️</div>
          </div>
          <div class="demo-kpi-val">4 Prod.</div>
          <div class="demo-kpi-trend down">▼ Reponer hoy</div>
        </div>

        <div class="demo-kpi-card">
          <div class="demo-kpi-top">
            <span>Ganancia Estimada</span>
            <div class="demo-kpi-icon">📈</div>
          </div>
          <div class="demo-kpi-val">$3.120.000</div>
          <div class="demo-kpi-trend up">▲ Margen 28%</div>
        </div>
      </div>

      <!-- Charts & Widgets -->
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
            <h3>Top Categorías</h3>
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

      <!-- Recent Transactions Table -->
      <div class="demo-widget-card">
        <div class="demo-widget-header">
          <h3>Últimas Transacciones Registradas</h3>
          <span style="font-size:0.75rem; color:var(--accent-light);">Actualizado hace 2 min</span>
        </div>
        <div class="demo-table-wrapper">
          <table class="demo-table">
            <thead>
              <tr>
                <th>N° Remito</th>
                <th>Cliente</th>
                <th>Monto</th>
                <th>Forma de Pago</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>#REM-4821</td><td>Supermercado El Sol</td><td>$145.000</td><td>Transferencia</td><td><span class="badge-status success">● Pagada</span></td></tr>
              <tr><td>#REM-4820</td><td>Granja San Rafael</td><td>$89.500</td><td>Efectivo</td><td><span class="badge-status success">● Pagada</span></td></tr>
              <tr><td>#REM-4819</td><td>Distribuidora Cuyo</td><td>$230.000</td><td>Cuenta Corriente</td><td><span class="badge-status warning">● Pendiente</span></td></tr>
              <tr><td>#REM-4818</td><td>Minimarket Central</td><td>$42.000</td><td>MercadoPago</td><td><span class="badge-status success">● Pagada</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // --- 2. VENTAS VIEW ---
  function renderVentasView() {
    return `
      <div class="demo-canvas-header">
        <div class="demo-canvas-title">
          <h2>Gestión de Ventas & Facturación</h2>
          <p>Listado completo de facturas, remitos y ventas por mostrador</p>
        </div>
        <button class="btn btn-primary" style="padding:8px 16px; font-size:0.8rem;">+ Emitir Remito PNG</button>
      </div>

      <div class="demo-table-wrapper">
        <table class="demo-table">
          <thead>
            <tr>
              <th>ID Venta</th>
              <th>Fecha/Hora</th>
              <th>Cliente</th>
              <th>Items</th>
              <th>Total ($ ARS)</th>
              <th>Vendedor</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>V-9012</td><td>21/07 09:42</td><td>Supermercado El Sol</td><td>12 cajones</td><td>$145.000</td><td>Franco M.</td><td><span class="badge-status success">Completado</span></td></tr>
            <tr><td>V-9011</td><td>21/07 09:15</td><td>Panadería La Unión</td><td>8 bolsas</td><td>$64.200</td><td>Juan P.</td><td><span class="badge-status success">Completado</span></td></tr>
            <tr><td>V-9010</td><td>21/07 08:30</td><td>Distribuidora Cuyo</td><td>45 bultos</td><td>$380.000</td><td>Franco M.</td><td><span class="badge-status warning">Pendiente Pago</span></td></tr>
            <tr><td>V-9009</td><td>20/07 18:20</td><td>Autoservicio Express</td><td>4 items</td><td>$28.500</td><td>María G.</td><td><span class="badge-status success">Completado</span></td></tr>
            <tr><td>V-9008</td><td>20/07 17:05</td><td>Comedor Los Olivos</td><td>15 cajones</td><td>$120.000</td><td>Juan P.</td><td><span class="badge-status danger">Anulado</span></td></tr>
          </tbody>
        </table>
      </div>
    `;
  }

  // --- 3. CLIENTES VIEW ---
  function renderClientesView() {
    return `
      <div class="demo-canvas-header">
        <div class="demo-canvas-title">
          <h2>Base de Clientes & Cuentas Corrientes</h2>
          <p>Seguimiento de saldo deudor, historial y compras directas</p>
        </div>
        <button class="btn btn-primary" style="padding:8px 16px; font-size:0.8rem;">+ Nuevo Cliente</button>
      </div>

      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px;">
        <div class="demo-kpi-card">
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:8px;">
            <div style="width:40px; height:40px; border-radius:50%; background:var(--accent-gradient); display:flex; align-items:center; justify-content:center; font-weight:700; color:#fff;">ES</div>
            <div><strong>Supermercado El Sol</strong><br><span style="font-size:0.78rem; color:var(--text-tertiary);">CUIT 30-71234567-8</span></div>
          </div>
          <div style="font-size:0.85rem; color:var(--text-secondary);">Saldo Cta. Cte: <strong style="color:var(--success);">$0 (Al día)</strong></div>
        </div>

        <div class="demo-kpi-card">
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:8px;">
            <div style="width:40px; height:40px; border-radius:50%; background:var(--accent-gradient); display:flex; align-items:center; justify-content:center; font-weight:700; color:#fff;">DC</div>
            <div><strong>Distribuidora Cuyo</strong><br><span style="font-size:0.78rem; color:var(--text-tertiary);">CUIT 30-68912345-2</span></div>
          </div>
          <div style="font-size:0.85rem; color:var(--text-secondary);">Saldo Cta. Cte: <strong style="color:var(--danger);">$230.000 (Pendiente)</strong></div>
        </div>

        <div class="demo-kpi-card">
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:8px;">
            <div style="width:40px; height:40px; border-radius:50%; background:var(--accent-gradient); display:flex; align-items:center; justify-content:center; font-weight:700; color:#fff;">PU</div>
            <div><strong>Panadería La Unión</strong><br><span style="font-size:0.78rem; color:var(--text-tertiary);">CUIT 27-34567890-1</span></div>
          </div>
          <div style="font-size:0.85rem; color:var(--text-secondary);">Saldo Cta. Cte: <strong style="color:var(--success);">$0 (Al día)</strong></div>
        </div>
      </div>
    `;
  }

  // --- 4. PRODUCTOS VIEW ---
  function renderProductosView() {
    return `
      <div class="demo-canvas-header">
        <div class="demo-canvas-title">
          <h2>Catálogo de Productos & Precios</h2>
          <p>Control unificado de stock, costos y listas de precios</p>
        </div>
        <button class="btn btn-primary" style="padding:8px 16px; font-size:0.8rem;">+ Cargar Producto</button>
      </div>

      <div class="demo-table-wrapper">
        <table class="demo-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre Producto</th>
              <th>Categoría</th>
              <th>Precio Costo</th>
              <th>Precio Venta</th>
              <th>Stock Actual</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>PRD-001</td><td>Cajón Huevos XL (30 docenas)</td><td>Avícola</td><td>$18.500</td><td>$24.000</td><td>145 cajones</td><td><span class="badge-status success">Stock Normal</span></td></tr>
            <tr><td>PRD-002</td><td>Cajón Huevos L (30 docenas)</td><td>Avícola</td><td>$16.000</td><td>$21.500</td><td>8 cajones</td><td><span class="badge-status warning">Stock Bajo</span></td></tr>
            <tr><td>PRD-003</td><td>Queso Tybo Horma x 4kg</td><td>Lácteos</td><td>$22.000</td><td>$29.000</td><td>32 hormas</td><td><span class="badge-status success">Stock Normal</span></td></tr>
            <tr><td>PRD-004</td><td>Jamón Cocido Lomo x kg</td><td>Fiambres</td><td>$6.500</td><td>$9.200</td><td>2 kg</td><td><span class="badge-status danger">Agotándose</span></td></tr>
          </tbody>
        </table>
      </div>
    `;
  }

  // --- 5. STOCK VIEW ---
  function renderStockView() {
    return `
      <div class="demo-canvas-header">
        <div class="demo-canvas-title">
          <h2>Control de Inventario & Alertas Min.</h2>
          <p>Historial inmutable de movimientos de stock por depósito</p>
        </div>
      </div>
      <div class="demo-widget-card">
        <h3>Alertas de Reposición Automática</h3>
        <p style="font-size:0.88rem; color:var(--text-secondary);">Los siguientes artículos alcanzaron el stock mínimo configurado y requieren orden de compra urgente:</p>
        <div style="margin-top:12px; display:flex; flex-direction:column; gap:8px;">
          <div style="padding:10px 14px; background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.2); border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
            <span>⚠️ <strong>Jamón Cocido Lomo x kg</strong> (Quedan 2 kg / Mínimo 10 kg)</span>
            <button class="btn btn-primary" style="padding:4px 10px; font-size:0.75rem;">Generar OC</button>
          </div>
          <div style="padding:10px 14px; background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.2); border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
            <span>⚠️ <strong>Cajón Huevos L</strong> (Quedan 8 cajones / Mínimo 20 cajones)</span>
            <button class="btn btn-primary" style="padding:4px 10px; font-size:0.75rem;">Generar OC</button>
          </div>
        </div>
      </div>
    `;
  }

  // --- 6. COMPRAS VIEW ---
  function renderComprasView() {
    return `
      <div class="demo-canvas-header">
        <div class="demo-canvas-title">
          <h2>Órdenes de Compra & Proveedores</h2>
          <p>Registro de recepción de mercadería e ingreso a depósito</p>
        </div>
      </div>
      <div class="demo-table-wrapper">
        <table class="demo-table">
          <thead>
            <tr><th>OC N°</th><th>Proveedor</th><th>Monto Total</th><th>Fecha Pedido</th><th>Estado</th></tr>
          </thead>
          <tbody>
            <tr><td>OC-301</td><td>Granja Avícola Norte</td><td>$650.000</td><td>19/07/2026</td><td><span class="badge-status success">Recibido en Depósito</span></td></tr>
            <tr><td>OC-302</td><td>Lácteos La Serenísima</td><td>$420.000</td><td>20/07/2026</td><td><span class="badge-status warning">En Tránsito</span></td></tr>
          </tbody>
        </table>
      </div>
    `;
  }

  // --- 7. REPORTES VIEW ---
  function renderReportesView() {
    return `
      <div class="demo-canvas-header">
        <div class="demo-canvas-title">
          <h2>Reportes Financieros & Balance Neto</h2>
          <p>Cálculo estricto de margen de ganancia real descontando costos</p>
        </div>
      </div>
      <div class="demo-kpi-grid">
        <div class="demo-kpi-card"><span>Facturación Bruta Mes</span><div class="demo-kpi-val">$12.450.000</div></div>
        <div class="demo-kpi-card"><span>Costo de Mercadería</span><div class="demo-kpi-val">$8.960.000</div></div>
        <div class="demo-kpi-card"><span>Ganancia Neta Real</span><div class="demo-kpi-val text-gradient">$3.490.000</div></div>
      </div>
    `;
  }

  // --- 8. CONFIG VIEW ---
  function renderConfigView() {
    return `
      <div class="demo-canvas-header">
        <div class="demo-canvas-title">
          <h2>Configuración del Sistema</h2>
          <p>Servidor Docker Self-Hosted & Permisos de Usuarios</p>
        </div>
      </div>
      <div class="demo-widget-card" style="font-size:0.9rem;">
        <p>✔️ <strong>Servidor VPS Status:</strong> Conectado (186.64.123.136 - Docker Engine OK)</p>
        <p>✔️ <strong>Base de Datos:</strong> PostgreSQL 16 (SSL Activado)</p>
        <p>✔️ <strong>Modo PWA:</strong> Activo & Sincronizado</p>
      </div>
    `;
  }
});
