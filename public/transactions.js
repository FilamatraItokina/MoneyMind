const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const amount = form.amount.value;
  const description = form.description.value;
  const date = form.date.value;
  const category = form.category.value;
  const type = form.type.value;

  const res = await fetch('http://localhost:3000/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ amount, description, date, category, type }),
    credentials: 'include'
  });

  const data = await res.json();
});

document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('http://localhost:3000/transactions', {
    method: 'GET',
    credentials: 'include'
  });

  const data = await res.json();
});