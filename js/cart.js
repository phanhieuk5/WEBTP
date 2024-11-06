// Tải giỏ hàng từ localStorage khi trang tải
function cartLoadPage() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) return;

    const username = loggedInUser.username;
    const cart = JSON.parse(localStorage.getItem(`cart_${username}`)) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.getElementById('btn-checkout'); 
    cartItemsContainer.innerHTML = ''; // Xóa nội dung cũ của giỏ hàng

    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Giỏ hàng của bạn đang trống.</p>';
        totalPriceElement.innerText = '0 VNĐ';
        checkoutButton.disabled = true; 
        return;
    }

    cart.forEach((product, index) => {
        const imageSrc = product.image.startsWith('data:image/') 
            ? product.image // URL base64 từ ảnh tải lên
            : `../${product.image}`; // Đường dẫn tương đối đến ảnh trong thư mục `img`

        const productElement = document.createElement('div');
        productElement.classList.add('cart-item');

        productElement.innerHTML = `
            <img src="${imageSrc}" alt="${product.name}" class="cart-item-image">
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
    checkoutButton.disabled = false;
}

// Hàm cập nhật số lượng sản phẩm trong giỏ hàng
function updateQuantity(index, newQuantity) {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) return;

    const username = loggedInUser.username;
    const cart = JSON.parse(localStorage.getItem(`cart_${username}`)) || [];
    if (newQuantity < 1) return;

    cart[index].quantity = parseInt(newQuantity);
    localStorage.setItem(`cart_${username}`, JSON.stringify(cart)); // Lưu giỏ hàng đã cập nhật số lượng
    cartLoadPage(); // Tải lại trang giỏ hàng để hiển thị cập nhật
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) return;

    const username = loggedInUser.username;
    const cart = JSON.parse(localStorage.getItem(`cart_${username}`)) || [];
    cart.splice(index, 1); // Xóa sản phẩm theo index
    localStorage.setItem(`cart_${username}`, JSON.stringify(cart)); // Lưu giỏ hàng đã xóa sản phẩm
    cartLoadPage(); // Tải lại trang giỏ hàng để hiển thị cập nhật
}

// Gọi hàm khi trang tải
document.addEventListener('DOMContentLoaded', cartLoadPage);
