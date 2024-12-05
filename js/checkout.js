function toggleAddressInput() {
    const addressSelect = document.getElementById('address-select');
    const newAddressInput = document.getElementById('new-address');
    
    if (addressSelect.value === 'new') {
        newAddressInput.disabled = false; // Bật ô nhập địa chỉ mới
    } else {
        newAddressInput.disabled = true; // Tắt ô nhập địa chỉ mới
        newAddressInput.value = ''; // Xoá nội dung nếu có
    }
}


// Hàm để hiển thị thông tin thanh toán theo phương thức chọn
function togglePaymentInfo() {
    const paymentMethod = document.getElementById('payment-method').value;
    const creditCardInfo = document.getElementById('credit-card-info');
    const bankTransferInfo = document.getElementById('bank-transfer-info');

    if (paymentMethod === 'credit_card') {
        creditCardInfo.style.display = 'block';
        bankTransferInfo.style.display = 'none';
    } else if (paymentMethod === 'bank_transfer') {
        creditCardInfo.style.display = 'none';
        bankTransferInfo.style.display = 'block';
    } else {
        creditCardInfo.style.display = 'none';
        bankTransferInfo.style.display = 'none';
    }
}

// Hàm xử lý thanh toán
function processCheckout() {
    // Hiển thị thông báo thanh toán thành công
    alert('Thanh toán thành công!');

    // Sau khi thanh toán thành công, chuyển hướng về trang chủ
    window.location.href = '../index.html';
}
