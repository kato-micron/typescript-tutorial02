document.addEventListener('DOMContentLoaded', () => {
    const resultDiv = document.getElementById('result') as HTMLDivElement;
    const urlParams = new URLSearchParams(window.location.search);
    const text = urlParams.get('text') || '';

    let resultText = text;
    if (!isNaN(Number(text))) {
        resultText += '<br>これは数字です';
    }

    resultDiv.innerHTML = resultText;
});