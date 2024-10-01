let orders = [
    {
        orderId: 1,
        customer: { name: 'Kuchir Olga', email: 'olgakuchir@gmail.com' },
        items: ['iPhone 15 128Gb', 'AirPods 3'],
        total: 43500
    },
    {
        orderId: 2,
        customer: { name: 'Geletiuk Ivan', email: 'ivan@ukr.net' },
        items: ['Samsung Galaxy S23 256Gb'],
        total: 29000
    },
    {
        orderId: 3,
        customer: { name: 'Kuchir Olga', email: 'olgakuchir@gmail.com' },
        items: ['iPhone 16 256Gb'],
        total: 52500
    }
]

function getTotalSpentByCustomer(orders, customerName) {
    return orders
        .filter(order => order.customer.name === customerName)
        .reduce((total, order) => total + order.total, 0)
}

let totalSpentByOlga = getTotalSpentByCustomer(orders, 'Kuchir Olga')
console.log(totalSpentByOlga)