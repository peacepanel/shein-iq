// ========================================================================
// SHIQ ENHANCED CART SYSTEM v3.2 - نظام السلة المحسن
// تحسينات شاملة: إدارة الكمية، إبقاء النافذة مفتوحة، بيانات المنتج الكاملة
// ========================================================================

// ===== 1. إعدادات محسنة =====
const ENHANCED_CONFIG = {
    APP_NAME: 'SHIQ - شي ان العراق',
    APP_VERSION: '3.2.0',
    APP_URL: 'https://peacepanel.github.io/shein-baghdad/',
    
    // Google Sheets API
    GOOGLE_API_KEY: 'AIzaSyATs-nWgTonTFEKCi_4F5lQ_Ao0vnJ5Xmk',
    WEB_APP_URL: 'https://script.google.com/macros/s/AKfycbzc9ojokNkOcmtINeXR9ijzc5HCfq5Ljgcp_4WIpW5JLGSnJryRvnyZqH8EEwB7tbHk/exec',
    
    // إعدادات التجارة
    ECOMMERCE: {
        FREE_DELIVERY_THRESHOLD: 50000,
        DELIVERY_FEE: 5000,
        CURRENCY: 'د.ع',
        WHATSAPP_NUMBER: '9647862799748',
        PHONE_NUMBER: '07862799748'
    },
    
    // التخزين المحلي
    STORAGE_KEYS: {
        CART_DATA: 'shiq_cart_enhanced',
        CATEGORY_IMAGES: 'shiq_images_enhanced',
        USER_DATA: 'shiq_user_enhanced',
        PWA_INSTALLED: 'shiq_pwa_installed' // جديد
    },
    
    // إعدادات PWA
    PWA: {
        SHOW_INSTALL_PROMPT: true,
        CHECK_INSTALLED: true
    }
};

// ===== 2. فئات المنتجات مع البيانات المحسنة =====
const PRODUCT_CATEGORIES = {
    'اكسسوارات نسائية': {
        id: 'women_accessories',
        sheetId: '1Tf1B4HqO5lnwxP8oSqzRMwmvegnIDJam-DMhQc8s5S8',
        sheets: ['تراجي', 'ساعات', 'سوار', 'كلادة', 'محابس', 'قراصات', 'اكسسوار جسم', 'شفقات', 'احزمة', 'مداليات', 'نضارات', 'مهفات'],
        columns: { 
            code: 'A',     // رقم المنتج
            image: 'F',    // رابط الصورة
            price: 'I',    // السعر
            name: 'B'      // اسم المنتج (إضافي)
        },
        icon: '💍',
        fallbackImage: 'https://via.placeholder.com/200x200/8B5CF6/FFFFFF?text=💍'
    },
    'احذية وحقائب متنوعة': {
        id: 'shoes_bags',
        sheetId: '1saUoR7Z7xYI-WCUZNTs3YRZ6jEdnM6S03M15tgw-QiQ',
        sheets: ['جزدان', 'حقائب', 'سلبر نسائي', 'احذية نسائي', 'اكسسوارات اطفال', 'احذية اطفال'],
        columns: { 
            code: 'A', 
            image: 'F', 
            price: 'I', 
            size: 'G',
            name: 'B' 
        },
        icon: '👠',
        searchable: true,
        fallbackImage: 'https://via.placeholder.com/200x200/8B5CF6/FFFFFF?text=👠'
    },
    'ربطات وشالات': {
        id: 'scarves_ties',
        sheetId: '17mlV_BaJFQZoz-Cof1wJG6e-2X1QCRs9usoIWXmQGI8',
        sheets: ['جواريب', 'اكمام كفوف', 'شالات', 'شال كتف', 'سكارف', 'بروشات', 'ياخه'],
        columns: { 
            code: 'A', 
            image: 'F', 
            price: 'I',
            name: 'B' 
        },
        icon: '🧣',
        fallbackImage: 'https://via.placeholder.com/200x200/8B5CF6/FFFFFF?text=🧣'
    },
    'شيكلام': {
        id: 'beauty_cosmetics',
        sheetId: '1K08r0X7XQ6ZUkUYjR8QI_91X1hX6v7K8e6181Vuz4os',
        sheets: ['اظافر', 'صبغ اظافر', 'شعر', 'فرش', 'مكياج', 'وشم', 'حقائب مكياج', 'منوع'],
        columns: { 
            code: 'A', 
            image: 'F', 
            price: 'I',
            name: 'B' 
        },
        icon: '💄',
        fallbackImage: 'https://via.placeholder.com/200x200/8B5CF6/FFFFFF?text=💄'
    },
    'منزلية': {
        id: 'home_items',
        sheetId: '1aLXBPsxTixs28wFi55P9ZRNU2RhqzFfjxg8Cbp4m8Rw',
        sheets: ['منوع', 'ديكورات', 'ادوات منزلية'],
        columns: { 
            code: 'A', 
            image: 'F', 
            price: 'I', 
            size: 'J',
            name: 'B' 
        },
        icon: '🏠',
        fallbackImage: 'https://via.placeholder.com/200x200/8B5CF6/FFFFFF?text=🏠'
    },
    'مفروشات': {
        id: 'furnishings',
        sheetId: '1s1WVVjA--0BqHfzE-ANm5pq43xkRD1vaDyNeGUAXFLk',
        sheets: ['شراشف', 'ستائر', 'ارضيات', 'وجه كوشات', 'مناشف', 'تلبيسه لحاف', 'اغطية', 'مقاعد تلبيس', 'اخرى'],
        columns: { 
            code: 'A', 
            image: 'F', 
            price: 'I', 
            size: 'J',
            name: 'B' 
        },
        icon: '🛏️',
        fallbackImage: 'https://via.placeholder.com/200x200/8B5CF6/FFFFFF?text=🛏️'
    },
    'اطفالي صيفي': {
        id: 'kids_summer',
        sheetId: '1Rhbilfz7VaHTR-qCxdjNK_5zk52kdglYd-ADK2Mn2po',
        sheets: ['3 - 0 M', '6 - 3 M', '9 - 6 M', '12 - 9 M', '18 - 12 M', '24 - 18 M', '1 Y', '2 Y', '3 Y', '4 Y', '5 Y', '6 Y', '7 Y', '8 Y', '9 Y', '10 Y', '11 Y', '12 Y', '13 Y', '14 Y'],
        columns: { 
            code: 'A', 
            image: 'F', 
            price: 'H', 
            size: 'I',
            name: 'B' 
        },
        icon: '👶',
        fallbackImage: 'https://via.placeholder.com/200x200/8B5CF6/FFFFFF?text=👶'
    },
    'اطفالي شتائي': {
        id: 'kids_winter',
        sheetId: '1JAI7pfkQiPAL-6H6DBjryPHGAPoRacY3TTajEJHy8HQ',
        sheets: ['3 - 0 M', '6 - 3 M', '9 - 6 M', '12 - 9 M', '18 - 12 M', '24 - 18 M', '1 Y', '2 Y', '3 Y', '4 Y', '5 Y', '6 Y', '7 Y', '8 Y', '9 Y', '10 Y', '11 Y', '12 Y', '13 Y', '14 Y'],
        columns: { 
            code: 'A', 
            image: 'F', 
            price: 'H', 
            size: 'I',
            name: 'B' 
        },
        icon: '🧥',
        fallbackImage: 'https://via.placeholder.com/200x200/8B5CF6/FFFFFF?text=🧥'
    },
    'نسائي شتائي': {
        id: 'women_winter',
        sheetId: '1cXt49H5Wy1jGB0jrutp8JviLq3qSHo7VQuCoBclDRAI',
        sheets: ['5XL', '4XL', '3XL', '2XL', '1XL', '0XL', 'XL', 'L', 'M', 'S', 'XS', 'one size'],
        columns: { 
            code: 'A', 
            image: 'F', 
            price: 'H', 
            size: 'D',
            name: 'B' 
        },
        icon: '🧥',
        fallbackImage: 'https://via.placeholder.com/200x200/8B5CF6/FFFFFF?text=🧥'
    },
    'نسائي صيفي': {
        id: 'women_summer',
        sheetId: '1POUe8K4EadYctDbTr1hnpKJ_r6slAVaX6VWyfbGYBFE',
        sheets: ['5XL', '4XL', '3XL', '2XL', '1XL', '0XL', 'XL', 'L', 'M', 'S', 'XS', 'one size'],
        columns: { 
            code: 'A', 
            image: 'F', 
            price: 'H', 
            size: 'D',
            name: 'B' 
        },
        icon: '👗',
        fallbackImage: 'https://via.placeholder.com/200x200/8B5CF6/FFFFFF?text=👗'
    },
    'مستلزمات موبايل': {
        id: 'mobile_accessories',
        sheetId: '1xMFXIY4EjjbEnGVK-8m_Q8G9Ng-2NJ93kPkdpfVQuGk',
        sheets: ['كفرات موبايل', 'ملحقات اخرى'],
        columns: { 
            code: 'A', 
            image: 'F', 
            price: 'I', 
            size: 'G',
            name: 'B' 
        },
        icon: '📱',
        searchable: true,
        fallbackImage: 'https://via.placeholder.com/200x200/8B5CF6/FFFFFF?text=📱'
    }
};

// ===== 3. نظام PWA محسن =====
class PWAManager {
    constructor() {
        this.deferredPrompt = null;
        this.isInstalled = this.checkIfInstalled();
        this.initialize();
    }
    
