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
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;

    const btn = document.createElement("button");
    btn.textContent = "+";
    btn.dataset.id = item.id;
    btn.addEventListener("click", () => adicionarAoCarrinho(item.id));
    li.append(btn);
    lista.append(li);
  }
}
renderizar(cardapio);

const busca = document.querySelector("#busca");
function buscar() {
  const termo = busca.value.toLowerCase();
  const achados = [];

  for (const item of cardapio) {

    const nomeLanche = item.nome.toLowerCase();

    if (nomeLanche.startsWith(termo)) {
      achados.push(item);
    }
  }
  renderizar(achados);
}
busca.addEventListener("input", buscar);


const listaCarrinho = document.querySelector("#carrinho");
const elementoTotal = document.querySelector("#total");

function renderizarCarrinho() {
  listaCarrinho.replaceChildren();

  let total = 0;

  for (const item of carrinho) {
    const li = document.createElement("li");
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    listaCarrinho.append(li);

    total += item.preco;
    elementoTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
  }


}

function adicionarAoCarrinho(id) {
  const itemNoCarrinho = carrinho.find((item) => item.id === id);

  if (itemNoCarrinho) {
    // Usando o nome correto da variável!
    itemNoCarrinho.quantidade = itemNoCarrinho.quantidade + 1;
  } else {
    const itemDoCardapio = cardapio.find((item) => item.id === id);
    carrinho.push({ ...itemDoCardapio, quantidade: 1 });
  }
  
  renderizarCarrinho();
}

function removerDoCarrinho(id) {
  const item = carrinho.find((item) => item.id === id);

  if (item.quantidade > 1) {
    item.quantidade = item.quantidade - 1;
  } else {
    carrinho = carrinho.filter((item) => item.id !== id);
  }
  
  renderizarCarrinho(); 
}

function renderizarCarrinho() {
  listaCarrinho.replaceChildren();
  let total = 0; 

  for (const item of carrinho) {
    const li = document.createElement("li");
    
    // Novo texto que mostra a quantidade e multiplica o preço
    li.textContent = `${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)} `;
    
    // Criação do botão de remover
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "-";
    btnRemover.addEventListener("click", () => removerDoCarrinho(item.id));
    
    li.append(btnRemover);
    listaCarrinho.append(li);
    
    total = total + (item.preco * item.quantidade); 
  }
  
  elementoTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
}