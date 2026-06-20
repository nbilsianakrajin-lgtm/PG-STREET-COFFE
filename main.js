document.addEventListener("DOMContentLoaded", () => {
    // ==========================================================================
    // 0. PERSISTENT AUTH STATE (Mengingat Status Login Saat Pindah Halaman)
    // ==========================================================================
    let isLoggedIn = localStorage.getItem("punkLoggedIn") === "true"; 

    // ==========================================================================
    // 1. DATA MASTER PRODUK (20 VARIASI MENU)
    // ==========================================================================
    const products = [
        // COFFEE BASE (8 MENU)
        { id: 1, name: "STREET ESPRESSO", price: 18, category: "coffee", desc: "Ekstraksi murni biji kopi lokal berkadar kafein tinggi.", img: "image/1.jpg" },
        { id: 2, name: "BLACK MOSHPIT", price: 20, category: "coffee", desc: "Americano dingin tanpa gula, pahit dan keras bak lantai dansa.", img: "image/2.jpg" },
        { id: 3, name: "NEON LATTE", price: 25, category: "coffee", desc: "Es kopi susu dengan pemanis gula aren rahasia markas.", img: "image/3.jpg" },
        { id: 4, name: "VANDAL CAPPUCCINO", price: 24, category: "coffee", desc: "Cappuccino klasik dengan taburan cokelat pekat di atasnya.", img: "image/4.jpg" },
        { id: 5, name: "OVERDOSE MOCHA", price: 26, category: "coffee", desc: "Perpaduan kopi espresso ganda dan sirup cokelat pekat.", img: "image/5.jpg" },
        { id: 6, name: "ANARCHY COLD BREW", price: 25, category: "coffee", desc: "Kopi seduh dingin hasil ekstraksi gerilya selama 12 jam.", img: "image/6.jpg" },
        { id: 7, name: "RIZLA MAZZAGRAN", price: 27, category: "coffee", desc: "Perpaduan unik espresso dingin dengan kesegaran perasan lemon.", img: "image/7.jpg" },
        { id: 8, name: "AFFOGATO REBEL", price: 23, category: "coffee", desc: "Satu skup es krim vanila disiram espresso panas yang membakar.", img: "image/8.jpg" },

        // NON-COFFEE (6 MENU)
        { id: 9, name: "FUCHSIA MATCHA", price: 24, category: "noncoffee", desc: "Greentea murni tanpa kopi dengan susu segar pilihan.", img: "image/9.jpg" },
        { id: 10, name: "CYBER CHOCOLATE", price: 22, category: "noncoffee", desc: "Cokelat pekat jalanan premium, disajikan dingin atau panas.", img: "image/10.jpg" },
        { id: 11, name: "RED GRAFFITI", price: 23, category: "noncoffee", desc: "Susu red velvet lembut dengan sensasi manis gurih merata.", img: "image/11.jpg" },
        { id: 12, name: "TAROT SYSTEM", price: 23, category: "noncoffee", desc: "Minuman rasa taro (talas) manis legit penenang pikiran.", img: "image/12.jpg" },
        { id: 13, name: "LEMON INTERCEPT", price: 18, category: "noncoffee", desc: "Teh lemon segar peretas dahaga cuaca panas aspal kota.", img: "image/13.jpg" },
        { id: 14, name: "ASPHALT MILKSHAKE", price: 25, category: "noncoffee", desc: "Milkshake vanilla dengan taburan biskuit Oreo hancur.", img: "image/14.jpg" },

        // STREET SNACKS (6 MENU)
        { id: 15, name: "PUNK FRIES", price: 17, category: "snack", desc: "Kentang goreng renyah ditaburi bumbu pedas berdistorsi.", img: "image/15.jpg" },
        { id: 16, name: "GARAGE CROISSANT", price: 20, category: "snack", desc: "Pastry mentega renyah pas buat teman minum espresso panas.", img: "image/16.jpg" },
        { id: 17, name: "RIOT CHURROS", price: 18, category: "snack", desc: "Camilan goreng spanyol dengan cocolan saus cokelat pekat.", img: "image/17.jpg" },
        { id: 18, name: "TOASTED REBEL", price: 19, category: "snack", desc: "Roti bakar keju cokelat melimpah pengganjal lapar malam.", img: "image/18.jpg" },
        { id: 19, name: "ASPHALT NACHOS", price: 22, category: "snack", desc: "Keripik tortilla renyah disiram saus keju gurih hangat.", img: "image/19.jpg" },
        { id: 20, name: "SQUAD COOKIES", price: 15, category: "snack", desc: "Kue kering panggang dengan serpihan cokelat manis meleleh.", img: "image/20.jpg" }
    ];

    const bestSellers = [2, 3, 5, 9, 15];

    // ==========================================================================
    // 2. SISTEM MOBILE HAMBURGER MENU
    // ==========================================================================
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const navLinksContainer = document.getElementById("nav-links-container");

    if (hamburgerMenu && navLinksContainer) {
        hamburgerMenu.addEventListener("click", () => {
            navLinksContainer.classList.toggle("show");
        });
    }

    // ==========================================================================
    // 3. RENDER PRODUK DAN FILTER SIDEBAR (KHUSUS HALAMAN MENU)
    // ==========================================================================
    const menuGrid = document.getElementById("menu-grid");
    const tabButtons = document.querySelectorAll(".menu-sidebar .tab-btn");

    function displayProducts(categoryFilter) {
        if (!menuGrid) return; 
        
        menuGrid.innerHTML = "";
        let filtered = [];

        if (categoryFilter === "all") {
            filtered = products;
        } else if (categoryFilter === "best") {
            filtered = products.filter(p => bestSellers.includes(p.id));
        } else {
            filtered = products.filter(p => p.category === categoryFilter);
        }

        filtered.forEach(product => {
            const card = document.createElement("div");
            card.className = "menu-item-card";
            card.innerHTML = `
                <div class="menu-img-box">
                    <img src="${product.img}" alt="${product.name}" loading="lazy">
                </div>
                <div class="menu-info-box">
                    <h3 class="menu-item-title">${product.name}</h3>
                    <p class="menu-item-desc">${product.desc}</p>
                    <div class="menu-action-row">
                        <span class="menu-item-price">IDR ${product.price}K</span>
                        <button class="btn-add-cart" data-id="${product.id}">+ ADD FUEL</button>
                    </div>
                </div>
            `;
            menuGrid.appendChild(card);
        });

        initAddToCartButtons();
    }

    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener("click", () => {
                tabButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                
                const selectedCategory = button.getAttribute("data-category");
                displayProducts(selectedCategory);
            });
        });
        displayProducts("all");
    }

    // ==========================================================================
    // 4. INTERAKTIF POP-UP LOGIN / REGISTER SQUAD & LOGOUT MANAGEMENT
    // ==========================================================================
    const authTrigger = document.getElementById("auth-trigger");
    const authModal = document.getElementById("auth-modal");
    const closeAuth = document.getElementById("close-auth");
    
    const loginWrapper = document.getElementById("login-form-wrapper");
    const registerWrapper = document.getElementById("register-form-wrapper");
    const toRegisterLink = document.getElementById("to-register");
    const toLoginLink = document.getElementById("to-login");

    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");

    const authOnlyNavItems = document.querySelectorAll(".auth-only");

    function syncAuthNav() {
        authOnlyNavItems.forEach(item => {
            if (isLoggedIn) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });
        if (authTrigger) {
            authTrigger.textContent = isLoggedIn ? "SQUAD LOGOUT" : "MEMBER SIGN-IN";
        }
    }

    // Menyesuaikan teks tombol dan menu navbar saat pertama kali halaman dimuat berdasarkan memori browser
    syncAuthNav();

    if (authTrigger && authModal && closeAuth) {
        authTrigger.addEventListener("click", () => {
            if (isLoggedIn) {
                // Jalankan fungsi logout murni
                isLoggedIn = false;
                localStorage.removeItem("punkLoggedIn"); // Hapus status dari browser
                syncAuthNav();
                showPunkToast("🔒 ID SQUAD BERHASIL LOGOUT.");
                
                // Bersihkan keranjang belanja demi keamanan privasi akun
                cart = [];
                localStorage.removeItem("punkCart");
                updateCartSystem();

                const currentPath = window.location.pathname.toLowerCase();
                if (currentPath.endsWith('dashboard.html') || currentPath.endsWith('profile.html')) {
                    window.location.href = 'index.html';
                }
            } else {
                authModal.classList.add("show");
            }
        });
        closeAuth.addEventListener("click", () => authModal.classList.remove("show"));
    }

    if (toRegisterLink && toLoginLink) {
        toRegisterLink.addEventListener("click", (e) => {
            e.preventDefault();
            loginWrapper.classList.add("hidden");
            registerWrapper.classList.remove("hidden");
        });

        toLoginLink.addEventListener("click", (e) => {
            e.preventDefault();
            registerWrapper.classList.add("hidden");
            loginWrapper.classList.remove("hidden");
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            isLoggedIn = true; 
            localStorage.setItem("punkLoggedIn", "true"); // Menyimpan status login permanen ke browser
            syncAuthNav(); // Update navbar untuk menampilkan DASHBOARD & PROFILE
            showPunkToast("🔓 ACCESS GRANTED. SELAMAT DATANG REBEL!");
            if (authTrigger) authTrigger.textContent = "SQUAD LOGOUT";
            authModal.classList.remove("show");
            loginForm.reset();
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            isLoggedIn = true;
            localStorage.setItem("punkLoggedIn", "true");
            syncAuthNav(); // Update navbar untuk menampilkan DASHBOARD & PROFILE
            showPunkToast("💾 SQUAD ID BARU BERHASIL DI-DEPOSIT! SELAMAT BERGABUNG!");
            registerWrapper.classList.add("hidden");
            loginWrapper.classList.remove("hidden");
            registerForm.reset();
        });
    }

    // ==========================================================================
    // 5. SISTEM MANAGEMEN KERANJANG BELANJA & INTEGRASI BLOKIR AKSES
    // ==========================================================================
    let cart = JSON.parse(localStorage.getItem("punkCart")) || [];
    
    const cartTrigger = document.getElementById("cart-trigger");
    const cartModal = document.getElementById("cart-modal");
    const closeCart = document.getElementById("close-cart");
    const cartItemsContainer = document.getElementById("cart-items-container");
    const cartTotalPrice = document.getElementById("cart-total-price");
    const cartCountBadge = document.getElementById("cart-count");

    const checkoutModal = document.getElementById("checkout-modal");
    const closeCheckout = document.getElementById("close-checkout");
    const btnNextCheckout = document.getElementById("btn-next-checkout");
    const btnCheckout = document.getElementById("btn-checkout-punk");

    function updateCartSystem() {
        if (cartCountBadge) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCountBadge.textContent = totalItems;
        }

        if (cartItemsContainer && cartTotalPrice) {
            cartItemsContainer.innerHTML = "";
            let totalCost = 0;

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = `
                    <p style="font-family:'Courier New', monospace; text-align:center; color:#666; padding: 40px 0;">
                        Keranjang kosong.<br>Injeksi bensinmu sekarang!
                    </p>`;
            } else {
                cart.forEach((item, index) => {
                    totalCost += (item.price * item.quantity);
                    
                    const itemRow = document.createElement("div");
                    itemRow.className = "cart-item-row";
                    itemRow.innerHTML = `
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <p>IDR ${item.price}K &times; ${item.quantity}</p>
                        </div>
                        <button class="btn-remove-cart" data-index="${index}">&times; REMOVE</button>
                    `;
                    cartItemsContainer.appendChild(itemRow);
                });
            }
            cartTotalPrice.textContent = `IDR ${totalCost}K`;
        }
    }

    if (cartTrigger && cartModal) {
        cartTrigger.addEventListener("click", (e) => {
            e.preventDefault();
            cartModal.classList.add("show");
            updateCartSystem();
        });
    }

    if (closeCart && cartModal) {
        closeCart.addEventListener("click", () => {
            cartModal.classList.remove("show");
        });
    }

    if (closeCheckout && checkoutModal) {
        closeCheckout.addEventListener("click", () => {
            checkoutModal.classList.remove("show");
        });
    }

    if (btnNextCheckout) {
        btnNextCheckout.addEventListener("click", () => {
            if (cart.length === 0) {
                showPunkToast("❌ KERANJANG MASIH KOSONG, REBEL!");
                return;
            }
            if (cartModal) cartModal.classList.remove("show");
            if (checkoutModal) checkoutModal.classList.add("show");
        });
    }

    if (cartItemsContainer) {
        cartItemsContainer.addEventListener("click", (e) => {
            if (e.target.classList.contains("btn-remove-cart")) {
                const targetIndex = parseInt(e.target.getAttribute("data-index"));
                cart.splice(targetIndex, 1);
                localStorage.setItem("punkCart", JSON.stringify(cart));
                updateCartSystem();
                showPunkToast("💀 ITEM DIKELUARKAN DARI DAFTAR FUEL.");
            }
        });
    }

    // FUNGSI BLOKIR BELANJA KONSUMEN JIKA BELUM LOGIN
    function initAddToCartButtons() {
        const addButtons = document.querySelectorAll(".btn-add-cart");
        addButtons.forEach(button => {
            button.addEventListener("click", () => {
                
                // Validasi kritikal berbasis localStorage state
                if (!isLoggedIn) {
                    showPunkToast("❌ KONTROL: LOGIN / DAFTAR SQUAD TERLEBIH DAHULU!");
                    if (authModal) authModal.classList.add("show");
                    return; 
                }

                const productId = parseInt(button.getAttribute("data-id"));
                const selectedProduct = products.find(p => p.id === productId);

                if (selectedProduct) {
                    const existingItem = cart.find(item => item.id === productId);
                    if (existingItem) {
                        existingItem.quantity += 1;
                    } else {
                        cart.push({ ...selectedProduct, quantity: 1 });
                    }

                    localStorage.setItem("punkCart", JSON.stringify(cart));
                    updateCartSystem();
                    showPunkToast(`🛒 ${selectedProduct.name} BERHASIL DIINJEKSI SEBAGAI PESANAN!`);
                }
            });
        });
    }

    if (btnCheckout) {
        btnCheckout.addEventListener("click", () => {
            const selected = document.querySelector('input[name="punk-pay"]:checked');
            const method = selected ? selected.value : 'cod';

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const receiptId = 'PGR-' + Date.now().toString(36).toUpperCase().slice(-8);

            const receipt = {
                receiptId,
                createdAt: Date.now(),
                method,
                items: cart.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, img: i.img })),
                total,
                status: 'pending'
            };

            // Jika metode QRIS, tambahkan URL gambar QR untuk simulasi
            if (method === 'qris') {
                const qrData = `Nota:${receiptId}|Total:IDR${total}K`;
                receipt.paymentQr = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}`;
                showPunkToast('🔗 SILAKAN PINDAI QRIS pada layar nota.');
            } else if (method === 'bank') {
                receipt.bankInfo = 'BCA 123-456-789 a.n. PG STREET COFFEE';
                showPunkToast('🏦 Instruksi transfer tersimpan di nota (simulasi).');
            } else {
                // COD
                showPunkToast('💵 COD: Siapkan pembayaran tunai saat kurir tiba.');
            }

            // Simpan nota terakhir agar bisa ditampilkan di halaman nota
            localStorage.setItem('punkLastReceipt', JSON.stringify(receipt));

            // Kosongkan keranjang dan update storage
            cart = [];
            localStorage.removeItem('punkCart');
            updateCartSystem();

            if (checkoutModal) checkoutModal.classList.remove('show');

            // Show receipt as popup
            setTimeout(() => {
                showReceiptPopup(receipt);
            }, 350);
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === authModal) authModal.classList.remove("show");
        if (e.target === cartModal) cartModal.classList.remove("show");
        if (e.target === checkoutModal) checkoutModal.classList.remove("show");
    });

    updateCartSystem();

    function showReceiptPopup(receipt) {
        // remove existing
        const existing = document.getElementById('receipt-modal-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.id = 'receipt-modal-overlay';
        overlay.className = 'receipt-modal-overlay';

        const modal = document.createElement('div');
        modal.className = 'receipt-modal';

        let header = '<button class="btn-close-receipt" id="close-receipt-modal">&times;</button>';
        header += '<div class="modal-header">';
        header += '<div><strong>Nota Pembayaran</strong><br><small>' + new Date(receipt.createdAt).toLocaleString() + '</small></div>';
        header += '<div style="text-align:right;"><div><strong>Nota#</strong> ' + receipt.receiptId + '</div><div><strong>Metode:</strong> ' + receipt.method.toUpperCase() + '</div><div><strong>Status:</strong> ' + receipt.status.toUpperCase() + '</div><div><strong>Total:</strong> IDR ' + receipt.total + 'K</div></div>';
        header += '</div>';

        const itemsHtml = receipt.items.map(function(i){ return '<div class="receipt-row"><div class="receipt-row-left"><img src="' + i.img + '" alt="' + i.name + '"><div><div class="receipt-label">' + i.name + '</div><div class="receipt-quantity">x' + i.quantity + '</div></div></div><div class="receipt-value">IDR ' + i.price + 'K</div></div>'; }).join('');

        let body = '<div class="modal-body"><div class="receipt-items">' + itemsHtml + '</div></div>';

        modal.innerHTML = header + body;

        const actions = document.createElement('div');
        actions.className = 'receipt-actions';

        modal.appendChild(actions);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // add image or instructions depending on method
        if (receipt.method === 'qris') {
            const qrDiv = document.createElement('div'); qrDiv.className = 'receipt-qr';
            const img = document.createElement('img');
            img.src = receipt.paymentQr || ('https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' + encodeURIComponent('Nota:'+receipt.receiptId+'|Total:IDR'+receipt.total+'K'));
            qrDiv.appendChild(img);
            const count = document.createElement('div'); count.className = 'qris-countdown'; count.id = 'receipt-qris-count'; qrDiv.appendChild(count);
            modal.appendChild(qrDiv);

            const confirmBtn = document.createElement('button'); confirmBtn.className = 'btn-punk'; confirmBtn.textContent = 'SAYA SUDAH BAYAR';
            const closeBtn = document.createElement('button'); closeBtn.className = 'btn-punk-outline'; closeBtn.textContent = 'TUTUP';
            actions.appendChild(confirmBtn); actions.appendChild(closeBtn);

            let interval = null;
            function update() {
                const expiry = receipt.createdAt + (15*60*1000);
                const now = Date.now();
                const diff = expiry - now;
                const countdownEl = document.getElementById('receipt-qris-count');
                if (!countdownEl) return;
                if (diff<=0) {
                    clearInterval(interval);
                    receipt.status='expired'; localStorage.setItem('punkLastReceipt', JSON.stringify(receipt));
                    countdownEl.textContent='QR EXPIRED'; countdownEl.classList.add('expired'); confirmBtn.disabled=true; return;
                }
                const mins=Math.floor(diff/60000); const secs=Math.floor((diff%60000)/1000);
                countdownEl.textContent = 'Kadaluarsa dalam: ' + String(mins).padStart(2,'0') + ':' + String(secs).padStart(2,'0');
            }
            update(); interval=setInterval(update,1000);

            confirmBtn.addEventListener('click', function(){ clearInterval(interval); receipt.status='paid'; localStorage.setItem('punkLastReceipt', JSON.stringify(receipt)); showPunkToast('Pembayaran terkonfirmasi (simulasi)'); overlay.remove(); });
            closeBtn.addEventListener('click', function(){ clearInterval(interval); overlay.remove(); });
            document.getElementById('close-receipt-modal').addEventListener('click', function(){ clearInterval(interval); overlay.remove(); });
        } else {
            const closeBtn = document.createElement('button'); closeBtn.className='btn-punk-outline'; closeBtn.textContent='TUTUP'; actions.appendChild(closeBtn);
            closeBtn.addEventListener('click', function(){ overlay.remove(); });
            document.getElementById('close-receipt-modal').addEventListener('click', function(){ overlay.remove(); });
        }
    }

    // ==========================================================================
    // 6. TOAST NOTIFICATION FLOATING GENERATOR
    // ==========================================================================
    function showPunkToast(message) {
        const toastContainer = document.getElementById("toast-container");
        if (!toastContainer) return;

        const toastBox = document.createElement("div");
        toastBox.className = "punk-toast-box";
        toastBox.textContent = message;

        toastContainer.appendChild(toastBox);

        setTimeout(() => {
            toastBox.style.animation = "fadeOutPunk 0.4s ease-in forwards";
            setTimeout(() => {
                toastBox.remove();
            }, 400);
        }, 3500);
    }
});