document.addEventListener('DOMContentLoaded', function () {
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const districtFilterInput = document.getElementById('districtFilter');
    const statusFilterSelect = document.getElementById('statusFilter');
    const orderTableBody = document.getElementById('order-table-body');
    const orders = Array.from(orderTableBody.getElementsByClassName('order-item'));

    // Hàm áp dụng bộ lọc khi nhấn nút "Lọc"
    function applyFilters() {
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;
        const district = districtFilterInput.value.toLowerCase();
        const status = statusFilterSelect.value;

        orders.forEach(order => {
            const orderDate = order.cells[3].innerText.trim();
            const orderDistrict = order.dataset.district.toLowerCase();
            const orderStatus = order.dataset.status;

            // Kiểm tra các điều kiện lọc
            const orderDateValid = (!startDate || orderDate >= startDate) && (!endDate || orderDate <= endDate);
            const orderDistrictValid = orderDistrict.includes(district);
            const orderStatusValid = !status || orderStatus === status;

            // Nếu thỏa mãn các điều kiện lọc thì hiển thị đơn hàng, ngược lại ẩn đơn hàng
            if (orderDateValid && orderDistrictValid && orderStatusValid) {
                order.style.display = ''; // Hiển thị đơn hàng nếu thỏa mãn tất cả các điều kiện
            } else {
                order.style.display = 'none'; // Ẩn đơn hàng nếu không thỏa mãn điều kiện
            }
        });
    }

    // Lắng nghe sự kiện "Lọc" khi nhấn nút
    document.querySelector('button[onclick="applyFilters()"]').addEventListener('click', applyFilters);
});
