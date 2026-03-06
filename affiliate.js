(function () {
    const AFFILIATE_USERS_KEY = 'affiliateUsers';
    const OWNER_MAP_KEY = 'affiliateOwnerMap';

    const registerBtn = document.getElementById('btnShowRegister');
    const formCard = document.getElementById('affiliateFormCard');
    const form = document.getElementById('affiliateForm');
    const formError = document.getElementById('formError');
    const resultCard = document.getElementById('resultCard');
    const resultCode = document.getElementById('resultCode');
    const resultLink = document.getElementById('resultLink');

    function showError(message) {
        formError.textContent = message;
        formError.classList.add('show');
    }

    function clearError() {
        formError.classList.remove('show');
        formError.textContent = '';
    }

    function normalizePhone(phone) {
        return phone.replace(/\s+/g, '').trim();
    }

    function generateAffiliateCode() {
        const randomNum = Math.floor(Math.random() * 1000000);
        const sixDigits = String(randomNum).padStart(6, '0');
        return `GIAMGIA${sixDigits}`;
    }

    function getAffiliateUsers() {
        try {
            const value = localStorage.getItem(AFFILIATE_USERS_KEY);
            return value ? JSON.parse(value) : [];
        } catch (e) {
            return [];
        }
    }

    function saveAffiliateUsers(users) {
        localStorage.setItem(AFFILIATE_USERS_KEY, JSON.stringify(users));
    }

    function getOwnerMap() {
        try {
            const value = localStorage.getItem(OWNER_MAP_KEY);
            return value ? JSON.parse(value) : {};
        } catch (e) {
            return {};
        }
    }

    function saveOwnerMap(map) {
        localStorage.setItem(OWNER_MAP_KEY, JSON.stringify(map));
    }

    function buildAffiliateLink(code) {
        return `https://goai.edu.vn/affiliate?code=${encodeURIComponent(code)}`;
    }

    function ensureUniqueCode(users) {
        let code = generateAffiliateCode();
        const existing = new Set(users.map(user => user.affiliateCode));
        while (existing.has(code)) {
            code = generateAffiliateCode();
        }
        return code;
    }

    async function handleRegister(event) {
        event.preventDefault();
        clearError();

        const fullname = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = normalizePhone(document.getElementById('phone').value);
        const bankAccount = document.getElementById('bankAccount').value.trim();

        if (!fullname || !email || !phone || !bankAccount) {
            showError('Vui lòng điền đầy đủ thông tin đăng ký affiliate.');
            return;
        }

        if (!email.includes('@')) {
            showError('Email không hợp lệ.');
            return;
        }

        if (phone.length < 10) {
            showError('Số điện thoại không hợp lệ.');
            return;
        }

        const users = getAffiliateUsers();
        const existed = users.find(user => user.email.toLowerCase() === email.toLowerCase() || user.phone === phone);

        let affiliateCode;
        if (existed) {
            affiliateCode = existed.affiliateCode;
        } else {
            affiliateCode = ensureUniqueCode(users);
            users.push({
                fullname,
                email,
                phone,
                bankAccount,
                affiliateCode,
                createdAt: new Date().toISOString()
            });
            saveAffiliateUsers(users);
        }

        const ownerMap = getOwnerMap();
        ownerMap[affiliateCode] = fullname;
        saveOwnerMap(ownerMap);

        const affiliateLink = buildAffiliateLink(affiliateCode);

        resultCode.textContent = affiliateCode;
        resultLink.textContent = affiliateLink;
        resultLink.setAttribute('href', affiliateLink);
        resultCard.classList.add('show');

        localStorage.setItem('affiliatePromoCode', affiliateCode);

        try {
            if (typeof registerAffiliateAndNotify === 'function') {
                await registerAffiliateAndNotify({
                    fullname,
                    email,
                    phone,
                    bankAccount,
                    affiliateCode,
                    affiliateLink
                });
            }
        } catch (error) {
            console.error('Affiliate notify error:', error);
        }

        form.reset();
    }

    function autoCaptureAffiliateCodeFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const code = (params.get('code') || '').trim().toUpperCase();
        if (/^GIAMGIA\d{6}$/.test(code)) {
            localStorage.setItem('affiliatePromoCode', code);
        }
    }

    registerBtn.addEventListener('click', function () {
        formCard.classList.add('show');
        formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    form.addEventListener('submit', handleRegister);
    autoCaptureAffiliateCodeFromUrl();
})();
