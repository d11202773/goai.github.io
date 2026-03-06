/**
 * Order API for GO AI Website
 * Sends order data to Google Apps Script
 */

const API_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxvXGAtB3GtrExGBJqyYqS3tMYmmc-7mygdXfM3ViOZ40kKda2adAXN4C1hDgO09Xp-/exec';

/**
 * Confirm paid order and notify via Telegram
 * Sends PAID_CONFIRM action to Google Apps Script
 * @param {object} order - Order details
 * @returns {Promise<object>} Response data
 */
async function confirmPaidAndNotify(order) {
    try {
        const paidTelegramMessage =
            `💰 ĐƠN HÀNG MỚI\n\n` +
            `Mã đơn: ${order.orderCode || '-'}\n` +
            `Sản phẩm: ${order.product || '-'}\n` +
            `Gói: ${order.plan || '-'}\n` +
            `Giá gốc: ${order.originalPrice || order.price || '-'}\n` +
            `Giá sau giảm: ${order.discountedPrice || order.price || '-'}\n\n` +
            `Khách: ${order.fullname || '-'}\n` +
            `Email nâng cấp: ${order.emailUpgrade || '-'}\n` +
            `SĐT: ${order.phone || '-'}\n\n` +
            `Mã giảm giá: ${order.promoCode || '-'}\n` +
            `CTV: ${order.affiliateOwnerName || 'Chưa xác định'}\n` +
            `Hoa hồng dự kiến: ${order.commission || '-'}`;

        // Prepare form data (application/x-www-form-urlencoded)
        const formData = new URLSearchParams({
            action: 'PAID_CONFIRM',
            orderCode: order.orderCode || '',
            product: order.product || '',
            plan: order.plan || '',
            price: order.price || '',
            originalPrice: order.originalPrice || '',
            discountedPrice: order.discountedPrice || '',
            fullname: order.fullname || '',
            phone: order.phone || '',
            emailUpgrade: order.emailUpgrade || '',
            promoCode: order.promoCode || '',
            affiliateOwnerName: order.affiliateOwnerName || 'Chưa xác định',
            commission: order.commission || '',
            telegramMessage: paidTelegramMessage
        });

        console.log('==================== PAYMENT CONFIRMATION ====================');
        console.log('📤 URL:', API_ENDPOINT);
        console.log('📤 Method: POST');
        console.log('📤 Content-Type: application/x-www-form-urlencoded');
        console.log('📤 Payload:', {
            action: 'PAID_CONFIRM',
            orderCode: order.orderCode,
            product: order.product,
            plan: order.plan,
            price: order.price,
            originalPrice: order.originalPrice,
            discountedPrice: order.discountedPrice,
            fullname: order.fullname,
            phone: order.phone,
            emailUpgrade: order.emailUpgrade,
            promoCode: order.promoCode,
            affiliateOwnerName: order.affiliateOwnerName,
            commission: order.commission
        });

        // Send POST request to Google Apps Script
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        });

        console.log('📡 Response Status:', response.status);
        console.log('📡 Response OK:', response.ok);

        // Parse response as text first
        const responseText = await response.text();
        console.log('📥 Response Body (raw):', responseText);

        // Check HTTP status
        if (response.status !== 200) {
            console.error('❌ HTTP Error: Status code is not 200');
            throw new Error(`HTTP ${response.status}: ${responseText}`);
        }

        // Try to parse as JSON
        let jsonData;
        try {
            jsonData = JSON.parse(responseText);
            console.log('📥 Response Body (JSON):', jsonData);
        } catch (e) {
            console.error('❌ Invalid JSON response:', e.message);
            throw new Error('Server returned invalid JSON: ' + responseText);
        }

        // Check if ok field is true
        if (jsonData.ok === true) {
            console.log('✅ Payment confirmation successful!');
            console.log('==============================================================');
            return { success: true };
        } else {
            const errorMsg = jsonData.error || 'Unknown error from server';
            console.error('❌ Server returned error:', errorMsg);
            throw new Error(errorMsg);
        }

    } catch (error) {
        console.error('❌ PAYMENT CONFIRMATION FAILED');
        console.error('❌ Error message:', error.message);
        console.error('❌ Error stack:', error.stack);
        console.log('==============================================================');
        
        // Return structured error
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Register affiliate and notify Telegram via Apps Script endpoint
 * @param {object} affiliate - Affiliate registration data
 * @returns {Promise<object>} Response data
 */
async function registerAffiliateAndNotify(affiliate) {
    try {
        const formData = new URLSearchParams({
            action: 'AFFILIATE_REGISTER',
            fullname: affiliate.fullname || '',
            email: affiliate.email || '',
            phone: affiliate.phone || '',
            bankAccount: affiliate.bankAccount || '',
            affiliateCode: affiliate.affiliateCode || '',
            affiliateLink: affiliate.affiliateLink || '',
            telegramMessage:
                `📢 ĐĂNG KÝ AFFILIATE MỚI\n\n` +
                `Họ tên: ${affiliate.fullname || '-'}\n` +
                `Email: ${affiliate.email || '-'}\n` +
                `SĐT: ${affiliate.phone || '-'}\n` +
                `STK nhận hoa hồng: ${affiliate.bankAccount || '-'}\n\n` +
                `Mã giảm giá: ${affiliate.affiliateCode || '-'}\n` +
                `Link affiliate:\n${affiliate.affiliateLink || '-'}`
        });

        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        });

        const responseText = await response.text();

        if (response.status !== 200) {
            throw new Error(`HTTP ${response.status}: ${responseText}`);
        }

        let jsonData;
        try {
            jsonData = JSON.parse(responseText);
        } catch (e) {
            throw new Error('Server returned invalid JSON: ' + responseText);
        }

        if (jsonData.ok === true) {
            return { success: true };
        }

        throw new Error(jsonData.error || 'Unknown server error');
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}
