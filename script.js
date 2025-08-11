// Funciones del módulo Conexiones API

// Variables globales para API
let apiConnections = [
    {
        id: 'api_1',
        name: 'CRM Salesforce',
        provider: 'salesforce',
        baseUrl: 'https://api.salesforce.com/v1',
        status: 'active',
        uptime: 99.2,
        latency: 245,
        lastCheck: new Date(),
        authType: 'oauth',
        requestsToday: 1240
    },
    {
        id: 'api_2',
        name: 'Analytics Google',
        provider: 'google',
        baseUrl: 'https://analytics.googleapis.com/v1',
        status: 'active',
        uptime: 98.8,
        latency: 312,
        lastCheck: new Date(),
        authType: 'apikey',
        requestsToday: 856
    },
    {
        id: 'api_3',
        name: 'Stripe Payments',
        provider: 'stripe',
        baseUrl: 'https://api.stripe.com/v1',
        status: 'inactive',
        uptime: 96.5,
        latency: 180,
        lastCheck: new Date(),
        authType: 'bearer',
        requestsToday: 423
    },
    {
        id: 'api_4',
        name: 'HubSpot CRM',
        provider: 'hubspot',
        baseUrl: 'https://api.hubapi.com/v1',
        status: 'active',
        uptime: 97.8,
        latency: 298,
        lastCheck: new Date(),
        authType: 'apikey',
        requestsToday: 634
    },
    {
        id: 'api_5',
        name: 'Slack Webhooks',
        provider: 'slack',
        baseUrl: 'https://hooks.slack.com/v1',
        status: 'active',
        uptime: 99.9,
        latency: 156,
        lastCheck: new Date(),
        authType: 'bearer',
        requestsToday: 234
    },
    {
        id: 'api_6',
        name: 'Mailchimp API',
        provider: 'mailchimp',
        baseUrl: 'https://us1.api.mailchimp.com/v1',
        status: 'active',
        uptime: 98.5,
        latency: 287,
        lastCheck: new Date(),
        authType: 'apikey',
        requestsToday: 445
    },
    {
        id: 'api_7',
        name: 'Twilio SMS',
        provider: 'twilio',
        baseUrl: 'https://api.twilio.com/v1',
        status: 'inactive',
        uptime: 95.2,
        latency: 198,
        lastCheck: new Date(),
        authType: 'basic',
        requestsToday: 89
    },
    {
        id: 'api_8',
        name: 'SendGrid Email',
        provider: 'sendgrid',
        baseUrl: 'https://api.sendgrid.com/v1',
        status: 'active',
        uptime: 99.1,
        latency: 203,
        lastCheck: new Date(),
        authType: 'bearer',
        requestsToday: 567
    },
    {
        id: 'api_9',
        name: 'Zapier Hooks',
        provider: 'zapier',
        baseUrl: 'https://hooks.zapier.com/v1',
        status: 'active',
        uptime: 96.7,
        latency: 324,
        lastCheck: new Date(),
        authType: 'none',
        requestsToday: 123
    },
    {
        id: 'api_10',
        name: 'Microsoft Graph',
        provider: 'microsoft',
        baseUrl: 'https://graph.microsoft.com/v1',
        status: 'error',
        uptime: 89.3,
        latency: 456,
        lastCheck: new Date(),
        authType: 'oauth',
        requestsToday: 78
    }
];

// Variables de paginación para el módulo API
let apiMonitorPage = 1;
let apiMonitorItemsPerPage = 6;
let connectionsPage = 1;
let connectionsItemsPerPage = 5;
let filteredApiConnections = [...apiConnections];

// Función de debugging para el módulo API
window.debugApiModule = function() {
    console.log('=== DEBUG MÓDULO API ===');
    console.log('Verificando elementos del DOM:');
    
    const apiViews = document.querySelectorAll('.api-view');
    console.log('Vistas .api-view encontradas:', apiViews.length);
    
    apiViews.forEach((view, index) => {
        console.log(`Vista ${index + 1}:`, view.id, 'activa:', view.classList.contains('active'));
    });
    
    const dashboard = document.getElementById('apiDashboard');
    const newForm = document.getElementById('newConnectionForm');
    const testForm = document.getElementById('apiTestForm');
    
    console.log('apiDashboard existe:', !!dashboard);
    console.log('newConnectionForm existe:', !!newForm);
    console.log('apiTestForm existe:', !!testForm);
    
    if (dashboard) console.log('Dashboard activo:', dashboard.classList.contains('active'));
    if (newForm) console.log('NewForm activo:', newForm.classList.contains('active'));
    if (testForm) console.log('TestForm activo:', testForm.classList.contains('active'));
    
    console.log('=== FIN DEBUG ===');
};

// Navegación del módulo API
window.showApiDashboard = function() {
    console.log('Navegando a API Dashboard...');
    
    // Función para ejecutar cuando el contenido esté listo
    const activateDashboard = () => {
        const views = document.querySelectorAll('.api-view');
        console.log('Vistas encontradas:', views.length);
        
        if (views.length === 0) {
            console.log('No se encontraron vistas, reintentando...');
            setTimeout(activateDashboard, 100);
            return;
        }
        
        views.forEach(view => view.classList.remove('active'));
        
        const dashboard = document.getElementById('apiDashboard');
        if (dashboard) {
            dashboard.classList.add('active');
            console.log('Dashboard activado');
            
            // Actualizar estadísticas del dashboard con delay
            setTimeout(() => {
                updateApiDashboardStats();
                refreshApiMonitor();
            }, 100);
        } else {
            console.error('apiDashboard no encontrado');
        }
    };
    
    // Ejecutar inmediatamente y luego con retraso como fallback
    activateDashboard();
};

window.showNewConnectionForm = function() {
    console.log('Navegando a Nueva Conexión...');
    
    // Función para ejecutar cuando el contenido esté listo
    const activateForm = () => {
        const views = document.querySelectorAll('.api-view');
        console.log('Vistas encontradas:', views.length);
        
        if (views.length === 0) {
            console.log('No se encontraron vistas, reintentando...');
            setTimeout(activateForm, 100);
            return;
        }
        
        views.forEach(view => view.classList.remove('active'));
        
        const form = document.getElementById('newConnectionForm');
        if (form) {
            form.classList.add('active');
            console.log('Formulario de nueva conexión activado');
            
            // Limpiar formulario con delay
            setTimeout(() => resetNewConnectionForm(), 150);
        } else {
            console.error('newConnectionForm no encontrado');
        }
    };
    
    // Ejecutar inmediatamente y luego con retraso como fallback
    activateForm();
};

window.showApiTestForm = function() {
    console.log('Navegando a Probar API...');
    
    // Función para ejecutar cuando el contenido esté listo
    const activateTestForm = () => {
        const views = document.querySelectorAll('.api-view');
        console.log('Vistas encontradas:', views.length);
        
        if (views.length === 0) {
            console.log('No se encontraron vistas, reintentando...');
            setTimeout(activateTestForm, 100);
            return;
        }
        
        views.forEach(view => view.classList.remove('active'));
        
        const testForm = document.getElementById('apiTestForm');
        if (testForm) {
            testForm.classList.add('active');
            console.log('Formulario de prueba activado');
            
            // Cargar lista de APIs con delay
            setTimeout(() => loadApiListForTesting(), 150);
        } else {
            console.error('apiTestForm no encontrado');
        }
    };
    
    // Ejecutar inmediatamente y luego con retraso como fallback
    activateTestForm();
};

// Funciones del dashboard API
function updateApiDashboardStats() {
    const activeCount = apiConnections.filter(api => api.status === 'active').length;
    const totalRequests = apiConnections.reduce((sum, api) => sum + api.requestsToday, 0);
    const avgLatency = Math.round(apiConnections.reduce((sum, api) => sum + api.latency, 0) / apiConnections.length);
    const avgUptime = (apiConnections.reduce((sum, api) => sum + api.uptime, 0) / apiConnections.length).toFixed(1);
    
    // Actualizar estadísticas en el DOM
    const activeCountEl = document.getElementById('activeConnectionsCount');
    const uptimeEl = document.getElementById('availabilityRate');
    const latencyEl = document.getElementById('averageLatency');
    const requestsEl = document.getElementById('requestsToday');
    
    if (activeCountEl) activeCountEl.textContent = activeCount;
    if (uptimeEl) uptimeEl.textContent = avgUptime + '%';
    if (latencyEl) latencyEl.textContent = avgLatency + 'ms';
    if (requestsEl) requestsEl.textContent = (totalRequests / 1000).toFixed(1) + 'K';
}

window.refreshApiMonitor = function() {
    const monitorList = document.getElementById('apiMonitorList');
    if (!monitorList) return;
    
    // Calcular elementos para la página actual
    const startIndex = (apiMonitorPage - 1) * apiMonitorItemsPerPage;
    const endIndex = startIndex + apiMonitorItemsPerPage;
    const paginatedApis = filteredApiConnections.slice(startIndex, endIndex);
    
    // Generar HTML para las APIs
    const apisHTML = paginatedApis.map(api => `
        <div class="api-monitor-card">
            <div class="monitor-header">
                <div class="api-info">
                    <span class="api-name">${api.name}</span>
                    <span class="api-provider">${api.provider}</span>
                </div>
                <div class="api-status ${api.status}">
                    <span class="status-dot"></span>
                    <span class="status-text">${getStatusText(api.status)}</span>
                </div>
            </div>
            <div class="monitor-metrics">
                <div class="metric">
                    <span class="metric-label">Latencia</span>
                    <span class="metric-value">${api.latency}ms</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Uptime</span>
                    <span class="metric-value">${api.uptime}%</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Requests</span>
                    <span class="metric-value">${api.requestsToday}</span>
                </div>
            </div>
            <div class="monitor-actions">
                <button class="btn-small" onclick="testApiConnection('${api.id}')">🧪 Probar</button>
                <button class="btn-small secondary" onclick="viewApiDetails('${api.id}')">📊 Detalles</button>
            </div>
        </div>
    `).join('');
    
    // Calcular información de paginación
    const totalPages = Math.ceil(filteredApiConnections.length / apiMonitorItemsPerPage);
    const showingStart = Math.min(startIndex + 1, filteredApiConnections.length);
    const showingEnd = Math.min(endIndex, filteredApiConnections.length);
    
    // Generar HTML con paginación en la parte inferior
    monitorList.innerHTML = `
        <div class="monitor-content">
            <div class="monitor-grid">
                ${apisHTML}
            </div>
        </div>
        
        <div class="monitor-pagination">
            <div class="pagination-info">
                <span>Mostrando ${showingStart}-${showingEnd} de ${filteredApiConnections.length} APIs</span>
            </div>
            <div class="pagination-controls">
                <button class="pagination-btn" onclick="changeApiMonitorPage(-1)" ${apiMonitorPage <= 1 ? 'disabled' : ''}>
                    ‹ Anterior
                </button>
                <div class="page-numbers">
                    ${generatePageNumbers(apiMonitorPage, totalPages, 'changeApiMonitorPage')}
                </div>
                <button class="pagination-btn" onclick="changeApiMonitorPage(1)" ${apiMonitorPage >= totalPages ? 'disabled' : ''}>
                    Siguiente ›
                </button>
            </div>
            <div class="items-per-page">
                <label for="monitorPerPage">Por página:</label>
                <select id="monitorPerPage" onchange="changeApiMonitorItemsPerPage(this.value)">
                    <option value="3" ${apiMonitorItemsPerPage === 3 ? 'selected' : ''}>3</option>
                    <option value="6" ${apiMonitorItemsPerPage === 6 ? 'selected' : ''}>6</option>
                    <option value="9" ${apiMonitorItemsPerPage === 9 ? 'selected' : ''}>9</option>
                    <option value="12" ${apiMonitorItemsPerPage === 12 ? 'selected' : ''}>12</option>
                </select>
            </div>
        </div>
    `;
    
    // Actualizar lista de conexiones
    updateConnectionsList();
};

// Función auxiliar para obtener texto de estado
function getStatusText(status) {
    const statusMap = {
        'active': 'Activa',
        'inactive': 'Inactiva',
        'error': 'Error'
    };
    return statusMap[status] || 'Desconocido';
}

// Función para cambiar página del monitor
window.changeApiMonitorPage = function(direction) {
    const totalPages = Math.ceil(filteredApiConnections.length / apiMonitorItemsPerPage);
    
    if (direction === -1 && apiMonitorPage > 1) {
        apiMonitorPage--;
    } else if (direction === 1 && apiMonitorPage < totalPages) {
        apiMonitorPage++;
    } else if (typeof direction === 'number' && direction > 0 && direction <= totalPages) {
        apiMonitorPage = direction;
    }
    
    refreshApiMonitor();
};

// Función para cambiar elementos por página del monitor
window.changeApiMonitorItemsPerPage = function(newSize) {
    apiMonitorItemsPerPage = parseInt(newSize);
    apiMonitorPage = 1; // Resetear a primera página
    refreshApiMonitor();
};

function updateConnectionsList() {
    const connectionsList = document.getElementById('connectionsList');
    if (!connectionsList) return;
    
    // Aplicar filtro si existe
    const filterValue = document.getElementById('connectionStatusFilter')?.value || 'all';
    let connectionsToShow = filteredApiConnections;
    
    if (filterValue !== 'all') {
        connectionsToShow = filteredApiConnections.filter(api => api.status === filterValue);
    }
    
    // Calcular elementos para la página actual
    const startIndex = (connectionsPage - 1) * connectionsItemsPerPage;
    const endIndex = startIndex + connectionsItemsPerPage;
    const paginatedConnections = connectionsToShow.slice(startIndex, endIndex);
    
    // Generar HTML para las conexiones
    const connectionsHTML = paginatedConnections.map(api => `
        <div class="connection-item ${api.status}">
            <div class="connection-info">
                <div class="connection-header">
                    <span class="connection-name">${api.name}</span>
                    <span class="connection-status ${api.status}">${getStatusText(api.status)}</span>
                </div>
                <div class="connection-details">
                    <span class="connection-url">${api.baseUrl}</span>
                    <span class="connection-auth">${api.authType.toUpperCase()}</span>
                </div>
            </div>
            <div class="connection-actions">
                <button class="btn-icon" onclick="editConnection('${api.id}')" title="Editar">✏️</button>
                <button class="btn-icon" onclick="toggleConnection('${api.id}')" title="${api.status === 'active' ? 'Desactivar' : 'Activar'}">${api.status === 'active' ? '⏸️' : '▶️'}</button>
                <button class="btn-icon danger" onclick="deleteConnection('${api.id}')" title="Eliminar">🗑️</button>
            </div>
        </div>
    `).join('');
    
    // Calcular información de paginación
    const totalPages = Math.ceil(connectionsToShow.length / connectionsItemsPerPage);
    const showingStart = Math.min(startIndex + 1, connectionsToShow.length);
    const showingEnd = Math.min(endIndex, connectionsToShow.length);
    
    // Generar HTML completo con paginación
    connectionsList.innerHTML = `
        <div class="connections-list-content">
            ${connectionsHTML}
        </div>
        
        <div class="connections-pagination">
            <div class="pagination-info">
                <span>Mostrando ${showingStart}-${showingEnd} de ${connectionsToShow.length} conexiones</span>
            </div>
            <div class="pagination-controls">
                <button class="pagination-btn" onclick="changeConnectionsPage(-1)" ${connectionsPage <= 1 ? 'disabled' : ''}>
                    ‹ Anterior
                </button>
                <div class="page-numbers">
                    ${generatePageNumbers(connectionsPage, totalPages, 'changeConnectionsPage')}
                </div>
                <button class="pagination-btn" onclick="changeConnectionsPage(1)" ${connectionsPage >= totalPages ? 'disabled' : ''}>
                    Siguiente ›
                </button>
            </div>
            <div class="items-per-page">
                <label for="connectionsPerPage">Por página:</label>
                <select id="connectionsPerPage" onchange="changeConnectionsItemsPerPage(this.value)">
                    <option value="5" ${connectionsItemsPerPage === 5 ? 'selected' : ''}>5</option>
                    <option value="10" ${connectionsItemsPerPage === 10 ? 'selected' : ''}>10</option>
                    <option value="15" ${connectionsItemsPerPage === 15 ? 'selected' : ''}>15</option>
                    <option value="20" ${connectionsItemsPerPage === 20 ? 'selected' : ''}>20</option>
                </select>
            </div>
        </div>
    `;
}

// Función para cambiar página de conexiones
window.changeConnectionsPage = function(direction) {
    const filterValue = document.getElementById('connectionStatusFilter')?.value || 'all';
    let connectionsToShow = filteredApiConnections;
    
    if (filterValue !== 'all') {
        connectionsToShow = filteredApiConnections.filter(api => api.status === filterValue);
    }
    
    const totalPages = Math.ceil(connectionsToShow.length / connectionsItemsPerPage);
    
    if (direction === -1 && connectionsPage > 1) {
        connectionsPage--;
    } else if (direction === 1 && connectionsPage < totalPages) {
        connectionsPage++;
    } else if (typeof direction === 'number' && direction > 0 && direction <= totalPages) {
        connectionsPage = direction;
    }
    
    updateConnectionsList();
};

// Función para cambiar elementos por página de conexiones
window.changeConnectionsItemsPerPage = function(newSize) {
    connectionsItemsPerPage = parseInt(newSize);
    connectionsPage = 1; // Resetear a primera página
    updateConnectionsList();
};

window.filterConnections = function() {
    const filter = document.getElementById('connectionStatusFilter').value;
    
    // Actualizar datos filtrados
    if (filter === 'all') {
        filteredApiConnections = [...apiConnections];
    } else {
        filteredApiConnections = apiConnections.filter(api => api.status === filter);
    }
    
    // Resetear a primera página después del filtro
    connectionsPage = 1;
    
    // Actualizar ambas listas
    refreshApiMonitor();
    updateConnectionsList();
};

// Función para generar números de página
function generatePageNumbers(currentPage, totalPages, functionName) {
    if (totalPages <= 1) return '';
    
    let pages = [];
    const isMobile = window.innerWidth <= 480;
    const maxVisible = isMobile ? 3 : 5;
    
    if (totalPages <= maxVisible) {
        // Mostrar todas las páginas si son pocas
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        // Lógica para páginas con puntos suspensivos
        if (currentPage <= 2) {
            if (isMobile) {
                pages = [1, 2, '...', totalPages];
            } else {
                pages = [1, 2, 3, '...', totalPages];
            }
        } else if (currentPage >= totalPages - 1) {
            if (isMobile) {
                pages = [1, '...', totalPages - 1, totalPages];
            } else {
                pages = [1, '...', totalPages - 2, totalPages - 1, totalPages];
            }
        } else {
            if (isMobile) {
                pages = [1, '...', currentPage, '...', totalPages];
            } else {
                pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
            }
        }
    }
    
    return pages.map(page => {
        if (page === '...') {
            return '<span class="page-ellipsis">...</span>';
        } else {
            const isActive = page === currentPage ? 'active' : '';
            return `<button class="page-btn ${isActive}" onclick="${functionName}(${page})">${page}</button>`;
        }
    }).join('');
}

window.updateMonitorView = function(viewType) {
    // Actualizar botones activos
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Actualizar vista según el tipo
    if (viewType === 'realtime') {
        refreshApiMonitor();
    } else if (viewType === 'hourly') {
        // Implementar vista por hora
        showHourlyMonitorView();
    }
};

function showHourlyMonitorView() {
    const monitorList = document.getElementById('apiMonitorList');
    if (!monitorList) return;
    
    // Generar datos por hora para las últimas 24 horas
    const hourlyData = generateHourlyApiData();
    
    monitorList.innerHTML = `
        <div class="hourly-chart-container">
            <canvas id="hourlyApiChart" width="800" height="300"></canvas>
        </div>
    `;
    
    // Dibujar gráfico por horas
    setTimeout(() => drawHourlyApiChart(hourlyData), 100);
}

// Funciones para nueva conexión
function resetNewConnectionForm() {
    console.log('Ejecutando resetNewConnectionForm...');
    const form = document.querySelector('#newConnectionForm form');
    if (form) {
        console.log('Formulario encontrado, reseteando...');
        form.reset();
        
        // Limpiar campos específicos
        const nameField = document.getElementById('connectionName');
        const urlField = document.getElementById('baseUrl');
        
        if (nameField) nameField.value = '';
        if (urlField) urlField.value = '';
        
        // Resetear tipo de autenticación
        const authRadios = document.querySelectorAll('input[name="authType"]');
        authRadios.forEach(radio => {
            if (radio.value === 'none') {
                radio.checked = true;
            } else {
                radio.checked = false;
            }
        });
        
        // Ocultar campos de autenticación
        const authFields = document.getElementById('authFields');
        if (authFields) authFields.innerHTML = '';
        
        // Resetear headers personalizados
        const headersContainer = document.getElementById('customHeaders');
        if (headersContainer) {
            headersContainer.innerHTML = `
                <div class="header-row">
                    <input type="text" placeholder="Nombre del header">
                    <input type="text" placeholder="Valor del header">
                    <button type="button" class="btn-icon" onclick="addHeaderRow()">+</button>
                </div>
            `;
        }
        console.log('Formulario reseteado exitosamente');
    } else {
        console.error('Formulario de nueva conexión no encontrado en resetNewConnectionForm');
    }
}

// Event listener para cambio de tipo de autenticación
document.addEventListener('change', function(e) {
    if (e.target.name === 'authType') {
        updateAuthFields(e.target.value);
    }
});

function updateAuthFields(authType) {
    const authFields = document.getElementById('authFields');
    if (!authFields) return;
    
    let fieldsHTML = '';
    
    switch (authType) {
        case 'apikey':
            fieldsHTML = `
                <div class="connection-grid">
                    <div class="connection-field">
                        <label for="apiKeyValue">API Key *</label>
                        <input type="password" id="apiKeyValue" placeholder="Ingresa tu API key">
                    </div>
                    <div class="connection-field">
                        <label for="apiKeyHeader">Nombre del Header</label>
                        <input type="text" id="apiKeyHeader" placeholder="X-API-Key" value="X-API-Key">
                    </div>
                </div>
            `;
            break;
            
        case 'bearer':
            fieldsHTML = `
                <div class="connection-field">
                    <label for="bearerToken">Bearer Token *</label>
                    <input type="password" id="bearerToken" placeholder="Ingresa tu Bearer token">
                </div>
            `;
            break;
            
        case 'basic':
            fieldsHTML = `
                <div class="connection-grid">
                    <div class="connection-field">
                        <label for="basicUsername">Usuario *</label>
                        <input type="text" id="basicUsername" placeholder="Usuario">
                    </div>
                    <div class="connection-field">
                        <label for="basicPassword">Contraseña *</label>
                        <input type="password" id="basicPassword" placeholder="Contraseña">
                    </div>
                </div>
            `;
            break;
            
        case 'oauth':
            fieldsHTML = `
                <div class="connection-grid">
                    <div class="connection-field">
                        <label for="oauthClientId">Client ID *</label>
                        <input type="text" id="oauthClientId" placeholder="Cliente ID">
                    </div>
                    <div class="connection-field">
                        <label for="oauthClientSecret">Client Secret *</label>
                        <input type="password" id="oauthClientSecret" placeholder="Cliente Secret">
                    </div>
                    <div class="connection-field">
                        <label for="oauthTokenUrl">Token URL</label>
                        <input type="url" id="oauthTokenUrl" placeholder="https://auth.ejemplo.com/token">
                    </div>
                    <div class="connection-field">
                        <label for="oauthScope">Scope</label>
                        <input type="text" id="oauthScope" placeholder="read write">
                    </div>
                </div>
            `;
            break;
    }
    
    authFields.innerHTML = fieldsHTML;
}

window.addHeaderRow = function() {
    const headersContainer = document.getElementById('customHeaders');
    if (!headersContainer) return;
    
    const newRow = document.createElement('div');
    newRow.className = 'header-row';
    newRow.innerHTML = `
        <input type="text" placeholder="Nombre del header">
        <input type="text" placeholder="Valor del header">
        <button type="button" class="btn-icon danger" onclick="removeHeaderRow(this)">-</button>
    `;
    
    headersContainer.appendChild(newRow);
};

window.removeHeaderRow = function(button) {
    button.parentElement.remove();
};

window.testNewConnection = function() {
    const name = document.getElementById('connectionName').value;
    const baseUrl = document.getElementById('baseUrl').value;
    
    if (!name || !baseUrl) {
        alert('⚠️ Por favor completa al menos el nombre y la URL base');
        return;
    }
    
    // Simular prueba de conexión
    const testBtn = event.target;
    const originalText = testBtn.innerHTML;
    
    testBtn.innerHTML = '<span>🔄</span> Probando...';
    testBtn.disabled = true;
    
    setTimeout(() => {
        const success = Math.random() > 0.3; // 70% de éxito
        
        if (success) {
            alert('✅ Conexión exitosa!\n\nLa API responde correctamente.');
        } else {
            alert('❌ Error de conexión\n\nVerifica la URL y las credenciales.');
        }
        
        testBtn.innerHTML = originalText;
        testBtn.disabled = false;
    }, 2000);
};

window.saveNewConnection = function() {
    const name = document.getElementById('connectionName').value;
    const baseUrl = document.getElementById('baseUrl').value;
    const authType = document.querySelector('input[name="authType"]:checked')?.value || 'none';
    
    if (!name || !baseUrl) {
        alert('⚠️ Por favor completa los campos obligatorios');
        return;
    }
    
    // Crear nueva conexión
    const newConnection = {
        id: `api_${Date.now()}`,
        name: name,
        provider: 'custom',
        baseUrl: baseUrl,
        status: 'active',
        uptime: 100,
        latency: Math.floor(Math.random() * 300) + 100,
        lastCheck: new Date(),
        authType: authType,
        requestsToday: 0
    };
    
    // Agregar a la lista
    apiConnections.push(newConnection);
    
    alert('✅ Conexión guardada exitosamente!\n\n' + 
          `Nombre: ${name}\n` +
          `URL: ${baseUrl}\n` +
          `Autenticación: ${authType.toUpperCase()}`);
    
    // Volver al dashboard y actualizar
    showApiDashboard();
};

// Funciones para probar API
function loadApiListForTesting() {
    console.log('Ejecutando loadApiListForTesting...');
    const apiSelect = document.getElementById('apiToTest');
    if (!apiSelect) {
        console.error('Elemento apiToTest no encontrado');
        return;
    }
    
    console.log('Elemento apiToTest encontrado, cargando opciones...');
    
    // Limpiar opciones existentes
    apiSelect.innerHTML = '<option value="">Seleccionar API...</option>';
    
    // Agregar APIs activas
    const activeApis = apiConnections.filter(api => api.status === 'active');
    console.log('APIs activas encontradas:', activeApis.length);
    
    activeApis.forEach(api => {
        const option = new Option(`${api.name} (${api.provider})`, api.id);
        apiSelect.add(option);
    });
    
    console.log('Lista de APIs cargada exitosamente');
}

window.loadApiDetails = function() {
    const selectedId = document.getElementById('apiToTest').value;
    const infoContainer = document.getElementById('selectedApiInfo');
    
    if (!selectedId) {
        infoContainer.style.display = 'none';
        return;
    }
    
    const api = apiConnections.find(a => a.id === selectedId);
    if (!api) return;
    
    infoContainer.style.display = 'block';
    infoContainer.innerHTML = `
        <div class="api-info-card">
            <div class="info-header">
                <span class="info-icon">🔗</span>
                <div class="info-details">
                    <h4>${api.name}</h4>
                    <p>${api.baseUrl}</p>
                </div>
                <span class="status-badge ${api.status}">${api.status === 'active' ? 'Activa' : 'Inactiva'}</span>
            </div>
            <div class="info-metrics">
                <div class="metric">
                    <span class="metric-label">Uptime</span>
                    <span class="metric-value">${api.uptime}%</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Latencia</span>
                    <span class="metric-value">${api.latency}ms</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Auth</span>
                    <span class="metric-value">${api.authType.toUpperCase()}</span>
                </div>
            </div>
        </div>
    `;
};

window.refreshApiList = function() {
    loadApiListForTesting();
    alert('📋 Lista de APIs actualizada');
};

window.executeApiTest = function() {
    const selectedId = document.getElementById('apiToTest').value;
    const endpoint = document.getElementById('testEndpoint').value || '/';
    const method = document.getElementById('testMethod').value;
    const testData = document.getElementById('testData').value;
    
    if (!selectedId) {
        alert('⚠️ Por favor selecciona una API para probar');
        return;
    }
    
    const api = apiConnections.find(a => a.id === selectedId);
    if (!api) return;
    
    // Actualizar botón
    const executeBtn = document.getElementById('executeTestBtn');
    const originalText = executeBtn.innerHTML;
    executeBtn.innerHTML = '<span>⏳</span> Ejecutando...';
    executeBtn.disabled = true;
    
    // Simular ejecución de prueba
    setTimeout(() => {
        const results = generateTestResults(api, endpoint, method, testData);
        displayTestResults(results);
        
        executeBtn.innerHTML = originalText;
        executeBtn.disabled = false;
    }, 3000);
};

function generateTestResults(api, endpoint, method, testData) {
    const success = Math.random() > 0.2; // 80% de éxito
    const responseTime = Math.floor(Math.random() * 1000) + 200;
    
    if (success) {
        return {
            success: true,
            status: 200,
            statusText: 'OK',
            responseTime: responseTime,
            url: `${api.baseUrl}${endpoint}`,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${api.authType} ****`,
                'User-Agent': 'API-Test-Tool/1.0'
            },
            response: {
                success: true,
                data: {
                    id: Math.floor(Math.random() * 1000),
                    timestamp: new Date().toISOString(),
                    results: Array.from({length: 5}, (_, i) => ({
                        id: i + 1,
                        value: Math.floor(Math.random() * 100),
                        status: 'active'
                    }))
                },
                message: 'Request executed successfully'
            }
        };
    } else {
        return {
            success: false,
            status: Math.random() > 0.5 ? 401 : 500,
            statusText: Math.random() > 0.5 ? 'Unauthorized' : 'Internal Server Error',
            responseTime: responseTime,
            url: `${api.baseUrl}${endpoint}`,
            method: method,
            error: 'Authentication failed or server error'
        };
    }
}

function displayTestResults(results) {
    const resultsContainer = document.getElementById('testResults');
    if (!resultsContainer) return;
    
    const statusClass = results.success ? 'success' : 'error';
    const statusIcon = results.success ? '✅' : '❌';
    
    resultsContainer.innerHTML = `
        <div class="test-results-header ${statusClass}">
            <span class="result-icon">${statusIcon}</span>
            <div class="result-summary">
                <h4>${results.success ? 'Prueba Exitosa' : 'Error en la Prueba'}</h4>
                <p>${results.status} ${results.statusText} • ${results.responseTime}ms</p>
            </div>
        </div>
        
        <div class="test-details">
            <div class="detail-section">
                <h5>Request Details</h5>
                <div class="detail-content">
                    <div class="detail-row">
                        <span class="detail-label">URL:</span>
                        <span class="detail-value">${results.url}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Method:</span>
                        <span class="detail-value">${results.method}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Response Time:</span>
                        <span class="detail-value">${results.responseTime}ms</span>
                    </div>
                </div>
            </div>
            
            ${results.headers ? `
            <div class="detail-section">
                <h5>Headers</h5>
                <div class="detail-content">
                    ${Object.entries(results.headers).map(([key, value]) => `
                        <div class="detail-row">
                            <span class="detail-label">${key}:</span>
                            <span class="detail-value">${value}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            <div class="detail-section">
                <h5>${results.success ? 'Response' : 'Error'}</h5>
                <div class="detail-content">
                    <pre class="response-data">${JSON.stringify(results.response || results.error, null, 2)}</pre>
                </div>
            </div>
        </div>
    `;
}

window.clearTestResults = function() {
    const resultsContainer = document.getElementById('testResults');
    if (!resultsContainer) return;
    
    resultsContainer.innerHTML = `
        <div class="empty-results">
            <div class="empty-icon">🧪</div>
            <div class="empty-title">No hay resultados aún</div>
            <div class="empty-description">Ejecuta una prueba para ver los resultados aquí</div>
        </div>
    `;
};

// Funciones auxiliares para APIs
window.testApiConnection = function(apiId) {
    const api = apiConnections.find(a => a.id === apiId);
    if (!api) {
        alert('❌ API no encontrada');
        return;
    }
    
    // Simular prueba de conexión
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '<span>🔄</span> Probando...';
    button.disabled = true;
    
    setTimeout(() => {
        // Simular éxito basado en el estado actual de la API
        const success = api.status === 'active' ? Math.random() > 0.1 : Math.random() > 0.7;
        
        if (success) {
            const responseTime = Math.floor(Math.random() * 500) + 50;
            const testData = {
                'Salesforce CRM': 'contactos y oportunidades',
                'Google Analytics': 'métricas de tráfico web',
                'Stripe Payments': 'transacciones de pago',
                'HubSpot Marketing': 'leads y campañas',
                'Slack Notifications': 'mensajes y canales',
                'Mailchimp Campaigns': 'listas de correo',
                'Twilio SMS': 'mensajes SMS',
                'SendGrid Email': 'emails transaccionales',
                'Zapier Automation': 'automatizaciones',
                'Microsoft Graph': 'datos de Office 365'
            };
            
            const dataType = testData[api.name] || 'datos de la API';
            
            alert(`✅ ¡Conexión exitosa con ${api.name}!

🔗 URL: ${api.baseUrl}
⚡ Tiempo de respuesta: ${responseTime}ms
📊 Estado: ${getStatusText(api.status)}
🔐 Autenticación: ${api.authType.toUpperCase()}
📈 Datos disponibles: ${dataType}

La API está respondiendo correctamente y lista para usar.`);
            
            // Actualizar métricas después de la prueba exitosa
            if (api.status !== 'active') {
                api.status = 'active';
            }
            api.latency = responseTime;
            refreshApiMonitor();
            
        } else {
            alert(`❌ Error de conexión con ${api.name}

🔗 URL: ${api.baseUrl}
❌ Estado actual: ${getStatusText(api.status)}

Posibles causas:
• Problemas de conectividad de red
• Credenciales de autenticación expiradas
• API temporalmente no disponible
• Límites de tasa excedidos

Recomendación: Verifica la configuración de la conexión.`);
        }
        
        button.innerHTML = originalText;
        button.disabled = false;
    }, Math.random() * 1000 + 500); // Tiempo variable de prueba
};

// Funciones para el módulo ETL
window.showEtlDashboard = function() {
    console.log('Navegando a ETL Dashboard...');
    const etlViews = document.querySelectorAll('.etl-view');
    etlViews.forEach(view => view.classList.remove('active'));
    
    setTimeout(() => {
        const dashboard = document.getElementById('etlDashboard');
        if (dashboard) {
            dashboard.classList.add('active');
            console.log('ETL Dashboard mostrado');
        }
    }, 100);
};

window.showEtlExecute = function() {
    console.log('Navegando a Ejecutar ETL...');
    const etlViews = document.querySelectorAll('.etl-view');
    etlViews.forEach(view => view.classList.remove('active'));
    
    setTimeout(() => {
        const executeForm = document.getElementById('etlExecuteForm');
        if (executeForm) {
            executeForm.classList.add('active');
            console.log('Formulario Ejecutar ETL mostrado');
        }
    }, 100);
};

window.showEtlConfiguration = function() {
    console.log('Navegando a Configuración ETL...');
    const etlViews = document.querySelectorAll('.etl-view');
    etlViews.forEach(view => view.classList.remove('active'));
    
    setTimeout(() => {
        const configForm = document.getElementById('etlConfigForm');
        if (configForm) {
            configForm.classList.add('active');
            console.log('Formulario Configuración ETL mostrado');
            
            // ETL Configuration initialized
            setTimeout(() => {
                console.log('ETL Configuration loaded successfully');
            }, 200);
        }
    }, 100);
};

window.selectEtlProcess = function(card, processId) {
    // Remover selección anterior
    document.querySelectorAll('.etl-process-card').forEach(c => c.classList.remove('selected'));
    
    // Seleccionar nueva tarjeta
    card.classList.add('selected');
    
    // Mostrar configuración de ejecución
    const configSection = document.getElementById('executionConfig');
    if (configSection) {
        configSection.style.display = 'block';
    }
    
    // Habilitar botones
    document.getElementById('validateBtn').disabled = false;
    document.getElementById('executeBtn').disabled = false;
    
    console.log(`Proceso ETL seleccionado: ${processId}`);
};

window.validateEtlProcess = function() {
    const selectedCard = document.querySelector('.etl-process-card.selected');
    if (!selectedCard) {
        alert('⚠️ Por favor selecciona un proceso ETL primero');
        return;
    }
    
    const processName = selectedCard.querySelector('h4').textContent;
    const button = event.target;
    const originalText = button.innerHTML;
    
    button.innerHTML = '<span>🔄</span> Validando...';
    button.disabled = true;
    
    setTimeout(() => {
        const success = Math.random() > 0.2; // 80% de éxito
        
        if (success) {
            alert(`✅ Validación exitosa para ${processName}

🔍 Verificaciones completadas:
• Conectividad de fuentes de datos
• Integridad de esquemas
• Disponibilidad de recursos
• Validación de transformaciones

El proceso está listo para ejecutarse.`);
        } else {
            alert(`❌ Error en la validación de ${processName}

Problemas encontrados:
• Conexión fallida con fuente de datos
• Esquema de datos incompatible
• Recursos insuficientes

Por favor revisa la configuración del proceso.`);
        }
        
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
};

window.executeEtlProcess = function() {
    const selectedCard = document.querySelector('.etl-process-card.selected');
    if (!selectedCard) {
        alert('⚠️ Por favor selecciona un proceso ETL primero');
        return;
    }
    
    const processName = selectedCard.querySelector('h4').textContent;
    const executionType = document.getElementById('executionType').value;
    const priority = document.getElementById('executionPriority').value;
    
    // Mostrar monitor de ejecución
    const monitorSection = document.getElementById('executionMonitor');
    if (monitorSection) {
        monitorSection.style.display = 'block';
        
        // Simular progreso de ejecución
        const progressContainer = document.getElementById('executionProgress');
        progressContainer.innerHTML = `
            <div class="execution-header">
                <h4>Ejecutando: ${processName}</h4>
                <div class="execution-meta">
                    <span>Tipo: ${executionType}</span>
                    <span>Prioridad: ${priority}</span>
                    <span>Iniciado: ${new Date().toLocaleTimeString()}</span>
                </div>
            </div>
            
            <div class="execution-steps">
                <div class="step-progress">
                    <div class="step-item active">
                        <div class="step-icon">📁</div>
                        <div class="step-label">Extracción</div>
                        <div class="step-status">En proceso...</div>
                    </div>
                    <div class="step-item">
                        <div class="step-icon">🔄</div>
                        <div class="step-label">Transformación</div>
                        <div class="step-status">Pendiente</div>
                    </div>
                    <div class="step-item">
                        <div class="step-icon">💾</div>
                        <div class="step-label">Carga</div>
                        <div class="step-status">Pendiente</div>
                    </div>
                </div>
                
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 0%"></div>
                </div>
                <div class="progress-text">Iniciando extracción de datos...</div>
            </div>
        `;
        
        // Simular progreso
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            const progressFill = progressContainer.querySelector('.progress-fill');
            const progressText = progressContainer.querySelector('.progress-text');
            
            if (progressFill) progressFill.style.width = progress + '%';
            
            if (progress < 33) {
                progressText.textContent = 'Extrayendo datos de fuentes...';
            } else if (progress < 66) {
                progressText.textContent = 'Transformando y limpiando datos...';
                // Actualizar pasos
                const steps = progressContainer.querySelectorAll('.step-item');
                steps[0].classList.remove('active');
                steps[0].classList.add('completed');
                steps[1].classList.add('active');
            } else if (progress < 100) {
                progressText.textContent = 'Cargando datos al destino...';
                // Actualizar pasos
                const steps = progressContainer.querySelectorAll('.step-item');
                steps[1].classList.remove('active');
                steps[1].classList.add('completed');
                steps[2].classList.add('active');
            } else {
                progressText.textContent = 'Proceso ETL completado exitosamente';
                // Completar todos los pasos
                const steps = progressContainer.querySelectorAll('.step-item');
                steps[2].classList.remove('active');
                steps[2].classList.add('completed');
                
                clearInterval(interval);
                
                setTimeout(() => {
                    alert(`✅ Proceso ETL completado exitosamente

📊 Resumen de ejecución:
• Proceso: ${processName}
• Registros procesados: ${Math.floor(Math.random() * 50000) + 10000}
• Tiempo total: ${Math.floor(Math.random() * 10) + 5} minutos
• Estado: Completado sin errores

Los datos han sido cargados exitosamente.`);
                }, 1000);
            }
        }, 500);
    }
};

window.showConfigSection = function(sectionId) {
    // Remover active de todas las pestañas
    document.querySelectorAll('.config-tab').forEach(tab => tab.classList.remove('active'));
    
    // Activar pestaña seleccionada
    event.target.classList.add('active');
    
    // Ocultar todas las secciones
    document.querySelectorAll('.config-section').forEach(section => section.classList.remove('active'));
    
    // Mostrar sección seleccionada
    const targetSection = document.getElementById(sectionId + 'Config');
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Section loaded successfully
        setTimeout(() => {
            console.log(`ETL section loaded: ${sectionId}`);
        }, 100);
    }
};

window.editProcess = function(processId) {
    alert(`✏️ Editando proceso: ${processId}\n\nEsta función abrirá el formulario de edición del proceso ETL.`);
};

window.toggleProcess = function(processId) {
    alert(`⏯️ Cambiando estado del proceso: ${processId}\n\nEsta función activará/desactivará el proceso ETL.`);
};

window.deleteProcess = function(processId) {
    if (confirm(`¿Estás seguro de que deseas eliminar el proceso "${processId}"?\n\nEsta acción no se puede deshacer.`)) {
        alert(`🗑️ Proceso "${processId}" eliminado exitosamente.`);
    }
};

window.showNewProcessForm = function() {
    // Ocultar todas las vistas ETL
    document.getElementById('etlDashboard').classList.remove('active');
    document.getElementById('etlExecuteForm').classList.remove('active');
    document.getElementById('etlConfigForm').classList.remove('active');
    
    // Mostrar la vista de nuevo proceso
    document.getElementById('etlNewProcessForm').classList.add('active');
    
    // Focus en el primer campo
    setTimeout(() => {
        const firstInput = document.getElementById('processName');
        if (firstInput) firstInput.focus();
    }, 100);
};

window.closeNewProcessModal = function() {
    // Esta función ya no es necesaria, pero la mantenemos para compatibilidad
    showEtlDashboard();
};

window.toggleScheduleOptions = function() {
    const frequency = document.getElementById('executionFrequency').value;
    const scheduleTime = document.getElementById('scheduleTime');
    
    if (frequency === 'manual') {
        scheduleTime.style.display = 'none';
    } else {
        scheduleTime.style.display = 'block';
    }
};

window.saveNewProcess = function() {
    const form = document.getElementById('newProcessForm');
    const formData = new FormData(form);
    
    // Validar campos requeridos
    const processName = formData.get('processName');
    if (!processName || processName.trim() === '') {
        alert('❌ Por favor, ingresa un nombre para el proceso');
        return;
    }
    
    // Obtener fuentes seleccionadas
    const sources = [];
    const sourceCheckboxes = document.querySelectorAll('input[name="sources"]:checked');
    sourceCheckboxes.forEach(checkbox => {
        sources.push(checkbox.value);
    });
    
    // Crear objeto del proceso
    const newProcess = {
        id: 'proc_' + Date.now(),
        name: processName,
        description: formData.get('processDescription') || '',
        category: formData.get('processCategory'),
        priority: formData.get('processPriority'),
        sources: sources,
        destination: formData.get('targetDestination'),
        frequency: formData.get('executionFrequency'),
        executionTime: formData.get('executionTime'),
        enableRetry: formData.get('enableRetry') === 'on',
        enableNotifications: formData.get('enableNotifications') === 'on',
        enableLogging: formData.get('enableLogging') === 'on',
        timeout: parseInt(formData.get('timeout')) || 60,
        maxRetries: parseInt(formData.get('maxRetries')) || 3,
        status: 'inactive',
        lastRun: 'Nunca',
        createdAt: new Date().toISOString()
    };
    
    console.log('Nuevo proceso creado:', newProcess);
    
    // Simular guardado exitoso
    alert(`✅ Proceso "${processName}" creado exitosamente!\n\n` +
          `📋 Detalles:\n` +
          `• Categoría: ${newProcess.category}\n` +
          `• Prioridad: ${newProcess.priority}\n` +
          `• Fuentes: ${sources.length} seleccionadas\n` +
          `• Frecuencia: ${newProcess.frequency}\n\n` +
          `El proceso ha sido agregado a la lista y está listo para configurar.`);
    
    // Cerrar modal
    closeNewProcessModal();
};

// Funciones para Fuentes de Datos
window.showNewDataSourceForm = function() {
    alert(`➕ Nueva Fuente de Datos\n\nEsta función abrirá el formulario para crear una nueva fuente de datos.`);
};

window.testDataSource = function(sourceId) {
    const button = event.target;
    const originalText = button.innerHTML;
    
    button.innerHTML = '🔄 Probando...';
    button.disabled = true;
    
    setTimeout(() => {
        const success = Math.random() > 0.3; // 70% de éxito
        
        if (success) {
            alert(`✅ Conexión exitosa a la fuente de datos: ${sourceId}\n\n• Conectividad: OK\n• Autenticación: OK\n• Permisos: OK\n• Latencia: 45ms`);
        } else {
            alert(`❌ Error de conexión a la fuente de datos: ${sourceId}\n\nProblemas encontrados:\n• Timeout de conexión\n• Verificar credenciales\n• Revisar configuración de red`);
        }
        
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
};

window.editDataSource = function(sourceId) {
    alert(`✏️ Editando fuente de datos: ${sourceId}\n\nEsta función abrirá el formulario de configuración de la fuente de datos.`);
};

window.deleteDataSource = function(sourceId) {
    if (confirm(`¿Estás seguro de que deseas eliminar la fuente de datos "${sourceId}"?\n\nEsta acción no se puede deshacer y puede afectar procesos ETL que dependan de esta fuente.`)) {
        alert(`🗑️ Fuente de datos "${sourceId}" eliminada exitosamente.`);
    }
};

// Funciones para Transformaciones
window.showNewTransformationForm = function() {
    alert(`➕ Nueva Transformación\n\nEsta función abrirá el formulario para crear una nueva regla de transformación.`);
};

window.showTransformationCategory = function(categoryId) {
    // Remover active de todas las pestañas
    document.querySelectorAll('.transform-tab').forEach(tab => tab.classList.remove('active'));
    
    // Activar pestaña seleccionada
    event.target.classList.add('active');
    
    // Ocultar todas las categorías
    document.querySelectorAll('.transform-category').forEach(category => category.classList.remove('active'));
    
    // Mostrar categoría seleccionada
    const targetCategory = document.getElementById(categoryId);
    if (targetCategory) {
        targetCategory.classList.add('active');
    }
};

window.editTransformation = function(transformId) {
    alert(`✏️ Editando transformación: ${transformId}\n\nEsta función abrirá el editor de reglas de transformación.`);
};

window.toggleTransformation = function(transformId) {
    const button = event.target;
    const card = button.closest('.transformation-card');
    const statusBadge = card.querySelector('.transform-status');
    
    if (statusBadge.classList.contains('enabled')) {
        statusBadge.classList.remove('enabled');
        statusBadge.classList.add('disabled');
        statusBadge.textContent = 'Deshabilitado';
        button.innerHTML = '▶️ Activar';
        button.classList.remove('btn-secondary');
        button.classList.add('btn-primary');
        alert(`⏸️ Transformación "${transformId}" desactivada.`);
    } else {
        statusBadge.classList.remove('disabled');
        statusBadge.classList.add('enabled');
        statusBadge.textContent = 'Habilitado';
        button.innerHTML = '⏸️ Desactivar';
        button.classList.remove('btn-primary');
        button.classList.add('btn-secondary');
        alert(`▶️ Transformación "${transformId}" activada.`);
    }
};

window.deleteTransformation = function(transformId) {
    if (confirm(`¿Estás seguro de que deseas eliminar la transformación "${transformId}"?\n\nEsta acción no se puede deshacer.`)) {
        alert(`🗑️ Transformación "${transformId}" eliminada exitosamente.`);
    }
};

// Funciones para Programación
window.showNewScheduleForm = function() {
    alert(`➕ Nueva Programación\n\nEsta función abrirá el formulario para crear una nueva programación de procesos.`);
};

window.previousMonth = function() {
    alert(`📅 Navegando al mes anterior\n\nEsta función mostrará el calendario del mes anterior.`);
};

window.nextMonth = function() {
    alert(`📅 Navegando al mes siguiente\n\nEsta función mostrará el calendario del mes siguiente.`);
};

window.editSchedule = function(scheduleId) {
    alert(`✏️ Editando programación: ${scheduleId}\n\nEsta función abrirá el editor de horarios y frecuencias.`);
};

window.runNowSchedule = function(scheduleId) {
    const button = event.target;
    const originalText = button.innerHTML;
    
    button.innerHTML = '🔄 Ejecutando...';
    button.disabled = true;
    
    setTimeout(() => {
        alert(`▶️ Proceso "${scheduleId}" ejecutado manualmente\n\n✅ Ejecución iniciada exitosamente\n⏰ Duración estimada: 5-15 minutos\n📧 Recibirás una notificación cuando termine`);
        
        button.innerHTML = originalText;
        button.disabled = false;
    }, 1500);
};

window.toggleSchedule = function(scheduleId) {
    const button = event.target;
    const scheduleItem = button.closest('.schedule-item');
    const statusBadge = scheduleItem.querySelector('.schedule-status');
    
    if (statusBadge.classList.contains('active')) {
        statusBadge.classList.remove('active');
        statusBadge.classList.add('paused');
        statusBadge.textContent = 'Pausado';
        button.innerHTML = '▶️ Reanudar';
        button.classList.remove('btn-secondary');
        button.classList.add('btn-primary');
        alert(`⏸️ Programación "${scheduleId}" pausada.`);
    } else {
        statusBadge.classList.remove('paused');
        statusBadge.classList.add('active');
        statusBadge.textContent = 'Activo';
        button.innerHTML = '⏸️ Pausar';
        button.classList.remove('btn-primary');
        button.classList.add('btn-secondary');
        alert(`▶️ Programación "${scheduleId}" reanudada.`);
    }
};

window.deleteSchedule = function(scheduleId) {
    if (confirm(`¿Estás seguro de que deseas eliminar la programación "${scheduleId}"?\n\nEsta acción no se puede deshacer y el proceso dejará de ejecutarse automáticamente.`)) {
        alert(`🗑️ Programación "${scheduleId}" eliminada exitosamente.`);
    }
};

// Variables globales para paginación de procesos ETL
let etlProcessesData = [
    {
        id: 'seguridad',
        icon: '�',
        status: 'active',
        statusText: 'Activo',
        title: 'ETL Seguridad IT',
        description: 'Monitoreo de seguridad y detección de amenazas',
        lastExecution: 'Hace 30 minutos',
        lastStatus: 'success',
        lastStatusText: 'Exitoso'
    },
    {
        id: 'ecommerce',
        icon: '�',
        status: 'active',
        statusText: 'Activo',
        title: 'ETL E-commerce',
        description: 'Análisis de tienda online y comportamiento de usuarios',
        lastExecution: 'Hace 1 hora',
        lastStatus: 'success',
        lastStatusText: 'Exitoso'
    },
    {
        id: 'ventas',
        icon: '�',
        status: 'active',
        statusText: 'Activo',
        title: 'ETL Ventas Diario',
        description: 'Procesamiento diario de datos de ventas desde múltiples fuentes',
        lastExecution: 'Hace 2 horas',
        lastStatus: 'success',
        lastStatusText: 'Exitoso'
    },
    {
        id: 'mobile',
        icon: '�',
        status: 'active',
        statusText: 'Activo',
        title: 'ETL Aplicaciones Mobile',
        description: 'Analytics de aplicaciones móviles y engagement',
        lastExecution: 'Hace 2 horas',
        lastStatus: 'success',
        lastStatusText: 'Exitoso'
    },
    {
        id: 'marketing',
        icon: '📈',
        status: 'active',
        statusText: 'Activo',
        title: 'ETL Marketing Digital',
        description: 'Análisis de campañas digitales y métricas de marketing',
        lastExecution: 'Hace 4 horas',
        lastStatus: 'success',
        lastStatusText: 'Exitoso'
    },
    {
        id: 'iot',
        icon: '�',
        status: 'warning',
        statusText: 'Advertencia',
        title: 'ETL Dispositivos IoT',
        description: 'Telemetría de sensores y dispositivos conectados',
        lastExecution: 'Hace 5 horas',
        lastStatus: 'warning',
        lastStatusText: 'Advertencia'
    },
    {
        id: 'inventario',
        icon: '�',
        status: 'active',
        statusText: 'Activo',
        title: 'ETL Inventario Semanal',
        description: 'Consolidación semanal de datos de inventario y stock',
        lastExecution: 'Hace 6 horas',
        lastStatus: 'success',
        lastStatusText: 'Exitoso'
    },
    {
        id: 'logistica',
        icon: '🚚',
        status: 'warning',
        statusText: 'Advertencia',
        title: 'ETL Logística y Envíos',
        description: 'Tracking de envíos y optimización de rutas',
        lastExecution: 'Hace 8 horas',
        lastStatus: 'warning',
        lastStatusText: 'Advertencia'
    },
    {
        id: 'calidad',
        icon: '🎯',
        status: 'active',
        statusText: 'Activo',
        title: 'ETL Control de Calidad',
        description: 'Métricas de calidad y control de procesos',
        lastExecution: 'Hace 12 horas',
        lastStatus: 'success',
        lastStatusText: 'Exitoso'
    },
    {
        id: 'clientes',
        icon: '👥',
        status: 'warning',
        statusText: 'Advertencia',
        title: 'ETL Clientes Incremental',
        description: 'Actualización incremental de datos de clientes',
        lastExecution: 'Hace 1 día',
        lastStatus: 'error',
        lastStatusText: 'Error'
    },
    {
        id: 'rrhh',
        icon: '�',
        status: 'active',
        statusText: 'Activo',
        title: 'ETL Recursos Humanos',
        description: 'Consolidación de datos de empleados y nómina',
        lastExecution: 'Hace 1 día',
        lastStatus: 'success',
        lastStatusText: 'Exitoso'
    },
    {
        id: 'proveedores',
        icon: '🤝',
        status: 'active',
        statusText: 'Activo',
        title: 'ETL Gestión Proveedores',
        description: 'Evaluación y seguimiento de proveedores',
        lastExecution: 'Hace 1 día',
        lastStatus: 'success',
        lastStatusText: 'Exitoso'
    },
    {
        id: 'produccion',
        icon: '🏭',
        status: 'inactive',
        statusText: 'Inactivo',
        title: 'ETL Datos de Producción',
        description: 'Monitoreo de líneas de producción y calidad',
        lastExecution: 'Hace 2 días',
        lastStatus: 'warning',
        lastStatusText: 'Advertencia'
    },
    {
        id: 'financiero',
        icon: '📊',
        status: 'active',
        statusText: 'Activo',
        title: 'ETL Reportes Financieros',
        description: 'Consolidación mensual de información financiera',
        lastExecution: 'Hace 3 días',
        lastStatus: 'success',
        lastStatusText: 'Exitoso'
    },
    {
        id: 'auditoria',
        icon: '�',
        status: 'inactive',
        statusText: 'Inactivo',
        title: 'ETL Auditoría Interna',
        description: 'Logs de auditoría y cumplimiento normativo',
        lastExecution: 'Hace 3 días',
        lastStatus: 'success',
        lastStatusText: 'Exitoso'
    }
];

let etlProcessesCurrentPage = 1;
let etlProcessesPerPage = 6;
let etlProcessesTotalPages = Math.ceil(etlProcessesData.length / etlProcessesPerPage);

// Función para cargar procesos ETL con paginación
window.loadEtlProcesses = function() {
    const startIndex = (etlProcessesCurrentPage - 1) * etlProcessesPerPage;
    const endIndex = startIndex + etlProcessesPerPage;
    const processesToShow = etlProcessesData.slice(startIndex, endIndex);
    
    const grid = document.getElementById('etlProcessesGrid');
    if (!grid) return;
    
    grid.innerHTML = processesToShow.map(process => `
        <div class="etl-process-card" onclick="selectEtlProcess(this, '${process.id}')">
            <div class="process-header">
                <div class="process-icon">${process.icon}</div>
                <div class="process-status-badge ${process.status}">${process.statusText}</div>
            </div>
            <h4>${process.title}</h4>
            <p>${process.description}</p>
            <div class="process-meta">
                <span>Última ejecución: ${process.lastExecution}</span>
                <span class="${process.lastStatus}">${process.lastStatusText}</span>
            </div>
        </div>
    `).join('');
};

// Función modificada para mostrar ETL Execute
window.showEtlExecute = function() {
    console.log('Navegando a Ejecutar ETL...');
    const etlViews = document.querySelectorAll('.etl-view');
    etlViews.forEach(view => view.classList.remove('active'));
    
    setTimeout(() => {
        const executeForm = document.getElementById('etlExecuteForm');
        if (executeForm) {
            executeForm.classList.add('active');
            console.log('Formulario Ejecutar ETL mostrado');
            
            // Cargar procesos con paginación
            loadEtlProcesses();
        }
    }, 100);
};

window.viewApiDetails = function(apiId) {
    const api = apiConnections.find(a => a.id === apiId);
    if (!api) return;
    
    alert(`📊 Detalles de ${api.name}:\n\n` +
          `URL: ${api.baseUrl}\n` +
          `Estado: ${api.status}\n` +
          `Uptime: ${api.uptime}%\n` +
          `Latencia: ${api.latency}ms\n` +
          `Requests hoy: ${api.requestsToday}`);
};

window.editConnection = function(apiId) {
    const api = apiConnections.find(a => a.id === apiId);
    if (!api) return;
    
    alert(`✏️ Editando conexión: ${api.name}\n\nEsta función abrirá el formulario de edición.`);
};

window.toggleConnection = function(apiId) {
    const api = apiConnections.find(a => a.id === apiId);
    if (!api) return;
    
    const newStatus = api.status === 'active' ? 'inactive' : 'active';
    api.status = newStatus;
    
    alert(`${newStatus === 'active' ? '▶️ Activando' : '⏸️ Desactivando'} conexión: ${api.name}`);
    
    // Actualizar vista
    refreshApiMonitor();
};

window.deleteConnection = function(apiId) {
    const api = apiConnections.find(a => a.id === apiId);
    if (!api) return;
    
    if (confirm(`¿Estás seguro de que deseas eliminar la conexión "${api.name}"?\n\nEsta acción no se puede deshacer.`)) {
        const index = apiConnections.findIndex(a => a.id === apiId);
        if (index > -1) {
            apiConnections.splice(index, 1);
            alert(`🗑️ Conexión "${api.name}" eliminada exitosamente.`);
            refreshApiMonitor();
        }
    }
};

function generateHourlyApiData() {
    const hours = [];
    const now = new Date();
    
    for (let i = 23; i >= 0; i--) {
        const hour = new Date(now.getTime() - (i * 60 * 60 * 1000));
        hours.push({
            hour: hour.getHours(),
            requests: Math.floor(Math.random() * 500) + 100,
            errors: Math.floor(Math.random() * 20),
            avgLatency: Math.floor(Math.random() * 200) + 150
        });
    }
    
    return hours;
}

function drawHourlyApiChart(data) {
    const canvas = document.getElementById('hourlyApiChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Configuración del gráfico
    const padding = 60;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Limpiar canvas
    ctx.clearRect(0, 0, width, height);
    
    // Fondo
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(padding, padding, chartWidth, chartHeight);
    
    // Grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    
    // Grid horizontal
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Grid vertical (cada 4 horas)
    for (let i = 0; i < data.length; i += 4) {
        const x = padding + (i * chartWidth / (data.length - 1));
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
        ctx.stroke();
    }
    
    // Línea de requests
    const maxRequests = Math.max(...data.map(d => d.requests));
    ctx.strokeStyle = '#4f7cff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    data.forEach((point, index) => {
        const x = padding + (index * chartWidth / (data.length - 1));
        const y = padding + chartHeight - ((point.requests / maxRequests) * chartHeight);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // Puntos en la línea
    data.forEach((point, index) => {
        const x = padding + (index * chartWidth / (data.length - 1));
        const y = padding + chartHeight - ((point.requests / maxRequests) * chartHeight);
        
        ctx.fillStyle = '#4f7cff';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
    });
    
    // Etiquetas del eje X (horas)
    ctx.fillStyle = '#6b7280';
    ctx.font = '11px system-ui';
    ctx.textAlign = 'center';
    
    for (let i = 0; i < data.length; i += 4) {
        const x = padding + (i * chartWidth / (data.length - 1));
        const hour = String(data[i].hour).padStart(2, '0') + ':00';
        ctx.fillText(hour, x, height - 20);
    }
    
    // Título
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 16px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('Requests por Hora (Últimas 24h)', width / 2, 25);
    
    // Escala Y
    ctx.font = '11px system-ui';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
        const value = Math.round((maxRequests / 5) * (5 - i));
        const y = padding + (chartHeight / 5) * i;
        ctx.fillText(value.toString(), padding - 10, y + 4);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Verificar si el usuario está logueado
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
        // Redireccionar al login si no está logueado
        window.location.href = 'login.html';
        return;
    }
    
    // Configuraciones por empresa
    const companyConfigs = {
        tecnocorp: {
            name: 'TecnoCorp',
            subtitle: 'Admin Total',
            logo: 'TC',
            primary: '#4f7cff',
            secondary: '#3b5bdb',
            tertiary: '#6c8eff'
        },
       innovaai: {
           name: 'InnovaAI',
           subtitle: 'Admin Total',
           logo: 'IA',
           primary: '#059669',
           secondary: '#047857',
           tertiary: '#10b981'
       },
       datastream: {
           name: 'DataStream',
           subtitle: 'Admin Total',
           logo: 'DS',
           primary: '#7c3aed',
           secondary: '#6d28d9',
           tertiary: '#8b5cf6'
       }
   };

   // Variables globales del sistema
   let activityData = [];
   let filteredActivityData = [];
   let currentActivityPage = 1;
   let activityItemsPerPage = 5;
   
   let currentAnalysisStep = 1;
   const totalAnalysisSteps = 4;
   let analysisConfig = {
       type: '',
       dataSource: '',
       name: '',
       description: '',
       category: '',
       options: {}
   };
   
   let historyData = [];
   let filteredHistory = [];
   let currentPage = 1;
   let itemsPerPage = 10;
   let currentUser = 'Juan Pérez';

   // Variables para análisis creados y gráficos del dashboard
   let userAnalyses = [];
   let dashboardCharts = {
       trends: null,
       distribution: null
   };

   // Funciones de utilidad
   function getFileIcon(filename) {
       const extension = filename.split('.').pop().toLowerCase();
       const icons = {
           'csv': '📊',
           'xlsx': '📗',
           'json': '📄'
       };
       return icons[extension] || '📁';
   }

   function formatFileSize(bytes) {
       if (bytes === 0) return '0 Bytes';
       const k = 1024;
       const sizes = ['Bytes', 'KB', 'MB'];
       const i = Math.floor(Math.log(bytes) / Math.log(k));
       return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
   }

   // Contenido de las pantallas
   const dashboardContent = {
       'dashboard': `
           <div class="dashboard-header">
               <h2 class="dashboard-title">Resumen General</h2>
               <div class="quick-actions">
    <button class="quick-action-btn" data-action="cargar-datos">
        <span>📤</span>
        Cargar Datos
    </button>
    <button class="quick-action-btn secondary" data-action="nuevo-analisis">
        <span>📊</span>
        Nuevo Análisis
    </button>
</div>
           </div>

           <!-- Stats Grid -->
           <div class="stats-grid">
               <div class="stat-card">
                   <div class="stat-header">
                       <div class="stat-icon">📊</div>
                       <div class="stat-trend up">
                           <span>↗️</span>
                           +12.5%
                       </div>
                   </div>
                   <div class="stat-value">1,247</div>
                   <div class="stat-label">Registros Procesados</div>
               </div>

               <div class="stat-card">
                   <div class="stat-header">
                       <div class="stat-icon">📁</div>
                       <div class="stat-trend up">
                           <span>↗️</span>
                           +8.2%
                       </div>
                   </div>
                   <div class="stat-value">23</div>
                   <div class="stat-label">Archivos Cargados</div>
               </div>

               <div class="stat-card">
                   <div class="stat-header">
                       <div class="stat-icon">🎯</div>
                       <div class="stat-trend up">
                           <span>↗️</span>
                           +2.1%
                       </div>
                   </div>
                   <div class="stat-value">92%</div>
                   <div class="stat-label">Precisión Promedio</div>
               </div>

               <div class="stat-card">
                   <div class="stat-header">
                       <div class="stat-icon">🔮</div>
                       <div class="stat-trend down">
                           <span>↘️</span>
                           -1.3%
                       </div>
                   </div>
                   <div class="stat-value">5</div>
                   <div class="stat-label">Predicciones Activas</div>
               </div>
           </div>

           <!-- Charts Section -->
           <div class="charts-section">
               <div class="chart-container">
                   <div class="chart-header">
                       <h3 class="chart-title">Análisis de Tendencias</h3>
                       <div class="chart-controls">
                           <select id="trendsAnalysisSelect" class="chart-filter-select" onchange="updateTrendsChart()">
                               <option value="">Seleccionar análisis...</option>
                           </select>
                           <div class="chart-filter">
                               <button class="filter-btn active" onclick="updateTrendsFilter('7D')">7D</button>
                               <button class="filter-btn" onclick="updateTrendsFilter('30D')">30D</button>
                               <button class="filter-btn" onclick="updateTrendsFilter('90D')">90D</button>
                           </div>
                       </div>
                   </div>
                   <div class="chart-content">
                       <canvas id="trendsChart" width="600" height="320"></canvas>
                       <div id="trendsPlaceholder" class="chart-placeholder">
                           📈<br><span class="placeholder-text">Crea un análisis para ver las tendencias</span>
                       </div>
                   </div>
               </div>

               <div class="chart-container">
                   <div class="chart-header">
                       <h3 class="chart-title">Distribución de Datos</h3>
                       <div class="chart-controls">
                           <select id="distributionAnalysisSelect" class="chart-filter-select" onchange="updateDistributionChart()">
                               <option value="">Seleccionar análisis...</option>
                           </select>
                       </div>
                   </div>
                   <div class="chart-content">
                       <canvas id="distributionChart" width="400" height="240"></canvas>
                       <div id="distributionPlaceholder" class="chart-placeholder" style="height: 240px;">
                           🥧<br><span class="placeholder-text">Crea un análisis para ver la distribución</span>
                       </div>
                   </div>
               </div>
           </div>

           <!-- Recent Activity -->
           <div class="recent-activity">
               <div class="activity-header">
                   <h3 class="chart-title">Mi Actividad Reciente</h3>
                   <div class="activity-search">
                       <input type="text" id="activitySearch" placeholder="Buscar en mi actividad..." class="search-input">
                       <button class="search-btn">🔍</button>
                   </div>
               </div>
               
               <div class="activity-table-container">
                   <table class="activity-table">
                       <thead>
                           <tr>
                               <th>Actividad</th>
                               <th>Descripción</th>
                               <th>Usuario</th>
                               <th>Fecha Registro</th>
                               <th>Tiempo</th>
                           </tr>
                       </thead>
                       <tbody id="activityTableBody">
                           <!-- Se llena dinámicamente -->
                       </tbody>
                   </table>
               </div>
               
               <div class="activity-pagination">
                   <div class="pagination-info">
                       <span id="activityPaginationInfo">Mostrando 1-5 de 25 actividades</span>
                   </div>
                   <div class="pagination-controls">
                       <button class="pagination-btn" id="activityPrevBtn" onclick="changeActivityPage(-1)">‹</button>
                       <button class="pagination-btn" id="activityNextBtn" onclick="changeActivityPage(1)">›</button>
                   </div>
               </div>
           </div>
       `,
       
       'analisis': `
           <div class="dashboard-header">
               <h2 class="dashboard-title">Análisis de Datos</h2>
               <div class="quick-actions">
                   <button class="quick-action-btn" onclick="setActiveContent('nuevo-analisis')">
                       <span>📊</span>
                       Nuevo Análisis
                   </button>
                   <button class="quick-action-btn secondary" onclick="setActiveContent('cargar-datos')">
                       <span>📤</span>
                       Cargar Datos
                   </button>
               </div>
           </div>

           <div class="stats-grid">
               <div class="stat-card">
                   <div class="stat-header">
                       <div class="stat-icon">📈</div>
                       <div class="stat-trend up">
                           <span>↗️</span>
                           +5.2%
                       </div>
                   </div>
                   <div class="stat-value">89</div>
                   <div class="stat-label">Análisis Completados</div>
               </div>

               <div class="stat-card">
                   <div class="stat-header">
                       <div class="stat-icon">⏱️</div>
                       <div class="stat-trend up">
                           <span>↗️</span>
                           +12%
                       </div>
                   </div>
                   <div class="stat-value">4.2h</div>
                   <div class="stat-label">Tiempo Promedio</div>
               </div>

               <div class="stat-card">
                   <div class="stat-header">
                       <div class="stat-icon">🎯</div>
                       <div class="stat-trend up">
                           <span>↗️</span>
                           +7.8%
                       </div>
                   </div>
                   <div class="stat-value">96.3%</div>
                   <div class="stat-label">Precisión Media</div>
               </div>
           </div>

           <div class="chart-container">
               <div class="chart-header">
                   <h3 class="chart-title">Análisis por Categoría</h3>
                   <div class="chart-controls">
                       <select id="categoryChartType" onchange="updateCategoryChart()">
                           <option value="bar">Gráfico de Barras</option>
                           <option value="pie">Gráfico Circular</option>
                           <option value="line">Tendencia Temporal</option>
                       </select>
                       <select id="categoryMetric" onchange="updateCategoryChart()">
                           <option value="count">Número de Análisis</option>
                           <option value="success">Tasa de Éxito</option>
                           <option value="performance">Rendimiento</option>
                       </select>
                   </div>
               </div>
               <canvas id="categoryChart" width="600" height="300"></canvas>
           </div>
       `,

       'ia-predictiva': `
           <div class="dashboard-header">
               <h2 class="dashboard-title">Inteligencia Artificial Predictiva</h2>
               <div class="quick-actions">
                   <button class="quick-action-btn" onclick="showTrainModelForm()">
                       <span>🤖</span>
                       Entrenar Modelo
                   </button>
                   <button class="quick-action-btn secondary" onclick="showNewPredictionForm()">
                       <span>�</span>
                       Nueva Predicción
                   </button>
               </div>
           </div>

           <!-- Stats Grid -->
           <div class="stats-grid">
               <div class="stat-card">
                   <div class="stat-header">
                       <div class="stat-icon">🤖</div>
                       <div class="stat-trend up">
                           <span>↗️</span>
                           +15%
                       </div>
                   </div>
                   <div class="stat-value">8</div>
                   <div class="stat-label">Modelos Activos</div>
               </div>

               <div class="stat-card">
                   <div class="stat-header">
                       <div class="stat-icon">🎯</div>
                       <div class="stat-trend up">
                           <span>↗️</span>
                           +5.2%
                       </div>
                   </div>
                   <div class="stat-value">94.8%</div>
                   <div class="stat-label">Precisión Promedio</div>
               </div>

               <div class="stat-card">
                   <div class="stat-header">
                       <div class="stat-icon">🔮</div>
                       <div class="stat-trend up">
                           <span>↗️</span>
                           +23%
                       </div>
                   </div>
                   <div class="stat-value">1,247</div>
                   <div class="stat-label">Predicciones Este Mes</div>
               </div>

               <div class="stat-card">
                   <div class="stat-header">
                       <div class="stat-icon">⏱️</div>
                       <div class="stat-trend up">
                           <span>↗️</span>
                           +12%
                       </div>
                   </div>
                   <div class="stat-value">2.3s</div>
                   <div class="stat-label">Tiempo Promedio</div>
               </div>
           </div>

           <!-- Modelos de IA -->
           <div class="content-section">
               <div class="section-header">
                   <h3 class="section-title">Modelos de IA</h3>
                   <div class="section-filters">
                       <select class="filter-select">
                           <option>Todos los modelos</option>
                           <option>Activos</option>
                           <option>En entrenamiento</option>
                           <option>Pausados</option>
                       </select>
                   </div>
               </div>

               <div class="models-grid">
                   <div class="model-card">
                       <div class="model-header">
                           <div class="model-status active">●</div>
                           <h4 class="model-name">Predicción de Ventas</h4>
                           <div class="model-type">Regresión</div>
                       </div>
                       <div class="model-stats">
                           <div class="model-stat">
                               <span class="stat-label">Precisión</span>
                               <span class="stat-value">96.2%</span>
                           </div>
                           <div class="model-stat">
                               <span class="stat-label">Último entrenamiento</span>
                               <span class="stat-value">Hace 2 días</span>
                           </div>
                       </div>
                       <div class="model-actions">
                           <button class="btn-small primary">Ejecutar</button>
                           <button class="btn-small secondary">Reentrenar</button>
                       </div>
                   </div>

                   <div class="model-card">
                       <div class="model-header">
                           <div class="model-status active">●</div>
                           <h4 class="model-name">Clasificación de Clientes</h4>
                           <div class="model-type">Clasificación</div>
                       </div>
                       <div class="model-stats">
                           <div class="model-stat">
                               <span class="stat-label">Precisión</span>
                               <span class="stat-value">89.7%</span>
                           </div>
                           <div class="model-stat">
                               <span class="stat-label">Último entrenamiento</span>
                               <span class="stat-value">Hace 1 semana</span>
                           </div>
                       </div>
                       <div class="model-actions">
                           <button class="btn-small primary">Ejecutar</button>
                           <button class="btn-small secondary">Reentrenar</button>
                       </div>
                   </div>

                   <div class="model-card">
                       <div class="model-header">
                           <div class="model-status training">●</div>
                           <h4 class="model-name">Detección de Anomalías</h4>
                           <div class="model-type">Clustering</div>
                       </div>
                       <div class="model-stats">
                           <div class="model-stat">
                               <span class="stat-label">Progreso</span>
                               <span class="stat-value">78%</span>
                           </div>
                           <div class="model-stat">
                               <span class="stat-label">Tiempo restante</span>
                               <span class="stat-value">15 min</span>
                           </div>
                       </div>
                       <div class="model-actions">
                           <button class="btn-small secondary" disabled>Entrenando...</button>
                       </div>
                   </div>
               </div>
           </div>

           <!-- Predicciones Recientes -->
           <div class="content-section">
               <div class="section-header">
                   <h3 class="section-title">Predicciones Recientes</h3>
                   <button class="btn-small secondary">Ver todas</button>
               </div>

               <div class="table-container">
                   <table class="data-table">
                       <thead>
                           <tr>
                               <th>Modelo</th>
                               <th>Resultado</th>
                               <th>Confianza</th>
                               <th>Fecha</th>
                               <th>Acciones</th>
                           </tr>
                       </thead>
                       <tbody>
                           <tr>
                               <td>
                                   <div class="model-info">
                                       <span class="model-name">Predicción de Ventas</span>
                                       <span class="model-type">Regresión</span>
                                   </div>
                               </td>
                               <td>
                                   <span class="prediction-result positive">+23.5%</span>
                               </td>
                               <td>
                                   <div class="confidence-bar">
                                       <div class="confidence-fill" style="width: 94%"></div>
                                       <span class="confidence-text">94%</span>
                                   </div>
                               </td>
                               <td>2025-08-06 10:30</td>
                               <td>
                                   <button class="btn-icon" title="Ver detalles">👁️</button>
                                   <button class="btn-icon" title="Exportar">📤</button>
                               </td>
                           </tr>
                           <tr>
                               <td>
                                   <div class="model-info">
                                       <span class="model-name">Clasificación de Clientes</span>
                                       <span class="model-type">Clasificación</span>
                                   </div>
                               </td>
                               <td>
                                   <span class="prediction-result neutral">Clase A</span>
                               </td>
                               <td>
                                   <div class="confidence-bar">
                                       <div class="confidence-fill" style="width: 87%"></div>
                                       <span class="confidence-text">87%</span>
                                   </div>
                               </td>
                               <td>2025-08-06 09:15</td>
                               </td>
                           </tr>
                       </tbody>
                   </table>
               </div>
           </div>

           <!-- Gráficos de Rendimiento -->
           <div class="content-section">
               <div class="section-header">
                   <h3 class="section-title">Rendimiento de Modelos</h3>
                   <div class="chart-controls">
                       <select class="filter-select" onchange="updatePerformanceChart(this.value)">
                           <option value="30">Últimos 30 días</option>
                           <option value="7">Últimos 7 días</option>
                           <option value="1">Hoy</option>
                       </select>
                   </div>
               </div>

               <div class="charts-container">
                   <div class="chart-card">
                       <div class="chart-header">
                           <h4>Precisión por Modelo</h4>
                       </div>
                       <div class="chart-content">
                           <canvas id="accuracyChart" width="600" height="300"></canvas>
                       </div>
                   </div>

                   <div class="chart-card">
                       <div class="chart-header">
                           <h4>Predicciones por Día</h4>
                       </div>
                       <div class="chart-content">
                           <canvas id="predictionsChart" width="600" height="300"></canvas>
                       </div>
                   </div>
               </div>
           </div>

           <!-- Modelos de IA Extendidos -->
           <div class="content-section">
               <div class="section-header">
                   <h3 class="section-title">Modelos de IA</h3>
                   <div class="section-filters">
                       <select class="filter-select" onchange="filterModels(this.value)">
                           <option value="all">Todos los modelos</option>
                           <option value="active">Activos</option>
                           <option value="training">En entrenamiento</option>
                           <option value="paused">Pausados</option>
                       </select>
                   </div>
               </div>

               <div class="models-grid" id="modelsGrid">
                   <div class="model-card active" data-status="active">
                       <div class="model-header">
                           <div class="model-status active">●</div>
                           <h4 class="model-name">Predicción de Ventas</h4>
                           <div class="model-type">Regresión</div>
                       </div>
                       <div class="model-stats">
                           <div class="model-stat">
                               <span class="stat-label">Precisión</span>
                               <span class="stat-value">96.2%</span>
                           </div>
                           <div class="model-stat">
                               <span class="stat-label">Último entrenamiento</span>
                               <span class="stat-value">Hace 2 días</span>
                           </div>
                           <div class="model-stat">
                               <span class="stat-label">Predicciones hoy</span>
                               <span class="stat-value">234</span>
                           </div>
                       </div>
                       <div class="model-actions">
                           <button class="btn-small primary" onclick="executeModel('ventas')">Ejecutar</button>
                           <button class="btn-small secondary" onclick="retrainModel('ventas')">Reentrenar</button>
                           <button class="btn-icon" onclick="viewModelDetails('ventas')" title="Ver detalles">👁️</button>
                       </div>
                   </div>

                   <div class="model-card active" data-status="active">
                       <div class="model-header">
                           <div class="model-status active">●</div>
                           <h4 class="model-name">Clasificación de Clientes</h4>
                           <div class="model-type">Clasificación</div>
                       </div>
                       <div class="model-stats">
                           <div class="model-stat">
                               <span class="stat-label">Precisión</span>
                               <span class="stat-value">89.7%</span>
                           </div>
                           <div class="model-stat">
                               <span class="stat-label">Último entrenamiento</span>
                               <span class="stat-value">Hace 1 semana</span>
                           </div>
                           <div class="model-stat">
                               <span class="stat-label">Predicciones hoy</span>
                               <span class="stat-value">156</span>
                           </div>
                       </div>
                       <div class="model-actions">
                           <button class="btn-small primary" onclick="executeModel('clientes')">Ejecutar</button>
                           <button class="btn-small secondary" onclick="retrainModel('clientes')">Reentrenar</button>
                           <button class="btn-icon" onclick="viewModelDetails('clientes')" title="Ver detalles">👁️</button>
                       </div>
                   </div>

                   <div class="model-card training" data-status="training">
                       <div class="model-header">
                           <div class="model-status training">●</div>
                           <h4 class="model-name">Detección de Anomalías</h4>
                           <div class="model-type">Clustering</div>
                       </div>
                       <div class="model-progress">
                           <div class="progress-bar">
                               <div class="progress-fill" style="width: 78%"></div>
                           </div>
                           <div class="progress-text">78% completado</div>
                       </div>
                       <div class="model-stats">
                           <div class="model-stat">
                               <span class="stat-label">Tiempo restante</span>
                               <span class="stat-value">15 min</span>
                           </div>
                           <div class="model-stat">
                               <span class="stat-label">Épocas</span>
                               <span class="stat-value">78/100</span>
                           </div>
                       </div>
                       <div class="model-actions">
                           <button class="btn-small secondary" onclick="pauseTraining('anomalias')">Pausar</button>
                           <button class="btn-small danger" onclick="stopTraining('anomalias')">Detener</button>
                       </div>
                   </div>

                   <div class="model-card active" data-status="active">
                       <div class="model-header">
                           <div class="model-status active">●</div>
                           <h4 class="model-name">Forecast Inventario</h4>
                           <div class="model-type">Series Temporales</div>
                       </div>
                       <div class="model-stats">
                           <div class="model-stat">
                               <span class="stat-label">Precisión</span>
                               <span class="stat-value">92.4%</span>
                           </div>
                           <div class="model-stat">
                               <span class="stat-label">Último entrenamiento</span>
                               <span class="stat-value">Hace 5 días</span>
                           </div>
                           <div class="model-stat">
                               <span class="stat-label">Predicciones hoy</span>
                               <span class="stat-value">89</span>
                           </div>
                       </div>
                       <div class="model-actions">
                           <button class="btn-small primary" onclick="executeModel('inventario')">Ejecutar</button>
                           <button class="btn-small secondary" onclick="retrainModel('inventario')">Reentrenar</button>
                           <button class="btn-icon" onclick="viewModelDetails('inventario')" title="Ver detalles">👁️</button>
                       </div>
                   </div>
               </div>
           </div>

           <!-- Historial Completo de Predicciones -->
           <div class="content-section">
               <div class="section-header">
                   <h3 class="section-title">Historial Completo de Predicciones</h3>
                   <div class="section-filters">
                       <input type="text" class="search-input" placeholder="Buscar predicciones..." onkeyup="filterPredictions(this.value)">
                       <select class="filter-select" onchange="filterPredictionsByModel(this.value)">
                           <option value="all">Todos los modelos</option>
                           <option value="ventas">Predicción de Ventas</option>
                           <option value="clientes">Clasificación de Clientes</option>
                           <option value="inventario">Forecast Inventario</option>
                       </select>
                       <button class="btn-small secondary" onclick="exportPredictions()">Exportar</button>
                   </div>
               </div>

               <div class="table-container">
                   <table class="data-table" id="predictionsTable">
                       <thead>
                           <tr>
                               <th>Modelo</th>
                               <th>Input</th>
                               <th>Resultado</th>
                               <th>Confianza</th>
                               <th>Fecha</th>
                               <th>Usuario</th>
                               <th>Acciones</th>
                           </tr>
                       </thead>
                       <tbody>
                           <tr>
                               <td>
                                   <div class="model-info">
                                       <span class="model-name">Predicción de Ventas</span>
                                       <span class="model-type">Regresión</span>
                                   </div>
                               </td>
                               <td>
                                   <div class="input-summary">
                                       <span class="input-text">Producto A, Q4 2025</span>
                                       <span class="input-details">5 variables</span>
                                   </div>
                               </td>
                               <td>
                                   <span class="prediction-result positive">+23.5%</span>
                               </td>
                               <td>
                                   <div class="confidence-bar">
                                       <div class="confidence-fill" style="width: 94%"></div>
                                       <span class="confidence-text">94%</span>
                                   </div>
                               </td>
                               <td>2025-08-06 11:30</td>
                               <td>Juan Pérez</td>
                               <td>
                                   <button class="btn-icon" onclick="viewPredictionDetails(1)" title="Ver detalles">👁️</button>
                                   <button class="btn-icon" onclick="exportPrediction(1)" title="Exportar">📤</button>
                                   <button class="btn-icon" onclick="sharePrediction(1)" title="Compartir">🔗</button>
                               </td>
                           </tr>
                           <tr>
                               <td>
                                   <div class="model-info">
                                       <span class="model-name">Clasificación de Clientes</span>
                                       <span class="model-type">Clasificación</span>
                                   </div>
                               </td>
                               <td>
                                   <div class="input-summary">
                                       <span class="input-text">Cliente ID: 12847</span>
                                       <span class="input-details">8 características</span>
                                   </div>
                               </td>
                               <td>
                                   <span class="prediction-result neutral">Premium</span>
                               </td>
                               <td>
                                   <div class="confidence-bar">
                                       <div class="confidence-fill" style="width: 87%"></div>
                                       <span class="confidence-text">87%</span>
                                   </div>
                               </td>
                               <td>2025-08-06 11:15</td>
                               <td>María García</td>
                               <td>
                                   <button class="btn-icon" onclick="viewPredictionDetails(2)" title="Ver detalles">👁️</button>
                                   <button class="btn-icon" onclick="exportPrediction(2)" title="Exportar">📤</button>
                                   <button class="btn-icon" onclick="sharePrediction(2)" title="Compartir">🔗</button>
                               </td>
                           </tr>
                           <tr>
                               <td>
                                   <div class="model-info">
                                       <span class="model-name">Forecast Inventario</span>
                                       <span class="model-type">Series Temporales</span>
                                   </div>
                               </td>
                               <td>
                                   <div class="input-summary">
                                       <span class="input-text">SKU-4567, Próx. 30 días</span>
                                       <span class="input-details">Datos históricos</span>
                                   </div>
                               </td>
                               <td>
                                   <span class="prediction-result warning">-15%</span>
                               </td>
                               <td>
                                   <div class="confidence-bar">
                                       <div class="confidence-fill" style="width: 91%"></div>
                                       <span class="confidence-text">91%</span>
                                   </div>
                               </td>
                               <td>2025-08-06 10:45</td>
                               <td>Carlos López</td>
                               <td>
                                   <button class="btn-icon" onclick="viewPredictionDetails(3)" title="Ver detalles">👁️</button>
                                   <button class="btn-icon" onclick="exportPrediction(3)" title="Exportar">📤</button>
                                   <button class="btn-icon" onclick="sharePrediction(3)" title="Compartir">🔗</button>
                               </td>
                           </tr>
                       </tbody>
                   </table>
               </div>

               <div class="table-pagination">
                   <div class="pagination-info">
                       Mostrando 1-3 de 1,247 predicciones
                   </div>
                   <div class="pagination-controls">
                       <button class="pagination-btn" disabled>‹</button>
                       <button class="pagination-btn active">1</button>
                       <button class="pagination-btn">2</button>
                       <button class="pagination-btn">3</button>
                       <button class="pagination-btn">...</button>
                       <button class="pagination-btn">416</button>
                       <button class="pagination-btn">›</button>
                   </div>
               </div>
           </div>

           <!-- Métricas de Rendimiento -->
           <div class="content-section">
               <div class="section-header">
                   <h3 class="section-title">Métricas de Rendimiento</h3>
                   <div class="metrics-period">
                       <select class="filter-select" onchange="updateMetricsPeriod(this.value)">
                           <option value="today">Hoy</option>
                           <option value="week">Esta semana</option>
                           <option value="month" selected>Este mes</option>
                           <option value="quarter">Este trimestre</option>
                       </select>
                   </div>
               </div>

               <div class="metrics-grid">
                   <div class="metric-card">
                       <div class="metric-header">
                           <h4>Tiempo de Respuesta</h4>
                           <span class="metric-trend positive">↗ +12%</span>
                       </div>
                       <div class="metric-value">2.3s</div>
                       <div class="metric-details">Promedio este mes</div>
                       <div class="metric-chart">
                           <canvas id="responseTimeChart" width="200" height="60"></canvas>
                       </div>
                   </div>

                   <div class="metric-card">
                       <div class="metric-header">
                           <h4>Tasa de Acierto</h4>
                           <span class="metric-trend positive">↗ +3.2%</span>
                       </div>
                       <div class="metric-value">94.8%</div>
                       <div class="metric-details">Precisión promedio</div>
                       <div class="metric-chart">
                           <canvas id="accuracyTrendChart" width="200" height="60"></canvas>
                       </div>
                   </div>

                   <div class="metric-card">
                       <div class="metric-header">
                           <h4>Throughput</h4>
                           <span class="metric-trend positive">↗ +18%</span>
                       </div>
                       <div class="metric-value">1,247</div>
                       <div class="metric-details">Predicciones/día</div>
                       <div class="metric-chart">
                           <canvas id="throughputChart" width="200" height="60"></canvas>
                       </div>
                   </div>

                   <div class="metric-card">
                       <div class="metric-header">
                           <h4>Recursos</h4>
                           <span class="metric-trend neutral">→ 0%</span>
                       </div>
                       <div class="metric-value">67%</div>
                       <div class="metric-details">CPU promedio</div>
                       <div class="metric-chart">
                           <canvas id="resourcesChart" width="200" height="60"></canvas>
                       </div>
                   </div>
               </div>
           </div>
       `,

       'informes': `
           <div class="dashboard-header">
               <h2 class="dashboard-title">Informes</h2>
               <div class="quick-actions">
                   <button class="quick-action-btn" onclick="alert('🚧 Sección en desarrollo')">
                       <span>📊</span>
                       Nuevo Informe
                   </button>
               </div>
           </div>
           <div class="content-placeholder">
               <div class="placeholder-icon">🔧</div>
               <h3>Sección en Desarrollo</h3>
               <p>Esta funcionalidad estará disponible próximamente.</p>
           </div>
       `,

       'dashboards': `
                                   <select class="form-input" id="algorithmType">
                                       <option value="">Seleccionar algoritmo...</option>
                                       <option value="linear-regression">Regresión Lineal</option>
                                       <option value="random-forest">Random Forest</option>
                                       <option value="neural-network">Red Neuronal</option>
                                       <option value="svm">Support Vector Machine</option>
                                       <option value="gradient-boosting">Gradient Boosting</option>
                                   </select>
                               </div>
                               
                               <div class="form-group">
                                   <label class="form-label">Problema a Resolver</label>
                                   <select class="form-input" id="problemType">
                                       <option value="">Seleccionar tipo...</option>
                                       <option value="regression">Regresión</option>
                                       <option value="classification">Clasificación</option>
                                       <option value="clustering">Clustering</option>
                                       <option value="time-series">Series Temporales</option>
                                   </select>
                               </div>
                           </div>
                           
                           <div class="form-group">
                               <label class="form-label">Descripción</label>
                               <textarea class="form-input" id="modelDescription" rows="3" placeholder="Describe el objetivo del modelo y casos de uso..."></textarea>
                           </div>
                       </div>

                       <!-- Fuente de Datos -->
                       <div class="form-section">
                           <h4 class="section-title">📁 Fuente de Datos</h4>
                           
                           <div class="data-source-options">
                               <label class="radio-option" onclick="selectDataSource('file')">
                                   <input type="radio" name="dataSource" value="file">
                                   <span class="radio-custom"></span>
                                   <div class="option-content">
                                       <span class="option-icon">📄</span>
                                       <div class="option-text">
                                           <strong>Archivo CSV/Excel</strong>
                                           <small>Subir archivo desde tu dispositivo</small>
                                       </div>
                                   </div>
                               </label>
                               
                               <label class="radio-option" onclick="selectDataSource('database')">
                                   <input type="radio" name="dataSource" value="database">
                                   <span class="radio-custom"></span>
                                   <div class="option-content">
                                       <span class="option-icon">🗄️</span>
                                       <div class="option-text">
                                           <strong>Base de Datos</strong>
                                           <small>Conectar a base de datos existente</small>
                                       </div>
                                   </div>
                               </label>
                               
                               <label class="radio-option" onclick="selectDataSource('api')">
                                   <input type="radio" name="dataSource" value="api">
                                   <span class="radio-custom"></span>
                                   <div class="option-content">
                                       <span class="option-icon">🔗</span>
                                       <div class="option-text">
                                           <strong>API Externa</strong>
                                           <small>Obtener datos desde una API</small>
                                       </div>
                                   </div>
                               </label>
                           </div>
                           
                           <!-- Configuración específica para Archivo -->
                           <div id="fileSourceConfig" class="source-config" style="display: none;">
                               <div class="form-group">
                                   <label class="form-label">Archivo de Entrenamiento</label>
                                   <div class="file-upload-zone" onclick="document.getElementById('trainingFile').click()">
                                       <input type="file" id="trainingFile" class="file-input" accept=".csv,.xlsx,.json" onchange="handleFileSelection(this)">
                                       <div class="upload-content">
                                           <span class="upload-icon">📤</span>
                                           <p>Arrastra y suelta tu archivo aquí</p>
                                           <p class="upload-hint">o haz clic para seleccionar</p>
                                           <p class="file-types">Formatos: CSV, Excel, JSON (máx. 50MB)</p>
                                       </div>
                                   </div>
                                   <div id="selectedFileName" class="selected-file" style="display: none;"></div>
                               </div>
                               
                               <div class="form-row">
                                   <div class="form-group">
                                       <label class="form-label">Separador CSV</label>
                                       <select class="form-input" id="csvSeparator">
                                           <option value=",">Coma (,)</option>
                                           <option value=";">Punto y coma (;)</option>
                                           <option value="\t">Tabulador</option>
                                           <option value="|">Barra vertical (|)</option>
                                       </select>
                                   </div>
                                   
                                   <div class="form-group">
                                       <label class="form-label">Codificación</label>
                                       <select class="form-input" id="fileEncoding">
                                           <option value="utf-8">UTF-8</option>
                                           <option value="latin1">Latin-1</option>
                                           <option value="ascii">ASCII</option>
                                       </select>
                                   </div>
                               </div>
                               
                               <div class="form-group">
                                   <div class="checkbox-group">
                                       <label class="checkbox-option">
                                           <input type="checkbox" id="hasHeaders" checked>
                                           <span class="checkbox-custom"></span>
                                           El archivo tiene encabezados
                                       </label>
                                   </div>
                               </div>
                           </div>
                           
                           <!-- Configuración específica para Base de Datos -->
                           <div id="databaseSourceConfig" class="source-config" style="display: none;">
                               <div class="form-row">
                                   <div class="form-group">
                                       <label class="form-label">Tipo de Base de Datos</label>
                                       <select class="form-input" id="databaseType">
                                           <option value="">Seleccionar tipo...</option>
                                           <option value="mysql">MySQL</option>
                                           <option value="postgresql">PostgreSQL</option>
                                           <option value="sqlserver">SQL Server</option>
                                           <option value="oracle">Oracle</option>
                                           <option value="sqlite">SQLite</option>
                                       </select>
                                   </div>
                                   
                                   <div class="form-group">
                                       <label class="form-label">Servidor</label>
                                       <input type="text" class="form-input" id="dbServer" placeholder="localhost:3306">
                                   </div>
                               </div>
                               
                               <div class="form-row">
                                   <div class="form-group">
                                       <label class="form-label">Base de Datos</label>
                                       <input type="text" class="form-input" id="dbName" placeholder="nombre_base_datos">
                                   </div>
                                   
                                   <div class="form-group">
                                       <label class="form-label">Tabla/Vista</label>
                                       <input type="text" class="form-input" id="dbTable" placeholder="nombre_tabla">
                                   </div>
                               </div>
                               
                               <div class="form-row">
                                   <div class="form-group">
                                       <label class="form-label">Usuario</label>
                                       <input type="text" class="form-input" id="dbUser" placeholder="usuario">
                                   </div>
                                   
                                   <div class="form-group">
                                       <label class="form-label">Contraseña</label>
                                       <input type="password" class="form-input" id="dbPassword" placeholder="contraseña">
                                   </div>
                               </div>
                               
                               <div class="form-group">
                                   <label class="form-label">Consulta SQL (Opcional)</label>
                                   <textarea class="form-input" id="sqlQuery" rows="3" placeholder="SELECT * FROM tabla WHERE condicion..."></textarea>
                               </div>
                               
                               <div class="form-actions-inline">
                                   <button type="button" class="btn-secondary btn-small" onclick="testDatabaseConnection()">
                                       <span>🔍</span>
                                       Probar Conexión
                                   </button>
                               </div>
                           </div>
                           
                           <!-- Configuración específica para API -->
                           <div id="apiSourceConfig" class="source-config" style="display: none;">
                               <div class="form-group">
                                   <label class="form-label">URL de la API</label>
                                   <input type="url" class="form-input" id="apiUrl" placeholder="https://api.ejemplo.com/datos">
                               </div>
                               
                               <div class="form-row">
                                   <div class="form-group">
                                       <label class="form-label">Método HTTP</label>
                                       <select class="form-input" id="apiMethod">
                                           <option value="GET">GET</option>
                                           <option value="POST">POST</option>
                                       </select>
                                   </div>
                                   
                                   <div class="form-group">
                                       <label class="form-label">Formato de Respuesta</label>
                                       <select class="form-input" id="apiFormat">
                                           <option value="json">JSON</option>
                                           <option value="xml">XML</option>
                                           <option value="csv">CSV</option>
                                       </select>
                                   </div>
                               </div>
                               
                               <div class="form-group">
                                   <label class="form-label">Autenticación</label>
                                   <select class="form-input" id="apiAuth" onchange="toggleApiAuthFields()">
                                       <option value="none">Sin autenticación</option>
                                       <option value="apikey">API Key</option>
                                       <option value="bearer">Bearer Token</option>
                                       <option value="basic">Basic Auth</option>
                                   </select>
                               </div>
                               
                               <div id="apiAuthFields" style="display: none;">
                                   <div id="apiKeyField" class="form-group" style="display: none;">
                                       <label class="form-label">API Key</label>
                                       <input type="text" class="form-input" id="apiKey" placeholder="tu-api-key">
                                   </div>
                                   
                                   <div id="bearerTokenField" class="form-group" style="display: none;">
                                       <label class="form-label">Bearer Token</label>
                                       <input type="text" class="form-input" id="bearerToken" placeholder="token">
                                   </div>
                                   
                                   <div id="basicAuthFields" style="display: none;">
                                       <div class="form-row">
                                           <div class="form-group">
                                               <label class="form-label">Usuario</label>
                                               <input type="text" class="form-input" id="basicUser" placeholder="usuario">
                                           </div>
                                           <div class="form-group">
                                               <label class="form-label">Contraseña</label>
                                               <input type="password" class="form-input" id="basicPass" placeholder="contraseña">
                                           </div>
                                       </div>
                                   </div>
                               </div>
                               
                               <div class="form-group">
                                   <label class="form-label">Ruta de los datos (JSON Path)</label>
                                   <input type="text" class="form-input" id="dataPath" placeholder="data.results">
                                   <small class="form-hint">Especifica la ruta dentro del JSON donde están los datos</small>
                               </div>
                               
                               <div class="form-actions-inline">
                                   <button type="button" class="btn-secondary btn-small" onclick="testNewApiConnection()">
                                       <span>🔍</span>
                                       Probar API
                                   </button>
                               </div>
                           </div>
                       </div>

                       <!-- Configuración del Modelo -->
                       <div class="form-section">
                           <h4 class="section-title">⚙️ Configuración del Modelo</h4>
                           
                           <div class="form-row">
                               <div class="form-group">
                                   <label class="form-label">Variable Objetivo</label>
                                   <select class="form-input" id="targetVariable">
                                       <option value="">Seleccionar variable...</option>
                                       <option value="sales">Ventas</option>
                                       <option value="revenue">Ingresos</option>
                                       <option value="customers">Número de Clientes</option>
                                       <option value="conversion">Tasa de Conversión</option>
                                   </select>
                               </div>
                               
                               <div class="form-group">
                                   <label class="form-label">Porcentaje de Entrenamiento</label>
                                   <input type="range" class="form-range" id="trainingPercentage" min="60" max="90" value="80">
                                   <span class="range-value">80%</span>
                               </div>
                           </div>
                           
                           <div class="form-group">
                               <label class="form-label">Características (Features)</label>
                               <div class="features-grid">
                                   <label class="checkbox-option">
                                       <input type="checkbox" checked>
                                       <span class="checkbox-custom"></span>
                                       Fecha/Tiempo
                                   </label>
                                   <label class="checkbox-option">
                                       <input type="checkbox" checked>
                                       <span class="checkbox-custom"></span>
                                       Precio
                                   </label>
                                   <label class="checkbox-option">
                                       <input type="checkbox">
                                       <span class="checkbox-custom"></span>
                                       Promociones
                                   </label>
                                   <label class="checkbox-option">
                                       <input type="checkbox" checked>
                                       <span class="checkbox-custom"></span>
                                       Temporada
                                   </label>
                               </div>
                           </div>
                       </div>

                       <!-- Botones de Acción -->
                       <div class="form-actions">
                           <button type="button" class="btn-secondary" onclick="showIaDashboard()">Cancelar</button>
                           <button type="button" class="btn-primary" onclick="startModelTraining()">
                               <span>🚀</span>
                               Iniciar Entrenamiento
                           </button>
                       </div>
                   </form>
               </div>
           </div>

           <!-- Vista Formulario: Nueva Predicción -->
           <div id="newPredictionForm" class="ia-view">
               <div class="form-header">
                   <button class="nav-back-btn" onclick="showIaDashboard()">
                       <span>← Volver</span>
                   </button>
                   <h3 class="form-title">🔮 Nueva Predicción</h3>
                   <p class="form-subtitle">Genera predicciones usando modelos entrenados</p>
               </div>

               <div class="form-container">
                   <form class="ia-form">
                       <!-- Selección de Modelo -->
                       <div class="form-section">
                           <h4 class="section-title">🤖 Modelo a Utilizar</h4>
                           
                           <div class="model-selector">
                               <div class="model-card active">
                                   <div class="model-header">
                                       <span class="model-icon">📈</span>
                                       <div class="model-info">
                                           <h5>Predicción de Ventas Q4</h5>
                                           <p>Random Forest • Precisión: 94.8%</p>
                                       </div>
                                       <span class="model-status active">Activo</span>
                                   </div>
                               </div>
                               
                               <div class="model-card">
                                   <div class="model-header">
                                       <span class="model-icon">💰</span>
                                       <div class="model-info">
                                           <h5>ROI Marketing</h5>
                                           <p>Neural Network • Precisión: 89.3%</p>
                                       </div>
                                       <span class="model-status">Disponible</span>
                                   </div>
                               </div>
                               
                               <div class="model-card">
                                   <div class="model-header">
                                       <span class="model-icon">👥</span>
                                       <div class="model-info">
                                           <h5>Retención de Clientes</h5>
                                           <p>Gradient Boosting • Precisión: 92.1%</p>
                                       </div>
                                       <span class="model-status">Disponible</span>
                                   </div>
                               </div>
                           </div>
                       </div>

                       <!-- Datos de Entrada -->
                       <div class="form-section">
                           <h4 class="section-title">📊 Datos de Entrada</h4>
                           
                           <div class="prediction-inputs">
                               <div class="form-row">
                                   <div class="form-group">
                                       <label class="form-label">Fecha de Predicción</label>
                                       <input type="date" class="form-input" id="predictionDate">
                                   </div>
                                   
                                   <div class="form-group">
                                       <label class="form-label">Período</label>
                                       <select class="form-input" id="predictionPeriod">
                                           <option value="daily">Diario</option>
                                           <option value="weekly">Semanal</option>
                                           <option value="monthly" selected>Mensual</option>
                                           <option value="quarterly">Trimestral</option>
                                       </select>
                                   </div>
                               </div>
                               
                               <div class="form-row">
                                   <div class="form-group">
                                       <label class="form-label">Precio Promedio ($)</label>
                                       <input type="number" class="form-input" id="avgPrice" placeholder="100.00" step="0.01">
                                   </div>
                                   
                                   <div class="form-group">
                                       <label class="form-label">Temporada</label>
                                       <select class="form-input" id="season">
                                           <option value="spring">Primavera</option>
                                           <option value="summer">Verano</option>
                                           <option value="fall">Otoño</option>
                                           <option value="winter">Invierno</option>
                                       </select>
                                   </div>
                               </div>
                               
                               <div class="form-group">
                                   <label class="form-label">Promociones Activas</label>
                                   <div class="toggle-options">
                                       <label class="toggle-option">
                                           <input type="checkbox" id="hasDiscounts">
                                           <span class="toggle-custom"></span>
                                           Descuentos
                                       </label>
                                       <label class="toggle-option">
                                           <input type="checkbox" id="hasPromotions">
                                           <span class="toggle-custom"></span>
                                           Promociones
                                       </label>
                                       <label class="toggle-option">
                                           <input type="checkbox" id="hasEvents">
                                           <span class="toggle-custom"></span>
                                           Eventos Especiales
                                       </label>
                                   </div>
                               </div>
                           </div>
                       </div>

                       <!-- Configuración de Predicción -->
                       <div class="form-section">
                           <h4 class="section-title">⚙️ Configuración</h4>
                           
                           <div class="form-row">
                               <div class="form-group">
                                   <label class="form-label">Intervalo de Confianza</label>
                                   <select class="form-input" id="confidenceInterval">
                                       <option value="90">90%</option>
                                       <option value="95" selected>95%</option>
                                       <option value="99">99%</option>
                                   </select>
                               </div>
                               
                               <div class="form-group">
                                   <label class="form-label">Número de Predicciones</label>
                                   <input type="number" class="form-input" id="predictionCount" value="1" min="1" max="12">
                               </div>
                           </div>
                           
                           <div class="form-group">
                               <label class="form-label">Opciones Adicionales</label>
                               <div class="checkbox-group">
                                   <label class="checkbox-option">
                                       <input type="checkbox" checked>
                                       <span class="checkbox-custom"></span>
                                       Incluir gráfico de tendencias
                                   </label>
                                   <label class="checkbox-option">
                                       <input type="checkbox">
                                       <span class="checkbox-custom"></span>
                                       Generar reporte PDF
                                   </label>
                                   <label class="checkbox-option">
                                       <input type="checkbox" checked>
                                       <span class="checkbox-custom"></span>
                                       Enviar notificación por email
                                   </label>
                               </div>
                           </div>
                       </div>

                       <!-- Botones de Acción -->
                       <div class="form-actions">
                           <button type="button" class="btn-secondary" onclick="showIaDashboard()">Cancelar</button>
                           <button type="button" class="btn-primary" onclick="generatePrediction()">
                               <span>🔮</span>
                               Generar Predicción
                           </button>
                       </div>
                   </form>
               </div>
           </div>
       `,

       'gestion-datos': `
           <div id="gestionDashboard" class="gestion-view">
               <div class="dashboard-header">
                   <h2 class="dashboard-title">Gestión de Datos</h2>
                   <div class="quick-actions">
                       <button class="quick-action-btn" onclick="showFileUploadForm()">
                           <span>📤</span>
                           Cargar Archivo
                       </button>
                       <button class="quick-action-btn secondary" onclick="showSyncForm()">
                           <span>🔄</span>
                           Sincronizar
                       </button>
                   </div>
               </div>

               <div class="stats-grid">
                   <div class="stat-card">
                       <div class="stat-header">
                           <div class="stat-icon">📁</div>
                           <div class="stat-trend up">
                               <span>↗️</span>
                               +18.5%
                           </div>
                       </div>
                       <div class="stat-value">847</div>
                       <div class="stat-label">Archivos Totales</div>
                   </div>

                   <div class="stat-card">
                       <div class="stat-header">
                           <div class="stat-icon">💾</div>
                           <div class="stat-trend up">
                               <span>↗️</span>
                               +25%
                           </div>
                       </div>
                       <div class="stat-value">2.4GB</div>
                       <div class="stat-label">Almacenamiento Usado</div>
                   </div>

                   <div class="stat-card">
                       <div class="stat-header">
                           <div class="stat-icon">🔄</div>
                           <div class="stat-trend up">
                               <span>↗️</span>
                               +12%
                           </div>
                       </div>
                       <div class="stat-value">99.2%</div>
                       <div class="stat-label">Calidad de Datos</div>
                   </div>

                   <div class="stat-card">
                       <div class="stat-header">
                           <div class="stat-icon">⏱️</div>
                           <div class="stat-trend up">
                               <span>↗️</span>
                               +8%
                           </div>
                       </div>
                       <div class="stat-value" id="recentUploadsCount">12</div>
                       <div class="stat-label">Cargas Este Mes</div>
                   </div>
               </div>

               <div class="chart-container">
                   <div class="chart-header">
                       <h3 class="chart-title">Historial de Cargas Recientes</h3>
                       <div class="activity-search">
                           <input type="text" id="uploadHistorySearch" placeholder="Buscar en historial..." class="search-input">
                           <button class="search-btn" onclick="refreshUploadHistory()">🔍</button>
                       </div>
                   </div>
                   
                   <div class="activity-table-container">
                       <table class="activity-table">
                           <thead>
                               <tr>
                                   <th>Archivo/Fuente</th>
                                   <th>Descripción</th>
                                   <th>Usuario</th>
                                   <th>Fecha Carga</th>
                                   <th>Estado</th>
                                   <th>Tamaño</th>
                               </tr>
                           </thead>
                           <tbody id="uploadHistoryTableBody">
                               <!-- Se llena dinámicamente -->
                           </tbody>
                       </table>
                   </div>
                   
                   <div class="activity-pagination">
                       <div class="pagination-info">
                           <span id="uploadHistoryPaginationInfo">Mostrando cargas recientes</span>
                       </div>
                       <div class="pagination-controls">
                           <button class="pagination-btn" onclick="refreshUploadHistory()">
                               <span>🔄</span>
                               Actualizar
                           </button>
                       </div>
                   </div>
               </div>
           </div>

           <!-- Vista Formulario: Cargar Archivo -->
           <div id="fileUploadForm" class="gestion-view">
               <div class="form-header">
                   <button class="nav-back-btn" onclick="showGestionDashboard()">
                       <span>← Volver</span>
                   </button>
                   <h3 class="form-title">📤 Cargar Nuevo Archivo</h3>
                   <p class="form-subtitle">Sube archivos de datos para procesamiento y análisis</p>
               </div>

               <div class="form-container">
                   <form class="gestion-form">
                       <!-- Información del Archivo -->
                       <div class="form-section">
                           <h4 class="section-title">📁 Información del Archivo</h4>
                           
                           <div class="form-row">
                               <div class="form-group">
                                   <label class="form-label">Nombre del Dataset</label>
                                   <input type="text" class="form-input" id="datasetName" placeholder="Ej. Ventas Q1 2025">
                               </div>
                               
                               <div class="form-group">
                                   <label class="form-label">Categoría</label>
                                   <select class="form-input" id="datasetCategory">
                                       <option value="">Seleccionar categoría...</option>
                                       <option value="ventas">Ventas</option>
                                       <option value="marketing">Marketing</option>
                                       <option value="finanzas">Finanzas</option>
                                       <option value="operaciones">Operaciones</option>
                                       <option value="recursos-humanos">Recursos Humanos</option>
                                   </select>
                               </div>
                           </div>

                           <div class="form-group">
                               <label class="form-label">Descripción</label>
                               <textarea class="form-input" id="datasetDescription" rows="3" placeholder="Describe brevemente el contenido y propósito de estos datos..."></textarea>
                           </div>
                       </div>

                       <!-- Carga del Archivo -->
                       <div class="form-section">
                           <h4 class="section-title">📂 Seleccionar Archivo</h4>
                           
                           <div class="file-upload-area" id="fileUploadArea">
                               <div class="upload-icon">📤</div>
                               <div class="upload-text">
                                   <p>Arrastra y suelta tu archivo aquí</p>
                                   <p class="upload-hint">o haz clic para seleccionar</p>
                               </div>
                               <input type="file" id="dataFileInput" accept=".csv,.xlsx,.json,.xml" multiple>
                           </div>

                           <div class="file-list" id="dataFileList"></div>
                       </div>

                       <!-- Opciones de Procesamiento -->
                       <div class="form-section">
                           <h4 class="section-title">⚙️ Opciones de Procesamiento</h4>
                           
                           <div class="form-row">
                               <div class="form-group">
                                   <label class="form-label">Codificación</label>
                                   <select class="form-input" id="fileEncoding">
                                       <option value="utf-8">UTF-8</option>
                                       <option value="latin1">Latin-1</option>
                                       <option value="ascii">ASCII</option>
                                   </select>
                               </div>
                               
                               <div class="form-group">
                                   <label class="form-label">Separador (CSV)</label>
                                   <select class="form-input" id="csvSeparator">
                                       <option value=",">Coma (,)</option>
                                       <option value=";">Punto y coma (;)</option>
                                       <option value="\\t">Tabulador</option>
                                   </select>
                               </div>
                           </div>

                           <div class="checkbox-group">
                               <label class="checkbox-label">
                                   <input type="checkbox" id="hasHeaders" checked>
                                   <span class="checkbox-custom"></span>
                                   El archivo tiene encabezados
                               </label>
                               
                               <label class="checkbox-label">
                                   <input type="checkbox" id="validateData">
                                   <span class="checkbox-custom"></span>
                                   Validar datos durante la carga
                               </label>
                               
                               <label class="checkbox-label">
                                   <input type="checkbox" id="autoBackup" checked>
                                   <span class="checkbox-custom"></span>
                                   Crear respaldo automático
                               </label>
                           </div>
                       </div>

                       <!-- Botones de Acción -->
                       <div class="form-actions">
                           <button type="button" class="btn-secondary" onclick="showGestionDashboard()">Cancelar</button>
                           <button type="button" class="btn-primary" onclick="startFileUpload()">
                               <span>📤</span>
                               Cargar Archivo
                           </button>
                       </div>
                   </form>
               </div>
           </div>

           <!-- Vista Formulario: Sincronizar -->
           <div id="syncForm" class="gestion-view">
               <div class="form-header">
                   <button class="nav-back-btn" onclick="showGestionDashboard()">
                       <span>← Volver</span>
                   </button>
                   <h3 class="form-title">🔄 Sincronizar Datos</h3>
                   <p class="form-subtitle">Sincroniza datos con fuentes externas y bases de datos</p>
               </div>

               <div class="form-container">
                   <form class="gestion-form">
                       <!-- Fuente de Datos -->
                       <div class="form-section">
                           <h4 class="section-title">🔗 Fuente de Datos</h4>
                           
                           <div class="source-selector">
                               <div class="source-option active" data-source="database">
                                   <div class="source-icon">🗄️</div>
                                   <div class="source-info">
                                       <h5>Base de Datos</h5>
                                       <p>MySQL, PostgreSQL, SQL Server</p>
                                   </div>
                               </div>
                               
                               <div class="source-option" data-source="api">
                                   <div class="source-icon">🌐</div>
                                   <div class="source-info">
                                       <h5>API REST</h5>
                                       <p>Servicios web y APIs</p>
                                   </div>
                               </div>
                               
                               <div class="source-option" data-source="cloud">
                                   <div class="source-icon">☁️</div>
                                   <div class="source-info">
                                       <h5>Nube</h5>
                                       <p>Google Drive, Dropbox, OneDrive</p>
                                   </div>
                               </div>
                           </div>
                       </div>

                       <!-- Configuración de Base de Datos -->
                       <div class="form-section" id="databaseConfig">
                           <h4 class="section-title">🗄️ Configuración de Base de Datos</h4>
                           
                           <div class="form-row">
                               <div class="form-group">
                                   <label class="form-label">Tipo de Base de Datos</label>
                                   <select class="form-input" id="dbType">
                                       <option value="mysql">MySQL</option>
                                       <option value="postgresql">PostgreSQL</option>
                                       <option value="sqlserver">SQL Server</option>
                                       <option value="oracle">Oracle</option>
                                   </select>
                               </div>
                               
                               <div class="form-group">
                                   <label class="form-label">Servidor</label>
                                   <input type="text" class="form-input" id="dbHost" placeholder="localhost:3306">
                               </div>
                           </div>

                           <div class="form-row">
                               <div class="form-group">
                                   <label class="form-label">Base de Datos</label>
                                   <input type="text" class="form-input" id="dbName" placeholder="nombre_base_datos">
                               </div>
                               
                               <div class="form-group">
                                   <label class="form-label">Tabla/Vista</label>
                                   <input type="text" class="form-input" id="dbTable" placeholder="nombre_tabla">
                               </div>
                           </div>

                           <div class="form-row">
                               <div class="form-group">
                                   <label class="form-label">Usuario</label>
                                   <input type="text" class="form-input" id="dbUser" placeholder="usuario">
                               </div>
                               
                               <div class="form-group">
                                   <label class="form-label">Contraseña</label>
                                   <input type="password" class="form-input" id="dbPassword" placeholder="••••••••">
                               </div>
                           </div>
                       </div>

                       <!-- Opciones de Sincronización -->
                       <div class="form-section">
                           <h4 class="section-title">⚙️ Opciones de Sincronización</h4>
                           
                           <div class="form-row">
                               <div class="form-group">
                                   <label class="form-label">Frecuencia</label>
                                   <select class="form-input" id="syncFrequency">
                                       <option value="manual">Manual</option>
                                       <option value="hourly">Cada hora</option>
                                       <option value="daily">Diario</option>
                                       <option value="weekly">Semanal</option>
                                   </select>
                               </div>
                               
                               <div class="form-group">
                                   <label class="form-label">Modo de Sincronización</label>
                                   <select class="form-input" id="syncMode">
                                       <option value="incremental">Incremental</option>
                                       <option value="full">Completa</option>
                                       <option value="upsert">Insertar/Actualizar</option>
                                   </select>
                               </div>
                           </div>

                           <div class="checkbox-group">
                               <label class="checkbox-label">
                                   <input type="checkbox" id="enableNotifications" checked>
                                   <span class="checkbox-custom"></span>
                                   Notificar cuando termine
                               </label>
                               
                               <label class="checkbox-label">
                                   <input type="checkbox" id="validateOnSync">
                                   <span class="checkbox-custom"></span>
                                   Validar datos sincronizados
                               </label>
                           </div>
                       </div>

                       <!-- Botones de Acción -->
                       <div class="form-actions">
                           <button type="button" class="btn-secondary" onclick="showGestionDashboard()">Cancelar</button>
                           <button type="button" class="btn-secondary" onclick="testSyncConnection()">
                               <span>🧪</span>
                               Probar Conexión
                           </button>
                           <button type="button" class="btn-primary" onclick="startDataSync()">
                               <span>🔄</span>
                               Iniciar Sincronización
                           </button>
                       </div>
                   </form>
               </div>
           </div>
       `,

       'conexiones-api': `
           <div id="apiDashboard" class="api-view">
               <div class="dashboard-header">
                   <h2 class="dashboard-title">Conexiones API</h2>
                   <div class="quick-actions">
                       <button class="quick-action-btn" onclick="showNewConnectionForm()">
                           <span>🔗</span>
                           Nueva Conexión
                       </button>
                       <button class="quick-action-btn secondary" onclick="showApiTestForm()">
                           <span>🧪</span>
                           Probar API
                       </button>
                   </div>
               </div>

               <div class="stats-grid">
                   <div class="stat-card">
                       <div class="stat-header">
                           <div class="stat-icon">🔗</div>
                           <div class="stat-trend up">
                               <span>↗️</span>
                               +2
                           </div>
                       </div>
                       <div class="stat-value" id="activeConnectionsCount">15</div>
                       <div class="stat-label">APIs Conectadas</div>
                   </div>

                   <div class="stat-card">
                       <div class="stat-header">
                           <div class="stat-icon">✅</div>
                           <div class="stat-trend up">
                               <span>↗️</span>
                               +5.2%
                           </div>
                       </div>
                       <div class="stat-value" id="availabilityRate">98.7%</div>
                       <div class="stat-label">Disponibilidad</div>
                   </div>

                   <div class="stat-card">
                       <div class="stat-header">
                           <div class="stat-icon">⚡</div>
                           <div class="stat-trend down">
                               <span>↘️</span>
                               -15ms
                           </div>
                       </div>
                       <div class="stat-value" id="averageLatency">245ms</div>
                       <div class="stat-label">Latencia Promedio</div>
                   </div>

                   <div class="stat-card">
                       <div class="stat-header">
                           <div class="stat-icon">📊</div>
                           <div class="stat-trend up">
                               <span>↗️</span>
                               +1.2K
                           </div>
                       </div>
                       <div class="stat-value" id="requestsToday">8.5K</div>
                       <div class="stat-label">Requests Hoy</div>
                   </div>
               </div>

               <!-- Monitor de APIs en Tiempo Real -->
               <div class="charts-section">
                   <div class="chart-container">
                       <div class="chart-header">
                           <h3 class="chart-title">Monitor de APIs en Tiempo Real</h3>
                           <div class="chart-controls">
                               <button class="filter-btn active" onclick="updateMonitorView('realtime')">⚡ Tiempo Real</button>
                               <button class="filter-btn" onclick="updateMonitorView('hourly')">📊 Por Hora</button>
                               <button class="filter-btn" onclick="refreshApiMonitor()">🔄 Actualizar</button>
                           </div>
                       </div>
                       <div class="monitor-container">
                           <div id="apiMonitorList" class="api-monitor-grid">
                               <!-- Se llenará dinámicamente -->
                           </div>
                       </div>
                   </div>

                   <!-- Lista de Conexiones Activas -->
                   <div class="chart-container">
                       <div class="chart-header">
                           <h3 class="chart-title">Conexiones Activas</h3>
                           <div class="chart-controls">
                               <select id="connectionStatusFilter" onchange="filterConnections()">
                                   <option value="all">Todas</option>
                                   <option value="active">Activas</option>
                                   <option value="inactive">Inactivas</option>
                                   <option value="error">Con Errores</option>
                               </select>
                           </div>
                       </div>
                       <div class="connections-list" id="connectionsList">
                           <!-- Se llenará dinámicamente -->
                       </div>
                   </div>
               </div>
           </div>

           <!-- Vista Formulario: Nueva Conexión -->
           <div id="newConnectionForm" class="api-view">
               <div class="form-header">
                   <button class="form-back-btn" onclick="showApiDashboard()">
                       <span>←</span>
                       Volver
                   </button>
                   <div class="form-header-content">
                       <h2>Nueva Conexión API</h2>
                       <p>Configura una nueva conexión a un servicio API externo</p>
                   </div>
               </div>

               <div class="form-container">
                   <!-- Información General -->
                   <div class="form-section">
                       <div class="section-header">
                           <span class="section-icon">📝</span>
                           <div>
                               <h3>Información General</h3>
                               <p>Datos básicos de la conexión API</p>
                           </div>
                       </div>

                       <div class="connection-grid">
                           <div class="connection-field">
                               <label for="connectionName">Nombre de la Conexión *</label>
                               <input type="text" id="connectionName" placeholder="Ej: API de Ventas CRM" required>
                           </div>
                           <div class="connection-field">
                               <label for="connectionDescription">Descripción</label>
                               <input type="text" id="connectionDescription" placeholder="Descripción breve del propósito">
                           </div>
                           <div class="connection-field">
                               <label for="apiProvider">Proveedor</label>
                               <select id="apiProvider">
                                   <option value="">Seleccionar proveedor...</option>
                                   <option value="salesforce">Salesforce</option>
                                   <option value="hubspot">HubSpot</option>
                                   <option value="google">Google Analytics</option>
                                   <option value="facebook">Facebook Graph</option>
                                   <option value="stripe">Stripe</option>
                                   <option value="custom">API Personalizada</option>
                               </select>
                           </div>
                           <div class="connection-field">
                               <label for="connectionEnvironment">Entorno</label>
                               <select id="connectionEnvironment">
                                   <option value="production">Producción</option>
                                   <option value="staging">Staging</option>
                                   <option value="development">Desarrollo</option>
                               </select>
                           </div>
                       </div>
                   </div>

                   <!-- Configuración de URL -->
                   <div class="form-section">
                       <div class="section-header">
                           <span class="section-icon">🌐</span>
                           <div>
                               <h3>Configuración de URL</h3>
                               <p>Endpoints y configuración de conexión</p>
                           </div>
                       </div>

                       <div class="connection-grid">
                           <div class="connection-field">
                               <label for="baseUrl">URL Base *</label>
                               <input type="url" id="baseUrl" placeholder="https://api.ejemplo.com/v1" required>
                           </div>
                           <div class="connection-field">
                               <label for="requestMethod">Método HTTP</label>
                               <select id="requestMethod">
                                   <option value="GET">GET</option>
                                   <option value="POST">POST</option>
                                   <option value="PUT">PUT</option>
                                   <option value="DELETE">DELETE</option>
                               </select>
                           </div>
                           <div class="connection-field">
                               <label for="timeout">Timeout (segundos)</label>
                               <input type="number" id="timeout" value="30" min="5" max="300">
                           </div>
                           <div class="connection-field">
                               <label for="retryAttempts">Intentos de Reintento</label>
                               <input type="number" id="retryAttempts" value="3" min="0" max="10">
                           </div>
                       </div>
                   </div>

                   <!-- Autenticación -->
                   <div class="form-section">
                       <div class="section-header">
                           <span class="section-icon">🔐</span>
                           <div>
                               <h3>Autenticación</h3>
                               <p>Configuración de seguridad y credenciales</p>
                           </div>
                       </div>

                       <div class="auth-type-selector">
                           <label>Tipo de Autenticación:</label>
                           <div class="auth-options">
                               <div class="auth-option">
                                   <input type="radio" name="authType" value="none" id="authNone" checked>
                                   <label for="authNone">Sin Autenticación</label>
                               </div>
                               <div class="auth-option">
                                   <input type="radio" name="authType" value="apikey" id="authApiKey">
                                   <label for="authApiKey">API Key</label>
                               </div>
                               <div class="auth-option">
                                   <input type="radio" name="authType" value="bearer" id="authBearer">
                                   <label for="authBearer">Bearer Token</label>
                               </div>
                               <div class="auth-option">
                                   <input type="radio" name="authType" value="basic" id="authBasic">
                                   <label for="authBasic">Basic Auth</label>
                               </div>
                               <div class="auth-option">
                                   <input type="radio" name="authType" value="oauth" id="authOAuth">
                                   <label for="authOAuth">OAuth 2.0</label>
                               </div>
                           </div>
                       </div>

                       <!-- Campos de autenticación específicos -->
                       <div id="authFields" class="auth-fields">
                           <!-- Se llenará dinámicamente según el tipo seleccionado -->
                       </div>
                   </div>

                   <!-- Headers Personalizados -->
                   <div class="form-section">
                       <div class="section-header">
                           <span class="section-icon">📋</span>
                           <div>
                               <h3>Headers Personalizados</h3>
                               <p>Headers adicionales para las requests</p>
                           </div>
                       </div>

                       <div id="customHeaders" class="headers-container">
                           <div class="header-row">
                               <input type="text" placeholder="Nombre del header">
                               <input type="text" placeholder="Valor del header">
                               <button type="button" class="btn-icon" onclick="addHeaderRow()">+</button>
                           </div>
                       </div>
                   </div>

                   <!-- Configuración Avanzada -->
                   <div class="form-section">
                       <div class="section-header">
                           <span class="section-icon">⚙️</span>
                           <div>
                               <h3>Configuración Avanzada</h3>
                               <p>Opciones adicionales de conexión</p>
                           </div>
                       </div>

                       <div class="connection-grid">
                           <div class="connection-field">
                               <label>
                                   <input type="checkbox" id="enableSsl" checked>
                                   Verificar SSL/TLS
                               </label>
                           </div>
                           <div class="connection-field">
                               <label>
                                   <input type="checkbox" id="followRedirects" checked>
                                   Seguir Redirecciones
                               </label>
                           </div>
                           <div class="connection-field">
                               <label>
                                   <input type="checkbox" id="enableLogging">
                                   Habilitar Logging
                               </label>
                           </div>
                           <div class="connection-field">
                               <label>
                                   <input type="checkbox" id="enableMonitoring" checked>
                                   Monitoreo en Tiempo Real
                               </label>
                           </div>
                       </div>
                   </div>

                   <!-- Botones de Acción -->
                   <div class="form-actions">
                       <button type="button" class="btn-secondary" onclick="showApiDashboard()">
                           <span>✕</span>
                           Cancelar
                       </button>
                       <button type="button" class="btn-secondary" onclick="testNewConnection()">
                           <span>🧪</span>
                           Probar Conexión
                       </button>
                       <button type="button" class="btn-primary" onclick="saveNewConnection()">
                           <span>💾</span>
                           Guardar Conexión
                       </button>
                   </div>
               </div>
           </div>

           <!-- Vista Formulario: Probar API -->
           <div id="apiTestForm" class="api-view">
               <div class="form-header">
                   <button class="form-back-btn" onclick="showApiDashboard()">
                       <span>←</span>
                       Volver
                   </button>
                   <div class="form-header-content">
                       <h2>Probar API</h2>
                       <p>Ejecuta pruebas y valida el funcionamiento de tus APIs</p>
                   </div>
               </div>

               <div class="form-container">
                   <!-- Selección de API -->
                   <div class="form-section">
                       <div class="section-header">
                           <span class="section-icon">🎯</span>
                           <div>
                               <h3>Seleccionar API</h3>
                               <p>Elige la API que deseas probar</p>
                           </div>
                       </div>

                       <div class="connection-field">
                           <label for="apiToTest">API a probar</label>
                           <select id="apiToTest" onchange="loadApiDetails()">
                               <option value="">Seleccionar API...</option>
                               <!-- Se llenará dinámicamente -->
                           </select>
                       </div>
                       
                       <div class="api-selector">
                           <button type="button" class="btn-secondary" onclick="refreshApiList()">
                               <span>🔄</span>
                               Actualizar
                           </button>
                       </div>

                       <div id="selectedApiInfo" class="api-info" style="display: none;">
                           <!-- Se llenará dinámicamente -->
                       </div>
                   </div>

                   <!-- Configuración de Prueba -->
                   <div class="form-section">
                       <div class="section-header">
                           <span class="section-icon">⚡</span>
                           <div>
                               <h3>Configuración de Prueba</h3>
                               <p>Parámetros y datos para la prueba</p>
                           </div>
                       </div>

                       <div class="test-config">
                           <div class="connection-grid">
                               <div class="connection-field">
                                   <label for="testEndpoint">Endpoint Específico</label>
                                   <input type="text" id="testEndpoint" placeholder="/users/profile">
                               </div>
                               <div class="connection-field">
                                   <label for="testMethod">Método HTTP</label>
                                   <select id="testMethod">
                                       <option value="GET">GET</option>
                                       <option value="POST">POST</option>
                                       <option value="PUT">PUT</option>
                                       <option value="DELETE">DELETE</option>
                                   </select>
                               </div>
                           </div>

                           <div class="connection-field">
                               <label for="testData">Datos de Prueba (JSON)</label>
                               <textarea id="testData" rows="6" placeholder='{\n  "field1": "value1",\n  "field2": "value2"\n}'></textarea>
                           </div>

                           <div class="test-options">
                               <label>
                                   <input type="checkbox" id="validateResponse" checked>
                                   Validar Respuesta
                               </label>
                               <label>
                                   <input type="checkbox" id="measurePerformance" checked>
                                   Medir Rendimiento
                               </label>
                               <label>
                                   <input type="checkbox" id="checkAvailability">
                                   Verificar Disponibilidad
                               </label>
                           </div>
                       </div>
                   </div>

                   <!-- Resultados de Prueba -->
                   <div class="form-section">
                       <div class="section-header">
                           <span class="section-icon">📊</span>
                           <div>
                               <h3>Resultados de Prueba</h3>
                               <p>Resultados y métricas de la última ejecución</p>
                           </div>
                       </div>

                       <div id="testResults" class="test-results">
                           <div class="empty-results">
                               <div class="empty-icon">🧪</div>
                               <div class="empty-title">No hay resultados aún</div>
                               <div class="empty-description">Ejecuta una prueba para ver los resultados aquí</div>
                           </div>
                       </div>
                   </div>

                   <!-- Botones de Acción -->
                   <div class="form-actions">
                       <button type="button" class="btn-secondary" onclick="showApiDashboard()">
                           <span>←</span>
                           Volver
                       </button>
                       <button type="button" class="btn-secondary" onclick="clearTestResults()">
                           <span>🗑️</span>
                           Limpiar
                       </button>
                       <button type="button" class="btn-primary" onclick="executeApiTest()" id="executeTestBtn">
                           <span>▶️</span>
                           Ejecutar Prueba
                       </button>
                   </div>
               </div>
           </div>
       `,

       'etl-procesos': `
           <div id="etlDashboard" class="etl-view">
               <div class="dashboard-header">
                   <h2 class="dashboard-title">Procesos ETL</h2>
                   <div class="quick-actions">
                       <button class="quick-action-btn" onclick="showEtlExecute()">
                           <span>▶️</span>
                           Ejecutar ETL
                       </button>
                       <button class="quick-action-btn secondary" onclick="showEtlConfiguration()">
                           <span>⚙️</span>
                           Configurar
                       </button>
                   </div>
               </div>

               <div class="stats-grid">
                   <div class="stat-card">
                       <div class="stat-header">
                           <div class="stat-icon">⚡</div>
                           <div class="stat-trend up">
                               <span>↗️</span>
                               +3
                           </div>
                       </div>
                       <div class="stat-value">28</div>
                       <div class="stat-label">Procesos Activos</div>
                   </div>

                   <div class="stat-card">
                       <div class="stat-header">
                           <div class="stat-icon">✅</div>
                           <div class="stat-trend up">
                               <span>↗️</span>
                               +12%
                           </div>
                       </div>
                       <div class="stat-value">95.4%</div>
                       <div class="stat-label">Tasa de Éxito</div>
                   </div>

                   <div class="stat-card">
                       <div class="stat-header">
                           <div class="stat-icon">⏱️</div>
                           <div class="stat-trend down">
                               <span>↘️</span>
                               -8%
                           </div>
                       </div>
                       <div class="stat-value">12.3min</div>
                       <div class="stat-label">Tiempo Promedio</div>
                   </div>
               </div>

               <div class="charts-section">
                   <div class="chart-container">
                       <div class="chart-header">
                           <h3 class="chart-title">Pipeline de Transformación</h3>
                           <div class="chart-controls">
                               <button class="filter-btn active">📊 Vista General</button>
                               <button class="filter-btn">📈 Rendimiento</button>
                               <button class="filter-btn">🔄 Actualizaciones</button>
                           </div>
                       </div>
                       <div class="pipeline-container">
                           <div class="pipeline-flow">
                               <div class="pipeline-step">
                                   <div class="step-icon">📁</div>
                                   <div class="step-title">Extracción</div>
                                   <div class="step-status success">Completado</div>
                               </div>
                               <div class="pipeline-arrow">→</div>
                               <div class="pipeline-step">
                                   <div class="step-icon">🔄</div>
                                   <div class="step-title">Transformación</div>
                                   <div class="step-status processing">En Proceso</div>
                               </div>
                               <div class="pipeline-arrow">→</div>
                               <div class="pipeline-step">
                                   <div class="step-icon">💾</div>
                                   <div class="step-title">Carga</div>
                                   <div class="step-status pending">Pendiente</div>
                               </div>
                           </div>
                       </div>
                   </div>

                   <div class="chart-container">
                       <div class="chart-header">
                           <h3 class="chart-title">Procesos Recientes</h3>
                           <div class="chart-controls">
                               <select>
                                   <option>Últimas 24 horas</option>
                                   <option>Última semana</option>
                                   <option>Último mes</option>
                               </select>
                           </div>
                       </div>
                       <div class="processes-list">
                           <div class="process-item">
                               <div class="process-info">
                                   <span class="process-name">ETL_Ventas_Diario</span>
                                   <span class="process-time">Hace 2 horas</span>
                               </div>
                               <span class="process-status success">Exitoso</span>
                           </div>
                           <div class="process-item">
                               <div class="process-info">
                                   <span class="process-name">ETL_Inventario_Semanal</span>
                                   <span class="process-time">Hace 6 horas</span>
                               </div>
                               <span class="process-status success">Exitoso</span>
                           </div>
                           <div class="process-item">
                               <div class="process-info">
                                   <span class="process-name">ETL_Clientes_Incremental</span>
                                   <span class="process-time">Hace 1 día</span>
                               </div>
                               <span class="process-status error">Error</span>
                           </div>
                       </div>
                   </div>
               </div>
           </div>

           <!-- Vista Ejecutar ETL -->
           <div id="etlExecuteForm" class="etl-view">
               <div class="form-header">
                   <button class="form-back-btn" onclick="showEtlDashboard()">
                       <span>←</span>
                       Volver
                   </button>
                   <div class="form-header-content">
                       <h2>Ejecutar Proceso ETL</h2>
                       <p>Configura y ejecuta procesos de extracción, transformación y carga</p>
                   </div>
               </div>

               <div class="form-container">
                   <!-- Selección de Proceso -->
                   <div class="form-section">
                       <div class="section-header">
                           <span class="section-icon">🎯</span>
                           <div>
                               <h3>Seleccionar Proceso</h3>
                               <p>Elige el proceso ETL que deseas ejecutar</p>
                           </div>
                       </div>

                       <div class="etl-processes-container">
                           <div class="etl-processes-grid" id="etlProcessesGrid">
                               <!-- Los procesos se cargarán dinámicamente -->
                           </div>
                           
                           <!-- Paginación para procesos ETL -->
                           <div class="etl-processes-pagination">
                               <div class="pagination-info">
                                   <span id="etlProcessesInfo">Mostrando 1-6 de 15 procesos</span>
                               </div>
                               
                               <div class="pagination-controls">
                                   <button class="pagination-btn" id="etlProcessesPrevBtn" onclick="changeEtlProcessesPage('prev')" disabled>
                                       ← Anterior
                                   </button>
                                   
                                   <div class="pagination-pages" id="etlProcessesPages">
                                       <button class="page-btn active" onclick="goToEtlProcessesPage(1)">1</button>
                                       <button class="page-btn" onclick="goToEtlProcessesPage(2)">2</button>
                                       <button class="page-btn" onclick="goToEtlProcessesPage(3)">3</button>
                                   </div>
                                   
                                   <button class="pagination-btn" id="etlProcessesNextBtn" onclick="changeEtlProcessesPage('next')">
                                       Siguiente →
                                   </button>
                               </div>
                               
                               <div class="items-per-page">
                                   <label>Mostrar:</label>
                                   <select id="etlProcessesPerPage" onchange="changeEtlProcessesPerPage()">
                                       <option value="6" selected>6</option>
                                       <option value="9">9</option>
                                       <option value="12">12</option>
                                       <option value="18">18</option>
                                   </select>
                                   <span>por página</span>
                               </div>
                           </div>
                       </div>
                   </div>

                   <!-- Configuración de Ejecución -->
                   <div class="form-section" id="executionConfig" style="display: none;">
                       <div class="section-header">
                           <span class="section-icon">⚙️</span>
                           <div>
                               <h3>Configuración de Ejecución</h3>
                               <p>Parámetros para la ejecución del proceso</p>
                           </div>
                       </div>

                       <div class="connection-grid">
                           <div class="connection-field">
                               <label>Tipo de Ejecución</label>
                               <select id="executionType">
                                   <option value="full">Carga Completa</option>
                                   <option value="incremental">Carga Incremental</option>
                                   <option value="delta">Solo Cambios (Delta)</option>
                               </select>
                           </div>
                           <div class="connection-field">
                               <label>Prioridad</label>
                               <select id="executionPriority">
                                   <option value="normal">Normal</option>
                                   <option value="high">Alta</option>
                                   <option value="low">Baja</option>
                               </select>
                           </div>
                       </div>

                       <div class="connection-field">
                           <label>Rango de Fechas (Opcional)</label>
                           <div class="date-range">
                               <input type="date" id="startDate" class="form-input">
                               <span>hasta</span>
                               <input type="date" id="endDate" class="form-input">
                           </div>
                       </div>

                       <div class="execution-options">
                           <label>
                               <input type="checkbox" id="notifyCompletion" checked>
                               Notificar al completar
                           </label>
                           <label>
                               <input type="checkbox" id="emailReport">
                               Enviar reporte por email
                           </label>
                           <label>
                               <input type="checkbox" id="validateData" checked>
                               Validar calidad de datos
                           </label>
                       </div>
                   </div>

                   <!-- Monitor de Ejecución -->
                   <div class="form-section" id="executionMonitor" style="display: none;">
                       <div class="section-header">
                           <span class="section-icon">📊</span>
                           <div>
                               <h3>Monitor de Ejecución</h3>
                               <p>Estado actual del proceso ETL</p>
                           </div>
                       </div>

                       <div id="executionProgress" class="execution-progress">
                           <!-- Se llenará dinámicamente -->
                       </div>
                   </div>

                   <!-- Botones de Acción -->
                   <div class="form-actions">
                       <button type="button" class="btn-secondary" onclick="showEtlDashboard()">
                           <span>←</span>
                           Volver
                       </button>
                       <button type="button" class="btn-secondary" onclick="validateEtlProcess()" id="validateBtn" disabled>
                           <span>✅</span>
                           Validar
                       </button>
                       <button type="button" class="btn-primary" onclick="executeEtlProcess()" id="executeBtn" disabled>
                           <span>▶️</span>
                           Ejecutar ETL
                       </button>
                   </div>
               </div>
           </div>

           <!-- Vista Configurar ETL -->
           <div id="etlConfigForm" class="etl-view">
               <div class="form-header">
                   <button class="form-back-btn" onclick="showEtlDashboard()">
                       <span>←</span>
                       Volver
                   </button>
                   <div class="form-header-content">
                       <h2>Configuración ETL</h2>
                       <p>Administra y configura procesos de ETL</p>
                   </div>
               </div>

               <div class="form-container">
                   <!-- Navegación de Configuración -->
                   <div class="config-nav">
                       <button class="config-tab active" onclick="showConfigSection('processes')">
                           <span>⚡</span>
                           Procesos
                       </button>
                       <button class="config-tab" onclick="showConfigSection('sources')">
                           <span>📁</span>
                           Fuentes de Datos
                       </button>
                       <button class="config-tab" onclick="showConfigSection('transformations')">
                           <span>🔄</span>
                           Transformaciones
                       </button>
                       <button class="config-tab" onclick="showConfigSection('schedules')">
                           <span>⏰</span>
                           Programación
                       </button>
                   </div>

                   <!-- Configuración de Procesos -->
                   <div id="processesConfig" class="config-section active">
                       <div class="section-header">
                           <span class="section-icon">⚡</span>
                           <div>
                               <h3>Administrar Procesos ETL</h3>
                               <p>Crea, edita y administra tus procesos ETL</p>
                           </div>
                           <button class="btn-primary" onclick="showNewProcessForm()">
                               <span>➕</span>
                               Nuevo Proceso
                           </button>
                       </div>

                       <div class="processes-table">
                           <div class="table-header">
                               <div class="table-row">
                                   <div class="table-cell">Proceso</div>
                                   <div class="table-cell">Estado</div>
                                   <div class="table-cell">Frecuencia</div>
                                   <div class="table-cell">Última Ejecución</div>
                                   <div class="table-cell">Acciones</div>
                               </div>
                           </div>
                           <div class="table-body" id="processesTableBody">
                               <div class="table-row">
                                   <div class="table-cell" data-label="Proceso">
                                       <div class="process-info">
                                           <div class="process-name">ETL Ventas Diario</div>
                                           <div class="process-description">Procesamiento diario de ventas</div>
                                       </div>
                                   </div>
                                   <div class="table-cell" data-label="Estado">
                                       <span class="status-badge active">Activo</span>
                                   </div>
                                   <div class="table-cell" data-label="Frecuencia">Diario</div>
                                   <div class="table-cell" data-label="Última Ejecución">Hace 2 horas</div>
                                   <div class="table-cell" data-label="Acciones">
                                       <button class="btn-icon" onclick="editProcess('ventas')" title="Editar">✏️</button>
                                       <button class="btn-icon" onclick="toggleProcess('ventas')" title="Pausar">⏸️</button>
                                       <button class="btn-icon danger" onclick="deleteProcess('ventas')" title="Eliminar">🗑️</button>
                                   </div>
                               </div>
                               <div class="table-row">
                                   <div class="table-cell" data-label="Proceso">
                                       <div class="process-info">
                                           <div class="process-name">ETL Inventario Semanal</div>
                                           <div class="process-description">Consolidación semanal de inventario</div>
                                       </div>
                                   </div>
                                   <div class="table-cell" data-label="Estado">
                                       <span class="status-badge active">Activo</span>
                                   </div>
                                   <div class="table-cell" data-label="Frecuencia">Semanal</div>
                                   <div class="table-cell" data-label="Última Ejecución">Hace 6 horas</div>
                                   <div class="table-cell" data-label="Acciones">
                                       <button class="btn-icon" onclick="editProcess('inventario')" title="Editar">✏️</button>
                                       <button class="btn-icon" onclick="toggleProcess('inventario')" title="Pausar">⏸️</button>
                                       <button class="btn-icon danger" onclick="deleteProcess('inventario')" title="Eliminar">🗑️</button>
                                   </div>
                               </div>
                               <div class="table-row">
                                   <div class="table-cell" data-label="Proceso">
                                       <div class="process-info">
                                           <div class="process-name">ETL Clientes Incremental</div>
                                           <div class="process-description">Actualización incremental de clientes</div>
                                       </div>
                                   </div>
                                   <div class="table-cell" data-label="Estado">
                                       <span class="status-badge warning">Advertencia</span>
                                   </div>
                                   <div class="table-cell" data-label="Frecuencia">Horario</div>
                                   <div class="table-cell" data-label="Última Ejecución">Hace 1 día</div>
                                   <div class="table-cell" data-label="Acciones">
                                       <button class="btn-icon" onclick="editProcess('clientes')" title="Editar">✏️</button>
                                       <button class="btn-icon" onclick="toggleProcess('clientes')" title="Activar">▶️</button>
                                       <button class="btn-icon danger" onclick="deleteProcess('clientes')" title="Eliminar">🗑️</button>
                                   </div>
                               </div>
                               <div class="table-row">
                                   <div class="table-cell" data-label="Proceso">
                                       <div class="process-info">
                                           <div class="process-name">ETL Finanzas Mensual</div>
                                           <div class="process-description">Consolidación financiera mensual</div>
                                       </div>
                                   </div>
                                   <div class="table-cell" data-label="Estado">
                                       <span class="status-badge active">Activo</span>
                                   </div>
                                   <div class="table-cell" data-label="Frecuencia">Mensual</div>
                                   <div class="table-cell" data-label="Última Ejecución">Hace 3 días</div>
                                   <div class="table-cell" data-label="Acciones">
                                       <button class="btn-icon" onclick="editProcess('finanzas')" title="Editar">✏️</button>
                                       <button class="btn-icon" onclick="toggleProcess('finanzas')" title="Pausar">⏸️</button>
                                       <button class="btn-icon danger" onclick="deleteProcess('finanzas')" title="Eliminar">🗑️</button>
                                   </div>
                               </div>
                               <div class="table-row">
                                   <div class="table-cell" data-label="Proceso">
                                       <div class="process-info">
                                           <div class="process-name">ETL Marketing</div>
                                           <div class="process-description">Análisis de campañas publicitarias</div>
                                       </div>
                                   </div>
                                   <div class="table-cell" data-label="Estado">
                                       <span class="status-badge active">Activo</span>
                                   </div>
                                   <div class="table-cell" data-label="Frecuencia">Diario</div>
                                   <div class="table-cell" data-label="Última Ejecución">Hace 4 horas</div>
                                   <div class="table-cell" data-label="Acciones">
                                       <button class="btn-icon" onclick="editProcess('marketing')" title="Editar">✏️</button>
                                       <button class="btn-icon" onclick="toggleProcess('marketing')" title="Pausar">⏸️</button>
                                       <button class="btn-icon danger" onclick="deleteProcess('marketing')" title="Eliminar">🗑️</button>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>

                   <!-- Otras secciones de configuración se pueden agregar aquí -->
                   <div id="sourcesConfig" class="config-section">
                       <div class="section-header">
                           <span class="section-icon">📁</span>
                           <div>
                               <h3>Fuentes de Datos</h3>
                               <p>Configura las fuentes de datos para tus procesos ETL</p>
                           </div>
                           <button class="btn-primary" onclick="showNewDataSourceForm()">
                               <span>➕</span>
                               Nueva Fuente
                           </button>
                       </div>

                       <div class="data-sources-grid" id="dataSourcesGrid">
                           <div class="data-source-card">
                               <div class="source-header">
                                   <div class="source-icon">🗄️</div>
                                   <div class="source-status connected">Conectado</div>
                               </div>
                               <h4>Base de Datos Principal</h4>
                               <p>PostgreSQL con datos transaccionales</p>
                               <div class="source-details">
                                   <div class="detail-item">
                                       <span class="detail-label">Host:</span>
                                       <span class="detail-value">db.empresa.com</span>
                                   </div>
                                   <div class="detail-item">
                                       <span class="detail-label">Puerto:</span>
                                       <span class="detail-value">5432</span>
                                   </div>
                                   <div class="detail-item">
                                       <span class="detail-label">Base de Datos:</span>
                                       <span class="detail-value">production_db</span>
                                   </div>
                               </div>
                               <div class="source-actions">
                                   <button class="btn-secondary btn-sm" onclick="testDataSource('db_main')">🔍 Probar</button>
                                   <button class="btn-secondary btn-sm" onclick="editDataSource('db_main')">✏️ Editar</button>
                                   <button class="btn-danger btn-sm" onclick="deleteDataSource('db_main')">🗑️</button>
                               </div>
                           </div>

                           <div class="data-source-card">
                               <div class="source-header">
                                   <div class="source-icon">🌐</div>
                                   <div class="source-status connected">Conectado</div>
                               </div>
                               <h4>API CRM Salesforce</h4>
                               <p>REST API para datos de clientes y oportunidades</p>
                               <div class="source-details">
                                   <div class="detail-item">
                                       <span class="detail-label">Endpoint:</span>
                                       <span class="detail-value">api.salesforce.com/v54</span>
                                   </div>
                                   <div class="detail-item">
                                       <span class="detail-label">Autenticación:</span>
                                       <span class="detail-value">OAuth 2.0</span>
                                   </div>
                                   <div class="detail-item">
                                       <span class="detail-label">Rate Limit:</span>
                                       <span class="detail-value">1000 req/hora</span>
                                   </div>
                               </div>
                               <div class="source-actions">
                                   <button class="btn-secondary btn-sm" onclick="testDataSource('api_crm')">🔍 Probar</button>
                                   <button class="btn-secondary btn-sm" onclick="editDataSource('api_crm')">✏️ Editar</button>
                                   <button class="btn-danger btn-sm" onclick="deleteDataSource('api_crm')">🗑️</button>
                               </div>
                           </div>

                           <div class="data-source-card">
                               <div class="source-header">
                                   <div class="source-icon">📊</div>
                                   <div class="source-status warning">Archivo desactualizado</div>
                               </div>
                               <h4>Archivo Inventario CSV</h4>
                               <p>Datos de inventario exportados mensualmente</p>
                               <div class="source-details">
                                   <div class="detail-item">
                                       <span class="detail-label">Ubicación:</span>
                                       <span class="detail-value">/data/inventory/latest.csv</span>
                                   </div>
                                   <div class="detail-item">
                                       <span class="detail-label">Última actualización:</span>
                                       <span class="detail-value">Hace 5 días</span>
                                   </div>
                                   <div class="detail-item">
                                       <span class="detail-label">Tamaño:</span>
                                       <span class="detail-value">15.2 MB</span>
                                   </div>
                               </div>
                               <div class="source-actions">
                                   <button class="btn-secondary btn-sm" onclick="testDataSource('csv_inventory')">🔍 Probar</button>
                                   <button class="btn-secondary btn-sm" onclick="editDataSource('csv_inventory')">✏️ Editar</button>
                                   <button class="btn-danger btn-sm" onclick="deleteDataSource('csv_inventory')">🗑️</button>
                               </div>
                           </div>

                           <div class="data-source-card">
                               <div class="source-header">
                                   <div class="source-icon">☁️</div>
                                   <div class="source-status connected">Conectado</div>
                               </div>
                               <h4>AWS S3 Bucket</h4>
                               <p>Almacenamiento en la nube para archivos de datos</p>
                               <div class="source-details">
                                   <div class="detail-item">
                                       <span class="detail-label">Bucket:</span>
                                       <span class="detail-value">empresa-data-lake</span>
                                   </div>
                                   <div class="detail-item">
                                       <span class="detail-label">Región:</span>
                                       <span class="detail-value">us-east-1</span>
                                   </div>
                                   <div class="detail-item">
                                       <span class="detail-label">Acceso:</span>
                                       <span class="detail-value">IAM Role</span>
                                   </div>
                               </div>
                               <div class="source-actions">
                                   <button class="btn-secondary btn-sm" onclick="testDataSource('s3_bucket')">🔍 Probar</button>
                                   <button class="btn-secondary btn-sm" onclick="editDataSource('s3_bucket')">✏️ Editar</button>
                                   <button class="btn-danger btn-sm" onclick="deleteDataSource('s3_bucket')">🗑️</button>
                               </div>
                           </div>

                           <div class="data-source-card">
                               <div class="source-header">
                                   <div class="source-icon">📤</div>
                                   <div class="source-status error">Error de conexión</div>
                               </div>
                               <h4>Servidor FTP Legacy</h4>
                               <p>Servidor FTP para datos heredados del sistema anterior</p>
                               <div class="source-details">
                                   <div class="detail-item">
                                       <span class="detail-label">Host:</span>
                                       <span class="detail-value">ftp.legacy.empresa.com</span>
                                   </div>
                                   <div class="detail-item">
                                       <span class="detail-label">Puerto:</span>
                                       <span class="detail-value">21</span>
                                   </div>
                                   <div class="detail-item">
                                       <span class="detail-label">Protocolo:</span>
                                       <span class="detail-value">SFTP</span>
                                   </div>
                               </div>
                               <div class="source-actions">
                                   <button class="btn-secondary btn-sm" onclick="testDataSource('ftp_legacy')">🔍 Probar</button>
                                   <button class="btn-secondary btn-sm" onclick="editDataSource('ftp_legacy')">✏️ Editar</button>
                                   <button class="btn-danger btn-sm" onclick="deleteDataSource('ftp_legacy')">🗑️</button>
                               </div>
                           </div>

                           <div class="data-source-card">
                               <div class="source-header">
                                   <div class="source-icon">📈</div>
                                   <div class="source-status connected">Conectado</div>
                               </div>
                               <h4>Google Analytics API</h4>
                               <p>Datos de tráfico web y conversiones</p>
                               <div class="source-details">
                                   <div class="detail-item">
                                       <span class="detail-label">Property ID:</span>
                                       <span class="detail-value">GA-123456789</span>
                                   </div>
                                   <div class="detail-item">
                                       <span class="detail-label">Autenticación:</span>
                                       <span class="detail-value">Service Account</span>
                                   </div>
                                   <div class="detail-item">
                                       <span class="detail-label">Última sincronización:</span>
                                       <span class="detail-value">Hace 1 hora</span>
                                   </div>
                               </div>
                               <div class="source-actions">
                                   <button class="btn-secondary btn-sm" onclick="testDataSource('ga_api')">🔍 Probar</button>
                                   <button class="btn-secondary btn-sm" onclick="editDataSource('ga_api')">✏️ Editar</button>
                                   <button class="btn-danger btn-sm" onclick="deleteDataSource('ga_api')">🗑️</button>
                               </div>
                           </div>
                       </div>
                   </div>

                   <div id="transformationsConfig" class="config-section">
                       <div class="section-header">
                           <span class="section-icon">🔄</span>
                           <div>
                               <h3>Transformaciones</h3>
                               <p>Define reglas y transformaciones de datos</p>
                           </div>
                           <button class="btn-primary" onclick="showNewTransformationForm()">
                               <span>➕</span>
                               Nueva Transformación
                           </button>
                       </div>

                       <div class="transformations-container">
                           <!-- Tabs para categorías de transformaciones -->
                           <div class="transformation-tabs">
                               <button class="transform-tab active" onclick="showTransformationCategory('data-cleaning')">
                                   <span>🧹</span>
                                   Limpieza de Datos
                               </button>
                               <button class="transform-tab" onclick="showTransformationCategory('data-mapping')">
                                   <span>🗺️</span>
                                   Mapeo de Campos
                               </button>
                               <button class="transform-tab" onclick="showTransformationCategory('calculations')">
                                   <span>🧮</span>
                                   Cálculos
                               </button>
                               <button class="transform-tab" onclick="showTransformationCategory('validations')">
                                   <span>✅</span>
                                   Validaciones
                               </button>
                           </div>

                           <!-- Limpieza de Datos -->
                           <div id="data-cleaning" class="transform-category active">
                               <div class="transformation-list">
                                   <div class="transformation-card">
                                       <div class="transform-header">
                                           <div class="transform-icon">🧹</div>
                                           <div class="transform-status enabled">Habilitado</div>
                                       </div>
                                       <h4>Eliminar Duplicados</h4>
                                       <p>Identifica y elimina registros duplicados basado en campos clave</p>
                                       <div class="transform-config">
                                           <div class="config-item">
                                               <span class="config-label">Campos clave:</span>
                                               <span class="config-value">email, customer_id</span>
                                           </div>
                                           <div class="config-item">
                                               <span class="config-label">Criterio:</span>
                                               <span class="config-value">Mantener el más reciente</span>
                                           </div>
                                       </div>
                                       <div class="transform-actions">
                                           <button class="btn-secondary btn-sm" onclick="editTransformation('remove_duplicates')">✏️ Editar</button>
                                           <button class="btn-secondary btn-sm" onclick="toggleTransformation('remove_duplicates')">⏸️ Desactivar</button>
                                           <button class="btn-danger btn-sm" onclick="deleteTransformation('remove_duplicates')">🗑️</button>
                                       </div>
                                   </div>

                                   <div class="transformation-card">
                                       <div class="transform-header">
                                           <div class="transform-icon">🧹</div>
                                           <div class="transform-status enabled">Habilitado</div>
                                       </div>
                                       <h4>Normalizar Texto</h4>
                                       <p>Convierte texto a formato estándar (mayúsculas, minúsculas, etc.)</p>
                                       <div class="transform-config">
                                           <div class="config-item">
                                               <span class="config-label">Campos:</span>
                                               <span class="config-value">name, company_name</span>
                                           </div>
                                           <div class="config-item">
                                               <span class="config-label">Formato:</span>
                                               <span class="config-value">Capitalizar palabras</span>
                                           </div>
                                       </div>
                                       <div class="transform-actions">
                                           <button class="btn-secondary btn-sm" onclick="editTransformation('normalize_text')">✏️ Editar</button>
                                           <button class="btn-secondary btn-sm" onclick="toggleTransformation('normalize_text')">⏸️ Desactivar</button>
                                           <button class="btn-danger btn-sm" onclick="deleteTransformation('normalize_text')">🗑️</button>
                                       </div>
                                   </div>

                                   <div class="transformation-card">
                                       <div class="transform-header">
                                           <div class="transform-icon">🧹</div>
                                           <div class="transform-status disabled">Deshabilitado</div>
                                       </div>
                                       <h4>Llenar Valores Nulos</h4>
                                       <p>Reemplaza valores nulos con valores por defecto o calculados</p>
                                       <div class="transform-config">
                                           <div class="config-item">
                                               <span class="config-label">Campo:</span>
                                               <span class="config-value">phone_number</span>
                                           </div>
                                           <div class="config-item">
                                               <span class="config-label">Valor por defecto:</span>
                                               <span class="config-value">"No especificado"</span>
                                           </div>
                                       </div>
                                       <div class="transform-actions">
                                           <button class="btn-secondary btn-sm" onclick="editTransformation('fill_nulls')">✏️ Editar</button>
                                           <button class="btn-primary btn-sm" onclick="toggleTransformation('fill_nulls')">▶️ Activar</button>
                                           <button class="btn-danger btn-sm" onclick="deleteTransformation('fill_nulls')">🗑️</button>
                                       </div>
                                   </div>
                               </div>
                           </div>

                           <!-- Mapeo de Campos -->
                           <div id="data-mapping" class="transform-category">
                               <div class="transformation-list">
                                   <div class="transformation-card">
                                       <div class="transform-header">
                                           <div class="transform-icon">🗺️</div>
                                           <div class="transform-status enabled">Habilitado</div>
                                       </div>
                                       <h4>Mapeo CRM a BD Principal</h4>
                                       <p>Mapea campos del CRM a la base de datos principal</p>
                                       <div class="transform-config">
                                           <div class="config-item mapping-item">
                                               <span class="config-label">Origen → Destino:</span>
                                               <div class="mapping-pairs">
                                                   <div class="mapping-pair">account_name → customer_name</div>
                                                   <div class="mapping-pair">phone → contact_phone</div>
                                                   <div class="mapping-pair">email → contact_email</div>
                                               </div>
                                           </div>
                                       </div>
                                       <div class="transform-actions">
                                           <button class="btn-secondary btn-sm" onclick="editTransformation('crm_mapping')">✏️ Editar</button>
                                           <button class="btn-secondary btn-sm" onclick="toggleTransformation('crm_mapping')">⏸️ Desactivar</button>
                                           <button class="btn-danger btn-sm" onclick="deleteTransformation('crm_mapping')">🗑️</button>
                                       </div>
                                   </div>

                                   <div class="transformation-card">
                                       <div class="transform-header">
                                           <div class="transform-icon">🗺️</div>
                                           <div class="transform-status enabled">Habilitado</div>
                                       </div>
                                       <h4>Conversión de Fechas</h4>
                                       <p>Convierte formatos de fecha entre diferentes sistemas</p>
                                       <div class="transform-config">
                                           <div class="config-item">
                                               <span class="config-label">Formato origen:</span>
                                               <span class="config-value">MM/DD/YYYY</span>
                                           </div>
                                           <div class="config-item">
                                               <span class="config-label">Formato destino:</span>
                                               <span class="config-value">YYYY-MM-DD</span>
                                           </div>
                                       </div>
                                       <div class="transform-actions">
                                           <button class="btn-secondary btn-sm" onclick="editTransformation('date_conversion')">✏️ Editar</button>
                                           <button class="btn-secondary btn-sm" onclick="toggleTransformation('date_conversion')">⏸️ Desactivar</button>
                                           <button class="btn-danger btn-sm" onclick="deleteTransformation('date_conversion')">🗑️</button>
                                       </div>
                                   </div>
                               </div>
                           </div>

                           <!-- Cálculos -->
                           <div id="calculations" class="transform-category">
                               <div class="transformation-list">
                                   <div class="transformation-card">
                                       <div class="transform-header">
                                           <div class="transform-icon">🧮</div>
                                           <div class="transform-status enabled">Habilitado</div>
                                       </div>
                                       <h4>Calcular Total con Impuestos</h4>
                                       <p>Calcula el total incluyendo impuestos basado en la región</p>
                                       <div class="transform-config">
                                           <div class="config-item">
                                               <span class="config-label">Fórmula:</span>
                                               <span class="config-value">subtotal * (1 + tax_rate)</span>
                                           </div>
                                           <div class="config-item">
                                               <span class="config-label">Campo resultado:</span>
                                               <span class="config-value">total_amount</span>
                                           </div>
                                       </div>
                                       <div class="transform-actions">
                                           <button class="btn-secondary btn-sm" onclick="editTransformation('calc_tax')">✏️ Editar</button>
                                           <button class="btn-secondary btn-sm" onclick="toggleTransformation('calc_tax')">⏸️ Desactivar</button>
                                           <button class="btn-danger btn-sm" onclick="deleteTransformation('calc_tax')">🗑️</button>
                                       </div>
                                   </div>

                                   <div class="transformation-card">
                                       <div class="transform-header">
                                           <div class="transform-icon">🧮</div>
                                           <div class="transform-status enabled">Habilitado</div>
                                       </div>
                                       <h4>Categorizar Clientes</h4>
                                       <p>Asigna categoría de cliente basado en volumen de ventas</p>
                                       <div class="transform-config">
                                           <div class="config-item">
                                               <span class="config-label">Reglas:</span>
                                               <div class="mapping-pairs">
                                                   <div class="mapping-pair">&gt; $10,000 → Premium</div>
                                                   <div class="mapping-pair">$1,000 - $10,000 → Standard</div>
                                                   <div class="mapping-pair">&lt; $1,000 → Basic</div>
                                               </div>
                                           </div>
                                       </div>
                                       <div class="transform-actions">
                                           <button class="btn-secondary btn-sm" onclick="editTransformation('categorize_customers')">✏️ Editar</button>
                                           <button class="btn-secondary btn-sm" onclick="toggleTransformation('categorize_customers')">⏸️ Desactivar</button>
                                           <button class="btn-danger btn-sm" onclick="deleteTransformation('categorize_customers')">🗑️</button>
                                       </div>
                                   </div>
                               </div>
                           </div>

                           <!-- Validaciones -->
                           <div id="validations" class="transform-category">
                               <div class="transformation-list">
                                   <div class="transformation-card">
                                       <div class="transform-header">
                                           <div class="transform-icon">✅</div>
                                           <div class="transform-status enabled">Habilitado</div>
                                       </div>
                                       <h4>Validar Email</h4>
                                       <p>Verifica que el formato de email sea válido</p>
                                       <div class="transform-config">
                                           <div class="config-item">
                                               <span class="config-label">Patrón:</span>
                                               <span class="config-value">Formato RFC 5322</span>
                                           </div>
                                           <div class="config-item">
                                               <span class="config-label">Acción en error:</span>
                                               <span class="config-value">Marcar como inválido</span>
                                           </div>
                                       </div>
                                       <div class="transform-actions">
                                           <button class="btn-secondary btn-sm" onclick="editTransformation('validate_email')">✏️ Editar</button>
                                           <button class="btn-secondary btn-sm" onclick="toggleTransformation('validate_email')">⏸️ Desactivar</button>
                                           <button class="btn-danger btn-sm" onclick="deleteTransformation('validate_email')">🗑️</button>
                                       </div>
                                   </div>

                                   <div class="transformation-card">
                                       <div class="transform-header">
                                           <div class="transform-icon">✅</div>
                                           <div class="transform-status enabled">Habilitado</div>
                                       </div>
                                       <h4>Validar Rangos Numéricos</h4>
                                       <p>Verifica que los valores numéricos estén dentro de rangos válidos</p>
                                       <div class="transform-config">
                                           <div class="config-item">
                                               <span class="config-label">Campo:</span>
                                               <span class="config-value">price</span>
                                           </div>
                                           <div class="config-item">
                                               <span class="config-label">Rango:</span>
                                               <span class="config-value">$0.01 - $999,999.99</span>
                                           </div>
                                       </div>
                                       <div class="transform-actions">
                                           <button class="btn-secondary btn-sm" onclick="editTransformation('validate_ranges')">✏️ Editar</button>
                                           <button class="btn-secondary btn-sm" onclick="toggleTransformation('validate_ranges')">⏸️ Desactivar</button>
                                           <button class="btn-danger btn-sm" onclick="deleteTransformation('validate_ranges')">🗑️</button>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>

           <!-- Vista Nuevo Proceso ETL -->
           <div id="etlNewProcessForm" class="etl-view">
               <div class="form-header">
                   <button class="form-back-btn" onclick="showEtlDashboard()">
                       <span>←</span>
                       Volver
                   </button>
                   <div class="form-header-content">
                       <h2>Crear Nuevo Proceso ETL</h2>
                       <p>Configura un nuevo proceso de extracción, transformación y carga</p>
                   </div>
               </div>

               <div class="form-container">
                   <form id="newProcessForm" class="process-form">
                       <div class="form-section">
                           <h4>📋 Información Básica</h4>
                           
                           <div class="form-group">
                               <label for="processName">Nombre del Proceso *</label>
                               <input type="text" id="processName" name="processName" class="form-input" placeholder="Ej: ETL Ventas Semanal" required>
                           </div>
                           
                           <div class="form-group">
                               <label for="processDescription">Descripción</label>
                               <textarea id="processDescription" name="processDescription" class="form-input" rows="3" placeholder="Describe el propósito y funcionamiento del proceso ETL"></textarea>
                           </div>
                           
                           <div class="form-row">
                               <div class="form-group">
                                   <label for="processCategory">Categoría</label>
                                   <select id="processCategory" name="processCategory" class="form-select">
                                       <option value="ventas">📊 Ventas</option>
                                       <option value="inventario">📦 Inventario</option>
                                       <option value="clientes">👥 Clientes</option>
                                       <option value="finanzas">💰 Finanzas</option>
                                       <option value="marketing">📢 Marketing</option>
                                       <option value="rrhh">👔 Recursos Humanos</option>
                                       <option value="otros">🔧 Otros</option>
                                   </select>
                               </div>
                               
                               <div class="form-group">
                                   <label for="processPriority">Prioridad</label>
                                   <select id="processPriority" name="processPriority" class="form-select">
                                       <option value="alta">🔴 Alta</option>
                                       <option value="media" selected>🟡 Media</option>
                                       <option value="baja">🟢 Baja</option>
                                   </select>
                               </div>
                           </div>
                       </div>
                       
                       <div class="form-section">
                           <h4>🔗 Configuración de Fuentes</h4>
                           
                           <div class="form-group">
                               <label for="sourceConnections">Fuentes de Datos</label>
                               <div class="source-selector">
                                   <div class="checkbox-group">
                                       <input type="checkbox" id="source_db_main" name="sources" value="db_main">
                                       <label for="source_db_main">🗄️ Base de Datos Principal</label>
                                   </div>
                                   <div class="checkbox-group">
                                       <input type="checkbox" id="source_api_crm" name="sources" value="api_crm">
                                       <label for="source_api_crm">🌐 API CRM Salesforce</label>
                                   </div>
                                   <div class="checkbox-group">
                                       <input type="checkbox" id="source_csv" name="sources" value="csv_inventory">
                                       <label for="source_csv">📊 Archivo Inventario CSV</label>
                                   </div>
                                   <div class="checkbox-group">
                                       <input type="checkbox" id="source_s3" name="sources" value="s3_bucket">
                                       <label for="source_s3">☁️ AWS S3 Bucket</label>
                                   </div>
                               </div>
                           </div>
                           
                           <div class="form-group">
                               <label for="targetDestination">Destino de Datos</label>
                               <select id="targetDestination" name="targetDestination" class="form-select">
                                   <option value="data_warehouse">🏢 Data Warehouse Principal</option>
                                   <option value="analytics_db">📊 Base de Datos Analytics</option>
                                   <option value="reporting_db">📈 Base de Datos Reportes</option>
                                   <option value="s3_output">☁️ AWS S3 Output</option>
                               </select>
                           </div>
                       </div>
                       
                       <div class="form-section">
                           <h4>⏰ Programación</h4>
                           
                           <div class="form-row">
                               <div class="form-group">
                                   <label for="executionFrequency">Frecuencia</label>
                                   <select id="executionFrequency" name="executionFrequency" class="form-select" onchange="toggleScheduleOptions()">
                                       <option value="manual">🔧 Manual</option>
                                       <option value="hourly">⏰ Cada hora</option>
                                       <option value="daily">📅 Diario</option>
                                       <option value="weekly">📆 Semanal</option>
                                       <option value="monthly">🗓️ Mensual</option>
                                   </select>
                               </div>
                               
                               <div class="form-group" id="scheduleTime" style="display: none;">
                                   <label for="executionTime">Hora de Ejecución</label>
                                   <input type="time" id="executionTime" name="executionTime" class="form-input" value="02:00">
                               </div>
                           </div>
                       </div>
                       
                       <div class="form-section">
                           <h4>⚙️ Opciones Avanzadas</h4>
                           
                           <div class="form-group">
                               <div class="checkbox-group">
                                   <input type="checkbox" id="enableRetry" name="enableRetry" checked>
                                   <label for="enableRetry">🔄 Habilitar reintentos automáticos</label>
                               </div>
                               
                               <div class="checkbox-group">
                                   <input type="checkbox" id="enableNotifications" name="enableNotifications" checked>
                                   <label for="enableNotifications">📧 Enviar notificaciones por email</label>
                               </div>
                               
                               <div class="checkbox-group">
                                   <input type="checkbox" id="enableLogging" name="enableLogging" checked>
                                   <label for="enableLogging">📝 Registro detallado de logs</label>
                               </div>
                           </div>
                           
                           <div class="form-row">
                               <div class="form-group">
                                   <label for="timeout">Tiempo límite (minutos)</label>
                                   <input type="number" id="timeout" name="timeout" class="form-input" value="60" min="1" max="1440">
                               </div>
                               
                               <div class="form-group">
                                   <label for="maxRetries">Máximo reintentos</label>
                                   <input type="number" id="maxRetries" name="maxRetries" class="form-input" value="3" min="0" max="10">
                               </div>
                           </div>
                       </div>

                       <div class="form-actions">
                           <button type="button" class="btn-secondary" onclick="showEtlDashboard()">
                               Cancelar
                           </button>
                           <button type="button" class="btn-primary" onclick="saveNewProcess()">
                               ✅ Crear Proceso
                           </button>
                       </div>
                   </form>
               </div>
           </div>

                   <div id="schedulesConfig" class="config-section">
                       <div class="section-header">
                           <span class="section-icon">⏰</span>
                           <div>
                               <h3>Programación</h3>
                               <p>Configura horarios y frecuencias de ejecución</p>
                           </div>
                           <button class="btn-primary" onclick="showNewScheduleForm()">
                               <span>➕</span>
                               Nueva Programación
                           </button>
                       </div>

                       <div class="schedules-container">
                           <!-- Calendar View -->
                           <div class="schedule-calendar">
                               <div class="calendar-header">
                                   <h4>📅 Vista de Calendario - Agosto 2025</h4>
                                   <div class="calendar-controls">
                                       <button class="btn-secondary btn-sm" onclick="previousMonth()">← Anterior</button>
                                       <button class="btn-secondary btn-sm" onclick="nextMonth()">Siguiente →</button>
                                   </div>
                               </div>
                               
                               <div class="calendar-grid">
                                   <div class="calendar-day-header">Dom</div>
                                   <div class="calendar-day-header">Lun</div>
                                   <div class="calendar-day-header">Mar</div>
                                   <div class="calendar-day-header">Mié</div>
                                   <div class="calendar-day-header">Jue</div>
                                   <div class="calendar-day-header">Vie</div>
                                   <div class="calendar-day-header">Sáb</div>
                                   
                                   <div class="calendar-day empty"></div>
                                   <div class="calendar-day empty"></div>
                                   <div class="calendar-day empty"></div>
                                   <div class="calendar-day empty"></div>
                                   <div class="calendar-day empty"></div>
                                   <div class="calendar-day">1</div>
                                   <div class="calendar-day">2</div>
                                   
                                   <div class="calendar-day">3</div>
                                   <div class="calendar-day">4</div>
                                   <div class="calendar-day">5</div>
                                   <div class="calendar-day today">
                                       6
                                       <div class="calendar-events">
                                           <div class="calendar-event ventas">Ventas</div>
                                           <div class="calendar-event marketing">Marketing</div>
                                       </div>
                                   </div>
                                   <div class="calendar-day">7</div>
                                   <div class="calendar-day">8</div>
                                   <div class="calendar-day">9</div>
                                   
                                   <div class="calendar-day">10</div>
                                   <div class="calendar-day">11</div>
                                   <div class="calendar-day">
                                       12
                                       <div class="calendar-events">
                                           <div class="calendar-event inventario">Inventario</div>
                                       </div>
                                   </div>
                                   <div class="calendar-day">13</div>
                                   <div class="calendar-day">14</div>
                                   <div class="calendar-day">15</div>
                                   <div class="calendar-day">16</div>
                                   
                                   <div class="calendar-day">17</div>
                                   <div class="calendar-day">18</div>
                                   <div class="calendar-day">
                                       19
                                       <div class="calendar-events">
                                           <div class="calendar-event inventario">Inventario</div>
                                       </div>
                                   </div>
                                   <div class="calendar-day">20</div>
                                   <div class="calendar-day">21</div>
                                   <div class="calendar-day">22</div>
                                   <div class="calendar-day">23</div>
                                   
                                   <div class="calendar-day">24</div>
                                   <div class="calendar-day">25</div>
                                   <div class="calendar-day">
                                       26
                                       <div class="calendar-events">
                                           <div class="calendar-event inventario">Inventario</div>
                                       </div>
                                   </div>
                                   <div class="calendar-day">27</div>
                                   <div class="calendar-day">28</div>
                                   <div class="calendar-day">29</div>
                                   <div class="calendar-day">30</div>
                                   
                                   <div class="calendar-day">31</div>
                                   <div class="calendar-day empty"></div>
                                   <div class="calendar-day empty"></div>
                                   <div class="calendar-day empty"></div>
                                   <div class="calendar-day empty"></div>
                                   <div class="calendar-day empty"></div>
                                   <div class="calendar-day empty"></div>
                               </div>
                           </div>

                           <!-- Schedule List -->
                           <div class="schedules-list">
                               <h4>📋 Programaciones Activas</h4>
                               
                               <div class="schedule-item">
                                   <div class="schedule-header">
                                       <div class="schedule-info">
                                           <h5>ETL Ventas Diario</h5>
                                           <p>Procesamiento automático de datos de ventas</p>
                                       </div>
                                       <div class="schedule-status active">Activo</div>
                                   </div>
                                   
                                   <div class="schedule-details">
                                       <div class="schedule-frequency">
                                           <span class="frequency-badge daily">📅 Diario</span>
                                           <span class="time-badge">🕕 6:00 AM</span>
                                       </div>
                                       
                                       <div class="schedule-config">
                                           <div class="config-row">
                                               <span class="config-label">Días:</span>
                                               <span class="config-value">Lunes a Domingo</span>
                                           </div>
                                           <div class="config-row">
                                               <span class="config-label">Zona horaria:</span>
                                               <span class="config-value">UTC-5 (America/Bogota)</span>
                                           </div>
                                           <div class="config-row">
                                               <span class="config-label">Próxima ejecución:</span>
                                               <span class="config-value">Mañana a las 6:00 AM</span>
                                           </div>
                                       </div>
                                   </div>
                                   
                                   <div class="schedule-actions">
                                       <button class="btn-secondary btn-sm" onclick="editSchedule('ventas_daily')">✏️ Editar</button>
                                       <button class="btn-secondary btn-sm" onclick="runNowSchedule('ventas_daily')">▶️ Ejecutar Ahora</button>
                                       <button class="btn-secondary btn-sm" onclick="toggleSchedule('ventas_daily')">⏸️ Pausar</button>
                                       <button class="btn-danger btn-sm" onclick="deleteSchedule('ventas_daily')">🗑️</button>
                                   </div>
                               </div>

                               <div class="schedule-item">
                                   <div class="schedule-header">
                                       <div class="schedule-info">
                                           <h5>ETL Inventario Semanal</h5>
                                           <p>Consolidación semanal de datos de inventario</p>
                                       </div>
                                       <div class="schedule-status active">Activo</div>
                                   </div>
                                   
                                   <div class="schedule-details">
                                       <div class="schedule-frequency">
                                           <span class="frequency-badge weekly">📅 Semanal</span>
                                           <span class="time-badge">🕘 9:00 PM</span>
                                       </div>
                                       
                                       <div class="schedule-config">
                                           <div class="config-row">
                                               <span class="config-label">Día:</span>
                                               <span class="config-value">Lunes</span>
                                           </div>
                                           <div class="config-row">
                                               <span class="config-label">Zona horaria:</span>
                                               <span class="config-value">UTC-5 (America/Bogota)</span>
                                           </div>
                                           <div class="config-row">
                                               <span class="config-label">Próxima ejecución:</span>
                                               <span class="config-value">Lunes 12 de Agosto a las 9:00 PM</span>
                                           </div>
                                       </div>
                                   </div>
                                   
                                   <div class="schedule-actions">
                                       <button class="btn-secondary btn-sm" onclick="editSchedule('inventory_weekly')">✏️ Editar</button>
                                       <button class="btn-secondary btn-sm" onclick="runNowSchedule('inventory_weekly')">▶️ Ejecutar Ahora</button>
                                       <button class="btn-secondary btn-sm" onclick="toggleSchedule('inventory_weekly')">⏸️ Pausar</button>
                                       <button class="btn-danger btn-sm" onclick="deleteSchedule('inventory_weekly')">🗑️</button>
                                   </div>
                               </div>

                               <div class="schedule-item">
                                   <div class="schedule-header">
                                       <div class="schedule-info">
                                           <h5>ETL Reportes Financieros</h5>
                                           <p>Generación mensual de reportes financieros</p>
                                       </div>
                                       <div class="schedule-status active">Activo</div>
                                   </div>
                                   
                                   <div class="schedule-details">
                                       <div class="schedule-frequency">
                                           <span class="frequency-badge monthly">📅 Mensual</span>
                                           <span class="time-badge">🕛 12:00 AM</span>
                                       </div>
                                       
                                       <div class="schedule-config">
                                           <div class="config-row">
                                               <span class="config-label">Día del mes:</span>
                                               <span class="config-value">Primer día del mes</span>
                                           </div>
                                           <div class="config-row">
                                               <span class="config-label">Zona horaria:</span>
                                               <span class="config-value">UTC-5 (America/Bogota)</span>
                                           </div>
                                           <div class="config-row">
                                               <span class="config-label">Próxima ejecución:</span>
                                               <span class="config-value">1 de Septiembre a las 12:00 AM</span>
                                           </div>
                                       </div>
                                   </div>
                                   
                                   <div class="schedule-actions">
                                       <button class="btn-secondary btn-sm" onclick="editSchedule('financial_monthly')">✏️ Editar</button>
                                       <button class="btn-secondary btn-sm" onclick="runNowSchedule('financial_monthly')">▶️ Ejecutar Ahora</button>
                                       <button class="btn-secondary btn-sm" onclick="toggleSchedule('financial_monthly')">⏸️ Pausar</button>
                                       <button class="btn-danger btn-sm" onclick="deleteSchedule('financial_monthly')">🗑️</button>
                                   </div>
                               </div>

                               <div class="schedule-item">
                                   <div class="schedule-header">
                                       <div class="schedule-info">
                                           <h5>ETL Clientes Incremental</h5>
                                           <p>Actualización por horas de datos de clientes</p>
                                       </div>
                                       <div class="schedule-status paused">Pausado</div>
                                   </div>
                                   
                                   <div class="schedule-details">
                                       <div class="schedule-frequency">
                                           <span class="frequency-badge hourly">⏰ Cada 4 horas</span>
                                           <span class="time-badge">🔄 24/7</span>
                                       </div>
                                       
                                       <div class="schedule-config">
                                           <div class="config-row">
                                               <span class="config-label">Intervalo:</span>
                                               <span class="config-value">Cada 4 horas</span>
                                           </div>
                                           <div class="config-row">
                                               <span class="config-label">Zona horaria:</span>
                                               <span class="config-value">UTC-5 (America/Bogota)</span>
                                           </div>
                                           <div class="config-row">
                                               <span class="config-label">Estado:</span>
                                               <span class="config-value warning">Pausado por errores</span>
                                           </div>
                                       </div>
                                   </div>
                                   
                                   <div class="schedule-actions">
                                       <button class="btn-secondary btn-sm" onclick="editSchedule('customers_incremental')">✏️ Editar</button>
                                       <button class="btn-secondary btn-sm" onclick="runNowSchedule('customers_incremental')">▶️ Ejecutar Ahora</button>
                                       <button class="btn-primary btn-sm" onclick="toggleSchedule('customers_incremental')">▶️ Reanudar</button>
                                       <button class="btn-danger btn-sm" onclick="deleteSchedule('customers_incremental')">🗑️</button>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       `,

       'informes': `
           <div class="dashboard-header">
               <h2 class="dashboard-title">Informes y Reportes</h2>
               <div class="quick-actions">
                   <button class="quick-action-btn">
                       <span>📊</span>
                       Nuevo Informe
                   </button>
                   <button class="quick-action-btn secondary">
                       <span>📤</span>
                       Exportar
                   </button>
               </div>
           </div>

           <div class="stats-grid">
               <div class="stat-card">
                   <div class="stat-header">
                       <div class="stat-icon">📋</div>
                       <div class="stat-trend up">
                           <span>↗️</span>
                           +8
                       </div>
                   </div>
                   <div class="stat-value">156</div>
                   <div class="stat-label">Informes Generados</div>
               </div>

               <div class="stat-card">
                   <div class="stat-header">
                       <div class="stat-icon">📈</div>
                       <div class="stat-trend up">
                           <span>↗️</span>
                           +25%
                       </div>
                   </div>
                   <div class="stat-value">47</div>
                   <div class="stat-label">Informes Automáticos</div>
               </div>

               <div class="stat-card">
                   <div class="stat-header">
                       <div class="stat-icon">👥</div>
                       <div class="stat-trend up">
                           <span>↗️</span>
                           +15%
                       </div>
                   </div>
                   <div class="stat-value">89</div>
                   <div class="stat-label">Usuarios Activos</div>
               </div>
           </div>

           <div class="chart-container">
               <div class="chart-header">
                   <h3 class="chart-title">Informes Más Utilizados</h3>
               </div>
               <div class="chart-placeholder">
                   📊 Análisis de Uso de Reportes
               </div>
           </div>
       `,

       'dashboards': `
           <div class="dashboard-header">
               <h2 class="dashboard-title">Dashboards Personalizados</h2>
               <div class="quick-actions">
                   <button class="quick-action-btn">
                       <span>➕</span>
                       Crear Dashboard
                   </button>
                   <button class="quick-action-btn secondary">
                       <span>📋</span>
                       Plantillas
                   </button>
               </div>
           </div>

           <div class="stats-grid">
               <div class="stat-card">
                   <div class="stat-header">
                       <div class="stat-icon">📊</div>
                       <div class="stat-trend up">
                           <span>↗️</span>
                           +5
                       </div>
                   </div>
                   <div class="stat-value">23</div>
                   <div class="stat-label">Dashboards Activos</div>
               </div>

               <div class="stat-card">
                   <div class="stat-header">
                       <div class="stat-icon">👁️</div>
                       <div class="stat-trend up">
                           <span>↗️</span>
                           +35%
                       </div>
                   </div>
                   <div class="stat-value">1.2K</div>
                   <div class="stat-label">Visualizaciones</div>
               </div>

               <div class="stat-card">
                   <div class="stat-header">
                       <div class="stat-icon">🔄</div>
                       <div class="stat-trend up">
                           <span>↗️</span>
                           +12%
                       </div>
                   </div>
                   <div class="stat-value">78</div>
                   <div class="stat-label">Actualizaciones Diarias</div>
               </div>
           </div>

           <div class="chart-container">
               <div class="chart-header">
                   <h3 class="chart-title">Galería de Dashboards</h3>
               </div>
               <div class="chart-placeholder">
                   📊 Vista Previa de Dashboards Disponibles
               </div>
           </div>
       `,

       'exportar': `
           <div class="dashboard-header">
               <h2 class="dashboard-title">Exportación de Datos</h2>
               <div class="quick-actions">
                   <button class="quick-action-btn">
                       <span>📤</span>
                       Nueva Exportación
                   </button>
                   <button class="quick-action-btn secondary">
                       <span>📋</span>
                       Programar
                   </button>
               </div>
           </div>

           <div class="stats-grid">
               <div class="stat-card">
                   <div class="stat-header">
                       <div class="stat-icon">📤</div>
                       <div class="stat-trend up">
                           <span>↗️</span>
                           +12
                       </div>
                   </div>
                   <div class="stat-value">89</div>
                   <div class="stat-label">Exportaciones Este Mes</div>
               </div>

               <div class="stat-card">
                   <div class="stat-header">
                       <div class="stat-icon">📁</div>
                       <div class="stat-trend up">
                           <span>↗️</span>
                           +25%
                       </div>
                   </div>
                   <div class="stat-value">1.8GB</div>
                   <div class="stat-label">Datos Exportados</div>
               </div>

               <div class="stat-card">
                   <div class="stat-header">
                       <div class="stat-icon">⏱️</div>
                       <div class="stat-trend down">
                           <span>↘️</span>
                           -15%
                       </div>
                   </div>
                   <div class="stat-value">3.2min</div>
                   <div class="stat-label">Tiempo Promedio</div>
               </div>
           </div>

           <div class="chart-container">
               <div class="chart-header">
                   <h3 class="chart-title">Historial de Exportaciones</h3>
               </div>
               <div class="chart-placeholder">
                   📤 Registro de Exportaciones Recientes
               </div>
           </div>
       `,

       'formulario': `
           <div class="dashboard-header">
               <h2 class="dashboard-title">🎨 Personalizar Empresa</h2>
               <div class="quick-actions">
                   <button class="quick-action-btn">
                       <span>➕</span>
                       Nuevo Formulario
                   </button>
                   <button class="quick-action-btn secondary">
                       <span>📋</span>
                       Plantillas
                   </button>
               </div>
           </div>

           <div class="customize-panel-content">
               <form id="customizeForm" class="customize-form">
                   <!-- Información Básica -->
                   <div class="customize-section">
                       <h4 class="customize-section-title">📋 Información Básica</h4>
                       
                       <div class="form-group">
                           <label class="form-label">Nombre de la Empresa</label>
                           <input type="text" id="companyNameInput" class="form-input" placeholder="Nombre de la empresa" value="TecnoCorp">
                       </div>
                       
                       <div class="form-group">
                           <label class="form-label">Subtítulo</label>
                           <input type="text" id="companySubtitleInput" class="form-input" placeholder="Subtítulo o eslogan" value="Admin Total">
                       </div>
                       
                       <div class="form-group">
                           <label class="form-label">Logo</label>
                           <input type="file" id="companyLogoInput" class="form-input" accept="image/*" onchange="handleLogoUpload(event)">
                           <div id="logoPreview" class="logo-preview" style="margin-top: 10px;">
                               <img id="logoPreviewImg" src="" alt="Vista previa del logo" style="display: none; max-width: 100px; max-height: 100px; border-radius: 6px; border: 1px solid var(--border-color);">
                           </div>
                       </div>
                   </div>

                   <!-- Paleta de Colores -->
                   <div class="customize-section">
                       <h4 class="customize-section-title">🎨 Paleta de Colores</h4>
                       
                       <div class="color-presets">
                           <div class="preset-label">Paletas Predefinidas:</div>
                           <div class="color-preset-grid">
                               <button type="button" class="color-preset active" data-preset="azul" onclick="applyColorPreset('azul')">
                                   <div class="preset-colors">
                                       <span style="background: #4f7cff;"></span>
                                       <span style="background: #3b5bdb;"></span>
                                       <span style="background: #6c8eff;"></span>
                                   </div>
                                   <span>Azul</span>
                               </button>
                               
                               <button type="button" class="color-preset" data-preset="verde" onclick="applyColorPreset('verde')">
                                   <div class="preset-colors">
                                       <span style="background: #059669;"></span>
                                       <span style="background: #047857;"></span>
                                       <span style="background: #10b981;"></span>
                                   </div>
                                   <span>Verde</span>
                               </button>
                               
                               <button type="button" class="color-preset" data-preset="morado" onclick="applyColorPreset('morado')">
                                   <div class="preset-colors">
                                       <span style="background: #7c3aed;"></span>
                                       <span style="background: #6d28d9;"></span>
                                       <span style="background: #8b5cf6;"></span>
                                   </div>
                                   <span>Morado</span>
                               </button>
                               
                               <button type="button" class="color-preset" data-preset="naranja" onclick="applyColorPreset('naranja')">
                                   <div class="preset-colors">
                                       <span style="background: #ea580c;"></span>
                                       <span style="background: #c2410c;"></span>
                                       <span style="background: #fb923c;"></span>
                                   </div>
                                   <span>Naranja</span>
                               </button>
                               
                               <button type="button" class="color-preset" data-preset="rojo" onclick="applyColorPreset('rojo')">
                                   <div class="preset-colors">
                                       <span style="background: #dc2626;"></span>
                                       <span style="background: #b91c1c;"></span>
                                       <span style="background: #f87171;"></span>
                                   </div>
                                   <span>Rojo</span>
                               </button>
                               
                               <button type="button" class="color-preset" data-preset="personalizado" onclick="applyColorPreset('personalizado')">
                                   <div class="preset-colors">
                                       <span style="background: #6b7280;"></span>
                                       <span style="background: #4b5563;"></span>
                                       <span style="background: #9ca3af;"></span>
                                   </div>
                                   <span>Personalizado</span>
                               </button>
                           </div>
                       </div>

                       <div class="custom-colors" id="customColors" style="display: none;">
                           <div class="form-group">
                               <label class="form-label">Color Primario</label>
                               <div class="color-input-group">
                                   <input type="color" id="primaryColor" class="color-picker" value="#4f7cff">
                                   <input type="text" id="primaryColorText" class="color-text" value="#4f7cff">
                               </div>
                           </div>
                           
                           <div class="form-group">
                               <label class="form-label">Color Secundario</label>
                               <div class="color-input-group">
                                   <input type="color" id="secondaryColor" class="color-picker" value="#3b5bdb">
                                   <input type="text" id="secondaryColorText" class="color-text" value="#3b5bdb">
                               </div>
                           </div>
                           
                           <div class="form-group">
                               <label class="form-label">Color de Acento</label>
                               <div class="color-input-group">
                                   <input type="color" id="accentColor" class="color-picker" value="#6c8eff">
                                   <input type="text" id="accentColorText" class="color-text" value="#6c8eff">
                               </div>
                           </div>
                       </div>
                   </div>

                   <!-- Vista Previa -->
                   <div class="customize-section">
                       <h4 class="customize-section-title">👁️ Vista Previa</h4>
                       <div class="preview-container">
                           <div class="preview-company-header">
                               <div class="preview-logo" id="previewLogo">TC</div>
                               <div class="preview-info">
                                   <div class="preview-name" id="previewName">TecnoCorp</div>
                                   <div class="preview-subtitle" id="previewSubtitle">Admin Total</div>
                               </div>
                           </div>
                           
                           <div class="preview-elements">
                               <button class="preview-btn">Botón de Ejemplo</button>
                               <div class="preview-card">
                                   <div class="preview-card-header">Tarjeta de Ejemplo</div>
                                   <div class="preview-card-content">
                                       Este es un ejemplo de cómo se verían los elementos con la nueva paleta de colores.
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>

                   <!-- Botones de Acción -->
                   <div class="customize-actions">
                       <button type="button" class="btn-secondary" onclick="resetCustomization()">
                           <span>🔄</span>
                           Restablecer
                       </button>
                       <button type="button" class="btn-primary" onclick="saveCustomization()">
                           <span>💾</span>
                           Guardar Cambios
                       </button>
                   </div>
               </form>
           </div>
       `,

       'usuarios': `
           <!-- Vista Lista de Usuarios Administradores -->
           <div id="vistaListaUsuarios" class="usuario-vista active">
               <div class="dashboard-header">
                   <h2 class="dashboard-title">Usuarios Administradores</h2>
                   <div class="quick-actions">
                       <button class="quick-action-btn" onclick="mostrarVistaAgregarUsuario()">
                           <span>👤</span>
                           Nuevo Usuario
                       </button>
                       <button class="quick-action-btn secondary">
                           <span>📊</span>
                           Reportes
                       </button>
                   </div>
               </div>

               <div class="stats-grid">
                   <div class="stat-card">
                       <div class="stat-header">
                           <div class="stat-icon">👥</div>
                           <div class="stat-trend up">
                               <span>↗️</span>
                               +2
                           </div>
                       </div>
                       <div class="stat-value">10</div>
                       <div class="stat-label">Total Administradores</div>
                   </div>

                   <div class="stat-card">
                       <div class="stat-header">
                           <div class="stat-icon">✅</div>
                           <div class="stat-trend up">
                               <span>↗️</span>
                               +1
                           </div>
                       </div>
                       <div class="stat-value">8</div>
                       <div class="stat-label">Activos</div>
                   </div>

                   <div class="stat-card">
                       <div class="stat-header">
                           <div class="stat-icon">🔐</div>
                           <div class="stat-trend up">
                               <span>↗️</span>
                               +1
                           </div>
                       </div>
                       <div class="stat-value">4</div>
                       <div class="stat-label">Admin Total</div>
                   </div>
               </div>

               <div class="table-controls">
                   <div class="search-container">
                       <input type="text" class="search-input" placeholder="Buscar usuarios..." onkeyup="buscarUsuarios(this.value)">
                   </div>
                   <div class="filter-controls">
                       <select class="filter-select" onchange="filtrarPorPerfil(this.value)">
                           <option value="">Todos los perfiles</option>
                           <option value="basico">Administrador Básico</option>
                           <option value="medio">Administrador Medio</option>
                           <option value="total">Administrador Total</option>
                       </select>
                       <select class="filter-select" onchange="filtrarPorEstado(this.value)">
                           <option value="">Todos los estados</option>
                           <option value="activo">Activo</option>
                           <option value="inactivo">Inactivo</option>
                       </select>
                   </div>
               </div>

               <div class="activity-table">
                   <table>
                       <thead>
                           <tr>
                               <th>Usuario</th>
                               <th>Email</th>
                               <th>Perfil</th>
                               <th>Estado</th>
                               <th>Último Acceso</th>
                               <th>Acciones</th>
                           </tr>
                       </thead>
                       <tbody id="usuariosTableBody">
                           <tr>
                               <td>
                                   <div class="user-info">
                                       <div class="user-avatar">JM</div>
                                       <div>
                                           <div class="user-name">Juan Martínez</div>
                                           <div class="user-role">Administrador Principal</div>
                                       </div>
                                   </div>
                               </td>
                               <td>juan.martinez@tecnocorp.com</td>
                               <td>
                                   <div class="perfil-badge total">ADMINISTRADOR TOTAL</div>
                                   <div class="perfil-desc">Subir información, ver informes, dashboard y bajar data</div>
                               </td>
                               <td><span class="status-badge activo">Activo</span></td>
                               <td>Hace 2 horas</td>
                               <td class="action-cell">
                                   <button class="action-btn edit" onclick="editarUsuario('user_1')" title="Editar">✏️</button>
                                   <button class="action-btn delete" onclick="eliminarUsuario('user_1')" title="Eliminar">🗑️</button>
                               </td>
                           </tr>
                           <tr>
                               <td>
                                   <div class="user-info">
                                       <div class="user-avatar">AC</div>
                                       <div>
                                           <div class="user-name">Ana Castro</div>
                                           <div class="user-role">Administradora de Datos</div>
                                       </div>
                                   </div>
                               </td>
                               <td>ana.castro@tecnocorp.com</td>
                               <td>
                                   <div class="perfil-badge medio">ADMINISTRADOR MEDIO</div>
                                   <div class="perfil-desc">Subir información + ver informes y dashboard</div>
                               </td>
                               <td><span class="status-badge activo">Activo</span></td>
                               <td>Hace 1 día</td>
                               <td class="action-cell">
                                   <button class="action-btn edit" onclick="editarUsuario('user_2')" title="Editar">✏️</button>
                                   <button class="action-btn delete" onclick="eliminarUsuario('user_2')" title="Eliminar">🗑️</button>
                               </td>
                           </tr>
                           <tr>
                               <td>
                                   <div class="user-info">
                                       <div class="user-avatar">MR</div>
                                       <div>
                                           <div class="user-name">Miguel Rodríguez</div>
                                           <div class="user-role">Operador de Carga</div>
                                       </div>
                                   </div>
                               </td>
                               <td>miguel.rodriguez@tecnocorp.com</td>
                               <td>
                                   <div class="perfil-badge basico">ADMINISTRADOR BÁSICO</div>
                                   <div class="perfil-desc">Subir información</div>
                               </td>
                               <td><span class="status-badge activo">Activo</span></td>
                               <td>Hace 3 horas</td>
                               <td class="action-cell">
                                   <button class="action-btn edit" onclick="editarUsuario('user_3')" title="Editar">✏️</button>
                                   <button class="action-btn delete" onclick="eliminarUsuario('user_3')" title="Eliminar">🗑️</button>
                               </td>
                           </tr>
                           <tr>
                               <td>
                                   <div class="user-info">
                                       <div class="user-avatar">LS</div>
                                       <div>
                                           <div class="user-name">Laura Silva</div>
                                           <div class="user-role">Analista Senior</div>
                                       </div>
                                   </div>
                               </td>
                               <td>laura.silva@tecnocorp.com</td>
                               <td>
                                   <div class="perfil-badge total">ADMINISTRADOR TOTAL</div>
                                   <div class="perfil-desc">Subir información, ver informes, dashboard y bajar data</div>
                               </td>
                               <td><span class="status-badge activo">Activo</span></td>
                               <td>Hace 30 min</td>
                               <td class="action-cell">
                                   <button class="action-btn edit" onclick="editarUsuario('user_4')" title="Editar">✏️</button>
                                   <button class="action-btn delete" onclick="eliminarUsuario('user_4')" title="Eliminar">🗑️</button>
                               </td>
                           </tr>
                           <tr>
                               <td>
                                   <div class="user-info">
                                       <div class="user-avatar">CR</div>
                                       <div>
                                           <div class="user-name">Carlos Ruiz</div>
                                           <div class="user-role">Supervisor</div>
                                       </div>
                                   </div>
                               </td>
                               <td>carlos.ruiz@tecnocorp.com</td>
                               <td>
                                   <div class="perfil-badge medio">ADMINISTRADOR MEDIO</div>
                                   <div class="perfil-desc">Subir información + ver informes y dashboard</div>
                               </td>
                               <td><span class="status-badge inactivo">Inactivo</span></td>
                               <td>Hace 1 semana</td>
                               <td class="action-cell">
                                   <button class="action-btn edit" onclick="editarUsuario('user_5')" title="Editar">✏️</button>
                                   <button class="action-btn delete" onclick="eliminarUsuario('user_5')" title="Eliminar">🗑️</button>
                               </td>
                           </tr>
                       </tbody>
                   </table>
               </div>
               
               <div class="activity-pagination" id="usuarios-pagination">
                   <div class="pagination-info">
                       <span id="usuariosPaginationInfo">Mostrando 1-5 de 10 usuarios</span>
                   </div>
                   <div class="pagination-controls">
                       <button class="pagination-btn" id="usuariosPrevBtn" onclick="changeUsuariosPage(-1)">‹</button>
                       <button class="pagination-btn" id="usuariosNextBtn" onclick="changeUsuariosPage(1)">›</button>
                   </div>
               </div>
           </div>

           <!-- Vista Agregar Usuario -->
           <div id="vistaAgregarUsuario" class="usuario-vista" style="display: none;">
               <div class="dashboard-header">
                   <div class="header-navigation">
                       <button class="btn-back" onclick="mostrarVistaListaUsuarios()">
                           ← Volver a la lista
                       </button>
                       <h2 class="dashboard-title">Agregar Nuevo Usuario Administrador</h2>
                   </div>
               </div>

               <div class="form-container">
                   <form class="user-form" onsubmit="guardarNuevoUsuario(event)">
                       <div class="form-row">
                           <div class="form-group">
                               <label class="form-label">Nombres *</label>
                               <input type="text" class="form-input" id="nuevosNombres" placeholder="Nombres del usuario" required>
                           </div>
                           <div class="form-group">
                               <label class="form-label">Apellidos *</label>
                               <input type="text" class="form-input" id="nuevosApellidos" placeholder="Apellidos del usuario" required>
                           </div>
                       </div>

                       <div class="form-row">
                           <div class="form-group">
                               <label class="form-label">Email *</label>
                               <input type="email" class="form-input" id="nuevoEmail" placeholder="email@tecnocorp.com" required>
                           </div>
                           <div class="form-group">
                               <label class="form-label">Cargo</label>
                               <input type="text" class="form-input" id="nuevoCargo" placeholder="Cargo del usuario">
                           </div>
                       </div>

                       <div class="form-row">
                           <div class="form-group">
                               <label class="form-label">Perfil de Administrador *</label>
                               <select class="form-select" id="nuevoPerfil" onchange="mostrarDescripcionPerfil(this.value)" required>
                                   <option value="">Seleccionar perfil</option>
                                   <option value="basico">Administrador Básico</option>
                                   <option value="medio">Administrador Medio</option>
                                   <option value="total">Administrador Total</option>
                               </select>
                           </div>
                           <div class="form-group">
                               <label class="form-label">Estado</label>
                               <select class="form-select" id="nuevoEstado">
                                   <option value="activo">Activo</option>
                                   <option value="inactivo">Inactivo</option>
                               </select>
                           </div>
                       </div>

                       <div class="perfil-info-box">
                           <div id="perfilDescripcionCard" class="perfil-description-card" style="display: none;">
                               <h4 id="perfilTitulo"></h4>
                               <p id="perfilDescripcion"></p>
                               <p class="description-text" id="perfilDetalle"></p>
                           </div>
                       </div>

                       <div class="form-actions">
                           <button type="button" class="btn-cancel" onclick="mostrarVistaListaUsuarios()">Cancelar</button>
                           <button type="submit" class="btn-primary">Guardar Usuario</button>
                       </div>
                   </form>
               </div>
           </div>

           <!-- Vista Editar Usuario -->
           <div id="vistaEditarUsuario" class="usuario-vista" style="display: none;">
               <div class="dashboard-header">
                   <div class="header-navigation">
                       <button class="btn-back" onclick="mostrarVistaListaUsuarios()">
                           ← Volver a la lista
                       </button>
                       <h2 class="dashboard-title">Editar Usuario Administrador</h2>
                   </div>
               </div>

               <div class="form-container">
                   <form class="user-form" onsubmit="guardarEditarUsuario(event)">
                       <input type="hidden" id="editarUserId">
                       
                       <div class="form-row">
                           <div class="form-group">
                               <label class="form-label">Nombres *</label>
                               <input type="text" class="form-input" id="editarNombres" placeholder="Nombres del usuario" required>
                           </div>
                           <div class="form-group">
                               <label class="form-label">Apellidos *</label>
                               <input type="text" class="form-input" id="editarApellidos" placeholder="Apellidos del usuario" required>
                           </div>
                       </div>

                       <div class="form-row">
                           <div class="form-group">
                               <label class="form-label">Email *</label>
                               <input type="email" class="form-input" id="editarEmail" placeholder="email@tecnocorp.com" required>
                           </div>
                           <div class="form-group">
                               <label class="form-label">Cargo</label>
                               <input type="text" class="form-input" id="editarCargo" placeholder="Cargo del usuario">
                           </div>
                       </div>

                       <div class="form-row">
                           <div class="form-group">
                               <label class="form-label">Perfil de Administrador *</label>
                               <select class="form-select" id="editarPerfil" onchange="mostrarDescripcionPerfilEditar(this.value)" required>
                                   <option value="">Seleccionar perfil</option>
                                   <option value="basico">Administrador Básico</option>
                                   <option value="medio">Administrador Medio</option>
                                   <option value="total">Administrador Total</option>
                               </select>
                           </div>
                           <div class="form-group">
                               <label class="form-label">Estado</label>
                               <select class="form-select" id="editarEstado">
                                   <option value="activo">Activo</option>
                                   <option value="inactivo">Inactivo</option>
                               </select>
                           </div>
                       </div>

                       <div class="perfil-info-box">
                           <div id="perfilDescripcionCardEditar" class="perfil-description-card" style="display: none;">
                               <h4 id="perfilTituloEditar"></h4>
                               <p id="perfilDescripcionEditar"></p>
                               <p class="description-text" id="perfilDetalleEditar"></p>
                           </div>
                       </div>

                       <div class="form-actions">
                           <button type="button" class="btn-cancel" onclick="mostrarVistaListaUsuarios()">Cancelar</button>
                           <button type="submit" class="btn-primary">Actualizar Usuario</button>
                       </div>
                   </form>
               </div>
           </div>
       `,

       'roles-permisos': `
           <div class="dashboard-header">
               <h2 class="dashboard-title">Roles y Permisos</h2>
               <div class="quick-actions">
                   <button class="quick-action-btn">
                       <span>🔐</span>
                       Nuevo Rol
                   </button>
                   <button class="quick-action-btn secondary">
                       <span>⚙️</span>
                       Configurar
                   </button>
               </div>
           </div>

           <div class="stats-grid">
               <div class="stat-card">
                   <div class="stat-header">
                       <div class="stat-icon">🔐</div>
                       <div class="stat-trend up">
                           <span>↗️</span>
                           +2
                       </div>
                   </div>
                   <div class="stat-value">18</div>
                   <div class="stat-label">Roles Definidos</div>
               </div>

               <div class="stat-card">
                   <div class="stat-header">
                       <div class="stat-icon">✅</div>
                       <div class="stat-trend up">
                           <span>↗️</span>
                           +45
                       </div>
                   </div>
                   <div class="stat-value">156</div>
                   <div class="stat-label">Permisos Configurados</div>
               </div>

               <div class="stat-card">
                   <div class="stat-header">
                       <div class="stat-icon">👥</div>
                       <div class="stat-trend up">
                           <span>↗️</span>
                           +8%
                       </div>
                   </div>
                   <div class="stat-value">98.2%</div>
                   <div class="stat-label">Cumplimiento</div>
               </div>
           </div>

           <div class="chart-container">
               <div class="chart-header">
                   <h3 class="chart-title">Matriz de Permisos</h3>
               </div>
               <div class="chart-placeholder<div class="chart-placeholder">
                   🔐 Configuración de Roles y Permisos
               </div>
           </div>
       `,

       'configuracion': `
           <div class="dashboard-header">
               <h2 class="dashboard-title">Configuración del Sistema</h2>
               <div class="quick-actions">
                   <button class="quick-action-btn">
                       <span>💾</span>
                       Guardar Cambios
                   </button>
                   <button class="quick-action-btn secondary">
                       <span>🔄</span>
                       Restaurar
                   </button>
               </div>
           </div>

           <div class="stats-grid">
               <div class="stat-card">
                   <div class="stat-header">
                       <div class="stat-icon">⚙️</div>
                       <div class="stat-trend up">
                           <span>↗️</span>
                           +5
                       </div>
                   </div>
                   <div class="stat-value">87</div>
                   <div class="stat-label">Configuraciones Activas</div>
               </div>

               <div class="stat-card">
                   <div class="stat-header">
                       <div class="stat-icon">🔒</div>
                       <div class="stat-trend up">
                           <span>↗️</span>
                           +2%
                       </div>
                   </div>
                   <div class="stat-value">99.8%</div>
                   <div class="stat-label">Nivel de Seguridad</div>
               </div>

               <div class="stat-card">
                   <div class="stat-header">
                       <div class="stat-icon">📊</div>
                       <div class="stat-trend up">
                           <span>↗️</span>
                           +12%
                       </div>
                   </div>
                   <div class="stat-value">45.2GB</div>
                   <div class="stat-label">Backup Automático</div>
               </div>
           </div>

           <div class="chart-container">
               <div class="chart-header">
                   <h3 class="chart-title">Panel de Configuración</h3>
               </div>
               <div class="chart-placeholder">
                   ⚙️ Configuraciones del Sistema
               </div>
           </div>
       `,

       'cargar-datos': `
           <div class="dashboard-header">
               <div class="header-nav">
                   <button class="nav-back-btn" data-action="dashboard">
                       <span>← Volver</span>
                   </button>
               </div>
               <h2 class="dashboard-title">📤 Cargar Datos</h2>
               <p class="dashboard-subtitle">Sube y gestiona tus archivos de datos de forma sencilla</p>
           </div>

           <div class="data-upload-container">
               <!-- Selector de método de carga -->
               <div class="upload-method-selector">
                   <h3>Selecciona el método de carga de datos</h3>
                   <div class="method-tabs">
                       <button class="method-tab active" data-method="file">
                           <span class="tab-icon">📁</span>
                           <span class="tab-label">Cargar Archivo</span>
                       </button>
                       <button class="method-tab" data-method="api">
                           <span class="tab-icon">🔗</span>
                           <span class="tab-label">Conexión API</span>
                       </button>
                   </div>
               </div>

               <!-- Formulario de carga por archivo -->
               <div class="upload-section active" id="fileUploadSection">
                   <div class="upload-card">
                       <div class="upload-header">
                           <h4>📁 Carga de Archivos</h4>
                           <p>Sube archivos CSV, Excel o JSON para procesar</p>
                       </div>

                       <!-- Zona de drag & drop -->
                       <div class="drag-drop-zone" id="dragDropZone">
                           <div class="drag-drop-content">
                               <div class="upload-icon">📤</div>
                               <p class="drag-text">Arrastra y suelta tus archivos aquí</p>
                               <p class="or-text">o</p>
                               <button class="browse-btn" onclick="document.getElementById('fileInput').click()">
                                   Seleccionar Archivos
                               </button>
                               <input type="file" id="fileInput" multiple accept=".csv,.xlsx,.xls,.json" style="display: none;">
                           </div>
                       </div>

                       <!-- Lista de archivos seleccionados -->
                       <div class="selected-files" id="selectedFilesList" style="display: none;">
                           <h5>Archivos seleccionados:</h5>
                           <div id="fileItems"></div>
                       </div>

                       <!-- Configuración de procesamiento -->
                       <div class="processing-config">
                           <h5>Configuración de procesamiento</h5>
                           <div class="config-grid">
                               <div class="config-item">
                                   <label for="delimiter">Delimitador (CSV)</label>
                                   <select id="delimiter">
                                       <option value=",">Coma (,)</option>
                                       <option value=";">Punto y coma (;)</option>
                                       <option value="\\t">Tabulación</option>
                                       <option value="|">Barra vertical (|)</option>
                                   </select>
                               </div>
                               <div class="config-item">
                                   <label for="encoding">Codificación</label>
                                   <select id="encoding">
                                       <option value="utf-8">UTF-8</option>
                                       <option value="latin1">Latin-1</option>
                                       <option value="cp1252">Windows-1252</option>
                                   </select>
                               </div>
                               <div class="config-item">
                                   <label for="hasHeaders">
                                       <input type="checkbox" id="hasHeaders" checked>
                                       Primera fila contiene encabezados
                                   </label>
                               </div>
                               <div class="config-item">
                                   <label for="skipRows">Saltar filas iniciales</label>
                                   <input type="number" id="skipRows" value="0" min="0">
                               </div>
                           </div>
                       </div>

                       <!-- Botones de acción -->
                       <div class="upload-actions">
                           <button class="btn-secondary" onclick="clearFileSelection()">Limpiar</button>
                           <button class="btn-primary" id="uploadFilesBtn" onclick="processFiles()" disabled>
                               <span>📤</span> Procesar Archivos
                           </button>
                       </div>

                       <!-- Barra de progreso -->
                       <div class="upload-progress" id="uploadProgress" style="display: none;">
                           <div class="progress-header">
                               <span id="progressText">Procesando archivos...</span>
                               <span id="progressPercent">0%</span>
                           </div>
                           <div class="progress-bar">
                               <div class="progress-fill" id="progressFill"></div>
                           </div>
                       </div>
                   </div>
               </div>

               <!-- Formulario de conexión API -->
               <div class="upload-section" id="apiUploadSection">
                   <div class="upload-card">
                       <div class="upload-header">
                           <h4>🔗 Conexión API</h4>
                           <p>Conecta con APIs externas para importar datos en tiempo real</p>
                       </div>

                       <!-- Configuración de API -->
                       <div class="api-config">
                           <div class="config-group">
                               <label for="apiUrl">URL de la API</label>
                               <input type="url" id="apiUrl" placeholder="https://api.ejemplo.com/datos" class="form-control">
                           </div>

                           <div class="config-group">
                               <label for="apiMethod">Método HTTP</label>
                               <select id="apiMethod" class="form-control">
                                   <option value="GET">GET</option>
                                   <option value="POST">POST</option>
                                   <option value="PUT">PUT</option>
                               </select>
                           </div>

                           <div class="config-group">
                               <label for="authType">Tipo de autenticación</label>
                               <select id="authType" class="form-control" onchange="toggleAuthFields()">
                                   <option value="none">Sin autenticación</option>
                                   <option value="bearer">Bearer Token</option>
                                   <option value="apikey">API Key</option>
                                   <option value="basic">Basic Auth</option>
                               </select>
                           </div>

                           <!-- Campos de autenticación -->
                           <div class="auth-fields" id="authFields" style="display: none;">
                               <div class="config-group" id="tokenField" style="display: none;">
                                   <label for="bearerToken">Bearer Token</label>
                                   <input type="password" id="bearerToken" placeholder="Tu token de acceso" class="form-control">
                               </div>
                               <div class="config-group" id="apiKeyField" style="display: none;">
                                   <label for="apiKey">API Key</label>
                                   <input type="password" id="apiKey" placeholder="Tu API key" class="form-control">
                                   <label for="apiKeyHeader">Nombre del header</label>
                                   <input type="text" id="apiKeyHeader" placeholder="X-API-Key" class="form-control">
                               </div>
                               <div class="basic-auth" id="basicAuthFields" style="display: none;">
                                   <div class="config-group">
                                       <label for="username">Usuario</label>
                                       <input type="text" id="username" placeholder="Usuario" class="form-control">
                                   </div>
                                   <div class="config-group">
                                       <label for="password">Contraseña</label>
                                       <input type="password" id="password" placeholder="Contraseña" class="form-control">
                                   </div>
                               </div>
                           </div>

                           <!-- Headers personalizados -->
                           <div class="config-group">
                               <label>Headers personalizados</label>
                               <div class="headers-container" id="headersContainer">
                                   <div class="header-row">
                                       <input type="text" placeholder="Nombre del header" class="form-control header-key">
                                       <input type="text" placeholder="Valor" class="form-control header-value">
                                       <button class="btn-icon" onclick="addHeaderRow()">+</button>
                                   </div>
                               </div>
                           </div>

                           <!-- Configuración de respuesta -->
                           <div class="config-group">
                               <label for="dataPath">Ruta de los datos (JSON Path)</label>
                               <input type="text" id="dataPath" placeholder="data.results" class="form-control">
                               <small>Opcional: especifica la ruta donde están los datos en la respuesta JSON</small>
                           </div>

                           <!-- Configuración de sincronización -->
                           <div class="sync-config">
                               <h5>Configuración de sincronización</h5>
                               <div class="config-grid">
                                   <div class="config-item">
                                       <label for="syncInterval">
                                           <input type="checkbox" id="syncInterval">
                                           Sincronización automática
                                       </label>
                                   </div>
                                   <div class="config-item">
                                       <label for="intervalTime">Intervalo (minutos)</label>
                                       <input type="number" id="intervalTime" value="60" min="5" disabled>
                                   </div>
                               </div>
                           </div>
                       </div>

                       <!-- Botones de acción -->
                       <div class="upload-actions">
                           <button class="btn-secondary" onclick="testConnection()">🔍 Probar Conexión</button>
                           <button class="btn-primary" onclick="connectAPI()">
                               <span>🔗</span> Conectar y Importar
                           </button>
                       </div>

                       <!-- Estado de la conexión -->
                       <div class="connection-status" id="connectionStatus" style="display: none;">
                           <div class="status-content">
                               <span id="statusIcon">🔄</span>
                               <span id="statusText">Probando conexión...</span>
                           </div>
                       </div>
                   </div>
               </div>

               <!-- Historial de cargas -->
               <div class="upload-history">
                   <div class="history-header">
                       <h4>📈 Historial de cargas recientes</h4>
                       <div class="history-controls">
                           <div class="search-container">
                               <input type="text" id="historySearch" placeholder="Buscar por nombre de archivo o tipo..." class="search-input">
                               <button class="search-btn" onclick="searchHistory()">🔍</button>
                           </div>
                           <div class="filter-container">
                               <select id="typeFilter" onchange="filterHistory()" class="filter-select">
                                   <option value="">Todos los tipos</option>
                                   <option value="file">Archivo</option>
                                   <option value="api">API</option>
                               </select>
                               <select id="statusFilter" onchange="filterHistory()" class="filter-select">
                                   <option value="">Todos los estados</option>
                                   <option value="success">Completado</option>
                                   <option value="error">Error</option>
                                   <option value="processing">Procesando</option>
                               </select>
                           </div>
                       </div>
                   </div>

                   <!-- Tabla de historial -->
                   <div class="history-table-container">
                       <table class="history-table">
                           <thead>
                               <tr>
                                   <th>Tipo</th>
                                   <th>Nombre/Fuente</th>
                                   <th>Registros</th>
                                   <th>Usuario</th>
                                   <th>Fecha de Carga</th>
                                   <th>Estado</th>
                                   <th>Acciones</th>
                               </tr>
                           </thead>
                           <tbody id="historyTableBody">
                               <!-- El contenido se genera dinámicamente -->
                           </tbody>
                       </table>
                   </div>

                   <!-- Información de no encontrado -->
                   <div class="no-results" id="noResults" style="display: none;">
                       <div class="no-results-icon">🔍</div>
                       <div class="no-results-text">No se encontraron registros</div>
                       <div class="no-results-subtitle">Intenta cambiar los filtros de búsqueda</div>
                   </div>

                   <!-- Paginación -->
                   <div class="pagination-container">
                       <div class="pagination-info">
                           <span id="paginationInfo">Mostrando 1-5 de 15 registros</span>
                       </div>
                       <div class="pagination-controls">
                           <button class="pagination-btn" id="prevPage" onclick="changePage(-1)" disabled>← Anterior</button>
                           <div class="page-numbers" id="pageNumbers">
                               <!-- Se genera dinámicamente -->
                           </div>
                           <button class="pagination-btn" id="nextPage" onclick="changePage(1)">Siguiente →</button>
                       </div>
                       <div class="items-per-page">
                           <label for="itemsPerPage">Elementos por página:</label>
                           <select id="itemsPerPage" onchange="changeItemsPerPage()">
                               <option value="5">5</option>
                               <option value="10" selected>10</option>
                               <option value="20">20</option>
                               <option value="50">50</option>
                           </select>
                       </div>
                   </div>
               </div>
           </div>
       `,

       'nuevo-analisis': `
           <div class="dashboard-header">
               <div class="header-nav">
                   <button class="nav-back-btn" data-action="dashboard">
                       <span>← Volver</span>
                   </button>
               </div>
               <h2 class="dashboard-title">📊 Nuevo Análisis</h2>
               <p class="dashboard-subtitle">Crea análisis personalizados con tus datos</p>
           </div>

           <div class="analysis-container">
               <!-- Progress Steps -->
               <div class="analysis-wizard">
                   <div class="wizard-steps">
                       <div class="step-item active" data-step="1">
                           <div class="step-number">1</div>
                           <div class="step-label">Tipo de Análisis</div>
                       </div>
                       <div class="step-item" data-step="2">
                           <div class="step-number">2</div>
                           <div class="step-label">Fuente de Datos</div>
                       </div>
                       <div class="step-item" data-step="3">
                           <div class="step-number">3</div>
                           <div class="step-label">Configuración</div>
                       </div>
                       <div class="step-item" data-step="4">
                           <div class="step-number">4</div>
                           <div class="step-label">Revisión</div>
                       </div>
                   </div>

                   <!-- Step 1: Tipo de Análisis -->
                   <div class="wizard-content active" id="analysisStep1">
                       <div class="step-header">
                           <h3>📊 Selecciona el tipo de análisis</h3>
                           <p>Elige el tipo de análisis que mejor se adapte a tus necesidades</p>
                       </div>

                       <div class="analysis-types-grid">
                           <div class="analysis-type-card" data-type="descriptivo">
                               <div class="type-icon">📈</div>
                               <h4>Análisis Descriptivo</h4>
                               <p>Estadísticas básicas, tendencias y patrones en los datos</p>
                               <ul class="type-features">
                                   <li>• Medias, medianas, desviaciones</li>
                                   <li>• Gráficos de distribución</li>
                                   <li>• Resúmenes estadísticos</li>
                               </ul>
                               <div class="type-complexity">
                                   <span class="complexity-label">Complejidad:</span>
                                   <div class="complexity-bar">
                                       <div class="complexity-fill" style="width: 30%"></div>
                                   </div>
                                   <span class="complexity-text">Básica</span>
                               </div>
                           </div>

                           <div class="analysis-type-card" data-type="predictivo">
                               <div class="type-icon">🔮</div>
                               <h4>Análisis Predictivo</h4>
                               <p>Modelos de Machine Learning para predecir valores futuros</p>
                               <ul class="type-features">
                                   <li>• Modelos de regresión</li>
                                   <li>• Clasificación automática</li>
                                   <li>• Validación cruzada</li>
                               </ul>
                               <div class="type-complexity">
                                   <span class="complexity-label">Complejidad:</span>
                                   <div class="complexity-bar">
                                       <div class="complexity-fill" style="width: 80%"></div>
                                   </div>
                                   <span class="complexity-text">Avanzada</span>
                               </div>
                           </div>

                           <div class="analysis-type-card" data-type="comparativo">
                               <div class="type-icon">⚖️</div>
                               <h4>Análisis Comparativo</h4>
                               <p>Compara diferentes grupos, períodos o segmentos</p>
                               <ul class="type-features">
                                   <li>• Pruebas estadísticas</li>
                                   <li>• Comparaciones A/B</li>
                                   <li>• Análisis de varianza</li>
                               </ul>
                               <div class="type-complexity">
                                   <span class="complexity-label">Complejidad:</span>
                                   <div class="complexity-bar">
                                       <div class="complexity-fill" style="width: 60%"></div>
                                   </div>
                                   <span class="complexity-text">Intermedia</span>
                               </div>
                           </div>

                           <div class="analysis-type-card" data-type="tendencias">
                               <div class="type-icon">📉</div>
                               <h4>Análisis de Tendencias</h4>
                               <p>Identifica patrones temporales y proyecciones</p>
                               <ul class="type-features">
                                   <li>• Series temporales</li>
                                   <li>• Detección de estacionalidad</li>
                                   <li>• Proyecciones futuras</li>
                               </ul>
                               <div class="type-complexity">
                                   <span class="complexity-label">Complejidad:</span>
                                   <div class="complexity-bar">
                                       <div class="complexity-fill" style="width: 70%"></div>
                                   </div>
                                   <span class="complexity-text">Avanzada</span>
                               </div>
                           </div>

                           <div class="analysis-type-card" data-type="correlacion">
                               <div class="type-icon">🔗</div>
                               <h4>Análisis de Correlación</h4>
                               <p>Encuentra relaciones entre variables</p>
                               <ul class="type-features">
                                   <li>• Matrices de correlación</li>
                                   <li>• Análisis de dependencias</li>
                                   <li>• Mapas de calor</li>
                               </ul>
                               <div class="type-complexity">
                                   <span class="complexity-label">Complejidad:</span>
                                   <div class="complexity-bar">
                                       <div class="complexity-fill" style="width: 50%"></div>
                                   </div>
                                   <span class="complexity-text">Intermedia</span>
                               </div>
                           </div>

                           <div class="analysis-type-card" data-type="personalizado">
                               <div class="type-icon">🛠️</div>
                               <h4>Análisis Personalizado</h4>
                               <p>Configura tu propio análisis con parámetros específicos</p>
                               <ul class="type-features">
                                   <li>• Configuración flexible</li>
                                   <li>• Múltiples técnicas</li>
                                   <li>• Parámetros personalizados</li>
                               </ul>
                               <div class="type-complexity">
                                   <span class="complexity-label">Complejidad:</span>
                                   <div class="complexity-bar">
                                       <div class="complexity-fill" style="width: 90%"></div>
                                   </div>
                                   <span class="complexity-text">Experto</span>
                               </div>
                           </div>
                       </div>
                   </div>

                   <!-- Step 2: Fuente de Datos -->
                   <div class="wizard-content" id="analysisStep2">
                       <div class="step-header">
                           <h3>📁 Selecciona la fuente de datos</h3>
                           <p>Elige los datos que utilizarás para tu análisis</p>
                       </div>

                       <div class="data-source-options">
                           <div class="source-section">
                               <h4>🗃️ Datasets cargados recientemente</h4>
                               
                               <!-- Buscador de datasets -->
                               <div class="datasets-header">
                                   <div class="search-container">
                                       <input type="text" id="datasetSearch" placeholder="Buscar datasets..." class="search-input" onkeyup="searchDatasets()">
                                       <span class="search-icon">🔍</span>
                                   </div>
                                   <div class="results-info">
                                       <span id="datasetsCount">Mostrando datasets disponibles</span>
                                   </div>
                               </div>
                               
                               <!-- Grid de datasets -->
                               <div class="datasets-grid" id="availableDatasets">
                                   <!-- Se genera dinámicamente -->
                               </div>
                               
                               <!-- Paginación de datasets -->
                               <div class="datasets-pagination">
                                   <button class="pagination-btn" onclick="changeDatasetPage(-1)" id="datasetPrevBtn">‹</button>
                                   <div class="pagination-info">
                                       <span id="datasetPageInfo">Página 1 de 1</span>
                                   </div>
                                   <button class="pagination-btn" onclick="changeDatasetPage(1)" id="datasetNextBtn">›</button>
                               </div>
                           </div>

                           <div class="source-section">
                               <h4>🔗 Conexiones API activas</h4>
                               
                               <!-- Buscador de conexiones -->
                               <div class="connections-header">
                                   <div class="search-container">
                                       <input type="text" id="connectionSearch" placeholder="Buscar conexiones..." class="search-input" onkeyup="searchConnections()">
                                       <span class="search-icon">🔍</span>
                                   </div>
                                   <div class="results-info">
                                       <span id="connectionsCount">Mostrando conexiones activas</span>
                                   </div>
                               </div>
                               
                               <!-- Grid de conexiones -->
                               <div class="api-connections" id="activeConnections">
                                   <!-- Se genera dinámicamente -->
                               </div>
                               
                               <!-- Paginación de conexiones -->
                               <div class="connections-pagination">
                                   <button class="pagination-btn" onclick="changeConnectionPage(-1)" id="connectionPrevBtn">‹</button>
                                   <div class="pagination-info">
                                       <span id="connectionPageInfo">Página 1 de 1</span>
                                   </div>
                                   <button class="pagination-btn" onclick="changeConnectionPage(1)" id="connectionNextBtn">›</button>
                               </div>
                           </div>

                           <div class="source-section">
                               <h4>📤 Cargar nuevos datos</h4>
                               <div class="quick-upload">
                                   <button class="upload-option-btn" onclick="setActiveContent('cargar-datos')">
                                       <span class="upload-icon">📁</span>
                                       <span class="upload-text">Subir Archivo</span>
                                   </button>
                                   <button class="upload-option-btn" onclick="setActiveContent('cargar-datos')">
                                       <span class="upload-icon">🔗</span>
                                       <span class="upload-text">Conectar API</span>
                                   </button>
                               </div>
                           </div>
                       </div>
                   </div>

                   <!-- Step 3: Configuración -->
                   <div class="wizard-content" id="analysisStep3">
                       <div class="step-header">
                           <h3>⚙️ Configuración del análisis</h3>
                           <p>Personaliza los parámetros de tu análisis</p>
                       </div>

                       <div class="config-sections">
                           <div class="config-section">
                               <h4>📝 Información básica</h4>
                               <div class="form-grid">
                                   <div class="form-group">
                                       <label for="analysisName">Nombre del análisis</label>
                                       <input type="text" id="analysisName" placeholder="Ej: Análisis de ventas Q1 2024" class="form-input">
                                   </div>
                                   <div class="form-group">
                                       <label for="analysisDescription">Descripción</label>
                                       <textarea id="analysisDescription" placeholder="Describe el objetivo de este análisis..." class="form-textarea"></textarea>
                                   </div>
                                   <div class="form-group">
                                       <label for="analysisCategory">Categoría</label>
                                       <select id="analysisCategory" class="form-select">
                                           <option value="">Selecciona una categoría</option>
                                           <option value="ventas">Ventas</option>
                                           <option value="marketing">Marketing</option>
                                           <option value="finanzas">Finanzas</option>
                                           <option value="operaciones">Operaciones</option>
                                           <option value="rrhh">Recursos Humanos</option>
                                           <option value="otro">Otro</option>
                                       </select>
                                   </div>
                               </div>
                           </div>

                           <div class="config-section" id="analysisSpecificConfig">
                               <!-- Configuración específica según el tipo de análisis -->
                           </div>

                           <div class="config-section">
                               <h4>🤖 Configuración avanzada</h4>
                               <div class="advanced-options">
                                   <div class="option-group">
                                       <label class="checkbox-label">
                                           <input type="checkbox" id="autoML" checked>
                                           <span class="checkmark"></span>
                                           Usar AutoML para optimización automática
                                       </label>
                                       <small>El sistema seleccionará automáticamente los mejores algoritmos</small>
                                   </div>
                                   <div class="option-group">
                                       <label class="checkbox-label">
                                           <input type="checkbox" id="realTimeUpdate">
                                           <span class="checkmark"></span>
                                           Actualización en tiempo real
                                       </label>
                                       <small>El análisis se actualizará automáticamente con nuevos datos</small>
                                   </div>
                                   <div class="option-group">
                                       <label class="checkbox-label">
                                           <input type="checkbox" id="generateReport" checked>
                                           <span class="checkmark"></span>
                                           Generar reporte automático
                                       </label>
                                       <small>Se creará un reporte detallado al finalizar</small>
                                   </div>
                                   <div class="option-group">
                                       <label class="checkbox-label">
                                           <input type="checkbox" id="notifyCompletion" checked>
                                           <span class="checkmark"></span>
                                           Notificar al completar
                                       </label>
                                       <small>Recibirás una notificación cuando termine el análisis</small>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>

                   <!-- Step 4: Revisión -->
                   <div class="wizard-content" id="analysisStep4">
                       <div class="step-header">
                           <h3>✅ Revisión y confirmación</h3>
                           <p>Revisa la configuración antes de crear el análisis</p>
                       </div>

                       <div class="review-sections">
                           <div class="review-card">
                               <h4>📊 Tipo de análisis</h4>
                               <div class="review-content" id="reviewAnalysisType">
                                   <!-- Se llena dinámicamente -->
                               </div>
                           </div>

                           <div class="review-card">
                               <h4>📁 Fuente de datos</h4>
                               <div class="review-content" id="reviewDataSource">
                                   <!-- Se llena dinámicamente -->
                               </div>
                           </div>

                           <div class="review-card">
                               <h4>⚙️ Configuración</h4>
                               <div class="review-content" id="reviewConfiguration">
                                   <!-- Se llena dinámicamente -->
                               </div>
                           </div>

                           <div class="review-card">
                               <h4>🕒 Tiempo estimado</h4>
                               <div class="review-content">
                                   <div class="estimated-time">
                                       <span class="time-icon">⏱️</span>
                                       <span class="time-text" id="estimatedTime">5-10 minutos</span>
                                   </div>
                                   <small>El tiempo puede variar según el tamaño de los datos</small>
                               </div>
                           </div>
                       </div>
                   </div>

                   <!-- Navigation Buttons -->
                   <div class="wizard-navigation">
                       <button class="nav-btn secondary" id="prevStepBtn" onclick="previousAnalysisStep()" disabled>
                           ← Anterior
                       </button>
                       <button class="nav-btn primary" id="nextStepBtn" onclick="nextAnalysisStep()">
                           Siguiente →
                       </button>
                   </div>
               </div>
           </div>
       `
   };

   // Variables globales que no necesitan DOM
   const contentArea = document.querySelector('.content-area');
   const pageTitle = document.getElementById('pageTitle');
   const pageBreadcrumb = document.getElementById('pageBreadcrumb');
   const companyBreadcrumb = document.getElementById('companyBreadcrumb');
   const userRoleHeader = document.getElementById('userRoleHeader');

// Variable global para almacenar modelos entrenados
let trainedModels = [
    // Modelos de ejemplo pre-existentes
    {
        id: 'model_1',
        name: 'Predicción de Ventas Q4',
        algorithm: 'Random Forest',
        problemType: 'regression',
        accuracy: 94.8,
        icon: '📈',
        status: 'active',
        trainedDate: '2024-12-15'
    },
    {
        id: 'model_2',
        name: 'ROI Marketing',
        algorithm: 'Neural Network',
        problemType: 'regression',
        accuracy: 89.3,
        icon: '💰',
        status: 'available',
        trainedDate: '2024-12-10'
    },
    {
        id: 'model_3',
        name: 'Retención de Clientes',
        algorithm: 'Gradient Boosting',
        problemType: 'classification',
        accuracy: 92.1,
        icon: '👥',
        status: 'available',
        trainedDate: '2024-12-08'
    }
];

   // Funciones para modales (DEBEN IR ANTES DE renderContent)
window.openModal = function(modalId) {
    console.log('Abriendo modal:', modalId); // Para debug
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        console.log('Modal abierto exitosamente');
    } else {
        console.error('Modal no encontrado:', modalId);
    }
};

window.closeModal = function(modalId) {
    console.log('Cerrando modal:', modalId); // Para debug
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Limpiar formularios al cerrar
        if (modalId === 'modalCargarDatos') {
            resetUploadForm();
        } else if (modalId === 'modalNuevoAnalisis') {
            resetAnalysisForm();
        }
    }
};

// Variables para archivos
let selectedFiles = [];

// Variables para personalización
let currentCustomization = {
    name: 'TecnoCorp',
    subtitle: 'Admin Total',
    logo: 'TC',
    primary: '#4f7cff',
    secondary: '#3b5bdb',
    tertiary: '#6c8eff'
};

const colorPresets = {
    azul: {
        primary: '#4f7cff',
        secondary: '#3b5bdb',
        tertiary: '#6c8eff'
    },
    verde: {
        primary: '#059669',
        secondary: '#047857',
        tertiary: '#10b981'
    },
    morado: {
        primary: '#7c3aed',
        secondary: '#6d28d9',
        tertiary: '#8b5cf6'
    },
    naranja: {
        primary: '#ea580c',
        secondary: '#c2410c',
        tertiary: '#fb923c'
    },
    rojo: {
        primary: '#dc2626',
        secondary: '#b91c1c',
        tertiary: '#ef4444'
    }
};

// Función para toggle del panel de personalización
window.toggleCustomizePanel = function() {
    const panel = document.getElementById('customizePanel');
    const overlay = document.getElementById('customizeOverlay');
    
    const isActive = panel.classList.contains('active');
    
    if (isActive) {
        panel.classList.remove('active');
        overlay.classList.remove('active');
    } else {
        panel.classList.add('active');
        overlay.classList.add('active');
        loadCurrentValues();
    }
};

// Función para cargar valores actuales en el formulario
function loadCurrentValues() {
    document.getElementById('companyNameInput').value = currentCustomization.name;
    document.getElementById('companySubtitleInput').value = currentCustomization.subtitle;
    document.getElementById('companyLogoInput').value = currentCustomization.logo;
    
    document.getElementById('primaryColor').value = currentCustomization.primary;
    document.getElementById('primaryColorText').value = currentCustomization.primary;
    document.getElementById('secondaryColor').value = currentCustomization.secondary;
    document.getElementById('secondaryColorText').value = currentCustomization.secondary;
    document.getElementById('accentColor').value = currentCustomization.tertiary;
    document.getElementById('accentColorText').value = currentCustomization.tertiary;
    
    updatePreview();
}

// Función para aplicar paletas predefinidas
window.applyColorPreset = function(presetName) {
    // Remover clase active de todos los presets
    document.querySelectorAll('.color-preset').forEach(preset => {
        preset.classList.remove('active');
    });
    
    // Agregar clase active al preset seleccionado
    document.querySelector(`[data-preset="${presetName}"]`).classList.add('active');
    
    // Mostrar/ocultar sección de colores personalizados
    const customColors = document.getElementById('customColors');
    if (presetName === 'personalizado') {
        customColors.style.display = 'block';
    } else {
        customColors.style.display = 'none';
        
        // Aplicar colores del preset
        if (colorPresets[presetName]) {
            const colors = colorPresets[presetName];
            document.getElementById('primaryColor').value = colors.primary;
            document.getElementById('primaryColorText').value = colors.primary;
            document.getElementById('secondaryColor').value = colors.secondary;
            document.getElementById('secondaryColorText').value = colors.secondary;
            document.getElementById('accentColor').value = colors.tertiary;
            document.getElementById('accentColorText').value = colors.tertiary;
        }
    }
    
    updatePreview();
};

// Función para actualizar vista previa
function updatePreview() {
    const name = document.getElementById('companyNameInput').value;
    const subtitle = document.getElementById('companySubtitleInput').value;
    const logo = document.getElementById('companyLogoInput').value;
    const primary = document.getElementById('primaryColor').value;
    const secondary = document.getElementById('secondaryColor').value;
    const tertiary = document.getElementById('accentColor').value;
    
    // Actualizar vista previa en el panel
    document.getElementById('previewName').textContent = name;
    document.getElementById('previewSubtitle').textContent = subtitle;
    document.getElementById('previewLogo').textContent = logo;
    document.getElementById('previewLogo').style.background = primary;
    document.getElementById('previewBtn').style.background = primary;
    document.querySelector('.preview-card-header').style.background = primary;
    
    // Aplicar vista previa en tiempo real al sidebar header
    const sidebarHeader = document.querySelector('.sidebar-header');
    if (sidebarHeader) {
        sidebarHeader.style.background = `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`;
    }
}

// Función para sincronizar color pickers con inputs de texto
function setupColorInputSync() {
    const colorInputs = [
        { picker: 'primaryColor', text: 'primaryColorText' },
        { picker: 'secondaryColor', text: 'secondaryColorText' },
        { picker: 'accentColor', text: 'accentColorText' }
    ];
    
    colorInputs.forEach(({ picker, text }) => {
        const pickerEl = document.getElementById(picker);
        const textEl = document.getElementById(text);
        
        pickerEl.addEventListener('change', () => {
            textEl.value = pickerEl.value;
            updatePreview();
        });
        
        textEl.addEventListener('input', () => {
            if (/^#[0-9A-F]{6}$/i.test(textEl.value)) {
                pickerEl.value = textEl.value;
                updatePreview();
            }
        });
    });
}

// Función para manejar la carga de logo
window.handleLogoUpload = function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const logoUrl = e.target.result;
            
            // Mostrar vista previa en el formulario
            const previewImg = document.getElementById('logoPreviewImg');
            if (previewImg) {
                previewImg.src = logoUrl;
                previewImg.style.display = 'block';
            }
            
            // Actualizar el logo en el sidebar
            const companyLogo = document.getElementById('companyLogo');
            if (companyLogo) {
                // Reemplazar el contenido de texto con una imagen
                companyLogo.innerHTML = `<img src="${logoUrl}" alt="Logo" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
            }
            
            // Actualizar vista previa en el panel del formulario
            const previewLogo = document.getElementById('previewLogo');
            if (previewLogo) {
                previewLogo.innerHTML = `<img src="${logoUrl}" alt="Logo" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
            }
        };
        reader.readAsDataURL(file);
    }
};

// Función para restablecer personalización
window.resetCustomization = function() {
    const defaultConfig = companyConfigs.tecnocorp;
    
    document.getElementById('companyNameInput').value = defaultConfig.name;
    document.getElementById('companySubtitleInput').value = defaultConfig.subtitle;
    
    // Limpiar el campo de archivo de logo
    const logoInput = document.getElementById('companyLogoInput');
    if (logoInput) {
        logoInput.value = '';
    }
    
    // Ocultar vista previa de imagen
    const previewImg = document.getElementById('logoPreviewImg');
    if (previewImg) {
        previewImg.style.display = 'none';
        previewImg.src = '';
    }
    
    // Restaurar logo por defecto en sidebar
    const companyLogo = document.getElementById('companyLogo');
    if (companyLogo) {
        companyLogo.innerHTML = defaultConfig.logo;
    }
    
    // Restaurar logo por defecto en vista previa
    const previewLogo = document.getElementById('previewLogo');
    if (previewLogo) {
        previewLogo.innerHTML = defaultConfig.logo;
    }
    
    document.getElementById('primaryColor').value = defaultConfig.primary;
    document.getElementById('primaryColorText').value = defaultConfig.primary;
    document.getElementById('secondaryColor').value = defaultConfig.secondary;
    document.getElementById('secondaryColorText').value = defaultConfig.secondary;
    document.getElementById('accentColor').value = defaultConfig.tertiary;
    document.getElementById('accentColorText').value = defaultConfig.tertiary;
    
    // Seleccionar preset azul
    applyColorPreset('azul');
    updatePreview();
};

// Función para guardar personalización
window.saveCustomization = function() {
    const name = document.getElementById('companyNameInput').value.trim();
    const subtitle = document.getElementById('companySubtitleInput').value.trim();
    const logoInput = document.getElementById('companyLogoInput');
    const primary = document.getElementById('primaryColor').value;
    const secondary = document.getElementById('secondaryColor').value;
    const tertiary = document.getElementById('accentColor').value;
    
    // Validaciones básicas
    if (!name || !subtitle) {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
    }
    
    // Validar que se haya subido una imagen de logo
    if (!logoInput.files || logoInput.files.length === 0) {
        alert('Por favor, sube una imagen para el logo.');
        return;
    }
    
    // Validar que el archivo sea una imagen
    const file = logoInput.files[0];
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        alert('Por favor, sube un archivo de imagen válido (JPEG, PNG, GIF o WebP).');
        return;
    }
    
    // Actualizar configuración actual
    currentCustomization = {
        name,
        subtitle,
        logo: file.name, // Guardamos el nombre del archivo como referencia
        primary,
        secondary,
        tertiary
    };
    
    // Aplicar cambios al DOM con transición suave
    document.body.style.transition = 'all 0.5s ease';
    document.documentElement.style.setProperty('--primary-color', primary);
    document.documentElement.style.setProperty('--secondary-color', secondary);
    document.documentElement.style.setProperty('--tertiary-color', tertiary);
    
    // Actualizar elementos de la empresa
    document.getElementById('companyLogo').textContent = logo.toUpperCase();
    document.getElementById('companyName').textContent = name;
    document.getElementById('companySubtitle').textContent = subtitle;
    companyBreadcrumb.textContent = name;
    userRoleHeader.textContent = subtitle;
    
    // Actualizar título de página
    const currentPageTitle = pageTitle.textContent.split(' ')[0];
    pageTitle.textContent = `${currentPageTitle} ${name}`;
    
    // Guardar en localStorage
    localStorage.setItem('companyCustomization', JSON.stringify(currentCustomization));
    
    // Limpiar transición después de aplicar cambios
    setTimeout(() => {
        document.body.style.transition = '';
    }, 500);
    
    // Cerrar panel
    toggleCustomizePanel();
    
    // Mostrar confirmación
    setTimeout(() => {
        alert('✅ Personalización guardada exitosamente');
    }, 300);
};

// Función para cargar personalización desde localStorage
function loadSavedCustomization() {
    const saved = localStorage.getItem('companyCustomization');
    if (saved) {
        try {
            currentCustomization = JSON.parse(saved);
            
            // Aplicar configuración guardada
            document.documentElement.style.setProperty('--primary-color', currentCustomization.primary);
            document.documentElement.style.setProperty('--secondary-color', currentCustomization.secondary);
            document.documentElement.style.setProperty('--tertiary-color', currentCustomization.tertiary);
            
            // Manejar logo: distinguir entre imagen base64 y texto
            const companyLogoDiv = document.getElementById('companyLogo');
            if (currentCustomization.logo && currentCustomization.logo.startsWith('data:image/')) {
                // Es una imagen base64, crear elemento img
                companyLogoDiv.innerHTML = `<img src="${currentCustomization.logo}" alt="Logo" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
            } else if (currentCustomization.logo && !currentCustomization.logo.startsWith('data:image/')) {
                // Es texto (compatibilidad con versiones anteriores)
                companyLogoDiv.textContent = currentCustomization.logo;
            } else {
                // No hay logo, mostrar placeholder
                companyLogoDiv.innerHTML = `<div style="width: 100%; height: 100%; border-radius: 50%; background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #999; font-size: 12px; border: 2px dashed #ddd;">Sin Logo</div>`;
            }
            
            document.getElementById('companyName').textContent = currentCustomization.name;
            document.getElementById('companySubtitle').textContent = currentCustomization.subtitle;
            companyBreadcrumb.textContent = currentCustomization.name;
            userRoleHeader.textContent = currentCustomization.subtitle;
        } catch (e) {
            console.error('Error loading customization:', e);
        }
    }
}

   // Función para renderizar contenido
   function renderContent(contentId) {
       console.log('Renderizando contenido para:', contentId);
       console.log('Contenido encontrado:', !!dashboardContent[contentId]);
       console.log('Longitud del contenido:', dashboardContent[contentId]?.length);
       
       // Mapeo de títulos
       const titleMap = {
           'dashboard': 'Dashboard',
           'cargar-datos': 'Cargar Datos',
           'nuevo-analisis': 'Nuevo Análisis',
           'analisis': 'Análisis',
           'ia-predictiva': 'IA Predictiva',
           'gestion-datos': 'Gestión de Datos',
           'conexiones-api': 'Conexiones API',
           'etl-procesos': 'ETL Procesos',
           'informes': 'Informes',
           'dashboards': 'Dashboards',
           'exportar': 'Exportar',
           'formulario': 'Formulario',
           'usuarios': 'Usuarios',
           'roles-permisos': 'Roles y Permisos',
           'configuracion': 'Configuración'
       };

       const title = titleMap[contentId] || 'Página';
       const companyName = currentCustomization.name;
       
       // Actualizar título y breadcrumb
       pageTitle.textContent = `${title} ${companyName}`;
       pageBreadcrumb.textContent = title;

       // Renderizar contenido
       try {
           if (dashboardContent[contentId]) {
               console.log('Insertando contenido en contentArea:', contentArea);
               console.log('Contenido completo para', contentId, ':', dashboardContent[contentId].substring(0, 200) + '...');
               
               contentArea.innerHTML = `<div class="content-section active">${dashboardContent[contentId]}</div>`;
               console.log('Contenido insertado. contentArea.innerHTML.length:', contentArea.innerHTML.length);
               
               // Activar solo la vista principal de cada módulo
               setTimeout(() => {
                   if (contentId === 'gestion-datos') {
                       // Solo activar la vista principal del dashboard
                       const dashboardView = contentArea.querySelector('#gestionDashboard');
                       if (dashboardView) {
                           dashboardView.classList.add('active');
                           console.log('Activando vista principal de Gestión de Datos');
                       }
                   } else if (contentId === 'conexiones-api') {
                       // Solo activar la vista principal del dashboard de API
                       const apiDashboardView = contentArea.querySelector('#apiDashboard');
                       if (apiDashboardView) {
                           apiDashboardView.classList.add('active');
                           console.log('Activando vista principal de Conexiones API');
                       }
                   } else {
                       // Para otros módulos, activar todas las vistas como antes
                       const viewContainers = contentArea.querySelectorAll('.etl-view');
                       viewContainers.forEach(container => {
                           container.classList.add('active');
                           console.log('Activando vista:', container.className);
                       });
                   }
               }, 10);
               
               // Debugging CSS styles
               const contentSection = contentArea.querySelector('.content-section');
               if (contentSection) {
                   const styles = window.getComputedStyle(contentSection);
                   console.log('CSS Debug - display:', styles.display);
                   console.log('CSS Debug - visibility:', styles.visibility);
                   console.log('CSS Debug - opacity:', styles.opacity);
                   console.log('CSS Debug - height:', styles.height);
                   console.log('CSS Debug - overflow:', styles.overflow);
                   console.log('CSS Debug - classes:', contentSection.className);
                   
                   // Verificar si hay contenido visible dentro
                   console.log('contentSection.children.length:', contentSection.children.length);
                   console.log('contentSection.textContent.length:', contentSection.textContent.length);
                   
                   // Forzar visibilidad temporalmente
                   setTimeout(() => {
                       console.log('Forzando visibilidad...');
                       contentSection.style.opacity = '1';
                       contentSection.style.display = 'block';
                       contentSection.style.visibility = 'visible';
                       console.log('Visibilidad forzada aplicada');
                   }, 100);
               } else {
                   console.log('CSS Debug - contentSection not found!');
               }
           } else {
               contentArea.innerHTML = `
                   <div class="content-section active">
                       <div class="dashboard-header">
                           <h2 class="dashboard-title">${title}</h2>
                           <div class="quick-actions">
                               <button class="quick-action-btn">
                                   <span>⚙️</span>
                                   Configurar
                               </button>
                           </div>
                       </div>
                       
                       <div class="chart-container">
                           <div class="chart-header">
                               <h3 class="chart-title">Próximamente</h3>
                           </div>
                           <div class="chart-placeholder">
                               🚧 Esta funcionalidad estará disponible pronto
                           </div>
                       </div>
                   </div>
               `;
           }
       } catch (error) {
           console.error('Error al renderizar contenido:', error);
           contentArea.innerHTML = `<div class="content-section active"><p>Error al cargar el contenido: ${error.message}</p></div>`;
       }

       // Agregar event listeners para botones de filtro si existen
       const filterBtns = document.querySelectorAll('.filter-btn');
       filterBtns.forEach(btn => {
           btn.addEventListener('click', function() {
               filterBtns.forEach(b => b.classList.remove('active'));
               this.classList.add('active');
           });
       });

       // Agregar event listeners para botones de acción
       const actionBtns = document.querySelectorAll('[data-action]');
       actionBtns.forEach(btn => {
           btn.addEventListener('click', function(e) {
               e.preventDefault();
               e.stopPropagation();
               const action = this.getAttribute('data-action');
               setActiveContent(action);
           });
       });

       // Configurar funcionalidad específica según el contenido
       if (contentId === 'cargar-datos') {
           setupDataUploadPage();
       } else if (contentId === 'nuevo-analisis') {
           setupAnalysisWizard();
       } else if (contentId === 'dashboard') {
           setupActivityTable();
           // Inicializar gráficos del dashboard
           setTimeout(() => {
               updateAnalysisSelectors();
           }, 100);
       } else if (contentId === 'ia-predictiva') {
           // Inicializar gráficos de IA Predictiva
           setTimeout(() => {
               updateMLPerformanceChart();
               updatePredictionsChart();
           }, 100);
       } else if (contentId === 'analisis') {
           // Inicializar gráfico de categorías
           setTimeout(() => {
               updateCategoryChart();
           }, 100);
       } else if (contentId === 'gestion-datos') {
           // Configurar módulo de Gestión de Datos
           setTimeout(() => {
               // Asegurar que solo la vista principal esté activa
               showGestionDashboard();
           }, 100);
       } else if (contentId === 'conexiones-api') {
           // Configurar módulo de Conexiones API
           setTimeout(() => {
               // Asegurar que solo la vista principal esté activa
               showApiDashboard();
           }, 100);
       }
   }

   // Función para toggle del sidebar móvil
   window.toggleSidebar = function() {
       const sidebar = document.getElementById('sidebar');
       sidebar.classList.toggle('open');
   };

   // Función para navegación directa
   window.setActiveContent = function(contentId) {
       // Encontrar y activar el item del menú correspondiente
       const targetItem = document.querySelector(`[data-content="${contentId}"]`);
       if (targetItem) {
           const allMenuItems = document.querySelectorAll('.sidebar-item');
           allMenuItems.forEach(i => i.classList.remove('active'));
           targetItem.classList.add('active');
           renderContent(contentId);
       } else {
           // Si no hay item en el menú, renderizar directamente
           renderContent(contentId);
       }
   };

   // Función para mostrar selector de empresa
   window.showCompanySelector = function() {
       alert('🏢 Selector de empresa - Funcionalidad para cambiar entre empresas disponibles');
   };

   // Función para mostrar notificaciones
   window.showNotifications = function() {
       alert('🔔 Notificaciones:\n\n• Nuevo archivo procesado\n• Modelo IA actualizado\n• Reporte mensual listo');
   };

   // Función para toggle del menú de usuario
   window.toggleUserMenu = function() {
       const userDropdown = document.getElementById('userDropdown');
       const userMenu = document.querySelector('.user-menu');
       
       userDropdown.classList.toggle('show');
       userMenu.classList.toggle('open');
   };

   // Funciones del dropdown de usuario
   window.editProfile = function() {
       alert('👤 Editar Perfil - Configuración de datos personales');
       document.getElementById('userDropdown').classList.remove('show');
   };

   window.accountSettings = function() {
       alert('⚙️ Configuración de Cuenta - Preferencias y configuración');
       document.getElementById('userDropdown').classList.remove('show');
   };

   window.helpSupport = function() {
       alert('❓ Ayuda y Soporte - Centro de ayuda y documentación');
       document.getElementById('userDropdown').classList.remove('show');
   };

   window.logout = function() {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
        // Limpiar datos de sesión
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('companyCustomization');
        
        // Redireccionar al login
        window.location.href = 'login.html';
    }
    document.getElementById('userDropdown').classList.remove('show');
};

   // Cerrar dropdown al hacer clic fuera
   document.addEventListener('click', function(event) {
    const userDropdown = document.getElementById('userDropdown');
    const userMenu = document.querySelector('.user-menu');
    const sidebar = document.getElementById('sidebar');
    const toggle = document.querySelector('.mobile-menu-toggle');
    const companyDropdown = document.getElementById('companyDropdownMenu');
    const companyBtn = document.querySelector('.company-dropdown-btn');
    
    // Cerrar dropdown de usuario
    if (userMenu && userDropdown && !userMenu.contains(event.target) && !userDropdown.contains(event.target)) {
        userDropdown.classList.remove('show');
        userMenu.classList.remove('open');
    }
    
    // Cerrar dropdown de empresa (solo si existen)
    if (companyBtn && companyDropdown && !companyBtn.contains(event.target) && !companyDropdown.contains(event.target)) {
        companyDropdown.classList.remove('show');
        companyBtn.classList.remove('open');
    }
    
    // Cerrar sidebar en móvil
    if (sidebar && toggle && window.innerWidth <= 768 && 
        !sidebar.contains(event.target) && 
        !toggle.contains(event.target) &&
        sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
    }
});

   // Efecto de carga inicial
   setTimeout(() => {
       document.body.style.opacity = '1';
   }, 100);

   // Responsive: Ajustar comportamiento según tamaño de pantalla
   window.addEventListener('resize', function() {
       if (window.innerWidth > 768) {
           const sidebar = document.getElementById('sidebar');
           sidebar.classList.remove('open');
       }
   });
    
    // Funciones para modales







function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
}

function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    addFiles(files);
}

function addFiles(files) {
    const validFiles = files.filter(file => {
        const validTypes = ['.csv', '.xlsx', '.json'];
        const extension = '.' + file.name.split('.').pop().toLowerCase();
        const validSize = file.size <= 10 * 1024 * 1024; // 10MB
        
        if (!validTypes.includes(extension)) {
            alert(`Archivo ${file.name} no es válido. Solo se permiten CSV, XLSX, JSON.`);
            return false;
        }
        
        if (!validSize) {
            alert(`Archivo ${file.name} es muy grande. Máximo 10MB.`);
            return false;
        }
        
        return true;
    });
    
    selectedFiles = [...selectedFiles, ...validFiles];
    updateFileList();
    updateUploadButton();
}

function updateFileList() {
    const fileList = document.getElementById('fileList');
    
    fileList.innerHTML = selectedFiles.map((file, index) => `
        <div class="file-item">
            <div class="file-info">
                <div class="file-icon">${getFileIcon(file.name)}</div>
                <div class="file-details">
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${formatFileSize(file.size)}</div>
                </div>
            </div>
            <button class="file-remove" onclick="removeFile(${index})">🗑️</button>
        </div>
    `).join('');
}

function removeFile(index) {
    selectedFiles.splice(index, 1);
    updateFileList();
    updateUploadButton();
}

function updateUploadButton() {
    const uploadBtn = document.getElementById('uploadBtn');
    uploadBtn.disabled = selectedFiles.length === 0;
}

// Funciones para el wizard de análisis principal
let currentStepMain = 1;
const totalStepsMain = 4;

window.nextStepMain = function() {
    if (currentStepMain < totalStepsMain) {
        // Ocultar paso actual
        document.getElementById(`wizardStep${currentStepMain}`).classList.remove('active');
        document.querySelector(`[data-step="${currentStepMain}"]`).classList.remove('active');
        
        // Mostrar siguiente paso
        currentStepMain++;
        document.getElementById(`wizardStep${currentStepMain}`).classList.add('active');
        document.querySelector(`[data-step="${currentStepMain}"]`).classList.add('active');
        
        // Actualizar botones
        document.getElementById('prevStepBtn').disabled = false;
        if (currentStepMain === totalStepsMain) {
            document.getElementById('nextStepBtn').innerHTML = '<span>Crear Análisis</span>';
        }
    } else {
        // Crear análisis
        createAnalysisMain();
    }
};

window.previousStepMain = function() {
    if (currentStepMain > 1) {
        // Ocultar paso actual
        document.getElementById(`wizardStep${currentStepMain}`).classList.remove('active');
        document.querySelector(`[data-step="${currentStepMain}"]`).classList.remove('active');
        
        // Mostrar paso anterior
        currentStepMain--;
        document.getElementById(`wizardStep${currentStepMain}`).classList.add('active');
        document.querySelector(`[data-step="${currentStepMain}"]`).classList.add('active');
        
        // Actualizar botones
        if (currentStepMain === 1) {
            document.getElementById('prevStepBtn').disabled = true;
        }
        document.getElementById('nextStepBtn').innerHTML = '<span>Siguiente →</span>';
    }
};

window.applyTemplate = function(templateType) {
    const templates = {
        'ventas': {
            name: 'Análisis de Ventas Q1 2024',
            description: 'Análisis detallado del rendimiento de ventas durante el primer trimestre',
            category: 'ventas'
        },
        'marketing': {
            name: 'ROI Campañas Marketing',
            description: 'Evaluación del retorno de inversión de las campañas de marketing',
            category: 'marketing'
        },
        'financiero': {
            name: 'Análisis Financiero Trimestral',
            description: 'Revisión completa del estado financiero y flujo de caja',
            category: 'finanzas'
        }
    };
    
    const template = templates[templateType];
    if (template) {
        document.getElementById('analysisNameMain').value = template.name;
        document.getElementById('analysisDescMain').value = template.description;
        document.getElementById('analysisCatMain').value = template.category;
    }
};

function createAnalysisMain() {
    const name = document.getElementById('analysisNameMain').value;
    const description = document.getElementById('analysisDescMain').value;
    const category = document.getElementById('analysisCatMain').value;
    
    if (!name || !category) {
        alert('Por favor, completa al menos el nombre y la categoría del análisis.');
        return;
    }
    
    // Agregar análisis al dashboard
    const analysisData = {
        name: name,
        description: description,
        category: category,
        type: 'descriptivo', // Tipo por defecto
        dataSource: 'archivo' // Fuente por defecto
    };
    
    addAnalysisToUser(analysisData);
    
    alert('✅ Análisis creado exitosamente: ' + name + '\n\nYa puedes visualizar los gráficos en el Dashboard.');
    renderContent('dashboard');
}

function uploadFiles() {
    if (selectedFiles.length === 0) return;
    
    const progressContainer = document.getElementById('uploadProgress');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    progressContainer.style.display = 'block';
    document.getElementById('uploadBtn').disabled = true;
    
    // Simular carga de archivos
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            progressFill.style.width = '100%';
            progressText.textContent = '¡Carga completada!';
            
            setTimeout(() => {
                alert('✅ Archivos cargados exitosamente!\n\n' + 
                      selectedFiles.map(f => `• ${f.name}`).join('\n'));
                closeModal('modalCargarDatos');
            }, 1000);
        } else {
            progressFill.style.width = progress + '%';
            progressText.textContent = `Cargando... ${Math.round(progress)}%`;
        }
    }, 200);
}

function resetUploadForm() {
    selectedFiles = [];
    document.getElementById('fileList').innerHTML = '';
    document.getElementById('uploadProgress').style.display = 'none';
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('uploadBtn').disabled = true;
    
    const fileInput = document.getElementById('fileInput');
    if (fileInput) fileInput.value = '';
}

// Funciones para nuevo análisis
function updateAnalysisPreview() {
    const type = document.getElementById('analysisType').value;
    const preview = document.getElementById('analysisPreview');
    
    const previews = {
        'descriptivo': 'Análisis estadístico básico: medias, medianas, desviaciones. Gráficos de distribución y resúmenes.',
        'predictivo': 'Modelos de Machine Learning para predicir valores futuros. Incluye validación y métricas de precisión.',
        'comparativo': 'Comparación entre diferentes grupos o períodos. Pruebas estadísticas y visualizaciones comparativas.',
        'tendencias': 'Análisis temporal para identificar patrones y tendencias. Proyecciones y estacionalidad.',
        'correlacion': 'Análisis de relaciones entre variables. Matrices de correlación y análisis de dependencias.'
    };
    
    preview.textContent = type ? previews[type] : 'Selecciona un tipo de análisis para ver la configuración';
}

function createAnalysis() {
    const name = document.getElementById('analysisName').value;
    const type = document.getElementById('analysisType').value;
    const source = document.getElementById('dataSource').value;
    
    if (!name || !type || !source) {
        alert('⚠️ Por favor completa todos los campos obligatorios');
        return;
    }
    
    const config = {
        autoML: document.getElementById('autoML').checked,
        realTime: document.getElementById('realTime').checked,
        notifications: document.getElementById('notifications').checked
    };
    
    // Simular creación de análisis
    setTimeout(() => {
        alert(`✅ Análisis "${name}" creado exitosamente!\n\n` +
              `Tipo: ${type}\n` +
              `Fuente: ${source}\n` +
              `Configuración: ${Object.entries(config).filter(([,v]) => v).map(([k]) => k).join(', ')}`);
        closeModal('modalNuevoAnalisis');
    }, 1000);
}

function resetAnalysisForm() {
    document.getElementById('analysisName').value = '';
    document.getElementById('analysisType').value = '';
    document.getElementById('dataSource').value = '';
    document.getElementById('autoML').checked = true;
    document.getElementById('realTime').checked = false;
    document.getElementById('notifications').checked = false;
    updateAnalysisPreview();
    }
    

// Funciones para modal de plantillas
window.filterTemplates = function() {
    const searchTerm = document.getElementById('templateSearch').value.toLowerCase();
    console.log('Filtrando plantillas por:', searchTerm);
};

window.filterByCategory = function(category) {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    console.log('Filtrando por categoría:', category);
    loadTemplates(category);
};

window.useSelectedTemplate = function() {
    alert('✅ Plantilla seleccionada y aplicada correctamente!');
    closeModal('modalPlantillas');
};

function loadTemplates(category = 'all') {
    const templatesGrid = document.getElementById('templatesGrid');
    const templates = [
        {
            title: 'Análisis de Ventas',
            category: 'ventas',
            icon: '📊',
            description: 'Análisis completo de ventas con métricas clave',
            usage: '156 usos'
        },
        {
            title: 'ROI Marketing',
            category: 'marketing',
            icon: '📈',
            description: 'Retorno de inversión en campañas de marketing',
            usage: '89 usos'
        },
        {
            title: 'Flujo de Caja',
            category: 'finanzas',
            icon: '💰',
            description: 'Análisis de flujo de caja y proyecciones',
            usage: '234 usos'
        }
    ];
    
    const filtered = category === 'all' ? templates : templates.filter(t => t.category === category);
    
    templatesGrid.innerHTML = filtered.map(template => `
        <div class="template-card" onclick="selectTemplate(this)">
            <div class="template-header">
                <span class="template-icon">${template.icon}</span>
                <span class="template-title">${template.title}</span>
                <span class="template-category">${template.category}</span>
            </div>
            <div class="template-description">${template.description}</div>
            <div class="template-meta">
                <span class="template-usage">👥 ${template.usage}</span>
            </div>
        </div>
    `).join('');
}

window.selectTemplate = function(element) {
    document.querySelectorAll('.template-card').forEach(card => {
        card.classList.remove('selected');
    });
    element.classList.add('selected');
    document.getElementById('useTemplateBtn').disabled = false;
};

// Funciones para análisis avanzado
let currentStep = 1;
const totalSteps = 4;

window.nextStep = function() {
    if (currentStep < totalSteps) {
        document.getElementById(`step${currentStep}`).classList.remove('active');
        currentStep++;
        document.getElementById(`step${currentStep}`).classList.add('active');
        updateStepIndicators();
        updateNavigationButtons();
    } else {
        createAdvancedAnalysis();
    }
};

window.previousStep = function() {
    if (currentStep > 1) {
        document.getElementById(`step${currentStep}`).classList.remove('active');
        currentStep--;
        document.getElementById(`step${currentStep}`).classList.add('active');
        updateStepIndicators();
        updateNavigationButtons();
    }
};

function updateStepIndicators() {
    document.querySelectorAll('.step-dot').forEach((dot, index) => {
        if (index < currentStep) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = currentStep === 1;
    nextBtn.textContent = currentStep === totalSteps ? 'Crear Análisis' : 'Siguiente';
}

window.toggleDataSource = function(element) {
    const checkbox = element.querySelector('.source-checkbox');
    checkbox.checked = !checkbox.checked;
    element.classList.toggle('selected', checkbox.checked);
};

window.toggleAnalysisType = function(element, type) {
    const checkbox = element.querySelector('.type-checkbox');
    checkbox.checked = !checkbox.checked;
    element.classList.toggle('selected', checkbox.checked);
};

function createAdvancedAnalysis() {
    const name = document.getElementById('advancedAnalysisName').value;
    if (!name) {
        alert('Por favor ingresa un nombre para el análisis');
        return;
    }
    
    alert(`✅ Análisis avanzado "${name}" creado exitosamente!`);
    closeModal('modalAnalisisAvanzado');
    resetAdvancedForm();
}

function resetAdvancedForm() {
    currentStep = 1;
    document.querySelectorAll('.wizard-step').forEach(step => step.classList.remove('active'));
    document.getElementById('step1').classList.add('active');
    updateStepIndicators();
    updateNavigationButtons();
}

// Inicializar plantillas cuando se abre el modal
const modalPlantillas = document.getElementById('modalPlantillas');
if (modalPlantillas) {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                if (modalPlantillas.style.display === 'flex') {
                    loadTemplates();
                }
            }
        });
    });
    observer.observe(modalPlantillas, { attributes: true });
}

// Inicializar funciones de personalización
setupColorInputSync();

// Inicializar placeholder de logo si no hay configuración guardada
const companyLogoDiv = document.getElementById('companyLogo');
if (companyLogoDiv && !localStorage.getItem('companyCustomization')) {
    companyLogoDiv.innerHTML = `<div style="width: 100%; height: 100%; border-radius: 50%; background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #999; font-size: 12px; border: 2px dashed #ddd;">Sin Logo</div>`;
}

loadSavedCustomization();

// Funciones para gráficos del dashboard
function updateAnalysisSelectors() {
    const trendsSelect = document.getElementById('trendsAnalysisSelect');
    const distributionSelect = document.getElementById('distributionAnalysisSelect');
    
    if (trendsSelect && distributionSelect) {
        // Limpiar opciones existentes (mantener la primera opción)
        trendsSelect.innerHTML = '<option value="">Seleccionar análisis...</option>';
        distributionSelect.innerHTML = '<option value="">Seleccionar análisis...</option>';
        
        // Agregar análisis del usuario
        userAnalyses.forEach(analysis => {
            const option1 = new Option(`${analysis.name} (${analysis.category})`, analysis.id);
            const option2 = new Option(`${analysis.name} (${analysis.category})`, analysis.id);
            trendsSelect.add(option1);
            distributionSelect.add(option2);
        });
    }
}

window.updateTrendsChart = function() {
    const selectedId = document.getElementById('trendsAnalysisSelect')?.value;
    const canvas = document.getElementById('trendsChart');
    const placeholder = document.getElementById('trendsPlaceholder');
    
    if (!selectedId) {
        canvas.style.display = 'none';
        placeholder.style.display = 'flex';
        return;
    }
    
    const analysis = userAnalyses.find(a => a.id === selectedId);
    if (analysis) {
        canvas.style.display = 'block';
        placeholder.style.display = 'none';
        drawTrendsChart(canvas, analysis);
    }
};

window.updateDistributionChart = function() {
    const selectedId = document.getElementById('distributionAnalysisSelect')?.value;
    const canvas = document.getElementById('distributionChart');
    const placeholder = document.getElementById('distributionPlaceholder');
    
    if (!selectedId) {
        canvas.style.display = 'none';
        placeholder.style.display = 'flex';
        return;
    }
    
    const analysis = userAnalyses.find(a => a.id === selectedId);
    if (analysis) {
        canvas.style.display = 'block';
        placeholder.style.display = 'none';
        drawDistributionChart(canvas, analysis);
    }
};

window.updateTrendsFilter = function(period) {
    // Actualizar botones activos
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Re-dibujar gráfico con nuevo período
    const selectedId = document.getElementById('trendsAnalysisSelect')?.value;
    if (selectedId) {
        const analysis = userAnalyses.find(a => a.id === selectedId);
        const canvas = document.getElementById('trendsChart');
        if (analysis && canvas) {
            drawTrendsChart(canvas, analysis, period);
        }
    }
};

function drawTrendsChart(canvas, analysis, period = '7D') {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Limpiar canvas
    ctx.clearRect(0, 0, width, height);
    
    // Configurar dimensiones mejoradas según el período
    const isLongPeriod = period === '90D';
    const padding = {
        top: 50,
        right: 40,
        bottom: isLongPeriod ? 80 : 70,
        left: 70
    };
    
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    
    // Generar datos según categoría y período
    const dataPoints = generateTrendsData(analysis.category, period);
    const maxValue = Math.max(...dataPoints);
    const minValue = Math.min(...dataPoints);
    const range = maxValue - minValue || 1;
    
    // 1. FONDO DEL ÁREA DEL GRÁFICO
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(padding.left, padding.top, chartWidth, chartHeight);
    
    // 2. GRID HORIZONTAL
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    const gridLines = 6;
    
    for (let i = 0; i <= gridLines; i++) {
        const y = padding.top + (chartHeight / gridLines) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
        
        // Etiquetas del eje Y
        const value = Math.round(maxValue - (range / gridLines) * i);
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px system-ui';
        ctx.textAlign = 'right';
        ctx.fillText(value.toString(), padding.left - 10, y + 4);
    }
    
    // 3. GRID VERTICAL (adaptativo según período)
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    
    const maxGridLines = isLongPeriod ? 12 : dataPoints.length;
    const gridStep = Math.ceil(dataPoints.length / maxGridLines);
    
    for (let i = 0; i < dataPoints.length; i += gridStep) {
        const x = padding.left + (i * chartWidth / (dataPoints.length - 1));
        ctx.beginPath();
        ctx.moveTo(x, padding.top);
        ctx.lineTo(x, height - padding.bottom);
        ctx.stroke();
    }
    
    // 4. ÁREA BAJO LA CURVA (gradiente)
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    const color = getAnalysisColor(analysis.category);
    gradient.addColorStop(0, color + '40');
    gradient.addColorStop(1, color + '08');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    
    // Comenzar desde la línea base
    ctx.moveTo(padding.left, height - padding.bottom);
    
    dataPoints.forEach((value, index) => {
        const x = padding.left + (index * chartWidth / (dataPoints.length - 1));
        const y = padding.top + chartHeight - ((value - minValue) / range * chartHeight);
        ctx.lineTo(x, y);
    });
    
    // Cerrar el área
    ctx.lineTo(padding.left + chartWidth, height - padding.bottom);
    ctx.closePath();
    ctx.fill();
    
    // 5. LÍNEA DE TENDENCIA PRINCIPAL
    ctx.strokeStyle = color;
    ctx.lineWidth = isLongPeriod ? 2 : 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    
    dataPoints.forEach((value, index) => {
        const x = padding.left + (index * chartWidth / (dataPoints.length - 1));
        const y = padding.top + chartHeight - ((value - minValue) / range * chartHeight);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // 6. PUNTOS DE DATOS (optimizado para períodos largos)
    const showAllPoints = dataPoints.length <= 30;
    const pointStep = showAllPoints ? 1 : Math.ceil(dataPoints.length / 20);
    
    dataPoints.forEach((value, index) => {
        // Solo mostrar algunos puntos si hay muchos datos
        if (!showAllPoints && index % pointStep !== 0 && index !== dataPoints.length - 1) return;
        
        const x = padding.left + (index * chartWidth / (dataPoints.length - 1));
        const y = padding.top + chartHeight - ((value - minValue) / range * chartHeight);
        
        const pointSize = isLongPeriod ? 3 : 4;
        const shadowSize = isLongPeriod ? 5 : 6;
        
        // Punto exterior (sombra)
        ctx.beginPath();
        ctx.arc(x, y, shadowSize, 0, 2 * Math.PI);
        ctx.fillStyle = color + '30';
        ctx.fill();
        
        // Punto interior
        ctx.beginPath();
        ctx.arc(x, y, pointSize, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
    });
    
    // 7. VALORES SOBRE PUNTOS (solo para períodos cortos o puntos clave)
    if (period !== '90D') {
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 10px system-ui';
        ctx.textAlign = 'center';
        
        dataPoints.forEach((value, index) => {
            if (!showAllPoints && index % pointStep !== 0 && index !== dataPoints.length - 1) return;
            
            const x = padding.left + (index * chartWidth / (dataPoints.length - 1));
            const y = padding.top + chartHeight - ((value - minValue) / range * chartHeight);
            
            ctx.fillText(value.toString(), x, y - 15);
        });
    }
    
    // 8. EJES PRINCIPALES
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    
    // Eje Y
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, height - padding.bottom);
    ctx.stroke();
    
    // Eje X
    ctx.beginPath();
    ctx.moveTo(padding.left, height - padding.bottom);
    ctx.lineTo(width - padding.right, height - padding.bottom);
    ctx.stroke();
    
    // 9. ETIQUETAS DEL EJE X (optimizadas)
    ctx.fillStyle = '#6b7280';
    ctx.font = '11px system-ui';
    ctx.textAlign = 'center';
    
    const labelStep = isLongPeriod ? Math.ceil(dataPoints.length / 10) : 
                     period === '30D' ? Math.ceil(dataPoints.length / 6) : 1;
    
    for (let i = 0; i < dataPoints.length; i += labelStep) {
        const x = padding.left + (i * chartWidth / (dataPoints.length - 1));
        const label = getPeriodLabel(i, period, dataPoints.length);
        ctx.fillText(label, x, height - padding.bottom + 25);
    }
    
    // Siempre mostrar la última etiqueta
    if (dataPoints.length > 1) {
        const lastIndex = dataPoints.length - 1;
        const x = padding.left + (lastIndex * chartWidth / (dataPoints.length - 1));
        const label = getPeriodLabel(lastIndex, period, dataPoints.length);
        ctx.fillText(label, x, height - padding.bottom + 25);
    }
    
    // 10. TÍTULO DEL GRÁFICO
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 18px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(`${analysis.name}`, width / 2, 25);
    
    // 11. SUBTÍTULO CON PERÍODO
    ctx.fillStyle = '#6b7280';
    ctx.font = '13px system-ui';
    ctx.textAlign = 'center';
    const periodText = period === '7D' ? 'Últimos 7 días' : 
                      period === '30D' ? 'Últimos 30 días' : 'Últimos 90 días';
    ctx.fillText(periodText, width / 2, 42);
    
    // 12. ETIQUETAS DE EJES
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px system-ui';
    
    // Etiqueta eje Y
    ctx.save();
    ctx.translate(25, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText('Valores', 0, 0);
    ctx.restore();
    
    // Etiqueta eje X
    ctx.textAlign = 'center';
    ctx.fillText('Período de Tiempo', width / 2, height - 15);
    
    // 13. ESTADÍSTICAS EN ESQUINA (mejoradas)
    const avgValue = Math.round(dataPoints.reduce((a, b) => a + b, 0) / dataPoints.length);
    const trend = dataPoints[dataPoints.length - 1] > dataPoints[0] ? '↗️' : '↘️';
    const change = Math.abs(dataPoints[dataPoints.length - 1] - dataPoints[0]);
    const changePercent = ((change / dataPoints[0]) * 100).toFixed(1);
    
    const statsWidth = 140;
    const statsHeight = 55;
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.fillRect(width - statsWidth - 15, padding.top + 10, statsWidth, statsHeight);
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.strokeRect(width - statsWidth - 15, padding.top + 10, statsWidth, statsHeight);
    
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 11px system-ui';
    ctx.textAlign = 'left';
    ctx.fillText(`Promedio: ${avgValue}`, width - statsWidth - 8, padding.top + 25);
    ctx.fillText(`Tendencia: ${trend}`, width - statsWidth - 8, padding.top + 40);
    ctx.fillText(`Cambio: ${changePercent}%`, width - statsWidth - 8, padding.top + 55);
}

function drawDistributionChart(canvas, analysis) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Generar datos de distribución según categoría
    const distributionData = generateDistributionData(analysis.category);
    const total = distributionData.reduce((sum, item) => sum + item.value, 0);
    
    // Configurar centro y radio
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    let currentAngle = -Math.PI / 2; // Empezar desde arriba
    
    // Dibujar segmentos del gráfico de pastel
    distributionData.forEach((item, index) => {
        const sliceAngle = (item.value / total) * 2 * Math.PI;
        
        ctx.fillStyle = item.color;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();
        
        // Dibujar borde
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        currentAngle += sliceAngle;
    });
    
    // Dibujar leyenda
    drawDistributionLegend(ctx, canvas, distributionData);
}

function generateTrendsData(category, period) {
    const days = period === '7D' ? 7 : period === '30D' ? 30 : 90;
    const data = [];
    
    const baseValues = {
        'ventas': 1000,
        'marketing': 500,
        'finanzas': 2000,
        'operaciones': 800,
        'recursos-humanos': 300
    };
    
    const base = baseValues[category] || 1000;
    
    for (let i = 0; i < days; i++) {
        const trend = 1 + (i / days) * 0.3; // Tendencia creciente
        const noise = 0.8 + Math.random() * 0.4; // Variación aleatoria
        data.push(Math.round(base * trend * noise));
    }
    
    return data;
}

function generateDistributionData(category) {
    const distributions = {
        'ventas': [
            { label: 'Productos A', value: 40, color: '#4f7cff' },
            { label: 'Productos B', value: 30, color: '#06b6d4' },
            { label: 'Productos C', value: 20, color: '#10b981' },
            { label: 'Otros', value: 10, color: '#f59e0b' }
        ],
        'marketing': [
            { label: 'Digital', value: 45, color: '#4f7cff' },
            { label: 'Tradicional', value: 25, color: '#06b6d4' },
            { label: 'Social Media', value: 20, color: '#10b981' },
            { label: 'Email', value: 10, color: '#f59e0b' }
        ],
        'finanzas': [
            { label: 'Ingresos', value: 50, color: '#10b981' },
            { label: 'Gastos Op.', value: 30, color: '#4f7cff' },
            { label: 'Inversiones', value: 15, color: '#06b6d4' },
            { label: 'Otros', value: 5, color: '#f59e0b' }
        ]
    };
    
    return distributions[category] || distributions['ventas'];
}

function getAnalysisColor(category) {
    const colors = {
        'ventas': '#4f7cff',
        'marketing': '#06b6d4',
        'finanzas': '#10b981',
        'operaciones': '#f59e0b',
        'recursos-humanos': '#ef4444'
    };
    return colors[category] || '#4f7cff';
}

// Funciones para gráficos de IA Predictiva
window.updateMLPerformanceChart = function() {
    const canvas = document.getElementById('mlPerformanceChart');
    if (!canvas) return;
    
    const selectedModel = document.getElementById('modelSelector').value;
    drawMLPerformanceChart(canvas, selectedModel);
};

window.updatePredictionsChart = function() {
    const canvas = document.getElementById('predictionsChart');
    if (!canvas) return;
    
    const period = document.getElementById('predictionPeriod').value;
    drawPredictionsChart(canvas, period);
};

function drawMLPerformanceChart(canvas, selectedModel) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Limpiar canvas
    ctx.clearRect(0, 0, width, height);
    
    // Datos de rendimiento por modelo
    const performanceData = getModelPerformanceData(selectedModel);
    
    // Configuración del gráfico
    const padding = 60;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const barWidth = chartWidth / performanceData.length;
    
    // Fondo del área del gráfico
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(padding, padding, chartWidth, chartHeight);
    
    // Dibujar grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Dibujar barras
    performanceData.forEach((item, index) => {
        const barHeight = (item.accuracy / 100) * chartHeight;
        const x = padding + index * barWidth + barWidth * 0.1;
        const y = padding + chartHeight - barHeight;
        const actualBarWidth = barWidth * 0.8;
        
        // Gradiente para las barras
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        gradient.addColorStop(0, item.color);
        gradient.addColorStop(1, item.color + '80');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, actualBarWidth, barHeight);
        
        // Borde de las barras
        ctx.strokeStyle = item.color;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, actualBarWidth, barHeight);
        
        // Etiquetas de valores
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 12px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(`${item.accuracy}%`, x + actualBarWidth/2, y - 5);
        
        // Etiquetas de modelos
        ctx.save();
        ctx.translate(x + actualBarWidth/2, height - 20);
        ctx.rotate(-Math.PI/6);
        ctx.font = '11px system-ui';
        ctx.textAlign = 'right';
        ctx.fillText(item.name, 0, 0);
        ctx.restore();
    });
    
    // Título y etiquetas de ejes
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 14px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('Precisión del Modelo (%)', width/2, 20);
    
    // Escala Y
    ctx.font = '11px system-ui';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
        const value = (i * 20);
        const y = padding + chartHeight - (chartHeight / 5) * i;
        ctx.fillText(value + '%', padding - 10, y + 4);
    }
}

function drawPredictionsChart(canvas, period) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Limpiar canvas
    ctx.clearRect(0, 0, width, height);
    
    // Generar datos de predicciones vs realidad
    const data = generatePredictionsData(period);
    
    // Configuración del gráfico
    const padding = 50;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Fondo del área del gráfico
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(padding, padding, chartWidth, chartHeight);
    
    // Dibujar grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    const stepX = chartWidth / (data.length - 1);
    
    // Dibujar línea de valores reales
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    data.forEach((point, index) => {
        const x = padding + index * stepX;
        const y = padding + chartHeight - (point.real / 100) * chartHeight;
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // Dibujar línea de predicciones
    ctx.strokeStyle = '#4f7cff';
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    data.forEach((point, index) => {
        const x = padding + index * stepX;
        const y = padding + chartHeight - (point.predicted / 100) * chartHeight;
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Dibujar puntos
    data.forEach((point, index) => {
        const x = padding + index * stepX;
        
        // Punto real
        const realY = padding + chartHeight - (point.real / 100) * chartHeight;
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(x, realY, 4, 0, 2 * Math.PI);
        ctx.fill();
        
        // Punto predicción
        const predY = padding + chartHeight - (point.predicted / 100) * chartHeight;
        ctx.fillStyle = '#4f7cff';
        ctx.beginPath();
        ctx.arc(x, predY, 4, 0, 2 * Math.PI);
        ctx.fill();
    });
    
    // Leyenda
    ctx.fillStyle = '#374151';
    ctx.font = '12px system-ui';
    ctx.textAlign = 'left';
    
    // Real
    ctx.fillStyle = '#10b981';
    ctx.fillRect(padding, 15, 15, 3);
    ctx.fillStyle = '#374151';
    ctx.fillText('Valores Reales', padding + 20, 20);
    
    // Predicción
    ctx.fillStyle = '#4f7cff';
    ctx.fillRect(padding + 120, 15, 15, 3);
    ctx.fillStyle = '#374151';
    ctx.fillText('Predicciones', padding + 140, 20);
    
    // Título del eje Y
    ctx.save();
    ctx.translate(15, height/2);
    ctx.rotate(-Math.PI/2);
    ctx.font = 'bold 12px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('Valor (%)', 0, 0);
    ctx.restore();
    
    // Escala Y
    ctx.font = '10px system-ui';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
        const value = (i * 20);
        const y = padding + chartHeight - (chartHeight / 5) * i;
        ctx.fillText(value + '%', padding - 5, y + 3);
    }
}

function getModelPerformanceData(selectedModel) {
    const allModels = [
        { name: 'Random Forest', accuracy: 94, color: '#10b981' },
        { name: 'Red Neuronal', accuracy: 89, color: '#4f7cff' },
        { name: 'XGBoost', accuracy: 92, color: '#f59e0b' },
        { name: 'SVM', accuracy: 87, color: '#ef4444' },
        { name: 'Regresión Lineal', accuracy: 82, color: '#8b5cf6' }
    ];
    
    if (selectedModel === 'all') {
        return allModels;
    }
    
    const modelMap = {
        'random-forest': [allModels[0]],
        'neural-network': [allModels[1]],
        'xgboost': [allModels[2]],
        'svm': [allModels[3]]
    };
    
    return modelMap[selectedModel] || allModels;
}

function generatePredictionsData(period) {
    const days = period === '7D' ? 7 : period === '30D' ? 30 : 90;
    const data = [];
    
    for (let i = 0; i < days; i += Math.ceil(days/10)) {
        const baseValue = 70 + Math.sin(i * 0.1) * 15;
        const real = Math.max(20, Math.min(100, baseValue + (Math.random() - 0.5) * 20));
        const predicted = Math.max(20, Math.min(100, real + (Math.random() - 0.5) * 10));
        
        data.push({
            day: i + 1,
            real: Math.round(real),
            predicted: Math.round(predicted)
        });
    }
    
    return data;
}

// Funciones para gráfico de categorías en módulo de Análisis
window.updateCategoryChart = function() {
    const canvas = document.getElementById('categoryChart');
    if (!canvas) return;
    
    const chartType = document.getElementById('categoryChartType')?.value || 'bar';
    const metric = document.getElementById('categoryMetric')?.value || 'count';
    
    drawCategoryChart(canvas, chartType, metric);
};

function drawCategoryChart(canvas, type, metric) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Limpiar canvas
    ctx.clearRect(0, 0, width, height);
    
    // Obtener datos según la métrica
    const data = getCategoryData(metric);
    
    switch(type) {
        case 'bar':
            drawCategoryBarChart(ctx, canvas, data, metric);
            break;
        case 'pie':
            drawCategoryPieChart(ctx, canvas, data, metric);
            break;
        case 'line':
            drawCategoryLineChart(ctx, canvas, data, metric);
            break;
    }
}

function drawCategoryBarChart(ctx, canvas, data, metric) {
    const width = canvas.width;
    const height = canvas.height;
    const padding = 70; // Aumentar padding
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 1.5; // Ajustar altura para dar espacio a etiquetas
    
    // Fondo del área del gráfico
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(padding, padding + 20, chartWidth, chartHeight);
    
    // Grid horizontal
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    const maxValue = Math.max(...data.map(d => d.value));
    const gridLines = 5;
    
    for (let i = 0; i <= gridLines; i++) {
        const y = padding + 20 + (chartHeight / gridLines) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        
        // Etiquetas del eje Y
        const value = Math.round((maxValue / gridLines) * (gridLines - i));
        ctx.fillStyle = '#6b7280';
        ctx.font = '11px system-ui';
        ctx.textAlign = 'right';
        ctx.fillText(value.toString(), padding - 10, y + 4);
    }
    
    // Dibujar barras
    const barWidth = chartWidth / data.length;
    data.forEach((item, index) => {
        const barHeight = (item.value / maxValue) * chartHeight;
        const x = padding + index * barWidth + barWidth * 0.15; // Más espacio entre barras
        const y = padding + 20 + chartHeight - barHeight;
        const actualBarWidth = barWidth * 0.7; // Barras más delgadas
        
        // Gradiente para las barras
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        gradient.addColorStop(0, item.color);
        gradient.addColorStop(1, item.color + '60');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, actualBarWidth, barHeight);
        
        // Borde de las barras
        ctx.strokeStyle = item.color;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, actualBarWidth, barHeight);
        
        // Valor en la parte superior
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 12px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(item.value.toString(), x + actualBarWidth/2, y - 8);
        
        // Etiqueta de categoría - posición mejorada
        ctx.fillStyle = '#374151';
        ctx.font = 'bold 11px system-ui';
        ctx.textAlign = 'center';
        // Etiqueta directa sin rotación para mejor legibilidad
        ctx.fillText(item.label, x + actualBarWidth/2, height - 15);
    });
    
    // Título
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 16px system-ui';
    ctx.textAlign = 'center';
    const title = getMetricTitle(metric);
    ctx.fillText(title, width/2, 20);
}

function drawCategoryPieChart(ctx, canvas, data, metric) {
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2 + 10; // Mover el centro un poco hacia abajo
    const radius = Math.min(width, height) / 4; // Reducir el radio para dar más espacio
    
    // Calcular total
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    // Dibujar título
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 16px system-ui';
    ctx.textAlign = 'center';
    const title = getMetricTitle(metric);
    ctx.fillText(title, centerX, 25);
    
    // Dibujar sectores
    let currentAngle = -Math.PI / 2; // Empezar desde arriba
    
    data.forEach((item, index) => {
        const sliceAngle = (item.value / total) * 2 * Math.PI;
        
        // Dibujar sector
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        
        // Gradiente radial
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        gradient.addColorStop(0, item.color);
        gradient.addColorStop(1, item.color + '80');
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Borde
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Etiqueta y porcentaje - posicionadas más lejos del centro
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelRadius = radius + 45; // Aumentar distancia desde el centro
        const labelX = centerX + Math.cos(labelAngle) * labelRadius;
        const labelY = centerY + Math.sin(labelAngle) * labelRadius;
        
        ctx.fillStyle = '#374151';
        ctx.font = 'bold 11px system-ui';
        ctx.textAlign = 'center';
        const percentage = ((item.value / total) * 100).toFixed(1);
        ctx.fillText(`${item.label}`, labelX, labelY - 6);
        ctx.font = '10px system-ui';
        ctx.fillText(`${percentage}%`, labelX, labelY + 8);
        
        // Línea conectora desde el borde del sector hasta la etiqueta
        const connectorStartX = centerX + Math.cos(labelAngle) * (radius + 5);
        const connectorStartY = centerY + Math.sin(labelAngle) * (radius + 5);
        const connectorEndX = centerX + Math.cos(labelAngle) * (radius + 35);
        const connectorEndY = centerY + Math.sin(labelAngle) * (radius + 35);
        
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(connectorStartX, connectorStartY);
        ctx.lineTo(connectorEndX, connectorEndY);
        ctx.stroke();
        
        currentAngle += sliceAngle;
    });
    
    // Centro decorativo
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawCategoryLineChart(ctx, canvas, data, metric) {
    const width = canvas.width;
    const height = canvas.height;
    const padding = 70; // Aumentar padding para dar más espacio
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 1.8; // Reducir altura del chart para dar espacio a la leyenda
    
    // Simular datos temporales para cada categoría
    const timeData = generateCategoryTimeData(data);
    const maxValue = Math.max(...timeData.flatMap(d => d.values));
    
    // Fondo del área del gráfico
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(padding, padding + 30, chartWidth, chartHeight);
    
    // Grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + 30 + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Título
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 16px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(`Tendencia de ${getMetricTitle(metric)}`, width/2, 25);
    
    // Dibujar líneas para cada categoría
    const stepX = chartWidth / 6; // 7 puntos de datos
    
    timeData.forEach((category, categoryIndex) => {
        ctx.strokeStyle = category.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        category.values.forEach((value, pointIndex) => {
            const x = padding + pointIndex * stepX;
            const y = padding + 30 + chartHeight - (value / maxValue) * chartHeight;
            
            if (pointIndex === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Puntos
        category.values.forEach((value, pointIndex) => {
            const x = padding + pointIndex * stepX;
            const y = padding + 30 + chartHeight - (value / maxValue) * chartHeight;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fillStyle = category.color;
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
        });
    });
    
    // Leyenda horizontal en la parte inferior
    const legendStartX = padding;
    const legendY = height - 25;
    const legendItemWidth = chartWidth / timeData.length;
    
    timeData.forEach((category, index) => {
        const itemX = legendStartX + index * legendItemWidth;
        
        // Rectángulo de color
        ctx.fillStyle = category.color;
        ctx.fillRect(itemX, legendY - 8, 12, 3);
        
        // Texto de la etiqueta
        ctx.fillStyle = '#374151';
        ctx.font = '11px system-ui';
        ctx.textAlign = 'left';
        ctx.fillText(category.label, itemX + 18, legendY - 2);
    });
    
    // Escala Y
    ctx.fillStyle = '#6b7280';
    ctx.font = '10px system-ui';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
        const value = Math.round((maxValue / 5) * (5 - i));
        const y = padding + 30 + (chartHeight / 5) * i;
        ctx.fillText(value.toString(), padding - 5, y + 3);
    }
    
    // Etiquetas del eje X (períodos)
    ctx.fillStyle = '#6b7280';
    ctx.font = '10px system-ui';
    ctx.textAlign = 'center';
    for (let i = 0; i < 7; i++) {
        const x = padding + i * stepX;
        ctx.fillText(`P${i + 1}`, x, height - 5);
    }
}

function getCategoryData(metric) {
    const baseData = {
        count: [
            { label: 'Ventas', value: 45, color: '#4f7cff' },
            { label: 'Marketing', value: 32, color: '#06b6d4' },
            { label: 'Finanzas', value: 28, color: '#10b981' },
            { label: 'Operaciones', value: 19, color: '#f59e0b' },
            { label: 'RR.HH.', value: 12, color: '#ef4444' }
        ],
        success: [
            { label: 'Ventas', value: 94, color: '#4f7cff' },
            { label: 'Marketing', value: 87, color: '#06b6d4' },
            { label: 'Finanzas', value: 91, color: '#10b981' },
            { label: 'Operaciones', value: 83, color: '#f59e0b' },
            { label: 'RR.HH.', value: 79, color: '#ef4444' }
        ],
        performance: [
            { label: 'Ventas', value: 8.7, color: '#4f7cff' },
            { label: 'Marketing', value: 7.3, color: '#06b6d4' },
            { label: 'Finanzas', value: 9.1, color: '#10b981' },
            { label: 'Operaciones', value: 6.8, color: '#f59e0b' },
            { label: 'RR.HH.', value: 5.9, color: '#ef4444' }
        ]
    };
    
    return baseData[metric] || baseData.count;
}

function generateCategoryTimeData(categoryData) {
    return categoryData.map(category => ({
        label: category.label,
        color: category.color,
        values: Array.from({length: 7}, (_, i) => {
            const base = category.value;
            const variation = 0.8 + Math.random() * 0.4;
            const trend = 1 + (i * 0.05); // Ligera tendencia ascendente
            return Math.round(base * variation * trend);
        })
    }));
}

function getMetricTitle(metric) {
    const titles = {
        count: 'Número de Análisis por Categoría',
        success: 'Tasa de Éxito por Categoría (%)',
        performance: 'Rendimiento por Categoría (0-10)'
    };
    return titles[metric] || 'Análisis por Categoría';
}

function drawChartAxes(ctx, canvas, dataPoints, analysis, period) {
    const padding = 40;
    const chartWidth = canvas.width - (padding * 2);
    const chartHeight = canvas.height - (padding * 2);
    
    // Calcular valores mínimos y máximos
    const maxValue = Math.max(...dataPoints);
    const minValue = Math.min(...dataPoints);
    const range = maxValue - minValue || 1;
    
    // Dibujar fondo del área del gráfico
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(padding, padding, chartWidth, chartHeight);
    
    // Dibujar grid horizontal
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    const gridLines = 5;
    
    for (let i = 0; i <= gridLines; i++) {
        const y = padding + (chartHeight / gridLines) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
        
        // Etiquetas del eje Y
        const value = Math.round(maxValue - (range / gridLines) * i);
        ctx.fillStyle = '#6b7280';
        ctx.font = '11px system-ui';
        ctx.textAlign = 'right';
        ctx.fillText(value.toString(), padding - 5, y + 4);
    }
    
    // Dibujar grid vertical
    for (let i = 0; i < dataPoints.length; i++) {
        const x = padding + (i * chartWidth / (dataPoints.length - 1));
        ctx.strokeStyle = '#f1f5f9';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, canvas.height - padding);
        ctx.stroke();
        
        // Etiquetas del eje X
        ctx.fillStyle = '#6b7280';
        ctx.font = '10px system-ui';
        ctx.textAlign = 'center';
        const label = getPeriodLabel(i, period, dataPoints.length);
        ctx.fillText(label, x, canvas.height - 10);
    }
    
    // Dibujar ejes principales
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    
    // Eje Y
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.stroke();
    
    // Eje X
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();
    
    // Título del gráfico
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 14px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(`${analysis.name} - ${period}`, canvas.width / 2, 20);
    
    // Etiquetas de los ejes
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px system-ui';
    
    // Etiqueta eje Y
    ctx.save();
    ctx.translate(15, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText('Valor', 0, 0);
    ctx.restore();
    
    // Etiqueta eje X
    ctx.textAlign = 'center';
    ctx.fillText('Período', canvas.width / 2, canvas.height - 5);
    
    // Mostrar valores en los puntos
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 11px system-ui';
    ctx.textAlign = 'center';
    
    dataPoints.forEach((value, index) => {
        const x = padding + (index * chartWidth / (dataPoints.length - 1));
        const y = padding + chartHeight - ((value - minValue) / range * chartHeight);
        
        // Mostrar valor sobre el punto
        ctx.fillText(value.toString(), x, y - 10);
    });
}

function getPeriodLabel(index, period, totalPoints) {
    // Generar etiquetas según el período, optimizado para espacios reducidos
    if (period === '7D') {
        return `D${index + 1}`;
    } else if (period === '30D') {
        // Para 30 días, mostrar semanas
        const week = Math.floor(index / 7) + 1;
        return index % 7 === 0 ? `S${week}` : '';
    } else if (period === '90D') {
        // Para 90 días, mostrar meses o semanas
        if (index % 15 === 0) {
            const period = Math.floor(index / 15) + 1;
            return `P${period}`;
        }
        return '';
    }
    
    return `${index + 1}`;
}

function drawDistributionLegend(ctx, canvas, data) {
    const legendX = 20;
    let legendY = 30;
    
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    
    data.forEach((item, index) => {
        // Dibujar cuadrado de color
        ctx.fillStyle = item.color;
        ctx.fillRect(legendX, legendY, 12, 12);
        
        // Dibujar texto
        ctx.fillStyle = '#1f2937';
        ctx.fillText(`${item.label}: ${item.value}%`, legendX + 18, legendY + 9);
        
        legendY += 20;
    });
}

function addAnalysisToUser(analysisData) {
    const analysis = {
        id: Date.now().toString(),
        name: analysisData.name,
        category: analysisData.category,
        type: analysisData.type,
        dataSource: analysisData.dataSource,
        createdAt: new Date(),
        user: currentUser
    };
    
    userAnalyses.push(analysis);
    
    // Actualizar selectores en dashboard si está visible
    const trendsSelect = document.getElementById('trendsAnalysisSelect');
    if (trendsSelect) {
        updateAnalysisSelectors();
    }
    
    return analysis;
}

// Cargar dashboard por defecto después de la inicialización
renderContent('dashboard');

// Agregar algunos análisis de ejemplo para demostración
userAnalyses.push(
    {
        id: 'demo1',
        name: 'Análisis de Ventas Q1',
        category: 'ventas',
        type: 'descriptivo',
        dataSource: 'archivo',
        createdAt: new Date(),
        user: currentUser
    },
    {
        id: 'demo2',
        name: 'ROI Marketing Digital',
        category: 'marketing',
        type: 'predictivo',
        dataSource: 'api',
        createdAt: new Date(),
        user: currentUser
    },
    {
        id: 'demo3',
        name: 'Estado Financiero',
        category: 'finanzas',
        type: 'comparativo',
        dataSource: 'base-datos',
        createdAt: new Date(),
        user: currentUser
    }
);

// Establecer el item del dashboard como activo
document.querySelectorAll('.sidebar-item').forEach(item => item.classList.remove('active'));
const dashboardItem = document.querySelector('[data-content="dashboard"]');
if (dashboardItem) {
    dashboardItem.classList.add('active');
}

// Event listeners para inputs del formulario de personalización
document.addEventListener('input', function(e) {
    if (e.target.closest('#customizeForm')) {
        updatePreview();
    }
});

// Funciones para navegación en Gestión de Datos
window.showGestionDashboard = function() {
    // Ocultar todas las vistas
    document.querySelectorAll('.gestion-view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Mostrar vista principal
    const dashboardView = document.getElementById('gestionDashboard');
    if (dashboardView) {
        dashboardView.classList.add('active');
        
        // Refrescar el historial de cargas
        refreshUploadHistory();
    }
};

window.showFileUploadForm = function() {
    // Ocultar todas las vistas
    document.querySelectorAll('.gestion-view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Mostrar formulario de carga
    const uploadView = document.getElementById('fileUploadForm');
    if (uploadView) {
        uploadView.classList.add('active');
        
        // Configurar drag & drop para archivos
        setupFileUploadHandlers();
    }
};

window.showSyncForm = function() {
    // Ocultar todas las vistas
    document.querySelectorAll('.gestion-view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Mostrar formulario de sincronización
    const syncView = document.getElementById('syncForm');
    if (syncView) {
        syncView.classList.add('active');
        
        // Configurar handlers para sincronización
        setupSyncFormHandlers();
    }
};

window.refreshUploadHistory = function() {
    // Generar datos de historial filtrados por usuario actual (igual que "Mi Actividad Reciente")
    uploadHistoryData = generateUploadHistoryData();
    filteredUploadHistoryData = [...uploadHistoryData];
    
    // Renderizar tabla
    renderUploadHistoryTable();
    
    // Configurar búsqueda si no está configurada
    setupUploadHistorySearch();
    
    // Actualizar contador en el stat-card
    const countElement = document.getElementById('recentUploadsCount');
    if (countElement) {
        countElement.textContent = uploadHistoryData.length;
    }
};

function getUploadTypeIcon(type) {
    switch(type) {
        case 'file': return '📄';
        case 'sync': return '🔄';
        case 'api': return '🔗';
        case 'database': return '🗄️';
        default: return '📁';
    }
}

function getStatusIcon(status) {
    switch(status) {
        case 'success': return '✅';
        case 'error': return '❌';
        case 'processing': return '⏳';
        case 'pending': return '⏳';
        default: return '●';
    }
}

function getStatusText(status) {
    switch(status) {
        case 'success': return 'Completado';
        case 'error': return 'Error';
        case 'processing': return 'Procesando';
        case 'pending': return 'Pendiente';
        default: return 'Desconocido';
    }
}

function formatUploadDate(dateString) {
    const parts = dateString.split('/');
    if (parts.length === 3) {
        const date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
        const today = new Date();
        const diffTime = today - date;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Hoy';
        if (diffDays === 1) return 'Ayer';
        if (diffDays < 7) return `Hace ${diffDays} días`;
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' });
    }
    return dateString;
};

// Variables para historial de cargas (similares a actividad reciente)
let uploadHistoryData = [];
let filteredUploadHistoryData = [];

function setupUploadHistorySearch() {
    const searchInput = document.getElementById('uploadHistorySearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                searchUploadHistory();
            }, 300);
        });
    }
}

function searchUploadHistory() {
    const searchTerm = document.getElementById('uploadHistorySearch')?.value.toLowerCase() || '';
    
    if (searchTerm === '') {
        filteredUploadHistoryData = [...uploadHistoryData];
    } else {
        filteredUploadHistoryData = uploadHistoryData.filter(item => 
            item.name.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            item.type.toLowerCase().includes(searchTerm)
        );
    }
    
    renderUploadHistoryTable();
}

function renderUploadHistoryTable() {
    const historyTableBody = document.getElementById('uploadHistoryTableBody');
    if (!historyTableBody) return;
    
    const searchTerm = document.getElementById('uploadHistorySearch')?.value.toLowerCase() || '';
    
    if (filteredUploadHistoryData.length === 0) {
        const isSearching = searchTerm.length > 0;
        historyTableBody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-state" style="text-align: center; padding: 40px; color: var(--text-secondary);">
                    <div style="font-size: 2rem; margin-bottom: 16px; opacity: 0.5;">${isSearching ? '�' : '�📁'}</div>
                    <div style="font-size: 1.1rem; margin-bottom: 8px;">
                        ${isSearching ? 'No se encontraron cargas' : 'No tienes cargas recientes'}
                    </div>
                    <div style="font-size: 0.9rem;">
                        ${isSearching ? 'Intenta con otros términos de búsqueda' : 'Tus archivos y sincronizaciones aparecerán aquí'}
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    // Renderizar tabla de historial con el mismo estilo que "Mi Actividad Reciente"
    historyTableBody.innerHTML = filteredUploadHistoryData.map(item => `
        <tr class="activity-row">
            <td class="activity-title-cell">
                <div class="activity-info">
                    <span class="activity-icon">${getUploadTypeIcon(item.type)}</span>
                    <span class="activity-title">${item.name}</span>
                </div>
            </td>
            <td class="activity-description-cell">${item.description}</td>
            <td class="activity-user-cell">
                <div class="user-info">
                    <span class="user-avatar">👤</span>
                    <span class="user-name">${item.user}</span>
                </div>
            </td>
            <td class="activity-date-cell">
                <div class="date-info">
                    <span class="date-value">${formatUploadDate(item.date)}</span>
                    <span class="time-value">${item.time || '12:30'}</span>
                </div>
            </td>
            <td class="status-cell">
                <span class="status-badge ${item.status}">
                    <span class="status-icon">${getStatusIcon(item.status)}</span>
                    ${getStatusText(item.status)}
                </span>
            </td>
            <td class="size-cell">
                <span class="size-value">${item.size}</span>
            </td>
        </tr>
    `).join('');
    
    // Actualizar información de paginación
    const paginationInfo = document.getElementById('uploadHistoryPaginationInfo');
    if (paginationInfo) {
        const total = filteredUploadHistoryData.length;
        paginationInfo.textContent = `Tienes ${total} carga${total !== 1 ? 's' : ''} reciente${total !== 1 ? 's' : ''}`;
    }
}

window.startFileUpload = function() {
    const datasetName = document.getElementById('datasetName').value;
    const category = document.getElementById('datasetCategory').value;
    const description = document.getElementById('datasetDescription').value;
    
    if (!datasetName || !category) {
        alert('⚠️ Por favor completa al menos el nombre y la categoría del dataset');
        return;
    }
    
    // Simular proceso de carga
    const progressSteps = [
        'Validando archivos...',
        'Procesando datos...',
        'Aplicando transformaciones...',
        'Guardando en base de datos...',
        'Generando índices...',
        'Finalizando carga...'
    ];
    
    let currentStep = 0;
    const totalSteps = progressSteps.length;
    
    // Mostrar progreso simulado
    const progressModal = createProgressModal();
    document.body.appendChild(progressModal);
    
    const interval = setInterval(() => {
        currentStep++;
        const progress = (currentStep / totalSteps) * 100;
        
        updateProgressModal(progressModal, progress, progressSteps[currentStep - 1] || 'Completado');
        
        if (currentStep >= totalSteps) {
            clearInterval(interval);
            setTimeout(() => {
                document.body.removeChild(progressModal);
                alert(`✅ Dataset "${datasetName}" cargado exitosamente!\n\nCategoría: ${category}\nDescripción: ${description}`);
                
                // Limpiar formulario
                clearFileUploadForm();
                
                // Volver al dashboard - COMENTADO TEMPORALMENTE
                // showGestionDashboard();
            }, 1000);
        }
    }, 800);
};

window.startDataSync = function() {
    const syncMode = document.getElementById('syncMode').value;
    const frequency = document.getElementById('syncFrequency').value;
    const dbType = document.getElementById('dbType').value;
    
    if (!syncMode || !dbType) {
        alert('⚠️ Por favor completa la configuración de sincronización');
        return;
    }
    
    // Simular proceso de sincronización
    const progressModal = createProgressModal();
    document.body.appendChild(progressModal);
    
    const syncSteps = [
        'Probando conexión...',
        'Autenticando credenciales...',
        'Obteniendo esquema de datos...',
        'Sincronizando registros...',
        'Validando integridad...',
        'Actualizando metadatos...',
        'Sincronización completada'
    ];
    
    let currentStep = 0;
    const interval = setInterval(() => {
        currentStep++;
        const progress = (currentStep / syncSteps.length) * 100;
        
        updateProgressModal(progressModal, progress, syncSteps[currentStep - 1] || 'Completado');
        
        if (currentStep >= syncSteps.length) {
            clearInterval(interval);
            setTimeout(() => {
                document.body.removeChild(progressModal);
                alert(`✅ Sincronización completada exitosamente!\n\nModo: ${syncMode}\nFrecuencia: ${frequency}\nTipo de BD: ${dbType}`);
                
                // Volver al dashboard - COMENTADO TEMPORALMENTE
                // showGestionDashboard();
            }, 1000);
        }
    }, 1000);
};

window.testSyncConnection = function() {
    const dbType = document.getElementById('dbType').value;
    const dbHost = document.getElementById('dbHost').value;
    const dbName = document.getElementById('dbName').value;
    
    if (!dbType || !dbHost || !dbName) {
        alert('⚠️ Por favor completa al menos el tipo, servidor y nombre de la base de datos');
        return;
    }
    
    // Simular prueba de conexión
    const testButton = event.target;
    const originalText = testButton.innerHTML;
    
    testButton.innerHTML = '<span>🔄</span> Probando...';
    testButton.disabled = true;
    
    setTimeout(() => {
        const isSuccess = Math.random() > 0.3; // 70% de probabilidad de éxito
        
        if (isSuccess) {
            testButton.innerHTML = '<span>✅</span> Conexión exitosa';
            testButton.style.background = '#10b981';
            alert('✅ Conexión establecida correctamente!\n\nEl servidor está accesible y las credenciales son válidas.');
        } else {
            testButton.innerHTML = '<span>❌</span> Error de conexión';
            testButton.style.background = '#ef4444';
            alert('❌ Error al conectar con la base de datos.\n\nVerifica las credenciales y la conectividad del servidor.');
        }
        
        // Restaurar botón después de 3 segundos
        setTimeout(() => {
            testButton.innerHTML = originalText;
            testButton.style.background = '';
            testButton.disabled = false;
        }, 3000);
    }, 2000);
};

// Funciones auxiliares
function setupFileUploadHandlers() {
    const fileUploadArea = document.getElementById('fileUploadArea');
    const fileInput = document.getElementById('dataFileInput');
    const fileList = document.getElementById('dataFileList');
    
    if (!fileUploadArea || !fileInput) return;
    
    // Drag and drop handlers
    fileUploadArea.addEventListener('dragover', handleDragOver);
    fileUploadArea.addEventListener('dragleave', handleDragLeave);
    fileUploadArea.addEventListener('drop', handleFileDrop);
    fileUploadArea.addEventListener('click', () => fileInput.click());
    
    // File input handler
    fileInput.addEventListener('change', handleFileInputChange);
}

function setupSyncFormHandlers() {
    const sourceOptions = document.querySelectorAll('.source-option');
    
    sourceOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remover clase active de todas las opciones
            sourceOptions.forEach(opt => opt.classList.remove('active'));
            
            // Agregar clase active a la opción seleccionada
            this.classList.add('active');
            
            // Mostrar/ocultar configuraciones específicas
            const sourceType = this.getAttribute('data-source');
            toggleSourceConfig(sourceType);
        });
    });
}

function toggleSourceConfig(sourceType) {
    const configs = ['databaseConfig', 'apiConfig', 'cloudConfig'];
    
    configs.forEach(configId => {
        const configElement = document.getElementById(configId);
        if (configElement) {
            configElement.style.display = configId === `${sourceType}Config` ? 'block' : 'none';
        }
    });
}

function handleFileDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    
    const files = Array.from(e.dataTransfer.files);
    addFilesToList(files);
}

function handleFileInputChange(e) {
    const files = Array.from(e.target.files);
    addFilesToList(files);
}

function addFilesToList(files) {
    const fileList = document.getElementById('dataFileList');
    if (!fileList) return;
    
    const validFiles = files.filter(file => {
        const validTypes = ['.csv', '.xlsx', '.json', '.xml'];
        const extension = '.' + file.name.split('.').pop().toLowerCase();
        const validSize = file.size <= 50 * 1024 * 1024; // 50MB
        
        if (!validTypes.includes(extension)) {
            alert(`Archivo ${file.name} no es válido. Solo se permiten CSV, XLSX, JSON, XML.`);
            return false;
        }
        
        if (!validSize) {
            alert(`Archivo ${file.name} es muy grande. Máximo 50MB.`);
            return false;
        }
        
        return true;
    });
    
    if (validFiles.length > 0) {
        fileList.innerHTML = validFiles.map((file, index) => `
            <div class="file-item">
                <div class="file-info">
                    <div class="file-icon">${getFileIcon(file.name)}</div>
                    <div class="file-details">
                        <div class="file-name">${file.name}</div>
                        <div class="file-size">${formatFileSize(file.size)}</div>
                    </div>
                </div>
                <button class="file-remove" onclick="removeFileFromList(${index})">🗑️</button>
            </div>
        `).join('');
        
        fileList.style.display = 'block';
    }
}

function removeFileFromList(index) {
    // Implementar remoción de archivo específico
    const fileList = document.getElementById('dataFileList');
    if (fileList) {
        const fileItems = fileList.querySelectorAll('.file-item');
        if (fileItems[index]) {
            fileItems[index].remove();
        }
        
        // Si no quedan archivos, ocultar lista
        if (fileList.children.length === 0) {
            fileList.style.display = 'none';
        }
    }
}

function clearFileUploadForm() {
    document.getElementById('datasetName').value = '';
    document.getElementById('datasetCategory').value = '';
    document.getElementById('datasetDescription').value = '';
    
    const fileList = document.getElementById('dataFileList');
    if (fileList) {
        fileList.innerHTML = '';
        fileList.style.display = 'none';
    }
    
    const fileInput = document.getElementById('dataFileInput');
    if (fileInput) {
        fileInput.value = '';
    }
}

function generateUploadHistoryData() {
    // Generar un pool más grande de datos simulados de diferentes usuarios
    const allUploadData = [
        {
            type: 'file',
            name: 'ventas_q1_2024.csv',
            description: 'Datos de ventas del primer trimestre con 15,847 registros',
            user: 'Juan Pérez',
            date: '15/12/2024',
            time: '14:32',
            size: '2.3 MB',
            status: 'success'
        },
        {
            type: 'sync',
            name: 'Base de Datos CRM',
            description: 'Sincronización automática de clientes y contactos',
            user: 'María García',
            date: '14/12/2024',
            time: '09:15',
            size: '15.7 MB',
            status: 'success'
        },
        {
            type: 'file',
            name: 'marketing_campaigns.xlsx',
            description: 'Resultados de campañas de marketing digital Q4',
            user: 'Juan Pérez',
            date: '13/12/2024',
            time: '16:45',
            size: '5.1 MB',
            status: 'success'
        },
        {
            type: 'api',
            name: 'API Analytics',
            description: 'Datos de Google Analytics y métricas web',
            user: 'Carlos López',
            date: '12/12/2024',
            time: '11:20',
            size: '8.9 MB',
            status: 'error'
        },
        {
            type: 'file',
            name: 'inventario_productos.json',
            description: 'Inventario actualizado de productos y stock',
            user: 'Juan Pérez',
            date: '11/12/2024',
            time: '13:10',
            size: '1.8 MB',
            status: 'success'
        },
        {
            type: 'database',
            name: 'PostgreSQL - Ventas',
            description: 'Conexión directa a base de datos de ventas',
            user: 'Roberto Silva',
            date: '10/12/2024',
            time: '10:30',
            size: '25.4 MB',
            status: 'success'
        },
        {
            type: 'file',
            name: 'feedback_clientes.csv',
            description: 'Encuestas de satisfacción y comentarios',
            user: 'Juan Pérez',
            date: '09/12/2024',
            time: '15:20',
            size: '3.7 MB',
            status: 'processing'
        },
        {
            type: 'sync',
            name: 'API Salesforce',
            description: 'Sincronización de leads y oportunidades',
            user: 'Miguel Torres',
            date: '08/12/2024',
            time: '08:45',
            size: '12.1 MB',
            status: 'success'
        },
        {
            type: 'file',
            name: 'datos_financieros_q4.xlsx',
            description: 'Información financiera del cuarto trimestre',
            user: 'Juan Pérez',
            date: '07/12/2024',
            time: '11:30',
            size: '4.2 MB',
            status: 'success'
        },
        {
            type: 'api',
            name: 'API Redes Sociales',
            description: 'Métricas de engagement y alcance social',
            user: 'Ana Martín',
            date: '06/12/2024',
            time: '14:15',
            size: '6.8 MB',
            status: 'success'
        },
        {
            type: 'file',
            name: 'reportes_satisfaccion.csv',
            description: 'Análisis de satisfacción del cliente 2024',
            user: 'Juan Pérez',
            date: '05/12/2024',
            time: '09:45',
            size: '2.9 MB',
            status: 'success'
        }
    ];
    
    // Filtrar solo los datos del usuario actual, igual que en "Mi Actividad Reciente"
    const userUploads = allUploadData.filter(item => item.user === currentUser);
    
    // Ordenar por fecha más reciente
    return userUploads.sort((a, b) => {
        const dateA = new Date(a.date.split('/').reverse().join('-') + 'T' + a.time);
        const dateB = new Date(b.date.split('/').reverse().join('-') + 'T' + b.time);
        return dateB - dateA;
    });
}

function createProgressModal() {
    const modal = document.createElement('div');
    modal.className = 'progress-modal';
    modal.innerHTML = `
        <div class="progress-modal-content">
            <div class="progress-header">
                <h3>Procesando datos...</h3>
                <div class="progress-spinner">⏳</div>
            </div>
            <div class="progress-body">
                <div class="progress-bar-container">
                    <div class="progress-bar">
                        <div class="progress-fill" id="modalProgressFill"></div>
                    </div>
                    <div class="progress-text" id="modalProgressText">Iniciando...</div>
                </div>
            </div>
        </div>
    `;
    
    return modal;
}

function updateProgressModal(modal, progress, text) {
    const progressFill = modal.querySelector('#modalProgressFill');
    const progressText = modal.querySelector('#modalProgressText');
    
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
    
    if (progressText) {
        progressText.textContent = text;
    }
}

// Funciones para el nuevo formulario de carga de datos
function setupDataUploadPage() {
    // Configurar tabs de método
    const methodTabs = document.querySelectorAll('.method-tab');
    methodTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const method = this.getAttribute('data-method');
            toggleUploadMethod(method);
        });
    });
    
    // Configurar sync interval toggle
    const syncCheckbox = document.getElementById('syncInterval');
    const intervalInput = document.getElementById('intervalTime');
    if (syncCheckbox && intervalInput) {
        syncCheckbox.addEventListener('change', function() {
            intervalInput.disabled = !this.checked;
        });
    }
    
    // Configurar historial de cargas
    setupHistoryTable();
    setupHistorySearch();
    
    // Configurar drag & drop al final con más tiempo para que las funciones se carguen
    setTimeout(() => {
        if (typeof window.setupDragDrop === 'function') {
            window.setupDragDrop();
        } else {
            // Intentar de nuevo después de más tiempo
            setTimeout(() => {
                if (typeof window.setupDragDrop === 'function') {
                    window.setupDragDrop();
                }
            }, 500);
        }
    }, 200);
}

// Variables para el historial de cargas
// Datos de ejemplo del historial (en una aplicación real vendría de una API)
function generateHistoryData() {
    const users = ['Juan Pérez', 'María García', 'Carlos López', 'Ana Martínez'];
    const fileTypes = ['xlsx', 'csv', 'json'];
    const sources = [
        'ventas_q1_2024.xlsx', 'clientes_data.csv', 'inventario.json', 'API Salesforce', 
        'API Google Analytics', 'marketing_campaigns.xlsx', 'productos.csv', 'usuarios.json',
        'API HubSpot', 'financiero_2024.xlsx', 'empleados.csv', 'API Zendesk',
        'reportes_mensuales.xlsx', 'feedback_clientes.csv', 'API Shopify',
        'analytics_web.json', 'ventas_detalle.csv', 'API Stripe', 'presupuestos.xlsx',
        'leads_marketing.csv', 'API Microsoft', 'proyectos.json', 'gastos.xlsx'
    ];
    
    const statuses = ['success', 'error', 'processing'];
    const statusLabels = {
        'success': 'Completado',
        'error': 'Error',
        'processing': 'Procesando'
    };
    
    historyData = [];
    
    for (let i = 0; i < 23; i++) {
        const source = sources[i % sources.length];
        const isAPI = source.includes('API');
        const user = users[Math.floor(Math.random() * users.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const daysAgo = Math.floor(Math.random() * 30);
        const hoursAgo = Math.floor(Math.random() * 24);
        
        historyData.push({
            id: i + 1,
            type: isAPI ? 'api' : 'file',
            typeIcon: isAPI ? '🔗' : getFileIcon(source),
            name: source,
            records: Math.floor(Math.random() * 5000) + 100,
            user: user,
            loadDate: new Date(Date.now() - (daysAgo * 24 * 60 * 60 * 1000) - (hoursAgo * 60 * 60 * 1000)),
            status: status,
            statusLabel: statusLabels[status]
        });
    }
    
    // Filtrar solo registros del usuario actual (simulación)
    filteredHistory = historyData.filter(item => item.user === currentUser);
}

function setupHistoryTable() {
    generateHistoryData();
    renderHistoryTable();
    updatePagination();
}

function renderHistoryTable() {
    const tbody = document.getElementById('historyTableBody');
    const noResults = document.getElementById('noResults');
    
    if (!tbody) return;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredHistory.slice(startIndex, endIndex);
    
    if (pageData.length === 0) {
        tbody.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    tbody.innerHTML = pageData.map(item => `
        <tr class="history-row">
            <td class="type-cell">
                <span class="type-icon">${item.typeIcon}</span>
                <span class="type-label">${item.type === 'api' ? 'API' : 'Archivo'}</span>
            </td>
            <td class="name-cell">
                <div class="name-content">
                    <span class="source-name">${item.name}</span>
                    ${item.type === 'file' ? `<span class="file-extension">.${item.name.split('.').pop()}</span>` : ''}
                </div>
            </td>
            <td class="records-cell">
                <span class="records-count">${item.records.toLocaleString()}</span>
                <span class="records-label">registros</span>
            </td>
            <td class="user-cell">
                <div class="user-info">
                    <span class="user-avatar">👤</span>
                    <span class="user-name">${item.user}</span>
                </div>
            </td>
            <td class="date-cell">
                <div class="date-info">
                    <span class="date-value">${formatDate(item.loadDate)}</span>
                    <span class="time-value">${formatTime(item.loadDate)}</span>
                </div>
            </td>
            <td class="status-cell">
                <span class="status-badge ${item.status}">
                    ${getStatusIcon(item.status)} ${item.statusLabel}
                </span>
            </td>
            <td class="actions-cell">
                <div class="action-buttons">
                    <button class="action-btn view" onclick="viewHistoryDetails(${item.id})" title="Ver detalles">👁️</button>
                    ${item.status === 'success' ? '<button class="action-btn download" onclick="downloadData(' + item.id + ')" title="Descargar">⬇️</button>' : ''}
                    ${item.status === 'error' ? '<button class="action-btn retry" onclick="retryLoad(' + item.id + ')" title="Reintentar">🔄</button>' : ''}
                </div>
            </td>
        </tr>
    `).join('');
    
    updatePagination();
}

function formatDate(date) {
    const today = new Date();
    const diffTime = today - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        return 'Hoy';
    } else if (diffDays === 1) {
        return 'Ayer';
    } else if (diffDays < 7) {
        return `Hace ${diffDays} días`;
    } else {
        return date.toLocaleDateString('es-ES', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
        });
    }
}

function formatTime(date) {
    return date.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

function getStatusIcon(status) {
    const icons = {
        'success': '✅',
        'error': '❌',
        'processing': '🔄'
    };
    return icons[status] || '❓';
}

// Funciones de búsqueda y filtrado
window.searchHistory = function() {
    applyFilters();
};

window.filterHistory = function() {
    applyFilters();
};

function applyFilters() {
    const searchTerm = document.getElementById('historySearch')?.value.toLowerCase() || '';
    const typeFilter = document.getElementById('typeFilter')?.value || '';
    const statusFilter = document.getElementById('statusFilter')?.value || '';
    
    filteredHistory = historyData.filter(item => {
        // Filtrar por usuario actual
        if (item.user !== currentUser) return false;
        
        // Filtrar por término de búsqueda
        const matchesSearch = !searchTerm || 
            item.name.toLowerCase().includes(searchTerm) ||
            item.user.toLowerCase().includes(searchTerm);
        
        // Filtrar por tipo
        const matchesType = !typeFilter || item.type === typeFilter;
        
        // Filtrar por estado
        const matchesStatus = !statusFilter || item.status === statusFilter;
        
        return matchesSearch && matchesType && matchesStatus;
    });
    
    currentPage = 1;
    renderHistoryTable();
}

// Funciones de paginación
window.changePage = function(direction) {
    const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
    
    if (direction === -1 && currentPage > 1) {
        currentPage--;
    } else if (direction === 1 && currentPage < totalPages) {
        currentPage++;
    }
    
    renderHistoryTable();
};

window.goToPage = function(page) {
    currentPage = page;
    renderHistoryTable();
};

window.changeItemsPerPage = function() {
    const select = document.getElementById('itemsPerPage');
    itemsPerPage = parseInt(select.value);
    currentPage = 1;
    renderHistoryTable();
};

function updatePagination() {
    const totalItems = filteredHistory.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    
    // Actualizar información de paginación
    const paginationInfo = document.getElementById('paginationInfo');
    if (paginationInfo) {
        if (totalItems === 0) {
            paginationInfo.textContent = 'No hay registros para mostrar';
        } else {
            paginationInfo.textContent = `Mostrando ${startItem}-${endItem} de ${totalItems} registros`;
        }
    }
    
    // Actualizar botones de navegación
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    
    // Generar números de página
    const pageNumbers = document.getElementById('pageNumbers');
    if (pageNumbers && totalPages > 1) {
        const pages = [];
        const maxVisible = 5;
        
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);
        
        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }
        
        if (startPage > 1) {
            pages.push('<button class="page-btn" onclick="goToPage(1)">1</button>');
            if (startPage > 2) {
                pages.push('<span class="page-dots">...</span>');
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const isActive = i === currentPage ? 'active' : '';
            pages.push(`<button class="page-btn ${isActive}" onclick="goToPage(${i})">${i}</button>`);
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push('<span class="page-dots">...</span>');
            }
            pages.push(`<button class="page-btn" onclick="goToPage(${totalPages})">${totalPages}</button>`);
        }
        
        pageNumbers.innerHTML = pages.join('');
    } else if (pageNumbers) {
        pageNumbers.innerHTML = '';
    }
}

// Funciones de acciones
window.viewHistoryDetails = function(id) {
    const item = historyData.find(h => h.id === id);
    if (item) {
        alert(`📋 Detalles de carga:\n\nNombre: ${item.name}\nTipo: ${item.type === 'api' ? 'API' : 'Archivo'}\nRegistros: ${item.records.toLocaleString()}\nUsuario: ${item.user}\nFecha: ${formatDate(item.loadDate)} ${formatTime(item.loadDate)}\nEstado: ${item.statusLabel}`);
    }
};

window.downloadData = function(id) {
    const item = historyData.find(h => h.id === id);
    if (item) {
        alert(`⬇️ Descargando datos de: ${item.name}\n\n${item.records.toLocaleString()} registros`);
    }
};

window.retryLoad = function(id) {
    const item = historyData.find(h => h.id === id);
    if (item && confirm(`¿Deseas reintentar la carga de "${item.name}"?`)) {
        alert(`🔄 Reintentando carga de: ${item.name}`);
    }
};

// Configurar búsqueda en tiempo real
function setupHistorySearch() {
    const searchInput = document.getElementById('historySearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                applyFilters();
            }, 300);
        });
    }
}

// Funciones esenciales del dashboard (sin comentar)
function setupActivityTable() {
    generateActivityData();
    renderActivityTable();
    setupActivitySearch();
}

function generateActivityData() {
    // Solo generar actividades para el usuario actual de la sesión
    const activityTypes = [
        { icon: '📤', title: 'Archivo cargado', descriptions: ['procesado con {records} registros', 'importado exitosamente', 'validado y almacenado'] },
        { icon: '🤖', title: 'Modelo actualizado', descriptions: ['Precisión mejorada al {percentage}%', 'Entrenamiento completado', 'Algoritmo optimizado'] },
        { icon: '📊', title: 'Dashboard exportado', descriptions: ['Reporte enviado a Power BI', 'Datos sincronizados', 'Visualización actualizada'] },
        { icon: '🔔', title: 'Alerta activada', descriptions: ['Anomalía detectada en datos', 'Umbral superado', 'Patrón inusual identificado'] },
        { icon: '⚙️', title: 'Configuración modificada', descriptions: ['Parámetros actualizados', 'Conexión establecida', 'Filtros aplicados'] },
        { icon: '📋', title: 'Análisis creado', descriptions: ['Nuevo proyecto iniciado', 'Template aplicado', 'Configuración guardada'] },
        { icon: '🔄', title: 'Sincronización', descriptions: ['Datos actualizados', 'API conectada', 'Base de datos sincronizada'] },
        { icon: '👥', title: 'Usuario agregado', descriptions: ['Nuevo miembro del equipo', 'Permisos asignados', 'Acceso configurado'] }
    ];
    
    activityData = [];
    
    // Generar 15 actividades recientes solo para el usuario actual
    for (let i = 0; i < 15; i++) {
        const activityType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
        const registrationDate = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000); // Última semana
        const activityTime = new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000); // Últimas 24 horas
        
        let description = activityType.descriptions[Math.floor(Math.random() * activityType.descriptions.length)];
        description = description.replace('{records}', (Math.floor(Math.random() * 5000) + 100).toLocaleString());
        description = description.replace('{percentage}', (Math.random() * 20 + 80).toFixed(1));
        
        activityData.push({
            id: i + 1,
            icon: activityType.icon,
            title: activityType.title,
            description: description,
            user: currentUser, // Solo actividades del usuario actual
            registrationDate: registrationDate,
            activityTime: activityTime
        });
    }
    
    // Ordenar por tiempo de actividad más reciente
    activityData.sort((a, b) => b.activityTime - a.activityTime);
    filteredActivityData = [...activityData];
}

function renderActivityTable() {
    const tbody = document.getElementById('activityTableBody');
    if (!tbody) return;
    
    const startIndex = (currentActivityPage - 1) * activityItemsPerPage;
    const endIndex = startIndex + activityItemsPerPage;
    const pageData = filteredActivityData.slice(startIndex, endIndex);
    
    tbody.innerHTML = pageData.map(item => `
        <tr class="activity-row">
            <td class="activity-title-cell">
                <div class="activity-info">
                    <span class="activity-icon">${item.icon}</span>
                    <span class="activity-title">${item.title}</span>
                </div>
            </td>
            <td class="activity-description-cell">${item.description}</td>
            <td class="activity-user-cell">
                <div class="user-info">
                    <span class="user-avatar">👤</span>
                    <span class="user-name">${item.user}</span>
                </div>
            </td>
            <td class="activity-date-cell">
                <div class="date-info">
                    <span class="date-value">${formatActivityDate(item.registrationDate)}</span>
                    <span class="time-value">${formatActivityTime(item.registrationDate)}</span>
                </div>
            </td>
            <td class="activity-time-cell">${getRelativeTime(item.activityTime)}</td>
        </tr>
    `).join('');
    
    updateActivityPagination();
}

function setupActivitySearch() {
    const searchInput = document.getElementById('activitySearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                searchActivity();
            }, 300);
        });
    }
}

function formatActivityDate(date) {
    const today = new Date();
    const diffTime = today - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' });
}

function formatActivityTime(date) {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

function getRelativeTime(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours} h`;
    
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return `Hace ${diffDays} días`;
}

function searchActivity() {
    const searchTerm = document.getElementById('activitySearch')?.value.toLowerCase() || '';
    
    if (searchTerm === '') {
        filteredActivityData = [...activityData];
    } else {
        filteredActivityData = activityData.filter(item => 
            item.title.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            item.user.toLowerCase().includes(searchTerm)
        );
    }
    
    currentActivityPage = 1;
    renderActivityTable();
}

window.changeActivityPage = function(direction) {
    const totalPages = Math.ceil(filteredActivityData.length / activityItemsPerPage);
    const newPage = currentActivityPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentActivityPage = newPage;
        renderActivityTable();
    }
};

function updateActivityPagination() {
    const totalPages = Math.ceil(filteredActivityData.length / activityItemsPerPage);
    const totalItems = filteredActivityData.length;
    const startItem = (currentActivityPage - 1) * activityItemsPerPage + 1;
    const endItem = Math.min(currentActivityPage * activityItemsPerPage, totalItems);
    
    const paginationInfo = document.getElementById('activityPaginationInfo');
    const prevBtn = document.getElementById('activityPrevBtn');
    const nextBtn = document.getElementById('activityNextBtn');
    
    if (paginationInfo) {
        paginationInfo.textContent = `Mostrando ${startItem}-${endItem} de ${totalItems} actividades`;
    }
    
    if (prevBtn) {
        prevBtn.disabled = currentActivityPage === 1;
        prevBtn.title = currentActivityPage === 1 ? 'No hay página anterior' : 'Página anterior de actividades';
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentActivityPage === totalPages || totalPages === 0;
        nextBtn.title = (currentActivityPage === totalPages || totalPages === 0) ? 'No hay más páginas' : 'Página siguiente de actividades';
    }
}

// Funciones para el módulo de IA Predictiva (IMPLEMENTADAS ABAJO)

function loadAvailableModels() {
    const modelSelector = document.querySelector('.model-selector');
    if (!modelSelector) return;
    
    // Generar HTML para todos los modelos entrenados
    const modelsHTML = trainedModels.map((model, index) => `
        <div class="model-card ${index === 0 ? 'active' : ''}" data-model-id="${model.id}">
            <div class="model-header">
                <span class="model-icon">${model.icon}</span>
                <div class="model-info">
                    <h5>${model.name}</h5>
                    <p>${model.algorithm} • Precisión: ${model.accuracy}%</p>
                </div>
                <span class="model-status ${model.status}">${model.status === 'active' ? 'Activo' : 'Disponible'}</span>
            </div>
        </div>
    `).join('');
    
    modelSelector.innerHTML = modelsHTML;
    
    // Agregar event listeners para selección de modelo
    setupModelSelector();
}

window.showIaDashboard = function() {
    document.getElementById('trainModelForm').classList.remove('active');
    document.getElementById('newPredictionForm').classList.remove('active');
    document.getElementById('iaDashboard').classList.add('active');
    
    // Inicializar gráficos de IA Predictiva
    setTimeout(() => {
        updateMLPerformanceChart();
        updatePredictionsChart();
    }, 100);
};

function setupModelSelector() {
    const modelCards = document.querySelectorAll('.model-card');
    modelCards.forEach(card => {
        card.addEventListener('click', function() {
            modelCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

window.startModelTraining = function() {
    const modelName = document.getElementById('modelName')?.value;
    const algorithmType = document.getElementById('algorithmType')?.value;
    const problemType = document.getElementById('problemType')?.value;
    const targetVariable = document.getElementById('targetVariable')?.value;
    
    if (!modelName || !algorithmType || !problemType) {
        alert('⚠️ Por favor completa todos los campos obligatorios');
        return;
    }
    
    // Simular entrenamiento del modelo
    const progress = showTrainingProgress();
    
    setTimeout(() => {
        clearInterval(progress);
        
        // Generar precisión aleatoria
        const accuracy = (85 + Math.random() * 10).toFixed(1);
        
        // Crear nuevo modelo entrenado
        const newModel = {
            id: `model_${Date.now()}`,
            name: modelName,
            algorithm: algorithmType,
            problemType: problemType,
            targetVariable: targetVariable,
            accuracy: parseFloat(accuracy),
            icon: getModelIcon(problemType),
            status: 'active',
            trainedDate: new Date().toISOString().split('T')[0]
        };
        
        // Agregar el modelo a la lista de modelos entrenados
        trainedModels.push(newModel);
        
        alert(`✅ ¡Modelo "${modelName}" entrenado exitosamente!
        
🤖 Algoritmo: ${algorithmType}
📊 Tipo: ${problemType}
🎯 Variable objetivo: ${targetVariable}
📈 Precisión alcanzada: ${accuracy}%

El modelo está listo para generar predicciones.`);
        
        // showIaDashboard(); // COMENTADO TEMPORALMENTE
        
        // Limpiar formulario
        document.getElementById('modelName').value = '';
        document.getElementById('algorithmType').value = '';
        document.getElementById('problemType').value = '';
        document.getElementById('targetVariable').value = '';
        document.getElementById('modelDescription').value = '';
    }, 5000);
};

function showTrainingProgress() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
        }
        
        // En una implementación real, aquí se actualizaría una barra de progreso
        console.log(`Entrenamiento: ${Math.round(progress)}%`);
    }, 200);
    
    return interval;
}

function getModelIcon(problemType) {
    const icons = {
        'regression': '📈',
        'classification': '🎯',
        'clustering': '🔍',
        'forecasting': '🔮',
        'anomaly-detection': '⚠️'
    };
    return icons[problemType] || '🤖';
}

window.generatePrediction = function() {
    const selectedModel = document.querySelector('.model-card.active');
    const predictionDate = document.getElementById('predictionDate')?.value;
    const predictionPeriod = document.getElementById('predictionPeriod')?.value;
    const avgPrice = document.getElementById('avgPrice')?.value;
    const confidenceInterval = document.getElementById('confidenceInterval')?.value;
    
    if (!selectedModel) {
        alert('⚠️ Por favor selecciona un modelo');
        return;
    }
    
    if (!predictionDate || !avgPrice) {
        alert('⚠️ Por favor completa todos los campos obligatorios');
        return;
    }
    
    const modelName = selectedModel.querySelector('h5').textContent;
    
    // Simular generación de predicción
    setTimeout(() => {
        const predictedValue = (parseFloat(avgPrice) * (0.8 + Math.random() * 0.4)).toFixed(2);
        const minValue = (predictedValue * 0.9).toFixed(2);
        const maxValue = (predictedValue * 1.1).toFixed(2);
        
        alert(`🔮 ¡Predicción generada exitosamente!

📊 Modelo utilizado: ${modelName}
📅 Fecha: ${predictionDate}
📈 Período: ${predictionPeriod}

💰 Valor predicho: $${predictedValue}
📉 Rango (${confidenceInterval}%): $${minValue} - $${maxValue}

La predicción ha sido guardada y está disponible en el dashboard.`);
        
        // showIaDashboard(); // COMENTADO TEMPORALMENTE
        
        // Limpiar formulario
        document.getElementById('predictionDate').value = '';
        document.getElementById('avgPrice').value = '';
    }, 2000);
};

// Funciones para manejo de fuente de datos en entrenar modelo
window.selectDataSource = function(sourceType) {
    // Actualizar selección visual
    document.querySelectorAll('.radio-option').forEach(option => {
        option.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    
    // Marcar el radio button
    document.querySelector(`input[value="${sourceType}"]`).checked = true;
    
    // Ocultar todas las configuraciones
    document.querySelectorAll('.source-config').forEach(config => {
        config.style.display = 'none';
    });
    
    // Mostrar configuración específica
    const configId = sourceType + 'SourceConfig';
    const configElement = document.getElementById(configId);
    if (configElement) {
        configElement.style.display = 'block';
        
        // Animar la aparición
        configElement.style.opacity = '0';
        setTimeout(() => {
            configElement.style.opacity = '1';
            configElement.style.transition = 'opacity 0.3s ease';
        }, 10);
    }
    
    // Mostrar mensaje de feedback
    const sourceNames = {
        'file': 'Archivo CSV/Excel',
        'database': 'Base de Datos',
        'api': 'API Externa'
    };
    
    console.log(`✅ Fuente de datos seleccionada: ${sourceNames[sourceType]}`);
};

window.handleFileSelection = function(input) {
    const file = input.files[0];
    const selectedFileName = document.getElementById('selectedFileName');
    
    if (file) {
        const fileSize = (file.size / 1024 / 1024).toFixed(2); // MB
        const maxSize = 50; // MB
        
        if (file.size > maxSize * 1024 * 1024) {
            alert(`⚠️ El archivo es demasiado grande (${fileSize}MB). El tamaño máximo permitido es ${maxSize}MB.`);
            input.value = '';
            selectedFileName.style.display = 'none';
            return;
        }
        
        // Validar tipo de archivo
        const validTypes = ['.csv', '.xlsx', '.xls', '.json'];
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        
        if (!validTypes.includes(fileExtension)) {
            alert(`⚠️ Tipo de archivo no soportado: ${fileExtension}. Tipos permitidos: ${validTypes.join(', ')}`);
            input.value = '';
            selectedFileName.style.display = 'none';
            return;
        }
        
        // Mostrar información del archivo seleccionado
        selectedFileName.innerHTML = `
            <div class="file-info">
                <span class="file-icon">${getFileTypeIcon(fileExtension)}</span>
                <div class="file-details">
                    <strong>${file.name}</strong>
                    <small>${fileSize} MB • ${new Date().toLocaleDateString()}</small>
                </div>
                <button type="button" class="remove-file-btn" onclick="removeSelectedFile()">×</button>
            </div>
        `;
        selectedFileName.style.display = 'block';
        
        console.log(`✅ Archivo seleccionado: ${file.name} (${fileSize}MB)`);
    }
};

function getFileTypeIcon(extension) {
    const icons = {
        '.csv': '📊',
        '.xlsx': '📗',
        '.xls': '📗',
        '.json': '📄'
    };
    return icons[extension] || '📁';
}

window.removeSelectedFile = function() {
    document.getElementById('trainingFile').value = '';
    document.getElementById('selectedFileName').style.display = 'none';
    console.log('📁 Archivo removido');
};

window.testDatabaseConnection = function() {
    const dbType = document.getElementById('databaseType')?.value;
    const dbServer = document.getElementById('dbServer')?.value;
    const dbName = document.getElementById('dbName')?.value;
    const dbUser = document.getElementById('dbUser')?.value;
    
    if (!dbType || !dbServer || !dbName || !dbUser) {
        alert('⚠️ Por favor completa todos los campos obligatorios de la base de datos');
        return;
    }
    
    // Simular prueba de conexión
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '<span>🔄</span> Conectando...';
    button.disabled = true;
    
    setTimeout(() => {
        const success = Math.random() > 0.3; // 70% de éxito
        
        if (success) {
            alert(`✅ ¡Conexión exitosa!
            
🗄️ Tipo: ${dbType.toUpperCase()}
🖥️ Servidor: ${dbServer}
📂 Base de datos: ${dbName}
👤 Usuario: ${dbUser}

La conexión se ha establecido correctamente.`);
        } else {
            alert(`❌ Error de conexión
            
No se pudo conectar a la base de datos. Verifica:
• Que el servidor esté disponible
• Las credenciales sean correctas
• La base de datos exista
• Los permisos de acceso`);
        }
        
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
};

window.testNewApiConnection = function() {
    const apiUrl = document.getElementById('apiUrl')?.value;
    const apiMethod = document.getElementById('apiMethod')?.value;
    const apiFormat = document.getElementById('apiFormat')?.value;
    
    if (!apiUrl) {
        alert('⚠️ Por favor ingresa la URL de la API');
        return;
    }
    
    // Validar URL
    try {
        new URL(apiUrl);
    } catch (e) {
        alert('⚠️ La URL ingresada no es válida');
        return;
    }
    
    // Simular prueba de API
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '<span>🔄</span> Probando...';
    button.disabled = true;
    
    setTimeout(() => {
        const success = Math.random() > 0.25; // 75% de éxito
        
        if (success) {
            const sampleRecords = Math.floor(Math.random() * 5000) + 100;
            alert(`✅ ¡API conectada exitosamente!
            
🔗 URL: ${apiUrl}
📊 Método: ${apiMethod}
📄 Formato: ${apiFormat.toUpperCase()}
📈 Registros disponibles: ~${sampleRecords}

La API está respondiendo correctamente.`);
        } else {
            alert(`❌ Error de conexión con la API
            
Posibles causas:
• URL incorrecta o no accesible
• Problemas de autenticación
• API temporalmente no disponible
• Formato de respuesta incorrecto`);
        }
        
        button.innerHTML = originalText;
        button.disabled = false;
    }, 1500);
};

window.toggleApiAuthFields = function() {
    const authType = document.getElementById('apiAuth')?.value;
    const authFields = document.getElementById('apiAuthFields');
    const apiKeyField = document.getElementById('apiKeyField');
    const bearerTokenField = document.getElementById('bearerTokenField');
    const basicAuthFields = document.getElementById('basicAuthFields');
    
    // Ocultar todos los campos
    [authFields, apiKeyField, bearerTokenField, basicAuthFields].forEach(field => {
        if (field) field.style.display = 'none';
    });
    
    if (authType && authType !== 'none') {
        authFields.style.display = 'block';
        
        switch (authType) {
            case 'apikey':
                apiKeyField.style.display = 'block';
                break;
            case 'bearer':
                bearerTokenField.style.display = 'block';
                break;
            case 'basic':
                basicAuthFields.style.display = 'block';
                break;
        }
    }
};

// Funciones para la actividad reciente del usuario
function generateActivityData() {
    // Solo generar actividades para el usuario actual de la sesión
    const activityTypes = [
        { icon: '📤', title: 'Archivo cargado', descriptions: ['procesado con {records} registros', 'importado exitosamente', 'validado y almacenado'] },
        { icon: '🤖', title: 'Modelo actualizado', descriptions: ['Precisión mejorada al {percentage}%', 'Entrenamiento completado', 'Algoritmo optimizado'] },
        { icon: '📊', title: 'Dashboard exportado', descriptions: ['Reporte enviado a Power BI', 'Datos sincronizados', 'Visualización actualizada'] },
        { icon: '🔔', title: 'Alerta activada', descriptions: ['Anomalía detectada en datos', 'Umbral superado', 'Patrón inusual identificado'] },
        { icon: '⚙️', title: 'Configuración modificada', descriptions: ['Parámetros actualizados', 'Conexión establecida', 'Filtros aplicados'] },
        { icon: '📋', title: 'Análisis creado', descriptions: ['Nuevo proyecto iniciado', 'Template aplicado', 'Configuración guardada'] },
        { icon: '🔄', title: 'Sincronización', descriptions: ['Datos actualizados', 'API conectada', 'Base de datos sincronizada'] },
        { icon: '👥', title: 'Usuario agregado', descriptions: ['Nuevo miembro del equipo', 'Permisos asignados', 'Acceso configurado'] }
    ];
    
    activityData = [];
    
    // Generar 15 actividades recientes solo para el usuario actual
    for (let i = 0; i < 15; i++) {
        const activityType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
        const registrationDate = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000); // Última semana
        const activityTime = new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000); // Últimas 24 horas
        
        let description = activityType.descriptions[Math.floor(Math.random() * activityType.descriptions.length)];
        description = description.replace('{records}', (Math.floor(Math.random() * 5000) + 100).toLocaleString());
        description = description.replace('{percentage}', (Math.random() * 20 + 80).toFixed(1));
        
        activityData.push({
            id: i + 1,
            icon: activityType.icon,
            title: activityType.title,
            description: description,
            user: currentUser, // Solo actividades del usuario actual
            registrationDate: registrationDate,
            activityTime: activityTime
        });
    }
    
    // Ordenar por tiempo de actividad más reciente
    activityData.sort((a, b) => b.activityTime - a.activityTime);
    filteredActivityData = [...activityData];
}

function setupActivityTable() {
    generateActivityData();
    renderActivityTable();
    setupActivitySearch();
}

// Función para refrescar actividad cuando cambie el usuario (uso futuro)
function refreshUserActivity() {
    generateActivityData();
    renderActivityTable();
    // Actualizar el título con el nombre del usuario actual
    const activityTitle = document.querySelector('.chart-title');
    if (activityTitle && activityTitle.textContent.includes('Mi Actividad')) {
        activityTitle.textContent = `Mi Actividad Reciente`;
    }
}

function renderActivityTable() {
    const tbody = document.getElementById('activityTableBody');
    if (!tbody) return;
    
    const startIndex = (currentActivityPage - 1) * activityItemsPerPage;
    const endIndex = startIndex + activityItemsPerPage;
    const pageData = filteredActivityData.slice(startIndex, endIndex);
    
    tbody.innerHTML = pageData.map(item => `
        <tr class="activity-row">
            <td class="activity-title-cell">
                <div class="activity-info">
                    <span class="activity-icon">${item.icon}</span>
                    <span class="activity-title">${item.title}</span>
                </div>
            </td>
            <td class="activity-description-cell">${item.description}</td>
            <td class="activity-user-cell">
                <div class="user-info">
                    <span class="user-avatar">👤</span>
                    <span class="user-name">${item.user}</span>
                </div>
            </td>
            <td class="activity-date-cell">
                <div class="date-info">
                    <span class="date-value">${formatActivityDate(item.registrationDate)}</span>
                    <span class="time-value">${formatActivityTime(item.registrationDate)}</span>
                </div>
            </td>
            <td class="activity-time-cell">${getRelativeTime(item.activityTime)}</td>
        </tr>
    `).join('');
    
    updateActivityPagination();
}

function formatActivityDate(date) {
    const today = new Date();
    const diffTime = today - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' });
}

function formatActivityTime(date) {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

function getRelativeTime(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours} h`;
    
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return `Hace ${diffDays} días`;
}

function setupActivitySearch() {
    const searchInput = document.getElementById('activitySearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                searchActivity();
            }, 300);
        });
    }
}

function searchActivity() {
    const searchTerm = document.getElementById('activitySearch')?.value.toLowerCase() || '';
    
    if (searchTerm === '') {
        filteredActivityData = [...activityData];
    } else {
        filteredActivityData = activityData.filter(item => 
            item.title.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            item.user.toLowerCase().includes(searchTerm)
        );
    }
    
    currentActivityPage = 1;
    renderActivityTable();
}

window.changeActivityPage = function(direction) {
    const totalPages = Math.ceil(filteredActivityData.length / activityItemsPerPage);
    const newPage = currentActivityPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentActivityPage = newPage;
        renderActivityTable();
    }
};

function updateActivityPagination() {
    const totalPages = Math.ceil(filteredActivityData.length / activityItemsPerPage);
    const totalItems = filteredActivityData.length;
    const startItem = (currentActivityPage - 1) * activityItemsPerPage + 1;
    const endItem = Math.min(currentActivityPage * activityItemsPerPage, totalItems);
    
    const paginationInfo = document.getElementById('activityPaginationInfo');
    const prevBtn = document.getElementById('activityPrevBtn');
    const nextBtn = document.getElementById('activityNextBtn');
    
    if (paginationInfo) {
        paginationInfo.textContent = `Mostrando ${startItem}-${endItem} de ${totalItems} actividades`;
    }
    
    if (prevBtn) {
        prevBtn.disabled = currentActivityPage === 1;
        prevBtn.title = currentActivityPage === 1 ? 'No hay página anterior' : 'Página anterior de actividades';
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentActivityPage === totalPages || totalPages === 0;
        nextBtn.title = (currentActivityPage === totalPages || totalPages === 0) ? 'No hay más páginas' : 'Página siguiente de actividades';
    }
}

window.toggleUploadMethod = function(method) {
    // Cambiar tabs activos
    document.querySelectorAll('.method-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-method="${method}"]`).classList.add('active');
    
    // Cambiar secciones activas
    document.querySelectorAll('.upload-section').forEach(section => {
        section.classList.remove('active');
    });
    
    if (method === 'file') {
        document.getElementById('fileUploadSection').classList.add('active');
    } else {
        document.getElementById('apiUploadSection').classList.add('active');
    }
};

// Variables para archivos mejoradas
let uploadedFiles = [];

// Funciones para drag & drop mejoradas
window.setupDragDrop = function() {
    const dropZone = document.getElementById('dragDropZone');
    if (!dropZone) return;
    
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleFileDrop);
    
    // Input de archivos
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileInput);
    }
};

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
}

function handleFileDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    const files = Array.from(e.dataTransfer.files);
    processSelectedFiles(files);
}

function handleFileInput(e) {
    const files = Array.from(e.target.files);
    processSelectedFiles(files);
}

function processSelectedFiles(files) {
    const validFiles = files.filter(file => {
        const validTypes = ['.csv', '.xlsx', '.xls', '.json'];
        const extension = '.' + file.name.split('.').pop().toLowerCase();
        const validSize = file.size <= 50 * 1024 * 1024; // 50MB
        
        if (!validTypes.includes(extension)) {
            alert(`⚠️ Archivo no soportado: ${file.name}\\nTipos permitidos: CSV, Excel, JSON`);
            return false;
        }
        
        if (!validSize) {
            alert(`⚠️ Archivo muy grande: ${file.name}\\nTamaño máximo: 50MB`);
            return false;
        }
        
        return true;
    });
    
    uploadedFiles = [...uploadedFiles, ...validFiles];
    updateFileDisplay();
    updateUploadButton();
}

function updateFileDisplay() {
    const filesList = document.getElementById('selectedFilesList');
    const fileItems = document.getElementById('fileItems');
    
    if (uploadedFiles.length === 0) {
        filesList.style.display = 'none';
        return;
    }
    
    filesList.style.display = 'block';
    fileItems.innerHTML = uploadedFiles.map((file, index) => `
        <div class="file-item">
            <div class="file-info">
                <div class="file-icon">${getFileIcon(file.name)}</div>
                <div class="file-details">
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${formatFileSize(file.size)}</div>
                </div>
            </div>
            <button class="file-remove" onclick="removeUploadedFile(${index})">🗑️</button>
        </div>
    `).join('');
}

window.removeUploadedFile = function(index) {
    uploadedFiles.splice(index, 1);
    updateFileDisplay();
    updateUploadButton();
};

function updateUploadButton() {
    const uploadBtn = document.getElementById('uploadFilesBtn');
    if (uploadBtn) {
        uploadBtn.disabled = uploadedFiles.length === 0;
    }
}

window.clearFileSelection = function() {
    uploadedFiles = [];
    updateFileDisplay();
    updateUploadButton();
    
    const fileInput = document.getElementById('fileInput');
    if (fileInput) fileInput.value = '';
};

window.processFiles = function() {
    if (uploadedFiles.length === 0) {
        alert('⚠️ No has seleccionado ningún archivo');
        return;
    }
    
    const config = {
        delimiter: document.getElementById('delimiter')?.value || ',',
        encoding: document.getElementById('encoding')?.value || 'utf-8',
        hasHeaders: document.getElementById('hasHeaders')?.checked || true,
        skipRows: parseInt(document.getElementById('skipRows')?.value) || 0
    };
    
    showUploadProgress();
    simulateFileProcessing(config);
};

function showUploadProgress() {
    const progressContainer = document.getElementById('uploadProgress');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const progressPercent = document.getElementById('progressPercent');
    
    progressContainer.style.display = 'block';
    document.getElementById('uploadFilesBtn').disabled = true;
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            progressFill.style.width = '100%';
            progressText.textContent = '¡Procesamiento completado!';
            progressPercent.textContent = '100%';
            
            setTimeout(() => {
                alert(`✅ ¡Archivos procesados exitosamente!\\n\\n${uploadedFiles.length} archivo(s) cargado(s)\\nRegistros procesados: ${Math.floor(Math.random() * 5000) + 1000}`);
                resetUploadProcess();
            }, 1000);
        } else {
            progressFill.style.width = progress + '%';
            progressText.textContent = `Procesando archivos...`;
            progressPercent.textContent = `${Math.round(progress)}%`;
        }
    }, 300);
}

function simulateFileProcessing(config) {
    console.log('Procesando archivos con configuración:', config);
    console.log('Archivos a procesar:', uploadedFiles.map(f => f.name));
}

function resetUploadProcess() {
    document.getElementById('uploadProgress').style.display = 'none';
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('uploadFilesBtn').disabled = false;
    clearFileSelection();
}

// Funciones para API
window.toggleAuthFields = function() {
    const authType = document.getElementById('authType')?.value;
    const authFields = document.getElementById('authFields');
    const tokenField = document.getElementById('tokenField');
    const apiKeyField = document.getElementById('apiKeyField');
    const basicAuthFields = document.getElementById('basicAuthFields');
    
    // Ocultar todos los campos
    [authFields, tokenField, apiKeyField, basicAuthFields].forEach(field => {
        if (field) field.style.display = 'none';
    });
    
    if (authType && authType !== 'none') {
        authFields.style.display = 'block';
        
        switch (authType) {
            case 'bearer':
                tokenField.style.display = 'block';
                break;
            case 'apikey':
                apiKeyField.style.display = 'block';
                break;
            case 'basic':
                basicAuthFields.style.display = 'block';
                break;
        }
    }
};

window.addHeaderRow = function() {
    const container = document.getElementById('headersContainer');
    const newRow = document.createElement('div');
    newRow.className = 'header-row';
    newRow.innerHTML = `
        <input type="text" placeholder="Nombre del header" class="form-control header-key">
        <input type="text" placeholder="Valor" class="form-control header-value">
        <button class="btn-icon" onclick="removeHeaderRow(this)">×</button>
    `;
    container.appendChild(newRow);
};

window.removeHeaderRow = function(button) {
    button.parentElement.remove();
};

window.testConnection = function() {
    const url = document.getElementById('apiUrl')?.value;
    if (!url) {
        alert('⚠️ Por favor ingresa una URL válida');
        return;
    }
    
    showConnectionStatus('testing', 'Probando conexión...');
    
    // Simular prueba de conexión
    setTimeout(() => {
        const success = Math.random() > 0.3; // 70% de éxito
        if (success) {
            showConnectionStatus('success', '✅ Conexión exitosa');
        } else {
            showConnectionStatus('error', '❌ Error de conexión');
        }
    }, 2000);
};

window.connectAPI = function() {
    const url = document.getElementById('apiUrl')?.value;
    if (!url) {
        alert('⚠️ Por favor completa la configuración de la API');
        return;
    }
    
    const config = {
        url: url,
        method: document.getElementById('apiMethod')?.value || 'GET',
        authType: document.getElementById('authType')?.value || 'none',
        dataPath: document.getElementById('dataPath')?.value || '',
        syncInterval: document.getElementById('syncInterval')?.checked || false,
        intervalTime: parseInt(document.getElementById('intervalTime')?.value) || 60
    };
    
    showConnectionStatus('connecting', 'Conectando y obteniendo datos...');
    
    // Simular conexión API
    setTimeout(() => {
        const recordCount = Math.floor(Math.random() * 2000) + 500;
        showConnectionStatus('success', `✅ Datos importados: ${recordCount} registros`);
        alert(`✅ ¡Conexión API exitosa!\n\nRegistros importados: ${recordCount}\nURL: ${url}\nMétodo: ${config.method}`);
    }, 3000);
};

function showConnectionStatus(type, message) {
    const statusContainer = document.getElementById('connectionStatus');
    const statusIcon = document.getElementById('statusIcon');
    const statusText = document.getElementById('statusText');
    
    statusContainer.style.display = 'block';
    statusText.textContent = message;
    
    switch (type) {
        case 'testing':
        case 'connecting':
            statusIcon.textContent = '🔄';
            statusContainer.className = 'connection-status loading';
            break;
        case 'success':
            statusIcon.textContent = '✅';
            statusContainer.className = 'connection-status success';
            break;
        case 'error':
            statusIcon.textContent = '❌';
            statusContainer.className = 'connection-status error';
            break;
    }
    
    if (type === 'success' || type === 'error') {
        setTimeout(() => {
            statusContainer.style.display = 'none';
        }, 3000);
    }
}

// Funciones para el wizard de análisis
function setupAnalysisWizard() {
    // Siempre resetear cuando se abre el wizard desde el menú
    currentAnalysisStep = 1;
    analysisConfig = {
        type: '',
        dataSource: '',
        name: '',
        description: '',
        category: '',
        options: {}
    };
    
    // Asegurar que el primer paso esté visible
    document.querySelectorAll('[id^="analysisStep"]').forEach(step => {
        step.classList.remove('active');
    });
    const firstStep = document.getElementById('analysisStep1');
    if (firstStep) {
        firstStep.classList.add('active');
    }
    
    // Resetear indicadores de paso
    document.querySelectorAll('[data-step]').forEach(indicator => {
        indicator.classList.remove('active', 'completed');
    });
    const firstIndicator = document.querySelector('[data-step="1"]');
    if (firstIndicator) {
        firstIndicator.classList.add('active');
    }
    
    // Configurar event listeners y datos
    setupAnalysisTypeSelection();
    loadAvailableDatasets();
    loadActiveConnections();
    updateAnalysisNavigation();
    
    console.log('Setup wizard - Reset to step 1, Config:', analysisConfig);
}

function setupAnalysisTypeSelection() {
    const typeCards = document.querySelectorAll('.analysis-type-card');
    typeCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            typeCards.forEach(c => c.classList.remove('selected'));
            
            // Add active class to clicked card
            this.classList.add('selected');
            
            // Store selected type
            analysisConfig.type = this.getAttribute('data-type');
            
            // Enable next button
            updateAnalysisNavigation();
        });
    });
}

// Variables para datasets y conexiones con paginación
let allDatasets = [];
let filteredDatasets = [];
let currentDatasetPage = 1;
let datasetsPerPage = 6;

let allConnections = [];
let filteredConnections = [];
let currentConnectionPage = 1;
let connectionsPerPage = 4;

function loadAvailableDatasets() {
    // Datos de ejemplo con más información
    allDatasets = [
        { 
            name: 'ventas_q1_2024.xlsx', 
            records: 15420, 
            lastModified: new Date('2024-12-10T14:30:00'),
            type: 'xlsx',
            user: 'Ana Martínez',
            loadDate: new Date('2024-12-10T14:30:00')
        },
        { 
            name: 'clientes_data.csv', 
            records: 8250, 
            lastModified: new Date('2024-12-09T09:15:00'),
            type: 'csv',
            user: 'Juan Pérez',
            loadDate: new Date('2024-12-09T09:15:00')
        },
        { 
            name: 'inventario.json', 
            records: 3180, 
            lastModified: new Date('2024-12-07T16:45:00'),
            type: 'json',
            user: 'María García',
            loadDate: new Date('2024-12-07T16:45:00')
        },
        { 
            name: 'marketing_campaigns.xlsx', 
            records: 6750, 
            lastModified: new Date('2024-12-05T11:20:00'),
            type: 'xlsx',
            user: 'Carlos López',
            loadDate: new Date('2024-12-05T11:20:00')
        },
        { 
            name: 'productos_catalogo.csv', 
            records: 2890, 
            lastModified: new Date('2024-12-04T13:10:00'),
            type: 'csv',
            user: 'Ana Martínez',
            loadDate: new Date('2024-12-04T13:10:00')
        },
        { 
            name: 'empleados_data.xlsx', 
            records: 450, 
            lastModified: new Date('2024-12-03T10:30:00'),
            type: 'xlsx',
            user: 'Juan Pérez',
            loadDate: new Date('2024-12-03T10:30:00')
        },
        { 
            name: 'finanzas_q4.json', 
            records: 1250, 
            lastModified: new Date('2024-12-02T15:45:00'),
            type: 'json',
            user: 'María García',
            loadDate: new Date('2024-12-02T15:45:00')
        },
        { 
            name: 'proyectos_estado.csv', 
            records: 820, 
            lastModified: new Date('2024-12-01T12:20:00'),
            type: 'csv',
            user: 'Carlos López',
            loadDate: new Date('2024-12-01T12:20:00')
        },
        { 
            name: 'feedback_clientes.xlsx', 
            records: 4350, 
            lastModified: new Date('2024-11-30T14:15:00'),
            type: 'xlsx',
            user: 'Ana Martínez',
            loadDate: new Date('2024-11-30T14:15:00')
        },
        { 
            name: 'analytics_web.json', 
            records: 12670, 
            lastModified: new Date('2024-11-29T16:30:00'),
            type: 'json',
            user: 'Juan Pérez',
            loadDate: new Date('2024-11-29T16:30:00')
        }
    ];
    
    // Ordenar por fecha de carga (más reciente primero)
    allDatasets.sort((a, b) => b.loadDate - a.loadDate);
    
    filteredDatasets = [...allDatasets];
    renderDatasets();
}

function loadActiveConnections() {
    // Datos de ejemplo con más información
    allConnections = [
        { 
            name: 'Salesforce API', 
            status: 'Conectado', 
            records: 25340, 
            lastSync: new Date('2024-12-10T15:30:00'),
            user: 'Ana Martínez',
            loadDate: new Date('2024-12-08T10:15:00')
        },
        { 
            name: 'Google Analytics API', 
            status: 'Conectado', 
            records: 45670, 
            lastSync: new Date('2024-12-10T13:45:00'),
            user: 'Juan Pérez',
            loadDate: new Date('2024-12-07T14:30:00')
        },
        { 
            name: 'HubSpot CRM API', 
            status: 'Sincronizando', 
            records: 18920, 
            lastSync: new Date('2024-12-10T15:25:00'),
            user: 'María García',
            loadDate: new Date('2024-12-06T11:20:00')
        },
        { 
            name: 'Shopify Store API', 
            status: 'Conectado', 
            records: 8750, 
            lastSync: new Date('2024-12-10T12:15:00'),
            user: 'Carlos López',
            loadDate: new Date('2024-12-05T16:45:00')
        },
        { 
            name: 'Stripe Payments API', 
            status: 'Conectado', 
            records: 12450, 
            lastSync: new Date('2024-12-10T11:30:00'),
            user: 'Ana Martínez',
            loadDate: new Date('2024-12-04T09:30:00')
        },
        { 
            name: 'Zendesk Support API', 
            status: 'Conectado', 
            records: 3280, 
            lastSync: new Date('2024-12-10T10:45:00'),
            user: 'Juan Pérez',
            loadDate: new Date('2024-12-03T13:15:00')
        },
        { 
            name: 'Microsoft 365 API', 
            status: 'Conectado', 
            records: 6890, 
            lastSync: new Date('2024-12-10T09:20:00'),
            user: 'María García',
            loadDate: new Date('2024-12-02T15:45:00')
        }
    ];
    
    // Ordenar por fecha de carga (más reciente primero)
    allConnections.sort((a, b) => b.loadDate - a.loadDate);
    
    filteredConnections = [...allConnections];
    renderConnections();
}

function renderDatasets() {
    const container = document.getElementById('availableDatasets');
    const countElement = document.getElementById('datasetsCount');
    
    if (!container) return;
    
    const startIndex = (currentDatasetPage - 1) * datasetsPerPage;
    const endIndex = startIndex + datasetsPerPage;
    const pageData = filteredDatasets.slice(startIndex, endIndex);
    
    // Actualizar contador
    if (countElement) {
        countElement.textContent = `Mostrando ${Math.min(startIndex + 1, filteredDatasets.length)}-${Math.min(endIndex, filteredDatasets.length)} de ${filteredDatasets.length} datasets`;
    }
    
    container.innerHTML = pageData.map(dataset => `
        <div class="dataset-card" data-dataset="${dataset.name}">
            <div class="dataset-icon">${getFileIcon(dataset.name)}</div>
            <div class="dataset-info">
                <div class="dataset-name">${dataset.name}</div>
                <div class="dataset-meta">
                    <div class="dataset-records">${dataset.records.toLocaleString()} registros</div>
                    <div class="dataset-user">👤 ${dataset.user}</div>
                    <div class="dataset-modified">📅 ${formatRelativeDate(dataset.loadDate)}</div>
                </div>
            </div>
            <div class="dataset-select">
                <input type="radio" name="dataSource" value="${dataset.name}" id="dataset_${dataset.name.replace(/[^a-zA-Z0-9]/g, '_')}">
            </div>
        </div>
    `).join('');
    
    // Add event listeners
    setupDatasetEventListeners();
    updateDatasetPagination();
}

function renderConnections() {
    const container = document.getElementById('activeConnections');
    const countElement = document.getElementById('connectionsCount');
    
    if (!container) return;
    
    const startIndex = (currentConnectionPage - 1) * connectionsPerPage;
    const endIndex = startIndex + connectionsPerPage;
    const pageData = filteredConnections.slice(startIndex, endIndex);
    
    // Actualizar contador
    if (countElement) {
        countElement.textContent = `Mostrando ${Math.min(startIndex + 1, filteredConnections.length)}-${Math.min(endIndex, filteredConnections.length)} de ${filteredConnections.length} conexiones`;
    }
    
    container.innerHTML = pageData.map(conn => `
        <div class="connection-card" data-connection="${conn.name}">
            <div class="connection-icon">🔗</div>
            <div class="connection-info">
                <div class="connection-name">${conn.name}</div>
                <div class="connection-meta">
                    <div class="connection-status ${conn.status.toLowerCase().replace(' ', '-')}">${conn.status}</div>
                    <div class="connection-records">${conn.records.toLocaleString()} registros</div>
                    <div class="connection-user">👤 ${conn.user}</div>
                    <div class="connection-sync">📅 ${formatRelativeDate(conn.loadDate)}</div>
                </div>
            </div>
            <div class="connection-select">
                <input type="radio" name="dataSource" value="${conn.name}" id="conn_${conn.name.replace(/[^a-zA-Z0-9]/g, '_')}">
            </div>
        </div>
    `).join('');
    
    // Add event listeners
    setupConnectionEventListeners();
    updateConnectionPagination();
}

function setupDatasetEventListeners() {
    const datasetCards = document.querySelectorAll('.dataset-card');
    datasetCards.forEach(card => {
        card.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            
            // Remove active class from all cards
            datasetCards.forEach(c => c.classList.remove('selected'));
            // Remove active class from connection cards too
            document.querySelectorAll('.connection-card').forEach(c => c.classList.remove('selected'));
            
            this.classList.add('selected');
            analysisConfig.dataSource = this.getAttribute('data-dataset');
            updateAnalysisNavigation();
        });
    });
}

function setupConnectionEventListeners() {
    const connectionCards = document.querySelectorAll('.connection-card');
    connectionCards.forEach(card => {
        card.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            
            // Remove active class from all cards
            connectionCards.forEach(c => c.classList.remove('selected'));
            // Remove active class from dataset cards too
            document.querySelectorAll('.dataset-card').forEach(c => c.classList.remove('selected'));
            
            this.classList.add('selected');
            analysisConfig.dataSource = this.getAttribute('data-connection');
            updateAnalysisNavigation();
        });
    });
}

// Funciones de búsqueda
window.searchDatasets = function() {
    const searchTerm = document.getElementById('datasetSearch').value.toLowerCase();
    
    filteredDatasets = allDatasets.filter(dataset => 
        dataset.name.toLowerCase().includes(searchTerm) ||
        dataset.user.toLowerCase().includes(searchTerm)
    );
    
    currentDatasetPage = 1;
    renderDatasets();
};

window.searchConnections = function() {
    const searchTerm = document.getElementById('connectionSearch').value.toLowerCase();
    
    filteredConnections = allConnections.filter(connection => 
        connection.name.toLowerCase().includes(searchTerm) ||
        connection.user.toLowerCase().includes(searchTerm)
    );
    
    currentConnectionPage = 1;
    renderConnections();
};

// Funciones de paginación
window.changeDatasetPage = function(direction) {
    const totalPages = Math.ceil(filteredDatasets.length / datasetsPerPage);
    const newPage = currentDatasetPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentDatasetPage = newPage;
        renderDatasets();
    }
};

window.changeConnectionPage = function(direction) {
    const totalPages = Math.ceil(filteredConnections.length / connectionsPerPage);
    const newPage = currentConnectionPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentConnectionPage = newPage;
        renderConnections();
    }
};

function updateDatasetPagination() {
    const totalPages = Math.ceil(filteredDatasets.length / datasetsPerPage);
    const pageInfo = document.getElementById('datasetPageInfo');
    const prevBtn = document.getElementById('datasetPrevBtn');
    const nextBtn = document.getElementById('datasetNextBtn');
    
    if (pageInfo) {
        pageInfo.textContent = `Página ${currentDatasetPage} de ${totalPages}`;
    }
    
    if (prevBtn) {
        prevBtn.disabled = currentDatasetPage === 1;
        prevBtn.title = currentDatasetPage === 1 ? 'No hay página anterior' : 'Página anterior de datasets';
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentDatasetPage === totalPages || totalPages === 0;
        nextBtn.title = (currentDatasetPage === totalPages || totalPages === 0) ? 'No hay más páginas' : 'Página siguiente de datasets';
    }
}

function updateConnectionPagination() {
    const totalPages = Math.ceil(filteredConnections.length / connectionsPerPage);
    const pageInfo = document.getElementById('connectionPageInfo');
    const prevBtn = document.getElementById('connectionPrevBtn');
    const nextBtn = document.getElementById('connectionNextBtn');
    
    if (pageInfo) {
        pageInfo.textContent = `Página ${currentConnectionPage} de ${totalPages}`;
    }
    
    if (prevBtn) {
        prevBtn.disabled = currentConnectionPage === 1;
        prevBtn.title = currentConnectionPage === 1 ? 'No hay página anterior' : 'Página anterior de conexiones';
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentConnectionPage === totalPages || totalPages === 0;
        nextBtn.title = (currentConnectionPage === totalPages || totalPages === 0) ? 'No hay más páginas' : 'Página siguiente de conexiones';
    }
}

function formatRelativeDate(date) {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
        return 'Hace menos de 1 hora';
    } else if (diffInHours < 24) {
        return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    } else {
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) {
            return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
        } else {
            return date.toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
        }
    }
}

window.nextAnalysisStep = function() {
    if (currentAnalysisStep < totalAnalysisSteps) {
        // Validate current step
        if (!validateCurrentStep()) {
            return;
        }
        
        // Save current step data
        saveCurrentStepData();
        
        // Hide current step
        document.getElementById(`analysisStep${currentAnalysisStep}`).classList.remove('active');
        document.querySelector(`[data-step="${currentAnalysisStep}"]`).classList.remove('active');
        document.querySelector(`[data-step="${currentAnalysisStep}"]`).classList.add('completed');
        
        // Show next step
        currentAnalysisStep++;
        document.getElementById(`analysisStep${currentAnalysisStep}`).classList.add('active');
        document.querySelector(`[data-step="${currentAnalysisStep}"]`).classList.add('active');
        
        // Load step-specific configuration
        if (currentAnalysisStep === 3) {
            loadAnalysisSpecificConfig();
        } else if (currentAnalysisStep === 4) {
            loadReviewData();
        }
        
        updateAnalysisNavigation();
    } else {
        // Create analysis
        createNewAnalysis();
    }
};

window.previousAnalysisStep = function() {
    if (currentAnalysisStep > 1) {
        // Hide current step
        document.getElementById(`analysisStep${currentAnalysisStep}`).classList.remove('active');
        document.querySelector(`[data-step="${currentAnalysisStep}"]`).classList.remove('active');
        
        // Show previous step
        currentAnalysisStep--;
        document.getElementById(`analysisStep${currentAnalysisStep}`).classList.add('active');
        document.querySelector(`[data-step="${currentAnalysisStep}"]`).classList.add('active');
        document.querySelector(`[data-step="${currentAnalysisStep}"]`).classList.remove('completed');
        
        updateAnalysisNavigation();
    }
};

function validateCurrentStep() {
    console.log('Validating step:', currentAnalysisStep);
    
    switch (currentAnalysisStep) {
        case 1:
            if (!analysisConfig.type) {
                alert('⚠️ Por favor selecciona un tipo de análisis');
                return false;
            }
            break;
        case 2:
            if (!analysisConfig.dataSource) {
                alert('⚠️ Por favor selecciona una fuente de datos');
                return false;
            }
            break;
        case 3:
            // Buscar el elemento de forma más robusta
            const currentStepElement = document.getElementById(`analysisStep${currentAnalysisStep}`);
            const nameElement = currentStepElement?.querySelector('#analysisName') || 
                               document.querySelector('#analysisStep3 #analysisName') ||
                               document.querySelector('input[id="analysisName"]');
            
            console.log('Step 3 validation:');
            console.log('Current step element:', currentStepElement);
            console.log('Name element found:', nameElement);
            console.log('Current step visible:', currentStepElement?.classList.contains('active'));
            
            if (!nameElement) {
                console.error('analysisName element not found!');
                // Intentar encontrar cualquier input de nombre en el wizard activo
                const alternativeInput = document.querySelector('#analysisStep3.active input[placeholder*="Análisis"]');
                if (alternativeInput) {
                    console.log('Found alternative input:', alternativeInput);
                    const altValue = alternativeInput.value;
                    if (!altValue || altValue.trim() === '') {
                        alert('⚠️ Por favor ingresa un nombre para el análisis');
                        alternativeInput.focus();
                        return false;
                    }
                    return true;
                }
                alert('⚠️ Error: No se puede encontrar el campo de nombre del análisis');
                return false;
            }
            
            const name = nameElement.value;
            console.log('Name value:', name);
            console.log('Name length:', name?.length);
            console.log('Name trimmed:', name?.trim());
            
            if (!name || name.trim() === '') {
                alert('⚠️ Por favor ingresa un nombre para el análisis');
                nameElement.focus(); // Enfocar el campo para ayudar al usuario
                return false;
            }
            break;
    }
    return true;
}

function saveCurrentStepData() {
    if (currentAnalysisStep === 3) {
        // Buscar elementos de forma más robusta
        const currentStepElement = document.getElementById(`analysisStep${currentAnalysisStep}`);
        const nameElement = currentStepElement?.querySelector('#analysisName') || 
                           document.querySelector('#analysisStep3 #analysisName') ||
                           document.querySelector('input[id="analysisName"]');
        const descElement = currentStepElement?.querySelector('#analysisDescription') || 
                           document.getElementById('analysisDescription');
        const categoryElement = currentStepElement?.querySelector('#analysisCategory') || 
                               document.getElementById('analysisCategory');
        
        analysisConfig.name = nameElement?.value || '';
        analysisConfig.description = descElement?.value || '';
        analysisConfig.category = categoryElement?.value || '';
        
        analysisConfig.options = {
            autoML: document.getElementById('autoML')?.checked || false,
            realTimeUpdate: document.getElementById('realTimeUpdate')?.checked || false,
            generateReport: document.getElementById('generateReport')?.checked || false,
            notifyCompletion: document.getElementById('notifyCompletion')?.checked || false
        };
        
        console.log('Saved analysis config:', analysisConfig);
    }
}

function loadAnalysisSpecificConfig() {
    const configContainer = document.getElementById('analysisSpecificConfig');
    if (!configContainer) return;
    
    const typeConfigs = {
        'descriptivo': `
            <h4>📈 Configuración de análisis descriptivo</h4>
            <div class="type-specific-options">
                <div class="option-group">
                    <label class="checkbox-label">
                        <input type="checkbox" id="includeOutliers" checked>
                        <span class="checkmark"></span>
                        Incluir detección de valores atípicos
                    </label>
                </div>
                <div class="option-group">
                    <label class="checkbox-label">
                        <input type="checkbox" id="generateCharts" checked>
                        <span class="checkmark"></span>
                        Generar gráficos automáticamente
                    </label>
                </div>
                <div class="form-group">
                    <label for="confidenceLevel">Nivel de confianza</label>
                    <select id="confidenceLevel" class="form-select">
                        <option value="90">90%</option>
                        <option value="95" selected>95%</option>
                        <option value="99">99%</option>
                    </select>
                </div>
            </div>
        `,
        'predictivo': `
            <h4>🔮 Configuración de análisis predictivo</h4>
            <div class="type-specific-options">
                <div class="form-group">
                    <label for="targetVariable">Variable objetivo</label>
                    <select id="targetVariable" class="form-select">
                        <option value="">Selecciona la variable a predecir</option>
                        <option value="ventas">Ventas</option>
                        <option value="conversiones">Conversiones</option>
                        <option value="churn">Churn</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="modelType">Tipo de modelo</label>
                    <select id="modelType" class="form-select">
                        <option value="auto">Automático (recomendado)</option>
                        <option value="linear">Regresión Lineal</option>
                        <option value="rf">Random Forest</option>
                        <option value="xgboost">XGBoost</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="trainingSplit">División de entrenamiento</label>
                    <select id="trainingSplit" class="form-select">
                        <option value="70">70% entrenamiento / 30% prueba</option>
                        <option value="80" selected>80% entrenamiento / 20% prueba</option>
                        <option value="90">90% entrenamiento / 10% prueba</option>
                    </select>
                </div>
            </div>
        `,
        'comparativo': `
            <h4>⚖️ Configuración de análisis comparativo</h4>
            <div class="type-specific-options">
                <div class="form-group">
                    <label for="comparisonType">Tipo de comparación</label>
                    <select id="comparisonType" class="form-select">
                        <option value="groups">Entre grupos</option>
                        <option value="periods">Entre períodos</option>
                        <option value="segments">Entre segmentos</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="statisticalTest">Prueba estadística</label>
                    <select id="statisticalTest" class="form-select">
                        <option value="auto">Automática</option>
                        <option value="ttest">T-Test</option>
                        <option value="anova">ANOVA</option>
                        <option value="chisquare">Chi-cuadrado</option>
                    </select>
                </div>
            </div>
        `
    };
    
    configContainer.innerHTML = typeConfigs[analysisConfig.type] || '<p>Configuración específica no disponible.</p>';
}

function loadReviewData() {
    // Review analysis type
    const typeLabels = {
        'descriptivo': 'Análisis Descriptivo',
        'predictivo': 'Análisis Predictivo',
        'comparativo': 'Análisis Comparativo',
        'tendencias': 'Análisis de Tendencias',
        'correlacion': 'Análisis de Correlación',
        'personalizado': 'Análisis Personalizado'
    };
    
    document.getElementById('reviewAnalysisType').innerHTML = `
        <div class="review-item">
            <strong>${typeLabels[analysisConfig.type] || analysisConfig.type}</strong>
        </div>
    `;
    
    // Review data source
    document.getElementById('reviewDataSource').innerHTML = `
        <div class="review-item">
            <strong>${analysisConfig.dataSource}</strong>
        </div>
    `;
    
    // Review configuration
    const optionsText = Object.entries(analysisConfig.options)
        .filter(([key, value]) => value)
        .map(([key, value]) => {
            const labels = {
                autoML: 'AutoML activado',
                realTimeUpdate: 'Actualización en tiempo real',
                generateReport: 'Reporte automático',
                notifyCompletion: 'Notificaciones activas'
            };
            return labels[key] || key;
        }).join(', ');
    
    document.getElementById('reviewConfiguration').innerHTML = `
        <div class="review-item">
            <div><strong>Nombre:</strong> ${analysisConfig.name}</div>
            <div><strong>Categoría:</strong> ${analysisConfig.category || 'No especificada'}</div>
            <div><strong>Opciones:</strong> ${optionsText || 'Configuración básica'}</div>
        </div>
    `;
    
    // Update estimated time based on complexity
    const timeEstimates = {
        'descriptivo': '3-5 minutos',
        'predictivo': '10-20 minutos',
        'comparativo': '5-10 minutos',
        'tendencias': '8-15 minutos',
        'correlacion': '5-8 minutos',
        'personalizado': '10-30 minutos'
    };
    
    document.getElementById('estimatedTime').textContent = timeEstimates[analysisConfig.type] || '5-10 minutos';
}

function updateAnalysisNavigation() {
    const prevBtn = document.getElementById('prevStepBtn');
    const nextBtn = document.getElementById('nextStepBtn');
    
    if (prevBtn) {
        prevBtn.disabled = currentAnalysisStep === 1;
    }
    
    if (nextBtn) {
        if (currentAnalysisStep === totalAnalysisSteps) {
            nextBtn.innerHTML = '🚀 Crear Análisis';
            nextBtn.classList.add('create');
        } else {
            nextBtn.innerHTML = 'Siguiente →';
            nextBtn.classList.remove('create');
        }
        
        // Enable/disable based on validation
        let canProceed = true;
        if (currentAnalysisStep === 1 && !analysisConfig.type) canProceed = false;
        if (currentAnalysisStep === 2 && !analysisConfig.dataSource) canProceed = false;
        
        nextBtn.disabled = !canProceed;
    }
}

function createNewAnalysis() {
    // Save final configuration
    saveCurrentStepData();
    
    // Simulate analysis creation
    const analysisId = 'AN' + Date.now().toString().slice(-6);
    
    // Agregar análisis al dashboard
    const analysisData = {
        name: analysisConfig.name,
        description: analysisConfig.description,
        category: analysisConfig.category,
        type: analysisConfig.type,
        dataSource: analysisConfig.dataSource
    };
    
    addAnalysisToUser(analysisData);
    
    alert(`✅ ¡Análisis creado exitosamente!

📊 Tipo: ${analysisConfig.type}
📁 Fuente: ${analysisConfig.dataSource}
📝 Nombre: ${analysisConfig.name}
🆔 ID: ${analysisId}

Ya puedes visualizar los gráficos en el Dashboard.`);
    
    // Reset wizard state for next use
    currentAnalysisStep = 1;
    analysisConfig = {
        type: '',
        dataSource: '',
        name: '',
        description: '',
        category: '',
        options: {}
    };
    
    // Redirect to dashboard
    setActiveContent('dashboard');
}

// Funciones para el módulo de IA Predictiva
window.showTrainModelForm = function() {
    showModal(`
        <div class="modal-overlay" id="trainModelModal">
            <div class="modal-container" style="max-width: 700px;">
                <div class="modal-header">
                    <h3 class="modal-title">🤖 Entrenar Nuevo Modelo</h3>
                    <button class="modal-close" onclick="closeTrainModelModal()">×</button>
                </div>
                
                <div class="modal-body">
                    <div class="train-wizard">
                        <div class="wizard-step active" id="trainStep1">
                            <h4>Paso 1: Configuración del Modelo</h4>
                            
                            <div class="form-group">
                                <label class="form-label">Nombre del Modelo</label>
                                <input type="text" class="form-input" id="modelName" placeholder="Ej: Predicción Ventas Q4 2025">
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Tipo de Modelo</label>
                                <select class="form-select" id="modelType" onchange="updateModelConfig()">
                                    <option value="">Seleccionar tipo...</option>
                                    <option value="regression">Regresión</option>
                                    <option value="classification">Clasificación</option>
                                    <option value="clustering">Clustering</option>
                                    <option value="timeseries">Series Temporales</option>
                                    <option value="anomaly">Detección de Anomalías</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Fuente de Datos</label>
                                <select class="form-select" id="dataSource">
                                    <option value="">Seleccionar fuente...</option>
                                    <option value="csv1">ventas_historicas.csv (2.3MB)</option>
                                    <option value="db1">Base de Datos CRM (Live)</option>
                                    <option value="api1">API Google Analytics</option>
                                    <option value="upload">Cargar nuevo archivo</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="closeTrainModelModal()">Cancelar</button>
                    <button class="btn-primary" onclick="startModelTraining()">Iniciar Entrenamiento</button>
                </div>
            </div>
        </div>
    `);
}

window.showNewPredictionForm = function() {
    showModal(`
        <div class="modal-overlay" id="predictionModal">
            <div class="modal-container" style="max-width: 600px;">
                <div class="modal-header">
                    <h3 class="modal-title">🔮 Nueva Predicción</h3>
                    <button class="modal-close" onclick="closePredictionModal()">×</button>
                </div>
                
                <div class="modal-body">
                    <div class="form-group">
                        <label class="form-label">Seleccionar Modelo</label>
                        <select class="form-select" id="selectedModel" onchange="updatePredictionForm()">
                            <option value="">Elegir modelo entrenado...</option>
                            <option value="ventas">Predicción de Ventas (96.2% precisión)</option>
                            <option value="clientes">Clasificación de Clientes (89.7% precisión)</option>
                            <option value="inventario">Forecast Inventario (92.4% precisión)</option>
                        </select>
                    </div>
                    
                    <div class="prediction-form" id="predictionFormContent">
                        <div class="empty-state">
                            <p>Selecciona un modelo para configurar la predicción</p>
                        </div>
                    </div>
                </div>
                
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="closePredictionModal()">Cancelar</button>
                    <button class="btn-primary" onclick="generatePrediction()" disabled id="generateBtn">Generar Predicción</button>
                </div>
            </div>
        </div>
    `);
}

function showModal(content) {
    document.body.insertAdjacentHTML('beforeend', content);
}

function closeTrainModelModal() {
    const modal = document.getElementById('trainModelModal');
    if (modal) modal.remove();
}

// === FUNCIONES PARA MANEJO DE USUARIOS ADMINISTRADORES ===

// Variables de paginado para usuarios
let usuariosFiltrados = [];
let currentUsuariosPage = 1;
let usuariosItemsPerPage = 5;

// Datos de usuarios administradores
let usuariosAdmin = [
    {
        id: 'user_1',
        nombres: 'Juan',
        apellidos: 'Martínez',
        email: 'juan.martinez@tecnocorp.com',
        cargo: 'Administrador Principal',
        perfil: 'total',
        estado: 'activo',
        ultimoAcceso: 'Hace 2 horas'
    },
    {
        id: 'user_2',
        nombres: 'Ana',
        apellidos: 'Castro',
        email: 'ana.castro@tecnocorp.com',
        cargo: 'Administradora de Datos',
        perfil: 'medio',
        estado: 'activo',
        ultimoAcceso: 'Hace 1 día'
    },
    {
        id: 'user_3',
        nombres: 'Miguel',
        apellidos: 'Rodríguez',
        email: 'miguel.rodriguez@tecnocorp.com',
        cargo: 'Operador de Carga',
        perfil: 'basico',
        estado: 'activo',
        ultimoAcceso: 'Hace 3 horas'
    },
    {
        id: 'user_4',
        nombres: 'Laura',
        apellidos: 'Silva',
        email: 'laura.silva@tecnocorp.com',
        cargo: 'Analista Senior',
        perfil: 'total',
        estado: 'activo',
        ultimoAcceso: 'Hace 30 min'
    },
    {
        id: 'user_5',
        nombres: 'Carlos',
        apellidos: 'Ruiz',
        email: 'carlos.ruiz@tecnocorp.com',
        cargo: 'Supervisor',
        perfil: 'medio',
        estado: 'inactivo',
        ultimoAcceso: 'Hace 1 semana'
    },
    {
        id: 'user_6',
        nombres: 'María',
        apellidos: 'González',
        email: 'maria.gonzalez@tecnocorp.com',
        cargo: 'Coordinadora de Datos',
        perfil: 'basico',
        estado: 'activo',
        ultimoAcceso: 'Hace 2 días'
    },
    {
        id: 'user_7',
        nombres: 'Roberto',
        apellidos: 'Fernández',
        email: 'roberto.fernandez@tecnocorp.com',
        cargo: 'Jefe de Operaciones',
        perfil: 'total',
        estado: 'activo',
        ultimoAcceso: 'Hace 1 hora'
    },
    {
        id: 'user_8',
        nombres: 'Isabel',
        apellidos: 'López',
        email: 'isabel.lopez@tecnocorp.com',
        cargo: 'Analista Junior',
        perfil: 'medio',
        estado: 'activo',
        ultimoAcceso: 'Hace 4 horas'
    },
    {
        id: 'user_9',
        nombres: 'Fernando',
        apellidos: 'Vargas',
        email: 'fernando.vargas@tecnocorp.com',
        cargo: 'Asistente de Carga',
        perfil: 'basico',
        estado: 'inactivo',
        ultimoAcceso: 'Hace 3 días'
    },
    {
        id: 'user_10',
        nombres: 'Patricia',
        apellidos: 'Herrera',
        email: 'patricia.herrera@tecnocorp.com',
        cargo: 'Directora de TI',
        perfil: 'total',
        estado: 'activo',
        ultimoAcceso: 'Hace 15 min'
    }
];

// Funciones de navegación entre vistas
window.mostrarVistaListaUsuarios = function() {
    document.getElementById('vistaListaUsuarios').style.display = 'block';
    document.getElementById('vistaAgregarUsuario').style.display = 'none';
    document.getElementById('vistaEditarUsuario').style.display = 'none';
    
    // Inicializar paginado
    usuariosFiltrados = usuariosAdmin;
    currentUsuariosPage = 1;
    
    // Actualizar tabla
    actualizarTablaUsuarios();
}

window.mostrarVistaAgregarUsuario = function() {
    document.getElementById('vistaListaUsuarios').style.display = 'none';
    document.getElementById('vistaAgregarUsuario').style.display = 'block';
    document.getElementById('vistaEditarUsuario').style.display = 'none';
    
    // Limpiar formulario
    limpiarFormularioNuevo();
}

window.mostrarVistaEditarUsuario = function(userId) {
    document.getElementById('vistaListaUsuarios').style.display = 'none';
    document.getElementById('vistaAgregarUsuario').style.display = 'none';
    document.getElementById('vistaEditarUsuario').style.display = 'block';
    
    // Cargar datos del usuario
    cargarDatosUsuario(userId);
}

// Función para mostrar descripción del perfil en formulario nuevo
window.mostrarDescripcionPerfil = function(perfil) {
    const card = document.getElementById('perfilDescripcionCard');
    const titulo = document.getElementById('perfilTitulo');
    const descripcion = document.getElementById('perfilDescripcion');
    const detalle = document.getElementById('perfilDetalle');
    
    if (!perfil) {
        card.style.display = 'none';
        return;
    }
    
    const perfiles = {
        'basico': {
            titulo: 'Administrador Básico',
            descripcion: 'Perfil con permisos limitados para operaciones básicas.',
            detalle: 'Puede subir información al sistema.'
        },
        'medio': {
            titulo: 'Administrador Medio',
            descripcion: 'Perfil con permisos ampliados para análisis.',
            detalle: 'Puede subir información + ver informes y dashboard.'
        },
        'total': {
            titulo: 'Administrador Total',
            descripcion: 'Perfil con todos los permisos del sistema.',
            detalle: 'Puede subir información, ver informes, dashboard y bajar data.'
        }
    };
    
    const info = perfiles[perfil];
    titulo.textContent = info.titulo;
    descripcion.textContent = info.descripcion;
    detalle.textContent = info.detalle;
    card.style.display = 'block';
}

// Función para mostrar descripción del perfil en formulario editar
window.mostrarDescripcionPerfilEditar = function(perfil) {
    const card = document.getElementById('perfilDescripcionCardEditar');
    const titulo = document.getElementById('perfilTituloEditar');
    const descripcion = document.getElementById('perfilDescripcionEditar');
    const detalle = document.getElementById('perfilDetalleEditar');
    
    if (!perfil) {
        card.style.display = 'none';
        return;
    }
    
    const perfiles = {
        'basico': {
            titulo: 'Administrador Básico',
            descripcion: 'Perfil con permisos limitados para operaciones básicas.',
            detalle: 'Puede subir información al sistema.'
        },
        'medio': {
            titulo: 'Administrador Medio',
            descripcion: 'Perfil con permisos ampliados para análisis.',
            detalle: 'Puede subir información + ver informes y dashboard.'
        },
        'total': {
            titulo: 'Administrador Total',
            descripcion: 'Perfil con todos los permisos del sistema.',
            detalle: 'Puede subir información, ver informes, dashboard y bajar data.'
        }
    };
    
    const info = perfiles[perfil];
    titulo.textContent = info.titulo;
    descripcion.textContent = info.descripcion;
    detalle.textContent = info.detalle;
    card.style.display = 'block';
}

// Función para guardar nuevo usuario
window.guardarNuevoUsuario = function(event) {
    event.preventDefault();
    
    const nombres = document.getElementById('nuevosNombres').value;
    const apellidos = document.getElementById('nuevosApellidos').value;
    const email = document.getElementById('nuevoEmail').value;
    const cargo = document.getElementById('nuevoCargo').value;
    const perfil = document.getElementById('nuevoPerfil').value;
    const estado = document.getElementById('nuevoEstado').value;
    
    // Validar campos requeridos
    if (!nombres || !apellidos || !email || !perfil) {
        alert('Por favor complete todos los campos requeridos');
        return;
    }
    
    // Crear nuevo usuario
    const nuevoUsuario = {
        id: 'user_' + Date.now(),
        nombres,
        apellidos,
        email,
        cargo,
        perfil,
        estado,
        ultimoAcceso: 'Recién creado'
    };
    
    usuariosAdmin.push(nuevoUsuario);
    
    alert('Usuario creado exitosamente');
    mostrarVistaListaUsuarios();
}

// Función para editar usuario
window.editarUsuario = function(userId) {
    mostrarVistaEditarUsuario(userId);
}

// Función para cargar datos del usuario en formulario de edición
function cargarDatosUsuario(userId) {
    const usuario = usuariosAdmin.find(u => u.id === userId);
    
    if (usuario) {
        document.getElementById('editarUserId').value = userId;
        document.getElementById('editarNombres').value = usuario.nombres;
        document.getElementById('editarApellidos').value = usuario.apellidos;
        document.getElementById('editarEmail').value = usuario.email;
        document.getElementById('editarCargo').value = usuario.cargo;
        document.getElementById('editarPerfil').value = usuario.perfil;
        document.getElementById('editarEstado').value = usuario.estado;
        
        // Mostrar descripción del perfil
        mostrarDescripcionPerfilEditar(usuario.perfil);
    }
}

// Función para guardar edición de usuario
window.guardarEditarUsuario = function(event) {
    event.preventDefault();
    
    const userId = document.getElementById('editarUserId').value;
    const nombres = document.getElementById('editarNombres').value;
    const apellidos = document.getElementById('editarApellidos').value;
    const email = document.getElementById('editarEmail').value;
    const cargo = document.getElementById('editarCargo').value;
    const perfil = document.getElementById('editarPerfil').value;
    const estado = document.getElementById('editarEstado').value;
    
    // Validar campos requeridos
    if (!nombres || !apellidos || !email || !perfil) {
        alert('Por favor complete todos los campos requeridos');
        return;
    }
    
    // Actualizar usuario
    const usuarioIndex = usuariosAdmin.findIndex(u => u.id === userId);
    if (usuarioIndex !== -1) {
        usuariosAdmin[usuarioIndex] = {
            ...usuariosAdmin[usuarioIndex],
            nombres,
            apellidos,
            email,
            cargo,
            perfil,
            estado
        };
        
        alert('Usuario actualizado exitosamente');
        mostrarVistaListaUsuarios();
    }
}

// Función para eliminar usuario
window.eliminarUsuario = function(userId) {
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
        usuariosAdmin = usuariosAdmin.filter(u => u.id !== userId);
        actualizarTablaUsuarios();
        alert('Usuario eliminado exitosamente');
    }
}

// Función para buscar usuarios
window.buscarUsuarios = function(texto) {
    currentUsuariosPage = 1; // Resetear a primera página
    actualizarTablaUsuarios(texto);
}

// Función para filtrar por perfil
window.filtrarPorPerfil = function(perfil) {
    currentUsuariosPage = 1; // Resetear a primera página
    actualizarTablaUsuarios(null, perfil);
}

// Función para filtrar por estado
window.filtrarPorEstado = function(estado) {
    currentUsuariosPage = 1; // Resetear a primera página
    actualizarTablaUsuarios(null, null, estado);
}

// Función para actualizar tabla de usuarios
function actualizarTablaUsuarios(busqueda = '', perfilFiltro = '', estadoFiltro = '') {
    const tbody = document.getElementById('usuariosTableBody');
    if (!tbody) return;
    
    // Filtrar usuarios
    usuariosFiltrados = usuariosAdmin;
    
    // Filtrar por búsqueda
    if (busqueda) {
        usuariosFiltrados = usuariosFiltrados.filter(u => 
            u.nombres.toLowerCase().includes(busqueda.toLowerCase()) ||
            u.apellidos.toLowerCase().includes(busqueda.toLowerCase()) ||
            u.email.toLowerCase().includes(busqueda.toLowerCase()) ||
            u.cargo.toLowerCase().includes(busqueda.toLowerCase())
        );
    }
    
    // Filtrar por perfil
    if (perfilFiltro) {
        usuariosFiltrados = usuariosFiltrados.filter(u => u.perfil === perfilFiltro);
    }
    
    // Filtrar por estado
    if (estadoFiltro) {
        usuariosFiltrados = usuariosFiltrados.filter(u => u.estado === estadoFiltro);
    }
    
    // Resetear página si es necesario
    const totalPages = Math.ceil(usuariosFiltrados.length / usuariosItemsPerPage);
    if (currentUsuariosPage > totalPages && totalPages > 0) {
        currentUsuariosPage = totalPages;
    } else if (totalPages === 0) {
        currentUsuariosPage = 1;
    }
    
    // Aplicar paginado
    const startIndex = (currentUsuariosPage - 1) * usuariosItemsPerPage;
    const endIndex = startIndex + usuariosItemsPerPage;
    const usuariosPaginados = usuariosFiltrados.slice(startIndex, endIndex);
    
    // Regenerar filas de tabla
    tbody.innerHTML = usuariosPaginados.map(usuario => {
        const perfilInfo = getPerfilInfo(usuario.perfil);
        const iniciales = (usuario.nombres[0] + usuario.apellidos[0]).toUpperCase();
        
        return `
            <tr>
                <td>
                    <div class="user-info">
                        <div class="user-avatar">${iniciales}</div>
                        <div>
                            <div class="user-name">${usuario.nombres} ${usuario.apellidos}</div>
                            <div class="user-role">${usuario.cargo}</div>
                        </div>
                    </div>
                </td>
                <td>${usuario.email}</td>
                <td>
                    <div class="perfil-badge ${usuario.perfil}">${perfilInfo.nombre}</div>
                    <div class="perfil-desc">${perfilInfo.descripcion}</div>
                </td>
                <td><span class="status-badge ${usuario.estado}">${usuario.estado === 'activo' ? 'Activo' : 'Inactivo'}</span></td>
                <td>${usuario.ultimoAcceso}</td>
                <td class="action-cell">
                    <button class="action-btn edit" onclick="editarUsuario('${usuario.id}')" title="Editar">✏️</button>
                    <button class="action-btn delete" onclick="eliminarUsuario('${usuario.id}')" title="Eliminar">🗑️</button>
                </td>
            </tr>
        `;
    }).join('');
    
    // Actualizar paginado
    updateUsuariosPagination();
}

// Función helper para obtener información del perfil
function getPerfilInfo(perfil) {
    const perfiles = {
        'basico': {
            nombre: 'ADMINISTRADOR BÁSICO',
            descripcion: 'Subir información'
        },
        'medio': {
            nombre: 'ADMINISTRADOR MEDIO',
            descripcion: 'Subir información + ver informes y dashboard'
        },
        'total': {
            nombre: 'ADMINISTRADOR TOTAL',
            descripcion: 'Subir información, ver informes, dashboard y bajar data'
        }
    };
    
    return perfiles[perfil] || { nombre: '', descripcion: '' };
}

// Función para limpiar formulario de nuevo usuario
function limpiarFormularioNuevo() {
    document.getElementById('nuevosNombres').value = '';
    document.getElementById('nuevosApellidos').value = '';
    document.getElementById('nuevoEmail').value = '';
    document.getElementById('nuevoCargo').value = '';
    document.getElementById('nuevoPerfil').value = '';
    document.getElementById('nuevoEstado').value = 'activo';
    document.getElementById('perfilDescripcionCard').style.display = 'none';
}

// === FUNCIONES DE PAGINADO PARA USUARIOS ===

// Función para cambiar página de usuarios
window.changeUsuariosPage = function(direction) {
    const totalPages = Math.ceil(usuariosFiltrados.length / usuariosItemsPerPage);
    const newPage = currentUsuariosPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentUsuariosPage = newPage;
        actualizarTablaUsuarios();
    }
};

// Función para actualizar información del paginado de usuarios
function updateUsuariosPagination() {
    const totalPages = Math.ceil(usuariosFiltrados.length / usuariosItemsPerPage);
    const totalItems = usuariosFiltrados.length;
    const startItem = totalItems > 0 ? (currentUsuariosPage - 1) * usuariosItemsPerPage + 1 : 0;
    const endItem = Math.min(currentUsuariosPage * usuariosItemsPerPage, totalItems);
    
    const paginationInfo = document.getElementById('usuariosPaginationInfo');
    const prevBtn = document.getElementById('usuariosPrevBtn');
    const nextBtn = document.getElementById('usuariosNextBtn');
    
    if (paginationInfo) {
        paginationInfo.textContent = `Mostrando ${startItem}-${endItem} de ${totalItems} usuarios`;
    }
    
    if (prevBtn) {
        prevBtn.disabled = currentUsuariosPage === 1;
        prevBtn.title = currentUsuariosPage === 1 ? 'No hay página anterior' : 'Página anterior de usuarios';
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentUsuariosPage === totalPages || totalPages === 0;
        nextBtn.title = (currentUsuariosPage === totalPages || totalPages === 0) ? 'No hay más páginas' : 'Página siguiente de usuarios';
    }
}

function closePredictionModal() {
    const modal = document.getElementById('predictionModal');
    if (modal) modal.remove();
}

function updatePredictionForm() {
    const selectedModel = document.getElementById('selectedModel').value;
    const formContent = document.getElementById('predictionFormContent');
    const generateBtn = document.getElementById('generateBtn');
    
    if (selectedModel === 'ventas') {
        formContent.innerHTML = `
            <div class="form-group">
                <label class="form-label">Producto/Servicio</label>
                <select class="form-select">
                    <option>Producto A</option>
                    <option>Producto B</option>
                    <option>Servicio Premium</option>
                </select>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Período</label>
                    <select class="form-select">
                        <option>Próximo mes</option>
                        <option>Próximo trimestre</option>
                        <option>Próximo año</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Región</label>
                    <select class="form-select">
                        <option>Nacional</option>
                        <option>Norte</option>
                        <option>Sur</option>
                        <option>Centro</option>
                    </select>
                </div>
            </div>
        `;
        generateBtn.disabled = false;
    } else if (selectedModel === 'clientes') {
        formContent.innerHTML = `
            <div class="form-group">
                <label class="form-label">ID del Cliente o Lote</label>
                <input type="text" class="form-input" placeholder="Ej: 12847 o 'Lote 500 clientes'">
            </div>
            <div class="form-group">
                <label class="form-label">Características adicionales</label>
                <textarea class="form-input" rows="3" placeholder="Datos adicionales del cliente (opcional)"></textarea>
            </div>
        `;
        generateBtn.disabled = false;
    } else if (selectedModel === 'inventario') {
        formContent.innerHTML = `
            <div class="form-group">
                <label class="form-label">SKU del Producto</label>
                <input type="text" class="form-input" placeholder="Ej: SKU-4567">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Período de Forecast</label>
                    <select class="form-select">
                        <option>7 días</option>
                        <option>30 días</option>
                        <option>90 días</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Estacionalidad</label>
                    <select class="form-select">
                        <option>Automático</option>
                        <option>Alta temporada</option>
                        <option>Baja temporada</option>
                    </select>
                </div>
            </div>
        `;
        generateBtn.disabled = false;
    } else {
        formContent.innerHTML = '<div class="empty-state"><p>Selecciona un modelo para configurar la predicción</p></div>';
        generateBtn.disabled = true;
    }
}

function generatePrediction() {
    const selectedModel = document.getElementById('selectedModel').value;
    
    // Simular proceso de predicción
    showLoadingModal('Generando predicción...');
    
    setTimeout(() => {
        closeLoadingModal();
        closePredictionModal();
        
        // Mostrar resultado
        showResultModal(`
            <div class="result-modal">
                <div class="result-header">
                    <h3>✅ Predicción Generada</h3>
                </div>
                <div class="result-content">
                    <p>La predicción se ha generado exitosamente y aparecerá en el historial.</p>
                    <div class="result-stats">
                        <div class="stat">
                            <span class="label">Confianza:</span>
                            <span class="value">94%</span>
                        </div>
                        <div class="stat">
                            <span class="label">Tiempo:</span>
                            <span class="value">2.1s</span>
                        </div>
                    </div>
                </div>
                <button class="btn-primary" onclick="closeResultModal()">Entendido</button>
            </div>
        `);
        
        // Actualizar vista si está en IA Predictiva
        if (window.location.hash === '#ia-predictiva') {
            renderContent('ia-predictiva');
        }
    }, 2000);
}

function startModelTraining() {
    const modelName = document.getElementById('modelName').value;
    if (!modelName) {
        alert('Por favor ingresa un nombre para el modelo');
        return;
    }
    
    showLoadingModal('Iniciando entrenamiento del modelo...');
    
    setTimeout(() => {
        closeLoadingModal();
        closeTrainModelModal();
        
        showResultModal(`
            <div class="result-modal">
                <div class="result-header">
                    <h3>🤖 Entrenamiento Iniciado</h3>
                </div>
                <div class="result-content">
                    <p>El entrenamiento del modelo "${modelName}" ha comenzado.</p>
                    <p>Puedes seguir el progreso en la sección de modelos.</p>
                </div>
                <button class="btn-primary" onclick="closeResultModal()">Entendido</button>
            </div>
        `);
        
        // Actualizar vista si está en IA Predictiva
        if (window.location.hash === '#ia-predictiva') {
            renderContent('ia-predictiva');
        }
    }, 1500);
}

function showLoadingModal(message) {
    showModal(`
        <div class="modal-overlay" id="loadingModal">
            <div class="modal-container loading-modal">
                <div class="loading-content">
                    <div class="loading-spinner"></div>
                    <p>${message}</p>
                </div>
            </div>
        </div>
    `);
}

function closeLoadingModal() {
    const modal = document.getElementById('loadingModal');
    if (modal) modal.remove();
}

function showResultModal(content) {
    showModal(`
        <div class="modal-overlay" id="resultModal">
            <div class="modal-container">
                ${content}
            </div>
        </div>
    `);
}

function closeResultModal() {
    const modal = document.getElementById('resultModal');
    if (modal) modal.remove();
}

// Funciones adicionales para el módulo de IA
function executeModel(modelId) {
    alert(`Ejecutando modelo: ${modelId}`);
}

function retrainModel(modelId) {
    alert(`Reentrenando modelo: ${modelId}`);
}

function viewModelDetails(modelId) {
    alert(`Ver detalles del modelo: ${modelId}`);
}

function filterModels(status) {
    const cards = document.querySelectorAll('.model-card');
    cards.forEach(card => {
        if (status === 'all' || card.dataset.status === status) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterPredictions(searchTerm) {
    const rows = document.querySelectorAll('#predictionsTable tbody tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm.toLowerCase())) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function filterPredictionsByModel(modelId) {
    const rows = document.querySelectorAll('#predictionsTable tbody tr');
    rows.forEach(row => {
        const modelName = row.querySelector('.model-name').textContent.toLowerCase();
        if (modelId === 'all' || modelName.includes(modelId)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function exportPredictions() {
    alert('Exportando historial de predicciones...');
}

function viewPredictionDetails(id) {
    alert(`Ver detalles de la predicción ${id}`);
}

function exportPrediction(id) {
    alert(`Exportando predicción ${id}`);
}

function sharePrediction(id) {
    alert(`Compartiendo predicción ${id}`);
}

// Configurar event listeners para navegación del sidebar
const menuItems = document.querySelectorAll('.sidebar-item');
menuItems.forEach(item => {
    item.addEventListener('click', (event) => {
        event.preventDefault();

        // Actualizar estado activo
        menuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Obtener contenido y renderizar
        const contentId = item.getAttribute('data-content');
        console.log('Sidebar clicked - contentId:', contentId);
        renderContent(contentId);

        // Cerrar sidebar en móvil después de selección
        if (window.innerWidth <= 768) {
            document.getElementById('sidebar').classList.remove('open');
        }
    });
});

console.log('Event listeners configurados para', menuItems.length, 'elementos del sidebar');

}); // End DOMContentLoaded