    initialize() {
        // استمع لحدث beforeinstallprompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            
            // عرض بانر التثبيت فقط إذا لم يكن مثبتاً
            if (!this.isInstalled && ENHANCED_CONFIG.PWA.SHOW_INSTALL_PROMPT) {
                this.showInstallBanner();
            }
        });
        
        // استمع لحدث appinstalled
        window.addEventListener('appinstalled', () => {
            this.isInstalled = true;
            this.saveInstallationStatus(true);
            this.hideInstallBanner();
            this.showInstallSuccessMessage();
        });
        
        // فحص حالة التثبيت عند بدء التطبيق
        this.checkInstallationStatus();
    }
    
    checkIfInstalled() {
        // فحص متغيرات PWA
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        const isFullscreen = window.matchMedia('(display-mode: fullscreen)').matches;
        const isMinimalUI = window.matchMedia('(display-mode: minimal-ui)').matches;
        const isNavigatorStandalone = window.navigator.standalone === true;
        
        // فحص التخزين المحلي
        const savedStatus = localStorage.getItem(ENHANCED_CONFIG.STORAGE_KEYS.PWA_INSTALLED);
        
        return isStandalone || isFullscreen || isMinimalUI || isNavigatorStandalone || savedStatus === 'true';
    }
    
    checkInstallationStatus() {
        if (this.isInstalled) {
            console.log('✅ التطبيق مثبت بالفعل');
            this.hideInstallBanner();
        } else {
            console.log('📱 التطبيق غير مثبت');
        }
    }
    
    showInstallBanner() {
        // إنشاء بانر التثبيت
        const banner = document.createElement('div');
        banner.id = 'install-banner';
        banner.className = 'install-banner';
        banner.innerHTML = `
            <div class="install-banner-content">
                <span class="install-icon">📱</span>
                <span class="install-text">ثبت التطبيق على هاتفك للوصول السريع</span>
                <button class="install-btn" onclick="pwaManager.installApp()">تثبيت</button>
                <button class="install-close" onclick="pwaManager.hideInstallBanner()">×</button>
            </div>
        `;
        
        // إضافة الستايل
        banner.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 12px 15px;
            z-index: 1000;
            transform: translateY(-100%);
            transition: transform 0.3s ease;
        `;
        
        const style = `
            .install-banner-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                max-width: 1200px;
                margin: 0 auto;
                gap: 10px;
            }
            .install-icon {
                font-size: 1.2rem;
            }
            .install-text {
                flex: 1;
                font-weight: 600;
                font-size: 0.9rem;
            }
            .install-btn {
                background: white;
                color: #10b981;
                border: none;
                padding: 8px 16px;
                border-radius: 20px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .install-btn:hover {
                background: #f3f4f6;
                transform: translateY(-1px);
            }
            .install-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.3s ease;
            }
            .install-close:hover {
                background: rgba(255,255,255,0.2);
            }
            @media (max-width: 768px) {
                .install-banner-content {
                    gap: 8px;
                }
                .install-text {
                    font-size: 0.8rem;
                }
                .install-btn {
                    padding: 6px 12px;
                    font-size: 0.8rem;
                }
            }
        `;
        
        // إضافة الستايل إذا لم يكن موجوداً
        if (!document.querySelector('#install-banner-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'install-banner-styles';
            styleElement.textContent = style;
            document.head.appendChild(styleElement);
        }
        
        document.body.insertBefore(banner, document.body.firstChild);
        
        // عرض البانر بتأخير قصير
        setTimeout(() => {
            banner.style.transform = 'translateY(0)';
        }, 100);
    }
    
    hideInstallBanner() {
        const banner = document.getElementById('install-banner');
        if (banner) {
            banner.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                banner.remove();
            }, 300);
        }
    }
    
    async installApp() {
        if (!this.deferredPrompt) {
            this.showInstallInstructions();
            return;
        }
        
        try {
            this.deferredPrompt.prompt();
            const { outcome } = await this.deferredPrompt.userChoice;
            
            if (outcome === 'accepted') {
                console.log('✅ المستخدم وافق على التثبيت');
                this.saveInstallationStatus(true);
            } else {
                console.log('❌ المستخدم رفض التثبيت');
            }
            
            this.deferredPrompt = null;
            this.hideInstallBanner();
        } catch (error) {
            console.error('خطأ في التثبيت:', error);
            this.showInstallInstructions();
        }
    }
    
    showInstallInstructions() {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        
        let instructions = '';
        
        if (isIOS && isSafari) {
            instructions = `
                📱 لتثبيت التطبيق على iOS:
                1. انقر على زر المشاركة في أسفل الشاشة
                2. اختر "إضافة إلى الشاشة الرئيسية"
                3. اضغط "إضافة"
            `;
        } else {
            instructions = `
                📱 لتثبيت التطبيق:
                1. انقر على زر القائمة (⋮) في المتصفح
                2. اختر "إضافة إلى الشاشة الرئيسية"
                3. اتبع التعليمات
            `;
        }
        
        if (window.ui && window.ui.showToast) {
            window.ui.showToast(instructions, 'info');
        } else {
            alert(instructions);
        }
    }
    
    showInstallSuccessMessage() {
        if (window.ui && window.ui.showToast) {
            window.ui.showToast('🎉 تم تثبيت التطبيق بنجاح!', 'success');
        }
    }
    
    saveInstallationStatus(installed) {
        localStorage.setItem(ENHANCED_CONFIG.STORAGE_KEYS.PWA_INSTALLED, installed.toString());
        this.isInstalled = installed;
    }
}

// ===== 4. سلة التسوق المحسنة مع إدارة الكمية =====
class EnhancedShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
    }
    
    addItem(product) {
        const existingIndex = this.items.findIndex(item => item.code === product.code);
        if (existingIndex !== -1) {
            this.items[existingIndex].quantity += 1;
            this.items[existingIndex].lastUpdated = new Date().toISOString();
        } else {
            this.items.push({
                id: this.generateItemId(),
                code: product.code,          // رقم المنتج
                name: product.name,          // اسم المنتج
                price: parseFloat(product.price) || 0,
                imageUrl: product.imageUrl,  // رابط الصورة
                size: product.size || null,
                quantity: 1,
                addedAt: new Date().toISOString(),
                lastUpdated: new Date().toISOString(),
                category: product.category || '',  // إضافة الفئة
                sheetName: product.sheetName || '' // إضافة اسم الورقة
            });
        }
        this.saveToStorage();
        this.updateUI();
        return true;
    }
    
    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveToStorage();
        this.updateUI();
    }
    
    updateQuantity(itemId, newQuantity) {
        if (newQuantity <= 0) {
            this.removeItem(itemId);
            return;
        }
        
        const item = this.items.find(item => item.id === itemId);
        if (item) {
            item.quantity = newQuantity;
            item.lastUpdated = new Date().toISOString();
            this.saveToStorage();
            this.updateUI();
        }
    }
    
    clear() {
        this.items = [];
        this.saveToStorage();
        this.updateUI();
    }
    
    getTotalItems() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }
    
    getTotalPrice() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
    
    getDeliveryFee() {
        const subtotal = this.getTotalPrice();
        return subtotal >= ENHANCED_CONFIG.ECOMMERCE.FREE_DELIVERY_THRESHOLD ? 0 : ENHANCED_CONFIG.ECOMMERCE.DELIVERY_FEE;
    }
    
    getFinalTotal() {
        return this.getTotalPrice() + this.getDeliveryFee();
    }
    
    generateItemId() {
        return 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    // تحضير بيانات الطلب للإرسال
    prepareOrderData(customerInfo = null) {
        const subtotal = this.getTotalPrice();
        const deliveryFee = this.getDeliveryFee();
        const total = this.getFinalTotal();
        
        return {
            orderId: this.generateOrderId(),
            customer: customerInfo,
            products: this.items.map(item => ({
                id: item.id,
                code: item.code,                    // رقم المنتج
                name: item.name,                    // اسم المنتج
                price: item.price,
                quantity: item.quantity,
                size: item.size,
                imageUrl: item.imageUrl,            // رابط الصورة
                category: item.category,
                sheetName: item.sheetName,
                itemTotal: item.price * item.quantity
            })),
            summary: {
                itemsCount: this.items.length,
                totalQuantity: this.getTotalItems(),
                subtotal: subtotal,
                deliveryFee: deliveryFee,
                total: total
            },
            orderDate: new Date().toISOString(),
            source: 'web_app_enhanced'
        };
    }
    
    generateOrderId() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 6).toUpperCase();
        return `SHIQ-${timestamp}-${random}`;
    }
    
    saveToStorage() {
        try {
            const cartData = {
                items: this.items,
                lastUpdated: new Date().toISOString(),
                version: ENHANCED_CONFIG.APP_VERSION
            };
            localStorage.setItem(ENHANCED_CONFIG.STORAGE_KEYS.CART_DATA, JSON.stringify(cartData));
        } catch (error) {
            console.error('خطأ في حفظ السلة:', error);
        }
    }
    
    loadFromStorage() {
        try {
            const cartData = localStorage.getItem(ENHANCED_CONFIG.STORAGE_KEYS.CART_DATA);
            if (cartData) {
                const parsed = JSON.parse(cartData);
                this.items = parsed.items || [];
            }
        } catch (error) {
            console.error('خطأ في تحميل السلة:', error);
            this.items = [];
        }
    }
    
    updateUI() {
        this.updateCartButton();
        this.updateProductButtons();
    }
    
    updateCartButton() {
        const cartButton = document.querySelector('.cart-button') || document.getElementById('cart-button');
        
        if (cartButton) {
            const totalItems = this.getTotalItems();
            const totalPrice = this.getTotalPrice();
            
            if (totalItems > 0) {
                cartButton.innerHTML = `
                    <span>🛒</span>
                    <span>السلة (${totalItems})</span>
                    <span style="font-size: 0.9em; opacity: 0.9;">${totalPrice.toLocaleString()} ${ENHANCED_CONFIG.ECOMMERCE.CURRENCY}</span>
                `;
                cartButton.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
            } else {
                cartButton.innerHTML = `
                    <span>🛒</span>
                    <span>السلة فارغة</span>
                `;
                cartButton.style.background = 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)';
            }
        }
    }
    
    updateProductButtons() {
        const buttons = document.querySelectorAll('.add-to-cart-btn');
        buttons.forEach(btn => {
            const productCode = btn.getAttribute('data-product-code');
            const isInCart = this.items.some(item => item.code === productCode);
            
            if (isInCart) {
                btn.classList.add('selected');
                btn.innerHTML = '✅ في السلة';
            } else {
                btn.classList.remove('selected');
                btn.innerHTML = '🛒 أضف للسلة';
            }
        });
    }
}

// ===== 5. نافذة السلة المحسنة =====
class EnhancedCartWindow {
    constructor(cart) {
        this.cart = cart;
        this.window = null;
    }
    
    open() {
        if (this.cart.getTotalItems() === 0) {
            this.showToast('🛒 السلة فارغة! أضف بعض المنتجات أولاً', 'warning');
            return;
        }
        
        this.createWindow();
    }
    
    createWindow() {
        const orderData = this.cart.prepareOrderData();
        
        // إنشاء HTML للمنتجات
        let itemsHtml = '';
        orderData.products.forEach((product) => {
            itemsHtml += this.createProductHTML(product);
        });
        
        // إنشاء HTML لملخص الطلب
        const summaryHtml = this.createSummaryHTML(orderData.summary);
        
        // فتح النافذة
        this.window = window.open('', '_blank', 'width=900,height=700,scrollbars=yes,resizable=yes');
        this.window.document.write(this.getWindowHTML(itemsHtml, summaryHtml, orderData));
        
        // إضافة معالجات الأحداث
        this.setupWindowEventHandlers();
    }
    
    createProductHTML(product) {
        return `
            <div class="cart-item" id="cart-item-${product.id}">
                <div class="item-image">
                    <img src="${product.imageUrl}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/80x80/f0f0f0/999999?text=صورة'">
                </div>
                <div class="item-details">
                    <h4 class="item-name">${product.name}</h4>
                    <p class="item-code">📋 رقم المنتج: ${product.code}</p>
                    <p class="item-price">💰 ${product.price.toLocaleString()} ${ENHANCED_CONFIG.ECOMMERCE.CURRENCY} × ${product.quantity}</p>
                    <p class="item-total">💵 المجموع: ${product.itemTotal.toLocaleString()} ${ENHANCED_CONFIG.ECOMMERCE.CURRENCY}</p>
                    ${product.size ? `<p class="item-size">📏 المقاس: ${product.size}</p>` : ''}
                    <p class="item-image-link">🔗 <a href="${product.imageUrl}" target="_blank">رابط الصورة</a></p>
                </div>
                <div class="item-controls">
                    <div class="quantity-controls">
                        <button class="qty-btn qty-decrease" onclick="updateQuantity('${product.id}', ${product.quantity - 1})">-</button>
                        <span class="quantity-display">${product.quantity}</span>
                        <button class="qty-btn qty-increase" onclick="updateQuantity('${product.id}', ${product.quantity + 1})">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeItem('${product.id}')">🗑️ حذف</button>
                </div>
            </div>
        `;
    }
    
    createSummaryHTML(summary) {
        return `
            <div class="order-summary">
                <h3>📊 ملخص الطلب</h3>
                <div class="summary-row">
                    <span>عدد المنتجات:</span>
                    <span>${summary.itemsCount} منتج</span>
                </div>
                <div class="summary-row">
                    <span>إجمالي القطع:</span>
                    <span>${summary.totalQuantity} قطعة</span>
                </div>
                <div class="summary-row">
                    <span>المجموع الفرعي:</span>
                    <span>${summary.subtotal.toLocaleString()} ${ENHANCED_CONFIG.ECOMMERCE.CURRENCY}</span>
                </div>
                <div class="summary-row">
                    <span>رسوم التوصيل:</span>
                    <span>${summary.deliveryFee === 0 ? 'مجاني 🎉' : summary.deliveryFee.toLocaleString() + ' ' + ENHANCED_CONFIG.ECOMMERCE.CURRENCY}</span>
                </div>
                ${summary.deliveryFee === 0 
                    ? '<div class="delivery-note free">🎉 تم تفعيل التوصيل المجاني!</div>' 
                    : `<div class="delivery-note paid">💡 أضف ${(ENHANCED_CONFIG.ECOMMERCE.FREE_DELIVERY_THRESHOLD - summary.subtotal).toLocaleString()} ${ENHANCED_CONFIG.ECOMMERCE.CURRENCY} للحصول على توصيل مجاني!</div>`
                }
                <div class="summary-row total-row">
                    <span>المجموع الكلي:</span>
                    <span>${summary.total.toLocaleString()} ${ENHANCED_CONFIG.ECOMMERCE.CURRENCY}</span>
                </div>
            </div>
        `;
    }
    
    getWindowHTML(itemsHtml, summaryHtml, orderData) {
        return `
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>🛒 سلة التسوق - ${ENHANCED_CONFIG.APP_NAME}</title>
                <style>
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        margin: 0;
                        padding: 20px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        direction: rtl;
                        min-height: 100vh;
                    }
                    .container {
                        background: white;
                        border-radius: 20px;
                        padding: 30px;
                        max-width: 1000px;
                        margin: 0 auto;
                        box-shadow: 0 20px 60px rgba(0,0,0,0.1);
                    }
                    h1 {
                        text-align: center;
                        color: #1f2937;
                        margin-bottom: 30px;
                        font-size: 2.2rem;
                        border-bottom: 3px solid #8B5CF6;
                        padding-bottom: 15px;
                    }
                    .products-section h3 {
                        color: #8B5CF6;
                        margin-bottom: 20px;
                        font-size: 1.5rem;
                    }
                    .cart-item {
                        display: flex;
                        align-items: center;
                        padding: 20px;
                        border: 2px solid #e5e7eb;
                        margin: 15px 0;
                        border-radius: 15px;
                        background: #f9fafb;
                        transition: all 0.3s ease;
                    }
                    .cart-item:hover {
                        border-color: #8B5CF6;
                        box-shadow: 0 5px 15px rgba(139, 92, 246, 0.1);
                    }
                    .item-image {
                        margin-left: 20px;
                        flex-shrink: 0;
                    }
                    .item-image img {
                        width: 100px;
                        height: 100px;
                        object-fit: cover;
                        border-radius: 12px;
                        border: 2px solid #e5e7eb;
                    }
                    .item-details {
                        flex: 1;
                        padding: 0 15px;
                    }
                    .item-name {
                        margin: 0 0 8px 0;
                        color: #1f2937;
                        font-size: 1.3rem;
                        font-weight: bold;
                    }
                    .item-code {
                        margin: 5px 0;
                        color: #6b7280;
                        font-size: 0.9rem;
                        background: #f3f4f6;
                        padding: 4px 8px;
                        border-radius: 6px;
                        display: inline-block;
                    }
                    .item-price {
                        margin: 5px 0;
                        color: #ef4444;
                        font-weight: bold;
                        font-size: 1.1rem;
                    }
                    .item-total {
                        margin: 5px 0;
                        color: #059669;
                        font-weight: bold;
                        font-size: 1.1rem;
                    }
                    .item-size {
                        margin: 5px 0;
                        color: #8B5CF6;
                        font-weight: 600;
                    }
                    .item-image-link {
                        margin: 5px 0;
                        font-size: 0.9rem;
                    }
                    .item-image-link a {
                        color: #3b82f6;
                        text-decoration: none;
                    }
                    .item-image-link a:hover {
                        text-decoration: underline;
                    }
                    .item-controls {
                        text-align: center;
                        flex-shrink: 0;
                    }
                    .quantity-controls {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        margin-bottom: 15px;
                        justify-content: center;
                    }
                    .qty-btn {
                        width: 35px;
                        height: 35px;
                        border: none;
                        border-radius: 50%;
                        font-size: 1.2rem;
                        font-weight: bold;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .qty-decrease {
                        background: #ef4444;
                        color: white;
                    }
                    .qty-increase {
                        background: #10b981;
                        color: white;
                    }
                    .qty-btn:hover {
                        transform: scale(1.1);
                        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                    }
                    .quantity-display {
                        font-weight: bold;
                        font-size: 1.2rem;
                        min-width: 30px;
                        text-align: center;
                        padding: 8px 12px;
                        background: #f3f4f6;
                        border-radius: 8px;
                    }
                    .remove-btn {
                        background: #ef4444;
                        color: white;
                        border: none;
                        padding: 10px 15px;
                        border-radius: 10px;
                        cursor: pointer;
                        font-weight: 600;
                        transition: all 0.3s ease;
                    }
                    .remove-btn:hover {
                        background: #dc2626;
                        transform: translateY(-2px);
                    }
                    .order-summary {
                        background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%);
                        padding: 25px;
                        border-radius: 15px;
                        margin: 25px 0;
                        border: 2px solid #8B5CF6;
                    }
                    .order-summary h3 {
                        color: #8B5CF6;
                        margin-bottom: 20px;
                        text-align: center;
                        font-size: 1.5rem;
                    }
                    .summary-row {
                        display: flex;
                        justify-content: space-between;
                        margin: 12px 0;
                        font-size: 1.1rem;
                        padding: 8px 0;
                    }
                    .total-row {
                        font-weight: bold;
                        font-size: 1.4rem;
                        color: #1f2937;
                        border-top: 2px solid #8B5CF6;
                        padding-top: 15px;
                        margin-top: 20px;
                    }
                    .delivery-note {
                        padding: 12px;
                        border-radius: 10px;
                        margin: 15px 0;
                        text-align: center;
                        font-weight: 600;
                    }
                    .delivery-note.free {
                        background: #d1fae5;
                        border: 2px solid #10b981;
                        color: #047857;
                    }
                    .delivery-note.paid {
                        background: #fef3c7;
                        border: 2px solid #f59e0b;
                        color: #92400e;
                    }
                    .actions {
                        display: flex;
                        gap: 15px;
                        justify-content: center;
                        margin-top: 30px;
                        flex-wrap: wrap;
                    }
                    .btn {
                        padding: 15px 30px;
                        border: none;
                        border-radius: 12px;
                        font-size: 1.1rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        text-decoration: none;
                        display: inline-block;
                        text-align: center;
                        min-width: 150px;
                    }
                    .btn-primary {
                        background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
                        color: white;
                        box-shadow: 0 8px 25px rgba(37, 211, 102, 0.3);
                    }
                    .btn-primary:hover {
                        background: linear-gradient(135deg, #128C7E 0%, #25D366 100%);
                        transform: translateY(-3px);
                        box-shadow: 0 12px 35px rgba(37, 211, 102, 0.4);
                    }
                    .btn-secondary {
                        background: #6b7280;
                        color: white;
                    }
                    .btn-secondary:hover {
                        background: #4b5563;
                        transform: translateY(-2px);
                    }
                    .btn-danger {
                        background: #ef4444;
                        color: white;
                    }
                    .btn-danger:hover {
                        background: #dc2626;
                        transform: translateY(-2px);
                    }
                    
                    @media (max-width: 768px) {
                        .container {
                            padding: 20px 15px;
                        }
                        .cart-item {
                            flex-direction: column;
                            text-align: center;
                            gap: 15px;
                        }
                        .item-image {
                            margin: 0;
                        }
                        .item-details {
                            padding: 0;
                        }
                        .actions {
                            flex-direction: column;
                            align-items: center;
                        }
                        .btn {
                            width: 100%;
                            max-width: 300px;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>🛒 سلة التسوق - ${ENHANCED_CONFIG.APP_NAME}</h1>
                    
                    <div class="products-section">
                        <h3>📦 المنتجات المطلوبة (${orderData.summary.itemsCount} منتج)</h3>
                        <div class="products-list">
                            ${itemsHtml}
                        </div>
                    </div>
                    
                    ${summaryHtml}
                    
                    <div class="actions">
                        <button class="btn btn-primary" onclick="sendToWhatsApp()">
                            📱 إرسال الطلب عبر واتساب
                        </button>
                        <button class="btn btn-danger" onclick="clearCart()">
                            🧹 تفريغ السلة
                        </button>
                        <button class="btn btn-secondary" onclick="closeWindow()">
                            ❌ إغلاق السلة
                        </button>
                    </div>
                </div>
                
                <script>
                    // دوال التحكم في الكمية والحذف
                    function updateQuantity(itemId, newQuantity) {
                        if (window.opener && window.opener.cart) {
                            window.opener.cart.updateQuantity(itemId, newQuantity);
                            // إعادة تحميل النافذة لإظهار التغييرات
                            window.location.reload();
                        }
                    }
                    
                    function removeItem(itemId) {
                        if (confirm('هل تريد حذف هذا المنتج من السلة؟')) {
                            if (window.opener && window.opener.cart) {
                                window.opener.cart.removeItem(itemId);
                                // إعادة تحميل النافذة لإظهار التغييرات
                                window.location.reload();
                            }
                        }
                    }
                    
                    function clearCart() {
                        if (confirm('هل تريد تفريغ السلة بالكامل؟')) {
                            if (window.opener && window.opener.cart) {
                                window.opener.cart.clear();
                                window.close();
                            }
                        }
                    }
                    
                    function closeWindow() {
                        window.close();
                    }
                    
                    function sendToWhatsApp() {
                        const orderData = ${JSON.stringify(orderData)};
                        const message = createWhatsAppMessage(orderData);
                        const whatsappUrl = 'https://api.whatsapp.com/send?phone=${ENHANCED_CONFIG.ECOMMERCE.WHATSAPP_NUMBER}&text=' + encodeURIComponent(message);
                        window.open(whatsappUrl, '_blank');
                        
                        // إرسال البيانات للشيت أيضاً
                        if (window.opener && window.opener.sendOrderToSheets) {
                            window.opener.sendOrderToSheets(orderData);
                        }
                        
                        // إغلاق النافذة بعد الإرسال
                        setTimeout(() => {
                            if (confirm('تم إرسال الطلب! هل تريد تفريغ السلة؟')) {
                                if (window.opener && window.opener.cart) {
                                    window.opener.cart.clear();
                                }
                            }
                            window.close();
                        }, 1000);
                    }
                    
                    function createWhatsAppMessage(orderData) {
                        let message = '🛍️ طلب جديد من ${ENHANCED_CONFIG.APP_NAME}\\n';
                        message += '📋 رقم الطلب: ' + orderData.orderId + '\\n\\n';
                        
                        // معلومات الطلب
                        message += '📊 ملخص الطلب:\\n';
                        message += '📦 عدد المنتجات: ' + orderData.summary.itemsCount + ' منتج\\n';
                        message += '📈 إجمالي القطع: ' + orderData.summary.totalQuantity + ' قطعة\\n\\n';
                        
                        // المنتجات
                        message += '🏷️ المنتجات المطلوبة:\\n';
                        orderData.products.forEach((product, index) => {
                            message += '\\n' + (index + 1) + '. ' + product.name;
                            message += '\\n   📋 رقم المنتج: ' + product.code;
                            message += '\\n   💰 السعر: ' + product.price.toLocaleString() + ' ${ENHANCED_CONFIG.ECOMMERCE.CURRENCY}';
                            message += '\\n   📦 الكمية: ' + product.quantity;
                            if (product.size) message += '\\n   📏 المقاس: ' + product.size;
                            message += '\\n   💵 المجموع الفرعي: ' + product.itemTotal.toLocaleString() + ' ${ENHANCED_CONFIG.ECOMMERCE.CURRENCY}';
                            message += '\\n   🖼️ رابط الصورة: ' + product.imageUrl;
                            message += '\\n';
                        });
                        
                        // الملخص المالي
                        message += '\\n📊 الملخص المالي:\\n';
                        message += '💰 المجموع الفرعي: ' + orderData.summary.subtotal.toLocaleString() + ' ${ENHANCED_CONFIG.ECOMMERCE.CURRENCY}\\n';
                        message += '🚚 رسوم التوصيل: ' + (orderData.summary.deliveryFee === 0 ? 'مجاني 🎉' : orderData.summary.deliveryFee.toLocaleString() + ' ${ENHANCED_CONFIG.ECOMMERCE.CURRENCY}') + '\\n';
                        message += '💵 المجموع الكلي: ' + orderData.summary.total.toLocaleString() + ' ${ENHANCED_CONFIG.ECOMMERCE.CURRENCY}\\n\\n';
                        
                        // معلومات إضافية
                        message += '📅 تاريخ الطلب: ' + new Date(orderData.orderDate).toLocaleDateString('ar-IQ') + '\\n';
                        message += '⏰ وقت الطلب: ' + new Date(orderData.orderDate).toLocaleTimeString('ar-IQ') + '\\n';
                        message += '📞 للتواصل: ${ENHANCED_CONFIG.ECOMMERCE.PHONE_NUMBER}\\n';
                        message += '🌐 الموقع: ${ENHANCED_CONFIG.APP_URL}';
                        
                        return message;
                    }
                    
                    // فحص إذا تم إغلاق النافذة الأصلية
                    setInterval(() => {
                        if (window.opener && window.opener.closed) {
                            window.close();
                        }
                    }, 1000);
                </script>
            </body>
            </html>
        `;
    }
    
    setupWindowEventHandlers() {
        if (!this.window) return;
        
        // التأكد من إغلاق النافذة عند إغلاق النافذة الأصلية
        window.addEventListener('beforeunload', () => {
            if (this.window && !this.window.closed) {
                this.window.close();
            }
        });
    }
    
    showToast(message, type = 'info') {
        if (window.ui && window.ui.showToast) {
            window.ui.showToast(message, type);
        } else {
            alert(message);
        }
    }
}

// ===== 6. إرسال البيانات للشيت =====
async function sendOrderToSheets(orderData) {
    try {
        const payload = {
            action: 'save_order',
            orderData: {
                orderId: orderData.orderId,
                orderDate: orderData.orderDate,
                customer: orderData.customer,
                products: orderData.products,
                summary: orderData.summary,
                source: orderData.source
            }
        };
        
        const response = await fetch(ENHANCED_CONFIG.WEB_APP_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        const result = await response.json();
        
        if (result.success) {
            console.log('✅ تم إرسال الطلب للشيت بنجاح');
        } else {
            console.error('❌ فشل في إرسال الطلب للشيت:', result.error);
        }
        
        return result;
    } catch (error) {
        console.error('❌ خطأ في إرسال الطلب للشيت:', error);
        return { success: false, error: error.message };
    }
}

// ===== 7. تهيئة النظام المحسن =====
let pwaManager, enhancedCart, cartWindow;

// دوال عامة للاستخدام من HTML
function openCart() {
    if (cartWindow) {
        cartWindow.open();
    }
}

function addToCart(code, name, price, imageUrl, size = '', category = '', sheetName = '') {
    if (enhancedCart) {
        const success = enhancedCart.addItem({
            code, name, price, imageUrl, size, category, sheetName
        });
        
        if (success && window.ui && window.ui.showToast) {
            window.ui.showToast(`✅ تم إضافة "${name}" للسلة`, 'success');
        }
    }
}

// تهيئة النظام المحسن
document.addEventListener('DOMContentLoaded', function() {
    // تأخير التهيئة للتأكد من تحميل النظام الأساسي
    setTimeout(() => {
        console.log('🚀 تهيئة النظام المحسن...');
        
        // تهيئة PWA Manager
        pwaManager = new PWAManager();
        
        // تهيئة السلة المحسنة
        enhancedCart = new EnhancedShoppingCart();
        
        // تهيئة نافذة السلة
        cartWindow = new EnhancedCartWindow(enhancedCart);
        
        // استبدال السلة القديمة بالجديدة
        if (window.cart) {
            // نقل البيانات من السلة القديمة للجديدة
            if (window.cart.items && window.cart.items.length > 0) {
                enhancedCart.items = window.cart.items;
                enhancedCart.saveToStorage();
            }
        }
        
        // تحديث المراجع العامة
        window.cart = enhancedCart;
        window.cartWindow = cartWindow;
        window.pwaManager = pwaManager;
        window.sendOrderToSheets = sendOrderToSheets;
        
        console.log('✅ النظام المحسن جاهز!');
        
    }, 1000);
});

console.log('📦 تم تحميل النظام المحسن - Enhanced System Ready!');





// ========================================================================
// ========================================================================
// ========================================================================
// ========================================================================
// ========================================================================
//
//    SHIQ E-COMMERCE APPLICATION - ADVANCED FEATURES SYSTEM v3.0
//    التطبيق المتقدم للتسوق الإلكتروني - نظام الميزات المتقدمة
//
// ========================================================================
// ========================================================================
// ========================================================================
// ========================================================================
// ========================================================================
//
// المطور: فريق SHIQ Development Team
// التاريخ: 2025-01-27
// الإصدار: 3.0.0 Professional Advanced
// الوصف: النظام المتقدم للإشعارات وإدارة المستخدمين والإحصائيات
//
// ========================================================================
// ملاحظة مهمة: هذا الجزء منفصل تماماً عن النظام الأساسي ويمكن استخدامه
// في أي تطبيق آخر عبر استيراد هذا الملف أو نسخ الأكواد المطلوبة
// ========================================================================

// ===== 1. إعدادات النظام المتقدم =====
const ADVANCED_CONFIG = {
    // إعدادات Google Apps Script
    WEB_APP_URL: 'https://script.google.com/macros/s/AKfycbzc9ojokNkOcmtINeXR9ijzc5HCfq5Ljgcp_4WIpW5JLGSnJryRvnyZqH8EEwB7tbHk/exec',
    MAIN_SHEET_ID: '1ap6gkoczUsqvf0KMoxXroo2uP_wycDGxyg6r-UPFgBQ',
    
    // أوراق العمل المتقدمة
    SHEETS: {
        USERS: 'Users',
        ORDERS: 'Orders',
        ANALYTICS: 'Analytics',
        SUBSCRIPTIONS: 'Subscriptions',
        NOTIFICATIONS: 'Notifications'
    },
    
    // إعدادات الإشعارات
    NOTIFICATIONS: {
        ENABLED: true,
        DEFAULT_ICON: './icons/icon-192x192.png',
        PERMISSION_TIMEOUT: 5000,
        RETRY_ATTEMPTS: 3,
        BATCH_SIZE: 100,
        RATE_LIMIT: 1000 // مللي ثانية بين الإرسالات
    },
    
    // إعدادات Firebase (اختيارية)
    FIREBASE: {
        ENABLED: false,
        SERVER_KEY: '',
        FCM_ENDPOINT: 'https://fcm.googleapis.com/fcm/send'
    },
    
    // إعدادات التخزين المتقدم
    STORAGE_KEYS: {
        USER_DATA: 'shiq_user_data_v3',
        DEVICE_ID: 'shiq_device_id_v3',
        NOTIFICATIONS_STATUS: 'shiq_notifications_status_v3',
        ANALYTICS_DATA: 'shiq_analytics_v3',
        PREFERENCES: 'shiq_advanced_preferences_v3'
    },
    
    // المحافظات العراقية
    GOVERNORATES: [
        'بغداد', 'البصرة', 'نينوى', 'أربيل', 'النجف', 'كربلاء',
        'بابل', 'الأنبار', 'ذي قار', 'القادسية', 'كركوك', 'واسط',
        'صلاح الدين', 'المثنى', 'ديالى', 'ميسان', 'دهوك', 'السليمانية'
    ],
    
    // فئات الاهتمامات
    INTERESTS: [
        'اكسسوارات نسائية', 'احذية وحقائب', 'ملابس نسائية', 'ملابس اطفال',
        'مستلزمات منزلية', 'مستلزمات موبايل', 'مكياج وعناية', 'مفروشات'
    ]
};

// ===== 2. نظام إدارة المستخدمين المتقدم =====
class UserManager {
    constructor() {
        this.currentUser = null;
        this.deviceId = null;
        this.initialize();
    }
    
    async initialize() {
        this.deviceId = this.getOrCreateDeviceId();
        this.currentUser = this.loadUserData();
        
        if (this.currentUser) {
            this.updateLastActivity();
            this.showWelcomeBack();
        }
        
        console.log('👤 نظام إدارة المستخدمين جاهز');
    }
    
    getOrCreateDeviceId() {
        let deviceId = localStorage.getItem(ADVANCED_CONFIG.STORAGE_KEYS.DEVICE_ID);
        
        if (!deviceId) {
            deviceId = this.generateDeviceId();
            localStorage.setItem(ADVANCED_CONFIG.STORAGE_KEYS.DEVICE_ID, deviceId);
            this.registerDevice(deviceId);
        }
        
        return deviceId;
    }
    
    generateDeviceId() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 9);
        const fingerprint = this.createFingerprint();
        return `SHIQ_DEVICE_${timestamp}_${fingerprint}_${random}`;
    }
    
    createFingerprint() {
        const data = [
            navigator.userAgent,
            navigator.language,
            screen.width,
            screen.height,
            new Date().getTimezoneOffset()
        ].join('|');
        
        return btoa(data).slice(0, 8);
    }
    
    async registerDevice(deviceId) {
        try {
            const deviceData = {
                deviceId: deviceId,
                userAgent: navigator.userAgent,
                language: navigator.language,
                platform: navigator.platform,
                screenResolution: `${screen.width}x${screen.height}`,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                installDate: new Date().toISOString(),
                appVersion: CORE_CONFIG?.APP_VERSION || '3.0.0'
            };
            
            await this.sendToBackend('register_device', { deviceData });
            console.log('📱 تم تسجيل الجهاز:', deviceId);
        } catch (error) {
            console.warn('تعذر تسجيل الجهاز:', error);
        }
    }
    
    loadUserData() {
        try {
            const userData = localStorage.getItem(ADVANCED_CONFIG.STORAGE_KEYS.USER_DATA);
            if (userData) {
                const user = JSON.parse(userData);
                return this.validateUserData(user) ? user : null;
            }
        } catch (error) {
            console.error('خطأ في تحميل بيانات المستخدم:', error);
        }
        return null;
    }
    
    validateUserData(user) {
        const required = ['id', 'name', 'phone', 'governorate'];
        return required.every(field => user[field]);
    }
    
    async saveUserData(userData) {
        try {
            // تحضير البيانات
            const user = {
                id: userData.id || this.generateUserId(),
                name: userData.name.trim(),
                phone: userData.phone.trim(),
                governorate: userData.governorate,
                address: userData.address?.trim() || '',
                gender: userData.gender || '',
                interests: Array.isArray(userData.interests) ? userData.interests : [],
                notificationsEnabled: userData.notificationsEnabled || false,
                registrationDate: userData.registrationDate || new Date().toISOString(),
                lastActive: new Date().toISOString(),
                version: CORE_CONFIG?.APP_VERSION || '3.0.0',
                deviceId: this.deviceId
            };
            
            // التحقق من صحة البيانات
            if (!this.validateUserData(user)) {
                throw new Error('بيانات المستخدم غير مكتملة');
            }
            
            // حفظ محلياً
            localStorage.setItem(ADVANCED_CONFIG.STORAGE_KEYS.USER_DATA, JSON.stringify(user));
            this.currentUser = user;
            
            // إرسال للخادم
            const result = await this.sendToBackend('save_user', { userData: user });
            
            if (result.success) {
                console.log('✅ تم حفظ بيانات المستخدم');
                
                // تسجيل في الإشعارات إذا كانت مفعلة
                if (user.notificationsEnabled) {
                    await notificationManager.subscribeUser(user);
                }
                
                // تتبع التسجيل
                analyticsManager.trackUserRegistration(user);
                
                return { success: true, user: user };
            } else {
                throw new Error(result.error || 'فشل في حفظ البيانات');
            }
            
        } catch (error) {
            console.error('خطأ في حفظ بيانات المستخدم:', error);
            return { success: false, error: error.message };
        }
    }
    
    generateUserId() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 9);
        return `SHIQ_USER_${timestamp}_${random}`;
    }
    
    updateLastActivity() {
        if (this.currentUser) {
            this.currentUser.lastActive = new Date().toISOString();
            localStorage.setItem(ADVANCED_CONFIG.STORAGE_KEYS.USER_DATA, JSON.stringify(this.currentUser));
        }
    }
    
    showWelcomeBack() {
        if (this.currentUser) {
            const firstName = this.currentUser.name.split(' ')[0];
            const welcomeMessage = `أهلاً بعودتك ${firstName} من ${this.currentUser.governorate} 👋`;
            
            setTimeout(() => {
                this.showNotification(welcomeMessage, 'success');
            }, 1000);
            
            this.updateWelcomeUI();
        }
    }
    
    updateWelcomeUI() {
        const welcomeDiv = document.getElementById('userWelcome');
        const profileBtn = document.getElementById('userProfileBtn');
        
        if (this.currentUser && welcomeDiv) {
            const firstName = this.currentUser.name.split(' ')[0];
            welcomeDiv.innerHTML = `مرحباً ${firstName} من ${this.currentUser.governorate} 👋`;
            welcomeDiv.style.display = 'block';
        }
        
        if (profileBtn) {
            profileBtn.classList.add('show');
        }
    }
    
    showRegistrationForm() {
        const modal = this.createRegistrationModal();
        document.body.appendChild(modal);
        modal.classList.add('show');
    }
    
    createRegistrationModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'advanced-user-registration';
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>🙋‍♀️ مرحباً بك في شي ان العراق</h2>
                    <p>نحتاج بعض المعلومات لتحسين تجربة التسوق</p>
                </div>
                
                <form id="advanced-registration-form">
                    <div class="form-group">
                        <label for="userName">الاسم الكامل *</label>
                        <input type="text" id="userName" class="form-control" placeholder="مثال: أحمد محمد" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="userPhone">رقم الهاتف *</label>
                        <input type="tel" id="userPhone" class="form-control" placeholder="مثال: 07901234567" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="userGovernorate">المحافظة *</label>
                        <select id="userGovernorate" class="form-control" required>
                            <option value="">اختر المحافظة</option>
                            ${ADVANCED_CONFIG.GOVERNORATES.map(gov => `<option value="${gov}">${gov}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="userAddress">العنوان التفصيلي *</label>
                        <textarea id="userAddress" class="form-control" rows="3" placeholder="مثال: حي الجامعة، شارع الكندي، بناية رقم 15" required></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="userGender">الجنس</label>
                        <select id="userGender" class="form-control">
                            <option value="">اختياري</option>
                            <option value="female">أنثى</option>
                            <option value="male">ذكر</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>الاهتمامات (اختر ما يناسبك)</label>
                        <div class="interests-grid">
                            ${ADVANCED_CONFIG.INTERESTS.map(interest => `
                                <label class="interest-item">
                                    <input type="checkbox" value="${interest}">
                                    <span>${interest}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="notification-permission">
                        <h4>🔔 هل تريد تلقي إشعارات العروض الخاصة؟</h4>
                        <p>ستصلك إشعارات بأحدث المنتجات والخصومات</p>
                        <div class="notification-buttons">
                            <button type="button" onclick="userManager.enableNotifications()" class="btn-notification-yes">
                                نعم، أريد الإشعارات
                            </button>
                            <button type="button" onclick="userManager.skipNotifications()" class="btn-notification-no">
                                ليس الآن
                            </button>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">
                        💾 حفظ البيانات والمتابعة
                    </button>
                </form>
            </div>
        `;
        
        // إضافة الأحداث
        const form = modal.querySelector('#advanced-registration-form');
        form.addEventListener('submit', (e) => this.handleRegistrationSubmit(e));
        
        return modal;
    }
    
    async handleRegistrationSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const interests = Array.from(event.target.querySelectorAll('input[type="checkbox"]:checked'))
            .map(cb => cb.value);
        
        const userData = {
            name: formData.get('userName'),
            phone: formData.get('userPhone'),
            governorate: formData.get('userGovernorate'),
            address: formData.get('userAddress'),
            gender: formData.get('userGender'),
            interests: interests,
            notificationsEnabled: this.notificationsRequested || false
        };
        
        // التحقق من البيانات
        if (!this.validateFormData(userData)) {
            return;
        }
        
        // حفظ البيانات
        const result = await this.saveUserData(userData);
        
        if (result.success) {
            this.closeRegistrationModal();
            this.showNotification('🎉 مرحباً بك! تم تسجيلك بنجاح', 'success');
            
            // إرسال إشعار ترحيب
            if (userData.notificationsEnabled) {
                setTimeout(() => {
                    notificationManager.sendWelcomeNotification(result.user);
                }, 2000);
            }
        } else {
            this.showNotification('❌ ' + result.error, 'error');
        }
    }
    
    validateFormData(userData) {
        if (!userData.name || userData.name.length < 2) {
            this.showNotification('❌ يرجى إدخال اسم صحيح', 'error');
            return false;
        }
        
        if (!userData.phone || !/^07[0-9]{9}$/.test(userData.phone)) {
            this.showNotification('❌ رقم الهاتف غير صحيح. يجب أن يبدأ بـ 07 ويتكون من 11 رقم', 'error');
            return false;
        }
        
        if (!userData.governorate) {
            this.showNotification('❌ يرجى اختيار المحافظة', 'error');
            return false;
        }
        
        if (!userData.address || userData.address.length < 10) {
            this.showNotification('❌ يرجى إدخال عنوان تفصيلي', 'error');
            return false;
        }
        
        return true;
    }
    
    async enableNotifications() {
        this.notificationsRequested = true;
        const result = await notificationManager.requestPermission();
        
        if (result) {
            this.showNotification('✅ تم تفعيل الإشعارات بنجاح', 'success');
        } else {
            this.showNotification('⚠️ لم يتم تفعيل الإشعارات', 'warning');
        }
    }
    
    skipNotifications() {
        this.notificationsRequested = false;
        this.showNotification('ℹ️ يمكنك تفعيل الإشعارات لاحقاً من الإعدادات', 'info');
    }
    
    closeRegistrationModal() {
        const modal = document.getElementById('advanced-user-registration');
        if (modal) {
            modal.remove();
        }
    }
    
    showNotification(message, type = 'info') {
        // استخدام نظام التنبيهات من النظام الأساسي إذا كان متاحاً
        if (window.ui && window.ui.showToast) {
            window.ui.showToast(message, type);
            return;
        }
        
        // نظام تنبيهات مستقل
        const notification = document.createElement('div');
        const colors = {
            success: '#10B981',
            error: '#EF4444',
            warning: '#F59E0B',
            info: '#3B82F6'
        };
        
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; background: ${colors[type]};
            color: white; padding: 15px 20px; border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2); z-index: 10001;
            font-weight: 600; max-width: 350px; font-family: 'Segoe UI', sans-serif;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.remove(), 4000);
    }
    
    async sendToBackend(action, data) {
        try {
            const payload = {
                action: action,
                ...data,
                timestamp: new Date().toISOString(),
                deviceId: this.deviceId
            };
            
            const response = await fetch(ADVANCED_CONFIG.WEB_APP_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            return await response.json();
        } catch (error) {
            console.error('خطأ في الاتصال بالخادم:', error);
            return { success: false, error: error.message };
        }
    }
}

// ===== 3. نظام إدارة الإشعارات المتقدم =====
class NotificationManager {
    constructor() {
        this.permission = Notification.permission;
        this.subscribers = [];
        this.initialize();
    }
    
    async initialize() {
        // محاولة تلقائية لطلب الإذن
        if (this.permission === 'default') {
            setTimeout(() => {
                this.requestPermissionAutomatically();
            }, 3000);
        }
        
        console.log('🔔 نظام الإشعارات جاهز - الحالة:', this.permission);
    }
    
    async requestPermissionAutomatically() {
        try {
            const permission = await Notification.requestPermission();
            this.permission = permission;
            
            localStorage.setItem(ADVANCED_CONFIG.STORAGE_KEYS.NOTIFICATIONS_STATUS, permission);
            
            if (permission === 'granted') {
                console.log('✅ تم تفعيل الإشعارات تلقائياً');
                
                setTimeout(() => {
                    this.showWelcomeNotification();
                }, 1000);
                
                // إرسال حالة الإشعارات للخادم
                this.updateNotificationStatus(true);
            }
            
            return permission === 'granted';
        } catch (error) {
            console.error('خطأ في طلب إذن الإشعارات:', error);
            return false;
        }
    }
    
    async requestPermission() {
        if (this.permission === 'granted') {
            return true;
        }
        
        try {
            const permission = await Notification.requestPermission();
            this.permission = permission;
            
            localStorage.setItem(ADVANCED_CONFIG.STORAGE_KEYS.NOTIFICATIONS_STATUS, permission);
            
            if (permission === 'granted') {
                this.updateNotificationStatus(true);
                return true;
            } else {
                this.updateNotificationStatus(false);
                return false;
            }
        } catch (error) {
            console.error('خطأ في طلب الإذن:', error);
            return false;
        }
    }
    
    async subscribeUser(userData) {
        if (this.permission !== 'granted') {
            console.warn('الإشعارات غير مفعلة');
            return false;
        }
        
        try {
            const subscriptionData = {
                userId: userData.id,
                name: userData.name,
                phone: userData.phone,
                governorate: userData.governorate,
                interests: userData.interests,
                subscriptionType: 'general',
                notificationTiming: 'all_times',
                subscriptionDate: new Date().toISOString(),
                deviceId: userManager.deviceId
            };
            
            const result = await this.sendToBackend('subscribe_user', { subscriptionData });
            
            if (result.success) {
                console.log('✅ تم اشتراك المستخدم في الإشعارات');
                return true;
            } else {
                console.error('فشل في اشتراك المستخدم:', result.error);
                return false;
            }
        } catch (error) {
            console.error('خطأ في اشتراك المستخدم:', error);
            return false;
        }
    }
    
    showWelcomeNotification() {
        this.showNotification('🎉 مرحباً بك في شي ان العراق!', {
            body: 'ستصلك أحدث العروض والمنتجات الجديدة',
            icon: ADVANCED_CONFIG.NOTIFICATIONS.DEFAULT_ICON,
            tag: 'welcome-auto',
            requireInteraction: false
        });
    }
    
    async sendWelcomeNotification(userData) {
        const firstName = userData.name.split(' ')[0];
        
        this.showNotification(`🎉 مرحباً ${firstName}!`, {
            body: `أهلاً بك في شي ان العراق من ${userData.governorate}`,
            icon: ADVANCED_CONFIG.NOTIFICATIONS.DEFAULT_ICON,
            tag: 'welcome-user',
            requireInteraction: false
        });
    }
    
    showNotification(title, options = {}) {
        if (this.permission !== 'granted') {
            console.warn('الإشعارات غير مفعلة');
            return;
        }
        
        const defaultOptions = {
            body: '',
            icon: ADVANCED_CONFIG.NOTIFICATIONS.DEFAULT_ICON,
            badge: ADVANCED_CONFIG.NOTIFICATIONS.DEFAULT_ICON,
            vibrate: [200, 100, 200],
            requireInteraction: false,
            silent: false,
            tag: 'shiq-notification',
            data: {
                timestamp: Date.now(),
                url: window.location.href
            }
        };
        
        const finalOptions = { ...defaultOptions, ...options };
        
        try {
            const notification = new Notification(title, finalOptions);
            
            notification.onclick = () => {
                window.focus();
                notification.close();
                
                // تتبع النقر على الإشعار
                analyticsManager.trackNotificationClick(title, finalOptions.tag);
            };
            
            // إغلاق تلقائي بعد 10 ثواني
            setTimeout(() => {
                notification.close();
            }, 10000);
            
            return notification;
        } catch (error) {
            console.error('خطأ في إظهار الإشعار:', error);
        }
    }
    
    async sendCustomNotification(notificationData) {
        try {
            const result = await this.sendToBackend('create_notification', { notificationData });
            
            if (result.success) {
                console.log('✅ تم إرسال الإشعار المخصص');
                return result;
            } else {
                console.error('فشل في إرسال الإشعار:', result.error);
                return result;
            }
        } catch (error) {
            console.error('خطأ في إرسال الإشعار المخصص:', error);
            return { success: false, error: error.message };
        }
    }
    
    scheduleLocalNotification(title, body, delay) {
        setTimeout(() => {
            this.showNotification(title, {
                body: body,
                tag: 'scheduled-local'
            });
        }, delay);
    }
    
    updateNotificationStatus(enabled) {
        this.sendToBackend('update_notification_status', {
            deviceId: userManager.deviceId,
            userId: userManager.currentUser?.id,
            enabled: enabled
        });
    }
    
    async sendToBackend(action, data) {
        try {
            const payload = {
                action: action,
                ...data,
                timestamp: new Date().toISOString()
            };
            
            const response = await fetch(ADVANCED_CONFIG.WEB_APP_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            return await response.json();
        } catch (error) {
            console.error('خطأ في الاتصال بالخادم:', error);
            return { success: false, error: error.message };
        }
    }
}

// ===== 4. نظام التحليلات والإحصائيات =====
class AnalyticsManager {
    constructor() {
        this.events = [];
        this.sessionId = this.generateSessionId();
        this.initialize();
    }
    
    initialize() {
        this.trackPageView();
        this.setupAutoTracking();
        console.log('📊 نظام التحليلات جاهز');
    }
    
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    trackPageView() {
        this.trackEvent('page_view', {
            url: window.location.href,
            title: document.title,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
        });
    }
    
    trackUserRegistration(userData) {
        this.trackEvent('user_registered', {
            userId: userData.id,
            governorate: userData.governorate,
            interests: userData.interests,
            notificationsEnabled: userData.notificationsEnabled,
            registrationMethod: 'manual'
        });
    }
    
    trackCategorySelection(categoryName) {
        this.trackEvent('category_selected', {
            categoryName: categoryName,
            timestamp: new Date().toISOString()
        });
    }
    
    trackProductView(productName, categoryName) {
        this.trackEvent('product_viewed', {
            productName: productName,
            categoryName: categoryName,
            timestamp: new Date().toISOString()
        });
    }
    
    trackAddToCart(productName, price, categoryName) {
        this.trackEvent('add_to_cart', {
            productName: productName,
            price: price,
            categoryName: categoryName,
            timestamp: new Date().toISOString()
        });
    }
    
    trackOrderCreated(orderData) {
        this.trackEvent('order_created', {
            orderId: orderData.orderId,
            totalAmount: orderData.total,
            itemsCount: orderData.products?.length || 0,
            governorate: orderData.governorate,
            timestamp: new Date().toISOString()
        });
    }
    
    trackNotificationClick(title, tag) {
        this.trackEvent('notification_clicked', {
            title: title,
            tag: tag,
            timestamp: new Date().toISOString()
        });
    }
    
    trackSearch(query, category) {
        this.trackEvent('search_performed', {
            query: query,
            category: category,
            timestamp: new Date().toISOString()
        });
    }
    
    trackEvent(eventType, eventData) {
        const event = {
            id: 'event_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            sessionId: this.sessionId,
            eventType: eventType,
            eventData: eventData,
            userId: userManager.currentUser?.id || null,
            deviceId: userManager.deviceId,
            timestamp: new Date().toISOString(),
            url: window.location.href
        };
        
        this.events.push(event);
        this.sendEventToBackend(event);
        
        // حفظ محلي للأحداث
        this.saveEventsLocally();
        
        console.log('📈 تم تتبع الحدث:', eventType, eventData);
    }
    
    async sendEventToBackend(event) {
        try {
            await fetch(ADVANCED_CONFIG.WEB_APP_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'track_event',
                    eventData: event
                })
            });
        } catch (error) {
            console.warn('لم يتم إرسال الحدث للخادم:', error);
        }
    }
    
    saveEventsLocally() {
        try {
            // الاحتفاظ بآخر 100 حدث فقط
            if (this.events.length > 100) {
                this.events = this.events.slice(-100);
            }
            
            localStorage.setItem(ADVANCED_CONFIG.STORAGE_KEYS.ANALYTICS_DATA, JSON.stringify({
                events: this.events,
                sessionId: this.sessionId,
                lastUpdated: new Date().toISOString()
            }));
        } catch (error) {
            console.warn('لم يتم حفظ الأحداث محلياً:', error);
        }
    }
    
    setupAutoTracking() {
        // تتبع الأخطاء
        window.addEventListener('error', (e) => {
            this.trackEvent('javascript_error', {
                message: e.message,
                filename: e.filename,
                lineno: e.lineno,
                colno: e.colno
            });
        });
        
        // تتبع حالة الشبكة
        window.addEventListener('online', () => {
            this.trackEvent('network_status', { status: 'online' });
        });
        
        window.addEventListener('offline', () => {
            this.trackEvent('network_status', { status: 'offline' });
        });
        
        // تتبع مغادرة الصفحة
        window.addEventListener('beforeunload', () => {
            this.trackEvent('page_unload', {
                sessionDuration: Date.now() - this.sessionStart,
                eventsCount: this.events.length
            });
        });
        
        this.sessionStart = Date.now();
    }
    
    getAnalyticsReport() {
        return {
            sessionId: this.sessionId,
            totalEvents: this.events.length,
            eventTypes: this.getEventTypesCount(),
            sessionDuration: Date.now() - this.sessionStart,
            userId: userManager.currentUser?.id,
            deviceId: userManager.deviceId
        };
    }
    
    getEventTypesCount() {
        const counts = {};
        this.events.forEach(event => {
            counts[event.eventType] = (counts[event.eventType] || 0) + 1;
        });
        return counts;
    }
}

