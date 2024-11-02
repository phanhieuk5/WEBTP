const cart = JSON.parse(localStorage.getItem('cart')) || [];
// của product

// Tải giỏ hàng từ localStorage khi trang tải
function cartLoadPage() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItemsContainer.innerHTML = ''; // Xóa nội dung cũ

    let totalPrice = 0;

    // Hiển thị từng sản phẩm trong giỏ hàng
    cart.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.classList.add('cart-item');

        productElement.innerHTML = `
            <img src="../img/${product.image}" alt="${product.name}">
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
}

// Cập nhật số lượng sản phẩm
function updateQuantity(index, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    cartLoadPage(); // Cập nhật lại giỏ hàng
}

// Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    cartLoadPage(); // Cập nhật lại giỏ hàng
}

// Gọi hàm cartLoadPage để tải giỏ hàng khi trang được mở
document.addEventListener('DOMContentLoaded', cartLoadPage);
