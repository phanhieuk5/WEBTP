// Hàm lưu thông tin khách hàng
function saveCustomerInfo() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address1 = document.getElementById("address1").value;
    const address2 = document.getElementById("address2").value;

    if (!name || !phone || !address1) {
        alert("Vui lòng điền đầy đủ thông tin cần thiết.");
        return;
    }

    const customerInfo = {
        name,
        phone,
        address1,
        address2,
    };

    localStorage.setItem("customerInfo", JSON.stringify(customerInfo));
    alert("Thông tin đã được lưu!");
}

// Hàm hiển thị thông tin khách hàng nếu có trong localStorage
function displayCustomerInfo() {
    const customerInfo = JSON.parse(localStorage.getItem("customerInfo"));
    
    if (customerInfo) {
        document.getElementById("name").value = customerInfo.name || "";
        document.getElementById("phone").value = customerInfo.phone || "";
        document.getElementById("address1").value = customerInfo.address1 || "";
        document.getElementById("address2").value = customerInfo.address2 || "";
    }
}

// Gọi hàm hiển thị khi trang được tải
document.addEventListener("DOMContentLoaded", displayCustomerInfo);
