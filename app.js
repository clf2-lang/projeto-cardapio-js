const texto = `[
  {"id": 1, "nome": "Coxinha", "preco": 5, "categoria": "salgado"},
  {"id": 2, "nome": "Pastel de queijo", "preco": 8, "categoria": "salgado"},
  {"id": 3, "nome": "Esfirra de carne", "preco": 6, "categoria": "salgado"},
  {"id": 4, "nome": "Cuscuz com ovo", "preco": 9, "categoria": "salgado"},
  {"id": 5, "nome": "Açaí 500 ml", "preco": 18, "categoria": "doce"},
  {"id": 6, "nome": "Bolo de rolo", "preco": 7, "categoria": "doce"},
  {"id": 7, "nome": "Tapioca de coco", "preco": 8, "categoria": "doce"},
  {"id": 8, "nome": "Suco de caju", "preco": 6, "categoria": "bebida"},
  {"id": 9, "nome": "Caldo de cana", "preco": 5, "categoria": "bebida"},
  {"id": 10, "nome": "Café com leite", "preco": 4, "categoria": "bebida"}
]`;
const cardapio = JSON.parse(texto);

const lista = document.querySelector("#cardapio");
let carrinho = [];

function renderizar(itens) {
  lista.replaceChildren();
  for (const item of itens) {
    const li = document.createElement("li");
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)} (${item.categoria})`;
    const btn = document.createElement("button");
    btn.textContent = "Adicionar";
    btn.dataset.id = item.id;
    li.append(btn);
    lista.append(li);
  }
}
renderizar(cardapio);

const busca = document.querySelector("#busca");
function buscar() {
  const termo = busca.value;
  const achados = [];
  for (const item of cardapio) {
    if (item.nome.includes(termo)) {
      achados.push(item);
    }
  }
  renderizar(achados);
}
busca.addEventListener("input", buscar);
