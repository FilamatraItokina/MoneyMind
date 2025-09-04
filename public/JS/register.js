const log = console.log;
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");

const form = document.getElementById("authForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

    const res = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
      }),
      credentials: "include"
    });

    const data = await res.json();
    log("Réponse backend :", data);

    if(res.ok){
      window.location.href = 'http://localhost:5000/transactions/home';
    }
});