// ===== 5. نظام إدارة الطلبات المتقدم =====
class OrderManager {
    constructor() {
        this.orders = [];
        this.initialize();
    }
    
    initialize() {
        console.log('📦 نظام إدارة الطلبات جاهز');
    }
    
    async createOrder(cartItems, customerInfo = null) {
        try {
            const customer = customerInfo || userManager.currentUser;
            
            if (!customer) {
                throw new Error('لا توجد معلومات العميل');
            }
            
            const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const deliveryFee = subtotal >= CORE_CONFIG?.ECOMMERCE?.FREE_DELIVERY_THRESHOLD ? 0 : (CORE_CONFIG?.ECOMMERCE?.DELIVERY_FEE || 5000);
            const total = subtotal + deliveryFee;
            
            const orderData = {
                orderId: this.generateOrderId(),
                userId: customer.id,
                userName: customer.name,
                userPhone: customer.phone,
                governorate: customer.governorate,
                address: customer.address,
                products: cartItems.map(item => ({
                    code: item.code,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    size: item.size,
                    imageUrl: item.imageUrl
                })),
                subtotal: subtotal,
                deliveryFee: deliveryFee,
                total: total,
                status: 'pending',
                paymentMethod: 'cash_on_delivery',
                orderDate: new Date().toISOString(),
                deviceId: userManager.deviceId,
                source: 'web_app'
            };
            
            // حفظ في الخادم
            const result = await this.sendOrderToBackend(orderData);
            
            if (result.success) {
                // تتبع الطلب
                analyticsManager.trackOrderCreated(orderData);
                
                console.log('✅ تم إنشاء الطلب:', result.orderId);
                return { success: true, orderId: result.orderId, orderData: orderData };
            } else {
                throw new Error(result.error || 'فشل في إنشاء الطلب');
            }
            
        } catch (error) {
            console.error('خطأ في إنشاء الطلب:', error);
            return { success: false, error: error.message };
        }
    }
    
