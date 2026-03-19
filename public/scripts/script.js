document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('nameForm');
    const resultEl = document.getElementById('result');

    // 🔥 init DB once
    loadNameInfo();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('userName').value;

        try {
            const response = await fetch('/api/get-name', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: name
                })
            });

            const result = await response.json();

            if (response.ok) {
                resultEl.className = 'success';
                resultEl.innerHTML = `
            ${result.message} <br>
            <strong>Name:</strong> ${result.name} <br>
            <strong>Emoji:</strong> ${result.emoji}
          `;
            } else {
                resultEl.className = 'error';
                resultEl.textContent = result.error;
            }

        } catch (error) {
            resultEl.className = 'error';
            resultEl.textContent = 'Server error';
        }
    });

});

async function loadNameInfo() {
    try {
        await fetch('/api/init-emoji');
    } catch (error) {
        console.log('Init failed');
    }
}

