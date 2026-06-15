const params = new URLSearchParams(window.location.search);
const ref = params.get("ref") || "VD-001";

buscarProduto(ref);

async function buscarProduto(ref) {
  try {
    const response = await fetch(`/api/produtos/${ref}`);

    if (!response.ok) {
      mostrarNaoEncontrado();
      return;
    }

    const produto = await response.json();
    carregarProduto(produto);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    mostrarNaoEncontrado();
  }
}

function carregarProduto(produto) {
  document.title = `${produto.nome} | Marca`;

  alterarTexto(".product-panel .eyebrow", `REF. ${produto.ref}`);
  alterarTexto(".product-panel h1", produto.nome);
  alterarTexto(".lead", produto.descricao);
  alterarTexto(".helper-text", `Envie a referência ${produto.ref} para a consultora verificar disponibilidade e valores atualizados.`);
  alterarTexto("#detalhes .section-title p", produto.descricao);
  alterarTexto(".details-grid article:nth-child(1) p", produto.detalhes.caimento);
  alterarTexto(".details-grid article:nth-child(2) p", produto.detalhes.ocasioes);
  alterarTexto(".details-grid article:nth-child(3) p", produto.detalhes.combinacoes);
  alterarTexto(".composition-content p", produto.comoUsar);
  alterarTexto(".contact-strip p", `Envie a referência ${produto.ref} para a consultora e receba informações sobre disponibilidade, cores, tamanhos, valores e entrega.`);

  carregarImagens(produto.imagens, produto.nome);
  carregarLista(".color-list", produto.cores);
  carregarLista(".size-list", produto.tamanhos);
  carregarResumo(produto.resumo);
  montarLinkWhatsapp(produto);
}

function alterarTexto(selector, texto) {
  const elemento = document.querySelector(selector);
  if (elemento) elemento.textContent = texto;
}

function carregarLista(selector, itens) {
  const container = document.querySelector(selector);
  if (!container) return;
  container.innerHTML = "";
  itens.forEach((item) => {
    const span = document.createElement("span");
    span.textContent = item;
    container.appendChild(span);
  });
}

function carregarResumo(itens) {
  const lista = document.querySelector(".info-block ul");
  if (!lista) return;
  lista.innerHTML = "";
  itens.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    lista.appendChild(li);
  });
}

function carregarImagens(imagens, nomeProduto) {
  const imagemPrincipal = document.querySelector(".main-photo img");
  const miniaturas = document.querySelectorAll(".photo-grid img");
  const imagemComposicao = document.querySelector(".composition-image img");

  if (imagemPrincipal && imagens[0]) {
    imagemPrincipal.src = imagens[0];
    imagemPrincipal.alt = `${nomeProduto} - foto principal`;
  }

  miniaturas.forEach((img, index) => {
    const imagem = imagens[index + 1] || imagens[0];
    img.src = imagem;
    img.alt = `${nomeProduto} - foto ${index + 2}`;

    img.addEventListener("click", () => {
      if (!imagemPrincipal) return;
      const fotoAtual = imagemPrincipal.src;
      imagemPrincipal.src = img.src;
      img.src = fotoAtual;
    });
  });

  if (imagemComposicao) {
    imagemComposicao.src = imagens[1] || imagens[0];
    imagemComposicao.alt = `Inspiração de uso - ${nomeProduto}`;
  }
}

function montarLinkWhatsapp(produto) {
  const numeroWhatsApp = "5511999999999";
  const mensagem = `Olá! Tenho interesse na peça ${produto.nome} - REF. ${produto.ref}. Pode me passar disponibilidade, tamanhos e valores?`;
  const link = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

  document.querySelectorAll(".whatsapp-btn, .contact-btn").forEach((botao) => {
    botao.href = link;
    botao.target = "_blank";
    botao.rel = "noopener noreferrer";
  });
}

function mostrarNaoEncontrado() {
  document.body.innerHTML = `
    <main style="min-height:100vh;display:grid;place-items:center;padding:24px;font-family:Arial,sans-serif;background:#f7f2ed;color:#1f1b18;">
      <div style="max-width:560px;text-align:center;background:#fffaf6;border:1px solid #ded2c7;padding:42px;">
        <p style="font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#9b6a4d;margin-bottom:16px;">Produto não encontrado</p>
        <h1 style="font-family:Georgia,serif;font-weight:400;font-size:42px;line-height:1;margin-bottom:18px;">Essa referência não existe no catálogo.</h1>
        <p style="color:#7b6f66;line-height:1.7;margin-bottom:28px;">Verifique o código da peça ou volte para o catálogo.</p>
        <a href="catalogo.html" style="display:inline-flex;align-items:center;justify-content:center;height:48px;min-width:190px;background:#1f1b18;color:#fff;text-decoration:none;text-transform:uppercase;letter-spacing:1.4px;font-size:12px;">Voltar ao catálogo</a>
      </div>
    </main>
  `;
}
