// Hiện hoặc ẩn thông tin thẻ tín dụng dựa trên phương thức thanh toán
document.querySelectorAll('input[name="payment"]').forEach((radio) => {
    radio.addEventListener('change', (event) => {
        const creditCardInfo = document.getElementById('credit-card-info');
        creditCardInfo.style.display = event.target.value === 'credit_card' ? 'block' : 'none';
    });
});

// Hiển thị tóm tắt hóa đơn
function displayOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
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

// Gọi hàm hiển thị tóm tắt hóa đơn khi trang được tải
document.addEventListener('DOMContentLoaded', displayOrderSummary);

// Xác nhận thanh toán
document.getElementById('confirm-payment').addEventListener('click', () => {
    const selectedAddress = document.getElementById('address-select').value || document.getElementById('new-address').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    if (selectedAddress && paymentMethod) {
        alert(`Đã xác nhận thanh toán với địa chỉ: ${selectedAddress} và phương thức: ${paymentMethod}`);
        // Chuyển đến trang xác nhận đơn hàng hoặc xử lý thanh toán tại đây
    } else {
        alert('Vui lòng chọn địa chỉ và phương thức thanh toán.');
    }
});
function loadUserAddresses() {
    const addressSelect = document.getElementById('address-select');
    let userAddresses = JSON.parse(localStorage.getItem('userAddresses')) || [];
    addressSelect.innerHTML = ''; // Xóa địa chỉ cũ

    userAddresses.forEach((address) => {
        const option = document.createElement('option');
        option.value = address;
        option.innerText = address;
        addressSelect.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', loadUserAddresses);

