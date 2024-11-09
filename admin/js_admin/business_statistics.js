// Hàm xem hóa đơn theo sản phẩm (hiển thị chi tiết chỉ cho sản phẩm cụ thể)
function viewInvoicesByProduct(productName) {
    const orders = getOrders();
    const invoices = orders
        .filter(order => 
            order.status === "received" &&
            order.items.some(item => item.name === productName)
        )
        .map(order => {
            // Lấy chi tiết của sản phẩm cụ thể trong đơn hàng
            const productDetails = order.items.find(item => item.name === productName);
            return {
                id: order.id,
                date: order.date,
                customer: order.customer,
                product: productName,
                quantity: productDetails.quantity,
                price: productDetails.price,
                totalPrice: productDetails.price * productDetails.quantity
            };
        });

    displayProductInvoice(invoices);
}
// Khởi động khi tải trang
document.addEventListener("DOMContentLoaded", () => {
    generateProductStatistics();
    generateCustomerStatistics();
    setupModal();
});

// Hàm thống kê theo mặt hàng
function generateProductStatistics() {
    const orders = getOrders();
    const productStats = {};

    orders.forEach(order => {
        if (order.status === "received") {
            order.items.forEach(item => {
                if (!productStats[item.name]) {
                    productStats[item.name] = { quantity: 0, totalRevenue: 0 };
                }
                productStats[item.name].quantity += item.quantity;
                productStats[item.name].totalRevenue += item.price * item.quantity;
            });
        }
    });

    const tableBody = document.getElementById("product-stats-table").querySelector("tbody");
    tableBody.innerHTML = "";
    let totalRevenue = 0;
    let bestSellingProduct = null;
    let leastSellingProduct = null;

    Object.entries(productStats).forEach(([name, stats]) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${name}</td>
            <td>${stats.quantity}</td>
            <td>${stats.totalRevenue.toLocaleString()} VNĐ</td>
            <td><button onclick="viewInvoicesByProduct('${name}')">Xem hóa đơn</button></td>
        `;
        tableBody.appendChild(row);

        totalRevenue += stats.totalRevenue;

        if (!bestSellingProduct || stats.quantity > productStats[bestSellingProduct].quantity) {
            bestSellingProduct = name;
        }
        if (!leastSellingProduct || stats.quantity < productStats[leastSellingProduct].quantity) {
            leastSellingProduct = name;
        }
    });

    document.getElementById("total-revenue").innerText = `Tổng doanh thu: ${totalRevenue.toLocaleString()} VNĐ`;
    document.getElementById("best-selling-product").innerText = `Mặt hàng bán chạy nhất: ${bestSellingProduct}`;
    document.getElementById("least-selling-product").innerText = `Mặt hàng bán ế nhất: ${leastSellingProduct}`;
}

// Hàm thống kê theo khách hàng
function generateCustomerStatistics() {
    const orders = getOrders();
    const customerStats = {};

    orders.forEach(order => {
        if (order.status === "received") {
            const customer = order.customer || "Khách hàng không tên";
            if (!customerStats[customer]) {
                customerStats[customer] = { orderCount: 0, totalSpent: 0 };
            }
            customerStats[customer].orderCount += 1;
            customerStats[customer].totalSpent += order.totalPrice;
        }
    });

    const sortedCustomers = Object.entries(customerStats)
        .sort((a, b) => b[1].totalSpent - a[1].totalSpent)
        .slice(0, 5);

    const tableBody = document.getElementById("customer-stats-table").querySelector("tbody");
    tableBody.innerHTML = "";

    sortedCustomers.forEach(([name, stats]) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${name}</td>
            <td>${stats.orderCount}</td>
            <td>${stats.totalSpent.toLocaleString()} VNĐ</td>
            <td><button onclick="viewInvoicesByCustomer('${name}')">Xem hóa đơn</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Hàm thiết lập modal
function setupModal() {
    const modal = document.getElementById("invoice-modal");
    const closeModalButton = document.getElementById("close-modal");

    // Đóng modal khi nhấn vào dấu "×"
    closeModalButton.onclick = () => {
        modal.style.display = "none";
    };

    // Đóng modal khi nhấn ra ngoài modal
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}
// Hàm xem hóa đơn theo khách hàng (hiển thị toàn bộ đơn hàng của khách hàng)
function viewInvoicesByCustomer(customerName) {
    const orders = getOrders();
    const invoices = orders.filter(order => 
        order.status === "received" && 
        order.customer === customerName
    );

    displayCustomerInvoices(invoices);
}
// Hàm hiển thị modal và hóa đơn liên quan đến sản phẩm hoặc khách hàng
function displayInvoices(invoices) {
    const tableBody = document.getElementById("invoice-table").querySelector("tbody");
    tableBody.innerHTML = "";

    invoices.forEach(invoice => {
        // Tạo dòng chính cho mã đơn hàng, ngày, khách hàng, tổng tiền của toàn bộ hóa đơn
        const mainRow = document.createElement("tr");
        mainRow.innerHTML = `
            <td>${invoice.id || "N/A"}</td>
            <td>${invoice.date}</td>
            <td>${invoice.customer || "Không có tên"}</td>
            <td>${invoice.totalPrice.toLocaleString()} VNĐ</td>
        `;
        tableBody.appendChild(mainRow);

        // Thêm chi tiết từng sản phẩm trong hóa đơn
        invoice.items.forEach(item => {
            const detailRow = document.createElement("tr");
            detailRow.innerHTML = `
                <td style="padding-left: 20px;">${item.name}</td>
                <td>Số lượng: ${item.quantity}</td>
                <td>Giá mỗi sản phẩm: ${(item.price).toLocaleString()} VNĐ</td>
                <td>Tổng tiền: ${(item.price * item.quantity).toLocaleString()} VNĐ</td>
            `;
            tableBody.appendChild(detailRow);
        });
    });

    document.getElementById("invoice-modal").style.display = "block";
}

function getOrders() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const username = loggedInUser.username;
    return JSON.parse(localStorage.getItem(`purchaseHistory_${username}`)) || [];
}

// Hiển thị modal cho hóa đơn chỉ chứa chi tiết của sản phẩm cụ thể
function displayProductInvoice(invoices) {
    const tableBody = document.getElementById("invoice-table").querySelector("tbody");
    tableBody.innerHTML = "";

    invoices.forEach(invoice => {
        const mainRow = document.createElement("tr");
        mainRow.innerHTML = `
            <td>${invoice.id || "N/A"}</td>
            <td>${invoice.date}</td>
            <td>${invoice.customer || "Không có tên"}</td>
            <td>${invoice.totalPrice.toLocaleString()} VNĐ</td>
        `;
        tableBody.appendChild(mainRow);

        const detailRow = document.createElement("tr");
        detailRow.innerHTML = `
            <td style="padding-left: 20px;">${invoice.product}</td>
            <td>Số lượng: ${invoice.quantity}</td>
            <td>Giá mỗi sản phẩm: ${invoice.price.toLocaleString()} VNĐ</td>
            <td>Tổng tiền: ${invoice.totalPrice.toLocaleString()} VNĐ</td>
        `;
        tableBody.appendChild(detailRow);
    });

    document.getElementById("invoice-modal").style.display = "block";
}
// Hiển thị modal cho hóa đơn của khách hàng với toàn bộ chi tiết đơn hàng
function displayCustomerInvoices(invoices) {
    const tableBody = document.getElementById("invoice-table").querySelector("tbody");
    tableBody.innerHTML = "";

    invoices.forEach(invoice => {
        const mainRow = document.createElement("tr");
        mainRow.innerHTML = `
            <td>${invoice.id || "N/A"}</td>
            <td>${invoice.date}</td>
            <td>${invoice.customer || "Không có tên"}</td>
            <td>${invoice.totalPrice.toLocaleString()} VNĐ</td>
        `;
        tableBody.appendChild(mainRow);

        // Thêm chi tiết từng sản phẩm trong đơn hàng
        invoice.items.forEach(item => {
            const detailRow = document.createElement("tr");
            detailRow.innerHTML = `
                <td style="padding-left: 20px;">${item.name}</td>
                <td>Số lượng: ${item.quantity}</td>
                <td>Giá mỗi sản phẩm: ${item.price.toLocaleString()} VNĐ</td>
                <td>Tổng tiền: ${(item.price * item.quantity).toLocaleString()} VNĐ</td>
            `;
            tableBody.appendChild(detailRow);
        });
    });

    document.getElementById("invoice-modal").style.display = "block";
}