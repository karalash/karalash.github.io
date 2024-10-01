let products = [
  { productId: 1, name: 'iPhone 15 128Gb', price: 37000 },
  { productId: 2, name: 'iPhone 16 256Gb', price: 52500 },
  { productId: 3, name: 'AirPods 3', price: 6500 }
]

let purchases = [
  { purchaseId: 1, productId: 3, quantity: 5 },
  { purchaseId: 2, productId: 2, quantity: 1 },
  { purchaseId: 3, productId: 1, quantity: 2 },
  { purchaseId: 4, productId: 3, quantity: 2 }
]

function getTotalSales(products, purchases) {
  return purchases.reduce((acc, purchase) => {
    let product = products.find(prod => prod.productId === purchase.productId)
    if (product) {
      let totalRevenue = product.price * purchase.quantity
      if (acc[product.name]) {
        acc[product.name] += totalRevenue
      } else {
        acc[product.name] = totalRevenue
      }
    }
    return acc
  }, {})
}

let totalSales = getTotalSales(products, purchases)
console.log(totalSales)