    generateOrderId() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 6).toUpperCase();
        return `SHIQ-${timestamp}-${random}`;
    }
    
    createWhatsAppMessage(orderData) {
        let message = `🛍️ طلب جديد من شي ان العراق\n\n`;
        
        // معلومات العميل
        message += `👤 معلومات العميل:\n`;
        message += `📛 الاسم: ${orderData.userName}\n`;
        message += `📞 الهاتف: ${orderData.userPhone}\n`;
        message += `🏠 المحافظة: ${orderData.governorate}\n`;
        message += `📍 العنوان: ${orderData.address}\n`;
        message += `🆔 معرف العميل: ${orderData.userId}\n\n`;
        
        // تفاصيل الطلب
        message += `🛒 تفاصيل الطلب:\n`;
        message += `📦 رقم الطلب: ${orderData.orderId}\n`;
        message += `📊 عدد المنتجات: ${orderData.products.length} منتج\n`;
        message += `📈 إجمالي القطع: ${orderData.products.reduce((sum, p) => sum + p.quantity, 0)} قطعة\n\n`;
        
        // المنتجات
        message += `🏷️ المنتجات المطلوبة:\n`;
        orderData.products.forEach((product, index) => {
            const itemTotal = product.price * product.quantity;
            message += `\n${index + 1}. ${product.name}\n`;
            message += `   💰 السعر: ${product.price.toLocaleString()} د.ع\n`;
            message += `   📦 الكمية: ${product.quantity}\n`;
            if (product.size) message += `   📏 المقاس: ${product.size}\n`;
            message += `   💵 المجموع: ${itemTotal.toLocaleString()} د.ع\n`;
        });
        
        // ملخص الطلب
        message += `\n📊 ملخص الطلب:\n`;
        message += `💰 المجموع الفرعي: ${orderData.subtotal.toLocaleString()} د.ع\n`;
        message += `🚚 رسوم التوصيل: ${orderData.deliveryFee === 0 ? 'مجاني 🎉' : orderData.deliveryFee.toLocaleString() + ' د.ع'}\n`;
        message += `💵 المجموع الكلي: ${orderData.total.toLocaleString()} د.ع\n\n`;
        
        // معلومات إضافية
        message += `📋 معلومات إضافية:\n`;
        message += `📅 تاريخ الطلب: ${new Date(orderData.orderDate).toLocaleDateString('ar-IQ')}\n`;
        message += `⏰ وقت الطلب: ${new Date(orderData.orderDate).toLocaleTimeString('ar-IQ')}\n`;
        message += `💳 طريقة الدفع: دفع عند الاستلام\n\n`;
        
        message += `✅ يرجى تأكيد الطلب وتحديد موعد التسليم.\n`;
        message += `🚚 التوصيل متاح لجميع مناطق ${orderData.governorate}\n`;
        message += `📞 للاستفسار: ${CORE_CONFIG?.ECOMMERCE?.PHONE_NUMBER || '07862799748'}`;
        
        return message;
    }
    
    sendOrderViaWhatsApp(orderData) {
        const message = this.createWhatsAppMessage(orderData);
        const whatsappNumber = CORE_CONFIG?.ECOMMERCE?.WHATSAPP_NUMBER || ADVANCED_CONFIG.WEB_APP_URL.match(/\d+/)?.[0] || '9647862799748';
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
        
        // تتبع إرسال الطلب
        analyticsManager.trackEvent('order_sent_whatsapp', {
            orderId: orderData.orderId,
            totalAmount: orderData.total,
            governorate: orderData.governorate
        });
        
        return whatsappUrl;
    }
    
    async sendOrderToBackend(orderData) {
        try {
            const response = await fetch(ADVANCED_CONFIG.WEB_APP_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'save_order',
                    orderData: orderData
                })
            });
            
            return await response.json();
        } catch (error) {
            console.error('خطأ في إرسال الطلب للخادم:', error);
            return { success: false, error: error.message };
        }
    }
}

