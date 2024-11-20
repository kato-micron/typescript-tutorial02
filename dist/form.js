"use strict";
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('inputForm');
    var input = document.getElementById('inputText');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var inputValue = input.value;
        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: inputValue }),
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            window.location.href = "/result?text=".concat(encodeURIComponent(data.text));
        })
            .catch(function (error) { return console.error('Error:', error); });
    });
});
