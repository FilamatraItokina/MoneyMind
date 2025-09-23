const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = form.username.value;
  const email = form.email.value;
  const password = form.password.value;

  // Validation email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errorDiv = document.getElementById("register-error");
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

  const res = await fetch("http://localhost:5000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
    credentials: "include",
  });

  const data = await res.json();

  if (res.ok) {
    window.location.href = "http://localhost:5000/transactions";
  } else if (data.error) {
    errorDiv.textContent = data.message || "Erreur lors de l'inscription.";
    errorDiv.classList.remove("d-none");
  }
});
