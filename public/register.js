const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;

    const res = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        }),
        credentials: 'include'
    });

    const data = await res.json();

    if(res.ok){
        window.location.href = 'http://localhost:5000/transactions';
    } else if(data.error){
        alert(res.message);
    }
});