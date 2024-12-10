const cartItemsContainer = document.getElementById('cart-items');
const cartData = JSON.parse(localStorage.getItem('cart') || '[]');

let totalSum = 0;

if (cartData.length > 0) {
    cartData.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.title}</td>
            <td>${item.price} ГРН</td>
            <td>${item.quantity}</td>
            <td>${item.price * item.quantity} ГРН</td>
            <td><button class="remove-item" data-index="${index}">Видалити</button></td>
        `;
        cartItemsContainer.appendChild(row);

        totalSum += item.price * item.quantity;
    });

    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td colspan="4">Загальна сума:</td>
        <td>${totalSum} ГРН</td>
        <td></td>
    `;
    cartItemsContainer.appendChild(totalRow);

    document.querySelectorAll('.remove-item').forEach((button) => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            cartData.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cartData));
            location.reload();
        });
    });
}
