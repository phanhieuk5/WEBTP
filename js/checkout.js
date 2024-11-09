function loadUserAddresses() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) return;

    const username = loggedInUser.username;
    const addressSelect = document.getElementById('address-select');
    const customerInfo = JSON.parse(localStorage.getItem(`customerInfo_${username}`)) || {};

    if (addressSelect) {
        addressSelect.innerHTML = ''; // Xóa địa chỉ cũ

        if (customerInfo.address) { // Sử dụng customerInfo.address thay vì address1 và address2
            const option = document.createElement('option');
            option.value = customerInfo.address;
            option.innerText = customerInfo.address;
            addressSelect.appendChild(option);
        }
    }
}

const confirmPaymentButton = document.getElementById('confirm-payment');
if (confirmPaymentButton) {
    confirmPaymentButton.addEventListener('click', () => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!loggedInUser) return;

        const username = loggedInUser.username;
        const recipientName = document.getElementById('recipient-name').value;
        const accountAddress = document.getElementById('address-select').value;
        const newAddress = document.getElementById('new-address').value;
        const selectedAddress = newAddress ? newAddress : accountAddress;
        const paymentMethod = document.getElementById('payment-method').value;
        const cart = JSON.parse(localStorage.getItem(`cart_${username}`)) || [];
        const orderId = localStorage.getItem('currentOrderId');

        if (recipientName && selectedAddress && paymentMethod && cart.length > 0) {
            const order = {
                id: orderId,
                date: new Date().toLocaleString(),
                customer: recipientName,
                address: selectedAddress,
                items: cart.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalPrice: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
                status: "Đang xử lý"
            };

            let purchaseHistory = JSON.parse(localStorage.getItem(`purchaseHistory_${username}`)) || [];
            purchaseHistory.push(order);
            localStorage.setItem(`purchaseHistory_${username}`, JSON.stringify(purchaseHistory));

            localStorage.removeItem(`cart_${username}`);
            localStorage.removeItem('currentOrderId');

            alert(`Đã xác nhận thanh toán với tên người nhận: ${recipientName}, địa chỉ: ${selectedAddress}, và phương thức: ${paymentMethod}`);
            window.location.href = '../index.html';
        } else {
            alert('Vui lòng nhập tên người nhận, chọn địa chỉ và phương thức thanh toán.');
        }
    });
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

document.getElementById('payment-method').addEventListener("change", (event) => {
    const selectedMethod = event.target.value;
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const orderId = localStorage.getItem('currentOrderId');

    if (selectedMethod === "credit_card") {
        toggleCreditCardInfo(true);
        toggleBankTransferInfo(false);
    } else if (selectedMethod === "bank_transfer") {
        toggleBankTransferInfo(true);
        toggleCreditCardInfo(false);
        displayBankTransferDetails(orderId, loggedInUser.username);
    } else {
        toggleCreditCardInfo(false);
        toggleBankTransferInfo(false);
    }
});

function toggleCreditCardInfo(show) {
    document.getElementById("credit-card-info").style.display = show ? "block" : "none";
}

function toggleBankTransferInfo(show) {
    document.getElementById("bank-transfer-info").style.display = show ? "block" : "none";
}

function displayBankTransferDetails(orderId, username) {
    const bankTransferInfo = document.getElementById("bank-transfer-info");
    bankTransferInfo.innerHTML = `
        <img src="path/to/your/qr-code-image.png" alt="QR Code for Bank Transfer">
        <p>Nội dung chuyển khoản: ${orderId || 'N/A'} - ${username || 'N/A'}</p>
    `;
    bankTransferInfo.style.display = "block";
}

// Gọi hàm hiển thị tóm tắt hóa đơn và tải địa chỉ khi trang được tải
document.addEventListener("DOMContentLoaded", () => {
    loadUserAddresses();
    displayOrderSummary();

    // Tạo mã đơn hàng khi vào trang
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) return;

    let orderId = localStorage.getItem('currentOrderId');
    if (!orderId) {
        // Tạo mã đơn hàng ngẫu nhiên nếu chưa có
        orderId = `ORDER${Math.floor(Math.random() * 100000)}`;
        localStorage.setItem('currentOrderId', orderId);
    }

    // Xóa mã đơn hàng nếu người dùng rời khỏi trang
    window.addEventListener("beforeunload", () => {
        localStorage.removeItem('currentOrderId');
    });
});
