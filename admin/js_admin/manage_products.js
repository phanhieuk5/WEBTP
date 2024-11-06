let products = JSON.parse(localStorage.getItem('products')) || [];
const itemsPerPage = 10;
let currentPage = 1;

function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

function displayProducts(page = 1) {
    const tableBody = document.getElementById('product-table').querySelector('tbody');
    tableBody.innerHTML = '';

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProducts = products.slice(start, end);

    paginatedProducts.forEach((product, index) => {
        // Kiểm tra nếu `product.image` là URL base64 hay là đường dẫn ảnh
        const imageSrc = product.image.startsWith('data:image/') 
            ? product.image // URL base64 từ ảnh tải lên
            : `../../${product.image}`; // Đường dẫn đến ảnh trong thư mục `img`

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${start + index + 1}</td>
            <td>${product.name}</td>
            <td>${product.price.toLocaleString()} VND</td>
            <td>${product.description}</td>
            <td>
                ${product.image 
                    ? `<img src="${imageSrc}" alt="${product.name}" class="product-image" style="width: 50px; height: auto;">`
                    : 'Không có hình'}
            </td>
            <td>
                <button onclick="editProduct('${product.id}')" class="btn-edit">Sửa</button>
                <button onclick="confirmDeleteProduct('${product.id}')" class="btn-delete">Xóa</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    displayPagination();
}


function displayPagination() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const pageCount = Math.ceil(products.length / itemsPerPage);
    for (let i = 1; i <= pageCount; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.className = (i === currentPage) ? 'active' : '';
        pageButton.onclick = () => goToPage(i);
        paginationContainer.appendChild(pageButton);
    }
}

function goToPage(page) {
    currentPage = page;
    displayProducts(page);
}

function addProduct() {
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const description = document.getElementById('product-description').value;
    const category = document.getElementById('product-category').value;
    const fileInput = document.getElementById('product-image');
    const file = fileInput.files[0];

    if (!name || !price || !description || !category || !file) {
        alert("Vui lòng điền đủ thông tin sản phẩm!");
        return;
    }

    const reader = new FileReader();
reader.onload = function(event) {
    const newProduct = {
        id: generateProductId().toString(),
        name,
        price: parseFloat(price),
        description,
        category,
        image: event.target.result // Lưu URL base64 của ảnh
    };
    
    products.push(newProduct);
    saveProducts();
    displayProducts(currentPage);
    document.getElementById('add-product-form').reset();
};

reader.readAsDataURL(file); // Đọc file ảnh dưới dạng URL base64

}
function generateProductId() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    if (products.length === 0) return 1; // Nếu không có sản phẩm nào, bắt đầu từ 1
    const lastProduct = products[products.length - 1];
    return parseInt(lastProduct.id) + 1; // ID tiếp theo là ID cuối cùng + 1
}


function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        document.getElementById('edit-product-form').style.display = 'block';
        document.getElementById('edit-product-name').value = product.name;
        document.getElementById('edit-product-price').value = product.price;
        document.getElementById('edit-product-description').value = product.description;
        document.getElementById('edit-product-category').value = product.category;
        document.getElementById('edit-product-form').dataset.productId = productId;
        document.getElementById('edit-product-image').value = '';
    }
}

function saveEditedProduct() {
    const productId = document.getElementById('edit-product-form').dataset.productId;
    const product = products.find(p => p.id === productId);

    if (product) {
        product.name = document.getElementById('edit-product-name').value;
        product.price = parseFloat(document.getElementById('edit-product-price').value);
        product.category = document.getElementById('edit-product-category').value;
        product.description = document.getElementById('edit-product-description').value;

        const imageInput = document.getElementById('edit-product-image');
        if (imageInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(event) {
                product.image = event.target.result;
                saveProducts();
                displayProducts(currentPage);
                cancelEdit();
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            saveProducts();
            displayProducts(currentPage);
            cancelEdit();
        }
    }
}

function cancelEdit() {
    document.getElementById('edit-product-form').style.display = 'none';
    document.getElementById('edit-product-form').reset();
}

function confirmDeleteProduct(productId) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
        deleteProduct(productId);
    }
}

function deleteProduct(productId) {
    products = products.filter(p => p.id !== productId);
    saveProducts();
    displayProducts(currentPage);
}

// Khởi động hiển thị khi tải trang
window.onload = () => {
    displayProducts(currentPage);
};
