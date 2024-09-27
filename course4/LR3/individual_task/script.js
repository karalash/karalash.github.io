let travel = [
	{name: "Louvre", country: "France",	city: "Paris", budget: 17000, isVisited: false},
	{name: "Brandenburger Tor", country: "Germany", city: "Berlin", budget: 18000, isVisited: true},
	{name: "Pałac w Wilanowie", country: "Poland", city: "Warsaw", budget: 10000, isVisited: false}
]

function displayTravel() {
	travel.forEach(place => {
		console.log(`Name: ${place.name}, Country: ${place.country}, City: ${place.city}, Budget: ${place.budget}, Already visited: ${place.isVisited ? "Yes" : "No"}`)
	})
}

travel.push({name: "Золоті ворота", country: "Ukraine", city: "Kyiv", budget: 1000, isVisited: true})
displayTravel()

function addPlace() {
	let addMore = true

	while(addMore) {
		let name = prompt("Enter the name of the place:")
		let country = prompt("Enter the country:")
		let city = prompt("Enter the city:")
		let budget = +prompt("Enter the budget:")
		let isVisited = confirm("Already visited this place?")

		travel.push({name, country, city, budget, isVisited})

		console.log("The newest travel list:")
		displayTravel()

		addMore = confirm("Do you want to add one more place?")
	}
}

addPlace()

travel.sort((a, b) => b.budget - a.budget)
console.log("Sorted by budget from highest to lowest:", travel)

let notVisited = travel.filter(place => !place.isVisited)
console.log("Not visited yet:", notVisited)

let gatesOnly = travel.filter(place => place.name === "Brandenburger Tor" || place.name === "Золоті ворота")
console.log("Memorial Gates:", gatesOnly)

function calculateAverageBudget() {
    let total = 0
    travel.forEach(place => {
        total += place.budget
    })
    return total / travel.length
}

console.log(`Average Budget: ${calculateAverageBudget()}`)