function toggleLoader(show) {
    document.getElementById('loader').style.display = show ? 'block' : 'none';
}

function compareNumbers(num1, num2) {
    return new Promise((resolve, reject) => {
        toggleLoader(true);
        setTimeout(() => {
            toggleLoader(false);
            if (num1 > num2) {
                resolve("Перше число більше");
            } else if (num1 < num2) {
                resolve("Друге число більше");
            } else {
                reject("Числа рівні");
            }
        }, 1000);
    });
}

compareNumbers(6, 5)
    .then(result => {
        document.getElementById('result').innerText = result;
    })
    .catch(error => {
        document.getElementById('result').innerText = error;
    });
