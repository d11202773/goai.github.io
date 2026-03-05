/**
 * Order API for GO AI Website
 * Sends order data to Google Apps Script
 */

const API_ENDPOINT = 'https://script.google.com/macros/s/AKfycbz3Z8UiDTBd4QhDls-rJKdq8FbyabwFUAExAgINw8PugaCoYHKai5ZusCMYIIqgy8ku/exec';

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
        // Prepare confirmation data
        const confirmData = {
            action: "PAID_CONFIRM",
            orderCode: order.orderCode || '',
            product: order.product || '',
            plan: order.plan || '',
            price: order.price || '',
            fullname: order.fullname || '',
            phone: order.phone || '',
            emailUpgrade: order.emailUpgrade || '',
            page: window.location.href,
            userAgent: navigator.userAgent,
            ts: new Date().toISOString()
        };

        console.log('Confirming paid order:', confirmData);

        // Send POST request to Google Apps Script
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(confirmData)
        });

        // Check if request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Confirmation response:', data);

        // Check if status is success
        if (data.status !== 'success') {
            throw new Error(data.message || 'Confirmation failed');
        }

        return {
            success: true,
            data: data
        };

    } catch (error) {
        console.error('Error confirming paid order:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
