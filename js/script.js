let currentPage = 1;
const productsPerPage = 8;
let totalPages = 1; // Giá trị này sẽ được tính động dựa trên tổng số sản phẩm

function updatePageIndicator() {
    const pageIndicator = document.getElementById('page-indicator');
    if (pageIndicator) {
        pageIndicator.innerText = `Trang ${currentPage} / ${totalPages}`;
    }
}

function toggleNavigationButtons() {
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    
    if (prevButton) {
        prevButton.disabled = (currentPage === 1);
    }
    if (nextButton) {
        nextButton.disabled = (currentPage === totalPages);
    }
}

function displayProducts() {
    const productElements = document.querySelectorAll('.product');
    productElements.forEach((product, index) => {
        const productPage = Math.floor(index / productsPerPage) + 1;
        product.style.display = (productPage === currentPage) ? 'block' : 'none';
    });
}

function changePage(direction) {
    currentPage += direction;
    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }
    displayProducts();
    updatePageIndicator();
    toggleNavigationButtons();
}

function createPageButtons() {
    const pageButtonsContainer = document.getElementById('page-buttons');
    if (pageButtonsContainer) {
        pageButtonsContainer.innerHTML = ''; // Xóa nội dung cũ trước khi thêm mới
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.innerText = i;
            button.disabled = (i === currentPage);
            button.addEventListener('click', () => goToPage(i));
            pageButtonsContainer.appendChild(button);
        }
    }
}

function goToPage(page) {
    currentPage = page;
    displayProducts();
    updatePageIndicator();
    toggleNavigationButtons();
}

// Khởi động hiển thị trang đầu tiên
window.onload = function() {
    // Tính toán tổng số trang dựa trên tổng số sản phẩm và sản phẩm mỗi trang
    const productElements = document.querySelectorAll('.product');
    totalPages = Math.ceil(productElements.length / productsPerPage);

    displayProducts();
    updatePageIndicator();
    toggleNavigationButtons();
    createPageButtons();
};