// ===== 6. نظام إدارة التفضيلات =====
class PreferencesManager {
    constructor() {
        this.preferences = this.loadPreferences();
        this.initialize();
    }
    
    initialize() {
        console.log('⚙️ نظام التفضيلات جاهز');
    }
    
    loadPreferences() {
        try {
            const saved = localStorage.getItem(ADVANCED_CONFIG.STORAGE_KEYS.PREFERENCES);
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (error) {
            console.warn('خطأ في تحميل التفضيلات:', error);
        }
        
        return this.getDefaultPreferences();
    }
    
    getDefaultPreferences() {
        return {
            language: 'ar',
            theme: 'light',
            notifications: {
                enabled: true,
                sound: true,
                vibration: true,
                daily: true,
                weekly: true,
                promotional: true
            },
            privacy: {
                analytics: true,
                locationTracking: false,
                personalizedAds: true
            },
            ui: {
                showWelcomeMessage: true,
                autoSaveCart: true,
                rememberSearches: true
            }
        };
    }
    
    updatePreference(key, value) {
        this.preferences[key] = value;
        this.savePreferences();
        this.applyPreference(key, value);
    }
    
    savePreferences() {
        try {
            localStorage.setItem(ADVANCED_CONFIG.STORAGE_KEYS.PREFERENCES, JSON.stringify(this.preferences));
        } catch (error) {
            console.warn('خطأ في حفظ التفضيلات:', error);
        }
    }
    
    applyPreference(key, value) {
        switch (key) {
            case 'theme':
                this.applyTheme(value);
                break;
            case 'notifications':
                this.applyNotificationSettings(value);
                break;
            default:
                console.log('تم تحديث التفضيل:', key, value);
        }
    }
    
    applyTheme(theme) {
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(theme + '-theme');
    }
    
    applyNotificationSettings(settings) {
        if (settings.enabled && notificationManager) {
            notificationManager.requestPermission();
        }
    }
    
    getPreference(key) {
        return this.preferences[key];
    }
    
    resetToDefaults() {
        this.preferences = this.getDefaultPreferences();
        this.savePreferences();
        this.applyAllPreferences();
    }
    
    applyAllPreferences() {
        Object.entries(this.preferences).forEach(([key, value]) => {
            this.applyPreference(key, value);
        });
    }
}

// ===== 7. تهيئة النظام المتقدم =====
let userManager, notificationManager, analyticsManager, orderManager, preferencesManager;

// دالة التهيئة الرئيسية
async function initializeAdvancedFeatures() {
    try {
        console.log('🚀 بدء تهيئة النظام المتقدم...');
        
        // تهيئة المدراء
        userManager = new UserManager();
        notificationManager = new NotificationManager();
        analyticsManager = new AnalyticsManager();
        orderManager = new OrderManager();
        preferencesManager = new PreferencesManager();
        
        // انتظار التهيئة الكاملة
        await userManager.initialize();
        await notificationManager.initialize();
        
        // تطبيق التفضيلات
        preferencesManager.applyAllPreferences();
        
        // إضافة للنافذة العامة
        window.userManager = userManager;
        window.notificationManager = notificationManager;
        window.analyticsManager = analyticsManager;
        window.orderManager = orderManager;
        window.preferencesManager = preferencesManager;
        
        // إضافة دوال مساعدة
        setupAdvancedHelpers();
        
        console.log('✅ تم تهيئة النظام المتقدم بنجاح!');
        
        return {
            success: true,
            userManager,
            notificationManager,
            analyticsManager,
            orderManager,
            preferencesManager
        };
        
    } catch (error) {
        console.error('❌ خطأ في تهيئة النظام المتقدم:', error);
        return { success: false, error: error.message };
    }
}

// ===== 8. دوال مساعدة للاستخدام العام =====
function setupAdvancedHelpers() {
    // دوال إدارة المستخدمين
    window.showUserRegistration = () => userManager.showRegistrationForm();
    window.openUserProfile = () => showUserProfile();
    window.closeUserProfile = () => closeUserProfile();
    
    // دوال الإشعارات
    window.enableNotifications = () => notificationManager.requestPermission();
    window.sendCustomNotification = (title, body) => notificationManager.showNotification(title, { body });
    
    // دوال الطلبات
    window.createOrderFromCart = async (cartItems) => {
        if (!userManager.currentUser) {
            userManager.showRegistrationForm();
            return;
        }
        
        const result = await orderManager.createOrder(cartItems);
        if (result.success) {
            orderManager.sendOrderViaWhatsApp(result.orderData);
        }
        return result;
    };
    
    // دوال التتبع
    window.trackCustomEvent = (eventType, data) => analyticsManager.trackEvent(eventType, data);
    
    console.log('🔧 تم إعداد المساعدات المتقدمة');
}

function showUserProfile() {
    if (!userManager.currentUser) {
        userManager.showRegistrationForm();
        return;
    }
    
    const modal = createUserProfileModal();
    document.body.appendChild(modal);
    modal.classList.add('show');
}

function createUserProfileModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'advanced-user-profile';
    
