function displayPurchaseHistory() {
    const purchaseHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
    const historyContainer = document.getElementById("purchase-history");

    if (purchaseHistory.length === 0) {
        historyContainer.innerHTML = "<p>Bạn chưa có đơn hàng nào.</p>";
        return;
    }

    purchaseHistory.forEach(order => {
        const orderElement = document.createElement("div");
        orderElement.classList.add("order-item");
        orderElement.innerHTML = `
            <h3>Đơn hàng ngày: ${order.date}</h3>
            <ul>
                ${order.items.map(item => `<li>${item.name} (x${item.quantity}) - ${item.price.toLocaleString()} VNĐ</li>`).join("")}
            </ul>
            <p><strong>Tổng cộng: ${order.totalPrice.toLocaleString()} VNĐ</strong></p>
        `;
        historyContainer.appendChild(orderElement);
    });
}

// Gọi hàm khi trang tải
document.addEventListener("DOMContentLoaded", displayPurchaseHistory);

// Gọi hàm khi trang tải
document.addEventListener("DOMContentLoaded", displayPurchaseHistory);
