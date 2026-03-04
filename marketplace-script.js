// Dữ liệu 10 sản phẩm AI
const products = [
    {
        id: 'chatgpt-plus-business',
        name: 'ChatGPT Plus Business',
        icon: '🤖',
        tag: 'HOT',
        priceOriginal: 655000,
        priceCurrent: 129000,
        sold: '2.8k+'
    },
    {
        id: 'chatgpt-go',
        name: 'ChatGPT GO',
        icon: '⚡',
        tag: 'NEW',
        priceOriginal: 1584000,
        priceCurrent: 700000,
        sold: '1.6k+'
    },
    {
        id: 'chatgpt-plus-personal',
        name: 'ChatGPT Plus Cá Nhân',
        icon: '💬',
        tag: 'SALE',
        priceOriginal: 550000,
        priceCurrent: 220000,
        sold: '4.1k+'
    },
    {
        id: 'google-ai-pro',
        name: 'Google AI Pro (Gemini + Veo)',
        icon: '🔵',
        tag: 'HOT',
        priceOriginal: 499000,
        priceCurrent: 90000,
        sold: '3.3k+'
    },
    {
        id: 'canva-edu',
        name: 'Canva EDU',
        icon: '🎨',
        tag: 'EDU',
        priceOriginal: 1300000,
        priceCurrent: 200000,
        sold: '2.1k+'
    },
    {
        id: 'canva-pro',
        name: 'Canva Pro',
        icon: '🖌️',
        tag: 'PRO',
        priceOriginal: 1300000,
        priceCurrent: 400000,
        sold: '5.7k+'
    },
    {
        id: 'gemini-ultra',
        name: 'Gemini Ultra 45.000 Credit',
        icon: '💎',
        tag: 'VIP',
        priceOriginal: 6000000,
        priceCurrent: 150000,
        sold: '1.2k+'
    },
    {
        id: 'copilot-pro',
        name: 'Copilot Pro',
        icon: '🧑‍💻',
        tag: 'DEV',
        priceOriginal: 230000,
        priceCurrent: 100000,
        sold: '1.9k+'
    },
    {
        id: 'youtube-premium',
        name: 'YouTube Premium',
        icon: '▶️',
        tag: 'BEST',
        priceOriginal: 105000,
        priceCurrent: 60000,
        sold: '6.4k+'
    },
    {
        id: 'cursor-pro',
        name: 'Cursor Pro',
        icon: '⚡',
        tag: 'CODE',
        priceOriginal: 520000,
        priceCurrent: 300000,
        sold: '860+'
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
                <span>${product.icon}</span>
                <span class="product-tag">${product.tag}</span>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-pricing">
                    <span class="price-original">${formatPrice(product.priceOriginal)}</span>
                    <span class="price-current">${formatPrice(product.priceCurrent)}</span>
                </div>
                <div class="product-sales">
                    <span class="sales-icon">🔥</span>
                    <span>${product.sold} đã mua</span>
                </div>
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
