function toggleLoader(show) {
    document.getElementById('loader').style.display = show ? 'block' : 'none';
}

function randomPromise(delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            const randomNum = Math.floor(Math.random() * 10) + 1;
            resolve(randomNum);
        }, delay);
    });
}

const promises = [
    randomPromise(1000),
    randomPromise(2000),
    randomPromise(3000)
];

toggleLoader(true);
Promise.all(promises)
    .then(results => {
        toggleLoader(false);
        const sum = results.reduce((acc, num) => acc + num, 0);
        document.getElementById('result').innerText = `Сума: ${sum}`;
    })
    .catch(error => {
        toggleLoader(false);
        document.getElementById('result').innerText = `Помилка: ${error}`;
    });
