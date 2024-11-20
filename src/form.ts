document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('inputForm') as HTMLFormElement;
    const input = document.getElementById('inputText') as HTMLInputElement;

    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        const inputValue = input.value;
        
        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: inputValue }),
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = `/result?text=${encodeURIComponent(data.text)}`;
        })
        .catch(error => console.error('Error:', error));
    });
});