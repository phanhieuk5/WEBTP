
// Hàm mở modal với chi tiết sản phẩm
const cart = JSON.parse(localStorage.getItem('cart')) || [];
// của product

// Tải giỏ hàng từ localStorage khi trang tải
function cartLoadPage() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.getElementById('btn-checkout'); // Lấy nút thanh toán
    cartItemsContainer.innerHTML = ''; // Xóa nội dung cũ của giỏ hàng

    let totalPrice = 0;

    // Kiểm tra nếu giỏ hàng trống
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Giỏ hàng của bạn đang trống.</p>';
        totalPriceElement.innerText = '0 VNĐ';
        checkoutButton.disabled = true; // Vô hiệu hóa nút thanh toán
        return;
    }

    // Hiển thị từng sản phẩm trong giỏ hàng
    cart.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.classList.add('cart-item');

        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="cart-item-image">
            <span>${product.name}</span>
            <span>${product.price.toLocaleString()} VNĐ</span>
            <input type="number" value="${product.quantity}" min="1" class="quantity-input"
                   onchange="updateQuantity(${index}, this.value)">
            <span>${(product.price * product.quantity).toLocaleString()} VNĐ</span>
            <button class="btn-remove" onclick="removeFromCart(${index})">Xóa</button>
        `;

        cartItemsContainer.appendChild(productElement);
        totalPrice += product.price * product.quantity;
    });

    totalPriceElement.innerText = totalPrice.toLocaleString() + ' VNĐ';
    
    // Kích hoạt nút thanh toán nếu có sản phẩm trong giỏ
    checkoutButton.disabled = false;
}


// Hàm cập nhật số lượng sản phẩm
function updateQuantity(index, newQuantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (newQuantity < 1) return;
    cart[index].quantity = parseInt(newQuantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    cartLoadPage();
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Xóa sản phẩm theo index
    localStorage.setItem('cart', JSON.stringify(cart));
    cartLoadPage();
}

// Gọi hàm khi trang tải
document.addEventListener('DOMContentLoaded', cartLoadPage);
