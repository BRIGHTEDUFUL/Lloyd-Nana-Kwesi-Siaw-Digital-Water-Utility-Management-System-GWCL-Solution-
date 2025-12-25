document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation Logic ---
    const btnLogin = document.getElementById('btn-login');
    const btnLogout = document.getElementById('btn-logout');
    const landingView = document.getElementById('landing-view');
    const dashboardLayout = document.getElementById('dashboard-layout');
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('page-title');
    const themeToggle = document.getElementById('theme-toggle');

    // Modal Elements
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const modalAction = document.getElementById('modal-action');
    const modalContent = document.getElementById('modal-content');
    const modalTitle = document.getElementById('modal-title');
    const mapOverlay = document.getElementById('gis-map');
    const zoomInBtn = document.querySelector('.map-zoom button[aria-label="Zoom in"]');
    const zoomOutBtn = document.querySelector('.map-zoom button[aria-label="Zoom out"]');
    let mapZoomLevel = 1;

    let currentModalAction = null; // To store the function to run on "Acknowledge/Save"

    // Enter Dashboard
    window.loginSystem = () => {
        const email = document.getElementById('login-email') ? document.getElementById('login-email').value : 'Admin';
        landingView.classList.add('hidden');
        dashboardLayout.classList.remove('hidden');
        const activeTarget = document.querySelector('.nav-item.active')?.getAttribute('data-target') || 'dashboard-home';
        activateSection(activeTarget);
        showToast(`Welcome back, ${email}!`, 'success');
        renderDashboard();
    };

    if (btnLogin) btnLogin.addEventListener('click', window.loginSystem);

    // Logout
    btnLogout.addEventListener('click', () => {
        dashboardLayout.classList.add('hidden');
        landingView.classList.remove('hidden');
        showToast('Logged out successfully.', 'info');
    });

    function activateSection(targetId) {
        contentSections.forEach(section => {
            section.classList.remove('active', 'enter');
            section.classList.add('hidden-section');
        });

        const targetSection = document.getElementById(targetId);
        if (!targetSection) return;

        targetSection.classList.add('active');
        targetSection.classList.remove('hidden-section');

        // Allow transition tick before adding enter for fade/slide in
        requestAnimationFrame(() => targetSection.classList.add('enter'));
    }

    // Initialize sections (show the one marked active in markup)
    const initializeSections = () => {
        const initialSection = document.querySelector('.content-section.active') || contentSections[0];
        if (initialSection) {
            activateSection(initialSection.id);
        }
    };

    initializeSections();

    // Theme Toggle
    const applyTheme = (mode) => {
        const root = document.documentElement;
        if (mode === 'dark') {
            root.classList.add('dark-mode');
        } else {
            root.classList.remove('dark-mode');
        }
        localStorage.setItem('gwcl-theme', mode);
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = mode === 'dark' ? 'ph ph-sun' : 'ph ph-moon-stars';
            }
        }
    };

    const savedTheme = localStorage.getItem('gwcl-theme');
    applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark-mode');
            applyTheme(isDark ? 'dark' : 'light');
        });
    }

    // Map Zoom Controls
    const applyMapZoom = () => {
        if (!mapOverlay) return;
        mapOverlay.style.transformOrigin = 'center';
        mapOverlay.style.transform = `scale(${mapZoomLevel})`;
    };

    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', () => {
            mapZoomLevel = Math.min(1.8, parseFloat((mapZoomLevel + 0.2).toFixed(2)));
            applyMapZoom();
        });
    }

    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', () => {
            mapZoomLevel = Math.max(0.8, parseFloat((mapZoomLevel - 0.2).toFixed(2)));
            applyMapZoom();
        });
    }

    applyMapZoom();

    // Sidebar Navigation
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            const targetId = item.getAttribute('data-target');
            activateSection(targetId);

            pageTitle.textContent = item.querySelector('span').textContent;
        });
    });

    // Modal Logic
    if (modalClose) modalClose.addEventListener('click', closeModal);

    if (modalAction) modalAction.addEventListener('click', () => {
        if (currentModalAction) {
            currentModalAction();
        } else {
            closeModal();
        }
    });

    function openModal(title, content, actionText = 'Acknowledge', onAction = null) {
        modalTitle.textContent = title;
        modalContent.innerHTML = content;
        modalAction.textContent = actionText;
        currentModalAction = onAction;
        modalOverlay.classList.add('open');
    }

    function closeModal() {
        modalOverlay.classList.remove('open');
        currentModalAction = null;
    }

    // --- Interactive Effects ---
    function initTilt() {
        // Apply 3D Tilt Effect to interactive cards
        document.querySelectorAll('.glass-panel, .stat-card, .tech-card, .kpi-card, .leak-item').forEach(card => {
            if (card.dataset.tiltInit) return;
            card.dataset.tiltInit = "true";

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -3;
                const rotateY = ((x - centerX) / centerX) * 3;

                card.style.transition = 'transform 0.1s ease';
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transition = 'transform 0.5s ease';
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    function initRipple() {
        document.querySelectorAll('button, .nav-item').forEach(btn => {
            if (btn.dataset.rippleInit) return;
            btn.dataset.rippleInit = "true";

            btn.addEventListener('click', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;

                this.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    function animateStagger(containerSelector, itemSelector) {
        const items = document.querySelectorAll(`${containerSelector} ${itemSelector}`);
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.animation = `slideUpFade 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards ${index * 0.05}s`;
        });
    }

    // --- Rendering Logic ---

    function renderDashboard() {
        renderKPIs();
        renderCharts();
        renderLeaks();
        renderCustomers();
        renderTechnicians();
        initTilt();
        initRipple();
    }

    function renderKPIs() {
        const container = document.querySelector('.kpi-grid');
        container.innerHTML = mockData.kpis.map(kpi => `
            <div class="kpi-card glass-panel">
                <span class="kpi-title">${kpi.title}</span>
                <span class="kpi-value">${kpi.value}</span>
                <span class="kpi-trend ${kpi.trend === 'up' ? 'trend-up' : 'trend-down'}">
                    <i class="ph-bold ${kpi.trend === 'up' ? 'ph-trend-up' : 'ph-trend-down'}"></i>
                    ${kpi.trendValue}
                </span>
            </div>
        `).join('');
        animateStagger('.kpi-grid', '.kpi-card');
    }

    function renderCharts() {
        const flowChart = document.getElementById('flow-chart');
        const regionChart = document.getElementById('region-chart');

        // Enhanced Chart Rendering with Tooltips
        const renderBars = (values, colorStart, colorEnd) => {
            return values.map(h => `
                <div class="bar" 
                     style="height: 0%; background: linear-gradient(to top, ${colorStart}, ${colorEnd});" 
                     data-height="${h}%" 
                     title="${h} Units">
                </div>
            `).join('');
        };

        flowChart.innerHTML = renderBars([40, 70, 50, 90, 60, 80, 45, 65, 85, 55], '#00c6ff', '#0072ff');
        regionChart.innerHTML = renderBars([30, 50, 80, 40, 60, 70, 45], '#11998e', '#38ef7d');

        setTimeout(() => {
            document.querySelectorAll('.bar').forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.height = bar.getAttribute('data-height');
                }, index * 40); // Staggered bars animation
            });
        }, 100);
    }

    function renderLeaks(data = null) {
        const container = document.getElementById('leak-list-container');
        const mapContainer = document.getElementById('gis-map');
        const leaksToRender = data || mockData.leaks;

        if (leaksToRender.length === 0) {
            container.innerHTML = '<div class="empty-state">No leaks found matching your criteria.</div>';
            if (mapContainer) mapContainer.innerHTML = '';
            return;
        }

        // Render List
        container.innerHTML = leaksToRender.map(leak => {
            let sevClass = 'sev-low';
            if (leak.severity === 'High') sevClass = 'sev-high';
            if (leak.severity === 'Medium') sevClass = 'sev-med';

            return `
            <div class="leak-item" onclick="window.viewLeakDetails('${leak.id}')">
                <div class="leak-info">
                    <h4>${leak.location}</h4>
                    <p><i class="ph ph-clock"></i> ${leak.time} • ${leak.status}</p>
                </div>
                <span class="severity-badge ${sevClass}">${leak.severity}</span>
            </div>
        `}).join('');

        // Render Map Points (Simulated GIS)
        if (mapContainer) {
            mapContainer.innerHTML = leaksToRender.map(leak => {
                // Persistent random coordinates for the session
                if (!leak.x) leak.x = Math.floor(Math.random() * 70) + 15;
                if (!leak.y) leak.y = Math.floor(Math.random() * 60) + 20;

                let color = '#34d399'; // Low
                if (leak.severity === 'Medium') color = '#f59e0b';
                if (leak.severity === 'High') color = '#ef4444';

                // We use color property for the pulse effect if CSS uses currentColor
                return `
                    <div class="leak-point" 
                         style="top: ${leak.y}%; left: ${leak.x}%; background: ${color}; color: ${color}; box-shadow: 0 0 10px ${color};"
                         title="${leak.location} (${leak.severity})"
                         onclick="window.viewLeakDetails('${leak.id}')">
                    </div>
                `;
            }).join('');
        }

        animateStagger('#leak-list-container', '.leak-item');
        initTilt(); // Apply tilt to new leak items
    }

    // Expose function to window for onclick access
    window.viewLeakDetails = (id) => {
        const leak = mockData.leaks.find(l => l.id === id);
        if (leak) {
            openModal(
                `Leak Details: ${id}`,
                `<p><strong>Location:</strong> ${leak.location}</p>
                 <p><strong>Severity:</strong> ${leak.severity}</p>
                 <p><strong>Status:</strong> ${leak.status}</p>
                 <p><strong>Reported:</strong> ${leak.time}</p>
                 <br>
                 <p>Technician dispatch recommended for this sector.</p>`,
                'Close'
            );
        }
    };

    // --- Customer Logic ---
    function renderCustomers(data = null) {
        const tbody = document.getElementById('customer-table-body');
        const customersToRender = data || mockData.customers;

        if (customersToRender.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 2rem;">No customers found.</td></tr>';
            return;
        }

        tbody.innerHTML = customersToRender.map(c => `
            <tr>
                <td>${c.id}</td>
                <td>${c.name}</td>
                <td>${c.region}</td>
                <td><span class="status-badge ${c.status === 'Paid' ? 'status-paid' : 'status-overdue'}">
                    <i class="ph-fill ${c.status === 'Paid' ? 'ph-check-circle' : 'ph-warning-circle'}"></i>
                    ${c.status}
                </span></td>
                <td>${c.lastBill}</td>
                <td><button class="btn-icon"><i class="ph ph-dots-three"></i></button></td>
            </tr>
        `).join('');
        animateStagger('#customer-table-body', 'tr');
    }

    // Add Customer Button Logic
    const btnAddCustomer = document.querySelector('#customers .btn-primary');
    if (btnAddCustomer) {
        btnAddCustomer.addEventListener('click', () => {
            const formHtml = `
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" id="cust-name" placeholder="e.g. John Doe">
                </div>
                <div class="form-group">
                    <label>Region</label>
                    <select id="cust-region">
                        <option>Greater Accra</option>
                        <option>Ashanti</option>
                        <option>Central</option>
                        <option>Eastern</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Initial Bill Amount (₵)</label>
                    <input type="number" id="cust-bill" placeholder="0.00">
                </div>
            `;

            openModal('Add New Customer', formHtml, 'Save Customer', () => {
                const name = document.getElementById('cust-name').value;
                const region = document.getElementById('cust-region').value;
                const bill = document.getElementById('cust-bill').value;

                if (name && bill) {
                    const newId = `C-${Math.floor(Math.random() * 9000) + 1000}`;
                    mockData.customers.unshift({
                        id: newId,
                        name: name,
                        region: region,
                        status: 'Paid',
                        lastBill: `₵ ${parseFloat(bill).toFixed(2)}`
                    });
                    renderCustomers();
                    showToast('Customer added successfully!', 'success');
                    closeModal();
                } else {
                    showToast('Please fill in all fields.', 'error');
                }
            });
        });
    }

    // --- Technician Logic ---
    let techFilterActive = false;

    function renderTechnicians(data = null) {
        const container = document.getElementById('tech-grid-container');
        let techs = data || mockData.technicians;

        // Apply status filter if active and no explicit search data provided (or filter the search results)
        if (techFilterActive) {
            techs = techs.filter(t => t.status === 'Available');
        }

        if (techs.length === 0) {
            container.innerHTML = '<div class="empty-state">No technicians found.</div>';
            return;
        }

        container.innerHTML = techs.map(tech => `
            <div class="tech-card glass-panel" onclick="window.dispatchTech('${tech.id}')">
                <div class="tech-header">
                    <div class="tech-avatar">${tech.avatar}</div>
                    <div>
                        <h4>${tech.name}</h4>
                        <p style="color: var(--text-secondary); font-size: 0.8rem;">${tech.id}</p>
                    </div>
                </div>
                <div class="tech-body">
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 4px;">Current Assignment</p>
                    <p style="font-weight: 600; font-size: 0.95rem;">${tech.task}</p>
                </div>
                <div class="tech-status">
                    <span style="color: var(--text-muted);">Availability</span>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <div class="status-dot ${tech.status === 'Busy' ? 'busy' : 'available'}"></div>
                        <span style="font-weight: 500; font-size: 0.85rem;">${tech.status}</span>
                    </div>
                </div>
            </div>
        `).join('');
        animateStagger('#tech-grid-container', '.tech-card');
        initTilt(); // Re-apply tilt
    }

    window.dispatchTech = (id) => {
        const tech = mockData.technicians.find(t => t.id === id);
        if (!tech) return;

        const formHtml = `
            <p style="margin-bottom: 1rem; color: var(--text-secondary);">Assign a new task to <strong>${tech.name}</strong>.</p>
            <div class="form-group">
                <label>Select Task</label>
                <select id="tech-task">
                    <option>Routine Maintenance</option>
                    <option>Leak Repair (Urgent)</option>
                    <option>Meter Installation</option>
                    <option>System Inspection</option>
                </select>
            </div>
        `;

        openModal(`Dispatch Technician: ${tech.id}`, formHtml, 'Assign Task', () => {
            const task = document.getElementById('tech-task').value;
            tech.task = task;
            tech.status = 'Busy';
            renderTechnicians();
            showToast(`Task assigned to ${tech.name}`, 'success');
            closeModal();
        });
    };

    // --- Search Functionality ---
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const activeSection = document.querySelector('.content-section.active');

            if (!activeSection) return;

            if (activeSection.id === 'customers') {
                const filtered = mockData.customers.filter(c =>
                    c.name.toLowerCase().includes(term) ||
                    c.region.toLowerCase().includes(term) ||
                    c.id.toLowerCase().includes(term)
                );
                renderCustomers(filtered);
            } else if (activeSection.id === 'technicians') {
                const filtered = mockData.technicians.filter(t =>
                    t.name.toLowerCase().includes(term) ||
                    t.task.toLowerCase().includes(term) ||
                    t.id.toLowerCase().includes(term)
                );
                renderTechnicians(filtered);
            } else if (activeSection.id === 'leak-monitoring') {
                const filtered = mockData.leaks.filter(l =>
                    l.location.toLowerCase().includes(term) ||
                    l.status.toLowerCase().includes(term) ||
                    l.id.toLowerCase().includes(term)
                );
                renderLeaks(filtered);
            }
        });
    }

    // --- Filter Technicians ---
    const btnFilterTech = document.querySelector('#technicians .btn-secondary');
    if (btnFilterTech) {
        btnFilterTech.addEventListener('click', () => {
            techFilterActive = !techFilterActive;
            renderTechnicians();
            showToast(techFilterActive ? 'Showing available technicians only' : 'Showing all technicians', 'info');
        });
    }

    // --- Refresh GIS Data ---
    const btnRefreshGIS = document.querySelector('#leak-monitoring .btn-secondary');
    if (btnRefreshGIS) {
        btnRefreshGIS.addEventListener('click', () => {
            const icon = btnRefreshGIS.querySelector('i');
            icon.style.transition = 'transform 1s';
            icon.style.transform = 'rotate(360deg)';

            showToast('Syncing with GIS satellites...', 'info');

            setTimeout(() => {
                icon.style.transform = 'none';
                // Randomly duplicate a leak or resolve one
                const randomAction = Math.random() > 0.5 ? 'resolve' : 'new';

                if (randomAction === 'new') {
                    const newLeak = {
                        id: `L-${Math.floor(Math.random() * 900) + 200}`,
                        location: "Detected via Satellite Grid B",
                        severity: Math.random() > 0.5 ? "High" : "Medium",
                        status: "Critical",
                        time: "Just now"
                    };
                    mockData.leaks.unshift(newLeak);
                    showToast('New leak detected in Grid B!', 'error');
                } else {
                    const leak = mockData.leaks.find(l => l.status !== 'Resolved');
                    if (leak) {
                        leak.status = 'Resolved';
                        leak.time = 'Just now';
                        showToast(`Leak ${leak.id} resolved automatically.`, 'success');
                    } else {
                        showToast('GIS Sync Complete. No new alerts.', 'success');
                    }
                }
                renderLeaks();
            }, 1000);
        });
    }

    // --- Notifications ---
    const btnNotif = document.querySelector('.notification-btn');
    if (btnNotif) {
        btnNotif.addEventListener('click', () => {
            showToast('No new notifications.', 'info');
        });
    }

    // --- Toast Notification ---
    function showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        let icon = 'ph-info';
        if (type === 'success') icon = 'ph-check-circle';
        if (type === 'error') icon = 'ph-warning';

        toast.innerHTML = `<i class="ph ${icon}"></i> <span>${message}</span>`;
        container.appendChild(toast);

        // Force reflow to allow CSS transition
        void toast.offsetWidth;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
});
