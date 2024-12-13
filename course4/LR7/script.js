const header = document.querySelector('header');
const section = document.querySelector('section');
const requestURL = 'https://semegenkep.github.io/json/example.json';

const request = new XMLHttpRequest();
request.open('GET', requestURL);

request.responseType = 'json';
request.send();

request.onload = function() {
    const superHeroes = request.response;
    populateHeader(superHeroes);
    showHeroes(superHeroes);
}

function populateHeader(superHeroes) {
    const title = document.createElement('h1');
    title.textContent = superHeroes.squadName;

    const details = document.createElement('p');
    details.textContent = `Hometown: ${superHeroes.homeTown} // Formed: ${superHeroes.formed}`;

    header.appendChild(title);
    header.appendChild(details);
}

function showHeroes(superHeroes) {
    const heroes = superHeroes.members;

    heroes.forEach(hero => {
        const article = document.createElement('article');

        const name = document.createElement('h2');
        name.textContent = hero.name;
        article.appendChild(name);

        const details = document.createElement('p');
        details.textContent = `Secret identity: ${hero.secretIdentity}`;
        article.appendChild(details);

        const age = document.createElement('p');
        age.textContent = `Age: ${hero.age}`;
        article.appendChild(age);

        const powersTitle = document.createElement('p');
        powersTitle.textContent = 'Superpowers:';
        article.appendChild(powersTitle);

        const powersList = document.createElement('ul');
        hero.powers.forEach(power => {
            const listItem = document.createElement('li');
            listItem.textContent = power;
            powersList.appendChild(listItem);
        });
        article.appendChild(powersList);

        section.appendChild(article);
    });
}
