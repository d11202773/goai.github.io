/**
 * Order API for GO AI Website
 * Sends order data to Google Apps Script
 */

const API_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxvXGAtB3GtrExGBJqyYqS3tMYmmc-7mygdXfM3ViOZ40kKda2adAXN4C1hDgO09Xp-/exec';

/**
 * Send order to Google Apps Script
 * @param {string} product - Product name
 * @param {string} plan - Service plan (e.g., "1 tháng", "1 năm")
 * @param {string} price - Price (e.g., "220.000đ")
 * @param {string} fullname - Customer full name
 * @param {string} phone - Customer phone number
 * @returns {Promise<object>} Response data
 */
async function sendOrder(product, plan, price, fullname, phone) {
    try {
        // Generate order code: GOAI + timestamp
        const orderCode = 'GOAI' + Date.now();

        // Prepare order data
        const orderData = {
            orderCode: orderCode,
            product: product,
            plan: plan,
            price: price,
            fullname: fullname,
            phone: phone
        };

        console.log('Sending order:', orderData);

        // Send POST request to Google Apps Script
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        // Check if request was successful
        if (response.ok) {
            const data = await response.json();
            console.log('Order sent:', data);
            return {
                success: true,
                orderCode: orderCode,
                data: data
            };
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.error('Error sending order:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Confirm paid order and notify via Telegram
 * Sends PAID_CONFIRM action to Google Apps Script
 * @param {object} order - Order details
 * @returns {Promise<object>} Response data
 */
async function confirmPaidAndNotify(order) {
    try {
        // Prepare form data (application/x-www-form-urlencoded)
        const formData = new URLSearchParams();
        formData.append('action', 'PAID_CONFIRM');
        formData.append('orderCode', order.orderCode || '');
        formData.append('product', order.product || '');
        formData.append('plan', order.plan || '');
        formData.append('price', order.price || '');
        formData.append('fullname', order.fullname || '');
        formData.append('phone', order.phone || '');
        formData.append('emailUpgrade', order.emailUpgrade || '');

        console.log('📤 Confirming paid order:', {
            action: 'PAID_CONFIRM',
            orderCode: order.orderCode,
            product: order.product,
            plan: order.plan,
            price: order.price,
            fullname: order.fullname,
            phone: order.phone,
            emailUpgrade: order.emailUpgrade
        });
        console.log('🔗 API Endpoint:', API_ENDPOINT);

        // Send POST request to Google Apps Script
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        });

        console.log('📡 Response status:', response.status);

        // Parse JSON response
        const responseData = await response.json();
        console.log('📥 Response data:', responseData);

        // Check if request was successful
        if (response.status === 200 && responseData.ok === true) {
            console.log('✅ Confirmation successful');
            return {
                success: true
            };
        } else {
            const errorMsg = responseData.error || 'Unknown error';
            console.error('❌ API error:', errorMsg);
            throw new Error(errorMsg);
        }

    } catch (error) {
        console.error('❌ Error confirming paid order:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack
        });
        
        // Return user-friendly error message
        let errorMessage = error.message;
        if (errorMessage.includes('Failed to fetch')) {
            errorMessage = 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.';
        } else if (errorMessage.includes('JSON')) {
            errorMessage = 'Lỗi xử lý dữ liệu từ server. Vui lòng thử lại.';
        }
        
        return {
            success: false,
            error: errorMessage
        };
    }
}