    const user = userManager.currentUser;
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>👤 الملف الشخصي</h2>
                <button onclick="closeUserProfile()" style="position: absolute; top: 15px; left: 15px; background: none; border: none; font-size: 1.5rem; cursor: pointer;">×</button>
            </div>
            
            <div class="profile-sections">
                <div class="profile-section">
                    <h3>📋 المعلومات الأساسية</h3>
                    <p><strong>الاسم:</strong> ${user.name}</p>
                    <p><strong>الهاتف:</strong> ${user.phone}</p>
                    <p><strong>المحافظة:</strong> ${user.governorate}</p>
                    <p><strong>العنوان:</strong> ${user.address}</p>
                    <p><strong>الجنس:</strong> ${user.gender || 'غير محدد'}</p>
                </div>
                
                <div class="profile-section">
                    <h3>🎯 الاهتمامات</h3>
                    <div class="interests-display">
                        ${user.interests && user.interests.length > 0 
                            ? user.interests.map(interest => `<span class="interest-badge">${interest}</span>`).join('')
                            : '<p>لا توجد اهتمامات محددة</p>'
                        }
                    </div>
                </div>
                
                <div class="profile-section">
                    <h3>🔔 الإشعارات</h3>
                    <p>حالة الإشعارات: ${user.notificationsEnabled ? '✅ مفعلة' : '❌ غير مفعلة'}</p>
                    <p>إذن المتصفح: ${Notification.permission === 'granted' ? '✅ مسموح' : '❌ غير مسموح'}</p>
                </div>
                
