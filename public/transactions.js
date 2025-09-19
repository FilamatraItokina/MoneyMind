const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const amount = form.amount.value;
  const description = form.description.value;
  const date = form.date.value;
  const category = form.category.value;
  const type = form.type.value;

  const res = await fetch('/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ amount, description, date, category, type }),
    credentials: 'include'
  });

  const data = await res.json();
  
  if (res.ok) {
    console.log('Transaction created:', data);
    form.reset();
    // Recharger la page pour afficher la nouvelle transaction
    location.reload();
  } else {
    console.error('Error creating transaction:', data);
    alert('Erreur lors de la création de la transaction');
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/transactions', {
      method: 'GET',
      credentials: 'include'
    });

    if (res.ok) {
      const data = await res.json();
      console.log('Transactions loaded:', data);
      // Les transactions sont déjà affichées côté serveur via EJS
      // Ce code peut servir pour des mises à jour dynamiques futures
    } else {
      console.error('Error loading transactions:', res.status);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
});

const linkAccount = document.getElementById('account');

linkAccount.addEventListener('click', async () => {
  const res = await fetch('http://localhost:5000/auth/account', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    },
    credentials: 'include'
  });

  const data = await res.json();
  console.log(data);
})