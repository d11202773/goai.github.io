// Dữ liệu 9 sản phẩm AI
const products = [
    {
        id: 'chatgpt-plus-personal',
        name: 'CHATGPT PLUS',
        icon: '💬',
        image: 'images/CHATGPT PLUS CÁ NHÂN.JPG',
        tag: 'SALE',
        priceOriginal: 550000,
        priceCurrent: 220000,
        sold: '4.1k+'
    },
    {
        id: 'youtube-premium',
        name: 'YouTube Premium',
        icon: '▶️',
        image: 'images/YOUTOBE PREMIUM.jpg',
        tag: 'BEST',
        priceOriginal: 105000,
        priceCurrent: 70000,
        sold: '6.4k+'
    },
    {
        id: 'capcut-pro',
        name: 'CAPCUT PRO',
        icon: '🎬',
        image: 'images/CAPCUT.jpg',
        tag: 'HOT',
        priceOriginal: 650000,
        priceCurrent: 70000,
        sold: '3.2k+'
    },
    {
        id: 'chatgpt-plus-business',
        name: 'CHATGPT BUSINESS',
        icon: '🤖',
        image: 'images/CHATGPT PLUS BUSINESS.PNG',
        tag: 'HOT',
        priceOriginal: 655000,
        priceCurrent: 129000,
        sold: '2.8k+'
    },
    {
        id: 'chatgpt-go',
        name: 'ChatGPT GO',
        icon: '⚡',
        image: 'images/CHATGPT GO.jpg',
        tag: 'NEW',
        priceOriginal: 1584000,
        priceCurrent: 80000,
        sold: '1.6k+'
    },
    {
        id: 'google-ai-pro',
        name: 'GEMINI PRO+ NOTEBOOK LM+ 2TB',
        icon: '🔵',
        image: 'images/Google AI PRO.jpg',
        tag: 'HOT',
        priceOriginal: 499000,
        priceCurrent: 80000,
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
        sold: '1.2k+'
    },
    {
        id: 'canva-pro',
        name: 'Canva Pro',
        icon: '🖌️',
        image: 'images/CANVA.JPG',
        tag: 'PRO',
        priceOriginal: 1300000,
        priceCurrent: 50000,
        sold: '5.7k+'
    },
    {
        id: 'github-pro',
        name: 'GITHUB PRO',
        icon: '💻',
        image: 'images/GITHUB.jpg',
        tag: 'DEV',
        priceOriginal: 800000,
        priceCurrent: 120000,
        sold: '740+'
    },
    {
        id: 'supper-grok',
        name: 'SUPPER GROK',
        icon: '🚀',
        image: 'images/SUPPER GROK.png',
        tag: 'NEW',
        priceOriginal: 790000,
        priceCurrent: 350000,
        sold: '1.3k+'
    },
    {
        id: 'zoom-pro',
        name: 'ZOOM PRO',
        icon: '📹',
        image: 'images/ZOOM PRO.png',
        tag: 'HOT',
        priceOriginal: 199000,
        priceCurrent: 89000,
        sold: '2.1k+'
    },
    {
        id: 'kling-ai',
        name: 'KLING AI 1100 CREDIT',
        icon: '🎨',
        image: 'images/KLING AI 1100 CREDIT.png',
        tag: 'PRO',
        priceOriginal: 450000,
        priceCurrent: 220000,
        sold: '980+'
    },
    {
        id: 'office-365',
        name: 'OFFICE 365 + 1TB ONE DRIVE (1 NĂM)',
        icon: '📊',
        image: 'images/OFFICE 365 + 1TB ONE DRIVE (1 NĂM).png',
        tag: 'BEST',
        priceOriginal: 1200000,
        priceCurrent: 400000,
        sold: '1.6k+'
    },
    {
        id: 'perplexity-pro',
        name: 'PERPLEXITY PRO (1 NĂM)',
        icon: '🔍',
        image: 'images/PERPLEXITY PRO (1 NĂM).png',
        tag: 'VIP',
        priceOriginal: 1500000,
        priceCurrent: 800000,
        sold: '760+'
    },
    {
        id: 'claude-ai-pro',
        name: 'CLAUDE AI PRO',
        icon: '🧠',
        image: 'images/CLAUDE AI PRO.png',
        tag: 'HOT',
        priceOriginal: 690000,
        priceCurrent: 390000,
        sold: '1.4k+'
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
                <div class="price-box">
                    <span class="new-price">${formatPrice(product.priceCurrent)}</span>
                    <span class="old-price">${formatPrice(product.priceOriginal)}</span>
                </div>
                <div class="product-sales">
                    <span class="sales-icon">🔥</span>
                    <span>${product.sold} đã mua</span>
                </div>
                <a class="buy-now" href="${
                    product.id === 'youtube-premium' ? 'product-youtube.html' :
                    product.id === 'chatgpt-plus-personal' ? 'product-chatgpt-plus.html' :
                    product.id === 'capcut-pro' ? 'product-capcut-pro.html' :
                    product.id === 'chatgpt-plus-business' ? 'product-chatgpt-business.html' :
                    product.id === 'chatgpt-go' ? 'product-chatgpt-go.html' :
                    product.id === 'gemini-ultra' ? 'product-gemini-ultra.html' :
                    product.id === 'canva-pro' ? 'product-canva-pro.html' :
                    product.id === 'github-pro' ? 'product-github-pro.html' :
                    product.id === 'google-ai-pro' ? 'product-google-ai-pro.html' :
                    product.id === 'supper-grok' ? 'product-supper-grok.html' :
                    product.id === 'zoom-pro' ? 'product-zoom-pro.html' :
                    product.id === 'kling-ai' ? 'product-kling-ai.html' :
                    product.id === 'office-365' ? 'product-office-365.html' :
                    product.id === 'perplexity-pro' ? 'product-perplexity-pro.html' :
                    product.id === 'claude-ai-pro' ? 'product-claude-ai-pro.html' :
                    'marketplace-product.html?id=' + product.id
                }" onclick="event.stopPropagation();">
                    <span>⚡</span>
                    <span>MUA NGAY</span>
                </a>
            </div>
        </div>
    `).join('');
}

// Chuyển đến trang chi tiết
function goToProduct(productId) {
    if (productId === 'youtube-premium') {
        window.location.href = 'product-youtube.html';
    } else if (productId === 'chatgpt-plus-personal') {
        window.location.href = 'product-chatgpt-plus.html';
    } else if (productId === 'capcut-pro') {
        window.location.href = 'product-capcut-pro.html';
    } else if (productId === 'chatgpt-plus-business') {
        window.location.href = 'product-chatgpt-business.html';
    } else if (productId === 'chatgpt-go') {
        window.location.href = 'product-chatgpt-go.html';
    } else if (productId === 'gemini-ultra') {
        window.location.href = 'product-gemini-ultra.html';
    } else if (productId === 'canva-pro') {
        window.location.href = 'product-canva-pro.html';
    } else if (productId === 'github-pro') {
        window.location.href = 'product-github-pro.html';
    } else if (productId === 'google-ai-pro') {
        window.location.href = 'product-google-ai-pro.html';
    } else if (productId === 'supper-grok') {
        window.location.href = 'product-supper-grok.html';
    } else if (productId === 'zoom-pro') {
        window.location.href = 'product-zoom-pro.html';
    } else if (productId === 'kling-ai') {
        window.location.href = 'product-kling-ai.html';
    } else if (productId === 'office-365') {
        window.location.href = 'product-office-365.html';
    } else if (productId === 'perplexity-pro') {
        window.location.href = 'product-perplexity-pro.html';
    } else if (productId === 'claude-ai-pro') {
        window.location.href = 'product-claude-ai-pro.html';
    } else {
        window.location.href = `marketplace-product.html?id=${productId}`;
    }
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