                <div class="profile-section">
                    <h3>📊 إحصائيات الحساب</h3>
                    <p><strong>تاريخ التسجيل:</strong> ${new Date(user.registrationDate).toLocaleDateString('ar-IQ')}</p>
                    <p><strong>آخر نشاط:</strong> ${new Date(user.lastActive).toLocaleDateString('ar-IQ')}</p>
                    <p><strong>معرف العميل:</strong> ${user.id}</p>
                    <p><strong>معرف الجهاز:</strong> ${userManager.deviceId}</p>
                </div>
            </div>
            
            <div class="profile-actions">
                <button class="btn btn-primary" onclick="editUserProfile()">📝 تعديل البيانات</button>
                <button class="btn btn-secondary" onclick="closeUserProfile()">إغلاق</button>
            </div>
        </div>
    `;
    
    return modal;
}

function closeUserProfile() {
    const modal = document.getElementById('advanced-user-profile');
    if (modal) {
        modal.remove();
    }
}

function editUserProfile() {
    closeUserProfile();
    userManager.showRegistrationForm();
    
    // ملء النموذج بالبيانات الحالية
    setTimeout(() => {
        const user = userManager.currentUser;
        if (user) {
            document.getElementById('userName').value = user.name;
            document.getElementById('userPhone').value = user.phone;
            document.getElementById('userGovernorate').value = user.governorate;
            document.getElementById('userAddress').value = user.address;
            document.getElementById('userGender').value = user.gender || '';
            
            // الاهتمامات
            if (user.interests) {
                user.interests.forEach(interest => {
                    const checkbox = document.querySelector(`input[value="${interest}"]`);
                    if (checkbox) checkbox.checked = true;
                });
            }
        }
    }, 100);
}

// ===== 9. CSS للنظام المتقدم =====
function addAdvancedStyles() {
    if (document.querySelector('#advanced-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'advanced-styles';
    style.textContent = `
        /* Modal Styles */
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 3000;
            backdrop-filter: blur(5px);
        }
        
        .modal.show {
            display: flex;
        }
        
        .modal-content {
            background: white;
            border-radius: 20px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            animation: modalSlideIn 0.3s ease;
            position: relative;
        }
        
        @keyframes modalSlideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .modal-header {
            text-align: center;
            margin-bottom: 25px;
        }
        
        .modal-header h2 {
            color: #8B5CF6;
            font-size: 1.8rem;
            margin-bottom: 10px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #374151;
        }
        
        .form-control {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #E5E7EB;
            border-radius: 10px;
            font-size: 1rem;
            transition: all 0.3s ease;
        }
        
        .form-control:focus {
            outline: none;
            border-color: #8B5CF6;
            box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
        }
        
        .interests-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 10px;
            margin-top: 10px;
        }
        
        .interest-item {
            display: flex;
            align-items: center;
            font-weight: normal;
            cursor: pointer;
            padding: 5px;
            border-radius: 5px;
            transition: background 0.2s;
        }
        
        .interest-item:hover {
            background: #f3f4f6;
        }
        
        .interest-item input {
            margin-left: 8px;
        }
        
        .notification-permission {
            background: linear-gradient(135deg, #10B981 0%, #059669 100%);
            color: white;
            padding: 20px;
            border-radius: 15px;
            margin: 20px 0;
            text-align: center;
        }
        
        .notification-buttons {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin-top: 15px;
        }
        
        .btn-notification-yes {
            background: white;
            color: #10B981;
            border: none;
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .btn-notification-no {
            background: transparent;
            color: white;
            border: 2px solid white;
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .btn {
            background: linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%);
            color: white;
            border: none;
            padding: 15px 25px;
            border-radius: 10px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
            margin-top: 10px;
        }
        
        .btn:hover {
            background: linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
        }
        
        .btn-secondary {
            background: #6B7280;
        }
        
        .btn-secondary:hover {
            background: #4B5563;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%);
        }
        
        .profile-sections {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .profile-section {
            padding: 15px;
            background: #f9fafb;
            border-radius: 10px;
            border: 1px solid #e5e7eb;
        }
        
        .profile-section h3 {
            color: #8B5CF6;
            margin-bottom: 10px;
        }
        
        .interests-display {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .interest-badge {
            background: #8B5CF6;
            color: white;
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 0.9rem;
        }
        
        .profile-actions {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-top: 20px;
        }
        
        @media (max-width: 768px) {
            .modal-content {
                width: 95%;
                padding: 20px;
            }
            
            .interests-grid {
                grid-template-columns: 1fr;
            }
            
            .notification-buttons {
                flex-direction: column;
            }
            
            .profile-actions {
                grid-template-columns: 1fr;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// ===== 10. تهيئة تلقائية عند تحميل الصفحة =====
document.addEventListener('DOMContentLoaded', function() {
    // إضافة التنسيقات
    addAdvancedStyles();
    
    // تهيئة النظام المتقدم بعد تأخير قصير للسماح للنظام الأساسي بالتحميل
    setTimeout(async () => {
        const result = await initializeAdvancedFeatures();
        
        if (result.success) {
            console.log('🎉 النظام المتقدم جاهز للاستخدام!');
            
            // تتبع بدء الجلسة
            analyticsManager.trackEvent('session_started', {
                userType: userManager.currentUser ? 'registered' : 'anonymous',
                deviceType: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
            });
            
        } else {
            console.error('❌ فشل في تهيئة النظام المتقدم:', result.error);
        }
    }, 1000);
});

// ===== تسجيل النهاية =====
console.log('📦 تم تحميل النظام المتقدم بنجاح - Advanced Features Ready!');

// Export للاستخدام كـ Module (اختياري)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        UserManager,
        NotificationManager,
        AnalyticsManager,
        OrderManager,
        PreferencesManager,
        ADVANCED_CONFIG,
        initializeAdvancedFeatures
    };
}