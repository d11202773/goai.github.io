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
        // Prepare form data (application/x-www-form-urlencoded)
        const formData = new URLSearchParams({
            action: 'PAID_CONFIRM',
            orderCode: order.orderCode || '',
            product: order.product || '',
            plan: order.plan || '',
            price: order.price || '',
            fullname: order.fullname || '',
            phone: order.phone || '',
            emailUpgrade: order.emailUpgrade || ''
        });

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
            body: formData
        });

        console.log('📡 Response status:', response.status);

        // Parse response as text
        const responseText = await response.text();
        console.log('📥 Response text:', responseText);

        // Check if request was successful
        if (response.status === 200) {
            // Try to parse as JSON first (for {ok: true} format)
            try {
                const jsonData = JSON.parse(responseText);
                if (jsonData.ok === true) {
                    console.log('✅ Confirmation successful (JSON format)');
                    return { success: true };
                } else if (jsonData.ok === false) {
                    throw new Error(jsonData.error || 'Unknown error');
                }
            } catch (e) {
                // Not JSON, check for text "success"
                if (responseText.trim() === 'success') {
                    console.log('✅ Confirmation successful (text format)');
                    return { success: true };
                }
            }
            
            // If neither format matched, throw error
            throw new Error('Invalid response format: ' + responseText);
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
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
        }
        
        return {
            success: false,
            error: errorMessage
        };
    }
}
