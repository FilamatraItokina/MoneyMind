const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const amount = form.amount.value;
  const description = form.description.value;
  const date = form.date.value;
  const category = form.category.value;
  const type = form.type.value;

  const res = await fetch("/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount, description, date, category, type }),
    credentials: "include",
  });

  const data = await res.json();

  if (res.ok) {
    console.log("Transaction created:", data);
    form.reset();
    // Recharger la page pour afficher la nouvelle transaction
    location.reload();
  } else {
    console.error("Error creating transaction:", data);
    alert("Erreur lors de la création de la transaction");
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/transactions", {
      method: "GET",
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      console.log("Transactions loaded:", data);
      // Les transactions sont déjà affichées côté serveur via EJS
      // Ce code peut servir pour des mises à jour dynamiques futures
    } else {
      console.error("Error loading transactions:", res.status);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
});

// Gestion suppression
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-delete")) {
    const id = e.target.getAttribute("data-id");
    if (confirm("Voulez-vous vraiment supprimer cette transaction ?")) {
      const res = await fetch(`/transactions/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        location.reload();
      } else {
        alert("Erreur lors de la suppression");
      }
    }
  }
});

// Pré-remplir le modal d'édition
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-edit")) {
    document.getElementById("edit-id").value = e.target.getAttribute("data-id");
    document.getElementById("edit-amount").value =
      e.target.getAttribute("data-amount");
    document.getElementById("edit-description").value =
      e.target.getAttribute("data-description");
    document.getElementById("edit-category").value =
      e.target.getAttribute("data-category");
    document.getElementById("edit-type").value =
      e.target.getAttribute("data-type");
    document.getElementById("edit-date").value =
      e.target.getAttribute("data-date");
  }
});

// Soumission du formulaire d'édition
const editForm = document.getElementById("editForm");
if (editForm) {
  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("edit-id").value;
    const amount = document.getElementById("edit-amount").value;
    const description = document.getElementById("edit-description").value;
    const category = document.getElementById("edit-category").value;
    const type = document.getElementById("edit-type").value;
    const date = document.getElementById("edit-date").value;
    const res = await fetch(`/transactions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ amount, description, category, type, date }),
    });
    if (res.ok) {
      // Fermer le modal Bootstrap
      const modal = bootstrap.Modal.getOrCreateInstance(
        document.getElementById("editModal")
      );
      modal.hide();
      location.reload();
    } else {
      alert("Erreur lors de la modification");
    }
  });
}

// --- Filtres dynamiques ---
const filterForm = document.getElementById("filterForm");
const resetFilterBtn = document.getElementById("resetFilter");

function renderTransactions(transactions) {
  const tbody = document.querySelector("tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  if (!transactions || transactions.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center">Aucune transaction trouvée</td></tr>`;
    return;
  }
  transactions.forEach((transaction) => {
    tbody.innerHTML += `
      <tr data-id="${transaction.id}">
        <td>${transaction.category}</td>
        <td>${transaction.amount}</td>
        <td>${transaction.description}</td>
        <td>${transaction.date}</td>
        <td>${transaction.type}</td>
        <td>
          <button class="btn btn-sm btn-warning btn-edit me-1"
            data-bs-toggle="modal"
            data-bs-target="#editModal"
            data-id="${transaction.id}"
            data-amount="${transaction.amount}"
            data-description="${transaction.description}"
            data-category="${transaction.category}"
            data-type="${transaction.type}"
            data-date="${transaction.date}">
            Modifier
          </button>
          <button class="btn btn-sm btn-danger btn-delete" data-id="${transaction.id}">Supprimer</button>
        </td>
      </tr>
    `;
  });
}

if (filterForm) {
  filterForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const category = document.getElementById("filter-category").value.trim();
    const type = document.getElementById("filter-type").value;
    const date = document.getElementById("filter-date").value;

    let url = null;
    if (category) {
      url = `/transactions/category/${encodeURIComponent(category)}`;
    } else if (type) {
      url = `/transactions/type/${encodeURIComponent(type)}`;
    } else if (date) {
      url = `/transactions/date/${encodeURIComponent(date)}`;
    } else {
      url = "/transactions";
    }

    const res = await fetch(url, { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      renderTransactions(data.transactions || data);
    } else {
      renderTransactions([]);
    }
  });
}

if (resetFilterBtn) {
  resetFilterBtn.addEventListener("click", async () => {
    document.getElementById("filter-category").value = "";
    document.getElementById("filter-type").value = "";
    document.getElementById("filter-date").value = "";
    // Recharge toutes les transactions
    const res = await fetch("/transactions", { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      renderTransactions(data.transactions || data);
    } else {
      renderTransactions([]);
    }
  });
}
