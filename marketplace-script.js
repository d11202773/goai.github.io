// Dữ liệu 9 sản phẩm AI
const products = [
    {
        id: 'chatgpt-plus-personal',
        name: 'ChatGPT Plus Cá Nhân',
        icon: '💬',
        image: 'images/CHATGPT PLUS CÁ NHÂN.JPG',
        tag: 'SALE',
        priceOriginal: 550000,
        priceCurrent: 220000,
        period: 'tháng',
        sold: '4.1k+'
    },
    {
        id: 'youtube-premium',
        name: 'YouTube Premium',
        icon: '▶️',
        image: 'images/YOUTOBE PREMIUM.jpg',
        tag: 'BEST',
        priceOriginal: 105000,
        priceCurrent: 60000,
        period: 'tháng',
        sold: '6.4k+'
    },
    {
        id: 'canva-pro',
        name: 'Canva Pro',
        icon: '🖌️',
        image: 'images/CANVA.JPG',
        tag: 'PRO',
        priceOriginal: 1300000,
        priceCurrent: 250000,
        period: 'năm',
        sold: '5.7k+'
    },
    {
        id: 'chatgpt-plus-business',
        name: 'ChatGPT Plus Business',
        icon: '🤖',
        image: 'images/CHATGPT PLUS BUSINESS.PNG',
        tag: 'HOT',
        priceOriginal: 655000,
        priceCurrent: 129000,
        period: 'tháng',
        sold: '2.8k+'
    },
    {
        id: 'chatgpt-go',
        name: 'ChatGPT GO',
        icon: '⚡',
        image: 'images/CHATGPT GO.jpg',
        tag: 'NEW',
        priceOriginal: 1584000,
        priceCurrent: 700000,
        period: 'năm',
        sold: '1.6k+'
    },
    {
        id: 'google-ai-pro',
        name: 'Google AI Pro (Gemini + Veo)',
        icon: '🔵',
        image: 'images/Google AI PRO.jpg',
        tag: 'HOT',
        priceOriginal: 499000,
        priceCurrent: 499000,
        period: 'năm',
        sold: '3.3k+'
    },
    {
        id: 'gemini-ultra',
        name: 'Gemini Ultra 45.000 Credit',
        icon: '💎',
        image: 'images/ULTRA.jpg',
        tag: 'VIP',
        priceOriginal: 6000000,
        priceCurrent: 450000,
        period: 'tháng',
        sold: '1.2k+'
    },
    {
        id: 'capcut-pro',
        name: 'CAPCUT PRO',
        icon: '🎬',
        image: 'images/CAPCUT.jpg',
        tag: 'HOT',
        priceOriginal: 650000,
        priceCurrent: 70000,
        period: 'tháng',
        sold: '3.2k+'
    },
    {
        id: 'github-pro',
        name: 'GITHUB PRO',
        icon: '💻',
        image: 'images/GITHUB.jpg',
        tag: 'DEV',
        priceOriginal: 800000,
        priceCurrent: 800000,
        period: 'năm',
        sold: '740+'
    }
];

// Format giá VND
function formatPrice(price) {
    return price.toLocaleString('vi-VN') + 'đ';
}

// Render sản phẩm
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    grid.innerHTML = products.map(product => `
        <div class="product-card" onclick="goToProduct('${product.id}')">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <span class="product-icon-fallback" style="display:none;">${product.icon}</span>
                <span class="product-tag">${product.tag}</span>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-pricing">
                    <span class="price-original">${formatPrice(product.priceOriginal)}</span>
                    <span class="price-current">${formatPrice(product.priceCurrent)}/${product.period}</span>
                </div>
                <div class="product-sales">
                    <span class="sales-icon">🔥</span>
                    <span>${product.sold} đã mua</span>
                </div>
                <a class="buy-now" href="marketplace-product.html?id=${product.id}" onclick="event.stopPropagation();">
                    <span>⚡</span>
                    <span>MUA NGAY</span>
                </a>
            </div>
        </div>
    `).join('');
}

// Chuyển đến trang chi tiết
function goToProduct(productId) {
    window.location.href = `marketplace-product.html?id=${productId}`;
}

// Animation kim cương
function createDiamondParticles() {
    const container = document.getElementById('diamondParticles');
    if (!container) return;
    
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'diamond-particle';
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        const size = 2 + Math.random() * 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        container.appendChild(particle);
    }
}

// Khởi tạo
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    createDiamondParticles();
});
