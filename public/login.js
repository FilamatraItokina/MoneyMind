const form = document.getElementById('form');

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = form.email.value;
  const password = form.password.value;

  const res = await fetch('http://localhost:5000/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password
    }),
    credentials: 'include'
  });

  const data = await res.json();

  if(res.ok){
    window.location.href = 'http://localhost:5000/transactions'
  } else {
    alert(res.message);
  }
})