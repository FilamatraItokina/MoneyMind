const form = document.getElementById('form');
const API_URL = "http://moneymind-hc1s.onrender.com";


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const res = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    }
  });

  const data = await res.json();

  console.log(data);
})