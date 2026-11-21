// Demo-only pre-order: builds an email from the form and opens the visitor's mail app.
// No backend, nothing is stored.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("preorder");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const d = new FormData(form);
    const items = [["Country sourdough","country_sourdough"],["Seeded rye","seeded_rye"],["Cardamom knots","cardamom_knots"],["Butter croissants","croissants"]]
      .map(([label,key]) => [label, Number(d.get(key) || 0)]).filter(([,n]) => n > 0);
    const status = form.querySelector(".form-status");
    if (!items.length) { status.textContent = "Add at least one item to your order."; return; }
    const lines = [`Name: ${d.get("name")}`, `Email: ${d.get("email")}`, `Pickup: Saturday ${d.get("pickup")}`, "", ...items.map(([l,n]) => `${n} × ${l}`)];
    if (d.get("note")) lines.push("", `Note: ${d.get("note")}`);
    const url = `mailto:hello@oatwick.example?subject=${encodeURIComponent("Saturday pre-order: " + d.get("name"))}&body=${encodeURIComponent(lines.join("\n"))}`;
    status.textContent = "Thanks! Your email app should open with the order. (Demo site: the address is not real.)";
    window.location.href = url;
  });
});
