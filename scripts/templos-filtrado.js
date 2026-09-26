document.addEventListener('DOMContentLoaded', () => {
  // 1. Controle do Menu Hambúrguer (Mobile) - IDs alinhados com o HTML
  const menuButton = document.getElementById('botao-menu');
  const listaMenu = document.getElementById('menu-principal');

  if (menuButton && listaMenu) {
    menuButton.addEventListener('click', () => {
      listaMenu.classList.toggle('open');

      // Altera o ícone do botão entre hambúrguer (☰) e fechar (✕)
      const isOpen = listaMenu.classList.contains('open');
      menuButton.textContent = isOpen ? '✕' : '☰';
      menuButton.setAttribute('aria-expanded', isOpen);
    });
  }

  // 2. Atualização Automática do Rodapé
  const anoElemento = document.getElementById('anoAtual');
  if (anoElemento) {
    anoElemento.textContent = new Date().getFullYear();
  }

  // Corrigido para preencher apenas o span #dataModificacao
  const dataModificacaoElemento = document.getElementById('dataModificacao');
  if (dataModificacaoElemento) {
    const data = new Date(document.lastModified);
    dataModificacaoElemento.textContent = data.toLocaleString('pt-BR');
  }

  // Renderiza todos os templos e configura os botões de filtro
  createTemploCartao(templos);
  configurarFiltros();
});

// Configurações de filtro
const dataDeCorte = 1950;
const grandeArea = 50000;

// Extrai o ano de 4 dígitos da string de consagração (ex: "2005, 7 de agosto" -> 2005)
function obterAnoConsagracao(consagracao) {
  const match = consagracao.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : 0;
}

// Alterna a classe 'active' entre os botões/links do filtro
function toggleActive(element) {
  const botoes = document.querySelectorAll('nav a, nav button');
  botoes.forEach(btn => btn.classList.remove('active'));
  element.classList.add('active');
}

// Atualiza o título <h2> da página com o nome da categoria selecionada
function atualizarTituloCategoria(texto) {
  const titulo = document.getElementById('categoria');
  if (titulo) {
    titulo.textContent = texto;
  }
}

function selecionar(seletor, filterFunction) {
  const element = document.querySelector(seletor);

  if (element) {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      toggleActive(element);
      atualizarTituloCategoria(element.textContent);
      createTemploCartao(templos.filter(filterFunction));
    });
  }
}

function configurarFiltros() {
  selecionar('#todos', () => true);
  selecionar('#antigo', templo => obterAnoConsagracao(templo.consagracao) < dataDeCorte);
  selecionar('#novo', templo => obterAnoConsagracao(templo.consagracao) >= dataDeCorte);
  selecionar('#grande', templo => templo.area >= grandeArea);
  selecionar('#pequeno', templo => templo.area < grandeArea);
}

const templos = [
  {
    nomeDoTemplo: "Aba Nigeria",
    localizacao: "Aba, Nigéria",
    consagracao: "2005, 7 de agosto",
    area: 11500,
    urlDaImagem:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Manti Utah",
    localizacao: "Manti, Utah, Estados Unidos",
    consagracao: "1888, 21 de maio",
    area: 74792,
    urlDaImagem:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Payson Utah",
    localizacao: "Payson, Utah, Estados Unidos",
    consagracao: "2015, 7 de junho",
    area: 96630,
    urlDaImagem:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Yigo Guam",
    localizacao: "Yigo, Guam",
    consagracao: "2020, 2 de maio",
    area: 6861,
    urlDaImagem:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    nomeDoTemplo: "Washington D.C.",
    localizacao: "Kensington, Maryland, Estados Unidos",
    consagracao: "1974, 19 de novembro",
    area: 156558,
    urlDaImagem:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    nomeDoTemplo: "Lima Peru",
    localizacao: "Lima, Peru",
    consagracao: "1986, 10 de janeiro",
    area: 9600,
    urlDaImagem:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Cidade do México, México",
    localizacao: "Cidade do México, México",
    consagracao: "1983, 2 de dezembro",
    area: 116642,
    urlDaImagem:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  
  {
    nomeDoTemplo: "Salt Lake",
    localizacao: "Salt Lake City, Utah, Estados Unidos",
    consagracao: "1893, 6 de abril",
    area: 382207,
    urlDaImagem:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/2018/400x250/slctemple5.jpg"
  },
  {
    nomeDoTemplo: "São Paulo Brasil",
    localizacao: "São Paulo, SP, Brasil",
    consagracao: "1978, 30 de outubro",
    area: 59246,
    urlDaImagem:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/sao-paulo-brazil/400x250/sao-paulo-brazil-temple-lds-187030-wallpaper.jpg"
  },
  
];

function createTemploCartao(listaTemplos) {
  const container = document.querySelector('.album-templos');
  if (!container) return;

  container.innerHTML = '';

  listaTemplos.forEach(templo => {
    let cartao = document.createElement("section");
    let nome = document.createElement("h3");
    let localizacao = document.createElement("p");
    let dedicacao = document.createElement("p");
    let area = document.createElement("p");
    let img = document.createElement("img");

    nome.textContent = templo.nomeDoTemplo;
    localizacao.innerHTML = `<span class="label">Localização:</span> ${templo.localizacao}`;
    dedicacao.innerHTML = `<span class="label">Dedicação:</span> ${templo.consagracao}`;
    area.innerHTML = `<span class="label">Área:</span> ${templo.area.toLocaleString('pt-BR')} sq ft`;

    img.setAttribute("src", templo.urlDaImagem);
    img.setAttribute("alt", `Templo ${templo.nomeDoTemplo}`);
    img.setAttribute("loading", "lazy");

    cartao.appendChild(nome);
    cartao.appendChild(localizacao);
    cartao.appendChild(dedicacao);
    cartao.appendChild(area);
    cartao.appendChild(img);

    container.appendChild(cartao);
  });
}