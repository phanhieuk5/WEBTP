// product.js

// Lấy ID sản phẩm từ URL
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Hiển thị chi tiết sản phẩm
function displayProductDetails() {
    const productId = getProductIdFromURL();
    if (!productId) return;

    // Tìm sản phẩm từ ID (danh sách sản phẩm mẫu)
    const products = [
        { id: "1", name: "Bơ Booth", price: 50000, image: "../img/bobooth.jpg", description: "Bơ Booth giàu dinh dưỡng." },
        { id: "2", name: "Nho mẫu đơn", price: 180000, image: "../img/nhomaudon.jpg", description: "Nho mẫu đơn ngọt ngào." },
        // Thêm các sản phẩm khác theo cấu trúc tương tự
    ];

    const product = products.find(p => p.id === productId);
    if (product) {
        document.getElementById('product-image').src = product.image;
        document.getElementById('product-name').innerText = product.name;
        document.getElementById('product-price').innerText = `Giá: ${product.price.toLocaleString()} VND`;
        document.getElementById('product-description').innerText = product.description;
    }
}

// Thêm sản phẩm vào giỏ hàng
function addToCart() {
    const productId = getProductIdFromURL();
    const quantity = parseInt(document.getElementById('quantity').value);

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex >= 0) {
        cart[existingProductIndex].quantity += quantity;
    } else {
        const productName = document.getElementById('product-name').innerText;
        const productPrice = parseInt(document.getElementById('product-price').innerText.replace(/\D/g, ''));
        const productImage = document.getElementById('product-image').src;

        cart.push({ id: productId, name: productName, price: productPrice, quantity, image: productImage });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
}

// Khởi động
document.addEventListener('DOMContentLoaded', displayProductDetails);
