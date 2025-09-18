const form = document.getElementById('form');

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const res = await fetch("http://localhost:5000/auth/logout", {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    }
  });

  const data = await res.json();

  console.log(data);
})