function toggleLoader(show) {
    const loader = document.getElementById('loader');
    loader.style.display = show ? 'block' : 'none';
}

function examplePromise() {
    return new Promise((resolve, reject) => {
        toggleLoader(true);
        setTimeout(() => {
            const isSuccess = Math.random() > 0.5;
            toggleLoader(false);
            isSuccess ? resolve("Операція успішна!") : reject("Помилка операції!");
        }, 2000);
    });
}

examplePromise()
    .then(result => {
        document.getElementById('result').innerText = result;
    })
    .catch(error => {
        document.getElementById('result').innerText = error;
    });
