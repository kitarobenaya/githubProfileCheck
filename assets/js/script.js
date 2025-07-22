const inputExp = document.querySelector('#searchspecified');

inputExp.addEventListener('change', function() {
    window.location.href = `result.html?user=${inputExp.value}`;
});
