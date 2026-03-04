# HƯỚNG DẪN SỬ DỤNG NAVBAR

## Cài đặt vào trang HTML

Thêm các dòng sau vào file HTML của bạn:

### 1. Trong phần `<head>`:
```html
<link rel="stylesheet" href="navbar.css">
```

### 2. Ngay sau thẻ `<body>`:
```html
<!-- Include Navbar -->
<script>
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            // Load navbar JavaScript
            const script = document.createElement('script');
            script.src = 'navbar.js';
            document.body.appendChild(script);
        });
</script>
```

## Cách sử dụng đơn giản hơn (Copy trực tiếp)

Hoặc copy toàn bộ nội dung trong `navbar.html` và paste vào ngay sau thẻ `<body>` của mỗi trang.

Sau đó thêm script tag trước `</body>`:
```html
<script src="navbar.js"></script>
```

## Tính năng

✅ **Desktop:**
- Menu dropdown "Sản Phẩm" hiển thị khi hover
- Hiệu ứng glow vàng khi hover
- Sticky navbar (cố định khi scroll)

✅ **Mobile:**
- Hamburger menu
- Click để mở/đóng menu
- Dropdown mở khi click vào "Sản Phẩm"
- Tự động đóng khi click bên ngoài

✅ **Responsive:**
- Desktop: > 768px
- Tablet: 769px - 1024px
- Mobile: < 768px

## Cấu trúc Menu

**Sản Phẩm** (dropdown):
- ChatGPT Plus
- ChatGPT Business
- ChatGPT GO
- Google AI Pro 2TB
- Gemini Ultra 45.000 Credit
- Canva Pro
- CapCut Pro
- GitHub Pro
- YouTube Premium

**Học Nghề AI** → /hoc-nghe-ai.html

**Liên Hệ** → /lien-he.html

## Tùy chỉnh màu sắc

File: `navbar.css`

```css
/* Màu nền */
.navbar {
    background: #0B0B0F;
}

/* Màu accent vàng */
--accent-color: #F6C453;

/* Dropdown background */
.dropdown-menu {
    background: #12131A;
}
```

## Browser Support

✅ Chrome, Firefox, Safari, Edge (phiên bản mới nhất)
✅ Mobile Safari, Chrome Mobile
