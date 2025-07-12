import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState(() =>
    JSON.parse(localStorage.getItem("costItems")) || []
  );
  const [input, setInput] = useState({ label: "", value: "" });

  useEffect(() => {
    localStorage.setItem("costItems", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (input.label && input.value) {
      setItems([...items, { ...input, value: parseFloat(input.value) }]);
      setInput({ label: "", value: "" });
    }
  };

  const removeItem = idx => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const total = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="app">
      <h1>Calculadora de Custos & Orçamento</h1>
      <div className="input-row">
        <input
          placeholder="Descrição"
          value={input.label}
          onChange={e => setInput({ ...input, label: e.target.value })}
        />
        <input
          type="number"
          placeholder="Valor"
          value={input.value}
          onChange={e => setInput({ ...input, value: e.target.value })}
        />
        <button onClick={addItem}>Adicionar</button>
      </div>
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>
            {item.label}: R$ {item.value.toFixed(2)}
            <button onClick={() => removeItem(idx)}>🗑️</button>
          </li>
        ))}
      </ul>
      <h2>Total: R$ {total.toFixed(2)}</h2>
      <p style={{textAlign:"center",marginTop:"2em",fontSize:"0.9em",color:"#777"}}>Este app funciona offline e pode ser instalado no Android!</p>
    </div>
  );
}

export default App;