function calcular() {
  const h = parseFloat(document.getElementById("horas").value);
  const v = parseFloat(document.getElementById("valor").value);
  const a = parseFloat(document.getElementById("adicionais").value || 0);
  const total = h * v + a;
  document.getElementById("resultado").innerText = `Total: R$ ${total.toFixed(2)}`;
  salvarOrcamento({ h, v, a, total, data: new Date().toISOString() });
}
function salvarOrcamento(data) {
  const orcamentos = JSON.parse(localStorage.getItem("fsd_orcamentos") || "[]");
  orcamentos.push(data);
  localStorage.setItem("fsd_orcamentos", JSON.stringify(orcamentos));
}
function exportar() {
  const dados = localStorage.getItem("fsd_orcamentos");
  const blob = new Blob([dados], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "orcamentos.json";
  a.click();
}