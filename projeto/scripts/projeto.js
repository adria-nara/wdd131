// Array de Objetos com dados dos produtos da Rommanel
const produtos = [
    { id: 1, nome: "Brinco Solitário Zircônia", preco: "R$ 149,90", imagem: "images/brinco.jpg" },
    { id: 2, nome: "Colar Cordão Baiano Ouro 18k", preco: "R$ 329,90", imagem: "images/colar.jpg" },
    { id: 3, nome: "Relógio Feminino Minimalista", preco: "R$ 499,90", imagem: "images/relogio.jpg" },
    { id: 4, nome: "Pulseira Elos Rommanel", preco: "R$ 219,90", imagem: "images/pulseira.jpg" }
];

// Função 1: Renderizar produtos dinamicamente na página usando Template Literals e métodos de array
function renderizarProdutos() {
    const gridProdutos = document.getElementById("grid-produtos");
    
    if (gridProdutos) {
        gridProdutos.innerHTML = ""; // Limpa antes de preencher
        
        // Uso de Array e o método .forEach()
        produtos.forEach(produto => {
            // Uso exclusivo de Template Literals
            const cardHTML = `
                <div class="product-card">
                    <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
                    <h3>${produto.nome}</h3>
                    <p>${produto.preco}</p>
                </div>
            `;
            gridProdutos.innerHTML += cardHTML;
        });
    }
}

// Função 2: Manipulação de DOM, Eventos, Condicionais e localStorage
document.addEventListener("DOMContentLoaded", () => {
    renderizarProdutos();

    // Evento de clique no botão de destaque
    const btnDestaque = document.getElementById("btn-destaque");
    if (btnDestaque) {
        btnDestaque.addEventListener("click", () => {
            // Branching Condicional
            const mensagemAtual = btnDestaque.innerText;
            if (mensagemAtual === "Ver Oferta do Dia") {
                btnDestaque.innerText = "Frete Grátis Acima de R$ 250!";
            } else {
                btnDestaque.innerText = "Ver Oferta do Dia";
            }
        });
    }

    // Manipulação do Formulário de Contato e localStorage
    const formContato = document.getElementById("form-contato");
    if (formContato) {
        formContato.addEventListener("submit", (e) => {
            e.preventDefault();

            const nome = document.getElementById("nome").value;
            const email = document.getElementById("email").value;
            const mensagem = document.getElementById("mensagem").value;

            // Uso de Objeto para agrupar os dados
            const dadosContato = { nome, email, mensagem, data: new Date().toLocaleDateString() };

            // Salvando no localStorage
            localStorage.setItem("ultimoContato", JSON.stringify(dadosContato));

            const feedback = document.getElementById("feedback-envio");
            if (feedback) {
                // Template literal na resposta
                feedback.innerText = `Obrigada, ${nome}! Sua mensagem foi salva com sucesso. Entraremos em contato em breve.`;
                feedback.style.color = "green";
            }

            formContato.reset();
        });
    }
});