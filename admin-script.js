// ===== كلمة المرور (غيرها حسب رغبتك) =====
const ADMIN_PASSWORD = "123456"; // يمكنك تغييرها لاحقاً

// ===== تسجيل الدخول =====
function login() {
    const pass = document.getElementById('adminPassword').value;
    if (pass === ADMIN_PASSWORD) {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        loadProducts();
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
}

function logout() {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('adminPassword').value = '';
}

// ===== تحميل المنتجات من ملف JSON =====
let products = [];

function loadProducts() {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            renderProductsTable();
        })
        .catch(() => {
            // إذا لم يجد الملف، نبدأ بمصفوفة فارغة
            products = [];
            renderProductsTable();
        });
}

// ===== عرض المنتجات في الجدول =====
function renderProductsTable() {
    const table = document.getElementById('productsTable');
    if (products.length === 0) {
        table.innerHTML = '<p style="color:#A0A0A0;">لا توجد منتجات حالياً</p>';
        return;
    }
    table.innerHTML = products.map((p, index) => `
        <div class="product-item">
            <div>
                <strong>${p.name}</strong> - ${p.price} ريال - ${p.weight} جرام
                <br /><small style="color:#A0A0A0;">${p.category}</small>
            </div>
            <button onclick="deleteProduct(${index})">✖ حذف</button>
        </div>
    `).join('');
}

// ===== إضافة منتج جديد =====
function addProduct() {
    const name = document.getElementById('productName').value.trim();
    const price = parseFloat(document.getElementById('productPrice').value);
    const weight = parseFloat(document.getElementById('productWeight').value);
    const category = document.getElementById('productCategory').value.trim();
    const image = document.getElementById('productImage').value.trim();
    const description = document.getElementById('productDesc').value.trim();

    if (!name || !price || !weight || !category || !image || !description) {
        alert('❌ الرجاء ملء جميع الحقول');
        return;
    }

    const newProduct = {
        id: Date.now(),
        name,
        price,
        weight,
        category,
        image,
        description
    };

    products.push(newProduct);
    saveProducts();
    renderProductsTable();
    clearForm();
    alert('✅ تم إضافة المنتج بنجاح');
}

// ===== حذف منتج =====
function deleteProduct(index) {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
        products.splice(index, 1);
        saveProducts();
        renderProductsTable();
        alert('🗑️ تم حذف المنتج');
    }
}

// ===== حفظ المنتجات في ملف JSON (عن طريق التحميل) =====
function saveProducts() {
    const dataStr = JSON.stringify(products, null, 4);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // تحميل الملف تلقائياً
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.json';
    a.click();
    URL.revokeObjectURL(url);
    
    alert('📥 تم حفظ التغييرات. قم برفع ملف products.json الجديد إلى GitHub.');
}

// ===== تفريغ الحقول =====
function clearForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productWeight').value = '';
    document.getElementById('productCategory').value = '';
    document.getElementById('productImage').value = '';
    document.getElementById('productDesc').value = '';
}

// ===== تشغيل عند تحميل الصفحة =====
document.addEventListener('DOMContentLoaded', function() {
    // التحقق إذا كان مسجل دخول مسبقاً (اختياري)
});
