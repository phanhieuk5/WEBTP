function getCurrentUsername() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    return loggedInUser ? loggedInUser.username : null;
}

function saveCustomerInfo() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address1").value;

    const username = getCurrentUsername();
    if (!username) return;

    const customerInfo = { name, phone, address1: address };
    localStorage.setItem(`customerInfo_${username}`, JSON.stringify(customerInfo));
    alert("Thông tin đã được lưu!");
}

function displayCustomerInfo() {
    const username = getCurrentUsername();
    if (!username) return;

    const customerInfo = JSON.parse(localStorage.getItem(`customerInfo_${username}`));

    if (customerInfo) {
        document.getElementById("name").value = customerInfo.name || username;
        document.getElementById("phone").value = customerInfo.phone || "";
        document.getElementById("address1").value = customerInfo.address1 || "";
    } else {
        document.getElementById("name").value = username;
    }
}

document.addEventListener("DOMContentLoaded", displayCustomerInfo);
