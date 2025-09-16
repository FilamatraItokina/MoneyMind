const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const res = await fetch('http://localhost:5000/auth/login', {

    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      email: form.email.value,
      password: form.password.value
    }),
    credentials: 'include'
  });

  const data = await res.json();
  

  if(res.ok){
    window.location.href = 'http://localhost:5000/transactions'
  } else {
    alert(res.message);
  }
});