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

const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const quantity = prompt('Вкажіть кількість:');
        if (quantity && quantity > 0) {
            const productItem = button.closest('.product-item');
            const priceElement = productItem.querySelector('.product-price');
            
            const priceText = priceElement.textContent.trim();
            let price;

            const oldPriceElement = priceElement.querySelector('.product-old-price');
            if (oldPriceElement) {
                price = parseInt(priceText.split(' ')[1]);
            } else {
                price = parseInt(priceText.split(' ')[0]);
            }

            const title = productItem.querySelector('.product-title').textContent;

            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            cart.push({ id: index, title, price, quantity: Number(quantity) });
            localStorage.setItem('cart', JSON.stringify(cart));

            updateCartCount();

            alert('Товар додано до корзини');
        }
    });
});
