let library = [
	{ title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", year: 1997, isRead: true, markAsRead() {this.isRead = true} },
	{ title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937, isRead: false, markAsRead() {this.isRead = true} },
	{ title: "1984", author: "George Orwell", year: 1949, isRead: true, markAsRead() {this.isRead = true} }
]

function displayLibrary() {
	library.forEach(book => {
		console.log(`Назва: ${book.title}, Автор: ${book.author}, Рік видання: ${book.year}, Прочитана: ${book.isRead ? "Так" : "Ні"}`)
	})
}

library[1].markAsRead()

function addBookToLibrary() {
    let addMore = true
    
    while (addMore) {
        let title = prompt("Введіть назву книги:")
        let author = prompt("Введіть автора книги:")
        let year = +prompt("Введіть рік видання книги:")
        let isRead = confirm("Чи прочитана книга?")
    
        library.push({ title, author, year, isRead, markAsRead() {this.isRead = true} })
        
        console.log("Актуальний список книг:")
        displayLibrary()
        
        addMore = confirm("Хочете додати ще одну книгу?")
    }
}

addBookToLibrary()

function calculateAverageYear() {
    let total = 0
    library.forEach(book => {
        total += book.year
    })
    return total / library.length
}

console.log(`Середній рік видання книг: ${calculateAverageYear()}`)