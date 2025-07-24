const inputSm = document.querySelector('#search');

    inputSm.addEventListener('change', function() {
        window.location.href = `result.html?user=${inputSm.value}`;
        inputSm.value = '';
    });

const inputBi = document.querySelector('#search-big');

    inputBi.addEventListener('change', function() {
        window.location.href = `result.html?user=${inputBi.value}`;
        inputBi.value = '';
    });
