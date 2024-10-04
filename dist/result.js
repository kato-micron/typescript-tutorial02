"use strict";
document.addEventListener('DOMContentLoaded', function () {
    var resultDiv = document.getElementById('result');
    var urlParams = new URLSearchParams(window.location.search);
    var text = urlParams.get('text') || '';
    var resultText = text;
    if (!isNaN(Number(text))) {
        resultText += '<br>これは数字です';
    }
    resultDiv.innerHTML = resultText;
});
