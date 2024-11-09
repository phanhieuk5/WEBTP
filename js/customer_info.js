// customer_info.js

function getCurrentUsername() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    return loggedInUser ? loggedInUser.username : null;
}

function saveCustomerInfo() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const province = document.getElementById("province").value;
    const district = document.getElementById("district").value;
    const ward = document.getElementById("ward").value;
    const street = document.getElementById("street").value;
    const houseNumber = document.getElementById("houseNumber").value;

    const username = getCurrentUsername();
    if (!username) return;

    const address = `${houseNumber}, ${street}, ${ward}, ${district}, ${province}`;
    const customerInfo = { name, phone, address };

    localStorage.setItem(`customerInfo_${username}`, JSON.stringify(customerInfo));
    alert("Thông tin đã được lưu!");

    displayCustomerInfo();
}

function displayCustomerInfo() {
    const username = getCurrentUsername();
    if (!username) return;

    const customerInfo = JSON.parse(localStorage.getItem(`customerInfo_${username}`));

    if (customerInfo) {
        document.getElementById("name").value = customerInfo.name || "";
        document.getElementById("phone").value = customerInfo.phone || "";
        document.getElementById("province").value = customerInfo.province || "";
        document.getElementById("district").value = customerInfo.district || "";
        document.getElementById("ward").value = customerInfo.ward || "";
        document.getElementById("street").value = customerInfo.street || "";
        document.getElementById("houseNumber").value = customerInfo.houseNumber || "";

        document.getElementById("display-name").textContent = customerInfo.name || "";
        document.getElementById("display-phone").textContent = customerInfo.phone || "";
        document.getElementById("display-address").textContent = customerInfo.address || "";
    } else {
        document.getElementById("display-name").textContent = "";
        document.getElementById("display-phone").textContent = "";
        document.getElementById("display-address").textContent = "";
    }
}

document.addEventListener("DOMContentLoaded", displayCustomerInfo);
