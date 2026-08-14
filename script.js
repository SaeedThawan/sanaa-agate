// ===== 1. تحميل بيانات المنتجات من ملف JSON =====
let products = [];

fetch('products.json')
.then(response => response.json())
.then(data => {
products = data;
renderProducts(); // عرض المنتجات
updateCartBadge(); // تحديث رقم السلة
})
.catch(error => console.error('خطأ في تحميل المنتجات:', error));

// ===== 2. دالة عرض المنتجات في الصفحة =====
const grid = document.getElementById('productGrid');

function renderProducts() {
grid.innerHTML = products.map(p => &lt;div class="product-card"&gt; &lt;img src="${p.image}" alt="${p.name}" loading="lazy" /&gt; &lt;div class="product-info"&gt; &lt;div class="product-name"&gt;${p.name}</div>
<div class="product-meta">
<span>${p.weight} جرام&lt;/span&gt; &lt;span&gt;${p.category}</span>
</div>
<div class="product-price">${p.price} ريال&lt;/div&gt; &lt;div class="product-actions"&gt; &lt;button class="btn btn-gold" onclick="addToCart(${p.id})"><i class="fas fa-cart-plus"></i></button>
<button class="btn btn-outline quick-view-btn" data-id="${p.id}"&gt;&lt;i class="fas fa-eye"&gt;&lt;/i&gt;&lt;/button&gt; &lt;button class="btn whatsapp-btn" onclick="whatsappOrder(${p.id})"><i class="fab fa-whatsapp"></i></button>
</div>
</div>
</div>
`).join('');

// إضافة خاصية الرؤية السريعة لكل زر
document.querySelectorAll('.quick-view-btn').forEach(btn => {
btn.addEventListener('click', function() {
const id = parseInt(this.dataset.id);
openQuickView(id);
});
});
}

// ===== 3. الرؤية السريعة (النافذة المنبثقة) =====
const modal = document.getElementById('quickViewModal');
const modalClose = document.getElementById('modalClose');

function openQuickView(id) {
const p = products.find(prod => prod.id === id);
if (!p) return;
document.getElementById('modalImg').src = p.image;
document.getElementById('modalName').textContent = p.name;
document.getElementById('modalPrice').textContent = p.price + ' ريال';
document.getElementById('modalWeight').textContent = 'الوزن: ' + p.weight + ' جرام';
document.getElementById('modalCategory').textContent = 'التصنيف: ' + p.category;
document.getElementById('modalDesc').textContent = p.description;
document.getElementById('modalAddCart').onclick = function() { addToCart(p.id); };
document.getElementById('modalWhatsapp').onclick = function() { whatsappOrder(p.id); };
modal.classList.add('active');
document.body.style.overflow = 'hidden';
}

modalClose.onclick = function() {
modal.classList.remove('active');
document.body.style.overflow = 'auto';
};
window.onclick = function(e) {
if (e.target === modal) {
modal.classList.remove('active');
document.body.style.overflow = 'auto';
}
};

// ===== 4. نظام السلة (حفظ في المتصفح) =====
function addToCart(id) {
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const existing = cart.find(item => item.id === id);
if (existing) {
existing.quantity += 1;
} else {
cart.push({ id, quantity: 1 });
}
localStorage.setItem('cart', JSON.stringify(cart));
updateCartBadge();
showNotification('✅ تم إضافة المنتج إلى السلة');
}

function updateCartBadge() {
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const total = cart.reduce((sum, item) => sum + item.quantity, 0);
document.querySelector('.cart-badge::after').textContent = total;
}

// ===== 5. الطلب عبر واتساب =====
function whatsappOrder(id) {
const p = products.find(prod => prod.id === id);
if (!p) return;
const msg = مرحباً، أريد طلب:${p.name} ( {p.weight} جرام); window.open(https://wa.me/967730413413?text=${encodeURIComponent(msg)}`, '_blank');
}

// ===== 6. الإشعارات المنبثقة =====
function showNotification(text) {
const notif = document.createElement('div');
notif.style.cssText = position:fixed; bottom:20px; right:20px; background:#C9A87C; color:#0A0A0A; padding:16px 24px; border-radius:30px; font-weight:700; z-index:9999; box-shadow:0 8px 24px rgba(0,0,0,0.4); animation: fadeInUp 0.4s ease;;
notif.textContent = text;
document.body.appendChild(notif);
setTimeout(() => {
notif.style.opacity = '0';
notif.style.transition = '0.5s';
setTimeout(() => notif.remove(), 500);
}, 3000);
}

// ===== 7. تبديل الوضع المظلم/الفاتح =====
document.getElementById('themeToggle').addEventListener('click', function() {
document.body.classList.toggle('light');
this.classList.toggle('fa-moon');
this.classList.toggle('fa-sun');
});

// ===== 8. رسالة تأكيد في وحدة التحكم (للمطورين) =====
console.log('🚀 صانع العقيق اليمني - بسنة الله نبدأ');
