const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Navbar transparan berubah saat scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');

  if(window.scrollY > 50){
    header.style.background = '#000';
  } else {
    header.style.background = 'rgba(0,0,0,0.5)';
  }
});

// Sistem keranjang sederhana
const orderButtons = document.querySelectorAll('.order-btn');
const cartCount = document.getElementById('cart-count');
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const overlay = document.getElementById('overlay');
const cartItemsContainer = document.getElementById('cart-items');

let totalCart = 0;
let totalPrice = 0;

orderButtons.forEach(button => {
  button.addEventListener('click', () => {

    const card = button.closest('.card');
    const menuName = card.querySelector('h3').innerText;
    const menuPrice = card.querySelector('span').innerText;
    totalCart++;
    totalPrice += 25000;

    cartCount.innerText = totalCart;

    document.getElementById('total-item').innerText = totalCart;
    document.getElementById('total-price').innerText = `Rp ${totalPrice.toLocaleString('id-ID')}`;

    // Hapus tulisan keranjang kosong
    const emptyCart = document.querySelector('.empty-cart');
    if(emptyCart){
      emptyCart.remove();
    }

    // Tambah menu ke sidebar keranjang
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    cartItem.innerHTML = `
      <div>
        <h4>${menuName}</h4>
        <span>${menuPrice}</span>
      </div>

      <small>1x</small>
    `;

    cartItemsContainer.appendChild(cartItem);

    button.innerText = 'Ditambahkan ✓';

    setTimeout(() => {
      button.innerText = 'Tambah ke Keranjang';
    }, 1500);
  });
});

// Buka sidebar keranjang
cartIcon.addEventListener('click', (e) => {
  e.preventDefault();
  cartSidebar.classList.add('active');
  overlay.classList.add('active');
});

// Tutup sidebar
closeCart.addEventListener('click', () => {
  cartSidebar.classList.remove('active');
  overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
  cartSidebar.classList.remove('active');
  overlay.classList.remove('active');
});

// Pilih metode pembayaran
const payButtons = document.querySelectorAll('.pay-btn');
let selectedPayment = '';
const paymentDetail = document.getElementById('payment-detail');

payButtons.forEach(button => {
  button.addEventListener('click', () => {
    payButtons.forEach(btn => btn.classList.remove('active'));

    button.classList.add('active');
    selectedPayment = button.innerText;

    // Tampilkan detail pembayaran
    paymentDetail.classList.add('active');

    if(selectedPayment === 'QRIS'){
      paymentDetail.innerHTML = `
        <h3>Scan QRIS</h3>
        <p>Silakan scan QR code berikut untuk melakukan pembayaran.</p>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=PG-STREET-COFFE" alt="QRIS">
      `;
    }

    else if(selectedPayment === 'Transfer Bank'){
      paymentDetail.innerHTML = `
        <h3>Transfer Bank</h3>
        <p>
          Bank BCA : 1234567890<br>
          A/N PG STREET COFFE
        </p>

        <p>
          Bank BRI : 9876543210<br>
          A/N PG STREET COFFE
        </p>
      `;
    }

    else if(selectedPayment === 'Bayar Langsung'){
      paymentDetail.innerHTML = `
        <h3>Nota Pembayaran</h3>
        <p>
          PG STREET COFFE<br>
          Total Item : ${totalCart}<br>
          Total Bayar : Rp ${totalPrice.toLocaleString('id-ID')}<br>
          Status : Bayar di Kasir
        </p>
      `;
    };
  });
});

// Checkout
const checkoutBtn = document.getElementById('checkout-btn');
const successMessage = document.getElementById('success-message');

checkoutBtn.addEventListener('click', () => {

  if(totalCart === 0){
    successMessage.innerText = 'Keranjang masih kosong!';
    return;
  }

  if(selectedPayment === ''){
    successMessage.innerText = 'Pilih metode pembayaran dulu!';
    return;
  }

  successMessage.innerText = `Pesanan berhasil dibuat menggunakan ${selectedPayment} ✓`;

  if(selectedPayment === 'Bayar Langsung'){
    paymentDetail.innerHTML = `
      <h3>Nota Pembayaran</h3>
      <p>
        PG STREET COFFE<br>
        Total Item : ${totalCart}<br>
        Total Bayar : Rp ${totalPrice.toLocaleString('id-ID')}<br>
        Silakan tunjukkan nota ini ke kasir.
      </p>
    `;
  }

  totalCart = 0;
  totalPrice = 0;

  cartCount.innerText = 0;
  document.getElementById('total-item').innerText = 0;
  document.getElementById('total-price').innerText = 'Rp 0';

  // Reset isi keranjang
  cartItemsContainer.innerHTML = `
    <p class="empty-cart">Belum ada menu ditambahkan.</p>
  `;

  setTimeout(() => {
    paymentDetail.classList.remove('active');
    paymentDetail.innerHTML = '';
  }, 3000);
});
