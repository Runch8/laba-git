/**
 * Main JavaScript File - Titan Performance Club
 * Handles global navigation, mobile menus, global modal dialogs, global theme engine,
 * and the personal performance portal dashboard.
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initMobileMenu();
    initThemeSwitcher();
    initDashboard();
    updateMembershipBadge();
});

/**
 * Navigation scroll handling & active state highlighting
 */
function initNavigation() {
    const nav = document.getElementById('main-nav') || document.getElementById('topNav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                nav.classList.add('shadow-lg', 'bg-surface', 'border-b', 'border-white/5');
                nav.classList.remove('bg-surface/90');
            } else {
                nav.classList.remove('shadow-lg', 'bg-surface', 'border-b', 'border-white/5');
                nav.classList.add('bg-surface/90');
            }
        });
    }

    // Dynamic active state highlighting based on current URL
    const currentPath = window.location.pathname;
    const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
    
    const navLinks = document.querySelectorAll('nav a, #mobile-menu-overlay a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href === pageName || (pageName === 'index.html' && href === '#') || (href === 'index.html' && pageName === ''))) {
            link.classList.add('text-primary-fixed', 'border-b-2', 'border-primary-fixed', 'pb-1');
            link.classList.remove('text-on-surface');
        } else {
            if (!link.classList.contains('text-primary-fixed') && !link.classList.contains('italic')) {
                link.classList.add('text-on-surface', 'hover:text-primary-fixed');
            }
        }
    });
}

/**
 * Mobile responsive slide-over menu
 */
