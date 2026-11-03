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
    li.textContent = `${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)} `;

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "-";
    btnRemover.addEventListener("click", () => removerDoCarrinho(item.id));

    li.append(btnRemover);
    listaCarrinho.append(li);

    total = total + item.preco * item.quantidade;
  }

  elementoTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function adicionarAoCarrinho(id) {
  const itemNoCarrinho = carrinho.find((item) => item.id === id);

  if (itemNoCarrinho) {
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

const form = document.querySelector("#pedido");
const inputNome = document.querySelector("#nome");
const inputZap = document.querySelector("#zap");
const aviso = document.querySelector("#aviso");
const msg = document.querySelector("#mensagem");
const erroZap = document.querySelector("#zap-erro");

function whatsappValido(numero) {
  const apenasNumeros = numero.replace(/\D/g, "");
  const numeroSemPais =
    apenasNumeros.startsWith("55") && [12, 13].includes(apenasNumeros.length)
    ? apenasNumeros.slice(2)
    : apenasNumeros;

  if (!/^(?:[1-9]\d[2-5]\d{7}|[1-9]\d9\d{8})$/.test(numeroSemPais)) {
    return false;
  }

  return !/^(\d)\1+$/.test(numeroSemPais);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = inputNome.value;
  const zap = inputZap.value;
  erroZap.textContent = "";
  inputZap.removeAttribute("aria-invalid");

  if (nome.trim() === "" || zap.trim() === "") {
    aviso.textContent = "Preencha seu nome e WhatsApp!";
    return;
  }
  if (!whatsappValido(zap)) {
    erroZap.textContent = "Informe um WhatsApp válido com DDD.";
    inputZap.setAttribute("aria-invalid", "true");
    inputZap.focus();
    return;
  }
  if (carrinho.length === 0) {
    aviso.textContent = "Adicione pelo menos um item ao carrinho!";
    return;
  }
  msg.textContent = `Pedido: ${nome}`;
});
