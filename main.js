document.addEventListener("DOMContentLoaded", function() {

    // ==========================================================================
    // 0. PERSISTENT AUTH STATE
    // ==========================================================================
    let isLoggedIn = localStorage.getItem("punkLoggedIn") === "true";

    // ==========================================================================
    // 1. DATA MASTER PRODUK (20 VARIASI MENU)
    // ==========================================================================
    var products = [
        { id: 1, name: "STREET ESPRESSO", price: 18, category: "coffee", desc: "Ekstraksi murni biji kopi lokal berkadar kafein tinggi.", img: "image/1.jpg" },
        { id: 2, name: "BLACK MOSHPIT", price: 20, category: "coffee", desc: "Americano dingin tanpa gula, pahit dan keras bak lantai dansa.", img: "image/2.jpg" },
        { id: 3, name: "NEON LATTE", price: 25, category: "coffee", desc: "Es kopi susu dengan pemanis gula aren rahasia markas.", img: "image/3.jpg" },
        { id: 4, name: "VANDAL CAPPUCCINO", price: 24, category: "coffee", desc: "Cappuccino klasik dengan taburan cokelat pekat di atasnya.", img: "image/4.jpg" },
        { id: 5, name: "OVERDOSE MOCHA", price: 26, category: "coffee", desc: "Perpaduan kopi espresso ganda dan sirup cokelat pekat.", img: "image/5.jpg" },
        { id: 6, name: "ANARCHY COLD BREW", price: 25, category: "coffee", desc: "Kopi seduh dingin hasil ekstraksi gerilya selama 12 jam.", img: "image/6.jpg" },
        { id: 7, name: "RIZLA MAZZAGRAN", price: 27, category: "coffee", desc: "Perpaduan unik espresso dingin dengan kesegaran perasan lemon.", img: "image/7.jpg" },
        { id: 8, name: "AFFOGATO REBEL", price: 23, category: "coffee", desc: "Satu skup es krim vanila disiram espresso panas yang membakar.", img: "image/8.jpg" },
        { id: 9, name: "FUCHSIA MATCHA", price: 24, category: "noncoffee", desc: "Greentea murni tanpa kopi dengan susu segar pilihan.", img: "image/9.jpg" },
        { id: 10, name: "CYBER CHOCOLATE", price: 22, category: "noncoffee", desc: "Cokelat pekat jalanan premium, disajikan dingin atau panas.", img: "image/10.jpg" },
        { id: 11, name: "RED GRAFFITI", price: 23, category: "noncoffee", desc: "Susu red velvet lembut dengan sensasi manis gurih merata.", img: "image/11.jpg" },
        { id: 12, name: "TAROT SYSTEM", price: 23, category: "noncoffee", desc: "Minuman rasa taro (talas) manis legit penenang pikiran.", img: "image/12.jpg" },
        { id: 13, name: "LEMON INTERCEPT", price: 18, category: "noncoffee", desc: "Teh lemon segar peretas dahaga cuaca panas aspal kota.", img: "image/13.jpg" },
        { id: 14, name: "ASPHALT MILKSHAKE", price: 25, category: "noncoffee", desc: "Milkshake vanilla dengan taburan biskuit Oreo hancur.", img: "image/14.jpg" },
        { id: 15, name: "PUNK FRIES", price: 17, category: "snack", desc: "Kentang goreng renyah ditaburi bumbu pedas berdistorsi.", img: "image/15.jpg" },
        { id: 16, name: "GARAGE CROISSANT", price: 20, category: "snack", desc: "Pastry mentega renyah pas buat teman minum espresso panas.", img: "image/16.jpg" },
        { id: 17, name: "RIOT CHURROS", price: 18, category: "snack", desc: "Camilan goreng spanyol dengan cocolan saus cokelat pekat.", img: "image/17.jpg" },
        { id: 18, name: "TOASTED REBEL", price: 19, category: "snack", desc: "Roti bakar keju cokelat melimpah pengganjal lapar malam.", img: "image/18.jpg" },
        { id: 19, name: "ASPHALT NACHOS", price: 22, category: "snack", desc: "Keripik tortilla renyah disiram saus keju gurih hangat.", img: "image/19.jpg" },
        { id: 20, name: "SQUAD COOKIES", price: 15, category: "snack", desc: "Kue kering panggang dengan serpihan cokelat manis meleleh.", img: "image/20.jpg" }
    ];

    var bestSellers = [2, 3, 5, 9, 15];

    // ==========================================================================
    // 2. HAMBURGER MENU
    // ==========================================================================
    var hamburgerMenu = document.getElementById("hamburger-menu");
    var navLinksContainer = document.getElementById("nav-links-container");
    if (hamburgerMenu && navLinksContainer) {
        hamburgerMenu.addEventListener("click", function() {
            navLinksContainer.classList.toggle("show");
        });
    }

    // ==========================================================================
    // 3. RENDER MENU
    // ==========================================================================
    var menuGrid = document.getElementById("menu-grid");
    var tabButtons = document.querySelectorAll(".menu-sidebar .tab-btn");

    function displayProducts(categoryFilter) {
        if (!menuGrid) return;
        menuGrid.innerHTML = "";
        var filtered = [];
        if (categoryFilter === "all") {
            filtered = products;
        } else if (categoryFilter === "best") {
            filtered = products.filter(function(p) { return bestSellers.indexOf(p.id) !== -1; });
        } else {
            filtered = products.filter(function(p) { return p.category === categoryFilter; });
        }
        filtered.forEach(function(product) {
            var card = document.createElement("div");
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
        tabButtons.forEach(function(button) {
            button.addEventListener("click", function() {
                tabButtons.forEach(function(btn) { btn.classList.remove("active"); });
                button.classList.add("active");
                var selectedCategory = button.getAttribute("data-category");
                displayProducts(selectedCategory);
            });
        });
        displayProducts("all");
    }

    // ==========================================================================
    // 4. AUTH SYSTEM
    // ==========================================================================
    var authTrigger = document.getElementById("auth-trigger");
    var authModal = document.getElementById("auth-modal");
    var closeAuth = document.getElementById("close-auth");
    var loginWrapper = document.getElementById("login-form-wrapper");
    var registerWrapper = document.getElementById("register-form-wrapper");
    var toRegisterLink = document.getElementById("to-register");
    var toLoginLink = document.getElementById("to-login");
    var loginForm = document.getElementById("login-form");
    var registerForm = document.getElementById("register-form");
    var authOnlyNavItems = document.querySelectorAll(".auth-only");

    function syncAuthNav() {
        authOnlyNavItems.forEach(function(item) {
            if (isLoggedIn) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });
        if (authTrigger) {
            authTrigger.textContent = isLoggedIn ? "🚪 LOGOUT" : "MEMBER SIGN-IN";
        }
    }

    syncAuthNav();

    if (authTrigger && authModal && closeAuth) {
        authTrigger.addEventListener("click", function() {
            if (isLoggedIn) {
                isLoggedIn = false;
                localStorage.removeItem("punkLoggedIn");
                syncAuthNav();
                showPunkToast("🔒 ID SQUAD BERHASIL LOGOUT.");
                cart = [];
                localStorage.removeItem("punkCart");
                updateCartSystem();
                var currentPath = window.location.pathname.toLowerCase();
                if (currentPath.indexOf('dashboard.html') !== -1 || currentPath.indexOf('profile.html') !== -1) {
                    window.location.href = 'index.html';
                }
            } else {
                authModal.classList.add("show");
            }
        });
        closeAuth.addEventListener("click", function() {
            authModal.classList.remove("show");
        });
    }

    if (toRegisterLink && toLoginLink) {
        toRegisterLink.addEventListener("click", function(e) {
            e.preventDefault();
            loginWrapper.classList.add("hidden");
            registerWrapper.classList.remove("hidden");
        });
        toLoginLink.addEventListener("click", function(e) {
            e.preventDefault();
            registerWrapper.classList.add("hidden");
            loginWrapper.classList.remove("hidden");
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();
            isLoggedIn = true;
            localStorage.setItem("punkLoggedIn", "true");
            syncAuthNav();
            showPunkToast("🔓 ACCESS GRANTED. SELAMAT DATANG REBEL!");
            if (authTrigger) authTrigger.textContent = "🚪 LOGOUT";
            authModal.classList.remove("show");
            loginForm.reset();
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", function(e) {
            e.preventDefault();
            isLoggedIn = true;
            localStorage.setItem("punkLoggedIn", "true");
            syncAuthNav();
            showPunkToast("💾 SQUAD ID BARU BERHASIL DI-DEPOSIT! SELAMAT BERGABUNG!");
            registerWrapper.classList.add("hidden");
            loginWrapper.classList.remove("hidden");
            registerForm.reset();
        });
    }

    // ==========================================================================
    // 5. CART SYSTEM
    // ==========================================================================
    var cart = JSON.parse(localStorage.getItem("punkCart")) || [];
    var cartTrigger = document.getElementById("cart-trigger");
    var cartModal = document.getElementById("cart-modal");
    var closeCart = document.getElementById("close-cart");
    var cartItemsContainer = document.getElementById("cart-items-container");
    var cartTotalPrice = document.getElementById("cart-total-price");
    var cartCountBadge = document.getElementById("cart-count");
    var checkoutModal = document.getElementById("checkout-modal");
    var closeCheckout = document.getElementById("close-checkout");
    var btnNextCheckout = document.getElementById("btn-next-checkout");
    var btnCheckout = document.getElementById("btn-checkout-punk");

    function updateCartSystem() {
        if (cartCountBadge) {
            var totalItems = 0;
            cart.forEach(function(item) { totalItems += item.quantity; });
            cartCountBadge.textContent = totalItems;
        }
        if (cartItemsContainer && cartTotalPrice) {
            cartItemsContainer.innerHTML = "";
            var totalCost = 0;
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p style="font-family:\'Courier New\', monospace; text-align:center; color:#666; padding: 40px 0;">Keranjang kosong.<br>Injeksi bensinmu sekarang!</p>';
            } else {
                cart.forEach(function(item, index) {
                    totalCost += (item.price * item.quantity);
                    var itemRow = document.createElement("div");
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
            cartTotalPrice.textContent = "IDR " + totalCost + "K";
        }
    }

    if (cartTrigger && cartModal) {
        cartTrigger.addEventListener("click", function(e) {
            e.preventDefault();
            cartModal.classList.add("show");
            updateCartSystem();
        });
    }

    if (closeCart && cartModal) {
        closeCart.addEventListener("click", function() {
            cartModal.classList.remove("show");
        });
    }

    if (closeCheckout && checkoutModal) {
        closeCheckout.addEventListener("click", function() {
            checkoutModal.classList.remove("show");
        });
    }

    if (btnNextCheckout) {
        btnNextCheckout.addEventListener("click", function() {
            if (cart.length === 0) {
                showPunkToast("❌ KERANJANG MASIH KOSONG, REBEL!");
                return;
            }
            if (cartModal) cartModal.classList.remove("show");
            if (checkoutModal) checkoutModal.classList.add("show");
        });
    }

    if (cartItemsContainer) {
        cartItemsContainer.addEventListener("click", function(e) {
            if (e.target.classList.contains("btn-remove-cart")) {
                var targetIndex = parseInt(e.target.getAttribute("data-index"));
                cart.splice(targetIndex, 1);
                localStorage.setItem("punkCart", JSON.stringify(cart));
                updateCartSystem();
                showPunkToast("💀 ITEM DIKELUARKAN DARI DAFTAR FUEL.");
            }
        });
    }

    function initAddToCartButtons() {
        var addButtons = document.querySelectorAll(".btn-add-cart");
        addButtons.forEach(function(button) {
            button.addEventListener("click", function() {
                if (!isLoggedIn) {
                    showPunkToast("❌ KONTROL: LOGIN / DAFTAR SQUAD TERLEBIH DAHULU!");
                    if (authModal) authModal.classList.add("show");
                    return;
                }
                var productId = parseInt(button.getAttribute("data-id"));
                var selectedProduct = null;
                for (var i = 0; i < products.length; i++) {
                    if (products[i].id === productId) {
                        selectedProduct = products[i];
                        break;
                    }
                }
                if (selectedProduct) {
                    var existingItem = null;
                    for (var j = 0; j < cart.length; j++) {
                        if (cart[j].id === productId) {
                            existingItem = cart[j];
                            break;
                        }
                    }
                    if (existingItem) {
                        existingItem.quantity += 1;
                    } else {
                        var newItem = {
                            id: selectedProduct.id,
                            name: selectedProduct.name,
                            price: selectedProduct.price,
                            quantity: 1,
                            img: selectedProduct.img
                        };
                        cart.push(newItem);
                    }
                    localStorage.setItem("punkCart", JSON.stringify(cart));
                    updateCartSystem();
                    showPunkToast("🛒 " + selectedProduct.name + " BERHASIL DIINJEKSI SEBAGAI PESANAN!");
                }
            });
        });
    }

    if (btnCheckout) {
        btnCheckout.addEventListener("click", function() {
            var selected = document.querySelector('input[name="punk-pay"]:checked');
            var method = selected ? selected.value : 'cod';
            var total = 0;
            cart.forEach(function(item) { total += (item.price * item.quantity); });
            var receiptId = 'PGR-' + Date.now().toString(36).toUpperCase().slice(-8);
            var receipt = {
                receiptId: receiptId,
                createdAt: Date.now(),
                method: method,
                items: cart.map(function(i) { return { id: i.id, name: i.name, price: i.price, quantity: i.quantity, img: i.img }; }),
                total: total,
                status: 'pending'
            };
            if (method === 'qris') {
                var qrData = 'Nota:' + receiptId + '|Total:IDR' + total + 'K';
                receipt.paymentQr = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' + encodeURIComponent(qrData);
                showPunkToast('🔗 SILAKAN PINDAI QRIS pada layar nota.');
            } else if (method === 'bank') {
                receipt.bankInfo = 'BCA 123-456-789 a.n. PG STREET COFFEE';
                showPunkToast('🏦 Instruksi transfer tersimpan di nota (simulasi).');
            } else {
                showPunkToast('💵 COD: Siapkan pembayaran tunai saat kurir tiba.');
            }
            localStorage.setItem('punkLastReceipt', JSON.stringify(receipt));
            cart = [];
            localStorage.removeItem('punkCart');
            updateCartSystem();
            if (checkoutModal) checkoutModal.classList.remove('show');
            setTimeout(function() {
                window.location.href = 'receipt.html';
            }, 500);
        });
    }

    window.addEventListener("click", function(e) {
        if (e.target === authModal) authModal.classList.remove("show");
        if (e.target === cartModal) cartModal.classList.remove("show");
        if (e.target === checkoutModal) checkoutModal.classList.remove("show");
    });

    updateCartSystem();

    // ==========================================================================
    // 6. TOAST NOTIFICATION
    // ==========================================================================
    function showPunkToast(message) {
        var toastContainer = document.getElementById("toast-container");
        if (!toastContainer) return;
        var toastBox = document.createElement("div");
        toastBox.className = "punk-toast-box";
        toastBox.textContent = message;
        toastContainer.appendChild(toastBox);
        setTimeout(function() {
            toastBox.style.animation = "fadeOutPunk 0.4s ease-in forwards";
            setTimeout(function() {
                toastBox.remove();
            }, 400);
        }, 3500);
    }

});