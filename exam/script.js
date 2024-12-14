const citiesByCountry = {
    aus: ["Kyiv", "Lviv", "Ivano-Frankivsk"],
    jap: ["Warsaw", "Krakow", "Lublin"],
    sar: ["New York", "Los Angeles", "Chicago"]
};

const countrySelect = document.getElementById("country");
const citiesSelect = document.getElementById("cities");
const output = document.getElementById("output");

function updateCities() {
    const selectedCountry = countrySelect.value;
    const cities = citiesByCountry[selectedCountry] || [];
    citiesSelect.innerHTML = "";
    cities.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        citiesSelect.appendChild(option);
    });
    updateOutput();
}

function updateOutput() {
    const selectedCountryText = countrySelect.options[countrySelect.selectedIndex].text;
    const selectedCity = citiesSelect.value || "";
    output.textContent = `${selectedCountryText}, ${selectedCity}`;
}

countrySelect.addEventListener("change", updateCities);
citiesSelect.addEventListener("change", updateOutput);
updateCities();