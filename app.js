const intes = `[
  { "id": 1, "nome": "Coxinha", "preco": 5 },
  { "id": 2, "nome": "Pastel", "preco": 6 },
  { "id": 3, "nome": "Bolo de rolo", "preco": 7 },
  { "id": 4, "nome": "Suco de caju", "preco": 6 },
  { "id": 5, "nome": "Refrigerante", "preco": 5 },
  { "id": 6, "nome": "Empada", "preco": 4 },
  { "id": 7, "nome": "Enroladinho", "preco": 5 },
  { "id": 8, "nome": "Café", "preco": 3 },
  { "id": 9, "nome": "Açaí", "preco": 12 },
  { "id": 10, "nome": "Tapioca", "preco": 8 }
]`;

const cardapio = JSON.parse(intes);

const lista = document.querySelector("#cardapio");

function renderizar(itens) {
  lista.replaceChildren();
  for (const item of itens) {
    const li = document.createElement("li");
    li.textContent = `${item.nome}: R$ ${item.preco}`;
    const btn = document.createElement("button");
    btn.textContent = "Adicionar";
    btn.dataset.id = item.id;
    li.append(btn);
    lista.append(li);
  }
}
renderizar(cardapio);

const lista1 = document.querySelector("ul"); // a lista da página
const li = document.createElement("li"); // 1
li.textContent = "Pastel"; // 2
lista.append(li); // 3
li.remove();
