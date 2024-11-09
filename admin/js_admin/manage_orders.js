// Hàm hiển thị đơn hàng
function displayOrders(orders) {
    const tableBody = document.getElementById("order-table-body");
    tableBody.innerHTML = "";

    orders.forEach(order => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${order.id || "N/A"}</td>
            <td>${order.date}</td>
            <td>${order.customer || "Không có tên"}</td>
            <td>${order.address || "Không có địa chỉ"}</td>
            <td>
                <select onchange="updateOrderStatus('${order.id}', this.value)">
                    <option value="pending" ${order.status === "pending" ? "selected" : ""}>Chưa xử lý</option>
                    <option value="confirmed" ${order.status === "confirmed" ? "selected" : ""}>Đã xác nhận</option>
                    <option value="delivered" ${order.status === "delivered" ? "selected" : ""}>Đã giao thành công</option>
                    <option value="received" ${order.status === "received" ? "selected" : ""}>Đã nhận hàng</option>
                    <option value="cancelled" ${order.status === "cancelled" ? "selected" : ""}>Đã hủy</option>
                </select>
            </td>
            <td>
                ${order.status === "delivered" ? `<button onclick="markAsDelivered('${order.id}')">Giao hàng</button>` : `<a href="#" onclick="viewOrderDetails('${order.id}')" class="view-link">Xem chi tiết</a>`}
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Hàm lọc và hiển thị toàn bộ đơn hàng
function filterOrders() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const username = loggedInUser.username;
    const orderKey = `purchaseHistory_${username}`;
    let orders = JSON.parse(localStorage.getItem(orderKey)) || [];

    displayOrders(orders);
}

// Hàm cập nhật trạng thái đơn hàng
function updateOrderStatus(orderId, newStatus) {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const username = loggedInUser.username;
    const orderKey = `purchaseHistory_${username}`;
    let purchaseHistory = JSON.parse(localStorage.getItem(orderKey)) || [];
    
    purchaseHistory = purchaseHistory.map(order => {
        if (order.id === orderId) {
            order.status = newStatus;
        }
        return order;
    });

    // Cập nhật lại vào localStorage
    localStorage.setItem(orderKey, JSON.stringify(purchaseHistory));

    // Cập nhật lại giao diện sau khi thay đổi trạng thái
    filterOrders();
}

// Hàm lọc đơn hàng theo khoảng thời gian, tình trạng và quận
function applyFilters() {
    const startDate = new Date(document.getElementById("startDate").value);
    const endDate = new Date(document.getElementById("endDate").value);
    const statusFilter = document.getElementById("statusFilter").value;
    const districtFilter = document.getElementById("districtFilter").value.toLowerCase();

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const username = loggedInUser.username;
    const orderKey = `purchaseHistory_${username}`;
    let orders = JSON.parse(localStorage.getItem(orderKey)) || [];

    // Lọc theo ngày
    if (!isNaN(startDate)) {
        orders = orders.filter(order => new Date(order.date) >= startDate);
    }
    if (!isNaN(endDate)) {
        orders = orders.filter(order => new Date(order.date) <= endDate);
    }

    // Lọc theo tình trạng
    if (statusFilter) {
        orders = orders.filter(order => order.status === statusFilter);
    }

    // Lọc theo quận
    if (districtFilter) {
        orders = orders.filter(order => (order.address || "").toLowerCase().includes(`quận ${districtFilter}`));
    }

    displayOrders(orders);
}

// Sắp xếp đơn hàng theo quận
function sortOrdersByDistrict() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const username = loggedInUser.username;
    const orderKey = `purchaseHistory_${username}`;
    let orders = JSON.parse(localStorage.getItem(orderKey)) || [];
    
    orders.sort((a, b) => {
        const districtA = (a.address || "").match(/quận (\d+)/i);
        const districtB = (b.address || "").match(/quận (\d+)/i);
        return (districtA ? parseInt(districtA[1]) : 0) - (districtB ? parseInt(districtB[1]) : 0);
    });

    displayOrders(orders);
}

// Xem chi tiết đơn hàng
function viewOrderDetails(orderId) {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const username = loggedInUser.username;
    const orderKey = `purchaseHistory_${username}`;
    const orders = JSON.parse(localStorage.getItem(orderKey)) || [];
    const order = orders.find(o => o.id === orderId);
    
    if (order) {
        alert(`Chi tiết đơn hàng:\nMã đơn: ${order.id}\nNgày: ${order.date}\nKhách hàng: ${order.customer}\nĐịa chỉ: ${order.address}\nSản phẩm: ${order.items.map(item => `${item.name} (x${item.quantity})`).join(", ")}\nTổng giá: ${order.totalPrice.toLocaleString()} VNĐ\nTrạng thái: ${translateStatus(order.status)}`);
    } else {
        alert("Không tìm thấy đơn hàng.");
    }
}

// Dịch trạng thái đơn hàng sang tiếng Việt
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

// Khởi động
document.addEventListener("DOMContentLoaded", filterOrders);