function initMobileMenu() {
    const nav = document.getElementById('main-nav') || document.getElementById('topNav');
    if (!nav) return;

    const menuBtn = Array.from(nav.querySelectorAll('button')).find(btn => 
        btn.querySelector('.material-symbols-outlined') && 
        btn.querySelector('.material-symbols-outlined').textContent.trim() === 'menu'
    );

    if (!menuBtn) return;

    // Create Mobile Menu Overlay dynamically
    const mobileMenu = document.createElement('div');
    mobileMenu.id = 'mobile-menu-overlay';
    mobileMenu.className = 'fixed inset-0 z-50 hidden opacity-0 transition-opacity duration-300 pointer-events-none';
    mobileMenu.innerHTML = `
        <div class="absolute inset-0 bg-background/80 backdrop-blur-md"></div>
        <div class="absolute right-0 top-0 w-80 h-full bg-surface-container border-l border-white/5 p-8 flex flex-col justify-between transform translate-x-full transition-transform duration-300 shadow-2xl">
            <div>
                <div class="flex justify-between items-center mb-12">
                    <span class="font-headline-md text-headline-md italic text-primary-fixed uppercase">TITAN MENU</span>
                    <button id="close-mobile-menu" class="text-on-surface hover:text-primary-fixed transition-colors">
                        <span class="material-symbols-outlined text-[32px]">close</span>
                    </button>
                </div>
                <div class="flex flex-col gap-6">
                    <a class="font-headline-md text-headline-md uppercase tracking-wider text-on-surface hover:text-primary-fixed transition-colors duration-200" href="index.html">Home</a>
                    <a class="font-headline-md text-headline-md uppercase tracking-wider text-on-surface hover:text-primary-fixed transition-colors duration-200" href="schedule.html">Schedule</a>
                    <a class="font-headline-md text-headline-md uppercase tracking-wider text-on-surface hover:text-primary-fixed transition-colors duration-200" href="coaches.html">Coaches</a>
                    <a class="font-headline-md text-headline-md uppercase tracking-wider text-on-surface hover:text-primary-fixed transition-colors duration-200" href="membership.html">Membership</a>
                </div>
            </div>
            <div class="flex flex-col gap-4">
                <button id="mobile-join-btn" class="w-full bg-primary-fixed text-on-primary-fixed font-headline-md text-headline-md py-3 uppercase rounded neon-glow">JOIN NOW</button>
                <div class="text-center font-body-md text-body-md text-on-surface-variant opacity-75">
                    © 2026 TITAN CLUB
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(mobileMenu);

    const overlay = document.getElementById('mobile-menu-overlay');
    const menuContainer = overlay.querySelector('div:nth-child(2)');
    const closeBtn = document.getElementById('close-mobile-menu');
    const mobileJoinBtn = document.getElementById('mobile-join-btn');

    function openMenu() {
        overlay.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
        setTimeout(() => {
            overlay.classList.add('opacity-100');
            overlay.classList.remove('pointer-events-none');
            menuContainer.classList.remove('translate-x-full');
        }, 50);
    }

    function closeMenu() {
        overlay.classList.remove('opacity-100');
        overlay.classList.add('pointer-events-none');
        menuContainer.classList.add('translate-x-full');
        document.body.classList.remove('overflow-hidden');
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 300);
    }

    menuBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target === overlay.firstElementChild) {
            closeMenu();
        }
    });

    if (mobileJoinBtn) {
        mobileJoinBtn.addEventListener('click', () => {
            closeMenu();
            window.location.href = 'membership.html';
        });
    }

    // Interconnect join buttons on navbars
    const joinBtns = document.querySelectorAll('nav button');
    joinBtns.forEach(btn => {
        if (btn.textContent.trim() === 'JOIN NOW') {
            btn.addEventListener('click', () => {
                window.location.href = 'membership.html';
            });
        } else if (btn.textContent.trim() === 'MY PLAN') {
            btn.addEventListener('click', () => {
                toggleDashboard(true);
            });
        }
    });
}

/**
 * Updates navigation elements based on current LocalStorage membership state
 */
function updateMembershipBadge() {
    const membership = localStorage.getItem('titan_membership');
    if (membership) {
        const joinBtns = document.querySelectorAll('nav button');
        joinBtns.forEach(btn => {
            if (btn.textContent.trim() === 'JOIN NOW' || btn.textContent.trim() === 'MY PLAN') {
                btn.textContent = 'MY PLAN';
                btn.className = 'hidden md:block font-label-lg text-label-lg uppercase tracking-wider bg-surface-bright text-primary-fixed border border-primary-fixed/50 px-6 py-2 rounded scale-95 hover:scale-100 active:scale-90 transition-all neon-glow';
                
                // Add click listener to open dashboard
                btn.onclick = (e) => {
                    e.preventDefault();
                    toggleDashboard(true);
                };
            }
        });

        const mobileJoinBtn = document.getElementById('mobile-join-btn');
        if (mobileJoinBtn) {
            mobileJoinBtn.textContent = `PLAN: ${membership.toUpperCase()}`;
            mobileJoinBtn.onclick = () => {
                const overlay = document.getElementById('mobile-menu-overlay');
                if (overlay) overlay.click(); // Close mobile nav
                toggleDashboard(true);
            };
        }
    }
}

/**
 * Modal dialogue helper functions
 */
window.TitanModal = {
    open: function(modalId, onOpen) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
        
        setTimeout(() => {
            modal.classList.add('opacity-100');
            const content = modal.querySelector('.modal-content');
            if (content) content.classList.add('scale-100');
            modal.classList.add('modal-active');
        }, 50);

        if (onOpen) onOpen(modal);
    },
    
    close: function(modalId, onClose) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        modal.classList.remove('opacity-100');
        const content = modal.querySelector('.modal-content');
        if (content) content.classList.remove('scale-100');
        modal.classList.remove('modal-active');
        document.body.classList.remove('overflow-hidden');
        
        setTimeout(() => {
            modal.classList.add('hidden');
            if (onClose) onClose(modal);
        }, 300);
    }
};

/**
 * Global Accent Theme Switcher Logic
 */
function initThemeSwitcher() {
    const savedTheme = localStorage.getItem('titan_theme') || 'default';
    setTitanTheme(savedTheme);

    // Dynamic widget injection
    const themeWidget = document.createElement('div');
    themeWidget.id = 'titan-theme-widget';
    themeWidget.className = 'fixed bottom-6 left-6 z-40 bg-surface-container/90 backdrop-blur-md border border-white/10 rounded-full p-2 flex items-center gap-2 shadow-2xl transition-all duration-300';
    themeWidget.innerHTML = `
        <button id="theme-btn-default" class="w-8 h-8 rounded-full bg-[#d2f000] border-2 border-white/20 hover:border-white transition-all flex items-center justify-center cursor-pointer shadow-[0_0_10px_rgba(210,240,0,0.4)]" title="Electric Lime">
            <span class="material-symbols-outlined text-[16px] text-surface font-black hidden">check</span>
        </button>
        <button id="theme-btn-cyber" class="w-8 h-8 rounded-full bg-[#a855f7] border-2 border-white/20 hover:border-white transition-all flex items-center justify-center cursor-pointer shadow-[0_0_10px_rgba(168,85,247,0.4)]" title="Cyberpunk Violet">
            <span class="material-symbols-outlined text-[16px] text-white font-black hidden">check</span>
        </button>
        <button id="theme-btn-inferno" class="w-8 h-8 rounded-full bg-[#ff5722] border-2 border-white/20 hover:border-white transition-all flex items-center justify-center cursor-pointer shadow-[0_0_10px_rgba(255,87,34,0.4)]" title="Inferno Orange">
            <span class="material-symbols-outlined text-[16px] text-white font-black hidden">check</span>
        </button>
    `;
    document.body.appendChild(themeWidget);

    // Event listeners
    document.getElementById('theme-btn-default').addEventListener('click', () => setTitanTheme('default'));
    document.getElementById('theme-btn-cyber').addEventListener('click', () => setTitanTheme('cyber'));
    document.getElementById('theme-btn-inferno').addEventListener('click', () => setTitanTheme('inferno'));

    updateThemeButtons(savedTheme);
}

function setTitanTheme(theme) {
    const htmlNode = document.documentElement;
    if (theme === 'default') {
        htmlNode.removeAttribute('data-theme');
    } else {
        htmlNode.setAttribute('data-theme', theme);
    }
    localStorage.setItem('titan_theme', theme);
    updateThemeButtons(theme);
}

function updateThemeButtons(activeTheme) {
    const defaultBtn = document.getElementById('theme-btn-default');
    const cyberBtn = document.getElementById('theme-btn-cyber');
    const infernoBtn = document.getElementById('theme-btn-inferno');
    
    if (!defaultBtn || !cyberBtn || !infernoBtn) return;

    // Reset check indicators
    [defaultBtn, cyberBtn, infernoBtn].forEach(btn => {
        const icon = btn.querySelector('span');
        if (icon) icon.classList.add('hidden');
        btn.classList.remove('border-white', 'scale-110');
        btn.classList.add('border-white/20');
    });

    let activeBtn = defaultBtn;
    if (activeTheme === 'cyber') activeBtn = cyberBtn;
    else if (activeTheme === 'inferno') activeBtn = infernoBtn;

    activeBtn.classList.remove('border-white/20');
    activeBtn.classList.add('border-white', 'scale-110');
    const activeIcon = activeBtn.querySelector('span');
    if (activeIcon) activeIcon.classList.remove('hidden');
}

/**
 * Personal Performance Dashboard slide-over
 */
function initDashboard() {
    // 1. Inject slide-over panel HTML structure
    const portal = document.createElement('div');
    portal.id = 'dashboard-portal';
    portal.className = 'fixed inset-0 z-50 hidden opacity-0 transition-opacity duration-300 pointer-events-none';
    portal.innerHTML = `
        <div class="absolute inset-0 bg-background/80 backdrop-blur-md cursor-pointer" onclick="toggleDashboard(false)"></div>
        <div id="dashboard-container" class="absolute right-0 top-0 w-full sm:w-[460px] h-full bg-surface-container border-l border-white/5 p-6 flex flex-col justify-between transform translate-x-full transition-transform duration-300 shadow-2xl overflow-y-auto">
            <!-- Dynamic Content Injected Here -->
        </div>
    `;
    document.body.appendChild(portal);

    // 2. Inject floating trigger button in the bottom-right
    const triggerBtn = document.createElement('button');
    triggerBtn.id = 'dashboard-trigger-btn';
    triggerBtn.className = 'fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary-fixed text-on-primary-fixed rounded-full flex items-center justify-center shadow-2xl neon-glow transition-transform hover:scale-110 active:scale-95 cursor-pointer';
    triggerBtn.title = 'Personal Performance Portal';
    triggerBtn.innerHTML = `<span class="material-symbols-outlined text-[28px]" style="font-variation-settings: 'FILL' 1;">account_circle</span>`;
    triggerBtn.onclick = () => toggleDashboard(true);
    document.body.appendChild(triggerBtn);
}

window.toggleDashboard = function(open) {
    const portal = document.getElementById('dashboard-portal');
    const container = document.getElementById('dashboard-container');
    if (!portal || !container) return;

    if (open) {
        renderDashboardContent();
        portal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
        setTimeout(() => {
            portal.classList.add('opacity-100');
            portal.classList.remove('pointer-events-none');
            container.classList.remove('translate-x-full');
        }, 50);
    } else {
        portal.classList.remove('opacity-100');
        portal.classList.add('pointer-events-none');
        container.classList.add('translate-x-full');
        document.body.classList.remove('overflow-hidden');
        setTimeout(() => {
            portal.classList.add('hidden');
        }, 300);
    }
};

function renderDashboardContent() {
    const container = document.getElementById('dashboard-container');
    if (!container) return;

    const membership = localStorage.getItem('titan_membership');
    const theme = localStorage.getItem('titan_theme') || 'default';
    
    // Theme branding context
    let themeColorName = "Electric Lime";
    if (theme === 'cyber') themeColorName = "Cyberpunk Violet";
    else if (theme === 'inferno') themeColorName = "Inferno Orange";

    if (!membership) {
        // Unauthenticated / Unsubscribed State
        container.innerHTML = `
            <div class="flex flex-col h-full justify-between">
                <div>
                    <div class="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                        <span class="font-headline-md text-headline-md italic text-primary-fixed uppercase">TITAN PORTAL</span>
                        <button onclick="toggleDashboard(false)" class="text-on-surface hover:text-primary-fixed transition-colors">
                            <span class="material-symbols-outlined text-[32px]">close</span>
                        </button>
                    </div>
                    <div class="text-center py-12">
                        <div class="w-20 h-20 bg-surface-container-high border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span class="material-symbols-outlined text-[40px] text-on-surface-variant/40">lock</span>
                        </div>
                        <h3 class="font-headline-lg text-headline-lg uppercase italic text-white mb-2">ACCESS LOCKED</h3>
                        <p class="font-body-md text-body-md text-on-surface-variant max-w-sm mx-auto mb-8">
                            A Personal Performance Portal requires an active membership subscription. Unleash your inner athlete today.
                        </p>
                        <button onclick="toggleDashboard(false); window.location.href='membership.html';" class="w-full bg-primary-fixed text-on-primary-fixed font-headline-md text-headline-md uppercase py-4 rounded neon-glow">
                            CHOOSE A MEMBERSHIP PLAN
                        </button>
                    </div>
                </div>
                
                <div class="pt-6 border-t border-white/5">
                    <h4 class="font-label-lg text-label-lg uppercase tracking-wider text-white mb-3">CURRENT ACCENT PROFILE</h4>
                    <div class="flex items-center gap-3">
                        <span class="w-3.5 h-3.5 rounded-full bg-primary-fixed inline-block neon-glow"></span>
                        <span class="font-body-md text-body-md text-on-surface-variant">${themeColorName}</span>
                    </div>
                </div>
            </div>
        `;
        return;
    }

    // Active Membership Dashboard Layout
    const bookings = JSON.parse(localStorage.getItem('titan_bookings') || '{}');
    const weightLogs = JSON.parse(localStorage.getItem('titan_weight_logs') || '[]');
    const currentWeight = weightLogs.length > 0 ? weightLogs[weightLogs.length - 1].weight : '0';
    const waterIntake = parseInt(localStorage.getItem('titan_water_intake') || '0');
    const waterTarget = 3000;
    const waterProgress = Math.min((waterIntake / waterTarget) * 100, 100);

    let bookingsHtml = '';
    const bookedIds = Object.keys(bookings);
    
    if (bookedIds.length === 0) {
        bookingsHtml = `
            <div class="text-center py-6 bg-surface-container-low border border-white/5 rounded p-4">
                <p class="font-body-md text-body-md text-on-surface-variant opacity-60 mb-3">No active class reservations.</p>
                <button onclick="toggleDashboard(false); window.location.href='schedule.html';" class="text-primary-fixed hover:underline uppercase text-sm font-label-lg tracking-wider">BOOK A CLASS NOW</button>
            </div>
        `;
    } else {
        bookingsHtml = `<div class="space-y-3">`;
        bookedIds.forEach(id => {
            const b = bookings[id];
            const typeLabel = b.type === 'waitlist' ? 'Waitlisted' : 'Booked';
            const typeColor = b.type === 'waitlist' ? 'border-yellow-500/30 text-yellow-500 bg-yellow-500/10' : 'border-primary-fixed/30 text-primary-fixed bg-primary-fixed/10';
            
            bookingsHtml += `
                <div class="bg-surface-container-low border border-white/5 p-4 rounded flex justify-between items-center hover:border-white/10 transition-colors">
                    <div>
                        <div class="flex items-center gap-2 mb-1">
                            <h5 class="font-headline-md text-[18px] text-white uppercase leading-none">${id.split('_')[0].toUpperCase()} PERFORMANCE</h5>
                            <span class="text-[10px] px-2 py-0.5 border uppercase font-label-sm rounded ${typeColor}">${typeLabel}</span>
                        </div>
                        <p class="font-label-lg text-label-lg text-primary-fixed/80">${b.time || 'Schedule Class'}</p>
                    </div>
                    <button onclick="cancelBookingFromDashboard('${id}')" class="text-on-surface-variant hover:text-red-500 hover:bg-red-500/10 w-8 h-8 rounded flex items-center justify-center transition-colors" title="Cancel Booking">
                        <span class="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                </div>
            `;
        });
        bookingsHtml += `</div>`;
    }

    container.innerHTML = `
        <div class="flex flex-col h-full justify-between">
            <div class="space-y-8">
                <!-- Header -->
                <div class="flex justify-between items-center pb-4 border-b border-white/5">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary-fixed" style="font-variation-settings: 'FILL' 1;">speed</span>
                        <span class="font-headline-md text-headline-md italic text-white uppercase tracking-wider">TITAN PORTAL</span>
                    </div>
                    <button onclick="toggleDashboard(false)" class="text-on-surface hover:text-primary-fixed transition-colors cursor-pointer">
                        <span class="material-symbols-outlined text-[32px]">close</span>
                    </button>
                </div>

                <!-- Premium Member Card -->
                <div class="relative bg-gradient-to-br from-surface-container-high to-surface-container border border-primary-fixed/30 rounded-lg p-6 overflow-hidden shadow-2xl neon-glow">
                    <!-- Tech overlay grids -->
                    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-fixed/10 via-transparent to-transparent pointer-events-none"></div>
                    
                    <div class="relative z-10 flex justify-between items-start mb-6">
                        <div>
                            <span class="font-label-sm text-label-sm text-primary-fixed uppercase tracking-widest opacity-80 block mb-1">TITAN PERFORMANCE CLUB</span>
                            <h3 class="font-headline-lg text-headline-lg uppercase italic text-white leading-none">MEMBER</h3>
                        </div>
                        <span class="material-symbols-outlined text-primary-fixed text-[36px]" style="font-variation-settings: 'FILL' 1;">military_tech</span>
                    </div>
                    
                    <div class="relative z-10 flex justify-between items-end mt-12">
                        <div>
                            <span class="font-body-md text-body-md text-on-surface-variant uppercase opacity-60 block">MEMBER ID</span>
                            <span class="font-headline-md text-[20px] text-white tracking-widest">TITAN-8392-${membership.toUpperCase()}</span>
                        </div>
                        <div class="text-right">
                            <span class="font-body-md text-body-md text-on-surface-variant uppercase opacity-60 block">LEVEL TIER</span>
                            <span class="font-headline-md text-headline-md text-primary-fixed uppercase italic leading-none">${membership}</span>
                        </div>
                    </div>
                </div>

                <!-- Your Scheduled Classes -->
                <div>
                    <h4 class="font-headline-md text-headline-md text-white uppercase mb-4 tracking-wide flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary-fixed text-xl">event_available</span> RESERVATIONS
                    </h4>
                    ${bookingsHtml}
                </div>

                <!-- Daily Biometric Tracker -->
                <div class="space-y-6">
                    <h4 class="font-headline-md text-headline-md text-white uppercase mb-2 tracking-wide flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary-fixed text-xl">insights</span> PERFORMANCE LABS
                    </h4>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <!-- Weight Logger Widget -->
                        <div class="bg-surface-container-low border border-white/5 p-4 rounded flex flex-col justify-between">
                            <div>
                                <span class="font-label-sm text-label-sm text-on-surface-variant uppercase opacity-75">Weight Log</span>
                                <div class="flex items-baseline gap-1 mt-1 mb-2">
                                    <span class="font-headline-lg text-headline-lg text-white" id="db-current-weight">${currentWeight}</span>
                                    <span class="font-body-md text-body-md text-on-surface-variant">kg</span>
                                </div>
                            </div>
                            <div class="flex gap-2">
                                <input type="number" step="0.1" id="weight-input" placeholder="00.0" class="w-full bg-surface-container-high border border-white/10 rounded px-2 py-1 text-white text-sm text-center focus:border-primary-fixed focus:ring-0">
                                <button onclick="logBodyWeight()" class="bg-primary-fixed text-on-primary-fixed px-3 py-1 font-label-lg text-sm rounded cursor-pointer hover:bg-primary-fixed-dim transition-colors">LOG</button>
                            </div>
                        </div>

                        <!-- Hydration Progress Widget -->
                        <div class="bg-surface-container-low border border-white/5 p-4 rounded flex flex-col justify-between relative overflow-hidden">
                            <div>
                                <div class="flex justify-between items-start">
                                    <span class="font-label-sm text-label-sm text-on-surface-variant uppercase opacity-75">Hydration</span>
                                    <span class="material-symbols-outlined text-primary-fixed text-xl">water_drop</span>
                                </div>
                                <div class="flex items-baseline gap-1 mt-1">
                                    <span class="font-headline-lg text-headline-lg text-white" id="db-water-value">${waterIntake}</span>
                                    <span class="font-body-md text-body-md text-on-surface-variant">/ ${waterTarget}ml</span>
                                </div>
                                <div class="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden mt-3">
                                    <div class="bg-primary-fixed h-full transition-all duration-300" id="db-water-bar" style="width: ${waterProgress}%"></div>
                                </div>
                            </div>
                            <div class="flex justify-between gap-1 mt-3">
                                <button onclick="addWaterIntake(250)" class="w-full bg-surface-container-high border border-white/10 text-xs font-label-lg py-1 rounded text-white hover:border-primary-fixed/50 hover:text-primary-fixed transition-colors">+250ml</button>
                                <button onclick="addWaterIntake(500)" class="w-full bg-surface-container-high border border-white/10 text-xs font-label-lg py-1 rounded text-white hover:border-primary-fixed/50 hover:text-primary-fixed transition-colors">+500ml</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer / Theme details -->
            <div class="pt-6 border-t border-white/5 mt-8 flex justify-between items-center">
                <div>
                    <span class="text-[10px] font-label-sm text-on-surface-variant uppercase opacity-60 block">Accent Accent Profile</span>
                    <div class="flex items-center gap-2 mt-1">
                        <span class="w-3.5 h-3.5 rounded-full bg-primary-fixed inline-block neon-glow"></span>
                        <span class="font-body-md text-[14px] text-white leading-none">${themeColorName}</span>
                    </div>
                </div>
                <button onclick="logoutTitanClub()" class="text-on-surface-variant hover:text-red-400 font-label-lg text-sm uppercase tracking-wider flex items-center gap-1 hover:underline transition-colors">
                    <span class="material-symbols-outlined text-[16px]">logout</span> Disconnect
                </button>
            </div>
        </div>
    `;
}

/**
 * Biometrics Logging Functions
 */
window.logBodyWeight = function() {
    const input = document.getElementById('weight-input');
    if (!input || !input.value) return;

    const weightVal = parseFloat(input.value);
    if (isNaN(weightVal) || weightVal <= 0) return;

    const logs = JSON.parse(localStorage.getItem('titan_weight_logs') || '[]');
    logs.push({
        weight: weightVal,
        date: new Date().toLocaleDateString()
    });
    localStorage.setItem('titan_weight_logs', JSON.stringify(logs));
    
    // Update live DOM
    const currentWeightLabel = document.getElementById('db-current-weight');
    if (currentWeightLabel) currentWeightLabel.textContent = weightVal.toFixed(1);
    
    input.value = '';
    
    // Dispatch events to synchronize on-page calculators if active
    document.dispatchEvent(new CustomEvent('titanWeightLogged', { detail: { weight: weightVal } }));
};

window.addWaterIntake = function(amount) {
    let water = parseInt(localStorage.getItem('titan_water_intake') || '0');
    water += amount;
    localStorage.setItem('titan_water_intake', water.toString());

    // Update live DOM
    const valueLabel = document.getElementById('db-water-value');
    const bar = document.getElementById('db-water-bar');
    if (valueLabel) valueLabel.textContent = water;
    if (bar) {
        const progress = Math.min((water / 3000) * 100, 100);
        bar.style.width = `${progress}%`;
    }
};

window.cancelBookingFromDashboard = function(classId) {
    const bookings = JSON.parse(localStorage.getItem('titan_bookings') || '{}');
    if (bookings[classId]) {
        delete bookings[classId];
        localStorage.setItem('titan_bookings', JSON.stringify(bookings));
        
        // Refresh Dashboard content
        renderDashboardContent();

        // Dispatch customized cancel event to synchronize active on-page schedule components if open
        const event = new CustomEvent('titanBookingCancelled', { detail: { id: classId } });
        document.dispatchEvent(event);
    }
};

window.logoutTitanClub = function() {
    if (confirm('Disconnect from your local Titan account details? This preserves weight logs but deletes active plan tier.')) {
        localStorage.removeItem('titan_membership');
        localStorage.removeItem('titan_bookings');
        localStorage.removeItem('titan_water_intake');
        
        // Reset nav badges and reload page
        updateMembershipBadge();
        toggleDashboard(false);
        window.location.reload();
    }
};

// Listen to booking changes dispatched by local scripts
document.addEventListener('titanBookingConfirmed', () => {
    updateMembershipBadge();
});
document.addEventListener('titanBookingCancelled', (e) => {
    const id = e.detail.id;
    // Handle reversing book elements on schedule.html if open
    const card = document.querySelector(`.class-card[data-id="${id}"]`);
    if (card) {
        const badge = card.querySelector('.badge');
        if (badge && (badge.textContent === 'Booked' || badge.textContent === 'Waitlisted')) {
            badge.remove();
        }
        const isWaitlist = id.includes('lifting'); // Power Lifting is the only waitlisted class by default
        const button = card.querySelector('button');
        if (button) {
            // Rebuild button state
            const newBtn = document.createElement('button');
            if (isWaitlist) {
                newBtn.className = 'waitlist-btn w-full bg-surface-container-high text-on-surface-variant hover:text-white hover:bg-red-500/20 hover:border-red-500/50 border border-transparent font-headline-md text-headline-md py-2 uppercase transition-all';
                newBtn.textContent = 'WAITLIST';
                newBtn.onclick = () => openBookingFlow(card, 'waitlist');
            } else {
                newBtn.className = 'book-btn w-full bg-transparent border-2 border-white/20 text-primary font-headline-md text-headline-md py-2 uppercase group-hover:border-primary-fixed group-hover:text-primary-fixed group-hover:neon-glow transition-all';
                newBtn.textContent = 'BOOK';
                newBtn.onclick = () => openBookingFlow(card, 'book');
            }
            button.replaceWith(newBtn);
        }
    }
});
