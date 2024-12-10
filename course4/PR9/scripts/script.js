document.addEventListener('DOMContentLoaded', async () => {
    const productContainer = document.querySelector('.product-category');
    const swipeLeft = document.querySelector('.swipe-left');
    const swipeRight = document.querySelector('.swipe-right');

    let data = [];
    try {
        const response = await fetch('products.json');
        data = await response.json();
    } catch (error) {
        console.error('Помилка завантаження JSON:', error);
        return;
    }

    let currentIndex = 0;
    const visibleItems = 4;

    const renderProducts = () => {
        productContainer.innerHTML = '';

        const visibleProducts = [];
        for (let i = 0; i < visibleItems; i++) {
            const index = (currentIndex + i) % data.products.length;
            visibleProducts.push(data.products[index]);
        }

        visibleProducts.forEach((product, index) => {
            const item = document.createElement('div');
            item.classList.add('product-item');

            item.innerHTML = `
                <div class="category-title">${product.category}</div>
                <div class="category-divider"></div>
                ${product.isNew ? '<span class="new-label">НОВИНКА</span>' : ''}
                ${product.isHit ? '<span class="hit-label">ХІТ</span>' : ''}
                <img src="${product.image}" alt="${product.title}">
                <div class="product-title">${product.title}</div>
                ${product.oldPrice
                    ? `<div class="price-block">
                        <span class="product-old-price">${product.oldPrice}</span>
                        <div class="product-price">${product.price}</div>
                    </div>`
                    : `<div class="product-price">${product.price}</div>`
                }
                ${product.isComingSoon
                    ? '<div class="coming-soon">НЕЗАБАРОМ У ПРОДАЖІ</div>'
                    : '<a class="add-to-cart">У КОРЗИНУ</a>'
                }
            `;

            productContainer.appendChild(item);

            const addToCartButton = item.querySelector('.add-to-cart');
            if (addToCartButton) {
                addToCartButton.addEventListener('click', () => {
                    const quantity = prompt('Вкажіть кількість:');
                    if (quantity && quantity > 0) {
                        const priceElement = item.querySelector('.product-price');
                        const priceText = priceElement.textContent.trim();
                        let price;

                        const oldPriceElement = priceElement.querySelector('.product-old-price');
                        if (oldPriceElement) {
                            price = parseInt(priceText.split(' ')[1]);
                        } else {
                            price = parseInt(priceText.split(' ')[0]);
                        }

                        const title = item.querySelector('.product-title').textContent;

                        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                        cart.push({ id: index, title, price, quantity: Number(quantity) });
                        localStorage.setItem('cart', JSON.stringify(cart));

                        updateCartCount();
                        alert('Товар додано до корзини');
                    }
                });
            }
        });
    };

    renderProducts();

    swipeLeft.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + data.products.length) % data.products.length;
        renderProducts();
    });

    swipeRight.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % data.products.length;
        renderProducts();
    });
});

const cartCountElement = document.getElementById('cart-count');

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cartCountElement.innerText = cart.length;
}

updateCartCount();

const cartIcon = document.getElementById('cart-icon');
const modalCartEmpty = document.getElementById('modal-cart-empty');
const closeModal = document.getElementById('close-modal');

cartIcon.addEventListener('click', () => {
    const cartItems = localStorage.getItem('cart') || '[]';
    if (JSON.parse(cartItems).length === 0) {
        modalCartEmpty.style.display = 'flex';
    } else {
        window.location.href = 'cart.html';
    }
});

closeModal.addEventListener('click', () => {
    modalCartEmpty.style.display = 'none';
});
