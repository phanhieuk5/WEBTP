function displayPurchaseHistory() {
    console.log("Displaying purchase history..."); // Thêm log để kiểm tra xem hàm có bị gọi nhiều lần không

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) return;

    const username = loggedInUser.username;
    const purchaseHistory = JSON.parse(localStorage.getItem(`purchaseHistory_${username}`)) || [];
    const historyContainer = document.getElementById("purchase-history");

    // Đây là phần thay đổi:
    // Xóa nội dung cũ trong bảng để tránh lặp lại dữ liệu mỗi khi hàm được gọi
    historyContainer.innerHTML = ''; 

    const table = document.createElement("table");
    table.innerHTML = `
        <tr>
            <th>Mã đơn hàng</th>
            <th>Ngày</th>
            <th>Khách hàng</th>
            <th>Địa chỉ</th>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
        </tr>
    `;

    purchaseHistory.forEach(order => {
        const row = document.createElement("tr");

        let actionButton = "";
        const status = order.status || "pending";

        if (status === "pending" || status === "confirmed") {
            actionButton += `<button onclick="cancelOrder('${order.id}')">Hủy đơn hàng</button>`;
        }

        if (status === "delivered") {
            actionButton += `<button onclick="confirmReceived('${order.id}')">Đã nhận hàng</button>`;
        } else if (status === "received") {
            actionButton = "Đã nhận";
        }

        row.innerHTML = `
            <td>${order.id || "N/A"}</td>
            <td>${order.date}</td>
            <td>${order.customer || "Không có tên"}</td>
            <td>${order.address || "Không có địa chỉ"}</td>
            <td>${order.items.map(item => `${item.name} (x${item.quantity})`).join(", ")}</td>
            <td>${order.totalPrice.toLocaleString()} VNĐ</td>
            <td>${translateStatus(status)}</td>
            <td>${actionButton}</td>
        `;
        table.appendChild(row);
    });

    historyContainer.appendChild(table);
}
// Hàm dịch trạng thái sang tiếng Việt
function translateStatus(status) {
    switch (status) {
        case "pending":
            return "Chưa xử lý";
        case "confirmed":
            return "Đã xác nhận";
        case "delivered":
            return "Đã giao thành công";
        case "cancelled":
            return "Đã hủy";
        case "received":
            return "Đã nhận hàng";
        default:
            return "Không xác định";
    }
}

// Hàm hủy đơn hàng
function cancelOrder(orderId) {
    const confirmation = confirm("Bạn có chắc chắn muốn hủy đơn hàng này?");
    if (!confirmation) return;

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const username = loggedInUser.username;
    let purchaseHistory = JSON.parse(localStorage.getItem(`purchaseHistory_${username}`)) || [];

    purchaseHistory = purchaseHistory.map(order => {
        if (order.id === orderId && (order.status === "pending" || order.status === "confirmed")) {
            order.status = "cancelled";
        }
        return order;
    });

    localStorage.setItem(`purchaseHistory_${username}`, JSON.stringify(purchaseHistory));
    displayPurchaseHistory();
}

function confirmReceived(orderId) {
    const confirmation = confirm("Bạn có chắc chắn đã nhận được hàng?");
    if (!confirmation) return;

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const username = loggedInUser.username;
    let purchaseHistory = JSON.parse(localStorage.getItem(`purchaseHistory_${username}`)) || [];

    // Cập nhật trạng thái đơn hàng thành "Đã nhận hàng" nếu trạng thái hiện tại là "Đã giao thành công"
    purchaseHistory = purchaseHistory.map(order => {
        if (order.id === orderId && order.status === "delivered") {
            order.status = "received";
        }
        return order;
    });

    // Lưu lại vào localStorage
    localStorage.setItem(`purchaseHistory_${username}`, JSON.stringify(purchaseHistory));

    // Gọi lại hàm hiển thị để cập nhật giao diện
    displayPurchaseHistory();
}

document.addEventListener("DOMContentLoaded", displayPurchaseHistory);
