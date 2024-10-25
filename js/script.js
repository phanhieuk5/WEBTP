let currentPage = 1;
const productsPerPage = 10; // Mỗi trang hiển thị 10 sản phẩm
let totalPages = 1;

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
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = `
        <button id="prevPage" onclick="changePage(-1)">Trang trước</button>
        <button id="nextPage" onclick="changePage(1)">Trang sau</button>
    `;
    updatePageIndicator();
    toggleNavigationButtons();
}

window.onload = function() {
    const productElements = document.querySelectorAll('.product');
    totalPages = Math.ceil(productElements.length / productsPerPage);

    displayProducts();
    createPageButtons();
    updatePageIndicator();
    toggleNavigationButtons();
};

/* Chức năng trượt xuống phần sản phẩm khi nhấn "Mua ngay" */
document.querySelector('.btn').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('product-list').scrollIntoView({
        behavior: 'smooth'
    });
});
