async function loadFlags() {
  const status = document.getElementById("status");
  const table = document.getElementById("flags-table");
  const body = document.getElementById("flags-body");

  try {
    const response = await fetch("./flags.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Failed to load flags.json: ${response.status}`);
    }

    const rows = await response.json();

    body.innerHTML = rows.map(row => `
      <tr>
        <td>${escapeHtml(row.erp)}</td>
        <td>${escapeHtml(row.bank)}</td>
        <td>${flagCell(row.payments)}</td>
        <td>${flagCell(row.clients)}</td>
        <td>${flagCell(row.advisors)}</td>
      </tr>
    `).join("");

    status.remove();
    table.hidden = false;
  } catch (error) {
    status.textContent = `Unable to load feature flags: ${error.message}`;
    status.className = "error";
  }
}

function flagCell(value) {
  return value
    ? '<span class="flag on">ON</span>'
    : '<span class="flag off">OFF</span>';
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

loadFlags();
