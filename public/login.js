const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = form.email.value;
  const password = form.password.value;

  // Validation email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errorDiv = document.getElementById("login-error");
  errorDiv.classList.add("d-none");
  errorDiv.textContent = "";
  if (!emailRegex.test(email)) {
    errorDiv.textContent = "Veuillez entrer une adresse email valide.";
    errorDiv.classList.remove("d-none");
    return;
  }

  // Validation longueur mot de passe
  if (password.length < 8) {
    errorDiv.textContent =
      "Le mot de passe doit contenir au moins 8 caractères.";
    errorDiv.classList.remove("d-none");
    return;
  }

  const res = await fetch(`https://moneymind-hc1s.onrender.com/auth/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    credentials: "include",
  });

  const data = await res.json();

  if (res.ok) {
    window.location.href = `/transactions`;
  } else {
    errorDiv.textContent = data.message || "Erreur lors de la connexion.";
    errorDiv.classList.remove("d-none");
  }
});
