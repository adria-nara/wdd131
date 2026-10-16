(() => {
  const formatarPreco = (valor) => new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(valor);

  const criarCard = (produto) => `
    <article class="product-card">
      <div class="product-photo">
        <img src="${produto.imagem}" alt="${produto.alt}" loading="lazy">
        ${produto.etiqueta ? `<span class="product-tag">${produto.etiqueta}</span>` : ""}
      </div>
      <div class="product-info">
        <div>
          <p class="product-category">${produto.categoria}</p>
          <h3>${produto.nome}</h3>
        </div>
        <div class="product-bottom">
          <strong>${formatarPreco(produto.preco)}</strong>
          <button class="add-button" type="button" data-add="${produto.id}" aria-label="Adicionar ${produto.nome} à sacola">+</button>
        </div>
      </div>
    </article>`;

  const lista = document.querySelector("[data-product-list]");
  const campoBusca = document.querySelector("[data-search]");
  const toast = document.querySelector(".toast");
  let toastTimer;

  const obterSacola = () => {
    try { 
      return JSON.parse(localStorage.getItem("adria-sacola") || "[]"); 
    } catch { 
      return []; 
    }
  };

  const atualizarSacola = () => {
    const total = obterSacola().reduce((soma, item) => soma + item.quantidade, 0);
    document.querySelectorAll("[data-bag-count]").forEach((el) => { 
      el.textContent = total; 
    });
  };

  const mostrarToast = (mensagem) => {
    if (!toast) return;
    toast.textContent = mensagem;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2500);
  };

  const renderizar = () => {
    if (!lista) return;

    const baseProdutos = typeof PRODUTOS !== "undefined" ? PRODUTOS : [];
    const modo = lista.dataset.mode;
    const colecao = lista.dataset.category;
    const busca = (campoBusca?.value || "").trim().toLocaleLowerCase("pt-BR");

    const correspondentes = baseProdutos.filter((produto) => {
      const correspondeColecao = modo === "featured" ? produto.destaque : produto.colecao === colecao;
      const correspondeBusca = `${produto.nome} ${produto.categoria}`.toLocaleLowerCase("pt-BR").includes(busca);
      return correspondeColecao && correspondeBusca;
    });

    lista.innerHTML = correspondentes.map(criarCard).join("");

    const contador = document.querySelector("[data-result-count]");
    if (contador) {
      contador.textContent = `${correspondentes.length} ${correspondentes.length === 1 ? "peça" : "peças"}`;
    }

    const vazio = document.querySelector(".empty-state");
    if (vazio) {
      vazio.hidden = correspondentes.length > 0;
    }
  };

  campoBusca?.addEventListener("input", renderizar);
  campoBusca?.addEventListener("search", renderizar);

  lista?.addEventListener("click", (evento) => {
    const botao = evento.target.closest("[data-add]");
    if (!botao) return;

    const baseProdutos = typeof PRODUTOS !== "undefined" ? PRODUTOS : [];
    const produto = baseProdutos.find((item) => item.id === botao.dataset.add);
    if (!produto) return;

    const sacola = obterSacola();
    const existente = sacola.find((item) => item.id === produto.id);

    if (existente) {
      existente.quantidade += 1;
    } else {
      sacola.push({ id: produto.id, quantidade: 1 });
    }

    localStorage.setItem("adria-sacola", JSON.stringify(sacola));
    atualizarSacola();
    mostrarToast(`${produto.nome} adicionado à sacola.`);
  });

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");

  toggle?.addEventListener("click", () => {
    const aberto = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!aberto));
    toggle.setAttribute("aria-label", aberto ? "Abrir menu" : "Fechar menu");
    nav?.classList.toggle("is-open", !aberto);
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle?.setAttribute("aria-expanded", "false");
      toggle?.setAttribute("aria-label", "Abrir menu");
      nav.classList.remove("is-open");
    });
  });

  const newsletterForm = document.querySelector("[data-newsletter-form]");
  const newsletterFeedback = document.querySelector("[data-newsletter-feedback]");

  newsletterForm?.addEventListener("submit", (evento) => {
    evento.preventDefault();
    if (!newsletterForm.reportValidity()) return;

    if (newsletterFeedback) {
      newsletterFeedback.textContent = "Inscrição realizada com sucesso! Obrigado por acompanhar a Adria.";
      newsletterFeedback.hidden = false;
    }
    newsletterForm.reset();
  });

  document.querySelectorAll("[data-year]").forEach((el) => { 
    el.textContent = new Date().getFullYear(); 
  });
  
  atualizarSacola();
  renderizar();
})();

