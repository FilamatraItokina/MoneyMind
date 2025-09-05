const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;

    const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headeres: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password }),
        credentials: 'include'
    });

    const data = await res.json();

    if(res.ok){
        window.location.href = 'http://localhost:3000/transactions';
    } else if(data.error){
        alert(data.error);
    }
});