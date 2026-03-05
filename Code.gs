/**
 * Google Apps Script for GO AI Website
 * Handles order confirmations and sends Telegram notifications
 * 
 * SETUP INSTRUCTIONS:
 * 1. Copy this code to your Google Apps Script project
 * 2. Create a Google Sheet with columns:
 *    Time | OrderCode | Product | Plan | Price | Fullname | Phone | EmailUpgrade | Status
 * 3. Set Script Properties (File > Project properties > Script properties):
 *    - TELEGRAM_BOT_TOKEN: 8793516171:AAFznxROzZrRnSI6vDZfAmcegz4LzqL4Js8
 *    - TELEGRAM_CHAT_ID: 695944248
 *    - SHEET_ID: [Your Google Sheet ID from URL]
 * 4. Deploy as Web App:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL to your frontend code
 */

// Get script properties
function getScriptProperty(key) {
  const properties = PropertiesService.getScriptProperties();
  return properties.getProperty(key);
}

// doPost handler - receives POST requests from website
function doPost(e) {
  try {
    // Parse form-urlencoded data
    const data = e.parameter || {};
    
    Logger.log('Received data: ' + JSON.stringify(data));
    
    // Check action type
    if (data.action !== 'PAID_CONFIRM') {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'ignored',
          message: 'Action not recognized'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get Sheet ID from properties
    const sheetId = getScriptProperty('SHEET_ID');
    if (!sheetId) {
      throw new Error('SHEET_ID not configured in Script Properties');
    }
    
    // Open Google Sheet
    const sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();
    
    // Prepare row data
    const timestamp = new Date().toISOString();
    const rowData = [
      timestamp,                      // Time
      data.orderCode || '',           // OrderCode
      data.product || '',             // Product
      data.plan || '',                // Plan
      data.price || '',               // Price
      data.fullname || '',            // Fullname
      data.phone || '',               // Phone
      data.emailUpgrade || '',        // EmailUpgrade
      'PAID_CONFIRM'                  // Status
    ];
    
    // Append to sheet
    sheet.appendRow(rowData);
    Logger.log('Row appended to sheet');
    
    // Send Telegram notification
    try {
      sendTelegramNotification(data);
    } catch (telegramError) {
      Logger.log('Telegram error (continuing anyway): ' + telegramError.message);
      // Don't fail the whole request if Telegram fails
    }
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Order confirmed and notification sent',
        timestamp: timestamp
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error: ' + error.message);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Send Telegram notification
function sendTelegramNotification(data) {
  // Get Telegram credentials from Script Properties
  const botToken = getScriptProperty('TELEGRAM_BOT_TOKEN');
  const chatId = getScriptProperty('TELEGRAM_CHAT_ID');
  
  if (!botToken || !chatId) {
    throw new Error('Telegram credentials not configured in Script Properties');
  }
  
  // Format message
  const message = 
    '💰 ĐƠN XÁC NHẬN CHUYỂN KHOẢN\n\n' +
    'Mã đơn: ' + (data.orderCode || 'N/A') + '\n' +
    'Sản phẩm: ' + (data.product || 'N/A') + '\n' +
    'Gói: ' + (data.plan || 'N/A') + '\n' +
    'Giá: ' + (data.price || 'N/A') + '\n' +
    'Họ tên: ' + (data.fullname || 'N/A') + '\n' +
    'Email nâng cấp: ' + (data.emailUpgrade || 'N/A') + '\n' +
    'SĐT: ' + (data.phone || 'N/A');
  
  // Telegram API URL
  const telegramUrl = 'https://api.telegram.org/bot' + botToken + '/sendMessage';
  
  // Prepare payload
  const payload = {
    chat_id: chatId,
    text: message,
    parse_mode: 'HTML'
  };
  
  // Send request
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  const response = UrlFetchApp.fetch(telegramUrl, options);
  const responseCode = response.getResponseCode();
  
  if (responseCode !== 200) {
    throw new Error('Telegram API error: ' + response.getContentText());
  }
  
  Logger.log('Telegram notification sent successfully');
}

// Test function to verify setup
function testSetup() {
  const botToken = getScriptProperty('TELEGRAM_BOT_TOKEN');
  const chatId = getScriptProperty('TELEGRAM_CHAT_ID');
  const sheetId = getScriptProperty('SHEET_ID');
  
  Logger.log('Bot Token: ' + (botToken ? '✓ Set' : '✗ Missing'));
  Logger.log('Chat ID: ' + (chatId ? '✓ Set' : '✗ Missing'));
  Logger.log('Sheet ID: ' + (sheetId ? '✓ Set' : '✗ Missing'));
  
  if (botToken && chatId && sheetId) {
    Logger.log('All properties configured correctly!');
    
    // Test Telegram
    try {
      const testData = {
        orderCode: 'TEST-' + Date.now(),
        product: 'Test Product',
        plan: 'Test Plan',
        price: '100.000đ',
        fullname: 'Test User',
        emailUpgrade: 'test@example.com',
        phone: '0123456789'
      };
      sendTelegramNotification(testData);
      Logger.log('✓ Telegram test message sent!');
    } catch (e) {
      Logger.log('✗ Telegram test failed: ' + e.message);
    }
    
  } else {
    Logger.log('Please configure missing properties!');
  }
}
