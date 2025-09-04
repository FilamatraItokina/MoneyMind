document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('http://localhost:5000/transactions/home', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      },
      credentials: 'include'
    });
    
    const data = await res.json();

    if(!res.ok){
      window.location.href = 'http://localhost:5000/auth/login';
    }
  } catch (err){
    console.error(err);
  }

});


const form = document.getElementById('formTransaction');
const newCtg = document.getElementById('newCtg');
const newType = document.getElementById('newType');
const newAmount = document.getElementById('newAmount');
const newDate = document.getElementById('newDate');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const res = await fetch('http://localhost:5000/transactions', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      category: newCtg.value,
      type: newType.value,
      amount: newAmount.value,
      date: newDate.value
    }),

    credentials: 'include'
  });

  const data = await res.json();
  console.log(data);

  if(res.ok){
    alert('Transaction added');
  }
});
