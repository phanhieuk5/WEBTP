// Tải địa chỉ người dùng
function loadUserAddresses() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) return;

    const username = loggedInUser.username;
    const addressSelect = document.getElementById('address-select');
    const customerInfo = JSON.parse(localStorage.getItem(`customerInfo_${username}`)) || {};

    if (addressSelect) {
        addressSelect.innerHTML = ''; // Xóa địa chỉ cũ

        if (customerInfo.address1) {
            const option1 = document.createElement('option');
            option1.value = customerInfo.address1;
            option1.innerText = customerInfo.address1;
            addressSelect.appendChild(option1);
        }

        if (customerInfo.address2) {
            const option2 = document.createElement('option');
            option2.value = customerInfo.address2;
            option2.innerText = customerInfo.address2;
            addressSelect.appendChild(option2);
        }
    } else {
        console.warn("Phần tử 'address-select' không tồn tại trên trang.");
    }
}

// Xác nhận thanh toán
const confirmPaymentButton = document.getElementById('confirm-payment');
if (confirmPaymentButton) {
    confirmPaymentButton.addEventListener('click', () => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!loggedInUser) return;

        const username = loggedInUser.username;
        const selectedAddress = document.getElementById('address-select').value || document.getElementById('new-address').value;
        const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;
        const cart = JSON.parse(localStorage.getItem(`cart_${username}`)) || [];

        if (selectedAddress && paymentMethod && cart.length > 0) {
            const order = {
                date: new Date().toLocaleString(),
                items: cart.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalPrice: cart.reduce((total, item) => total + (item.price * item.quantity), 0)
            };

            // Lưu đơn hàng vào lịch sử mua hàng
            let purchaseHistory = JSON.parse(localStorage.getItem(`purchaseHistory_${username}`)) || [];
            purchaseHistory.push(order);
            localStorage.setItem(`purchaseHistory_${username}`, JSON.stringify(purchaseHistory));

            // Xóa giỏ hàng
            localStorage.removeItem(`cart_${username}`);

            alert(`Đã xác nhận thanh toán với địa chỉ: ${selectedAddress} và phương thức: ${paymentMethod}`);
            // Chuyển đến trang xác nhận đơn hàng hoặc về trang chủ
            window.location.href = '../index.html';
        } else {
            alert('Vui lòng chọn địa chỉ và phương thức thanh toán.');
        }
    });
} else {
    console.warn("Phần tử 'confirm-payment' không tồn tại trên trang.");
}

// Hiển thị tóm tắt giỏ hàng
function displayOrderSummary() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) return;

    const username = loggedInUser.username;
    const cart = JSON.parse(localStorage.getItem(`cart_${username}`)) || [];
    const summaryItems = document.getElementById('summary-items');
    const summaryTotalPrice = document.getElementById('summary-total-price');

    let totalPrice = 0;
    summaryItems.innerHTML = ''; // Xóa nội dung cũ

    cart.forEach((product) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <span>${product.name} (x${product.quantity})</span>
            <span>${(product.price * product.quantity).toLocaleString()} VNĐ</span>
        `;
        summaryItems.appendChild(itemElement);
        totalPrice += product.price * product.quantity;
    });

    summaryTotalPrice.innerText = totalPrice.toLocaleString() + ' VNĐ';
}

// Hàm checkout để kiểm tra và chuyển đến trang thanh toán
function checkout() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
        alert("Bạn cần đăng nhập để thanh toán.");
        window.location.href = 'login.html';
        return;
    }
    
    const username = loggedInUser.username;
    const cart = JSON.parse(localStorage.getItem(`cart_${username}`)) || [];
    
    if (cart.length === 0) {
        alert('Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi thanh toán.');
    } else {
        window.location.href = 'checkout.html';
    }
}

// Gọi hàm hiển thị tóm tắt hóa đơn và tải địa chỉ khi trang được tải
document.addEventListener("DOMContentLoaded", () => {
    loadUserAddresses(); // Tải địa chỉ khi trang được mở
    displayOrderSummary(); // Hiển thị tóm tắt đơn hàng
});
