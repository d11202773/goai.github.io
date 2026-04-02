// Navbar JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    const dropdownItems = document.querySelectorAll('.has-dropdown');

    const relatedStyle = document.createElement('style');
    relatedStyle.textContent = `
        .related-products-sidebar {
            min-width: 0;
            align-self: stretch;
            position: relative;
            border-radius: 20px;
            border: 1px solid rgba(246, 196, 83, 0.18);
            background: linear-gradient(180deg, rgba(18, 19, 26, 0.98) 0%, rgba(12, 12, 18, 0.98) 100%);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
            overflow: hidden;
        }

        .related-products-sidebar__inner {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            height: 100%;
            padding: 1.25rem;
        }

        .related-products-sidebar__eyebrow {
            color: #F6C453;
            font-size: 0.82rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            margin-bottom: 0.25rem;
        }

        .related-products-sidebar__title {
            color: #ffffff;
            font-size: 1.2rem;
            font-weight: 800;
            line-height: 1.2;
        }

        .related-products-sidebar__subtitle {
            color: #a7a7b3;
            font-size: 0.92rem;
        }

        .related-products-sidebar__track {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            overflow: hidden;
            will-change: transform;
            animation: related-products-scroll 34s linear infinite;
        }

        .related-products-sidebar:hover .related-products-sidebar__track {
            animation-play-state: paused;
        }

        .related-products-sidebar__copy {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .related-product-card {
            display: grid;
            grid-template-columns: 68px 1fr;
            gap: 0.85rem;
            align-items: center;
            padding: 0.85rem;
            border-radius: 16px;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(246, 196, 83, 0.12);
            min-height: 118px;
        }

        .related-product-card__image-wrap {
            position: relative;
            width: 68px;
            height: 68px;
            border-radius: 16px;
            overflow: hidden;
            background: #0f1015;
            border: 1px solid rgba(246, 196, 83, 0.18);
            flex-shrink: 0;
        }

        .related-product-card__image-wrap img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .related-product-card__badge {
            position: absolute;
            top: 8px;
            right: 8px;
            padding: 0.18rem 0.42rem;
            border-radius: 999px;
            background: linear-gradient(135deg, #F6C453 0%, #FFD77A 100%);
            color: #0B0B0F;
            font-size: 0.62rem;
            font-weight: 900;
            letter-spacing: 0.04em;
        }

        .related-product-card__name {
            color: #ffffff;
            font-size: 0.95rem;
            font-weight: 700;
            line-height: 1.35;
            margin-bottom: 0.35rem;
        }

        .related-product-card__prices {
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
            align-items: baseline;
            margin-bottom: 0.65rem;
        }

        .related-product-card__new-price {
            color: #F6C453;
            font-size: 1rem;
            font-weight: 800;
        }

        .related-product-card__old-price {
            color: #90909c;
            font-size: 0.82rem;
            text-decoration: line-through;
        }

        .related-product-card__cta {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: 0.7rem 0.85rem;
            border-radius: 12px;
            background: linear-gradient(135deg, #F6C453 0%, #FFD77A 100%);
            color: #0B0B0F;
            text-decoration: none;
            font-size: 0.92rem;
            font-weight: 800;
            transition: transform 0.2s ease, filter 0.2s ease;
        }

        .related-product-card__cta:hover {
            transform: translateY(-1px);
            filter: brightness(1.05);
        }

        .has-related-sidebar.product-layout {
            grid-template-columns: minmax(280px, 1fr) minmax(0, 1.25fr) minmax(320px, 0.9fr);
            align-items: start;
        }

        .has-related-sidebar.checkout-layout {
            grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.95fr) minmax(320px, 0.9fr);
            align-items: start;
        }

        .has-related-sidebar .related-products-sidebar {
            position: sticky;
            top: 104px;
        }

        @keyframes related-products-scroll {
            from {
                transform: translateY(0);
            }
            to {
                transform: translateY(-50%);
            }
        }

        @media (max-width: 768px) {
            .has-related-sidebar.product-layout,
            .has-related-sidebar.checkout-layout {
                grid-template-columns: 1fr;
            }

            .has-related-sidebar .related-products-sidebar {
                position: relative;
                top: auto;
            }

            .related-products-sidebar__track {
                flex-direction: row;
                overflow-x: auto;
                overflow-y: hidden;
                animation: none;
                scroll-snap-type: x proximity;
                padding-bottom: 0.35rem;
            }

            .related-products-sidebar__track::-webkit-scrollbar {
                height: 6px;
            }

            .related-products-sidebar__track::-webkit-scrollbar-thumb {
                background: rgba(246, 196, 83, 0.35);
                border-radius: 999px;
            }

            .related-products-sidebar__copy {
                flex-direction: row;
                gap: 0.75rem;
            }

            .related-products-sidebar__copy + .related-products-sidebar__copy {
                display: none;
            }

            .related-product-card {
                min-width: 235px;
                max-width: 235px;
                scroll-snap-align: start;
            }
        }
    `;
    document.head.appendChild(relatedStyle);

    const relatedCatalog = {
        'chatgpt-plus-personal': {
            name: 'ChatGPT Plus',
            image: 'images/CHATGPT PLUS CÁ NHÂN.JPG',
            currentPrice: 220000,
            oldPrice: 550000,
            badge: 'HOT',
            checkoutPlan: '1 tháng'
        },
        'chatgpt-plus-business': {
            name: 'ChatGPT Business',
            image: 'images/CHATGPT PLUS BUSINESS.PNG',
            currentPrice: 129000,
            oldPrice: 655000,
            badge: 'HOT',
            checkoutPlan: '1 tháng'
        },
        'chatgpt-go': {
            name: 'ChatGPT GO',
            image: 'images/CHATGPT_GO.jpg',
            currentPrice: 80000,
            oldPrice: 1584000,
            badge: 'HOT',
            checkoutPlan: '1 tháng'
        },
        'google-ai-pro': {
            name: 'Google AI Pro 2TB',
            image: 'images/Google AI PRO.jpg',
            currentPrice: 80000,
            oldPrice: 499000,
            badge: 'HOT',
            checkoutPlan: '1 tháng'
        },
        'gemini-ultra': {
            name: 'Gemini Ultra 25.000 Credit',
            image: 'images/ULTRA-20260402.jpg',
            currentPrice: 250000,
            oldPrice: 6000000,
            badge: 'HOT',
            checkoutPlan: '1 tháng'
        },
        'canva-pro': {
            name: 'Canva Pro',
            image: 'images/CANVA.JPG',
            currentPrice: 50000,
            oldPrice: 1300000,
            badge: 'HOT',
            checkoutPlan: '1 tháng'
        },
        'capcut-pro': {
            name: 'CapCut Pro',
            image: 'images/CAPCUT.PNG',
            currentPrice: 70000,
            oldPrice: 650000,
            badge: 'HOT',
            checkoutPlan: '1 tháng'
        },
        'github-pro': {
            name: 'GitHub Pro',
            image: 'images/GITHUB.PNG',
            currentPrice: 120000,
            oldPrice: 800000,
            badge: 'HOT',
            checkoutPlan: '1 tháng'
        },
        'youtube-premium': {
            name: 'YouTube Premium',
            image: 'images/YOUTOBE.PNG',
            currentPrice: 60000,
            oldPrice: 105000,
            badge: 'HOT',
            checkoutPlan: '1 tháng'
        },
        'claude-ai-pro': {
            name: 'Claude AI Pro',
            image: 'images/CLAUDE AI PRO.png',
            currentPrice: 450000,
            oldPrice: 690000,
            badge: 'HOT',
            checkoutPlan: '1 tháng'
        },
        'perplexity-pro': {
            name: 'Perplexity Pro',
            image: 'images/PERPLEXITY PRO (1 NĂM).png',
            currentPrice: 800000,
            oldPrice: 1500000,
            badge: 'HOT',
            checkoutPlan: '1 năm'
        },
        'kling-ai': {
            name: 'Kling AI 1100 Credit',
            image: 'images/KLING AI 1100 CREDIT.png',
            currentPrice: 220000,
            oldPrice: 450000,
            badge: 'HOT',
            checkoutPlan: '1 tháng'
        },
        'zoom-pro': {
            name: 'Zoom Pro',
            image: 'images/ZOOM PRO.png',
            currentPrice: 89000,
            oldPrice: 199000,
            badge: 'HOT',
            checkoutPlan: '1 tháng'
        },
        'office-365': {
            name: 'Office 365 + 1TB OneDrive',
            image: 'images/OFFICE 365 + 1TB ONE DRIVE (1 NĂM).png',
            currentPrice: 400000,
            oldPrice: 1200000,
            badge: 'HOT',
            checkoutPlan: '1 năm'
        },
        'supper-grok': {
            name: 'Supper Grok',
            image: 'images/SUPPER-GROK.png',
            currentPrice: 350000,
            oldPrice: 790000,
            badge: 'HOT',
            checkoutPlan: '1 tháng'
        }
    };

    const relatedMap = {
        'chatgpt-plus-personal': ['canva-pro', 'capcut-pro', 'claude-ai-pro', 'google-ai-pro'],
        'chatgpt-plus-business': ['google-ai-pro', 'claude-ai-pro', 'github-pro', 'chatgpt-go'],
        'chatgpt-go': ['chatgpt-plus-personal', 'claude-ai-pro', 'google-ai-pro', 'github-pro'],
        'google-ai-pro': ['gemini-ultra', 'chatgpt-plus-personal', 'claude-ai-pro', 'perplexity-pro'],
        'gemini-ultra': ['chatgpt-plus-personal', 'google-ai-pro', 'claude-ai-pro', 'perplexity-pro'],
        'canva-pro': ['capcut-pro', 'chatgpt-plus-personal', 'youtube-premium', 'google-ai-pro'],
        'capcut-pro': ['youtube-premium', 'canva-pro', 'chatgpt-go', 'claude-ai-pro'],
        'github-pro': ['chatgpt-go', 'gemini-ultra', 'google-ai-pro', 'claude-ai-pro'],
        'youtube-premium': ['capcut-pro', 'github-pro', 'canva-pro', 'chatgpt-go'],
        'claude-ai-pro': ['chatgpt-plus-personal', 'chatgpt-go', 'google-ai-pro', 'perplexity-pro'],
        'perplexity-pro': ['chatgpt-plus-personal', 'google-ai-pro', 'claude-ai-pro', 'gemini-ultra'],
        'kling-ai': ['capcut-pro', 'youtube-premium', 'google-ai-pro', 'claude-ai-pro'],
        'zoom-pro': ['chatgpt-plus-business', 'google-ai-pro', 'github-pro', 'canva-pro'],
        'office-365': ['google-ai-pro', 'claude-ai-pro', 'chatgpt-plus-business', 'perplexity-pro'],
        'supper-grok': ['chatgpt-go', 'gemini-ultra', 'claude-ai-pro', 'youtube-premium']
    };

    const pageToProductId = {
        'product-chatgpt-plus.html': 'chatgpt-plus-personal',
        'product-chatgpt-business.html': 'chatgpt-plus-business',
        'product-chatgpt-go.html': 'chatgpt-go',
        'product-google-ai-pro.html': 'google-ai-pro',
        'product-gemini-ultra.html': 'gemini-ultra',
        'product-canva-pro.html': 'canva-pro',
        'product-capcut-pro.html': 'capcut-pro',
        'product-github-pro.html': 'github-pro',
        'product-youtube.html': 'youtube-premium',
        'product-claude-ai-pro.html': 'claude-ai-pro',
        'product-perplexity-pro.html': 'perplexity-pro',
        'product-kling-ai.html': 'kling-ai',
        'product-zoom-pro.html': 'zoom-pro',
        'product-office-365.html': 'office-365',
        'product-supper-grok.html': 'supper-grok'
    };

    const productNameAliases = {
        'chatgpt plus': 'chatgpt-plus-personal',
        'chatgpt plus ca nhan': 'chatgpt-plus-personal',
        'chatgpt business': 'chatgpt-plus-business',
        'chatgpt go': 'chatgpt-go',
        'google ai pro': 'google-ai-pro',
        'google ai pro 2tb': 'google-ai-pro',
        'gemini ultra 25000 credit': 'gemini-ultra',
        'gemini ultra 45000 credit': 'gemini-ultra',
        'gemini ultra 25 000 credit': 'gemini-ultra',
        'gemini ultra 45 000 credit': 'gemini-ultra',
        'canva pro': 'canva-pro',
        'capcut pro': 'capcut-pro',
        'github pro': 'github-pro',
        'youtube premium': 'youtube-premium',
        'claude ai pro': 'claude-ai-pro',
        'perplexity pro': 'perplexity-pro',
        'kling ai 1100 credit': 'kling-ai',
        'zoom pro': 'zoom-pro',
        'office 365 1tb onedrive 1 nam': 'office-365',
        'office 365 1tb onedrive': 'office-365',
        'supper grok': 'supper-grok'
    };

    function normalizeText(value) {
        return String(value || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, ' ')
            .trim();
    }

    function formatVnd(value) {
        return Number(value || 0).toLocaleString('vi-VN') + 'đ';
    }

    function getCurrentProductId() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        if (currentPage === 'checkout.html') {
            const urlParams = new URLSearchParams(window.location.search);
            const productName = normalizeText(urlParams.get('product'));
            return productNameAliases[productName] || null;
        }

        return pageToProductId[currentPage] || null;
    }

    function buildCheckoutUrl(productId) {
        const product = relatedCatalog[productId];
        if (!product) {
            return 'marketplace-product.html?id=' + encodeURIComponent(productId);
        }

        return 'checkout.html?product=' + encodeURIComponent(product.name) +
            '&plan=' + encodeURIComponent(product.checkoutPlan) +
            '&price=' + encodeURIComponent(formatVnd(product.currentPrice));
    }

    function buildRelatedSidebar(currentProductId) {
        const relatedIds = relatedMap[currentProductId] || [];
        const relatedProducts = relatedIds
            .map((productId) => ({ id: productId, ...relatedCatalog[productId] }))
            .filter((product) => product.name);

        if (!relatedProducts.length) {
            return null;
        }

        const cardMarkup = relatedProducts.map((product) => `
            <article class="related-product-card">
                <div class="related-product-card__image-wrap">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <span class="related-product-card__badge">${product.badge || 'HOT'}</span>
                </div>
                <div class="related-product-card__content">
                    <h4 class="related-product-card__name">${product.name}</h4>
                    <div class="related-product-card__prices">
                        <span class="related-product-card__new-price">${formatVnd(product.currentPrice)}</span>
                        <span class="related-product-card__old-price">${formatVnd(product.oldPrice)}</span>
                    </div>
                    <a class="related-product-card__cta" data-related-product-id="${product.id}" href="${buildCheckoutUrl(product.id)}">THÊM VÀO ĐƠN HÀNG</a>
                </div>
            </article>
        `).join('');

        return `
            <aside class="related-products-sidebar" data-related-sidebar>
                <div class="related-products-sidebar__inner">
                    <div>
                        <p class="related-products-sidebar__eyebrow">Gợi ý thêm</p>
                        <h3 class="related-products-sidebar__title">Sản phẩm liên quan</h3>
                        <p class="related-products-sidebar__subtitle">Chọn nhanh các sản phẩm phù hợp để thêm vào đơn hàng.</p>
                    </div>
                    <div class="related-products-sidebar__track" aria-label="Sản phẩm liên quan">
                        <div class="related-products-sidebar__copy">${cardMarkup}</div>
                        <div class="related-products-sidebar__copy" aria-hidden="true">${cardMarkup}</div>
                    </div>
                </div>
            </aside>
        `;
    }

    function injectRelatedSidebar() {
        const currentProductId = getCurrentProductId();
        const sidebarHtml = currentProductId ? buildRelatedSidebar(currentProductId) : null;

        if (!sidebarHtml) {
            return;
        }

        const productLayout = document.querySelector('.product-layout');
        const checkoutLayout = document.querySelector('.checkout-layout');

        if (productLayout && !productLayout.querySelector('[data-related-sidebar]')) {
            productLayout.classList.add('has-related-sidebar');
            productLayout.insertAdjacentHTML('beforeend', sidebarHtml);
        }

        if (checkoutLayout && !checkoutLayout.querySelector('[data-related-sidebar]')) {
            checkoutLayout.classList.add('has-related-sidebar');
            checkoutLayout.insertAdjacentHTML('beforeend', sidebarHtml);
        }
    }

    function bindRelatedCtaActions() {
        document.addEventListener('click', function(event) {
            const cta = event.target.closest('.related-product-card__cta');
            if (!cta) {
                return;
            }

            const productId = cta.dataset.relatedProductId;
            if (!productId) {
                return;
            }

            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const orderApi = window.GoAIOrderAPI;
            if (currentPage !== 'checkout.html' || !orderApi || typeof orderApi.addRelatedProduct !== 'function') {
                return;
            }

            event.preventDefault();
            const product = relatedCatalog[productId];
            if (!product) {
                return;
            }

            const addResult = orderApi.addRelatedProduct(productId, product);
            if (!addResult) {
                return;
            }

            const originalText = cta.textContent;
            cta.textContent = 'Đã thêm vào đơn hàng';
            cta.style.filter = 'brightness(1.08)';

            window.setTimeout(function() {
                cta.textContent = originalText;
                cta.style.filter = '';
            }, 1200);
        });
    }

    // Mobile menu toggle
    if (navbarToggle) {
        navbarToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });
    }

    // Mobile dropdown toggle
    dropdownItems.forEach(item => {
        const link = item.querySelector('.navbar-link');
        
        link.addEventListener('click', function(e) {
            // On mobile, prevent default and toggle dropdown
            if (window.innerWidth <= 768) {
                e.preventDefault();
                item.classList.toggle('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) {
            const isClickInsideNav = navbar.contains(event.target);
            
            if (!isClickInsideNav && navbarMenu.classList.contains('active')) {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
            }
        }
    });

    // Sticky navbar with scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add scrolled class when scrolling down
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
            
            // Remove active class from dropdown items
            dropdownItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    // Close mobile menu if open
                    if (navbarMenu.classList.contains('active')) {
                        navbarToggle.classList.remove('active');
                        navbarMenu.classList.remove('active');
                    }
                    
                    // Smooth scroll to target
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    injectRelatedSidebar();
    bindRelatedCtaActions();
});
